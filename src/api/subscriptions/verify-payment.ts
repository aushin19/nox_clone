import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    // Parse request body
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, subscription } = await req.json();
    
    // Validate request body
    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !subscription) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get auth header and extract token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Extract token and create Supabase client
    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL || '',
      process.env.VITE_SUPABASE_ANON_KEY || '',
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    );
    
    // Get user ID from Supabase auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify payment signature
    // In real implementation, we would use MCP's verify_payment function
    const secret = process.env.RAZORPAY_KEY_SECRET || '';
    
    const payload = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    const isSignatureValid = expectedSignature === razorpaySignature;
    
    if (!isSignatureValid) {
      console.error('Invalid payment signature');
      return new Response(JSON.stringify({ 
        error: 'Payment verification failed',
        success: false
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Calculate subscription duration
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + subscription.durationMonths);
    
    // Update user's profile with subscription details
    const { error: updateError } = await supabase.rpc('update_user_plan', {
      selected_plan_sku: subscription.planSku,
      selected_plan_name: subscription.planName,
      selected_plan_price: subscription.planPrice,
      plan_duration_months: subscription.durationMonths
    });
    
    if (updateError) {
      console.error('Error updating user plan:', updateError);
      
      return new Response(JSON.stringify({ 
        error: 'Payment verified, but failed to update subscription',
        success: false,
        details: updateError.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Log payment information in a separate payments table
    const { error: paymentLogError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        payment_id: razorpayPaymentId,
        order_id: razorpayOrderId,
        amount: subscription.planPrice,
        currency: 'INR',
        plan_sku: subscription.planSku,
        plan_name: subscription.planName,
        duration_months: subscription.durationMonths,
        payment_method: 'razorpay',
        status: 'completed'
      });
    
    if (paymentLogError) {
      console.warn('Failed to log payment details:', paymentLogError);
      // Continue anyway since subscription is activated
    }
    
    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription activated successfully',
      plan: {
        name: subscription.planName,
        sku: subscription.planSku,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Unknown error',
      success: false
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 
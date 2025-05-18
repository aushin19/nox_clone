import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    // Parse request body
    const { amount, subscription, receipt, notes } = await req.json();
    
    if (!amount || !subscription) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Initialize Razorpay with key and secret
    // These would come from environment variables in production
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });
    
    // Validate credentials
    if (!razorpay.key_id || !razorpay.key_secret) {
      console.error('Razorpay credentials missing');
      return new Response(JSON.stringify({ error: 'Payment configuration error' }), {
        status: 500,
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
    
    // Create order with Razorpay
    const options = {
      amount: amount, // amount in smallest currency unit (paisa)
      currency: 'INR',
      receipt: receipt,
      notes: {
        ...notes,
        userId: user.id,
        planSku: subscription.planSku,
        planName: subscription.planName,
        durationMonths: subscription.durationMonths.toString()
      }
    };
    
    // Call Razorpay API to create order
    // Note: In real implementation, use the MCP Razorpay function
    try {
      const order = await razorpay.orders.create(options);
      
      // Log order for debugging
      console.log('Order created:', order);
      
      return new Response(JSON.stringify(order), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (razorpayError: any) {
      console.error('Razorpay error:', razorpayError);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create order', 
          details: razorpayError.message 
        }), 
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
  } catch (error: any) {
    console.error('Error creating order:', error);
    
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 
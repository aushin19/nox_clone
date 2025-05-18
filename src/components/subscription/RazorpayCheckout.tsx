import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { initializePayment } from '@/services/razorpay';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';

interface RazorpayCheckoutProps {
  planSku: string;
  planName: string;
  planPrice: number;
  durationMonths: number;
  buttonText?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  planSku,
  planName,
  planPrice,
  durationMonths,
  buttonText = 'Subscribe Now',
  className = '',
  onSuccess,
  onError,
}) => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  // Function to update user's subscription in database
  const updateUserSubscription = async (paymentData: any) => {
    try {
      // Update user's plan in database
      const { error } = await supabase.rpc('update_user_plan', {
        selected_plan_sku: planSku,
        selected_plan_name: planName,
        selected_plan_price: planPrice,
        plan_duration_months: durationMonths,
      });

      if (error) {
        console.error('Error updating user plan:', error);
        throw new Error('Failed to update subscription');
      }
      
      // Log payment in payments table
      if (user?.id) {
        const { error: paymentLogError } = await supabase
          .from('payments')
          .insert({
            user_id: user.id,
            payment_id: paymentData.razorpay_payment_id,
            order_id: paymentData.razorpay_order_id,
            amount: planPrice,
            currency: 'INR',
            plan_sku: planSku,
            plan_name: planName,
            duration_months: durationMonths,
            payment_method: 'razorpay',
            status: 'completed'
          });
        
        if (paymentLogError) {
          console.warn('Failed to log payment details:', paymentLogError);
        }
      }

      return true;
    } catch (error) {
      console.error('Error updating subscription:', error);
      return false;
    }
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    setLoading(true);
    
    try {
      // Initialize payment with our new API
      await initializePayment({
        amount: planPrice,
        currency: 'INR',
        planName,
        planSku,
        userName: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim(),
        userEmail: profile?.email || user.email || '',
        onSuccess: async (paymentData) => {
          console.log('Payment successful, updating subscription:', paymentData);
          
          // Update user subscription in database
          const updated = await updateUserSubscription(paymentData);
          
          if (updated) {
            toast.success('Subscription activated successfully!');
            
            // Trigger success callback if provided
            if (onSuccess) {
              onSuccess();
            }
          } else {
            toast.error('Payment was successful, but subscription could not be updated');
          }
          
          setLoading(false);
        },
        onError: (error) => {
          console.error('Payment failed:', error);
          toast.error(error.message || 'Payment failed. Please try again.');
          
          // Trigger error callback if provided
          if (onError) {
            onError(error);
          }
          
          setLoading(false);
        }
      });
    } catch (error: any) {
      console.error('Payment failed:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
      
      // Trigger error callback if provided
      if (onError) {
        onError(error instanceof Error ? error : new Error(String(error)));
      }
      
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading} 
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default RazorpayCheckout; 
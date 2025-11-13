import { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import OrderSummary from './OrderSummary';
import ConfirmationMessage from './ConfirmationMessage';

interface PurchaseSummaryPageProps {
  userName: string;
  onLogout: () => void;
  onNavigateToHome: () => void;
  bookingData: {
    from: string;
    to: string;
    date: string;
    departureTime: string;
    arrivalTime: string;
    passengers: Array<{ id: number; type: 'student' | 'adult' }>;
    totalPrice: number;
    baseAmount: number;
  };
  onConfirmOrder: (orderData: any) => void;
}

const ORDER_CONFIRMED_KEY = 'kudo_order_confirmed';
const CONFIRMATION_TIMESTAMP_KEY = 'kudo_confirmation_timestamp';
const ORDER_SAVED_KEY = 'kudo_order_saved'; 

const PurchaseSummaryPage: React.FC<PurchaseSummaryPageProps> = ({
  userName,
  onLogout,
  onNavigateToHome,
  bookingData,
  onConfirmOrder
}) => {
  
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(() => {
    const saved = localStorage.getItem(ORDER_CONFIRMED_KEY);
    return saved === 'true';
  });

  const [orderData, setOrderData] = useState<any>(null);
  const orderSentRef = useRef(false); 

  const handleConfirmOrder = () => {
    console.log('🎉 Confirming order...');
    
    const newOrderData = {
      ...bookingData,
      orderDate: new Date().toISOString(),
      orderId: `ORDER-${Date.now()}`
    };

    setOrderData(newOrderData);
    setOrderConfirmed(true);
    
    // Lagre til localStorage
    localStorage.setItem(ORDER_CONFIRMED_KEY, 'true');
    localStorage.setItem(CONFIRMATION_TIMESTAMP_KEY, Date.now().toString());
    localStorage.setItem(ORDER_SAVED_KEY, 'false'); 
    
    console.log('✅ Order confirmed state updated');
  };

  // Når orderConfirmed blir true
  useEffect(() => {
    if (orderConfirmed && orderData) {
      
      const orderSaved = localStorage.getItem(ORDER_SAVED_KEY);
      
      if (orderSaved !== 'true' && !orderSentRef.current) {
        console.log('📦 Sending order to parent...');
        onConfirmOrder(orderData);
        localStorage.setItem(ORDER_SAVED_KEY, 'true'); 
        orderSentRef.current = true; 
      } else {
        console.log('⏭️ Order already saved, skipping...');
      }

      // Sjekk når confirmation startet
      const timestampStr = localStorage.getItem(CONFIRMATION_TIMESTAMP_KEY);
      const timestamp = timestampStr ? parseInt(timestampStr) : Date.now();
      const timeElapsed = Date.now() - timestamp;
      const remainingTime = Math.max(6000 - timeElapsed, 0);

      console.log(`⏱️ Redirecting in ${remainingTime}ms...`);

      // Redirect etter gjenværende tid
      const timer = setTimeout(() => {
        console.log('🏠 Redirecting to home...');
        localStorage.removeItem(ORDER_CONFIRMED_KEY);
        localStorage.removeItem(CONFIRMATION_TIMESTAMP_KEY);
        localStorage.removeItem(ORDER_SAVED_KEY); 
        onNavigateToHome();
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [orderConfirmed, orderData, onConfirmOrder, onNavigateToHome]);

  // Cleanup hvis confirmation er gammel (mer enn 10 sekunder)
  useEffect(() => {
    const timestampStr = localStorage.getItem(CONFIRMATION_TIMESTAMP_KEY);
    if (timestampStr) {
      const timestamp = parseInt(timestampStr);
      const timeElapsed = Date.now() - timestamp;
      
      if (timeElapsed > 10000) {
        // Hvis mer enn 10 sekunder gammel, redirect umiddelbart
        console.log('⏰ Confirmation expired, redirecting...');
        localStorage.removeItem(ORDER_CONFIRMED_KEY);
        localStorage.removeItem(CONFIRMATION_TIMESTAMP_KEY);
        localStorage.removeItem(ORDER_SAVED_KEY); 
        onNavigateToHome();
      }
    }
  }, [onNavigateToHome]);

  console.log('🖼️ Rendering PurchaseSummaryPage. orderConfirmed:', orderConfirmed);

  return (
    <Layout 
      userName={userName} 
      onLogout={onLogout}
      onNavigateToHome={onNavigateToHome}
    >
      {!orderConfirmed ? (
        <OrderSummary
          bookingData={bookingData}
          onConfirm={handleConfirmOrder}
          onCancel={onNavigateToHome}
        />
      ) : (
        <ConfirmationMessage />
      )}
    </Layout>
  );
};

export default PurchaseSummaryPage;
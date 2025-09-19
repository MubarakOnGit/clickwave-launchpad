import { collection, addDoc, doc, getDoc, getDocs, query, where, updateDoc, serverTimestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '@/lib/firebase';
import { Order, OrderItem, DeliveryInfo, OrderStatus, ORDER_STATUS_INFO } from '@/types/order';

export const generateTrackingId = (customerName: string): string => {
  const namePrefix = customerName.replace(/\s+/g, '').toUpperCase().slice(0, 3);
  const uniqueId = nanoid(8).toUpperCase();
  return `${namePrefix}-${uniqueId}`;
};

export const createOrder = async (
  items: OrderItem[],
  deliveryInfo: DeliveryInfo,
  paymentMethod: string,
  totalAmount: number
): Promise<string> => {
  const trackingId = generateTrackingId(deliveryInfo.name);
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7); // 7 days from now

  const order: Omit<Order, 'id'> = {
    trackingId,
    customerName: deliveryInfo.name,
    customerEmail: deliveryInfo.email,
    items,
    deliveryInfo,
    paymentMethod,
    totalAmount,
    status: 'confirmed',
    statusHistory: [{
      status: 'confirmed',
      timestamp: new Date(),
      estimatedDays: ORDER_STATUS_INFO.confirmed.estimatedDays
    }],
    createdAt: new Date(),
    updatedAt: new Date(),
    estimatedDelivery
  };

  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      statusHistory: order.statusHistory.map(status => ({
        ...status,
        timestamp: serverTimestamp()
      }))
    });
    
    return trackingId;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

export const getOrderByTrackingId = async (trackingId: string): Promise<Order | null> => {
  try {
    // In a real implementation, you'd query by trackingId
    // For now, we'll use the trackingId as the document ID for simplicity
    const ordersCollection = collection(db, 'orders');
    const querySnapshot = await getDocs(query(ordersCollection, where('trackingId', '==', trackingId)));
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      estimatedDelivery: data.estimatedDelivery?.toDate() || new Date(),
      statusHistory: data.statusHistory?.map((status: any) => ({
        ...status,
        timestamp: status.timestamp?.toDate() || new Date()
      })) || []
    } as Order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

export const updateOrderStatus = async (
  trackingId: string,
  newStatus: OrderStatus
): Promise<boolean> => {
  try {
    const order = await getOrderByTrackingId(trackingId);
    if (!order) return false;

    const statusUpdate = {
      status: newStatus,
      timestamp: new Date(),
      estimatedDays: ORDER_STATUS_INFO[newStatus].estimatedDays
    };

    await updateDoc(doc(db, 'orders', order.id), {
      status: newStatus,
      statusHistory: [...order.statusHistory, statusUpdate],
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};

export const sendTrackingEmail = async (
  email: string,
  trackingId: string,
  customerName: string
): Promise<boolean> => {
  // In a real implementation, you would use a service like SendGrid, AWS SES, or Firebase Functions
  // For now, we'll simulate the email sending
  const trackingUrl = `${window.location.origin}/track/${trackingId}`;
  
  try {
    // Simulate email sending
    console.log(`Sending tracking email to ${email}`);
    console.log(`Tracking URL: ${trackingUrl}`);
    console.log(`Customer: ${customerName}`);
    
    // You would implement actual email sending here
    // Example: await emailService.send({
    //   to: email,
    //   subject: `Order Confirmation - Tracking ID: ${trackingId}`,
    //   html: `
    //     <h2>Order Confirmed!</h2>
    //     <p>Hi ${customerName},</p>
    //     <p>Your order has been confirmed. Track your order using the link below:</p>
    //     <a href="${trackingUrl}">${trackingUrl}</a>
    //     <p>Tracking ID: ${trackingId}</p>
    //   `
    // });
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
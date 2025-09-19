export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface DeliveryInfo {
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  address: string;
  district: string;
  pincode: string;
}

export type OrderStatus = 'confirmed' | 'packing' | 'on-the-way' | 'delivered';

export interface Order {
  id: string;
  trackingId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  deliveryInfo: DeliveryInfo;
  paymentMethod: string;
  totalAmount: number;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: Date;
    estimatedDays?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery: Date;
}

export const ORDER_STATUS_INFO = {
  confirmed: {
    label: 'Order Confirmed',
    description: 'Your order has been confirmed and is being processed',
    estimatedDays: 1
  },
  packing: {
    label: 'Packing',
    description: 'Your order is being packed and prepared for shipping',
    estimatedDays: 2
  },
  'on-the-way': {
    label: 'On the Way',
    description: 'Your order is on its way to your delivery address',
    estimatedDays: 3
  },
  delivered: {
    label: 'Delivered',
    description: 'Your order has been successfully delivered',
    estimatedDays: 0
  }
};
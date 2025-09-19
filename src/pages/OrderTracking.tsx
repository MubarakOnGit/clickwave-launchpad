import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Copy, 
  ArrowLeft,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { getOrderByTrackingId } from '@/services/orderService';
import { Order, OrderStatus, ORDER_STATUS_INFO } from '@/types/order';
import { useToast } from '@/hooks/use-toast';

const OrderTracking = () => {
  const { trackingId } = useParams<{ trackingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!trackingId) {
        setError('Invalid tracking ID');
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrderByTrackingId(trackingId);
        if (orderData) {
          setOrder(orderData);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [trackingId]);

  const copyTrackingLink = () => {
    const trackingUrl = window.location.href;
    navigator.clipboard.writeText(trackingUrl);
    toast({
      title: 'Link copied!',
      description: 'Tracking link has been copied to your clipboard.',
    });
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'packing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'on-the-way':
        return <Truck className="w-5 h-5 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'packing':
        return 'bg-blue-100 text-blue-800';
      case 'on-the-way':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Order Tracking
              </h1>
              <p className="text-muted-foreground">
                Track your order status and delivery information
              </p>
            </div>
            <Button variant="outline" onClick={copyTrackingLink}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    Order Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {ORDER_STATUS_INFO[order.status].label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {ORDER_STATUS_INFO[order.status].description}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {ORDER_STATUS_INFO[order.status].label}
                      </Badge>
                    </div>
                    
                    {order.status !== 'delivered' && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Estimated delivery: {order.estimatedDelivery.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.statusHistory.map((status, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {getStatusIcon(status.status)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">
                            {ORDER_STATUS_INFO[status.status].label}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {status.timestamp.toLocaleString()}
                          </p>
                          {status.estimatedDays && status.estimatedDays > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Expected to take {status.estimatedDays} day{status.estimatedDays > 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Total Amount:</span>
                      <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Details Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking ID</p>
                    <p className="font-mono font-semibold">{order.trackingId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">{order.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{order.paymentMethod}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">{order.deliveryInfo.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryInfo.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryInfo.district}, {order.deliveryInfo.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{order.deliveryInfo.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{order.deliveryInfo.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
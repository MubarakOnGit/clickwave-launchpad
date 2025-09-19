import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Phone, CreditCard, Banknote, Mail, Copy, ExternalLink } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { createOrder, sendTrackingEmail } from "@/services/orderService";
import { OrderItem, DeliveryInfo } from "@/types/order";

const KERALA_DISTRICTS = [
  "Kasaragod",
  "Kannur", 
  "Wayanad",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Thrissur",
  "Ernakulam",
  "Idukki",
  "Kottayam",
  "Alappuzha",
  "Pathanamthitta",
  "Kollam",
  "Thiruvananthapuram"
];

interface CheckoutDialogProps {
  children: React.ReactNode;
}

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    district: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { state, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const totalPrice = getTotalPrice();

  const updateDeliveryInfo = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'address', 'district', 'pincode'];
    for (const field of requiredFields) {
      if (!deliveryInfo[field as keyof DeliveryInfo]?.trim()) {
        toast({
          title: "Validation Error",
          description: `Please fill in ${field.charAt(0).toUpperCase() + field.slice(1)}`,
          variant: "destructive",
        });
        return;
      }
    }

    if (!paymentMethod) {
      toast({
        title: "Validation Error",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Convert cart items to order items
      const orderItems: OrderItem[] = state.items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image?.src || item.product.image || ''
      }));

      // Create order in Firebase
      const trackingId = await createOrder(
        orderItems,
        deliveryInfo,
        paymentMethod,
        totalPrice
      );

      // Send tracking email
      await sendTrackingEmail(deliveryInfo.email, trackingId, deliveryInfo.name);

      // Generate tracking URL
      const trackingUrl = `${window.location.origin}/track/${trackingId}`;

      toast({
        title: "Order placed successfully!",
        description: (
          <div className="space-y-2">
            <p>Order ID: {trackingId}</p>
            <p>Tracking email sent to {deliveryInfo.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(trackingUrl);
                  toast({ title: "Link copied!" });
                }}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy Link
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(trackingUrl, '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Track Order
              </Button>
            </div>
          </div>
        ),
        duration: 10000,
      });
      
      clearCart();
      setIsOpen(false);
      setDeliveryInfo({
        name: '',
        email: '',
        phone: '',
        alternatePhone: '',
        address: '',
        district: '',
        pincode: ''
      });
      setPaymentMethod('');
    } catch (error) {
      console.error('Order creation failed:', error);
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Checkout & Delivery Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delivery Information Form */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Delivery Information</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={deliveryInfo.name}
                    onChange={(e) => updateDeliveryInfo('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={deliveryInfo.email}
                      onChange={(e) => updateDeliveryInfo('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Primary contact number"
                      value={deliveryInfo.phone}
                      onChange={(e) => updateDeliveryInfo('phone', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="alternatePhone"
                      type="tel"
                      placeholder="Alternative contact number"
                      value={deliveryInfo.alternatePhone}
                      onChange={(e) => updateDeliveryInfo('alternatePhone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    value={deliveryInfo.address}
                    onChange={(e) => updateDeliveryInfo('address', e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select value={deliveryInfo.district} onValueChange={(value) => updateDeliveryInfo('district', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      {KERALA_DISTRICTS.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    placeholder="Enter pincode"
                    value={deliveryInfo.pincode}
                    onChange={(e) => updateDeliveryInfo('pincode', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Details & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Separator />


            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                    <Banknote className="h-4 w-4" />
                    Cash on Delivery
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                  <RadioGroupItem value="card" id="card" disabled />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card (Coming Soon)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Checkout Button */}
            <Button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full h-12 text-base"
              size="lg"
            >
              {isProcessing ? (
                "Processing Order..."
              ) : (
                `Place Order - $${totalPrice.toFixed(2)}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
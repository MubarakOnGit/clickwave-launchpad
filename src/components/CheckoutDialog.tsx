import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Phone, CreditCard, Banknote } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface CheckoutDialogProps {
  children: React.ReactNode;
}

interface DeliveryInfo {
  fullName: string;
  sonOf: string;
  post: string;
  pincode: string;
  landmark: string;
  nearestLocation: string;
  contactNumber1: string;
  contactNumber2: string;
  additionalInfo: string;
}

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: "",
    sonOf: "",
    post: "",
    pincode: "",
    landmark: "",
    nearestLocation: "",
    contactNumber1: "",
    contactNumber2: "",
    additionalInfo: "",
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
    const requiredFields = [
      'fullName', 'sonOf', 'post', 'pincode', 'landmark', 
      'nearestLocation', 'contactNumber1', 'contactNumber2'
    ] as const;

    const missingFields = requiredFields.filter(field => !deliveryInfo[field].trim());

    if (missingFields.length > 0) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: `Your order of $${totalPrice.toFixed(2)} will be delivered to ${deliveryInfo.fullName} at ${deliveryInfo.post}, ${deliveryInfo.pincode}`,
      });
      
      clearCart();
      setIsOpen(false);
      setDeliveryInfo({
        fullName: "",
        sonOf: "",
        post: "",
        pincode: "",
        landmark: "",
        nearestLocation: "",
        contactNumber1: "",
        contactNumber2: "",
        additionalInfo: "",
      });
      setIsProcessing(false);
    }, 2000);
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
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={deliveryInfo.fullName}
                    onChange={(e) => updateDeliveryInfo('fullName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sonOf">S/O, D/O *</Label>
                  <Input
                    id="sonOf"
                    placeholder="Son of / Daughter of"
                    value={deliveryInfo.sonOf}
                    onChange={(e) => updateDeliveryInfo('sonOf', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="post">Post *</Label>
                    <Input
                      id="post"
                      placeholder="Post Office"
                      value={deliveryInfo.post}
                      onChange={(e) => updateDeliveryInfo('post', e.target.value)}
                      required
                    />
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

                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark *</Label>
                  <Input
                    id="landmark"
                    placeholder="Near landmark"
                    value={deliveryInfo.landmark}
                    onChange={(e) => updateDeliveryInfo('landmark', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nearestLocation">Nearest Location *</Label>
                  <Input
                    id="nearestLocation"
                    placeholder="Nearest known location"
                    value={deliveryInfo.nearestLocation}
                    onChange={(e) => updateDeliveryInfo('nearestLocation', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact1">Contact Number 1 *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="contact1"
                        type="tel"
                        placeholder="Primary contact"
                        value={deliveryInfo.contactNumber1}
                        onChange={(e) => updateDeliveryInfo('contactNumber1', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact2">Contact Number 2 *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="contact2"
                        type="tel"
                        placeholder="Alternative contact"
                        value={deliveryInfo.contactNumber2}
                        onChange={(e) => updateDeliveryInfo('contactNumber2', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any additional delivery instructions..."
                    value={deliveryInfo.additionalInfo}
                    onChange={(e) => updateDeliveryInfo('additionalInfo', e.target.value)}
                    rows={3}
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
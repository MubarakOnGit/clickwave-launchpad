import React, { useState, useEffect, useCallback } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { MapPin, Search, Phone, CreditCard, Banknote } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const GOOGLE_MAPS_API_KEY = "AIzaSyDeeCaQhGvrdWAU0jMm4f_n7stvXarlfVY";

interface CheckoutDialogProps {
  children: React.ReactNode;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const MapComponent: React.FC<{
  onAddressSelect: (address: Address) => void;
  selectedAddress: Address | null;
}> = ({ onAddressSelect, selectedAddress }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  const mapOptions: google.maps.MapOptions = {
    zoom: 15,
    center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    
    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userLocation);
          
          // Add marker for current location
          const currentLocationMarker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your current location",
            icon: {
              url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
            },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    // Add click listener to map
    map.addListener("click", (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        // Remove existing delivery marker
        if (marker) {
          marker.setMap(null);
        }
        
        // Add new delivery marker
        const deliveryMarker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: "Delivery location",
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#ef4444"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32),
          },
        });
        
        setMarker(deliveryMarker);
        
        // Reverse geocode to get address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const addressComponents = results[0].address_components;
            const formattedAddress = results[0].formatted_address;
            
            let street = "";
            let city = "";
            let state = "";
            let zipCode = "";
            let country = "";
            
            addressComponents?.forEach((component) => {
              const types = component.types;
              if (types.includes("street_number") || types.includes("route")) {
                street += component.long_name + " ";
              } else if (types.includes("locality")) {
                city = component.long_name;
              } else if (types.includes("administrative_area_level_1")) {
                state = component.short_name;
              } else if (types.includes("postal_code")) {
                zipCode = component.long_name;
              } else if (types.includes("country")) {
                country = component.long_name;
              }
            });
            
            const address: Address = {
              street: street.trim() || formattedAddress.split(",")[0],
              city,
              state,
              zipCode,
              country,
              coordinates: { lat, lng },
            };
            
            onAddressSelect(address);
          }
        });
      }
    });
  }, [onAddressSelect, marker]);

  const onSearchBoxLoad = useCallback((searchBox: google.maps.places.SearchBox) => {
    setSearchBox(searchBox);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (searchBox && map) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          
          map.setCenter({ lat, lng });
          map.setZoom(17);
          
          // Trigger click event to add marker
          google.maps.event.trigger(map, "click", {
            latLng: new google.maps.LatLng(lat, lng),
          });
        }
      }
    }
  }, [searchBox, map]);

  return (
    <div className="relative h-96 w-full rounded-lg overflow-hidden border">
      <div className="absolute top-3 left-3 right-3 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={(ref) => {
              if (ref && map) {
                const searchBox = new google.maps.places.SearchBox(ref);
                onSearchBoxLoad(searchBox);
                searchBox.addListener("places_changed", onPlacesChanged);
              }
            }}
            placeholder="Search for an address..."
            className="pl-10 bg-white shadow-md"
          />
        </div>
      </div>
      <div id="map" className="h-full w-full" ref={(ref) => {
        if (ref && !map) {
          const newMap = new google.maps.Map(ref, mapOptions);
          onLoad(newMap);
        }
      }} />
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          Click on the map to set delivery location
        </div>
      </div>
    </div>
  );
};

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [phone, setPhone] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { state, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast({
        title: "Address Required",
        description: "Please select a delivery address on the map.",
        variant: "destructive",
      });
      return;
    }

    if (!phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: `Your order of $${totalPrice.toFixed(2)} will be delivered to ${selectedAddress.street}, ${selectedAddress.city}`,
      });
      
      clearCart();
      setIsOpen(false);
      setSelectedAddress(null);
      setPhone("");
      setAdditionalInfo("");
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
            <MapPin className="h-5 w-5" />
            Checkout & Delivery Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Select Delivery Location</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Click on the map to pin your delivery address
              </p>
            </div>
            
            <Wrapper apiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
              <MapComponent 
                onAddressSelect={setSelectedAddress}
                selectedAddress={selectedAddress}
              />
            </Wrapper>
            
            {selectedAddress && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Selected Address:</h4>
                <p className="text-sm">
                  {selectedAddress.street}<br />
                  {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}<br />
                  {selectedAddress.country}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Coordinates: {selectedAddress.coordinates.lat.toFixed(6)}, {selectedAddress.coordinates.lng.toFixed(6)}
                </p>
              </div>
            )}
          </div>

          {/* Order Details & Form */}
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

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information (Optional)</Label>
                <Textarea
                  id="additional-info"
                  placeholder="Floor number, building name, landmarks, special instructions..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={3}
                />
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
              disabled={!selectedAddress || !phone.trim() || isProcessing}
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
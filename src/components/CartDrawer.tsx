import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Minus, X, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CheckoutDialog } from "./CheckoutDialog";

const CartDrawer = () => {
  const { state, updateQuantity, removeItem, clearCart, toggleCart, getTotalItems, getTotalPrice } = useCart();
  const { toast } = useToast();


  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet open={state.isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground">Add some products to get started</p>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                    <img
                      src={item.product.image?.src || item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-6 h-6"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-6 h-6"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-6 h-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <CheckoutDialog>
                    <Button
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      size="lg"
                      disabled={state.items.length === 0}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Checkout
                    </Button>
                  </CheckoutDialog>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full"
                    size="sm"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
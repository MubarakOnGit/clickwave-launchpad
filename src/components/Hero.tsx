import { Sparkles, Star, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const phrases = [
    "Business Growth",
    "Digital Vision", 
    "Market Dreams",
    "Revenue Success",
    "Brand Excellence",
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Spline 3D Background */}
      <div className="absolute inset-0">
        <iframe
          src="https://my.spline.design/100followers-kY5QRygP2f9CK7VUStQBQcP1/?controls=false"
          title="3D Orb Background"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          loading="lazy"
          aria-label="Interactive 3D background with vertical rotation"
        />
      </div>

      {/* Subtle Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 mb-10 border border-white/20 animate-slide-up">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-wide uppercase">
              Premium Marketing Partnership
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight animate-slide-up-delayed tracking-tight font-sans">
            Transform Your
            <span
              key={currentPhrase}
              className="block bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-400 bg-clip-text text-transparent animate-text-slide"
            >
              {phrases[currentPhrase]}
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-12 border-2 border-white/30 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-4 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* CSS for Animations */}
      <style>{`
        @keyframes textSlide {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-text-slide { animation: textSlide 4s ease-in-out infinite; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        .animate-slide-up-delayed { animation: slideUp 1s ease-out 0.2s forwards; }
        .animate-fade-in-up { animation: slideUp 1.2s ease-out 0.4s forwards; }
        .animate-fade-in-up-delayed { animation: slideUp 1.4s ease-out 0.6s forwards; }

        .font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      `}</style>

      {/* Featured Products Section */}
      <div className="relative z-10 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group hover-lift cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-strong"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                      {product.originalPrice && (
                        <Badge variant="destructive">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/products")}
              variant="outline"
              size="lg"
              className="bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
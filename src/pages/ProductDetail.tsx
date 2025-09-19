import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ShoppingCart, 
  Heart,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Check
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <nav className="text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground" onClick={() => navigate("/")}>
              Home
            </span>
            {" > "}
            <span className="cursor-pointer hover:text-foreground" onClick={() => navigate("/products")}>
              Products
            </span>
            {" > "}
            <span className="cursor-pointer hover:text-foreground" onClick={() => navigate(`/products?category=${product.category}`)}>
              {product.category}
            </span>
            {" > "}
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image?.src || product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge variant="destructive">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Additional product images would go here */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={product.image?.src || product.image}
                  alt={`${product.name} view ${i + 1}`}
                  className={`w-full h-20 object-cover rounded cursor-pointer border-2 transition-colors ${
                    selectedImage === i ? "border-primary" : "border-border"
                  }`}
                  onClick={() => setSelectedImage(i)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <Badge variant="destructive" className="text-sm">
                    Save ${product.originalPrice! - product.price}
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="text-sm font-medium text-foreground mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product Benefits */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-foreground">Free Shipping</p>
                      <p className="text-sm text-muted-foreground">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-foreground">2 Year Warranty</p>
                      <p className="text-sm text-muted-foreground">Full manufacturer warranty</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-foreground">30-Day Returns</p>
                      <p className="text-sm text-muted-foreground">Easy return policy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-foreground">In Stock</p>
                      <p className="text-sm text-muted-foreground">Ready to ship</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card 
                  key={relatedProduct.id} 
                  className="group hover-lift cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image?.src || relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedProduct.featured && (
                        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(relatedProduct.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({relatedProduct.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">
                          ${relatedProduct.price}
                        </span>
                        {relatedProduct.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${relatedProduct.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
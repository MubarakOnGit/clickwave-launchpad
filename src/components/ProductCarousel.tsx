import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { useMemo } from "react";

interface ProductCarouselProps {
  products: Product[];
  title: string;
  subtitle?: string;
}

// Shuffle array function (JSX-safe version)
const shuffleArray = (array: any[]): any[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ProductCard = ({
  id,
  name,
  description,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  featured,
  category,
  popular,
  tags,
}: Product) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id, name, description, image, price, originalPrice, rating, reviews, featured, category, popular, tags });
    toast({
      title: "Added to cart!",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={image?.src || image}
          alt={name}
          className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-product.jpg';
          }}
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {featured && (
            <Badge className="bg-gradient-primary text-white">Featured</Badge>
          )}
          {originalPrice && (
            <Badge variant="destructive">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-300">({reviews})</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xl font-bold text-white">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">${originalPrice}</span>
          )}
        </div>
      </div>
      <Button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    </figure>
  );
};

const ProductCarousel = ({ products, title, subtitle }: ProductCarouselProps) => {
  // Shuffle rows for different orders (upper and lower)
  const shuffledFirstRow = useMemo(() => shuffleArray(products.slice(0, Math.ceil(products.length / 2))), [products]);
  const shuffledSecondRow = useMemo(() => shuffleArray(products.slice(Math.ceil(products.length / 2))), [products]);

  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:10s] gap-4"> {/* Faster: 10s */}
            {shuffledFirstRow.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Marquee>
          <div className="my-6" /> {/* Gap between rows: 1.5rem (24px) */}
          <Marquee reverse pauseOnHover className="[--duration:10s] gap-4"> {/* Faster: 10s */}
            {shuffledSecondRow.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
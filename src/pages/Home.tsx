import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import { getFeaturedProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Zap, Target } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />
      
      {/* Featured Products Carousel */}
      <ProductCarousel
        products={featuredProducts}
        title="Featured Products"
        subtitle="Discover our hand-picked selection of premium products"
      />

      {/* Simple Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Choose Click Wave?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Strategic Marketing
              </h3>
              <p className="text-muted-foreground">
                Data-driven campaigns that convert followers into customers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Global Marketplace
              </h3>
              <p className="text-muted-foreground">
                Access to millions of potential customers worldwide
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Fast Results
              </h3>
              <p className="text-muted-foreground">
                See growth within the first 30 days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Scale Your Business?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of successful companies who trust Click Wave to amplify their reach and boost their sales.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/partner")}
              className="bg-white text-primary hover:bg-white/90 hover:shadow-strong font-semibold px-8 py-4 rounded-xl"
            >
              Become a Partner
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/products")}
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 rounded-xl"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
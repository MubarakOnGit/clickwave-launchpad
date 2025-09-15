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

      {/* Clean Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We deliver measurable results through proven strategies and innovative technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group text-center p-8 rounded-3xl hover:bg-card/50 transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Strategic Growth
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Data-driven campaigns that turn engagement into sales
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl hover:bg-card/50 transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Global Reach
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Access millions of customers through our platform
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl hover:bg-card/50 transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Rapid Results
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                See measurable growth within 30 days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[80px]"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Scale?
          </h2>
          <p className="text-white/85 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join successful companies who trust Click Wave to amplify their reach and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              onClick={() => navigate("/partner")}
              className="group bg-white text-primary hover:bg-white/95 font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <span>Start Partnership</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/products")}
              className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-md font-semibold px-10 py-5 rounded-2xl hover:border-white/40 transition-all duration-500"
            >
              View Products
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
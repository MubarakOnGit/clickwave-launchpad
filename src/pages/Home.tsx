import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import { getFeaturedProducts, getPopularProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, Zap, Target, Globe } from "lucide-react";

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const popularProducts = getPopularProducts();

  return (
    <>
      <Hero />
      
      {/* Featured Products Carousel */}
      <ProductCarousel
        products={featuredProducts}
        title="Featured Products"
        subtitle="Discover our hand-picked selection of premium products from our trusted partners"
      />

      {/* Why Choose Click Wave */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Click Wave?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're not just another marketing agency. We're your strategic partner in growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Strategic Marketing",
                description: "Data-driven social media campaigns that convert followers into customers"
              },
              {
                icon: Globe,
                title: "Global Marketplace",
                description: "Access to our premium marketplace with millions of potential customers"
              },
              {
                icon: Users,
                title: "Partner Success",
                description: "Dedicated support team ensuring your products reach their full potential"
              },
              {
                icon: Zap,
                title: "Fast Results",
                description: "See measurable growth in your sales within the first 30 days"
              },
              {
                icon: CheckCircle,
                title: "Proven Track Record",
                description: "98% success rate with over 500 partner companies worldwide"
              },
              {
                icon: ArrowRight,
                title: "End-to-End Solution",
                description: "From marketing to sales, we handle everything so you can focus on innovation"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover-lift border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-soft">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Carousel */}
      <ProductCarousel
        products={popularProducts}
        title="Popular Products"
        subtitle="Best-selling products loved by thousands of customers worldwide"
      />

      {/* Partner CTA Section */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary-light/20 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Scale Your Business?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join hundreds of successful companies who trust Click Wave to amplify their reach and boost their sales through our proven marketing strategies and marketplace platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 hover:shadow-strong font-semibold px-8 py-4 rounded-xl"
              >
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 rounded-xl"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                    <Target className="w-6 h-6 text-primary mr-2" />
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground">
                    To empower innovative companies by bridging the gap between exceptional products and their target audiences through strategic marketing and our cutting-edge marketplace platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                    <Globe className="w-6 h-6 text-primary mr-2" />
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground">
                    To become the world's leading marketing partner, creating a thriving ecosystem where businesses of all sizes can achieve unprecedented growth and success.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-card rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
                  <p className="text-muted-foreground">Partner Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
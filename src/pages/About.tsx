import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, 
  Globe, 
  Users, 
  TrendingUp, 
  Award,
  ArrowRight,
  Heart,
  Lightbulb,
  Shield
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Click Wave
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            We're on a mission to bridge the gap between innovative products and their ideal customers through strategic marketing and our cutting-edge marketplace platform.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, Click Wave emerged from a simple observation: amazing products were struggling to reach their intended audiences in an increasingly crowded digital marketplace. Our founders, experienced marketers and e-commerce veterans, recognized the gap between product innovation and market success.
                </p>
                <p>
                  What started as a small marketing consultancy has evolved into a comprehensive platform that combines strategic social media marketing with a premium marketplace, serving over 500 partner companies and reaching millions of customers worldwide.
                </p>
                <p>
                  Today, we're proud to be the trusted growth partner for businesses ranging from innovative startups to established brands, helping them achieve unprecedented reach and sales success.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-card rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
                  <p className="text-muted-foreground">Success Stories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mission & Vision
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Driving our purpose and guiding our future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border/50 hover:shadow-soft transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  To empower innovative companies by bridging the gap between exceptional products and their target audiences through strategic marketing and our cutting-edge marketplace platform, creating sustainable growth and success for our partners.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-soft transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground">
                  To become the world's leading marketing partner and marketplace, creating a thriving ecosystem where businesses of all sizes can achieve unprecedented growth and connect with customers worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "We constantly seek new ways to help our partners succeed in an evolving marketplace"
              },
              {
                icon: Heart,
                title: "Partnership",
                description: "We believe in genuine partnerships built on mutual success and shared growth"
              },
              {
                icon: Shield,
                title: "Integrity",
                description: "We operate with transparency, honesty, and unwavering ethical standards"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for exceptional results in everything we do, never settling for good enough"
              }
            ].map((value, index) => (
              <Card key={index} className="group hover-lift border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-soft text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Numbers that tell our success story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                number: "500+",
                label: "Partner Companies",
                description: "Trusted by businesses worldwide"
              },
              {
                icon: TrendingUp,
                number: "2M+",
                label: "Products Sold",
                description: "Through our marketplace"
              },
              {
                icon: Globe,
                number: "50+",
                label: "Countries",
                description: "Global reach and presence"
              },
              {
                icon: Award,
                number: "98%",
                label: "Success Rate",
                description: "Partner satisfaction score"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Join Our Success Story?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Discover how Click Wave can help your business reach new heights through strategic marketing and our premium marketplace platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold px-8 py-4 rounded-xl"
              >
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-muted/50 font-semibold px-8 py-4 rounded-xl"
              >
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
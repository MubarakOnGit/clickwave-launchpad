import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Zap, 
  ArrowRight,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";

const Partner = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Partner With Click Wave
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Join hundreds of successful companies who trust us to amplify their reach and boost their sales through strategic marketing and our premium marketplace.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 hover:shadow-strong font-semibold px-8 py-4 rounded-xl"
          >
            Start Your Partnership Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the benefits of joining our partner ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "98% of our partners see significant growth within the first 3 months",
                stat: "98% Success Rate"
              },
              {
                icon: Users,
                title: "Massive Reach",
                description: "Access to our network of 2M+ active customers across multiple platforms",
                stat: "2M+ Customers"
              },
              {
                icon: Zap,
                title: "Fast Implementation",
                description: "Get your products live and selling within 7 days of partnership approval",
                stat: "7 Day Setup"
              }
            ].map((benefit, index) => (
              <Card key={index} className="group hover-lift border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-soft text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {benefit.description}
                  </p>
                  <div className="text-2xl font-bold text-primary">
                    {benefit.stat}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple steps to get your products in front of millions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Apply",
                description: "Submit your partnership application with product details"
              },
              {
                step: "02", 
                title: "Review",
                description: "Our team conducts a thorough review of your products and proposal"
              },
              {
                step: "03",
                title: "Strategy",
                description: "We develop a custom marketing strategy tailored to your products"
              },
              {
                step: "04",
                title: "Launch",
                description: "Your products go live across our marketing channels and marketplace"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-primary mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground text-lg">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-border/50 hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@company.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Company" />
                    </div>
                    
                    <div>
                      <Label htmlFor="productCategory">Product Category</Label>
                      <Input id="productCategory" placeholder="e.g., Electronics, Fashion, Home & Garden" />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Tell us about your products</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Describe your products, target audience, and partnership goals..."
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      size="lg"
                    >
                      Submit Partnership Application
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Get in Touch
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Have questions? Our partnership team is here to help you succeed.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-muted-foreground">partners@clickwave.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Live Chat</p>
                      <p className="text-muted-foreground">Available Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-card p-6 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">
                    Partnership Requirements
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Quality products with proven market demand</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Reliable inventory and fulfillment capabilities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Commitment to customer service excellence</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Competitive pricing and margins</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partner;
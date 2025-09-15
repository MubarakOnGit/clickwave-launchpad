import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0">
        <iframe 
          src='https://my.spline.design/r4xbot-5HJsN96hnCAlQdzLLl4OK9kR/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/10 animate-slide-up">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-white/90 tracking-wide">
              Premium Marketing Partnership
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight animate-slide-up-delayed">
            Transform Your
            <span className="block bg-gradient-to-r from-accent via-primary to-accent-light bg-clip-text text-transparent animate-gradient">
              Business Growth
            </span>
          </h1>

          {/* Refined Subheadline */}
          <p className="text-xl md:text-2xl text-white/85 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up">
            Strategic social media marketing and marketplace solutions that drive real results for ambitious companies.
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up-delayed">
            <Button
              size="lg"
              onClick={() => navigate("/products")}
              className="group bg-white text-primary hover:bg-white/95 font-semibold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/partner")}
              className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-md font-semibold px-10 py-5 rounded-2xl hover:border-white/40 transition-all duration-500"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-12 border-2 border-white/20 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-4 bg-white/40 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
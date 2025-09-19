"use client"; // Added for client-side rendering

import { Sparkles } from "lucide-react";
import { MorphingText } from "../components/magicui/morphing-text";

const Hero = () => {
  const phrases = [
    "Business Growth",
    "Digital Vision",
    "Market Dreams",
    "Revenue Success",
    "Brand Excellence",
  ];

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
        <MorphingText
  texts={phrases}
  className="block text-blue-400 !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl"
/>
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
    </section>
  );
};

export default Hero;
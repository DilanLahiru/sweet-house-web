import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductSlide {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  gradient: string;
}

const ProductSlider = () => {
  const products: ProductSlide[] = [
    {
      id: 1,
      title: 'Layer Toffee',
      subtitle: 'Smooth & Delicious',
      color: 'from-amber-600 to-amber-900',
      gradient: 'bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900',
    },
    {
      id: 2,
      title: 'Coconut Candy',
      subtitle: 'Pure Natural Sweetness',
      color: 'from-orange-500 to-orange-700',
      gradient: 'bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-700',
    },
    {
      id: 3,
      title: 'Milk Toffee',
      subtitle: 'Heritage Recipe',
      color: 'from-red-600 to-red-900',
      gradient: 'bg-gradient-to-br from-pink-300 via-red-400 to-red-700',
    },
    {
      id: 4,
      title: 'Mixed Sweets',
      subtitle: 'Special Collection',
      color: 'from-rose-600 to-rose-900',
      gradient: 'bg-gradient-to-br from-rose-300 via-pink-400 to-rose-700',
    },
    {
      id: 5,
      title: 'Premium Assortment',
      subtitle: 'Best Quality Selection',
      color: 'from-purple-600 to-purple-900',
      gradient: 'bg-gradient-to-br from-purple-300 via-purple-500 to-purple-900',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000); // Change slide every 5 seconds

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, products.length]);

  // Reset auto-play when manual navigation
  const handleManualNavigation = (newSlide: number) => {
    setCurrentSlide(newSlide);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const nextSlide = () => {
    handleManualNavigation((currentSlide + 1) % products.length);
  };

  const prevSlide = () => {
    handleManualNavigation((currentSlide - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    handleManualNavigation(index);
  };

  return (
    <div className="relative w-full h-screen md:h-[700px] bg-gray-900 overflow-hidden group">
      {/* Animated Background Slides */}
      <div className="relative w-full h-full">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {/* Animated Gradient Background */}
            <div className={`w-full h-full ${product.gradient} animate-pulse-subtle`} />

            {/* Geometric Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              {/* Floating Product Icon */}
              <div className="mb-8 text-8xl md:text-9xl animate-bounce-slow opacity-80">
                🛍️
              </div>

              {/* Title with Glow Effect */}
              <div className="text-center space-y-4 z-10">
                <h2 className="text-4xl md:text-6xl font-bold font-display drop-shadow-lg animate-fade-in">
                  {product.title}
                </h2>
                <p className="text-lg md:text-2xl text-white/80 font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {product.subtitle}
                </p>
              </div>

              {/* Brand Badge */}
              <div className="mt-12 bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/30">
                <p className="text-sm md:text-base font-semibold text-white/90">
                  🍯 Sandamali Products — Since 1987
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full backdrop-blur-sm border border-white/30 ${
              index === currentSlide
                ? 'bg-white/80 w-10 md:w-12 h-3 md:h-4'
                : 'bg-white/30 hover:bg-white/50 w-3 md:w-4 h-3 md:h-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Status Indicators */}
      <div className="absolute top-8 right-8 z-20 flex items-center gap-4">
        {/* Auto-play indicator */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs md:text-sm text-white/80 font-medium">Auto Playing</span>
        </div>

        {/* Slide Counter */}
        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
          <span className="text-xs md:text-sm text-white/90 font-medium">
            {currentSlide + 1}/{products.length}
          </span>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="absolute bottom-24 left-0 right-0 z-10 flex justify-center gap-4 px-4">
        <a
          href="https://wa.me/0764802025"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
        >
          📱 WhatsApp: 076 480 20 25
        </a>
        <a
          href="tel:0342294383"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
        >
          📞 Call: 034 229 43 83
        </a>
      </div>
    </div>
  );
};

export default ProductSlider;

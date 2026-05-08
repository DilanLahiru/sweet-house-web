import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Banner1 from "@/assets/Poster-1.jpeg";
import Banner2 from "@/assets/Poster-2.jpeg";
import Banner3 from "@/assets/Poster-3.jpeg";
import Banner4 from "@/assets/Poster-4.jpeg";
import Banner5 from "@/assets/Poster-5.jpeg";
import Banner6 from "@/assets/Poster-6.jpeg";
import Banner7 from "@/assets/Poster-7.jpeg";
import Banner8 from "@/assets/Poster-8.jpeg";
import Banner9 from "@/assets/Poster-9.jpeg";

interface ProductImage {
  id: number;
  url: string;
  title: string;
  subtitle: string;
}

const ImageSlider = () => {
  const products: ProductImage[] = [
    {
      id: 1,
      url: Banner1,
      title: 'Layer Toffee',
      subtitle: 'Classic Flavor Perfected',
    },
    {
      id: 2,
      url: Banner2,
      title: 'Coconut Candy',
      subtitle: 'Pure Natural Sweetness',
    },
    {
      id: 3,
      url: Banner3,
      title: 'Milk Toffee',
      subtitle: 'Heritage Recipe Since 1987',
    },
    {
      id: 4,
      url: Banner4,
      title: 'Mixed Sweets',
      subtitle: 'Special Collection',
    },
    {
      id: 5,
      url: Banner5,
      title: 'Premium Assortment',
      subtitle: 'Best Quality Selection',
    },
    {
      id: 6,
      url: Banner6,
      title: 'Deluxe Chocolate',
      subtitle: 'Rich & Indulgent Flavor',
    },
    {
      id: 7,
      url: Banner7,
      title: 'Fruit Candies',
      subtitle: 'Natural Ingredients',
    },
    {
      id: 8,
      url: Banner8,
      title: 'Nutty Treats',
      subtitle: 'Crunchy Delight',
    },
    {
      id: 9,
      url: Banner9,
      title: 'Special Edition',
      subtitle: 'Limited Time Offering',
    },
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [products.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentIndex];

  // Floating animation keyframes
  const floatingVariants: any = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Slide transition variants
  const slideVariants: any = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="w-full bg-gradient-to-b from-cocoa-deep/5 to-background py-12 md:py-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-cocoa-deep mb-4">
            Premium Collection
          </h2>
          <p className="text-base md:text-lg text-cocoa/70">
            Discover our finest handcrafted sweets
          </p>
          <div className="flex gap-2 justify-center mt-6">
            {products.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-gold w-8' : 'bg-cocoa/30'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Full-Screen Gallery Container */}
        <div className="relative h-[380px] md:h-[450px] lg:h-[520px] overflow-hidden rounded-2xl">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-cocoa-deep/10 pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Product Display with Animation */}
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            {/* Product Image with Floating Effect */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="h-full flex items-center justify-center p-8 md:p-12"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.img
                  src={currentProduct.url}
                  alt={currentProduct.title}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  onMouseEnter={() => setHoveredId(currentProduct.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow: '0 0 60px rgba(210, 180, 140, 0.3)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 60px rgba(210, 180, 140, 0.3)',
                      '0 0 100px rgba(210, 180, 140, 0.6)',
                      '0 0 60px rgba(210, 180, 140, 0.3)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Product Info Overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cocoa-deep/95 to-transparent p-8 md:p-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {currentProduct.title}
                </h3>
                <p className="text-lg text-gold mb-6">
                  {currentProduct.subtitle}
                </p>

                {/* Progress Bar */}
                <div className="w-20 h-1 bg-gold/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6, ease: 'linear' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-cocoa-deep p-3 md:p-4 rounded-full shadow-lg backdrop-blur-sm transition-all"
            aria-label="Previous product"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-cocoa-deep p-3 md:p-4 rounded-full shadow-lg backdrop-blur-sm transition-all"
            aria-label="Next product"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Product Counter */}
          <motion.div
            className="absolute top-6 right-6 bg-white/80 text-cocoa-deep px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {currentIndex + 1} / {products.length}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;

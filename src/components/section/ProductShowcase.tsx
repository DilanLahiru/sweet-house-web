import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Sparkles, ArrowRight } from "lucide-react";
import Item1 from "@/assets/Item1.jpeg";
import Item2 from "@/assets/Item2.jpeg";
import Item3 from "@/assets/Item3.jpeg";
import Item4 from "@/assets/Item4.jpeg";
import Item5 from "@/assets/Item5.jpeg";
import Item6 from "@/assets/Item6.jpeg";
import Item7 from "@/assets/Item7.jpeg";
import Item8 from "@/assets/Item8.jpeg";

const products = [
  {
    id: 1,
    name: "Coconut Toffee",
    price: "Rs. 10",
    weight: "220g",
    description: "Colorful coconut toffee with vibrant flavors",
    image: Item1,
    color: "from-pink-400 to-yellow-400",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Peni Kaju",
    price: "Rs. 10",
    weight: "220g",
    description: "Mixed nuts and grains traditional sweet",
    image: Item2,
    color: "from-orange-400 to-red-500",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Kiri Aluwa",
    price: "Rs. 10",
    weight: "270g",
    description: "Creamy milk-based confectionery",
    image: Item3,
    color: "from-yellow-100 to-orange-200",
    badge: "Classic",
  },
  {
    id: 4,
    name: "Gingelly Ball",
    price: "Rs. 10",
    weight: "220g",
    description: "Sesame seed traditional balls",
    image: Item4,
    color: "from-amber-400 to-orange-500",
    badge: "Artisan",
  },
  {
    id: 5,
    name: "Milk Toffee",
    price: "Rs. 20",
    weight: "260g",
    description: "Rich and creamy milk toffee",
    image: Item5,
    color: "from-yellow-500 to-orange-600",
    badge: "Bestseller",
  },
  {
    id: 6,
    name: "Dates Toffee",
    price: "Rs. 20",
    weight: "450g",
    description: "Premium dates and toffee blend",
    image: Item6,
    color: "from-orange-600 to-red-700",
    badge: "Premium",
  },
  {
    id: 7,
    name: "Layer Toffee",
    price: "Rs. 10",
    weight: "300g",
    description: "Multi-layered toffee delight",
    image: Item7,
    color: "from-orange-400 to-red-600",
    badge: "New",
  },
  {
    id: 8,
    name: "Rulan Toffee",
    price: "Rs. 10",
    weight: "220g",
    description: "Traditional Rulan toffee specialty",
    image: Item8,
    color: "from-yellow-600 to-orange-700",
    badge: "Traditional",
  },
];

const PremiumProductCard = ({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 md:h-96 shadow-warm"
    >
      {/* Full image background */}
      <motion.img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Dark overlay that darkens only the bottom on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.95 : 0.3,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black bg-opacity-80 text-white text-xs font-medium font-sans tracking-wider z-10"
      >
        {product.badge}
      </motion.div>

      {/* Wishlist Button */}
      {/* <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-lg hover:shadow-xl z-10"
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
          }`}
          strokeWidth={2}
        />
      </motion.button> */}

      {/* Content overlay - positioned at bottom with gradient background */}
      <motion.div
        animate={{
          y: isHovered ? 0 : 80,
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-7 z-10"
      >
        {/* Price */}
        {/* <motion.p className="text-white font-display text-2xl md:text-3xl font-bold">
          {product.price}
        </motion.p> */}

        {/* Name */}
        <motion.h3 className="font-display font-bold text-lg md:text-xl text-white">
          {product.name}
        </motion.h3>

        {/* Description */}
        <motion.p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </motion.p>
        {/* Weight */}
        <motion.p className="text-white/80 text-xs tracking-widest uppercase">
          {product.weight}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products", count: 8 },
    { id: "bestseller", label: "Bestsellers", count: 2 },
    { id: "premium", label: "Premium", count: 2 },
    { id: "new", label: "New Arrivals", count: 1 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-28 md:py-40 bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-96 -right-96 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-96 -left-96 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Explore Our Collection
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-balance mb-6"
          >
            Crafted with{" "}
            <span className="bg-accent italic bg-clip-text text-transparent">
              Legacy
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-serif italic"
          >
            Every sweet is a masterpiece of tradition and taste, handcrafted
            with premium ingredients and no artificial additives. Experience
            heritage in every bite.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-accent text-white shadow-lg shadow-accent/30"
                  : "bg-white/50 border border-accent/20 text-primary hover:border-accent/40 hover:bg-white/70"
              }`}
            >
              {cat.label}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.id
                    ? "bg-white/20"
                    : "bg-accent/10 text-accent"
                }`}
              >
                {cat.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20"
        >
          {products.map((product, index) => (
            <PremiumProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />
          <div className="absolute inset-0 border border-accent/20 rounded-3xl" />

          <div className="relative px-8 md:px-12 py-12 md:py-16 text-center">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Create Your Perfect Bundle
            </h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto italic font-serif">
              Mix and match your favorite sweets to create a personalized
              collection. Perfect for gifts or sharing with loved ones.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { baseUrl, API_PATH } from "@/utils/baseUrl";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  weight: number;
  tags?: string[];
}

const CARD_GRADIENTS = [
  "from-pink-400 to-yellow-400",
  "from-orange-400 to-red-500",
  "from-yellow-100 to-orange-200",
  "from-amber-400 to-orange-500",
  "from-yellow-500 to-orange-600",
  "from-orange-600 to-red-700",
  "from-orange-400 to-red-600",
  "from-yellow-600 to-orange-700",
];

const PremiumProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const badge = product.tags?.[0] ?? "";
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 md:h-96 shadow-warm"
    >
      {/* Full image background */}
      {product.image ? (
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      )}

      {/* Dark overlay */}
      <motion.div
        animate={{ opacity: isHovered ? 0.95 : 0.3 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
      />

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.07 + 0.2 }}
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-medium tracking-wider z-10 capitalize"
        >
          {badge}
        </motion.div>
      )}

      {/* Content overlay */}
      <motion.div
        animate={{ y: isHovered ? 0 : 80, opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-7 z-10"
      >
        <motion.h3 className="font-display font-bold text-lg md:text-xl text-white">
          {product.name}
        </motion.h3>
        <motion.p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </motion.p>
        <div className="flex items-center justify-between">
          <motion.p className="text-white/70 text-xs tracking-widest uppercase">
            {product.weight}g
          </motion.p>
          <motion.p className="text-white font-bold text-sm">
            Rs. {product.price}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}${API_PATH.PRODUCT.LOAD_ALL}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Could not load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Derive unique tags from all products
  const allTags = Array.from(
    new Set(products.flatMap((p) => p.tags ?? []))
  );

  const categories = [
    { id: "all", label: "All Products", count: products.length },
    ...allTags.map((tag) => ({
      id: tag,
      label: tag.charAt(0).toUpperCase() + tag.slice(1),
      count: products.filter((p) => p.tags?.includes(tag)).length,
    })),
  ];

  const filtered =
    selectedTag === "all"
      ? products
      : products.filter((p) => p.tags?.includes(selectedTag));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-28 md:py-40 bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden"
    >
      {/* Animated background blobs */}
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
        {/* Header */}
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

        {/* Category Filter â€” only show when data is loaded */}
        {!loading && !error && categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedTag === cat.id
                    ? "bg-accent text-white shadow-lg shadow-accent/30"
                    : "bg-white/50 border border-accent/20 text-primary hover:border-accent/40 hover:bg-white/70"
                }`}
              >
                {cat.label}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedTag === cat.id
                      ? "bg-white/20"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* States: loading / error / empty / grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin text-accent" />
            <p className="text-sm">Loading productsâ€¦</p>
          </div>
        ) : error ? (
          <div className="text-center py-32 text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 text-muted-foreground">
            No products found in this category.
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => (
                <PremiumProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* CTA */}
        {!loading && !error && (
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
        )}
      </div>
    </section>
  );
};

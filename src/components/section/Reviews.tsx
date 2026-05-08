import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Malini Perera",
    role: "Homemaker",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    text: "My family has been enjoying Sandamali sweets for generations. The quality and taste never compromise. Simply the best!",
    featured: false,
  },
  {
    id: 2,
    name: "Ajith Rajapakse",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    text: "We gift Sandamali sweets to our clients regularly. It's always appreciated. The authentic taste speaks volumes about the brand.",
    featured: false,
  },
  {
    id: 3,
    name: "Chamari Silva",
    role: "Event Organizer",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
    rating: 5,
    text: "Consistently excellent! From festivals to corporate events, Sandamali delivers perfection every time. Trustworthy and reliable.",
    featured: false,
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, margin: "-100px" }}
      whileHover={{ y: -8 }}
      className={`group relative rounded-2xl border border-border/60 p-6 md:p-8 backdrop-blur-sm transition-all duration-300 ${
        review.featured
          ? "lg:col-span-1 bg-gradient-to-br from-accent/10 via-card to-card shadow-warm border-accent/40"
          : "bg-card/50 hover:shadow-lg hover:border-accent/20"
      }`}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className="flex gap-1 mb-4"
        >
          {Array.from({ length: review.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Star className="w-4 h-4 fill-accent text-accent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Review Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          className="text-muted-foreground mb-6 leading-relaxed italic text-sm md:text-base"
        >
          "{review.text}"
        </motion.p>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.15 }}
          className="flex items-center gap-4 pt-6 border-t border-border/40"
        >
          
          <div>
            <p className="font-display font-semibold text-sm text-primary">{review.name}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-24 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-100px" }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-widest uppercase"
          >
            What Our Customers Say
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mt-6 font-display font-bold text-4xl md:text-5xl text-primary text-balance"
          >
            Loved by <span className="italic text-accent">thousands of happy customers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mt-5 text-muted-foreground text-lg"
          >
            From weddings to daily celebrations, Sandamali Sweet House brings joy to every occasion.
          </motion.p>
        </motion.div>

        {/* Featured Reviews */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {reviews
            .filter((r) => r.featured)
            .map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
        </div>

        {/* Other Reviews */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews
            .filter((r) => !r.featured)
            .map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index + 2} />
            ))}
        </div>
        
      </div>
    </section>
  );
};

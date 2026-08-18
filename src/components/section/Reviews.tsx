import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllReviews, selectReviews } from "@/services/reviewSlice";

const AVATAR_GRADIENTS = [
  "from-amber-700 to-orange-600",
];

const ReviewCard = ({ review, index }) => {
  const gradient = AVATAR_GRADIENTS[review.name.charCodeAt(0) % AVATAR_GRADIENTS.length];
  const initials = review.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: false, margin: "-80px" }}
      whileHover={{ y: -6 }}
      className="group relative h-full"
    >
      {/* Glowing gradient border on hover */}
      <div
        className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm pointer-events-none`}
      />

      <div className="relative h-full flex flex-col rounded-3xl bg-card border border-border/50 p-6 md:p-7 overflow-hidden shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
        {/* Decorative large quote mark */}
        <span className="absolute -top-3 -left-1 text-[110px] font-serif leading-none select-none pointer-events-none text-amber-400/10">
          &ldquo;
        </span>

        {/* Top row: stars + rating number */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 + i * 0.06 }}
                viewport={{ once: false }}
              >
                <Star
                  className={`w-4 h-4 transition-colors duration-200 ${
                    i < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted/40 text-muted/40"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${gradient} text-white shadow-sm`}
          >
            {review.rating}.0
          </span>
        </div>

        {/* Comment */}
        <p className="relative z-10 flex-1 text-foreground/75 leading-relaxed text-sm md:text-[0.9375rem] italic mb-6">
          &ldquo;{review.comment}&rdquo;
        </p>

        {/* Gradient divider */}
        <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent mb-5" />

        {/* Author row */}
        <div className="relative z-10 flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 shrink-0 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-white/10`}
          >
            {initials}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">{review.name}</p>
            <p className="text-xs text-muted-foreground">Verified Customer</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews) as typeof reviews[0][];
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {dispatch(loadAllReviews());}, [dispatch]);

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

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review._id} review={review} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

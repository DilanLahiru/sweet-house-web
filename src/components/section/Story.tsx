import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import factory2 from "@/assets/heritage.png";

const milestones = [
  { year: "1988", title: "A home business is born", text: "K.D. Senaratne starts Sandamali Sweets from home with Rs. 1000 capital, producing various types of traditional sweets." },
  { year: "Early Days", title: "Mastering the craft", text: "Mr. Deepal Senaratne brings expertise learned from a local restaurant, specializing in traditional recipes like Rulang Topi." },
  { year: "Growth", title: "Expansion with tradition", text: "Manual workers and dedication grow the business, maintaining the commitment to hand-made quality without technological shortcuts." },
  { year: "Today", title: "A legacy of sweetness", text: "Sandamali Sweet House continues to delight customers with authentic, hand-crafted sweets made with pure ingredients and family recipes." },
];

export const Story = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
     <section id="story" className="relative py-24 md:py-32 bg-secondary/40 overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-14 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: false, margin: "-100px" }}
          className="relative order-2 lg:order-1"
        >
          <div className="absolute -inset-6 bg-accent/20 rounded-[2.5rem] blur-2xl" />
          <motion.img
            src={factory2}
            alt="Hands shaping milk toffee on marble"
            loading="lazy"
            width={960}
            height={720}
            className="relative rounded-[2rem] w-full object-cover shadow-warm border border-border/60"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false, margin: "-100px" }}
            className="absolute -bottom-8 -right-6 bg-card rounded-2xl shadow-card border border-border/60 p-5 max-w-[220px] hidden md:block"
          >
            <div className="font-display font-bold text-3xl text-accent">38<span className="text-primary">+</span></div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Years of family craft</div>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, margin: "-100px" }}
          className="order-1 lg:order-2"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: false, margin: "-100px" }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-widest uppercase"
          >
            Our Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mt-5 font-display font-bold text-4xl md:text-5xl text-primary text-balance"
          >
            Sandamali Sweet House <span className="italic text-accent">since 1988.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mt-5 text-muted-foreground uppercase tracking-wide text-sm italic"
          >
            K.D. Senaratne started his own business called Sandamali Sweets in 1988 from his open 
            space at home with a starting capital of Rs. 1000. With the help of manual workers and 
            no technological facilities, the business grew through dedication to traditional recipes 
            and quality craftsmanship. Every sweet we make today carries the same passion and 
            commitment that defined our humble beginnings.
          </motion.p>

          <motion.ol
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mt-10 relative border-l-2 border-dashed border-accent/40 pl-8 space-y-7"
          >
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: false, margin: "-100px" }}
                className="relative"
              >
                <span className="absolute -left-[42px] top-1 h-5 w-5 rounded-full bg-gradient-warm border-4 border-background shadow-warm" />
                <div className="font-display text-sm font-bold text-accent tracking-widest">{m.year}</div>
                <h3 className="font-display font-bold text-xl text-primary mt-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
};

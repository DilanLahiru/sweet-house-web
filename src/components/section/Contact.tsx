import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Clock, Phone, Mail, ArrowRight } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit",
    line1: "Kalutara-Matugama Road",
    line2: "Dodangoda, Sri Lanka",
  },
  {
    icon: Clock,
    title: "Hours",
    line1: "Mon — Sat · 8 am to 8 pm",
    line2: "Sunday · 9am to 6pm",
  },
  {
    icon: Mail,
    title: "Contact",
    line1: "+94 77 910 4236",
    line2: "sandamalisweethouse@gmail.com",
  },
];

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 md:py-40 bg-cocoa text-primary-foreground overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none"
      />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-xs uppercase tracking-[0.3em] text-accent mb-5 font-semibold"
          >
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: false, margin: "-100px" }}
            className="font-display text-5xl md:text-6xl font-bold leading-[1.1] text-balance text-white"
          >
            Come for the sweets.
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
              className="block text-accent italic mt-2"
            >
              Stay for the story.
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mt-8 text-white/60 leading-relaxed text-lg max-w-2xl mx-auto"
          >
            Walk into our flagship workshop in Kandy and watch the kettles steam. Or order a Heritage Box delivered island-wide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a
              href="tel:+94779104236"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold tracking-wide bg-white text-accent hover:shadow-xl transition-all"
            >
              <Phone className="w-5 h-5" />
              Call to Order
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.a>

            <motion.a
              href="mailto:sandamalisweethouse@gmail.com"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold tracking-wide border border-white/30 text-white hover:border-white/60 transition-all backdrop-blur-sm"
            >
              <Mail className="w-5 h-5" />
              sandamalisweethouse@gmail.com
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false, margin: "-100px" }}
          className="mt-20 grid md:grid-cols-3 gap-6"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, margin: "-100px" }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl p-8 border border-white/20 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 mb-6 inline-block p-3 rounded-lg bg-white/15 backdrop-blur-sm"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                    className="text-xs uppercase tracking-[0.3em] text-white/70 mb-4 font-semibold"
                  >
                    {info.title}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.15 }}
                    className="font-display text-xl font-bold text-white mb-2"
                  >
                    {info.line1}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    className="text-white/60 text-sm"
                  >
                    {info.line2}
                  </motion.div>
                </div>

                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    borderRadius: "inherit",
                    boxShadow: "inset 0 0 20px rgba(255,255,255,0)",
                  }}
                  whileHover={{
                    boxShadow: "inset 0 0 20px rgba(255,255,255,0.1)",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
          className="mt-20 text-center"
        >
          <p className="text-white/60 mb-6">Ready to taste the heritage?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 rounded-full bg-white text-accent font-bold tracking-wide hover:shadow-2xl transition-all"
          >
            Order Your Sweet Box
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import toffee from "@/assets/Item-5.jpeg";
import dodol from "@/assets/Item-4.jpeg";
import kokis from "@/assets/Item-6.jpeg";
import aluwa from "@/assets/Item-1.jpeg";
import textureBg from "@/assets/texture-bg.jpg";

const products = [
  { img: toffee, name: "Kiri Toffee", tag: "Bestseller", desc: "Slow-cooked milk caramel with cashew shards.", price: "LKR 850", tone: "bg-accent text-accent-foreground" },
  { img: dodol, name: "Gingelly Ball", tag: "Heritage", desc: "Sesame seed traditional balls", price: "LKR 1,200", tone: "bg-cocoa text-primary-foreground" },
  { img: kokis, name: "Dates Toffee", tag: "New Year", desc: "Premium dates and toffee blend", price: "LKR 650", tone: "bg-rose text-rose-foreground" },
  { img: aluwa, name: "Coconut Toffee", tag: "Limited", desc: "Colorful coconut toffee with vibrant flavors", price: "LKR 750", tone: "bg-secondary text-secondary-foreground" },
];

export const Products = () => {
  return (
    <section id="products" className="relative py-28 md:py-40 bg-cocoa text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url(${textureBg})`, backgroundSize: "cover" }}
        aria-hidden
      />

      <div className="relative container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, margin: "-100px" }}
              className="inline-block text-xs tracking-[0.3em] uppercase text-accent mb-5"
            >
              The Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] text-balance"
            >
              Sweets that remember <em className="text-accent italic"> who you are. </em>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false, margin: "-100px" }}
            href="/products"
            className="text-sm tracking-widest uppercase text-primary-foreground/70 hover:text-accent transition-colors"
          >
            View Full Catalogue →
          </motion.a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12, scale: 0.95, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.92 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
              viewport={{ once: false, margin: "-100px" }}
              className="group relative bg-card text-card-foreground rounded-3xl overflow-hidden cursor-pointer"
            >
              <motion.div className="relative aspect-square overflow-hidden">
                <motion.img
                  src={p.img}
                  alt={p.name}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={800}
                />
                <motion.span
                  initial={{ opacity: 0.9, y: 0 }}
                  whileHover={{ y: -4 }}
                  className={`absolute top-4 left-4 ${p.tone} text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full shadow-soft`}
                >
                  {p.tag}
                </motion.span>
              </motion.div>
              <motion.div className="p-6">
                <motion.div className="flex items-baseline justify-between gap-3">
                  <motion.h3
                    whileHover={{ color: "rgba(222, 160, 102, 1)" }}
                    className="font-display text-2xl font-bold"
                  >
                    {p.name}
                  </motion.h3>
                  {/* <span className="text-sm font-semibold text-accent">{p.price}</span> */}
                </motion.div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

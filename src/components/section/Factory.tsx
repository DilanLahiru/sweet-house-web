import { motion } from "framer-motion";
import f1 from "@/assets/factory1.jpg";
import f2 from "@/assets/factory2.jpg";
import f3 from "@/assets/factory5.jpg";
import f4 from "@/assets/factory4.jpg";

export const Factory = () => {
  return (
    <>
      <section id="factory" className="relative h-screen md:h-[90vh] bg-background overflow-hidden">
      {/* Hero Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        viewport={{ once: false, margin: "-100px" }}
        className="absolute inset-0"
      >
        <img
          src={f1}
          alt="Factory workshop"
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa/70 via-cocoa/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cocoa/30" />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-between p-8 md:p-16">
        {/* Top Content */}
        <div className="flex flex-col justify-center flex-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false, margin: "-100px" }}
              className="inline-block text-xs tracking-[0.3em] uppercase text-accent mb-6"
            >
              Inside the Factory
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, margin: "-100px" }}
              className="font-display text-6xl md:text-7xl lg:text-7xl font-black leading-[0.95] text-primary-foreground text-balance mb-6"
            >
              Where tradition <em className="text-accent italic block">becomes craft.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed"
            >
              Copper kettles. Marble slabs. Patient hands that have perfected the art
              over generations. Every sweet tells our story.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: false, margin: "-100px" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(222, 160, 102, 1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-accent text-background font-semibold text-center transition-all duration-300 hover:shadow-lg"
          >
            Schedule a Visit →
          </motion.a> */}
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full border-2 border-primary-foreground text-primary-foreground font-semibold text-center hover:bg-primary-foreground/10 transition-all duration-300"
          >
            View Our Sweets →
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>

    {/* Process Timeline Section */}
    <section id="factory-process" className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <h3 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
            How It <em className="text-accent italic">All Begins</em>
          </h3>
          <p className="text-lg text-foreground/70 leading-relaxed">
            From the moment ingredients enter our workshop to the final wrap, every step is guided by generations of expertise and an unwavering commitment to quality.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Timeline Line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20" />

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
            {/* Step 1: Cooking */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, margin: "-100px" }}
              className="group"
            >
              {/* Timeline Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(222, 160, 102, 0.4)" }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg border-4 border-background mb-8 cursor-pointer relative z-10"
                >
                  <span className="font-display text-2xl font-black text-background">01</span>
                </motion.div>

                {/* Content Card with Background Image */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative h-96 rounded-2xl overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${f4})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/95 via-cocoa/60 to-cocoa/30" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div>
                      <h4 className="font-display text-3xl font-bold text-primary-foreground mb-3">Cooking</h4>
                    </div>
                    <div>
                      <p className="text-primary-foreground/90 leading-relaxed text-sm mb-4">
                        The heart of our craft. Milk, sugar, and ghee simmer in massive copper kettles over slow heat for 8-12 hours.
                      </p>
                      <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="space-y-2 text-xs text-accent font-semibold tracking-wide uppercase"
                      >
                        <li>✓ 8-12 hours heating</li>
                        <li>✓ Temperature by hand</li>
                        <li>✓ Copper kettles only</li>
                      </motion.ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Step 2: Pouring */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
              className="group"
            >
              {/* Timeline Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(222, 160, 102, 0.4)" }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg border-4 border-background mb-8 cursor-pointer relative z-10"
                >
                  <span className="font-display text-2xl font-black text-background">02</span>
                </motion.div>

                {/* Content Card with Background Image */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative h-96 rounded-2xl overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${f2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/95 via-cocoa/60 to-cocoa/30" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div>
                      <h4 className="font-display text-3xl font-bold text-primary-foreground mb-3">Pouring</h4>
                    </div>
                    <div>
                      <p className="text-primary-foreground/90 leading-relaxed text-sm mb-4">
                        Boiling caramel is carefully poured onto cold, polished marble slabs. Timing and control must be perfect.
                      </p>
                      <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="space-y-2 text-xs text-accent font-semibold tracking-wide uppercase"
                      >
                        <li>✓ Skilled hands</li>
                        <li>✓ Marble cooling</li>
                        <li>✓ Shaped while warm</li>
                      </motion.ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Step 3: Packing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false, margin: "-100px" }}
              className="group"
            >
              {/* Timeline Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(222, 160, 102, 0.4)" }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg border-4 border-background mb-8 cursor-pointer relative z-10"
                >
                  <span className="font-display text-2xl font-black text-background">03</span>
                </motion.div>

                {/* Content Card with Background Image */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative h-96 rounded-2xl overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${f3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/95 via-cocoa/60 to-cocoa/30" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div>
                      <h4 className="font-display text-3xl font-bold text-primary-foreground mb-3">Packing</h4>
                    </div>
                    <div>
                      <p className="text-primary-foreground/90 leading-relaxed text-sm mb-4">
                        Each piece is dusted, inspected, and carefully wrapped with sustainable packaging to protect our heritage.
                      </p>
                      <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="space-y-2 text-xs text-accent font-semibold tracking-wide uppercase"
                      >
                        <li>✓ Hand-inspected</li>
                        <li>✓ Sustainable wrap</li>
                        <li>✓ Ready to enjoy</li>
                      </motion.ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing Message */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: false, margin: "-100px" }}
          className="mt-16 md:mt-24 p-8 md:p-12 rounded-2xl bg-accent/5 border border-accent/20 text-center"
        >
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            <em>There are no shortcuts in our kitchen. Every batch is made the way <span className="text-accent font-semibold">amma</span> made them — with patience, precision, and <span className="text-accent font-semibold">pride</span>.</em>
          </p>
        </motion.div> */}
      </div>
    </section>
    </>
  );
};

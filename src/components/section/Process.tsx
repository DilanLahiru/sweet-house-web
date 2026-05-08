const steps = [
  { n: "01", t: "Source", d: "Coconut from Kurunegala. Treacle from village kithul tappers. Cashew from the south." },
  { n: "02", t: "Slow Cook", d: "Eight hours over open flame in century-old copper kettles. No shortcuts." },
  { n: "03", t: "Hand Cut", d: "Set on cool marble, scored by hand. Each piece weighed and inspected." },
  { n: "04", t: "Wrap & Ship", d: "Wrapped in waxed paper, boxed by our team, sent fresh nationwide." },
];

export const Process = () => {
  return (
    <section id="process" className="relative py-28 md:py-40 bg-secondary overflow-hidden">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-accent mb-5">The Craft</span>
          <h2 className="font-display text-5xl md:text-6xl font-black leading-[0.95] text-balance">
            Four steps. <em className="text-accent not-italic">No shortcuts.</em>
          </h2>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden shadow-soft">
          {steps.map((s) => (
            <li key={s.n} className="bg-card p-8 md:p-10 hover:bg-cocoa hover:text-primary-foreground group transition-all duration-700 ease-silk">
              <div className="font-display text-6xl font-black text-accent group-hover:text-accent transition-colors">{s.n}</div>
              <h3 className="mt-6 font-display text-2xl font-bold">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

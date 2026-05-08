import Logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-cocoa-deep text-primary-foreground/80 py-14">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Sandamali Logo" className="h-16 w-auto" />
            </div>
            <p className="mt-5 text-sm leading-relaxed max-w-xs">
              Heritage Sri Lankan sweets, crafted in Dodangoda since 1988.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <ul className="space-y-2">
              <li className="text-xs tracking-widest uppercase text-accent mb-2">Visit</li>
              <li><a href="#story" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Sweets</a></li>
              <li><a href="#factory" className="hover:text-accent transition-colors">Factory</a></li>
            </ul>
            <ul className="space-y-2">
              <li className="text-xs tracking-widest uppercase text-accent mb-2">Connect</li>
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Facebook</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">WhatsApp</a></li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="text-xs tracking-widest uppercase text-accent mb-3">Newsletter</div>
            <p className="mb-4">A monthly note on new batches, festivals, and seasonal releases.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="you@email.com" className="flex-1 bg-primary-foreground/5 border border-primary-foreground/15 rounded-full px-4 py-2 text-sm outline-none focus:border-accent" />
              <button className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold">→</button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <div>© {new Date().getFullYear()} Sandamali Sweethouse. All rights reserved.</div>
          <div>Made with care in Dodangoda, Sri Lanka</div>
        </div>
      </div>
    </footer>
  );
};

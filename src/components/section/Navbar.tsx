import { useEffect, useState } from "react";
import Logo from "@/assets/logo.png";

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#products", label: "Sweets" },
  { href: "#factory", label: "Factory" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Visit Us" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-silk ${
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={Logo} alt="Sandamali Logo" className="h-16 w-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-accent hover:after:w-full after:transition-all"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#products"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cocoa text-primary-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-500 ease-silk shadow-soft"
        >
          Shop Sweets
          <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  );
};

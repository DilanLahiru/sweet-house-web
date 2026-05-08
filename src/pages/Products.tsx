import { Navbar } from "@/components/section/Navbar";
import { ProductShowcase } from "@/components/section/ProductShowcase";
import { Contact } from "@/components/section/Contact";
import { Footer } from "@/components/section/Footer";
import { useEffect } from "react";

const ProductShowcasePage = () => {
  useEffect(() => {
    document.title = "Sandamali Sweet House — Our Products";
    const meta = document.querySelector('meta[name="description"]') ?? (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute(
      "content",
      "Explore our complete collection of handcrafted Sri Lankan sweets including milk toffee, kalu dodol, kokis, aluwa and more."
    );
  }, []);

  return (
    <main className="bg-background">
      <Navbar />
      <ProductShowcase />
      <Contact />
      <Footer />
    </main>
  );
};

export default ProductShowcasePage;

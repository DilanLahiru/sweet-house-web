import { Navbar } from "@/components/section/Navbar";
import ImageSlider from "@/components/ImageSlider";
import { Hero3D } from "@/components/section/Hero3D";
import { Story } from "@/components/section/Story";
import { Products } from "@/components/section/Products";
import { Factory } from "@/components/section/Factory";
import { Process } from "@/components/section/Process";
import { Reviews } from "@/components/section/Reviews";
import { Contact } from "@/components/section/Contact";
import { Footer } from "@/components/section/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Sandamali Sweethouse — Heritage Sri Lankan Sweets, Crafted in Galle Since 1987";
    const meta = document.querySelector('meta[name="description"]') ?? (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute(
      "content",
      "Heritage Sri Lankan sweets — milk toffee, kalu dodol, kokis & aluwa — slow-cooked in copper kettles in Galle since 1987."
    );
  }, []);

  return (
    <main className="bg-background">
      <Navbar />
      <Hero3D />
      <ImageSlider />
      <Products />
      <Story />
      <Factory />
      {/* <Process /> */}
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;

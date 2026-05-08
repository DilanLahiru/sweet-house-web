import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef, Suspense, useEffect } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

import jarImg from "@/assets/jarBottel.png";
import textureBg from "@/assets/textureBg.jpg";

const scrollYRef = { current: 0 };

const FloatingJar = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const tex = useLoader(TextureLoader, jarImg);
  tex.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.18;
    // Float animation + scroll-based movement
    ref.current.position.y = Math.sin(t * 0.6) * 0.15 - scrollYRef.current * 0.003;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} scale={[3.4, 3.4, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.01} />
      </mesh>
    </Float>
  );
};

export const Hero3D = () => {
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-gradient-warm text-primary-foreground"
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url(${textureBg})`,
          backgroundSize: "cover",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-spotlight pointer-events-none"
        aria-hidden
      />

      <div className="relative container pt-40 pb-20 md:pt-48 md:pb-32">
        {/* Badge */}
        <div
          className="flex justify-center mb-10 animate-reveal"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 text-accent text-xs tracking-[0.3em] uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Crafted in Sri Lanka · Since 1988
          </span>
        </div>

        {/* Massive headline behind jar */}
        <div className="relative">
          <h1 className="text-center font-display font-black leading-[0.85] text-balance text-[18vw] md:text-[14vw] lg:text-[12rem] xl:text-[14rem]">
            <span
              className="block animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Sandamali
            </span>
            <span
              className="block text-stroke-gold animate-reveal"
              style={{ animationDelay: "0.4s" }}
            >
              Sweets House
            </span>
          </h1>

          {/* 3D Jar overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60vw] max-w-[520px] h-[60vw] max-h-[520px] mt-8 md:mt-12">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: true }}
              >
                <ambientLight intensity={0.8} />
                <directionalLight position={[3, 4, 5]} intensity={1.2} />
                <Suspense fallback={null}>
                  <FloatingJar />
                  <Environment preset="warehouse" />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>

        {/* Subhead */}
        <div
          className="relative mt-8 md:mt-16 max-w-2xl mx-auto text-center animate-reveal"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-base md:text-lg text-primary-foreground/75 italic leading-relaxed">
            Where every sweet tells a story
            <br />
            From copper pots to your celebration table Sandamali Sweethouse
            hand crafts traditional Ceylonese sweets with recipes passed down
            four generations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-cocoa-deep font-semibold shadow-gold hover:scale-[1.03] transition-transform duration-500 ease-silk"
            >
              Explore Our Sweets <span aria-hidden>→</span>
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Our Heritage
            </a>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative border-t border-primary-foreground/10 py-5 overflow-hidden bg-cocoa-deep/40">
        <div className="flex marquee whitespace-nowrap gap-12 font-display text-2xl md:text-3xl text-primary-foreground/40">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span>Milk Toffee</span>
              <span className="text-accent">✦</span>
              <span>Coconut Toffee</span>
              <span className="text-accent">✦</span>
              <span>Kiri Aluwa</span>
              <span className="text-accent">✦</span>
              <span>Thala Bola</span>
              <span className="text-accent">✦</span>
              <span>Coconut Dosi</span>
              <span className="text-accent">✦</span>
              <span>Layer Toffee</span>
              <span className="text-accent">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

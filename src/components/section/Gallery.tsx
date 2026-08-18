import { useEffect, useState, useCallback, useRef } from "react";
import { selectGalleryImages } from "@/services/gallerySlice";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loadAllGalleryImages } from "@/services/gallerySlice";
import { X, ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import textureBg from "@/assets/textureBg.jpg";

interface GalleryImage {
  _id: string;
  imageUrl: string;
  caption?: string;
}

export const Gallery = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectGalleryImages) as GalleryImage[];
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { dispatch(loadAllGalleryImages()); }, [dispatch]);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  const lbPrev = useCallback(
    () => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length]
  );
  const lbNext = useCallback(
    () => setLightbox((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, lbPrev, lbNext]);

  return (
    <section id="gallery" className="relative py-28 md:py-10 bg-cocoa text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url(${textureBg})`, backgroundSize: "cover" }}
              aria-hidden
      />

      {/* ── Header row ── */}
      <div className="container mb-10">
        <div className="flex items-end justify-between gap-6">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: false, margin: "-80px" }}
          >
            <p className="text-[0.6rem] tracking-[0.45em] uppercase text-amber-500/70 font-semibold mb-2">
              Visual Journal
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black text-white leading-[0.9]">
              Behind the<br />
              <em className="not-italic text-amber-400">scenes.</em>
            </h2>
          </motion.div>

          {/* Scroll nav */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className="flex items-center gap-2 pb-1"
            >
              <span className="text-neutral-300 text-xs tracking-widest mr-3 hidden sm:block">scroll</span>
              <button
                onClick={() => scrollBy(-1)}
                className="w-9 h-9 rounded-full border border-neutral-400 hover:border-amber-500/60 hover:bg-amber-500/10 flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="w-9 h-9 rounded-full border border-neutral-400 hover:border-amber-500/60 hover:bg-amber-500/10 flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Thin rule */}
        <div className="mt-8 flex items-center gap-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            viewport={{ once: false }}
            className="h-px flex-1 bg-neutral-800 origin-left"
          />
          {images.length > 0 && (
            <span className="text-[0.55rem] tracking-[0.4em] uppercase text-neutral-600 shrink-0">
              {String(images.length).padStart(2, "0")} photos
            </span>
          )}
        </div>
      </div>

      {/* ── Empty state ── */}
      {images.length === 0 && (
        <div className="container pb-16 flex flex-col items-center gap-3 text-neutral-700">
          <div className="w-12 h-12 rounded-2xl border border-neutral-800 flex items-center justify-center text-lg">🖼</div>
          <p className="text-xs tracking-[0.35em] uppercase">No photos yet</p>
        </div>
      )}

      {/* ── Horizontal filmstrip ── */}
      {images.length > 0 && (
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pl-[max(1rem,calc((100vw-1280px)/2+1rem))] pr-8"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {images.map((photo, i) => (
            <motion.div
              key={photo._id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" as const }}
              viewport={{ once: false, margin: "-40px" }}
              onClick={() => setLightbox(i)}
              className="relative shrink-0 group overflow-hidden rounded-2xl cursor-pointer"
              style={{ width: 340, height: 420 }}
            >
              <img
                src={photo.imageUrl}
                alt={photo.caption || `Photo ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 group-hover:scale-[1.06] transition-all duration-600 ease-out"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Number — top */}
              <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.25em] text-white/40 group-hover:text-white/70 transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Expand arrow */}
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/0 border border-white/0 group-hover:bg-white/10 group-hover:border-white/20 flex items-center justify-center transition-all duration-300">
                <MoveRight className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Bottom caption */}
              <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
                
                {/* Accent line */}
                <div className="mt-3 h-[1.5px] bg-white/10 overflow-hidden rounded-full">
                  <div className="h-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Trailing spacer with "view all" feel */}
          <div className="shrink-0 w-16 flex items-center justify-start pl-2">
            <span className="text-neutral-800 text-xs tracking-widest uppercase rotate-90 whitespace-nowrap">end</span>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="container mt-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-neutral-800" />
          <div className="flex items-center gap-2">
            <span className="block w-1 h-1 rounded-full bg-amber-500/40" />
            <span className="text-[0.55rem] tracking-[0.4em] uppercase text-neutral-200">Sandamali Sweet House</span>
            <span className="block w-1 h-1 rounded-full bg-amber-500/40" />
          </div>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
              <span className="font-mono text-neutral-600 text-xs tracking-[0.3em]">
                {String(lightbox + 1).padStart(2, "0")}
                <span className="mx-1.5 text-neutral-800">/</span>
                {String(images.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => setLightbox(null)}
                className="w-8 h-8 rounded-full border border-neutral-800 hover:border-amber-500/50 hover:bg-amber-500/10 flex items-center justify-center transition-all"
              >
                <X className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              className="absolute left-4 md:left-8 w-10 h-10 rounded-full border border-neutral-800 hover:border-amber-500/50 hover:bg-amber-500/10 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-300" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" as const }}
              className="max-w-3xl w-full mx-16 md:mx-24"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightbox]?.imageUrl}
                alt={images[lightbox]?.caption || `Photo ${lightbox + 1}`}
                className="w-full max-h-[78vh] object-contain rounded-xl"
              />
              {/* {images[lightbox]?.caption && (
                <p className="text-center text-neutral-500 text-sm mt-4">{images[lightbox].caption}</p>
              )} */}
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); lbNext(); }}
              className="absolute right-4 md:right-8 w-10 h-10 rounded-full border border-neutral-800 hover:border-amber-500/50 hover:bg-amber-500/10 flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5 text-neutral-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

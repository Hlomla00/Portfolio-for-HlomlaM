import { Trophy, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useState, useEffect, useCallback } from "react";
import hackathonsData from "../data/hackathons.json";

type Hackathon = typeof hackathonsData.hackathons[0];

// ── Lightbox ──────────────────────────────────────────────────────────────────
const Lightbox = ({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c + 1) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-body text-sm text-white/60 tracking-widest">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-3 md:left-6 text-white/70 hover:text-white transition-colors p-2"
        onClick={prev}
        aria-label="Previous image"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Image */}
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      <button
        className="absolute right-3 md:right-6 text-white/70 hover:text-white transition-colors p-2"
        onClick={next}
        aria-label="Next image"
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
};

// ── HackathonCard ─────────────────────────────────────────────────────────────
const HackathonCard = ({
  hackathon,
  index,
  inView,
}: {
  hackathon: Hackathon;
  index: number;
  inView: boolean;
}) => {
  const images: string[] = (hackathon as { images?: string[] }).images ?? [];
  const hasImages = images.length > 0;

  const [slide, setSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // Track which slides have had their src set — start with only slide 0
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));

  // Auto-slideshow
  useEffect(() => {
    if (!hasImages || images.length < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % images.length), 3000);
    return () => clearInterval(id);
  }, [hasImages, images.length]);

  // As the current slide changes, unlock src for current + next (progressive load)
  useEffect(() => {
    if (!hasImages) return;
    setLoaded((prev) => {
      const next = new Set(prev);
      next.add(slide);
      next.add((slide + 1) % images.length); // preload next
      return next;
    });
  }, [slide, hasImages, images.length]);

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          images={images}
          startIndex={slide}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div
        className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.08)] flex flex-col"
        style={{ animation: inView ? `cascade-in 0.5s ease-out ${index * 0.2}s both` : "none" }}
      >
        {/* ── Image area ── */}
        {hasImages ? (
          <div
            className="relative w-full h-52 cursor-pointer overflow-hidden group"
            onClick={() => setLightboxOpen(true)}
          >
            {/* Slides — only set src once a slide has been reached to avoid
                fetching all 21 large images at page load */}
            {images.map((src, i) => (
              <img
                key={src}
                src={loaded.has(i) ? src : undefined}
                alt={`${hackathon.project} photo ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === slide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Dark gradient so text overlay is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Expand hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="font-body text-xs text-white/80 tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full">
                View gallery
              </span>
            </div>

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlide(i);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === slide ? "bg-white scale-125" : "bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Placeholder when no images */
          <div className="w-full h-52 border-b border-border border-dashed flex items-center justify-center bg-secondary/30">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/40 flex items-center justify-center mx-auto mb-2">
                <Trophy size={20} className="text-muted-foreground/40" />
              </div>
              <p className="font-body text-xs text-muted-foreground/50 tracking-wider uppercase">
                Photo coming soon
              </p>
            </div>
          </div>
        )}

        {/* ── Card content ── */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-1">
                {hackathon.competition} · {hackathon.year}
              </p>
              <h3 className="font-display text-xl md:text-2xl text-foreground leading-tight">
                {hackathon.project}
              </h3>
            </div>
            {/* Position badge */}
            <span className="flex-shrink-0 px-3 py-1.5 bg-accent/15 border border-accent/30 text-accent font-display text-sm tracking-wide rounded-lg whitespace-nowrap">
              {hackathon.position}
            </span>
          </div>

          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
            {hackathon.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {hackathon.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-secondary text-muted-foreground text-[11px] font-body tracking-wide rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const HackathonsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="hackathons" className="min-h-screen py-24 px-6 md:px-12 bg-background" ref={ref}>
      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-3 flex items-center gap-3">
          HACKATHONS <Trophy className="text-accent" size={32} />
        </h2>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-12">
          Competing · Building · Winning
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {hackathonsData.hackathons.map((h, i) => (
            <HackathonCard key={h.id} hackathon={h} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HackathonsSection;

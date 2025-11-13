import React, { useEffect, useMemo, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { ChevronDown, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  src: string;
  alt: string;
};

const slides: Slide[] = [
  {
    src: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1920&auto=format&fit=crop',
    alt: 'Modern corporate office interior with clean lines and glass partitions',
  },
  {
    src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1920&auto=format&fit=crop',
    alt: 'Contemporary building exterior with reflective glass facade',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1920&auto=format&fit=crop',
    alt: 'Architectural rendering of a minimalist lobby with geometric patterns',
  },
  {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop',
    alt: 'Construction site with cranes building a high-rise structure',
  },
];

const SLIDE_INTERVAL_MS = 5600; // ~5-6 seconds

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (isPaused) return;
    const id = window.setTimeout(next, SLIDE_INTERVAL_MS);
    timeoutRef.current = id;
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [index, isPaused]);

  const goToNextSection = () => {
    const nextEl = document.querySelector('#next-section');
    if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
  };

  const imageLayers = useMemo(() => slides.map((s, i) => ({ ...s, active: i === index })), [index]);

  return (
    <section
      className="relative w-full bg-black text-white overflow-hidden"
      aria-label="Hero section with rotating project imagery"
    >
      {/* Responsive heights wrapper */}
      <div className="absolute inset-0 md:h-[90vh] h-[60vh]">
        {/* Spline Background - full cover */}
        <Spline
          scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Crossfading Images on top of Spline (maintains requested media rotation) */}
      <div className="pointer-events-none absolute inset-0 md:h-[90vh] h-[60vh]">
        {imageLayers.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
              img.active ? 'opacity-40' : 'opacity-0'
            }`}
            aria-hidden={!img.active}
          />
        ))}
      </div>

      {/* Green-tinted overlay to ensure contrast and branding */}
      <div
        className="pointer-events-none absolute inset-0 md:h-[90vh] h-[60vh] bg-[rgba(20,40,24,0.55)] mix-blend-multiply"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto h-[60vh] md:h-[90vh] flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <span className="hidden md:inline-block h-1 w-16 bg-[#2E7D32] rounded-full mb-6" aria-hidden="true" />
            <h1
              className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] text-center md:text-left"
            >
              Transforming Your Vision into Reality
            </h1>
            <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-center md:text-left">
              Design–Build excellence for workplaces, retail, and modern developments. We plan, construct, and deliver with precision.
            </p>
            <div className="mt-6 md:mt-8 flex gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 transition shadow-lg"
                style={{ backgroundColor: '#2E7D32' }}
              >
                Explore Our Projects
              </a>

              {/* Carousel controls for accessibility */}
              <div className="flex items-center gap-2" role="group" aria-label="Slideshow controls">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused((p) => !p)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                  aria-pressed={isPaused}
                  aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                >
                  {isPaused ? (
                    <Play className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Pause className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="pointer-events-auto absolute bottom-5 left-0 right-0 flex justify-center z-10">
        <button
          type="button"
          onClick={goToNextSection}
          className="group inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-6 w-6 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
        </button>
      </div>

      {/* Invisible label for current image for screen readers */}
      <p className="sr-only" aria-live="polite">
        Showing slide {index + 1} of {slides.length}: {slides[index].alt}
      </p>
    </section>
  );
};

export default Hero;

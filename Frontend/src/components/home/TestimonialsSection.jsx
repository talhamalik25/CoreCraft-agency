import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { useGSAPAnimations } from "../../hooks/useGSAP";

const testimonials = [
  {
    quote: "CoreCraft gave our product the clarity and confidence it needed to move forward.",
    name: "Michael Brooks",
    role: "Founder",
    company: "Northstar Systems",
    initials: "MB",
  },
  {
    quote: "They understood the ambition behind the brief and turned it into something remarkably precise.",
    name: "Liam Torres",
    role: "Director",
    company: "Atlas Ventures",
    initials: "LT",
  },
];

const TestimonialCard = ({ testimonial, isActive, onGlowMove }) => (
  <article
    className={`group relative w-[min(82vw,42rem)] shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-card p-7 transition-opacity duration-500 sm:p-10 ${isActive ? "opacity-100" : "opacity-40"}`}
    onPointerMove={onGlowMove}
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: "radial-gradient(circle 180px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0, 168, 150, 0.12), transparent 70%)" }}
    />
    <div className="relative z-10 flex min-h-[21rem] flex-col justify-between">
      <div className="flex items-start justify-between">
        <Quote className="text-teal/70" size={28} strokeWidth={1.5} />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Client / {testimonial.number}</span>
      </div>
      <p className="mt-10 font-syne text-2xl font-semibold leading-tight text-white sm:text-3xl">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-10 grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-white/10 pt-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/30 bg-teal-dim font-syne text-xs font-bold text-teal">{testimonial.initials}</div>
        <div>
          <p className="font-dm text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-dim">{testimonial.role} / {testimonial.company}</p>
        </div>
        <ArrowUpRight className="text-teal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
      </div>
    </div>
  </article>
);

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const dragStartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAPAnimations((gsap) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const cards = Array.from(track.children);
    const getTargetX = () => viewport.clientWidth / 2 - cards[activeIndex].offsetLeft - cards[activeIndex].offsetWidth / 2;

    gsap.to(track, { x: getTargetX(), duration: 0.65, ease: "power3.out", overwrite: true });

    const handlePointerDown = (event) => {
      dragStartRef.current = { x: event.clientX, pointerId: event.pointerId };
      viewport.setPointerCapture(event.pointerId);
      gsap.killTweensOf(track);
    };

    const handlePointerUp = (event) => {
      if (!dragStartRef.current) return;
      const delta = event.clientX - dragStartRef.current.x;
      dragStartRef.current = null;
      viewport.releasePointerCapture(event.pointerId);
      if (Math.abs(delta) < 40) return;
      setActiveIndex((current) => Math.max(0, Math.min(testimonials.length - 1, current + (delta < 0 ? 1 : -1))));
    };

    const handleResize = () => gsap.set(track, { x: getTargetX() });
    viewport.addEventListener("pointerdown", handlePointerDown);
    viewport.addEventListener("pointerup", handlePointerUp);
    viewport.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("pointerdown", handlePointerDown);
      viewport.removeEventListener("pointerup", handlePointerUp);
      viewport.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("resize", handleResize);
    };
  }, { scope: sectionRef, dependencies: [activeIndex] });

  const handleGlowMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
  };

  const changeSlide = (direction) => setActiveIndex((index) => Math.max(0, Math.min(testimonials.length - 1, index + direction)));

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-black py-24 text-white md:py-36">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-teal">Client stories</p>
            <h2 className="font-syne text-4xl font-extrabold uppercase leading-[0.92] sm:text-5xl md:text-7xl">Built on <span className="text-teal">trust.</span></h2>
          </div>
          <div className="flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:items-end md:gap-12 md:w-auto">
            <p className="max-w-sm font-dm text-base leading-relaxed text-gray">A few words from the people building what comes next.</p>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <button type="button" onClick={() => changeSlide(-1)} disabled={activeIndex === 0} aria-label="Previous client story" className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 text-white transition-colors hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => changeSlide(1)} disabled={activeIndex === testimonials.length - 1} aria-label="Next client story" className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 text-white transition-colors hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-30"><ArrowRight size={17} /></button>
            </div>
          </div>
        </div>
        <div ref={viewportRef} className="cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing">
          <div ref={trackRef} className="flex w-max gap-5 py-2">
            {testimonials.map((testimonial, index) => <TestimonialCard key={testimonial.name} testimonial={{ ...testimonial, number: `0${index + 1}` }} isActive={index === activeIndex} onGlowMove={handleGlowMove} />)}
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 sm:hidden">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">0{activeIndex + 1} / 0{testimonials.length}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => changeSlide(-1)} disabled={activeIndex === 0} aria-label="Previous client story" className="p-2 text-white transition-colors hover:text-teal disabled:opacity-30"><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => changeSlide(1)} disabled={activeIndex === testimonials.length - 1} aria-label="Next client story" className="p-2 text-white transition-colors hover:text-teal disabled:opacity-30"><ArrowRight size={17} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

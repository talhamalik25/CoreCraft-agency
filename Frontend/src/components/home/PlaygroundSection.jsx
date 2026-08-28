import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, Circle, Command, Sparkles } from "lucide-react";
import FadeIn from "../FadeIn";

const MODES = ["UI", "MOTION", "AI", "SYSTEM"];

function UiExperiment() {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className="flex h-full min-h-[360px] flex-col justify-between bg-[#111514] p-6 sm:p-10">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-teal" />
          <span className="font-dm text-[10px] uppercase tracking-[0.2em] text-white/55">Studio / UI</span>
        </div>
        <Command size={17} className="text-white/35" />
      </div>
      <div className="py-8">
        <p className="font-dm text-xs uppercase tracking-[0.18em] text-teal">A little clarity</p>
        <h3 className="mt-4 max-w-sm font-syne text-4xl font-bold leading-[0.92] tracking-[-0.06em] text-white sm:text-5xl">
          Make room for the good stuff.
        </h3>
      </div>
      <button
        type="button"
        onClick={() => setIsComplete((current) => !current)}
        className="flex items-center justify-between border border-white/15 px-4 py-4 text-left font-dm text-sm text-white transition-colors hover:border-teal"
      >
        <span>{isComplete ? "Nice. That feels better." : "Try a polished state"}</span>
        <span className="flex h-6 w-6 items-center justify-center border border-teal text-teal">
          {isComplete ? <Check size={14} /> : <ArrowRight size={14} />}
        </span>
      </button>
    </div>
  );
}

function MotionExperiment() {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#111514]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative h-52 w-52 sm:h-64 sm:w-64">
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border border-teal/60"
            animate={{ rotate: ring % 2 ? -360 : 360, scale: [1, 0.82, 1] }}
            transition={{ duration: 8 + ring * 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ inset: `${ring * 14}%`, borderStyle: ring === 1 ? "dashed" : "solid" }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal"
          animate={{ boxShadow: ["0 0 0 rgba(0,168,150,0)", "0 0 32px rgba(0,168,150,0.7)", "0 0 0 rgba(0,168,150,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>
      <span className="absolute bottom-6 left-6 font-dm text-[10px] uppercase tracking-[0.2em] text-white/45">Motion / rhythm / restraint</span>
    </div>
  );
}

function AiExperiment() {
  const [prompt, setPrompt] = useState(0);
  const prompts = ["Observe", "Connect", "Imagine"];

  return (
    <div className="flex min-h-[360px] flex-col justify-between bg-[#111514] p-6 sm:p-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-dm text-[10px] uppercase tracking-[0.2em] text-teal">Core intelligence</p>
          <h3 className="mt-4 font-syne text-4xl font-bold tracking-[-0.06em] sm:text-5xl">Ask better.</h3>
        </div>
        <Sparkles size={20} className="text-teal" />
      </div>
      <div className="space-y-3 font-dm text-sm">
        <div className="flex items-center gap-3 text-white/40"><Circle size={7} fill="currentColor" /> Listening for signal</div>
        <AnimatePresence mode="wait">
          <motion.div key={prompts[prompt]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-l border-teal pl-4 text-lg text-white">
            {prompts[prompt]} the next useful thing.
          </motion.div>
        </AnimatePresence>
        <button type="button" onClick={() => setPrompt((current) => (current + 1) % prompts.length)} className="pt-4 text-xs uppercase tracking-[0.18em] text-teal transition-colors hover:text-white">Run another thought <ArrowRight size={14} className="ml-2 inline" /></button>
      </div>
    </div>
  );
}

function SystemExperiment() {
  const steps = ["Input", "Processing", "API", "Database", "Output"];

  return (
    <div className="flex min-h-[360px] flex-col justify-center bg-[#111514] p-6 sm:p-10">
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
        <span className="font-dm text-[10px] uppercase tracking-[0.2em] text-teal">System flow</span>
        <span className="font-dm text-[10px] text-white/35">01 — 05</span>
      </div>
      <div className="flex flex-col items-start">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <span className="flex h-9 w-9 items-center justify-center border border-teal/60 font-dm text-[10px] text-teal">0{index + 1}</span>
            <span className="font-syne text-2xl font-bold uppercase tracking-[-0.04em] text-white sm:text-3xl">{step}</span>
            {index < steps.length - 1 && <ArrowDown size={15} className="ml-1 my-3 text-white/30" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaygroundMode({ mode }) {
  if (mode === "UI") return <UiExperiment />;
  if (mode === "MOTION") return <MotionExperiment />;
  if (mode === "AI") return <AiExperiment />;
  return <SystemExperiment />;
}

export default function PlaygroundSection() {
  const [activeMode, setActiveMode] = useState("UI");

  return (
    <section className="w-full overflow-hidden bg-[#090b0b] py-24 text-white md:py-36">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn y={40}>
          <div className="grid gap-8 border-b border-white/10 pb-12 md:grid-cols-[1fr_0.8fr] md:items-end md:pb-20">
            <div>
              <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-teal">04 / Playground</p>
              <h2 className="mt-6 max-w-3xl font-syne text-[clamp(2.6rem,10vw,8rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.065em] sm:text-[clamp(3.4rem,8vw,8rem)]">
                Built to be <span className="text-teal">experienced.</span>
              </h2>
            </div>
            <p className="max-w-sm font-dm text-base font-light leading-relaxed text-gray md:justify-self-end md:text-lg">
              Explore how design, motion, technology and AI come together.
            </p>
          </div>
        </FadeIn>

        <FadeIn y={35} delay={0.12}>
          <div className="pt-10 md:pt-16">
            <div className="mb-7 flex flex-wrap gap-2 border-b border-white/10 pb-5 sm:gap-5">
              {MODES.map((mode) => (
                <button key={mode} type="button" onClick={() => setActiveMode(mode)} className={`relative px-1 py-3 font-dm text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${activeMode === mode ? "text-teal" : "text-white/40 hover:text-white"}`}>
                  {mode}
                  {activeMode === mode && <motion.span layoutId="playground-mode" className="absolute inset-x-0 bottom-0 h-px bg-teal" />}
                </button>
              ))}
            </div>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-stretch lg:gap-16">
              <div className="flex flex-col justify-between py-2">
                <div>
                  <span className="font-syne text-7xl font-extrabold leading-none tracking-[-0.08em] text-white/10">{String(MODES.indexOf(activeMode) + 1).padStart(2, "0")}</span>
                  <p className="mt-6 max-w-xs font-dm text-sm leading-relaxed text-white/55">A small expression of the thinking behind the work. Change the mode and see the system shift.</p>
                </div>
                <p className="mt-10 font-dm text-[10px] uppercase tracking-[0.2em] text-white/30">Signal / interaction / response</p>
              </div>
              <div className="min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div key={activeMode} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
                    <PlaygroundMode mode={activeMode} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

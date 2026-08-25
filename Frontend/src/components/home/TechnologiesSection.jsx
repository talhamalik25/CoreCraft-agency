// import { useState } from "react";
// import {
//   AnimatePresence,
//   motion,
//   useMotionValue,
//   useReducedMotion,
//   useSpring,
// } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import { SectionLabel } from "../common/SectionLabel";

// const TECHNOLOGIES = [
//   { id: "react", name: "React", category: "Frontend", description: "Component-driven interfaces for modern web applications.", x: 14, y: 17, drift: [7, -4] },
//   { id: "nextjs", name: "Next.js", category: "Frontend", description: "Production-ready web experiences with fast, flexible rendering.", x: 34, y: 10, drift: [-6, 5] },
//   { id: "javascript", name: "JavaScript", category: "Frontend", description: "Expressive interaction and resilient browser-side logic.", x: 56, y: 17, drift: [6, 5] },
//   { id: "typescript", name: "TypeScript", category: "Frontend", description: "Type-safe foundations for clear, scalable product code.", x: 79, y: 11, drift: [-5, -5] },
//   { id: "html", name: "HTML", category: "Frontend", description: "Semantic, accessible structures built to last.", x: 19, y: 30, drift: [5, 5] },
//   { id: "css", name: "CSS", category: "Frontend", description: "Responsive visual systems with precise, cinematic detail.", x: 38, y: 34, drift: [-5, 5] },
//   { id: "tailwind", name: "Tailwind CSS", category: "Frontend", description: "Fast, consistent interface construction at system scale.", x: 65, y: 29, drift: [6, -4] },
//   { id: "framer-motion", name: "Framer Motion", category: "Frontend", description: "Purposeful movement that makes digital products feel alive.", x: 86, y: 34, drift: [-5, 5] },
//   { id: "nodejs", name: "Node.js", category: "Backend", description: "Scalable server-side applications and real-time systems.", x: 14, y: 62, drift: [6, 4] },
//   { id: "express", name: "Express.js", category: "Backend", description: "Focused API architecture for dependable web services.", x: 31, y: 70, drift: [-5, -4] },
//   { id: "mongodb", name: "MongoDB", category: "Backend", description: "Flexible data layers designed around evolving products.", x: 69, y: 63, drift: [5, -5] },
//   { id: "rest-apis", name: "REST APIs", category: "Backend", description: "Clear, connected product experiences across every endpoint.", x: 86, y: 71, drift: [-5, 5] },
//   { id: "figma", name: "Figma", category: "Design", description: "Collaborative design systems with every detail considered.", x: 17, y: 87, drift: [5, -4] },
//   { id: "ui-ux", name: "UI/UX Design", category: "Design", description: "Intuitive journeys that make every interaction count.", x: 38, y: 81, drift: [-4, 5] },
//   { id: "motion-design", name: "Motion Design", category: "Design", description: "Dynamic visual language that adds rhythm and meaning.", x: 64, y: 86, drift: [5, 4] },
//   { id: "creative-development", name: "3D / Creative Development", category: "Design", description: "Immersive digital moments where design and code converge.", x: 86, y: 90, drift: [-5, -4] },
// ];

// const CATEGORIES = ["All", "Frontend", "Backend", "Design"];
// const getNumber = (id) =>
//   String(TECHNOLOGIES.findIndex((item) => item.id === id) + 1).padStart(2, "0");

// function Filter({ active, onChange }) {
//   return (
//     <div className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Technology categories">
//       {CATEGORIES.map((category) => {
//         const isActive = active === category;

//         return (
//           <button
//             key={category}
//             type="button"
//             onClick={() => onChange(category)}
//             aria-pressed={isActive}
//             className={`relative pb-1 font-dm text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal ${
//               isActive ? "text-teal" : "text-gray hover:text-white"
//             }`}
//           >
//             {category}
//             <motion.span
//               className="absolute bottom-0 left-0 h-px bg-teal"
//               animate={{ width: isActive ? "100%" : 0 }}
//               transition={{ duration: 0.22 }}
//             />
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function ActiveTechnology({ technology }) {
//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={technology.id}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -8 }}
//         transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
//         className="border-l border-teal/45 pl-5"
//         aria-live="polite"
//       >
//         <p className="font-dm text-[10px] uppercase tracking-[0.2em] text-teal">
//           {getNumber(technology.id)} / {technology.category}
//         </p>
//         <h3 className="mt-3 font-syne text-2xl font-extrabold uppercase leading-none tracking-tight text-white">
//           {technology.name}
//         </h3>
//         <p className="mt-3 max-w-xs font-dm text-sm leading-relaxed text-gray">
//           {technology.description}
//         </p>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// function TechnologyNode({ technology, index, selectedId, category, onSelect, reducedMotion }) {
//   const selected = selectedId === technology.id;
//   const visible = category === "All" || technology.category === category;

//   return (
//     <motion.div
//       className="absolute z-20"
//       style={{ left: `${technology.x}%`, top: `${technology.y}%` }}
//       initial={{ opacity: 0, y: 18 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.15 }}
//       transition={{ duration: 0.46, delay: 0.3 + index * 0.045, ease: [0.22, 1, 0.36, 1] }}
//     >
//       <motion.div
//         className="-translate-x-1/2 -translate-y-1/2"
//         animate={
//           reducedMotion
//             ? { x: 0, y: 0 }
//             : { x: [0, technology.drift[0], 0], y: [0, technology.drift[1], 0] }
//         }
//         transition={{ duration: 7 + (index % 4) * 1.4, repeat: Infinity, ease: "easeInOut" }}
//       >
//         <motion.button
//           type="button"
//           onMouseEnter={() => visible && onSelect(technology.id)}
//           onFocus={() => visible && onSelect(technology.id)}
//           onClick={() => visible && onSelect(technology.id)}
//           disabled={!visible}
//           aria-pressed={selected}
//           aria-label={`${technology.name}, ${technology.category}. ${technology.description}`}
//           animate={{ opacity: visible ? (selected ? 1 : 0.72) : 0.12, scale: selected ? 1.08 : 1 }}
//           transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
//           className={`group whitespace-nowrap border-b pb-1 text-left font-dm text-[11px] uppercase tracking-[0.13em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal disabled:cursor-default ${
//             selected
//               ? "border-teal text-white"
//               : "border-white/20 text-gray hover:border-teal/70 hover:text-white"
//           }`}
//         >
//           <span className="mr-2 text-[9px] text-teal/80">{getNumber(technology.id)}</span>
//           {technology.name}
//           {selected && (
//             <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-teal align-middle shadow-[0_0_12px_rgba(0,168,150,0.8)]" />
//           )}
//         </motion.button>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default function TechnologiesSection() {
//   const [category, setCategory] = useState("All");
//   const [selectedId, setSelectedId] = useState("react");
//   const reducedMotion = useReducedMotion();
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const planeX = useSpring(mouseX, { stiffness: 45, damping: 20, mass: 0.7 });
//   const planeY = useSpring(mouseY, { stiffness: 45, damping: 20, mass: 0.7 });
//   const selected = TECHNOLOGIES.find((item) => item.id === selectedId) || TECHNOLOGIES[0];

//   const changeCategory = (nextCategory) => {
//     setCategory(nextCategory);
//     const current = TECHNOLOGIES.find((item) => item.id === selectedId);

//     if (nextCategory !== "All" && current.category !== nextCategory) {
//       setSelectedId(TECHNOLOGIES.find((item) => item.category === nextCategory).id);
//     }
//   };

//   const movePlane = (event) => {
//     if (reducedMotion) return;
//     const bounds = event.currentTarget.getBoundingClientRect();
//     mouseX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
//     mouseY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
//   };

//   const resetPlane = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   return (
//     <section
//       id="technologies"
//       aria-labelledby="technologies-title"
//       className="relative overflow-hidden bg-surface px-4 py-20 text-white sm:px-6 md:py-28 lg:px-20 lg:py-36"
//     >
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 opacity-[0.035]"
//         style={{
//           backgroundImage: "radial-gradient(rgba(255,255,255,.75) .7px, transparent .7px)",
//           backgroundSize: "18px 18px",
//         }}
//       />

//       <div className="relative mx-auto max-w-7xl">
//         <div className="border-b border-white/10 pb-10 md:pb-12">
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.5 }}
//           >
//             <SectionLabel text="03 / TECHNOLOGY" />
//           </motion.div>

//           <div className="xl:grid xl:grid-cols-[minmax(0,1.45fr)_minmax(17rem,.55fr)] xl:items-end xl:gap-16">
//             <motion.h2
//               id="technologies-title"
//               className="font-syne text-[clamp(2.5rem,7vw,7rem)] font-extrabold uppercase leading-[0.84] tracking-tight text-white"
//               initial={{ opacity: 0, y: 28 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.25 }}
//               transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
//             >
//               <span className="block">Technologies</span>
//               <span className="block text-white/45">We Work With</span>
//             </motion.h2>

//             <motion.div
//               className="mt-9 hidden xl:block"
//               initial={{ opacity: 0, y: 16 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.18 }}
//             >
//               <ActiveTechnology technology={selected} />
//             </motion.div>
//           </div>
//         </div>

//         <motion.div
//           className="mt-7 flex items-start justify-between gap-6"
//           initial={{ opacity: 0, y: 12 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.42, delay: 0.16 }}
//         >
//           <Filter active={category} onChange={changeCategory} />
//           <p className="hidden pt-0.5 text-right font-dm text-[10px] uppercase tracking-[0.2em] text-gray/60 sm:block">
//             System / 01 <span className="mx-2 text-teal">/</span> Web / Digital / Creative
//           </p>
//         </motion.div>

//         <motion.div
//           className="relative mt-9 hidden min-h-[40rem] overflow-hidden border-y border-white/10 lg:block xl:min-h-[44rem]"
//           initial={{ opacity: 0, scale: 0.985 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true, amount: 0.16 }}
//           transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
//           onPointerMove={movePlane}
//           onPointerLeave={resetPlane}
//         >
//           <div aria-hidden="true" className="absolute left-0 right-0 top-[22%] h-px -rotate-[3deg] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
//           <div aria-hidden="true" className="absolute left-0 right-0 top-[34%] rotate-[2deg] border-t border-dashed border-white/[0.09]" />
//           <div aria-hidden="true" className="absolute left-0 right-0 top-[66%] -rotate-[3deg] border-t border-dashed border-teal/15" />
//           <div aria-hidden="true" className="absolute left-0 right-0 top-[84%] h-px rotate-[2deg] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

//           <motion.div className="absolute inset-0" style={{ x: planeX, y: planeY }}>
//             <div className="absolute left-5 top-[20%] font-dm text-[9px] uppercase tracking-[0.2em] text-gray/45">01 / Frontend Flow</div>
//             <div className="absolute left-5 top-[64%] font-dm text-[9px] uppercase tracking-[0.2em] text-gray/45">02 / Backend Flow</div>
//             <div className="absolute left-5 top-[82%] font-dm text-[9px] uppercase tracking-[0.2em] text-gray/45">03 / Creative Flow</div>

//             {TECHNOLOGIES.map((technology, index) => (
//               <TechnologyNode
//                 key={technology.id}
//                 technology={technology}
//                 index={index}
//                 selectedId={selectedId}
//                 category={category}
//                 onSelect={setSelectedId}
//                 reducedMotion={reducedMotion}
//               />
//             ))}
//           </motion.div>

//           <motion.div
//             className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
//             animate={reducedMotion ? { y: 0 } : { y: [-3, 3, -3] }}
//             transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <div className="relative flex h-40 w-40 items-center justify-center bg-[#0C0C0C] text-center shadow-[0_0_46px_rgba(0,168,150,0.09)] xl:h-44 xl:w-44">
//               <motion.div
//                 aria-hidden="true"
//                 className="absolute inset-2 border border-teal/35"
//                 animate={reducedMotion ? { rotate: 45 } : { rotate: [45, 405] }}
//                 transition={reducedMotion ? { duration: 0 } : { duration: 90, repeat: Infinity, ease: "linear" }}
//               />
//               <div className="relative z-10">
//                 <span className="block font-syne text-3xl font-extrabold leading-none tracking-tight">CORE</span>
//                 <span className="mt-1 block font-syne text-3xl font-extrabold leading-none tracking-tight text-teal">CRAFT</span>
//                 <span className="mt-3 block font-dm text-[8px] uppercase tracking-[0.2em] text-gray">Digital Systems</span>
//               </div>
//             </div>
//           </motion.div>

//           <div className="absolute bottom-4 left-5 font-dm text-[9px] uppercase tracking-[0.2em] text-gray/50">Hover / focus to inspect</div>
//           <div className="absolute bottom-4 right-5 font-dm text-[9px] uppercase tracking-[0.2em] text-gray/50">{category === "All" ? "16 Capabilities" : `${category} Stack`}</div>
//         </motion.div>

//         <div className="mt-8 lg:hidden">
//           <motion.div
//             className="relative mb-8 flex h-32 items-center justify-center overflow-hidden border-y border-white/10"
//             initial={{ opacity: 0, y: 14 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.45 }}
//           >
//             <div className="absolute h-24 w-24 rotate-45 border border-teal/25" />
//             <div className="relative text-center">
//               <span className="block font-syne text-2xl font-extrabold leading-none tracking-tight">CORE</span>
//               <span className="mt-1 block font-syne text-2xl font-extrabold leading-none tracking-tight text-teal">CRAFT</span>
//               <span className="mt-2 block font-dm text-[8px] uppercase tracking-[0.2em] text-gray">Live Stack</span>
//             </div>
//           </motion.div>

//           <div className="border-t border-white/10">
//             {TECHNOLOGIES.map((technology, index) => {
//               const isSelected = selectedId === technology.id;
//               const visible = category === "All" || category === technology.category;

//               return (
//                 <motion.button
//                   key={technology.id}
//                   type="button"
//                   layout
//                   disabled={!visible}
//                   onClick={() => visible && setSelectedId(technology.id)}
//                   aria-expanded={isSelected}
//                   initial={{ opacity: 0, y: 14 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.08 }}
//                   transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.3) }}
//                   className={`w-full border-b border-white/10 py-4 text-left transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-teal disabled:cursor-default ${visible ? "opacity-100" : "opacity-25"}`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="w-6 shrink-0 font-dm text-[10px] tracking-[0.16em] text-teal/80">{getNumber(technology.id)}</span>
//                     <span className={`min-w-0 flex-1 font-syne text-lg font-bold uppercase tracking-tight ${isSelected ? "text-teal" : "text-white"}`}>{technology.name}</span>
//                     <span className="shrink-0 font-dm text-[9px] uppercase tracking-[0.15em] text-gray">{technology.category}</span>
//                   </div>
//                   <AnimatePresence initial={false}>
//                     {isSelected && (
//                       <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }} className="overflow-hidden">
//                         <p className="max-w-sm pt-3 pr-5 font-dm text-sm leading-relaxed text-gray">{technology.description}</p>
//                         <span className="mt-3 inline-flex items-center gap-2 font-dm text-[9px] uppercase tracking-[0.18em] text-teal">Selected <ArrowUpRight size={12} /></span>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

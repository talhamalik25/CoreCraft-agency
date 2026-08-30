"use client";

import { useCallback, useRef } from "react";
import * as THREE from "three";
import { SectionLabel } from "../common/SectionLabel";
import { useGSAPAnimations } from "../../hooks/useGSAP";
import { useThreeScene } from "../../hooks/useThreeScene";

const orbit = ["React", "Node.js", "MongoDB", "Tailwind", "Python", "AWS", "Figma", "Postgres"];

export default function ToolsSection({ tools }) {
  const sectionRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const initScene = useCallback((scene, camera) => {
    camera.position.z = 6.4;
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 2), new THREE.MeshBasicMaterial({ color: 0x00e6d9, wireframe: true, transparent: true, opacity: 0.9 }));
    scene.add(core);
    const nodes = orbit.map((_, index) => {
      const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), new THREE.MeshBasicMaterial({ color: 0x00e6d9, transparent: true, opacity: 0.8 }));
      node.userData = { angle: (index / orbit.length) * Math.PI * 2, radius: 2.1 + (index % 2) * 0.42, speed: 0.25 + index * 0.012, y: (index % 3 - 1) * 0.5 };
      scene.add(node); return node;
    });
    scene.userData = { core, nodes, elapsed: 0 };
  }, []);
  const animate = useCallback((scene, camera, renderer, delta = 0.016) => {
    const { core, nodes } = scene.userData;
    if (!core) return;
    core.rotation.x += delta * 0.21; core.rotation.y += delta * 0.34;
    core.rotation.x += (pointerRef.current.y * 0.28 - core.rotation.x) * delta * 0.12;
    nodes.forEach((node) => { node.userData.angle += delta * node.userData.speed; node.position.set(Math.cos(node.userData.angle) * node.userData.radius, node.userData.y + Math.sin(node.userData.angle * 1.7) * 0.28, Math.sin(node.userData.angle) * node.userData.radius * 0.35); });
  }, []);
  useThreeScene({ containerId: "stack-orbit", initScene, animate });
  useGSAPAnimations((gsap) => {
    gsap.fromTo(sectionRef.current?.querySelectorAll("[data-stack-tag]"), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, stagger: 0.075, duration: 0.55, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
  }, { scope: sectionRef, dependencies: [tools] });
  const trackPointer = (event) => { const r = event.currentTarget.getBoundingClientRect(); pointerRef.current = { x: (event.clientX - r.left) / r.width - 0.5, y: (event.clientY - r.top) / r.height - 0.5 }; };
  return <section ref={sectionRef} className="bg-black section-x section-y"><div className="mx-auto max-w-7xl">
    <div className="grid gap-8 md:grid-cols-[1fr_1.15fr] md:items-end"><div><SectionLabel text="Tools / Stack" /><h2 className="mt-7 font-syne text-4xl font-extrabold uppercase leading-[.86] tracking-[-.05em] text-white sm:text-5xl">The right tool. <span className="text-teal">No theatre.</span></h2></div><p className="max-w-xl text-sm leading-relaxed text-white/55 md:justify-self-end md:text-base">Our stack is deliberately flexible. We choose proven technology that fits the problem, then use it with exacting care.</p></div>
    <div className="relative mt-12 min-h-[32rem] overflow-hidden border border-white/10 bg-surface md:min-h-[34rem]" onPointerMove={trackPointer} onPointerLeave={() => { pointerRef.current = { x: 0, y: 0 }; }}>
      <div id="stack-orbit" className="absolute inset-0 hidden md:block" aria-hidden="true" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,217,.11),transparent_42%)]" />
      <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[.18em] text-white/35">CoreCraft / technical ecology</div><div className="absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-[.18em] text-teal">Live system</div>
      <div className="absolute inset-0 grid place-items-center"><span className="font-syne text-2xl font-bold tracking-[-.05em] text-teal md:text-3xl">CORE</span></div>
      <div className="relative z-10 grid min-h-[32rem] grid-cols-2 content-center gap-3 p-7 md:hidden">{tools.map((tool) => <span data-stack-tag key={tool} className="border border-teal/20 bg-black/80 px-3 py-3 text-center font-mono text-[10px] uppercase tracking-[.12em] text-white/70">{tool}</span>)}</div>
      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">{orbit.map((tool, index) => <span data-stack-tag key={tool} className="absolute border border-teal/25 bg-black/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-white/70" style={{ left: `${[17, 70, 12, 75, 24, 67, 43, 47][index]}%`, top: `${[25, 21, 57, 62, 78, 75, 12, 87][index]}%` }}>{tool}</span>)}</div>
    </div>
  </div></section>;
}

"use client";

import { useCallback, useRef } from "react";
import * as THREE from "three";
import { SectionLabel } from "../common/SectionLabel";
import { useGSAPAnimations } from "../../hooks/useGSAP";
import { useThreeScene } from "../../hooks/useThreeScene";

export default function AboutHero() {
  const ref = useRef(null); const pointerRef = useRef({ x: 0, y: 0 });
  const initScene = useCallback((scene, camera) => { camera.position.z = 5.8; const object = new THREE.Mesh(new THREE.OctahedronGeometry(1.38, 2), new THREE.MeshBasicMaterial({ color: 0x00e6d9, wireframe: true, transparent: true, opacity: 0.52 })); const halo = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.012, 8, 100), new THREE.MeshBasicMaterial({ color: 0x00e6d9, transparent: true, opacity: 0.4 })); halo.rotation.x = Math.PI / 2.7; scene.add(object, halo); scene.userData = { object, halo }; }, []);
  const animate = useCallback((scene, camera, renderer, delta = 0.016) => { const { object, halo } = scene.userData; if (!object) return; object.rotation.x += delta * 0.18; object.rotation.y += delta * 0.27; object.rotation.y += (pointerRef.current.x * 0.55 - object.rotation.y) * delta * 0.1; halo.rotation.z -= delta * 0.24; }, []);
  useThreeScene({ containerId: "about-hero-scene", initScene, animate });
  useGSAPAnimations((gsap) => { gsap.timeline({ defaults: { ease: "power4.out" } }).fromTo(ref.current?.querySelector("[data-about-label]"), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.45 }).fromTo(ref.current?.querySelectorAll("[data-about-word]"), { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.13 }, "-=0.1").fromTo(ref.current?.querySelector("[data-about-copy]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.42"); }, { scope: ref });
  const onPointerMove = (event) => { const box = event.currentTarget.getBoundingClientRect(); pointerRef.current = { x: (event.clientX - box.left) / box.width - 0.5, y: 0 }; };
  return <section ref={ref} data-hero-section onPointerMove={onPointerMove} onPointerLeave={() => { pointerRef.current = { x: 0, y: 0 }; }} className="relative overflow-hidden bg-black section-x pb-24 pt-32 md:pb-32 md:pt-44">
    <div id="about-hero-scene" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] md:block" aria-hidden="true" /><div aria-hidden="true" className="absolute right-[-8%] top-4 hidden h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,230,217,.11),transparent_64%)] blur-3xl md:block" />
    <div className="relative mx-auto max-w-7xl"><div data-about-label><SectionLabel text="Identity / CoreCraft" /></div><h1 className="mt-10 max-w-5xl font-syne text-[clamp(2rem,6vw,6rem)] font-extrabold uppercase leading-[.81] tracking-[-.075em] text-white">{["Built /", "Different. /", "By Design."].map((word, index) => <span key={word} className="block overflow-hidden"><span data-about-word className={`block ${index === 1 ? "text-teal" : ""}`}>{word}</span></span>)}</h1><p data-about-copy className="mt-10 max-w-2xl border-l border-teal pl-5 text-base leading-relaxed text-white/65 sm:text-lg">We bridge engineering rigor and strategic insight from Karachi, building precise digital systems with the clarity, performance, and craft to command attention.</p></div>
  </section>;
}

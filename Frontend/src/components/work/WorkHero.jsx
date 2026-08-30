"use client";

import { useCallback, useRef } from "react";
import * as THREE from "three";
import { SectionLabel } from "../common/SectionLabel";
import { useGSAPAnimations } from "../../hooks/useGSAP";
import { useThreeScene } from "../../hooks/useThreeScene";

export default function WorkHero() {
  const sectionRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const initScene = useCallback((scene, camera) => {
    camera.position.z = 5.4;
    const knot = new THREE.Mesh(new THREE.IcosahedronGeometry(1.34, 2), new THREE.MeshBasicMaterial({ color: 0x00e6d9, wireframe: true, transparent: true, opacity: 0.52 }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.012, 6, 88), new THREE.MeshBasicMaterial({ color: 0x00e6d9, transparent: true, opacity: 0.36 }));
    ring.rotation.x = 1.05;
    const positions = new Float32Array(120 * 3);
    for (let i = 0; i < positions.length; i += 3) { positions[i] = (Math.random() - 0.5) * 5.8; positions[i + 1] = (Math.random() - 0.5) * 3.3; positions[i + 2] = (Math.random() - 0.5) * 2; }
    const points = new THREE.Points(new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(positions, 3)), new THREE.PointsMaterial({ color: 0x00e6d9, size: 0.025, transparent: true, opacity: 0.48 }));
    scene.add(knot, ring, points); scene.userData = { knot, ring, points };
  }, []);
  const animate = useCallback((scene, camera, renderer, delta = 0.016) => {
    const { knot, ring, points } = scene.userData; if (!knot) return;
    knot.rotation.x += delta * 0.16; knot.rotation.y += delta * 0.27;
    knot.rotation.y += (pointerRef.current.x * 0.55 - knot.rotation.y) * delta * 0.12;
    ring.rotation.z -= delta * 0.22; points.rotation.y -= delta * 0.025;
  }, []);
  useThreeScene({ containerId: "work-hero-scene", initScene, animate });
  useGSAPAnimations((gsap) => {
    const words = sectionRef.current?.querySelectorAll("[data-work-word]");
    gsap.timeline({ defaults: { ease: "power4.out" } }).fromTo(sectionRef.current?.querySelector("[data-work-label]"), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.45 }).fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.85, stagger: 0.13 }, "-=0.1").fromTo(sectionRef.current?.querySelector("[data-work-copy]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4");
  }, { scope: sectionRef });
  const trackPointer = (event) => { const rect = event.currentTarget.getBoundingClientRect(); pointerRef.current = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 }; };
  return <section ref={sectionRef} data-hero-section onPointerMove={trackPointer} onPointerLeave={() => { pointerRef.current = { x: 0, y: 0 }; }} className="relative overflow-hidden bg-black section-x pb-20 pt-32 md:pb-32 md:pt-44">
    <div id="work-hero-scene" className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block" aria-hidden="true" />
    <div aria-hidden="true" className="absolute right-[-12%] top-10 hidden h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(0,230,217,.12),transparent_65%)] blur-3xl md:block" />
    <div className="relative mx-auto max-w-7xl"><div data-work-label><SectionLabel text="Selected works / 2026" /></div><h1 className="mt-9 font-syne text-[clamp(3.4rem,9vw,8.5rem)] font-extrabold uppercase leading-[.82] tracking-[-.075em] text-white"><span className="block overflow-hidden"><span data-work-word className="block">Our /</span></span><span className="block overflow-hidden"><span data-work-word className="block text-teal">Work.</span></span></h1><p data-work-copy className="mt-9 max-w-xl border-l border-teal pl-5 text-base leading-relaxed text-white/65 sm:text-lg">Every engagement is built around a clear engineering objective: work that scales flawlessly, feels instantly responsive, and performs under pressure.</p></div>
  </section>;
}

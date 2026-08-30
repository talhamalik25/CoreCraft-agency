"use client";

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useThreeScene } from "../../hooks/useThreeScene";

const PROFILES = {
  experience: { scale: [1.15, 1.15, 1.15], rotation: [0.2, 0.8], color: 0x00e6d9 },
  product: { scale: [1.35, 0.78, 1.35], rotation: [0.65, 0.25], color: 0x77fff7 },
  ai: { scale: [0.92, 0.92, 0.92], rotation: [1.1, 1.4], color: 0x00e6d9 },
  commerce: { scale: [1.35, 1.35, 0.58], rotation: [0.1, 1.9], color: 0xa2fff9 },
  mobile: { scale: [0.72, 1.48, 0.55], rotation: [0.15, 0.2], color: 0x00e6d9 },
};

export default function Service3DVisual({ activeType }) {
  const typeRef = useRef(activeType);
  const meshRef = useRef(null);

  useEffect(() => { typeRef.current = activeType; }, [activeType]);

  const initScene = useCallback((scene, camera) => {
    camera.position.set(0, 0, 5.5);
    const group = new THREE.Group();
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 2), new THREE.MeshBasicMaterial({ color: 0x00e6d9, wireframe: true, transparent: true, opacity: 0.82 }));
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(0.64, 1), new THREE.MeshBasicMaterial({ color: 0x00e6d9, wireframe: true, transparent: true, opacity: 0.24 }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.015, 6, 96), new THREE.MeshBasicMaterial({ color: 0x00e6d9, transparent: true, opacity: 0.45 }));
    ring.rotation.x = Math.PI / 2.8;
    group.add(mesh, inner, ring);
    group.userData = { mesh, ring, phase: Math.random() * Math.PI * 2 };
    meshRef.current = group;
    scene.add(group);
  }, []);

  const animate = useCallback((scene, camera, renderer, delta = 0.016) => {
    const group = meshRef.current;
    if (!group) return;
    const profile = PROFILES[typeRef.current] || PROFILES.experience;
    const amount = Math.min(delta * 4, 0.12);
    group.scale.lerp(new THREE.Vector3(...profile.scale), amount);
    group.rotation.x += (profile.rotation[0] - group.rotation.x) * amount;
    group.rotation.y += (profile.rotation[1] - group.rotation.y) * amount;
    group.rotation.z += delta * 0.18;
    group.position.y = Math.sin(performance.now() * 0.001 + group.userData.phase) * 0.12;
    group.userData.mesh.material.color.lerp(new THREE.Color(profile.color), amount);
    group.userData.ring.rotation.z -= delta * 0.38;
  }, []);

  const { containerRef } = useThreeScene({ containerId: "service-3d-container", initScene, animate });
  return <div id="service-3d-container" ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}

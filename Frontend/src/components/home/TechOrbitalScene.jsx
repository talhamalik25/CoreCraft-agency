"use client";

import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * TechOrbitalScene — lazy-loaded Three.js visualization for the
 * "The Stack Behind The Work" section.
 *
 * - Clusters of nodes grouped by category (Frontend / Backend / AI & Automation /
 *   Design). Each node carries its tech label (JetBrains Mono, teal).
 * - Idle orbital drift + GSAP ScrollTrigger scrub: as the section scrolls into
 *   view the camera dollies in and the whole cloud rotates, while each cluster
 *   "flies in" with a staggered scale/fade.
 * - Pointer parallax: the camera eases toward the cursor while hovering.
 * - Render loop is driven by gsap.ticker (single requestAnimationFrame source,
 *   coordinated with the rest of the site's GSAP animations).
 * - Fully disposed on unmount (renderer, geometries, materials, ScrollTrigger,
 *   ticker) to avoid WebGL context leaks.
 */

const clusters = [
  { layer: "Frontend", color: 0x00e6d9, radius: 3.4, nodes: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Framer Motion"] },
  { layer: "Backend", color: 0x3bd8c6, radius: 3.2, nodes: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
  { layer: "AI & Automation", color: 0x64e3d2, radius: 3.15, nodes: ["Gemini API", "Workflow Automation", "Resend"] },
  { layer: "Design", color: 0xa8f0e6, radius: 3.15, nodes: ["Figma", "UI/UX Design", "Motion Design"] },
];

const NODE_COLOR = 0xbfefe9;
const LABEL_COLOR = "#00e6d9";
const SELECTED_LABEL_COLOR = "#ffffff";

/* NODE_COLOR broken into 0–1 RGB channels for gsap color tweening */
const NODE_COLOR_RGB = {
  r: ((NODE_COLOR >> 16) & 0xff) / 255,
  g: ((NODE_COLOR >> 8) & 0xff) / 255,
  b: (NODE_COLOR & 0xff) / 255,
};

/* Combined hover × selected scale targets */
const SCALE_NORMAL = 1;
const SCALE_HOVER = 1.7;
const SCALE_SELECTED = 2.2;
const SCALE_HOVER_SELECTED = 2.5;

function makeLabel(text, color = LABEL_COLOR, small = false) {
  const el = document.createElement("div");
  el.textContent = text;
  el.style.color = color;
  el.style.fontFamily =
    "var(--font-jb-mono-family), ui-monospace, SFMono-Regular, Menlo, monospace";
  el.style.fontSize = small ? "9px" : "11px";
  el.style.fontWeight = "500";
  el.style.letterSpacing = "0.16em";
  el.style.textTransform = "uppercase";
  el.style.whiteSpace = "nowrap";
  el.style.textShadow = "0 0 12px rgba(0, 230, 217, 0.55)";
  el.style.background = "rgba(8, 8, 8, 0.55)";
  el.style.padding = "2px 7px";
  el.style.borderRadius = "999px";
  el.style.border = "1px solid rgba(255,255,255,0.06)";
  el.style.backdropFilter = "blur(4px)";
  el.style.pointerEvents = "none";
  el.style.transition = "opacity 0.35s ease";
  return el;
}

export default function TechOrbitalScene({ onHover, onSelect, selectedName }) {
  const mountRef = useRef(null);
  const stateRef = useRef(null);
  const nodeMeshesRef = useRef([]);
  const labelMapRef = useRef(new Map());
  const selectedNameRef = useRef(null);
  const hoveredRef = useRef(null);

  /* Sync props to refs so closures inside the mount effect always read the
     latest values without being re-created. */
  const onHoverRef = useRef(onHover);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    selectedNameRef.current = selectedName;
    onHoverRef.current = onHover;
    onSelectRef.current = onSelect;
  }, [selectedName, onHover, onSelect]);

  const techById = useMemo(() => {
    const map = {};
    clusters.forEach((c) =>
      c.nodes.forEach((n) => {
        map[n] = { layer: c.layer, color: c.color };
      })
    );
    return map;
  }, []);

  /* ------------------------------------------------------------------
   * Highlight / de-highlight the selected node whenever selectedName
   * changes.  The mesh array is populated inside the mount effect below;
   * if it isn't ready yet the effect safely no-ops.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    const meshes = nodeMeshesRef.current;
    if (!meshes.length) return undefined;

    meshes.forEach((mesh) => {
      const name = mesh.userData.name;
      const isHovered = hoveredRef.current === mesh;
      const isSelected = name === selectedName;

      if (isSelected) {
        const target = isHovered ? SCALE_HOVER_SELECTED : SCALE_SELECTED;
        gsap.to(mesh.scale, {
          x: target, y: target, z: target,
          duration: 0.5, ease: "power2.out",
        });
        gsap.to(mesh.material.color, { r: 1, g: 1, b: 1, duration: 0.5 });

        const labelData = labelMapRef.current.get(name);
        if (labelData) {
          labelData.el.style.color = SELECTED_LABEL_COLOR;
          labelData.el.style.textShadow = "0 0 16px rgba(255,255,255,0.8)";
        }
      } else if (!isHovered) {
        gsap.to(mesh.scale, {
          x: 1, y: 1, z: 1,
          duration: 0.4, ease: "power2.out",
        });
        gsap.to(mesh.material.color, {
          ...NODE_COLOR_RGB, duration: 0.5,
        });

        const labelData = labelMapRef.current.get(name);
        if (labelData) {
          labelData.el.style.color = LABEL_COLOR;
          labelData.el.style.textShadow = "0 0 12px rgba(0, 230, 217, 0.55)";
        }
      }
    });

    return undefined;
  }, [selectedName]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined;
    }

    const scene = new THREE.Scene();
    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // CSS2DRenderer draws HTML labels on top of the WebGL canvas.
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0";
    labelRenderer.domElement.style.left = "0";
    labelRenderer.domElement.style.pointerEvents = "none";

    mount.appendChild(renderer.domElement);
    mount.appendChild(labelRenderer.domElement);

    // Root group that holds every cluster, so we can rotate the whole cloud.
    const cloud = new THREE.Group();
    scene.add(cloud);

    // Ambient starfield for depth.
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 900;
    const starsPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starsPos[i] = (Math.random() - 0.5) * 80;
      starsPos[i + 1] = (Math.random() - 0.5) * 80;
      starsPos[i + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // One root group per category. Cluster radial layout is computed at build.
    const clusterGroups = [];
    const nodeMeshes = [];

    clusters.forEach((cluster, ci) => {
      const group = new THREE.Group();
      // Arc the clusters around the camera so they're front-facing.
      const angle = (ci / clusters.length) * Math.PI * 2 - Math.PI / 2;
      const clampRadius = 4.6;
      group.position.set(
        Math.cos(angle) * clampRadius,
        Math.sin(angle) * clampRadius * 0.55,
        -1.5
      );
      group.userData = { layer: cluster.layer, color: cluster.color, index: ci };
      cloud.add(group);
      clusterGroups.push(group);

            // Cluster label (category name) — color-coded by cluster, floated above
      const clusterColorStr = "#" + cluster.color.toString(16).padStart(6, "0");
      const clusterLabel = makeLabel(cluster.layer, clusterColorStr, true);
      const clusterLabelObj = new CSS2DObject(clusterLabel);
      clusterLabelObj.position.set(0, -cluster.radius - 0.8, 0);
      group.add(clusterLabelObj);

      cluster.nodes.forEach((name, i) => {
        const nodeAngle = (i / cluster.nodes.length) * Math.PI * 2;
        const r = cluster.radius;
        const x = Math.cos(nodeAngle) * r;
        const y = Math.sin(nodeAngle) * r * 0.5;
        const z = ((i % 3) - 1) * 0.8;

        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.16, 20, 20),
          new THREE.MeshBasicMaterial({
            color: NODE_COLOR,
            transparent: true,
            opacity: 0.95,
          })
        );
        sphere.position.set(x, y, z);
        sphere.userData = { layer: cluster.layer, name, index: i };
        group.add(sphere);
        nodeMeshes.push(sphere);

                const labelEl = makeLabel(name);
        labelEl.dataset.techName = name;
        const labelObj = new CSS2DObject(labelEl);
        labelObj.position.set(x, y + 0.55, z);
        group.add(labelObj);
        labelMapRef.current.set(name, { el: labelEl, obj: labelObj, mesh: sphere });
      });
    });

    nodeMeshesRef.current = nodeMeshes;

    // ---- Interaction: pointer parallax + hover / click highlight ----
    const pointer = { nx: 0, ny: 0, sx: 0, sy: 0 };

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    /* Compute the correct target scale for a mesh given its hover + selection
       state.  Uses selectedNameRef (synced from the parent) so the handlers
       inside this effect always read the latest value. */
    const getTargetScale = (mesh, isHover) => {
      const name = mesh.userData.name;
      const isSelected = name === selectedNameRef.current;
      if (isSelected) return isHover ? SCALE_HOVER_SELECTED : SCALE_SELECTED;
      return isHover ? SCALE_HOVER : SCALE_NORMAL;
    };

    const updateLabel = (mesh) => {
      const name = mesh.userData.name;
      const labelData = labelMapRef.current.get(name);
      if (!labelData) return;
      const el = labelData.el;
      const isHovered = hoveredRef.current === mesh;
      const isSelected = name === selectedNameRef.current;

      if (isSelected && isHovered) {
        el.style.color = SELECTED_LABEL_COLOR;
        el.style.textShadow = "0 0 20px rgba(255,255,255,0.95)";
      } else if (isSelected) {
        el.style.color = SELECTED_LABEL_COLOR;
        el.style.textShadow = "0 0 16px rgba(255,255,255,0.8)";
      } else if (isHovered) {
        el.style.color = LABEL_COLOR;
        el.style.textShadow = "0 0 16px rgba(0, 230, 217, 0.7)";
      } else {
        el.style.color = LABEL_COLOR;
        el.style.textShadow = "0 0 12px rgba(0, 230, 217, 0.55)";
      }
    };

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      if (rect.width === 0) return;
      pointer.nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      pointerNdc.set(pointer.nx, pointer.ny);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(nodeMeshes, false);
      const hit = hits[0]?.object || null;

      if (hoveredRef.current !== hit) {
        if (hoveredRef.current) {
          const prevTarget = getTargetScale(hoveredRef.current, false);
          gsap.to(hoveredRef.current.scale, {
            x: prevTarget, y: prevTarget, z: prevTarget,
            duration: 0.35, ease: "power2.out",
          });
          updateLabel(hoveredRef.current);
        }
        if (hit) {
          const hitTarget = getTargetScale(hit, true);
          gsap.to(hit.scale, {
            x: hitTarget, y: hitTarget, z: hitTarget,
            duration: 0.25, ease: "power2.out",
          });
          updateLabel(hit);
        }
        hoveredRef.current = hit;
        /* onHover feeds the parent a description preview while the cursor is
           over a node.  Click-to-lock is handled by handleClick below. */
        onHoverRef.current?.(hit?.userData?.name || null);
      }
    };

    const handlePointerLeave = () => {
      pointer.nx = 0;
      pointer.ny = 0;
      if (hoveredRef.current) {
        const target = getTargetScale(hoveredRef.current, false);
        gsap.to(hoveredRef.current.scale, {
          x: target, y: target, z: target,
          duration: 0.4, ease: "power2.out",
        });
        updateLabel(hoveredRef.current);
        hoveredRef.current = null;
      }
      /* Only clear the parent's description preview — the persistent
         selection (set via click) is preserved by the selectedName prop. */
      onHoverRef.current?.(null);
    };

    const handleClick = () => {
      if (!hoveredRef.current) {
        /* Clicked empty space — deselect everything. */
        onSelectRef.current?.(null);
        return;
      }
      const name = hoveredRef.current.userData?.name;
      if (name) onSelectRef.current?.(name);
    };

    const handleResize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(handleResize)
        : null;
    resizeObserver?.observe(mount);

    mount.addEventListener("pointermove", handlePointerMove, { passive: true });
    mount.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    mount.addEventListener("click", handleClick, { passive: true });

    // ---- GSAP ScrollTrigger scrub: dolly + rotate the whole cloud ----
    const tw = gsap.timeline({
      scrollTrigger: {
        trigger: mount,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    });

    tw.fromTo(
      camera.position,
      { z: 13.5, x: 0, y: 0 },
      { z: 10.5, x: 0, y: 0, duration: 1, ease: "none" },
      0
    )
      .fromTo(cloud.rotation, { y: 0.35 }, { y: -0.35, duration: 1, ease: "none" }, 0)
      .fromTo(stars.rotation, { z: 0 }, { z: Math.PI * 0.5, duration: 1, ease: "none" }, 0);

    if (!prefersReduced) {
      // Staggered cluster fly-in
      clusterGroups.forEach((group, i) => {
        tw.fromTo(
          group.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1, duration: 0.25, ease: "power2.out" },
          i * 0.12
        );
      });
    } else {
      clusterGroups.forEach((g) => g.scale.set(1, 1, 1));
    }

    // ---- Idle drift driven on gsap.ticker ----
    let elapsed = 0;
    const tick = (time, deltaTime) => {
      elapsed += deltaTime || 0;

      if (!prefersReduced) {
        // Per-cluster idling so only some nodes bob gently.
        nodeMeshes.forEach((mesh, i) => {
          const phase = i * 1.7;
          mesh.position.y += Math.sin(elapsed * 0.0009 + phase) * 0.00012;
          mesh.rotation.x += 0.0002;
          mesh.rotation.y += 0.0003;
        });
      }

      // Pointer parallax (smoothed)
      pointer.sx += (pointer.nx - pointer.sx) * 0.06;
      pointer.sy += (pointer.ny - pointer.sy) * 0.06;

      camera.position.x = pointer.sx * 1.4;
      camera.position.y = pointer.sy * 0.9;

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };

    gsap.ticker.add(tick);

    const cleanup = () => {
      gsap.ticker.remove(tick);
      tw.scrollTrigger?.kill();
      tw.kill();
      resizeObserver?.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);
      mount.removeEventListener("click", handleClick);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((mat) => mat.dispose());
        }
      });
      starsGeo.dispose();
      starsMat.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      if (mount.contains(labelRenderer.domElement)) {
        mount.removeChild(labelRenderer.domElement);
      }
    };

    stateRef.current = cleanup;
    return cleanup;
  }, [techById]);

  return (
    <div
      ref={mountRef}
      className="relative h-[440px] w-full select-none sm:h-[520px] lg:h-[600px]"
      role="img"
      aria-label="Interactive 3D visualization of the CoreCraft technology stack, grouped by category"
    />
  );
}

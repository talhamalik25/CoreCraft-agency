import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

/**
 * Custom hook for managing Three.js scene lifecycle
 * Initializes scene when element enters viewport and disposes when it leaves
 * @param {Object} options - Configuration options
 * @param {string} options.containerId - ID of container element
 * @param {Function} options.initScene - Function to initialize Three.js scene
 * @param {Function} options.animate - Animation loop function
 * @param {boolean} options.mobileEnabled - Whether to enable on mobile (default: false)
 * @returns {Object} - Scene control methods
 */
export const useThreeScene = ({ 
  containerId, 
  initScene, 
  animate,
  mobileEnabled = false 
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const tickRef = useRef(null);
  const resizeCleanupRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Check if mobile device
  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  };

  // Initialize Three.js scene
  const initThreeScene = () => {
    if (!containerRef.current || isInitializedRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Initialize custom scene content
    if (initScene) {
      initScene(scene, camera, renderer);
    }

    isInitializedRef.current = true;

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    resizeCleanupRef.current = () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  // Animation loop
  const startAnimation = () => {
    if (!animate || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    tickRef.current = (time, deltaTime) => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      animate(sceneRef.current, cameraRef.current, rendererRef.current, deltaTime / 1000);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    gsap.ticker.add(tickRef.current);
  };

  // Cleanup Three.js resources
  const disposeScene = () => {
    if (tickRef.current) {
      gsap.ticker.remove(tickRef.current);
      tickRef.current = null;
    }

    resizeCleanupRef.current?.();
    resizeCleanupRef.current = null;

    if (rendererRef.current) {
      rendererRef.current.domElement.remove();
      rendererRef.current.dispose();
      rendererRef.current.forceContextLoss();
      rendererRef.current = null;
    }

    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      sceneRef.current.clear();
      sceneRef.current = null;
    }

    if (cameraRef.current) {
      cameraRef.current = null;
    }

    isInitializedRef.current = false;
  };

  useEffect(() => {
    // Don't initialize on mobile unless explicitly enabled
    if (isMobile() && !mobileEnabled) {
      return;
    }

    // Intersection Observer for viewport detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isInitializedRef.current) {
              initThreeScene();
              startAnimation();
            }
          } else {
            // Dispose when out of viewport to save resources
            if (isInitializedRef.current) {
              disposeScene();
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '50px' // Start slightly before element enters viewport
      }
    );

    const container = document.getElementById(containerId);
    if (container) {
      containerRef.current = container;
      observer.observe(container);
    }

    return () => {
      observer.disconnect();
      disposeScene();
    };
  // Scene setup is intentionally keyed to its container and mobile mode. The
  // callback props are supplied by the owning visualization and are not safe
  // to treat as lifecycle dependencies because they are recreated on render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, mobileEnabled]);

  return {
    containerRef,
    sceneRef,
    cameraRef,
    rendererRef,
  };
};

export default useThreeScene;

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for managing GSAP animations with proper cleanup
 * Uses @gsap/react's useGSAP hook for automatic cleanup via gsap.context()
 * @param {Function} callback - Animation callback function that receives gsap context
 * @param {Object} config - Configuration options for useGSAP
 * @returns {Object} - Context object with gsap utilities
 */
export const useGSAPAnimations = (callback, config = {}) => {
  const { context } = useGSAP(() => {
    if (callback) {
      callback(gsap, ScrollTrigger);
    }
  }, config);

  return {
    gsap,
    ScrollTrigger,
    context
  };
};

/**
 * Hook for magnetic button effect
 * @param {Object} options - Magnetic effect options
 * @param {string} options.selector - Selector for magnetic elements
 * @param {number} options.strength - Magnetic strength (default: 0.3)
 */
export const useMagneticEffect = ({ selector, strength = 0.3, radius = 50 }) => {
  useGSAPAnimations((gsap) => {
    const elements = document.querySelectorAll(selector);

    const activeElements = new Set();
    const resetElement = (element) => {
      const text = element.querySelector('[data-magnetic-text]');

      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.35)',
        overwrite: true,
      });
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.35)',
        overwrite: true,
      });
      activeElements.delete(element);
    };

    const handleMouseMove = (event) => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

        const closestX = Math.max(rect.left, Math.min(event.clientX, rect.right));
        const closestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
        const distance = Math.hypot(event.clientX - closestX, event.clientY - closestY);

        if (distance > radius) {
          if (activeElements.has(element)) resetElement(element);
          return;
        }

        activeElements.add(element);
        const pull = (1 - distance / radius) * strength;
        const offsetX = (event.clientX - (rect.left + rect.width / 2)) * pull;
        const offsetY = (event.clientY - (rect.top + rect.height / 2)) * pull;
        const text = element.querySelector('[data-magnetic-text]');

        gsap.to(element, {
          x: offsetX,
          y: offsetY,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: true,
        });
        gsap.to(text, {
          x: offsetX * 0.45,
          y: offsetY * 0.45,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: true,
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      activeElements.forEach(resetElement);
    };
  }, { dependencies: [selector, strength, radius] });

  return { gsap, ScrollTrigger };
};

export default useGSAPAnimations;
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
export const useMagneticEffect = ({ selector, strength = 0.3 }) => {
  useGSAPAnimations((gsap) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }, { dependencies: [selector, strength] });

  return { gsap, ScrollTrigger };
};

export default useGSAPAnimations;
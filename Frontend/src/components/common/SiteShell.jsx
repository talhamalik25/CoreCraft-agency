"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMagneticEffect } from "../../hooks/useGSAP";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidgetEmbed from "./ChatWidgetEmbed";

export default function SiteShell({ children }) {
  const shellRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useMagneticEffect({
    selector: "[data-magnetic]",
    strength: 0.28,
    radius: 50,
  });

  useGSAP(() => {
    const playEntrance = () => {
      if (hasPlayedRef.current) return;

      hasPlayedRef.current = true;

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      const navItems = gsap.utils.toArray("[data-entrance-nav]", shellRef.current);
      const headlineCharacters = gsap.utils.toArray("[data-entrance-headline-char]", shellRef.current);
      const heroButtons = gsap.utils.toArray("[data-entrance-cta]", shellRef.current);

      timeline.fromTo(
        navItems,
        { autoAlpha: 0, y: -18 },
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 },
        0
      );

      timeline.fromTo(
        headlineCharacters,
        { yPercent: 110, clipPath: "inset(0 0 100% 0)" },
        {
          yPercent: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.75,
          stagger: 0.025,
          ease: "power4.out",
        },
        0.3
      );

      timeline.fromTo(
        heroButtons,
        { autoAlpha: 0, scale: 0.86 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "elastic.out(1, 0.55)",
        },
        0.8
      );
    };

    if (document.readyState === "complete") {
      playEntrance();
    } else {
      window.addEventListener("load", playEntrance, { once: true });
    }

    return () => window.removeEventListener("load", playEntrance);
  }, { scope: shellRef });

  return (
    <div ref={shellRef} className="w-full overflow-x-clip relative min-h-screen bg-black text-white font-dm selection:bg-teal selection:text-black">
      {/* overflow-x-clip (NOT hidden): `hidden` would turn this wrapper into a
          scroll container and silently break every `position: sticky` layout
          inside it (e.g. the stacked project cards). `clip` clips the overflow
          without that side effect. */}
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidgetEmbed />
    </div>
  );
}

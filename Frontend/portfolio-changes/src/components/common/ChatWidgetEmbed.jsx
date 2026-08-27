import { useEffect, useState } from "react";

// Deployed URL of the ai-lead-assistant widget's /widget route.
// Set VITE_WIDGET_URL in your .env (and in Vercel project settings) once
// the widget app is deployed, e.g.:
//   VITE_WIDGET_URL=https://corecraft-lead-assistant.vercel.app/widget
const WIDGET_URL =
  import.meta.env.VITE_WIDGET_URL || "corecraft-assistant-3qld.vercel.app/widget";

// Sizes must roughly match the widget's own bubble (56px button + margin)
// and chat window (380px x 520px) dimensions in ai-lead-assistant.
const CLOSED_SIZE = { width: 88, height: 88 };
const OPEN_SIZE = { width: 420, height: 620 };

/**
 * Floating AI assistant, embedded from the separately-deployed Next.js
 * widget app (ai-lead-assistant) via an <iframe>. The widget's own backend
 * (MongoDB, Gemini, Resend) stays on that deployment — this component only
 * loads its UI and resizes the iframe based on postMessage events the
 * widget sends when it opens/closes.
 */
export default function ChatWidgetEmbed() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleMessage(event) {
      if (
        event.data?.source === "corecraft-widget" &&
        event.data?.type === "resize"
      ) {
        setIsOpen(Boolean(event.data.isOpen));
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const size = isOpen ? OPEN_SIZE : CLOSED_SIZE;

  return (
    <iframe
      title="CoreCraft AI Assistant"
      src={WIDGET_URL}
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: size.width,
        height: size.height,
        maxWidth: "calc(100vw - 8px)",
        maxHeight: "calc(100vh - 8px)",
        border: "none",
        background: "transparent",
        zIndex: 9999,
        transition: "width 200ms ease, height 200ms ease",
      }}
    />
  );
}

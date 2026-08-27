import { useEffect, useState } from "react";

// Deployed URL of the ai-lead-assistant widget's /widget route.
// Set VITE_WIDGET_URL in your .env (and in Vercel project settings) once
// the widget app is deployed, e.g.:
//   VITE_WIDGET_URL=https://corecraft-lead-assistant.vercel.app/widget
const WIDGET_URL =
  import.meta.env.VITE_WIDGET_URL || "corecraft-assistant-3qld.vercel.app/widget";

// Sizes (88px closed bubble / 420x620 open window) live in src/index.css
// under the .chat-widget-iframe--* classes so they can be responsive.

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

  return (
    <iframe
      title="CoreCraft AI Assistant"
      src={WIDGET_URL}
      className={`chat-widget-iframe ${
        isOpen ? "chat-widget-iframe--open" : "chat-widget-iframe--closed"
      }`}
    />
  );
}

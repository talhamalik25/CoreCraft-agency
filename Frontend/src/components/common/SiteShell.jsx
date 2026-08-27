"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidgetEmbed from "./ChatWidgetEmbed";

export default function SiteShell({ children }) {
  return (
    <div className="min-h-screen bg-black text-white font-dm selection:bg-teal selection:text-black">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidgetEmbed />
    </div>
  );
}

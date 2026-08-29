import "../src/index.css";
import SiteShell from "../src/components/common/SiteShell";
import ScrollTriggerRefresh from "../src/components/common/ScrollTriggerRefresh";
import { DM_Sans, Syne } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-family",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne-family",
});

const siteUrl = "https://corecraft-agency.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "CoreCraft Studio — Premium Software Agency",
  description:
    "CoreCraft Agency is a multidisciplinary creative studio based in Karachi, specializing in digital experiences, custom web applications, AI automation, and e-commerce solutions built with architectural precision.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CoreCraft Studio — Premium Software Agency",
    description:
      "CoreCraft Agency is a multidisciplinary creative studio based in Karachi, specializing in digital experiences, custom web applications, AI automation, and e-commerce solutions built with architectural precision.",
    type: "website",
    url: siteUrl,
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreCraft Studio — Premium Software Agency",
    description:
      "CoreCraft Agency is a multidisciplinary creative studio based in Karachi, specializing in digital experiences, custom web applications, AI automation, and e-commerce solutions built with architectural precision.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "zFMJ5dhrnY0hhiEmG9i0TSidn3dejqTy_ybGx9vevIM",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${syne.variable}`}>
        {/* Warm-up connections for the third-party origins the site talks to
            at runtime: the AI-assistant widget iframe and the Web3Forms API. */}
        <link rel="preconnect" href="https://corecraft-assistant-3qld.vercel.app" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://corecraft-assistant-3qld.vercel.app" />
        <link rel="preconnect" href="https://api.web3forms.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.web3forms.com" />
        <ScrollTriggerRefresh />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

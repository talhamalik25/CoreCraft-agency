import "../src/index.css";
import SiteShell from "../src/components/common/SiteShell";
import ScrollTriggerRefresh from "../src/components/common/ScrollTriggerRefresh";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-dm-family",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-syne-family",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-jb-mono-family",
});

const siteUrl = "https://corecraft-agency.vercel.app";

export const viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CoreCraft Studio — Premium Software Agency",
    template: "%s | CoreCraft Studio",
  },
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
    images: [{ url: "/corecraft-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreCraft Studio — Premium Software Agency",
    description:
      "CoreCraft Agency is a multidisciplinary creative studio based in Karachi, specializing in digital experiences, custom web applications, AI automation, and e-commerce solutions built with architectural precision.",
    images: ["/corecraft-logo.png"],
  },
  icons: {
    icon: "/corecraft-logo.png",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CoreCraft Studio",
    "url": siteUrl,
    "logo": `${siteUrl}/corecraft-logo.png`,
    "description": "Premium software agency specializing in digital experiences, custom web apps, AI automation, and e-commerce.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karachi",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://www.linkedin.com/company/corecraftagency/",
      "https://www.instagram.com/corecraftagency/"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname === "/" && !sessionStorage.getItem("cc_intro")){document.documentElement.dataset.intro="1";setTimeout(function(){document.documentElement.removeAttribute("data-intro")},2500)}}catch(e){}})();`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${dmSans.variable} ${syne.variable} ${jetBrainsMono.variable}`}>
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

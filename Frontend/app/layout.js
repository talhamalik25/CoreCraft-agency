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
  applicationName: "CoreCraft Agency",
  title: {
    default: "CoreCraft Agency — Premium Software Agency",
    template: "%s | CoreCraft Agency",
  },
  description:
    "CoreCraft Agency employs a design-first approach to craft modern digital experiences, web applications, AI-powered solutions, and high-performance software with architectural precision.",
  keywords: [
    "CoreCraft Agency",
    "software agency",
    "web development",
    "digital experiences",
    "AI solutions",
    "custom web applications",
    "e-commerce",
    "Karachi agency",
    "UI UX design",
    "Next.js development",
  ],
  authors: [{ name: "CoreCraft Agency", url: siteUrl }],
  creator: "CoreCraft Agency",
  publisher: "CoreCraft Agency",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "CoreCraft Agency",
    title: "CoreCraft Agency — Premium Software Agency",
    description:
      "CoreCraft Agency employs a design-first approach to craft modern digital experiences, web applications, AI-powered solutions, and high-performance software with architectural precision.",
    type: "website",
    url: siteUrl,
    locale: "en_US",
    determiner: "",
    images: [
      {
        url: "/project1.webp",
        width: 1902,
        height: 948,
        alt: "CoreCraft Agency — Premium digital product work",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@corecraftagency",
    creator: "@corecraftagency",
    title: "CoreCraft Agency — Premium Software Agency",
    description:
      "CoreCraft Agency employs a design-first approach to craft modern digital experiences, web applications, AI-powered solutions, and high-performance software with architectural precision.",
    images: [
      {
        url: "/project1.webp",
        width: 1902,
        height: 948,
        alt: "CoreCraft Agency — Premium digital product work",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/icons/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "zFMJ5dhrnY0hhiEmG9i0TSidn3dejqTy_ybGx9vevIM",
  },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CoreCraft Agency",
    "legalName": "CoreCraft Agency",
    "url": siteUrl,
    "logo": `${siteUrl}/corecraft-logo.png`,
    "image": `${siteUrl}/project1.webp`,
    "description": "CoreCraft Agency employs a design-first approach to craft modern digital experiences, web applications, AI-powered solutions, and high-performance software.",
    "foundingDate": "2025",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karachi",
      "addressCountry": "PK"
    },
    "email": "corecraftagency07@gmail.com",
    "knowsAbout": [
      "Web Development",
      "Digital Experiences",
      "AI Automation",
      "E-Commerce",
      "UI/UX Design",
      "Next.js",
      "React",
      "Software Architecture",
    ],
    "sameAs": [
      "https://www.linkedin.com/company/corecraftagency/",
      "https://www.instagram.com/corecraftagency/",
      "https://www.facebook.com/share/18K9EhcQhS/?mibextid=wwXIfr",
      "https://www.pinterest.com/corecraftagency/",
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CoreCraft Agency",
    "alternateName": "CoreCraft",
    "url": siteUrl,
    "inLanguage": "en",
    "publisher": {
      "@type": "Organization",
      "name": "CoreCraft Agency",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/corecraft-logo.png`,
      },
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/work?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname === "/" && !sessionStorage.getItem("cc_intro")){document.documentElement.dataset.intro="1";setTimeout(function(){document.documentElement.removeAttribute("data-intro")},2500)}}catch(e){}})();`,
          }}
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className={`${dmSans.variable} ${syne.variable} ${jetBrainsMono.variable}`}>
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

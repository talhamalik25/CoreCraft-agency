const siteUrl = "https://corecraft-agency.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/widget"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/widget"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/widget"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

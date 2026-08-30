const siteUrl = "https://corecraft-agency.vercel.app";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/widget"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

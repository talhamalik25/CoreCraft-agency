const siteUrl = "https://corecraft-agency.vercel.app";

export default function sitemap() {
  const routes = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-conditions",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig = {
  // The repo root holds a wrapper package.json with its own lockfile; pin the
  // tracing root so Next.js doesn't warn about "multiple lockfiles".
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

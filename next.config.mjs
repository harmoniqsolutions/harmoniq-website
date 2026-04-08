import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set project root to silence the multi-lockfile workspace warning
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

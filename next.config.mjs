// No `output: "export"` here — that was only ever a stopgap so the site could be published as a
// self-contained static bundle for the old claude.ai Artifact preview, before real GitHub+Vercel
// hosting existed. Vercel now deploys this as a normal Next.js app, which is strictly better: it
// unlocks Vercel's own image optimization (responsive resizing, WebP/AVIF, no unoptimized:true
// needed) for every next/image use across the site.
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { qualities: [90] },
};

export default nextConfig;

// Fonts are self-hosted via @fontsource (npm packages, not a live fetch to fonts.googleapis.com
// at build time) rather than next/font/google. Two reasons: this workspace's sandboxed network
// can't reach Google Fonts to verify locally (it can reach npm fine), and self-hosting is also
// just better for a deployed site — no visitor data sent to Google, one less external request.
import "@fontsource/manrope/400";
import "@fontsource/manrope/500";
import "@fontsource/manrope/600";
import "@fontsource/manrope/700";
import "@fontsource/manrope/800";
import "@fontsource/big-shoulders-display/700";
import "@fontsource/big-shoulders-display/800";
import "@fontsource/big-shoulders-display/900";
import "./globals.css";
import { SITE_URL, CONTACT } from "@/app/lib/siteConfig";

const TITLE = "Ravi Fitness — Personal Training in Bengaluru";
const DESCRIPTION =
  "One-on-one and group personal training in Bengaluru. Sessions run at the client's own home or gym — every plan built around you, not a template.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "personal trainer Bengaluru",
    "personal training Bangalore",
    "home gym trainer",
    "fitness coach Bengaluru",
    "body transformation trainer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Ravi Fitness",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/img/hero.jpg", width: 700, height: 880, alt: "Ravi, personal trainer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/img/hero.jpg"],
  },
};

// LocalBusiness structured data (schema.org ExerciseGym) — Ravi trains clients at their own home
// or gym rather than a fixed studio, so this deliberately omits a street "address" (there isn't
// one to give) and uses areaServed instead, matching Google's guidance for service-area
// businesses without a public storefront.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "Ravi Fitness",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/img/hero.jpg`,
  telephone: CONTACT.phoneE164,
  email: CONTACT.email,
  areaServed: { "@type": "City", name: "Bengaluru" },
  sameAs: [CONTACT.instagramUrl],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}

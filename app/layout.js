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

export const metadata = {
  title: "Ravi Fitness — Personal Training in Bengaluru",
  description:
    "One-on-one and group personal training in Bengaluru. Sessions run at the client's own home or gym — every plan built around you, not a template.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

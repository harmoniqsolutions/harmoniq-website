// =============================================================
// Root Layout — app/layout.js
// Loads the Inter font, sets global metadata, and wraps all pages.
// Navbar and Footer are assembled in page.js (single-page site).
// =============================================================

import { Inter } from "next/font/google";
import "./globals.css";

// Load Inter with a CSS variable so Tailwind's --font-sans can reference it
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ---------------------------------------------------------------------------
// Site-wide metadata (OpenGraph, icons, SEO)
// ---------------------------------------------------------------------------
export const metadata = {
  metadataBase: new URL("https://harmoniqsolutions.com"),
  title: "HarmoniQ Solutions | Professional AV Integration",
  description:
    "HarmoniQ Solutions delivers expert audio-visual integration services — " +
    "designing and installing audio, video, and control systems for commercial environments.",
  keywords: [
    "AV integration",
    "audiovisual",
    "conference room AV",
    "sound systems",
    "video walls",
    "control systems",
    "HarmoniQ Solutions",
  ],
  openGraph: {
    title: "HarmoniQ Solutions | Professional AV Integration",
    description:
      "Expert AV integration services for corporate, hospitality, education, and more.",
    siteName: "HarmoniQ Solutions",
    images: [
      {
        url: "/images/logo-square.png",
        width: 1000,
        height: 1000,
        alt: "HarmoniQ Solutions",
      },
    ],
    type: "website",
  },
  icons: {
    apple: "/favicon-96x96.png",
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Root layout component
// ---------------------------------------------------------------------------
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      {/*
        font-sans pulls from --font-sans → var(--font-inter) defined in @theme.
        The antialiased class is set per-element in globals.css body rule.
      */}
      <body>{children}</body>
    </html>
  );
}

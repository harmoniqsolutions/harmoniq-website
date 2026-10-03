import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

// Load Inter with a CSS variable so Tailwind's --font-sans can reference it
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: [
    "AV integration",
    "audiovisual",
    "IT installation",
    "Wi-Fi installation",
    "security camera installation",
    "residential AV",
    "church sound systems",
    "sound systems",
    "HarmoniQ Solutions",
  ],
  openGraph: {
    title: SITE.title,
    description:
      "Audio, video, IT, and security installations for homes, churches, and small businesses. A small team with hands-on care for your project.",
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
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.proposition}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "accounting outsourcing",
    "offshore accounting",
    "CPA firm outsourcing",
    "tax preparation outsourcing",
    "audit support",
    "offshore bookkeeping",
    "ADAS Globus Pro",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.proposition}`,
    description: site.description,
    url: site.url,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.proposition}`,
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: [{ url: "/assets/icon-512.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#042454",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}

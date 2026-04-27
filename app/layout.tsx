import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Rushindra Sinha — Founder, Builder, Creator",
  description:
    "Creator-founder building at the intersection of medicine, AI, esports, and media. Founder of Global Esports, VCT Pacific franchise partner. MD, Stanford GSB.",
  keywords: [
    "Rushindra Sinha",
    "Dr Rushindra Sinha",
    "Global Esports",
    "AI builder",
    "Esports founder",
    "thumbnail.gg",
    "Aarees",
    "VCT Pacific",
  ],
  openGraph: {
    title: "Dr. Rushindra Sinha",
    description:
      "Creator-founder building at the intersection of medicine, AI, esports, and media.",
    type: "website",
    url: "https://rushindra.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@irushi",
    creator: "@irushi",
    title: "Dr. Rushindra Sinha — Founder, Builder, Creator",
    description:
      "MD. Stanford GSB. Founder of Global Esports, VCT Pacific franchise. AI builder. 241K+ reach.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}

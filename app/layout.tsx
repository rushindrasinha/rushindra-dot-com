import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rushindra.com"),
  title: "Dr. Rushindra Sinha — Founder, Builder, Creator",
  description:
    "Creator-founder building at the intersection of medicine, AI, esports, and media. Co-founder of Global Esports, VCT Pacific franchise partner. MD, Stanford GSB.",
  keywords: [
    "Rushindra Sinha",
    "Dr Rushindra Sinha",
    "Global Esports",
    "AI builder",
    "Esports founder",
    "thumbnail.gg",
    "Aarees",
    "VCT Pacific",
    "Creator economy",
    "India esports",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Dr. Rushindra Sinha — Founder, Builder, Creator",
    description:
      "Creator-founder building at the intersection of medicine, AI, esports, and media. Co-founder of Global Esports, one of 10 permanent VCT Pacific franchise teams.",
    type: "website",
    url: "https://rushindra.com",
    siteName: "Dr. Rushindra Sinha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@irushi",
    creator: "@irushi",
    title: "Dr. Rushindra Sinha — Founder, Builder, Creator",
    description:
      "MD. Stanford GSB. Co-founder of Global Esports, VCT Pacific franchise. AI builder. 241K+ reach.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Rushindra Sinha",
  url: "https://rushindra.com",
  sameAs: [
    "https://x.com/irushi",
    "https://instagram.com/rushindrasinha",
    "https://youtube.com/c/RushindraSinha",
    "https://linkedin.com/in/rushindrasinha",
    "https://github.com/rushindrasinha",
    "https://twitch.tv/rushindrasinha",
  ],
  jobTitle: "Founder, Creator, AI Builder",
  description:
    "Creator-founder building at the intersection of medicine, AI, esports, and media.",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "D.Y. Patil Medical College, Pune" },
    { "@type": "CollegeOrUniversity", name: "Stanford Graduate School of Business" },
  ],
  foundedOrganization: [
    { "@type": "Organization", name: "Global Esports", url: "https://globalesports.com" },
    { "@type": "Organization", name: "Aarees", url: "https://aarees.com" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${outfit.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

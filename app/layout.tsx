import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Display: grotesk, not serif. Rushi rejected serif/editorial for this site
// ("doesn't feel gamer or tech or AI") — 2026-04-30, reconfirmed 2026-09-29.
// Fonts are self-hosted (app/fonts, variable woff2 from @fontsource-variable) so the
// build never depends on fonts.googleapis.com — a Google Fonts fetch flake failed the
// v1.6.6 CI deploy on 2026-09-29.
const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-display",
  display: "swap",
});

const outfit = localFont({
  src: "./fonts/outfit-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rushindra.com"),
  title: "Dr. Rushindra Sinha — Doctor, Gamer, Founder. Building AI in public.",
  description:
    "Doctor, gamer, founder. Builds the AI systems that run his companies, in public. Co-founder of Global Esports: 2026 VCT Pacific Stage 2 champions, first-ever VALORANT Champions. Stanford GSB.",
  keywords: [
    "Rushindra Sinha",
    "Dr Rushindra Sinha",
    "Global Esports",
    "AI builder",
    "Esports founder",
    "thumbnail.gg",
    "Aarees",
    "VCT Pacific",
    "Mundhe Maps",
    "OpenClaw",
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
    title: "Dr. Rushindra Sinha — Doctor, Gamer, Founder. Building AI in public.",
    description:
      "Doctor, gamer, founder. Builds the AI systems that run his companies, in public. Co-founder of Global Esports: 2026 VCT Pacific Stage 2 champions, first-ever VALORANT Champions. Stanford GSB.",
    type: "website",
    url: "https://rushindra.com",
    siteName: "Dr. Rushindra Sinha",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@irushi",
    creator: "@irushi",
    title: "Dr. Rushindra Sinha — Doctor, Gamer, Founder. Building AI in public.",
    description:
      "Doctor. Gamer. Founder. Building AI systems in public. Co-founder of Global Esports, 2026 VCT Pacific champions. 250K+ followers.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Rushindra Sinha",
  url: "https://rushindra.com",
  image: "https://rushindra.com/rushi.jpg",
  sameAs: [
    "https://x.com/irushi",
    "https://instagram.com/rushindrasinha",
    "https://youtube.com/c/RushindraSinha",
    "https://linkedin.com/in/rushindrasinha",
    "https://github.com/rushindrasinha",
    "https://twitch.tv/rushindrasinha",
  ],
  jobTitle: "Doctor, Founder, AI Builder",
  email: "mailto:sinha@rushindra.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "business enquiries",
    email: "sinha@rushindra.com",
    url: "https://rushindra.com/contact",
    availableLanguage: ["en"],
  },
  address: {
    "@type": "PostalAddress",
    // Country-level only — deliberately not a street or city address.
    addressCountry: "IN",
  },
  description:
    "Creator-founder building at the intersection of medicine, AI, esports, and media.",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "D.Y. Patil Medical College, Navi Mumbai" },
    { "@type": "CollegeOrUniversity", name: "Stanford Graduate School of Business" },
  ],
  foundedOrganization: [
    { "@type": "Organization", name: "Global Esports", url: "https://globalesports.com" },
    { "@type": "Organization", name: "Aarees", url: "https://aarees.com" },
  ],
};

// Separate node so agents can resolve the site entity and its search/contact
// surfaces independently of the Person entity.
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dr. Rushindra Sinha",
  url: "https://rushindra.com",
  inLanguage: "en",
  publisher: { "@type": "Person", name: "Dr. Rushindra Sinha", url: "https://rushindra.com" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

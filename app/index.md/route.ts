import { NextResponse } from "next/server";

const now = new Date();
const quarter = `Q${Math.ceil((now.getMonth() + 1) / 3)} ${now.getFullYear()}`;

const HOMEPAGE_MARKDOWN = `# Dr. Rushindra Sinha

> Creator-founder building at the intersection of medicine, AI, esports, and media.

Founder · Builder · Creator. MD. Stanford GSB. Co-founder of Global Esports,
one of 10 permanent VCT Pacific franchise teams selected by Riot Games globally.

- Canonical URL: https://rushindra.com
- Primary channel: https://x.com/irushi
- Contact: rushindra@globalesports.com

## Identity stack

- **Doctor (MD)** — Medical degree, D.Y. Patil Medical College, Navi Mumbai.
  Pioneered Google Glass live-streaming of surgeries in India. Published on
  3D laparoscopic surgery.
- **Stanford GSB** — Executive education (Innovative Leadership). This is
  executive/leadership education, not a full MBA.
- **Esports founder** — Co-founded Global Esports with Mohit Israney. India's
  first VC-backed esports organisation. VCT Pacific franchise partner.
  Profitable while 18+ Indian competitors shut down.
- **Builder** — Self-taught developer since medical school. Built and sold a
  Ragnarok Online private server at 18 (first exit). Now building AI-native
  products.
- **Creator** — ~241K followers across YouTube, Instagram, X, Twitch, and
  LinkedIn. 100M+ lifetime personal views.

## Work

| Project | Type | Status | Summary |
|---|---|---|---|
| [Global Esports](https://globalesports.com) | Company | Live | India's first VC-backed esports org. VCT Pacific franchise partner. |
| [thumbnail.gg](https://thumbnail.gg) | Product | Live | AI thumbnail generation for YouTube creators. |
| [Aarees](https://aarees.com) | Platform | Active | AI creator platform on WhatsApp. Multi-agent runtime. |
| [ClutchPass](https://clutchpass.gg) | Product | Active | AI battle pass for competitive gamers. |
| Ges | Product | Soon | AI-native business operator for creators. |
| [Clutch Creator](https://github.com/rushindrasinha/clutch-creator) | Tool | Shipped | Chrome extension: any page into content angles. |
| [xReader.ai](https://xreader.ai) | Tool | Shipped | X threads as clean readable articles. |
| [YT Shorts Pipeline](https://github.com/rushindrasinha/youtube-shorts-pipeline) | Open Source | Shipped | Automated YouTube Shorts engine. |

## Platforms

| Platform | Handle | Followers |
|---|---|---|
| YouTube | Dr Rushindra Sinha | ~110K |
| Instagram | @rushindrasinha | ~63K |
| X | @irushi | ~43K |
| Twitch | @RushindraSinha | ~18.2K |
| LinkedIn | Dr Rushindra Sinha | ~7.3K |

## Current focus (${quarter})

- Ges — AI business operator for creators, founding cohort pilot
- Aarees v5.1 — live on Meta WhatsApp Cloud API
- Creator growth — distribution as a first-class product lever
- Global Esports — VCT Pacific operations

## More for agents

- [/llms.txt](https://rushindra.com/llms.txt) — structured profile
- [/llm](https://rushindra.com/llm) — full machine-readable briefing
- [/about](https://rushindra.com/about) · [/contact](https://rushindra.com/contact) · [/privacy](https://rushindra.com/privacy)
- [/sitemap.xml](https://rushindra.com/sitemap.xml)
`;

export async function GET() {
  return new NextResponse(HOMEPAGE_MARKDOWN, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

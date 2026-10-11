import { NextResponse } from "next/server";

// Revalidate daily so the current-focus quarter label never freezes at build time.
export const revalidate = 86400;

const currentQuarter = () => {
  const now = new Date();
  return `Q${Math.ceil((now.getMonth() + 1) / 3)} ${now.getFullYear()}`;
};

const homepageMarkdown = (quarter: string) => `# Dr. Rushindra Sinha

> Creator-founder building at the intersection of medicine, AI, esports, and media.

Doctor · Gamer · Founder. Builds AI systems in public. Stanford GSB. Founder of Jeufy, a
prompt-to-playable game studio. Co-founder of Global Esports,
one of 10 permanent VCT Pacific franchise teams selected by Riot Games globally.

- Canonical URL: https://rushindra.com
- Primary channel: https://x.com/irushi
- Contact: sinha@rushindra.com

## Identity stack

- **Doctor** — Medical degree, D.Y. Patil Medical College, Navi Mumbai.
  Pioneered Google Glass live-streaming of surgeries in India. Published on
  3D laparoscopic surgery.
- **Stanford GSB** — Executive education (The Innovative Health Care Leader: From Design Thinking to Personal Leadership). This is
  executive/leadership education, not a full MBA.
- **Esports founder** — Started Global Esports with Mohit Israney in July
  2017 as a proprietorship, formally incorporated by November 2018. India's
  first VC-backed esports organisation. VCT Pacific franchise partner.
  2026: won VCT Pacific Stage 2 and played VALORANT Champions Shanghai
  2026, the organisation's first Champions.
  Profitable while 18+ Indian competitors shut down.
- **Builder** — Self-taught developer since medical school. Built and sold a
  Ragnarok Online private server at 18 (first exit). Built and runs Ares, his
  own AI operating system, on OpenClaw, since January 2026 — voice-first,
  model-agnostic, runs his companies from a Discord command centre. Founder
  of Jeufy (launched October 2026): prompt to playable, a games studio that
  builds with AI agents. Now building AI-native products.
- **Creator** — ~250K personal followers across YouTube, Instagram, X, Twitch,
  and LinkedIn. 100M+ lifetime personal views.

His father's rule, and the one he still runs everything by: first, best, or only.

## Work

| Project | Type | Status | Summary |
|---|---|---|---|
| [Jeufy](https://jeufy.com) | Company | Live | Prompt to playable. A games studio that builds with AI agents; Jeufy Create lets anyone do the same from one sentence. First game: Dhamaka Arena, an original, India-flavoured arena shooter, brief to live multiplayer in under 40 minutes. Launched October 2026. @JeufyGames. |
| [Global Esports](https://globalesports.com) | Company | Live | India's first VC-backed esports org. VCT Pacific franchise partner. 2026 VCT Pacific Stage 2 champions; played VALORANT Champions Shanghai 2026, the org's first Champions. |
| Ares | Builder / Operator | Live | His own AI operating system, built on OpenClaw. Runs his companies in public. |
| [Mundhe Maps](https://mundhemaps.com) | Public good | Live | Public map of Mumbai food businesses actioned by FDA Maharashtra. Updated daily. |
| [thumbnail.gg](https://thumbnail.gg) | Product | Live | AI thumbnail generation for YouTube creators. |
| [Aarees](https://aarees.com) | Platform | Building | WhatsApp-native AI for creators. Next version in build. |
| [ClutchPass](https://clutchpass.gg) | Product | Active | AI battle pass for competitive gamers. |
| [Clutch Creator](https://github.com/rushindrasinha/clutch-creator) | Tool | Shipped | Chrome extension: any page into content angles. |
| [xReader.ai](https://xreader.ai) | Tool | Shipped | X threads as clean readable articles. |
| [rushi.live](https://rushi.live) | Tool | Live | Prompt Engine — plain-language intent into production-ready AI prompts. |
| [Operation Blackout](https://github.com/rushindrasinha/operation-blackout) | Open Source | Shipped | One-prompt browser FPS. Zero external assets. |
| [YT Shorts Pipeline](https://github.com/rushindrasinha/youtube-shorts-pipeline) | Open Source | Shipped | Automated YouTube Shorts engine. 2,300+ GitHub stars. |
| [Agent tooling](https://github.com/rushindrasinha) | Open Source | Shipped | openclaw-guide, ares-mbl, skill-audit-router, xreader-mcp. |

## Talks

- TEDx Sanjivani University (2026) — "Passion Pivots Redefine Career Frontiers": https://youtu.be/KIZiMBvIeog
- TEDx NMIMS (March 2020) — "Can You Get Paid To Play Video Games?" (with Mohit Israney): https://youtu.be/DFw5fSh9D3I

## Platforms

| Platform | Handle | Followers |
|---|---|---|
| YouTube | Dr Rushindra Sinha | ~110K |
| Instagram | @rushindrasinha | ~63K |
| X | @irushi | ~43K |
| Twitch | @RushindraSinha | ~18.2K |
| LinkedIn | Dr Rushindra Sinha | ~7.3K |

## Current focus (${quarter})

- Jeufy: prompt-to-playable game studio, launched October 2026
- Ares: his AI operating system, built on OpenClaw, runs his companies from a Discord command centre, in public
- AI-native team: taught the team to master AI instead of replacing them
- Aarees: next version of the WhatsApp-native creator AI, in build
- Global Esports: 2026 VCT Pacific Stage 2 champions; played their first Champions, Shanghai 2026

## More for agents

- [/llms.txt](https://rushindra.com/llms.txt) — structured profile
- [/llm](https://rushindra.com/llm) — full machine-readable briefing
- [/about](https://rushindra.com/about) · [/contact](https://rushindra.com/contact) · [/privacy](https://rushindra.com/privacy)
- [/sitemap.xml](https://rushindra.com/sitemap.xml)
`;

export async function GET() {
  return new NextResponse(homepageMarkdown(currentQuarter()), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

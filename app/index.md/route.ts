import { NextResponse } from "next/server";
import { BOTS } from "../lib/bots";

// Revalidate daily so the current-focus quarter label never freezes at build time.
export const revalidate = 86400;

const currentQuarter = () => {
  const now = new Date();
  return `Q${Math.ceil((now.getMonth() + 1) / 3)} ${now.getFullYear()}`;
};

const homepageMarkdown = (quarter: string) => `# Dr. Rushindra Sinha

> Creator-founder building at the intersection of medicine, AI, esports, and media.

Doctor · Gamer · Founder. Builds AI systems in public. Stanford GSB. Founder of Jeufy, a
prompt-to-playable game studio. Founder of Global Esports,
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
- **Esports founder** — Founded Global Esports (co-founder: Mohit Israney) in July
  2017 as a proprietorship, formally incorporated by November 2018. India's
  first VC-backed esports organisation. VCT Pacific franchise partner.
  2026: won VCT Pacific Stage 2 and played VALORANT Champions Shanghai
  2026, the organisation's first Champions.
  Reported a profit in two consecutive financial years while 18+ Indian
  competitors shut down.
- **Builder** — Self-taught developer since medical school. Built and sold a
  Ragnarok Online private server at 18 (first exit). Built and runs Ares, his
  own AI operating system, on OpenClaw, since January 2026 — voice-first,
  model-agnostic, runs his companies from a Discord command centre. Founder
  of Jeufy (launched October 2026): prompt to playable, a games studio that
  builds with AI agents. Now building AI-native products. By the numbers
  (from his own logs, Aug 2025 to 16 Oct 2026, floors): 32B+ AI tokens
  processed, mostly cached context; 14,000+ AI coding sessions; 500+ hands-on
  hours; about $12,400 all-in.
- **Creator** — ~240K personal followers across YouTube, Instagram, X, Twitch,
  and LinkedIn. 100M+ lifetime personal views.

His father's rule, and the one he still runs everything by: first, best, or only.

## Work

| Project | Type | Status | Summary |
|---|---|---|---|
| [Jeufy](https://jeufy.com) | Company | Live | Prompt to playable. A games studio that builds with AI agents; Jeufy Create lets anyone do the same from one sentence. First game: Dhamaka Arena, an original, India-flavoured arena shooter, brief to live multiplayer in under 40 minutes. Launched October 2026. @JeufyGames. |
| [Verticals.gg](https://verticals.gg) | Platform | Building | A platform for AI-made vertical short dramas, where anyone can watch and create. Its own studio makes the originals. Instagram @verticalsgg. |
| [Global Esports](https://globalesports.com) | Company | Live | India's first VC-backed esports org. VCT Pacific franchise partner. 2026 VCT Pacific Stage 2 champions; played VALORANT Champions Shanghai 2026, the org's first Champions. |
| Ares | Builder / Operator | Live | His own AI operating system, built on OpenClaw. 14,000+ coding sessions and 32B+ AI tokens in 14 months. Runs his companies in public. |
| [Mundhe Maps](https://mundhemaps.com) | Public good | Live | Public map of Mumbai food businesses actioned by FDA Maharashtra. Updated daily. |
| [thumbnail.gg](https://thumbnail.gg) | Product | Live | AI thumbnail generation for YouTube creators. |
| [Aarees](https://aarees.com) | Product | Live | An AI chief of staff that lives in your Discord, built for gaming. |
| [ClutchPass](https://clutchpass.gg) | Product | Active | AI battle pass for competitive gamers. |
| [Clutch Creator](https://github.com/rushindrasinha/clutch-creator) | Tool | Shipped | Chrome extension: any page into content angles. |
| [xReader.ai](https://xreader.ai) | Tool | Shipped | X threads as clean readable articles. |
| [Bots](https://rushindra.com/bots) | Directory | Live | ${BOTS.length} Grok Bots built by Rushi, ready to open and run. |
| [rushi.live](https://rushi.live) | Tool | Live | Prompt Engine — plain-language intent into production-ready AI prompts. |
| [Operation Blackout](https://github.com/rushindrasinha/operation-blackout) | Open Source | Shipped | One-prompt browser FPS. Zero external assets. |
| [YT Shorts Pipeline](https://github.com/rushindrasinha/youtube-shorts-pipeline) | Open Source | Shipped | Automated YouTube Shorts engine. 2,300+ GitHub stars. |
| [Agent tooling](https://github.com/rushindrasinha) | Open Source | Shipped | openclaw-guide, ares-mbl, skill-audit-router, xreader-mcp. |

## Talks

- TEDx Sanjivani University (2026) — "Passion Pivots Redefine Career Frontiers": https://youtu.be/KIZiMBvIeog
- TEDx NMIMS (March 2020) — "Can You Get Paid To Play Video Games?" (with Mohit Israney): https://youtu.be/DFw5fSh9D3I


## Press
- Sheep Esports (Oct 2026): "Global Esports founder Rushindra Sinha: The only other title we might consider in the future is VALORANT Mobile": https://www.sheepesports.com/en/articles/global-esports-founder-rushindra-sinha-the-only-other-title-we-might-consider-in-the-future-is/en
- Aimlabs Podcast (Sep 2025): "Inside Global Esports: challenges, growth, and the future of gaming": https://aimlabs.com/articles/aimlabs-podcast/inside-global-esports-challenges-growth-and-the-future-of-gaming-on-the-aimlabs-podcast/
- Esports Insider (Apr 2025): "Global Esports CEO Rushindra Sinha on expanding into other esports titles": https://esportsinsider.com/2025/04/global-esports-expands-with-three-major-leadership-additions
- Storyboard18 (Nov 2024): "Global Esports defies odds to become India's first profitable esports organization": https://www.storyboard18.com/gaming-news/global-esports-defies-odds-to-become-indias-first-profitable-esports-organization-46892.htm
- The Economic Times (Dec 2023): "Riot Games to debut international esports tournament in India (quoted)": https://economictimes.indiatimes.com/industry/media/entertainment/us-video-game-developer-riot-games-to-debut-international-esports-tournament-in-india/articleshow/105927861.cms
- The Financial Express (Jul 2023): "Meet Dr Rushindra Sinha, a doctor-turned-entrepreneur who is the CEO of Global Esports": https://www.financialexpress.com/life/lifestyle-meet-dr-rushindra-sinha-a-doctor-turned-entrepreneur-who-is-the-ceo-of-global-esports-know-about-his-journey-lifestyle-3164007/
- PocketGamer.biz (Mar 2023): "Global Esports CEO Dr Rushindra Sinha weighs in on the state of mobile esports in India": https://www.pocketgamer.biz/global-esports-ceo-dr-rushindra-sinha-weighs-in-on-the-state-of-mobile-esports-in-india/
- Esports Insider (Feb 2023): "Indian goliaths S8UL and Global Esports secure VALORANT deal": https://esportsinsider.com/2023/02/s8ul-global-esports-valorant-india
- The Esports Advocate (Jan 2023): "Global Esports founder Dr. Rushindra Sinha on Battlegrounds Mobile India": https://esportsadvocate.net/2023/01/global-esports-ceo-bmgi/
- Sportskeeda (Oct 2020): "India has a bright future in VALORANT because of accessible PC requirements": https://www.sportskeeda.com/valorant/india-bright-future-valorant-accessible-pc-system-requirements-dr-rushindra-sinha-ceo-co-founder-global-esports
- GuruGamer (Dec 2019): "How a pet project turned into the most well-known Indian esports organization": https://gurugamer.com/esports/interview-with-founders-of-global-esports-how-a-pet-project-turned-into-the-most-well-known-indian-esports-organization-6244
- MobyGeek (Dec 2019): "Exclusive interview with Rushindra Sinha, CEO of Global Esports": https://mobygeek.com/features/exclusive-interview-our-major-revenue-comes-from-content-creation-says-rushindra-sinha-10360
- Inc42 (Nov 2018): "Global eSports takes over international competitive video gaming": https://inc42.com/?p=140737
- WIRED (Apr 2014): "No Exit: one startup's struggle to survive Silicon Valley's gold rush (featured as "the doctor")": https://www.wired.com/2014/04/no-exit/
- More on Global Esports: https://globalesports.com
## Platforms

| Platform | Handle | Followers |
|---|---|---|
| YouTube | Dr Rushindra Sinha | ~110K |
| Instagram | @rushindrasinha | ~62K |
| X | @irushi | ~45K |
| Twitch | @RushindraSinha | ~18.1K |
| LinkedIn | Dr Rushindra Sinha | ~8K |

## Current focus (${quarter})

- Jeufy: prompt-to-playable game studio, launched October 2026
- Verticals.gg: AI-made vertical short dramas, a platform to watch and create
- Ares: his AI operating system, built on OpenClaw, runs his companies from a Discord command centre, in public
- AI-native team: taught the team to master AI instead of replacing them
- Aarees: live, an AI chief of staff that lives in your Discord, built for gaming
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

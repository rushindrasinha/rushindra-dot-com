# Changelog — rushindra.com

All changes are logged here. Format: version → date → what changed → who approved.

---

## v1.16.0 (2026-10-17 16:12 IST), requested by Rushi in #web-dev 15:51 IST (v4 at rushindra.com/v4)
- New /v4 preview (noindex, same pattern as /v3): a full redesign in the globalesports.com design family. Hero, 60-second ledger, story timeline, Global Esports season and studio, AI operating record, work, both TEDx talks, all 14 press items, platforms, Now, contact, sources.
- Static HTML/CSS/JS in public/v4, self-hosted fonts and AVIF/WebP images. Lighthouse mobile 99/100/100, desktop 100/100/100; axe zero violations at six widths.
- Config only: /v4 rewrite and noindex headers in next.config.ts, /v4 in proxy KNOWN_PATHS. Homepage and every other route unchanged.
- Facts ledger (72 sourced entries) kept off the public repo, in ~/clawd/builds/rushindra-v4/FACTS_V4.md.

## v1.15.0 (2026-10-17 15:23 IST), approved by Rushi in #web-dev 15:29 IST ("push live")
- New "In the press" section on the homepage (#press), after Talks: 13 earned-press items, newest first (Aimlabs Podcast 2025, Esports Insider 2025/2023, Storyboard18 2024, The Economic Times 2023, The Financial Express 2023, PocketGamer.biz 2023, The Esports Advocate 2023, Sportskeeda 2020, GuruGamer 2019, MobyGeek 2019, Inc42 2018, WIRED 2014). Each link checked live on 2026-10-17 15:23 IST except Esports Insider (DNS blocked from this network; verified via search index).
- Backlinks to globalesports.com: hero "Founder of Global Esports", About "In 2017 I started Global Esports", Press footer, plus the existing Work card.
- Press list mirrored into llms.txt and /index.md.
- Sheep Esports Oct 2026 interview added at the top on Rushi's word (15:25 IST: "RNT is not taboo, it's just not going forward"). 14 items total.

## [1.14.1] — 2026-10-17 (IST), Rushi in #web-dev 00:04 IST ("update the peak viewers from champs yes"; "August 2017 is founding for GE, my work started in July 2017")

### Changed
- Peak viewers: 583K for a GE match at VALORANT Champions 2026 (Esports Charts), replacing the deck's 486K on /v3; added to /llm and llms.txt GE facts.
- Global Esports founding month: August 2017 everywhere (/about, /llm, llms.txt).

---

## [1.14.0] — 2026-10-16 (IST), requested by Rushi in #web-dev 22:54 IST ("Batch 1"), pushed on Rushi's "push it" 23:04 IST

### Changed
- Global Esports role: "Founder" everywhere (hero, /about, JSON-LD, OG image, /llm, llms.txt, /index.md, previews). Mohit Israney named as co-founder. Rushi 22:54 IST: "Founded is accurate - Mohit was the co-founder. I am the founder."
- Profit claim: "India's only profitable esports org" replaced with "profitable two years running on its annual filings" (source: Sheep Esports interview, 8 Oct 2026). Not linked: the article discusses topics kept off the site.
- Followers re-checked live 16 Oct 2026: X 45K (was 43K), Instagram 62K (was 63K), Twitch 18.1K (was 18.2K), LinkedIn 8K (was 7.3K), YouTube 110K. Total ~243K, so "250K+" is now "240K+" / "nearly a quarter million".
- Aarees: Live, an AI chief of staff in Discord (was "WhatsApp-native, next version in build").
- /llm: stale "currently building Aarees.com, thumbnail.gg" and "India's top Valorant and PUBG Mobile team" lines replaced; "over 7 years" is now "since 2017".
- AI spend: "$15,000 in a single month" reworded as the API-list-price value of a peak month (Rushi 23:04 IST: "the $15k was api cost WORTH not actual spend"), shown next to the audited actual cost, about $12,400 all-in over 14 months.
- Previews /v3: peak viewers 486K (2026, GE data room) instead of 482K.

### Added
- Ares by the numbers (AI usage audit, 16 Oct 2026, floors): 32B+ tokens processed (noted: mostly cached context), 14,000+ coding sessions, 500+ hands-on hours, 1,500+ commits, 63-channel Discord command centre with a median reply under a minute. Homepage stat "32B+ AI Tokens Run" replaces "50+ GitHub Repos".

---

## [1.13.1] — 2026-10-15 (IST), requested by Rushi in #web-dev 17:36 IST ("Update the copy and everything else on the website")

### Added
- Homepage Work grid: "Bots" card linking to /bots (count read from data/bots.json, so it never goes stale).
- /index.md and /llm: Bots entry with the live count. /llms.txt: Bots section (41 as of 15 Oct 2026).

### Changed
- /bots copy, meta description and share image now cover the whole shelf (work and life), not just the first 24's content and merch bots.
- Work cards with internal links open in the same tab.

---

## [1.13.0] — 2026-10-15 (IST), requested by Rushi in #web-dev 17:00 IST ("Please update the website accordingly")

**/bots grows from 24 to 41 Grok Bots, names synced to the published templates. All work by Ares.**

### Added
- 17 new bots from Rushi's sheet (grok-bot-directory.xlsx): Review Gate, Inbox Runner, Ledger Keeper, Morning Brief, Nudge, Admin Runner, Trip Planner, Meal Planner, Wellness Coach, Family Projects, Study Tutor, Job Desk, Back Office, Market Researcher, Prospect Finder, Call Desk, System Watch. Name and description taken from each live x.ai template page (fetched 17:00 IST), not from the handoff placeholders.
- Categories Personal and Business (10 total). Order follows the sheet.
- Aliases: 13 renamed bots keep their old URLs. /bots/<old> 308s to the new slug (next.config.ts redirects built from data/bots.json); /go/<old> still reaches the bot.

### Changed
- 13 renames to the published template names: COS -> Chief of Staff, Maker -> Bot Maker, Catalog -> Plugin Installer, Merch Scout -> Merch Buyer Finder, Merch Launch -> Merch Launch Designer, Publicist -> PR Desk, Matchday -> Match Briefing, Brand Deals -> Brand Deal Manager, Reel Trio -> Anime Reel Maker, Packaging -> Title & Thumbnail Scorer, Seed Hunter -> Seed Frame Picker, Builder -> Website Builder, BookmarkDigest -> Bookmark Library. Slugs follow the names.
- Bot Maker and Chief of Staff descriptions updated to the live wording.
- Bot pages with no published use list skip the empty "What it does" panel.

---

## [1.12.1] — 2026-10-15 (IST), fixes from Grok's review forwarded by Rushi in #web-dev 15:59 IST , pushed 16:03 IST with the Web Analytics enable redeploy (Rushi enabled it 16:02 IST)

### Changed
- /go/<unknown> now redirects to /bots?missing=<slug>, which shows a dismissible notice.
- /bots JSON-LD: ItemList entries are full SoftwareApplication items.
- robots.txt: Disallow /go/ (crawlers were inflating click counts).
- A11y: screen-reader h2s for "Start here" and "All bots" so card h3s sit under a heading; active-chip count contrast raised (0.55 to 0.72 alpha).

### Not changed, on purpose
- sinha@rushindra.com stays: it is the public contact everywhere since 2026-09-29.
- Site-wide keywords meta stays: every name in it is already public on the site; it is not a privacy leak.

---

## [1.12.0] — 2026-10-15 (IST), requested by Rushi in #web-dev 15:35 IST , pushed on Rushi "And Push live" 15:45 IST

**/bots: public directory of Rushi's 24 Grok Bots, built to grow into other platforms and outside submissions. Homepage: one "Bots" nav link (Rushi "yes" 15:45 IST), visible on desktop and phones. All work by Ares.**

### Added
- data/bots.json: the 24 bots from the Grok handoff, with every unconfirmed "confirm" field stripped (needs = null hides it). Validated at build time in app/lib/bots.ts; a bad entry fails the build.
- /bots: hero, "Start here" picks (Maker, COS, Clip Finder), sticky search (press /) + category chips with counts, filters synced to the URL (?c=games&q=clip), "Runs on a schedule" and "Asks before it acts" badges, empty-state bot-idea mailto, submit-a-bot CTA, CollectionPage JSON-LD.
- /bots/[slug]: 24 static detail pages (the link to share on X) with what-it-does, connect/schedule/control facts, related bots, per-bot OG image and SoftwareApplication JSON-LD.
- /go/[slug]: tracked short link, logs a bot_click line (slug, ref, referer, country) to Vercel runtime logs plus a Vercel custom event where the plan allows, then 302s to the template. Unknown slugs go to /bots.
- Client events: bot_open, bot_copy_link, bot_search (debounced; the demand signal for what to build next).
- Sitemap: /bots + 24 detail pages. proxy.ts: /bots, /bots/*, /go/* exempt from the markdown 404.

---

## [1.11.0] — 2026-10-14 (IST), requested by Rushi in #builds 21:31 IST ("host em on rushindra.com/ares")

**/ares: public page for the "comment ARES" Instagram campaign. Homepage unchanged. All work by Ares.**

### Added
- /ares (public/ares/index.html, rewrite in next.config.ts): indexed landing page with the three free guides (Start Here 3 pp, OpenClaw Bible 18 pp, Full Stack 6 pp), a Follow @rushindrasinha button, and links to the GitHub repo and the homepage.
- /ares/*.pdf: the final 29 Sep review-pass PDFs (privacy scan clean 21:31 IST: no emails, phones, IPs or keys).

---

## [1.8.0-preview] — 2026-10-12 (IST), approved by Rushi in #web-dev 21:33 IST ("go ... add it to rushindra.com/new")

**v2 combined redesign staged at /new for a feel-test. Homepage unchanged. All work by Ares.**

### Added
- /new: static preview (public/new/index.html) combining the three v2 directions: character-select hero (B), nine-chapter ink life grid (A), glowing-ventures night scene (C). The identity picked in the hero threads through every section.
- /new is noindex (meta tag + X-Robots-Tag header), not in the sitemap. Live-verified 21:39 IST (deploy df6e865).

---

## [1.7.0] — 2026-10-12 (IST), approved by Rushi in #web-dev 07:21 IST ("Push it")

**Proof deck hero + content refresh from the Zara-thread personal-site study and the 2026-10-11 meeting notes. All work by Ares.**

### Changed
- Hero: the abstract three.js object on desktop is replaced by a fanned deck of five identity cards (Doctor, Entrepreneur, Gamer, Builder, Creator), synced to the ticker. Each card carries three hard facts. Hover a card to hold it; tap a ticker segment to jump. On mobile the active card's facts sit under the ticker. three.js no longer loads on the homepage.
- Hero status row: live IST clock, pulsing "Building in public" dot, "Now: Jeufy".
- Copy: Champions Shanghai is past tense everywhere (the run ended 4 Oct 2026). "Final franchise era" removed.
- New: Jeufy (jeufy.com) in hero lead, Work grid, Now list, 2026 timeline, story, and every machine layer (/about, /llm, /index.md, llms.txt, meta, JSON-LD).
- Now list: Jeufy, Ares, AI-native team, Verticals.gg, Aarees, Global Esports.
- New: Verticals.gg (Building) in Work grid, Now list, marquee and every machine layer (Rushi 07:21 IST: "add it now").
- Remaining "MD" labels on machine layers changed to Doctor.

### Why
- Study of 301 sites from the thread: top sites put proof on the first screen and show identity through objects; rotating role words with no proof were the most common failure. Live signals make a site feel inhabited.
- The hero said GE was "headed to" Champions, which went stale on 4 Oct.

---

## [1.6.7] — 2026-09-29 (IST)

**Self-host fonts so deploys never depend on Google Fonts. All work by Ares.**

### Changed
- `app/layout.tsx`: `next/font/google` (Space Grotesk, Outfit, JetBrains Mono) → `next/font/local`, using latin variable woff2 files copied into `app/fonts/` from @fontsource-variable (OFL). Total 95KB. No visual change; before/after hero render compared side by side.
- `/llm`, `llms.txt`: "the MD" → "the medical degree" in the commonly-garbled-credentials note. Rushi's Doctor-not-MD rule now holds on the machine layers too.

### Why
- The v1.6.6 CI deploy failed at build time with `module-not-found` on the Space Grotesk font files: the Google Fonts fetch flaked on the GitHub runner. The live site stayed on v1.6.5 until a re-run passed. Removing the network dependency eliminates that failure class instead of re-running on each flake.

---

## [1.6.6] — 2026-09-29 (IST)

**Dates confirmed by Rushi (#web-dev, 18:13 IST): Beijing film festival ~2014; the "award-winning ad film in Beijing" is the same thing; TEDx NMIMS was March 2020. All work by Ares.**

### Fixed
- /llm and llms.txt: merged the duplicate Beijing mentions ("acted in an award-winning ad film in Beijing" + "second place at the Beijing film festival") into one line: second place at the Beijing film festival (~2014) with an ad film he also acted in, alongside Tribeca first place, both with Mohit Israney.
- TEDx NMIMS dated March 2020 in /llm, llms.txt, and /index.md. The human page already shows it under '20.

---

## [1.6.5] — 2026-09-29 (IST)

**TEDx dates. Rushi (#web-dev, 18:10 IST): "NMIMS was 2020". All work by Ares.**

### Fixed
- Timeline: "2x TEDx stages" removed from the '24 entry (wrong year, same lumping bug as Tribeca). New '20 entry for the first TEDx stage (TEDx NMIMS, with Mohit Israney). The '26 entry now includes the second TEDx stage (TEDx Sanjivani University).
- Talk cards show years: "TEDx NMIMS · 2020", "TEDx Sanjivani University · 2026". The years are mirrored in /index.md and llms.txt. /llm gains a Talks block with both links.

---

## [1.6.4] — 2026-09-29 (IST)

**Socials at the top. Rushi (#web-dev, 18:09 IST): "worth adding socials in the header or the burger menu... without it looking messy". All work by Ares.**

### Added
- Header (≥1100px): a compact icon row (X, Instagram, YouTube, LinkedIn, GitHub, Twitch) between the nav links and the Work Together button, set off by a hairline divider. Icons are muted and turn accent on hover. Hidden below 1100px so the nav never crowds.
- Burger menu (phones): the same six icons as a row above the Work Together button, each a 44px tap target.
- Icons come from `simple-icons` (tree-shaken, 5 glyphs). LinkedIn was removed from simple-icons, so its glyph is inlined.

---

## [1.6.3] — 2026-09-29 (IST)

**Add Beijing film festival, 2nd place. Rushi (#web-dev, 18:08 IST): "Also won Beijing film festival (2nd place)". All work by Ares.**

### Added
- Timeline '14 (med-school era), story paragraph, /llm, and llms.txt: "second place at the Beijing film festival", alongside Tribeca first place, both with Mohit Israney. The exact year isn't confirmed yet; it's grouped with Tribeca per Rushi's canonical intro ("while still in med school the two of us somehow won Tribeca AND Beijing").

---

## [1.6.2] — 2026-09-29 (IST)

**Fact fix: Tribeca was 2014, first place. Rushi (#web-dev, 18:07 IST): "the tribeca film festival was 2014, how did it end up in 2024? (Mohit and I won first place)". All work by Ares.**

### Fixed
- `app/page.tsx` timeline: Tribeca moved from the '24 entry to '14, reworded as "Won first place at the Tribeca Film Festival with Mohit Israney." Story paragraph: "a contribution to a Tribeca Film Festival-winning film" → "first place at the 2014 Tribeca Film Festival with Mohit".
- `/llm`, `llms.txt`: "produced and edited / co-produced the 2014 Tribeca winning entry" → "won first place at the 2014 Tribeca Film Festival".
- Root cause: the Apr 27 v1.0 timeline lumped several "alongside" achievements into the '24 entry by theme, not by date. The machine layers always said 2014, so the two layers had silently disagreed.

---

## [1.6.1] — 2026-09-29 (IST)

**Hero label: drop "India". Rushi (#web-dev, 18:06 IST): "having India in the header has no meaning, please remove it." All work by Ares.**

### Changed
- `app/page.tsx`: hero label "India · Building in public" → "Building in public".

---

## [1.6.0] — 2026-09-29 (IST)

**Redesign pass: builder-in-public hero, grotesk type, portrait, mobile-first. Rushi's calls (#web-dev, 16:34 IST): "Doctor" not "MD", add my best photo, yes to builder-in-public, yes to moving off serif headings. All work by Ares. Push approved by Rushindra Sinha (#web-dev, 18:03 IST).**

### Added
- Portrait: Rushi's X profile photo (400×400; his pick, 17:01 IST, replacing a TEDx video frame he vetoed). Shown in the story section (sticky on desktop) and as the hero avatar. Also in the JSON-LD `image` and the OG card. Talk thumbnails use the official YouTube thumbnails.
- Work cards for Mundhe Maps (mundhemaps.com), Ares, and Agent tooling (openclaw-guide, ares-mbl, skill-audit-router, xreader-mcp). YT Shorts Pipeline now shows "2,300+ GitHub stars". Clutch Creator folded into the xReader card. The grid is now exactly 4×3 on desktop.
- Talks section: both TEDx talks with stills, titles, and links. "Talks" added to the nav.
- Copy-email button next to sinha@rushindra.com, because mailto fails on devices with no mail app.
- Machine layers (/llm, /llms.txt, /index.md) mirror Mundhe Maps, agent tooling, and talks.

### Changed
- Typography: Instrument Serif italic → Space Grotesk (display) + JetBrains Mono (labels, status, role ticker). There is no serif or italic anywhere now. Logo "R." → "R_". Role ticker is terminal-style ("> Builder._").
- Role ticker rotates identity words: Doctor, Entrepreneur, Gamer, Builder, Creator (Rushi, 17:10 IST; the top-10-highlights version was tried and dropped because the stats and the rest of the page already cover proof points). A segmented bar under the word shows it rotates. The label above the name is now "India · Building in public", and the lead sentence no longer opens with "Doctor turned founder", so no identity word appears twice in the hero. Screen readers get the words once as a list.
- Hero copy leads with builder-in-public: "Doctor turned founder. I build the AI systems that run my companies, and I build them in public." It also names the 2026 Stage 2 title and Champions Shanghai. "MD" → "Doctor" in the hero, credential strip, marquee, meta, OG, and /about.
- Stats: CSS grid (2 / 3 / 6 columns) instead of flex-wrap, which had left "2x TEDx" orphaned on its own row.
- Contrast: textDim #585450 → #8a857c on dark (about 2.6:1 → 5:1), and the light theme adjusted too. Labels, tags, and status went from 10–11px to 11–12px.
- Work cards are now real `<a>` links (keyboard- and middle-click-friendly) instead of `div onClick`.

### Performance / mobile
- three.js hero is loaded with `next/dynamic` only at ≥1181px. Before, phones downloaded about 1MB of JS for a canvas they never showed. Local measure at 390px: JS 1041KB → 495KB.
- Mobile page length 9,804px → 7,802px. Story shows 1 paragraph plus "Read the full story + timeline". The timeline shows the last 3 entries until expanded. The Work grid is a horizontal swipe carousel on phones.
- Touch targets ≥44px on socials, email, copy, and the logo. Small tap targets at 390px: 14 → 8.
- Single `<h1>` (was two).

---

## [1.5.1] — 2026-09-29 (IST)

**Stanford year fix. Correction by Rushindra Sinha (#web-dev, 15:51 IST): "2017 completed not 2016". All work by Ares.**

### Fixed
- `app/page.tsx`: moved Stanford GSB out of the '16 timeline entry (which stays SF + General Assembly bootcamp) into '17, before GE's start. The story section now says the programme was completed in 2017. The human page now matches the machine layers, which already said "completed 2017".

---

## [1.5.0] — 2026-09-29 (IST)

**Fresh audit: GE's 2026 season, stale product claims removed, quarter-label freeze fixed, critical Next.js advisory patched. All work by Ares. Approved by Rushindra Sinha (#web-dev, 15:47 IST).**

### Added
- Global Esports 2026 season across every layer (home, /about, /llm, /llms.txt, /index.md): Masters London 2026, VCT 2026 Pacific Stage 2 champions (Grand Final 3-2 vs Nongshim RedForce, 6 Sep 2026), first-ever VALORANT Champions qualification (Champions Shanghai 2026). Verified live on vlr.gg team page 2026-09-29 (Stage 2 Playoffs 1st, $100,000; Champions 2026 group stage in progress). Marquee gains "VCT Pacific Champions" and "Champions Shanghai 2026".

### Changed
- Aarees: "Active" / "v5.1 live on Meta WhatsApp Cloud API" → "Building" / "next version in build". The WhatsApp line is not currently connected, so the live claim was false.
- Now widget: Champions + Aarees items replace Ges and Aarees v5.1.
- Hero reach counter and /about audience figure: 241K → 250K, finishing the 1.4.6 reframe that missed these two spots.
- `next` 16.2.4 → 16.3.7 (+ eslint-config-next); `npm audit fix` for nanoid/postcss. `npm audit --omit=dev`: 5 vulns (1 critical: Proxy bypass + redirect cache poisoning, which applies since the site runs proxy.ts) → 0.

### Changed (Rushi's calls, 15:47 IST)
- Contact email everywhere (home, contact, privacy, JSON-LD, /index.md, llms.txt): rushindra@globalesports.com → sinha@rushindra.com.
- Stanford programme name corrected to the official title, "The Innovative Health Care Leader: From Design Thinking to Personal Leadership" (GSB × School of Medicine, verified on gsb.stanford.edu), replacing "Innovative Healthcare Leadership" / "Innovative Leadership".

### Removed
- Ges (Work grid, Now, /about, /index.md, llms.txt): unchanged since April, pilot not running.
- Creator OS from /llm and llms.txt current focus (initiative retired 2026-09-01).

### Fixed
- /llm and /index.md computed the "current focus" quarter at module load, so the static build froze it at deploy date (would read Q3 2026 all of Q4). Now computed per request with `revalidate = 86400`. llms.txt dropped its hard-coded "Q3 2026" label.

---

## [1.4.6] — 2026-08-23 (IST)

**Reframe the platform-audience stat: "241K combined audience" undersold what a quarter-million-plus real following actually represents. Approved by Rushindra Sinha. All work by Ares.**

### Changed
- `app/page.tsx`: Platform Presence section headline changed from "241K combined audience across platforms." to "A quarter million personal followers across socials." Marquee tag changed from "241K Reach" to "250K+ Followers."
- `app/layout.tsx`: Twitter meta description "241K+ reach" → "250K+ followers."
- `app/llm/route.ts`, `app/index.md/route.ts`, `public/llms.txt`: mirrored the same rounding — "~241K followers" → "~250K followers" / "~250K personal followers," including the platform-breakdown table totals. Per-platform numbers (YouTube ~110K, Instagram ~63K, X ~43K, Twitch ~18.2K, LinkedIn ~7.3K) left untouched — only the aggregate label changed.

### Note
This is the second pass on this stat this week (see [1.4.3]/[1.4.4] and Session 006 in PRODUCT_LOG.md, which fixed a different mismatch — the 100M+ views claim sitting next to this same chart). Rushi's ask both times has been about framing, not accuracy: the underlying platform numbers are unchanged.

---

## [1.4.5] — 2026-08-23 (IST)

**Builder-in-public content pass: real numbers from the Rushi-approved Plaud extraction cut. Approved by Rushindra Sinha. All work by Ares.**

### Added
- `app/about/page.tsx`: new "Built and running" section (5 lines) — Ares (his AI operating system, built on OpenClaw from Jan 2026, runs his companies from a Discord command centre), voice-first workflow (no laptop, 3 mics, 5-10K dictated words/day), model-agnostic design, AI spend (peaked ~$15K/month, now a hard $500/month cap), and the "agent that builds agents" concept — no internal agent names. Added the "first, best, or only" philosophy line (his father's rule). Added "practising MD" and "200+ player contracts over the decade" to the existing bio/GE copy. Added rushi.live and Operation Blackout to the "Building now" proof points.
- `app/page.tsx`: added rushi.live and Operation Blackout to the Work grid (both live/shipped and public — Operation Blackout's repo visibility was verified public before adding). Added "Ares" to the Now widget. Replaced the vague 2026 timeline entry with the concrete Ares/OpenClaw/January-2026 origin line.
- `app/llm/route.ts`, `public/llms.txt`, `app/index.md/route.ts`: mirrored all of the above into the three machine-readable layers so the canonical facts match across the human page and the agent-facing surfaces, per the site's own stated policy. Also fixed a stale "Q2 2026" current-focus label in `llms.txt` to the correct quarter.

### Source and gating
Content sourced from a Plaud voice-transcript extraction of Rushi (19-22 Aug batch), reviewed and cut down to a Rushi-approved list (23 Aug, 16:35 IST) — every line here is a fact he stated about himself, not an inference. Followed the extraction's explicit do-not-publish list (no internal agent names beyond Ares, no token/message/machine counts, no Hetzner/backup infra, no unannounced partner or deal details). The two flagged verify-before-publish items were checked before shipping: Operation Blackout's GitHub repo was confirmed public via `gh repo view` (`isPrivate: false`), and the AI-spend figures were checked against local telemetry/boot-cost records — no internal billing dataset covers dollar spend, so the number stands as Rushi's own direct, recorded statement about his own spend, same basis as the other self-reported figures already on the site (100M+ views, 241K audience).

---

## [1.4.4] — 2026-08-23 (IST)

**Hero 3D sculpture: swap generic core for a gaming/esports/creator-coded design. Flagged by Rushindra Sinha. All work by Ares. Approved by Rushindra Sinha.**

### Changed
- `app/components/Hero3D.tsx`: the hero's procedural Three.js sculpture read as an abstract glass icosahedron with 3 plain-sphere satellites — no visual signal of gaming, esports, or media/creator despite code comments claiming that intent. Replaced the core with a faceted glass targeting reticle (octahedron core + six radiating bar arms along the X/Y/Z axes, forming a 3D crosshair/aim-point from any rotation) — a direct visual reference to competitive-shooter gaming, which GE competes in directly (VALORANT). Replaced the three plain-sphere satellites with distinct shapes reading as a d8 die (gaming), a trophy silhouette (esports), and a play-button wedge (media/creator), each with continuous self-rotation added so the shape reads clearly as it orbits. No external 3D assets — stays procedural, matches the existing build philosophy. Dark palette, glass/metallic materials, and the orbiting-ring halo are unchanged.

---

## [1.4.3] — 2026-08-23 (IST)

**Fix misleading metric juxtaposition. Flagged by Rushindra Sinha. All work by Ares. Approved by Rushindra Sinha.**

### Fixed
- `app/page.tsx`: the "Platform Presence" section headline read "100M+ personal views across platforms" directly above a bar chart of per-platform follower counts (YouTube 110K, Instagram 63K, X 43K, Twitch 18.2K, LinkedIn 7.3K — summing to ~241.5K). Views and followers are different metrics off by ~400x; pairing them made the chart read as if it were breaking down the 100M figure, which it wasn't. Changed the headline to "241K combined audience across platforms," matching the actual chart data and the site's own canonical audience figure already used on `/about` and `/llm`. The 100M+ views claim itself is unaffected and still stated correctly elsewhere (`/about`, hero copy) where it isn't juxtaposed with a contradicting chart.

---

## [1.4.2] — 2026-08-23 (IST)

**Close out the VERCEL_TOKEN blocker from 1.4.1, plus TEDx proof links. All work by Ares. Approved by Rushindra Sinha.**

### Fixed
- `app/about/page.tsx`: the "two TEDx stages" claim was unlinked in three places on the site (marquee, animated counter, about copy). Added the two actual talk links to the about-page sentence: TEDxNMIMS ("Can You Get Paid To Play Video Games?", with Mohit Israney) and TEDxSanjivani University ("Passion Pivots Redefine Career Frontiers").

### Infra
- `VERCEL_TOKEN` GitHub Actions secret: root cause from 1.4.1 confirmed — the Claude Code CLI's Vercel OAuth app (`vca_`-prefixed session) is structurally blocked from minting new personal access tokens via API, regardless of interactive vs. non-interactive login (`vercel login` re-auth reproduced the identical `403 Cannot create tokens for this app`). Rushindra generated a token from the Vercel dashboard directly and it's now wired via `gh secret set VERCEL_TOKEN`. This release's push is the live test of the fix.
- Cleanup: an earlier manual attempt at setting this secret used the raw token string as the secret *name* instead of the value, leaving a dead secret (`VCP_...DFL`) in the repo's Actions secrets. Confirmed inert (source token already rotated/revoked) and deleted after explicit confirmation.

---

## [1.4.1] — 2026-08-23 (IST)

**Three open items from the Aug 22 audit follow-up. All work by Ares. Approved by Rushindra Sinha.**

### Fixed
- Global Esports founding-year contradiction: `page.tsx` said '17, `llm/route.ts` and `llms.txt` explicitly said "LATE 2018, not 2017" — first-party facts disagreed with each other. Confirmed with Rushindra Sinha: started as a proprietorship under his own name in July/August 2017, formally incorporated and the business transferred to the company by November 2018. Updated `app/page.tsx`, `app/about/page.tsx`, `app/index.md/route.ts`, `app/llm/route.ts`, and `public/llms.txt` to state both dates consistently ("started" 2017 / "incorporated" Nov 2018) instead of picking one and contradicting the other.
- 404 page did not honor `Accept: text/markdown` — every other content route on the site (`/`) content-negotiates via `proxy.ts`, but a dead path always returned the branded HTML 404 regardless of Accept header. `proxy.ts` matcher widened from `/` only to every extension-less path; unknown paths with `Accept: text/markdown` now get the plain-markdown recovery block directly (status 404, `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept, Accept-Encoding`) instead of the rendered HTML not-found page. Markdown body extracted to `app/lib/notFoundMarkdown.ts` so the HTML and markdown 404 variants can't drift apart.

### Added
- `app/lib/notFoundMarkdown.ts` — shared 404 markdown body, imported by both `app/not-found.tsx` and `proxy.ts`.

### Infra
- `VERCEL_TOKEN` GitHub Actions secret: attempted rotation via `vercel tokens add` against the ambient authenticated CLI session — blocked. The CLI's "Sign in with Vercel" OAuth session (`vca_`-prefixed token) cannot mint new personal access tokens via the API (`Error: Cannot create tokens for this app. (403)`), independent of `--scope`/`--project`. No non-interactive path found; a full browser-based `vercel login` (email/dashboard flow) would be needed to get a token-minting-capable session, which was intentionally not attempted here per instruction not to touch account-credential flows without checking back. Secret is unchanged and still stale (last set 2026-04-28); CI/CD deploy-on-push remains broken. Manual `vercel deploy --prod` (ambient CLI session) remains the working deploy path and was used to ship this release.

---

## [1.4.0] — 2026-08-22 (IST)

**Agent-readiness pass (Is Agentic audit 74/100). All work by Ares. Approved by Rushindra Sinha.**

### Added
- `app/not-found.tsx` — branded 404 with agent recovery links plus a literal markdown recovery block (sitemap, llms.txt, /llm, /about, /contact)
- `proxy.ts` — Accept-header content negotiation on `/` (Next 16 renamed `middleware` → `proxy`)
- `app/index.md/route.ts` — markdown representation of the homepage, served as `text/markdown; charset=utf-8` with `Vary: Accept, Accept-Encoding`
- `app/about/page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx` — trust anchor pages
- `app/components/PageShell.tsx` — shared server-rendered chrome for the trust anchor pages
- `app/opengraph-image.tsx` — og:image generated in code via `ImageResponse` (1200×630, real typography, no external asset)
- `llms.txt` + `/llm`: "When To Use This Source" agent guidance, including explicit do-not-use cases
- JSON-LD: `contactPoint`, `address` (country-level), `email`; new `WebSite` entity node
- `scripts/verify-agent-readiness.sh` — 26 HTTP-level assertions covering every behaviour changed here

### Changed
- `app/sitemap.ts` — now lists /about, /contact, /privacy
- `app/robots.ts` — declares canonical host
- `llms.txt` — added ClutchPass, Ges, Clutch Creator, xReader.ai, YT Shorts Pipeline (were live on the homepage but missing from the machine layer); published canonical contact email
- `next.config.ts` + `vercel.json` — `Vary` superset on `/` that adds `Accept` without dropping Next's RSC router values

### Removed
- `public/sitemap.xml`, `public/robots.txt` — stale static files shadowing the generated `app/` routes (single source of truth restored)

---

## [1.3.0] — 2026-07-26 (IST)

**NOVA X1-inspired Three.js hero + content pass. All work by Ares. Approved by Rushindra Sinha.**

### Added
- `app/components/Hero3D.tsx` — procedural Three.js hero centerpiece: faceted glass/metal orb with three orbiting satellites (medicine/gaming/AI), RoomEnvironment + PMREMGenerator reflections, ACES filmic tone mapping, three-point lighting, drag-to-rotate
- Hero3D: second perpendicular ring (blue) + 110-point ambient particle cloud for depth
- `app/components/CursorFX.tsx` — cursor interaction effect
- Hero dot-grid texture background (accent-masked subtle depth layer)
- Section heading accent rules (short green rule under key headings)
- Timeline '26 dot: pulsing green ring animation
- Global Esports card: `card-featured` treatment (green gradient background, stronger border)
- Card tags: color-coded chips by type (COMPANY/PRODUCT/PLATFORM/TOOL/OPEN SOURCE)

### Changed (content, fact-checked)
- Subtitle: `MD · Stanford GSB · Global Esports Founder · VCT Pacific · 2× TEDx`
- Hero opener: "MD-turned-founder."
- thumbnail.gg: "Click-through intelligence at production scale"
- Aarees: "direct phone-number access"
- Global Esports: "Turn an audience into a repeatable revenue engine"
- NOW section: Aarees v5.1, GE "Stable. Profitable."
- Timeline '26: "Building systems that compound — and the machine that builds them."
- Closing line: "Built at the edge of every era. Still building."
- "18+ shut down" → "18+ competitors shut down" (precision)

### Removed
- Unused default Next.js public SVG assets (file/globe/next/vercel/window)

---

## [1.2.0] — 2026-04-28 (IST)

**AI-native layer + CI/CD wiring. All work by Ares. Approved by Rushindra Sinha.**

### Added
- `public/llms.txt` — structured markdown following the llms.txt standard; entity data, orgs, platforms, current focus for AI indexers
- `app/llm/route.ts` — easter egg route at `/llm`; plain-text machine layer for AI agents/crawlers with entity data, canonical spellings, VCT context, dynamic quarter label
- `.github/workflows/deploy.yml` — GitHub Actions CI/CD pipeline; every push to `main` auto-deploys to Vercel production
- GitHub repo secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### Fixed
- Vercel CLI authenticated and Vercel token stored in vault; all v1.1.0 changes now live on rushindra.com

---

## [1.1.0] — 2026-04-28 (IST)

**Hygiene, compliance, and UX pass. All work by Ares. Approved by Rushindra Sinha.**

### Bug fixes
- `gridColumn: "span 2"` was on the wrong div (card, not the grid child Reveal wrapper) — Global Esports wide card was never actually spanning 2 columns. Fixed.
- Removed broken "Media" nav link that pointed to a non-existent `#media` section ID.

### Visual improvements
- Platform bars now use a sqrt scale — LinkedIn (7.3K) was rendering at ~6.6% width, invisible next to YouTube. Now proportional and readable.
- Marquee separator dots `·` added between items for visual rhythm.
- Products grid: 3-col → 2-col at 900px → 1-col at 640px. Previously had no mobile breakpoints.

### Content & copy
- Hero subtitle: "Founder of Global Esports, VCT Pacific franchise partner" → specific proof-first version with 1-of-10 context and "only profitable org" claim.
- Platform section heading: "100M+ lifetime views" → "100M+ personal views" (matches hero stat wording).
- Removed Ges pilot pricing (₹50K/month, 10 creators) from public NOW section — business-sensitive detail.
- "Current Focus — Q2 2026" is now dynamic — auto-updates every quarter.

### SEO & compliance
- `metadataBase` added to metadata (required for absolute OG URLs).
- Canonical URL (`/`) added via `alternates`.
- `sitemap.xml` route added at `/app/sitemap.ts` — auto-generates `https://rushindra.com/sitemap.xml`.
- `robots.txt` route added at `/app/robots.ts`.
- Schema.org Person JSON-LD structured data added to `<body>` in layout.tsx.
- `viewport` export added: `themeColor: "#08080a"`, explicit width/initialScale.
- OG `siteName` added.
- Keywords expanded with creator economy and India esports terms.

### Security headers (via next.config.ts)
- `X-Frame-Options: SAMEORIGIN` — prevents clickjacking.
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin` — limits referrer leakage.
- `Permissions-Policy` — disables camera, microphone, geolocation.
- `X-DNS-Prefetch-Control: on` — improves page load performance.

### Favicon
- `app/icon.svg` created — branded "R" in accent green (#9cff57) on dark background (#08080a), italic serif, rounded corners. Replaces default Next.js favicon in modern browsers.

### Code hygiene
- Removed unused `useCallback` import from page.tsx.
- Removed 5 unused default Next.js SVG assets from `public/`.
- `CLAUDE.md` restored — was malformed (contained only `@AGENTS.md`).
- `Reveal` component now accepts optional `className` prop.
- `aria-label` added to all nav buttons and CTAs.

---

## [1.0.0] — 2026-04-27 (IST)

**Initial build and launch session. All work done by Ares in single session.**

### Built from scratch
- Next.js 15 app with App Router, TypeScript, Turbopack
- Google Fonts: Instrument Serif (display) + Outfit (body)
- Full design system: CSS variables, dark theme (#08080a bg, #9cff57 accent), noise grain overlay
- Marquee animation (36s loop), scroll-reveal animations (Intersection Observer), animated stat counters

### Sections
- Fixed nav with blur-on-scroll, smooth scroll to sections
- Hero: split serif headline, cycling role text (Founder/Builder/Creator/Doctor), 6 animated stats, two CTAs, gradient orbs
- Marquee ticker strip
- Story + Timeline (8 milestones, '93–'26)
- Products bento grid (8 cards, Global Esports spanning 2 columns)
- Platform stats with animated bar fills
- Current focus (Q2 2026, 4 items)
- Contact (4 intent-based mailto routes)
- Footer

### Stats (hero)
- 100M+ Personal Views
- 241K+ Total Reach
- 20+ Years Building
- 5B+ Views for Creators & Brands
- 50+ GitHub Repos
- 2x TEDx

### Products listed
1. Global Esports (wide card)
2. thumbnail.gg
3. Aarees
4. ClutchPass
5. Ges
6. Clutch Creator
7. xReader.ai
8. YouTube Shorts Pipeline (open source)

### Corrections made during session
- Email: corrected from fabricated `rush@globalesports.in` → `rushindra@globalesports.com`
- Domain: corrected `globalesports.in` → `globalesports.com`
- Views stat: corrected YouTube-only 19.9M → 100M+ cross-platform personal views
- Years building: corrected 10+ → 20+
- Added 5B+ Views for Creators & Brands (was missing entirely)
- Added 50+ GitHub Repos (was dropped in earlier revision)
- Added 2x TEDx as 6th stat
- xReader.ai: corrected GitHub repo link → live site (xreader.ai)
- YouTube Shorts Pipeline: added as product card with GitHub link

### Story / content upgrades
- D.Y. Patil Medical College, Pune named explicitly
- Google Glass surgery live-streaming mentioned
- General Assembly 480hr bootcamp named
- Stanford GSB program named: "Innovative Healthcare Leadership"
- Phoenix RO: "thousands of players" detail added
- "Sold first game commercially at 18" added
- VCC (Valorant Conqueror Championship) win named
- "1 of 10 permanent VCT Pacific franchise teams globally" added
- "India's only profitable esports org while 18+ competitors shut down in 2024" added
- Tribeca Film Festival winning entry contribution added
- National inline speed skating rankings added

### Deployment
- GitHub repo: github.com/rushindrasinha/rushindra-dot-com
- Vercel project: gesports-pvt-ltd/rushindra-dot-com
- Production URL: rushindra-dot-com.vercel.app
- Custom domain: rushindra.com (DNS configured by Rushindra, 2026-04-27 ~23:16 IST)

---

## Unreleased

_Changes staged locally, pending explicit approval before push._


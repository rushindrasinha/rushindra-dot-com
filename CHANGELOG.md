# Changelog — rushindra.com

All changes are logged here. Format: version → date → what changed → who approved.

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


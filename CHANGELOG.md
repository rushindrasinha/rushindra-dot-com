# Changelog — rushindra.com

All changes are logged here. Format: version → date → what changed → who approved.

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


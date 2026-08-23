# Product Log — rushindra.com

Timestamped record of every session, change, and decision. Never deleted — append only.

---

## Session 007 — 2026-08-23

**Time:** ~15:05 IST
**Operator:** Ares
**Approved by:** Rushindra Sinha ("sure" to the crosshair-core proposal)
**Status:** Pushed to production

### Trigger

Rushindra flagged the hero's 3D sculpture as a generic-looking abstract shape ("random planet") and asked for a gaming/esports/media/creator element instead. Proposed a faceted crosshair/reticle core (competitive-shooter shorthand, direct nod to VALORANT/GE) with satellites recast as literal icons — d8 die, trophy, play button — instead of plain spheres. Rushindra approved.

### Work done

Edited `app/components/Hero3D.tsx`: swapped the icosahedron core for an octahedron with six radiating bar arms forming a 3D reticle from any angle; recast the three orbiting satellites from plain spheres into an octahedron (gaming), a cone-as-trophy (esports), and a triangular wedge oriented as a play button (media/creator), each now self-rotating in orbit so the shape reads while moving. Kept the glass/metallic materials, dark palette, halo rings, and particle field untouched.

Note: this edit was made directly in an earlier turn but never built, committed, or deployed — a subagent dispatch for it did not actually run (confirmed no subagent record exists). Caught and closed out this session: verified `npm run build` passes clean, then committed, pushed, and confirmed live via the CI/CD pipeline.

---

## Session 008 — 2026-08-23

**Time:** ~19:20-19:50 IST
**Operator:** Ares
**Approved by:** Rushindra Sinha (approved a content spec sent in a different session/thread at 16:35 IST — that approval didn't reach this thread's context, causing a "why are you asking me what launch means" moment before it was located and read)
**Status:** Pushed to production

### Trigger

A separate Ares session/lane ran a Plaud voice-transcript extraction (19-22 Aug recordings) and produced a cut of site-usable facts and quotes, sent to Rushi as "Source copy from the Plaud batch, Rushi-approved cut" at 16:35 IST. Rushi approved it there ("works, let's launch") but that message never reached this thread's session context — a cross-session context gap, not Rushi repeating himself. He sent screenshots of the approved spec directly when this session failed to act on the implicit reference.

### Work done

Located the source files (`brain/content/plaud_extract_2026-08-23/BRIEF.md` and `MASTER.md`). Verified the two flagged items before publishing: confirmed the Operation Blackout GitHub repo is public (`gh repo view`, `isPrivate: false`); checked local telemetry/boot-cost records for the AI-spend figures (no hit — no internal $ billing dataset exists locally, so published as Rushi's own directly-recorded statement, consistent with how other self-reported figures already work on the site).

Added a "Built and running" section to `/about` (Ares, voice-first workflow, model-agnostic design, spend figures, agent-that-builds-agents), the "first, best, or only" philosophy line, "practising MD" and "200+ player contracts" bio additions, and rushi.live + Operation Blackout as proof points. Mirrored the same facts into `app/page.tsx` (Work grid, Now widget, sharpened 2026 timeline entry), `app/llm/route.ts`, `public/llms.txt`, and `app/index.md/route.ts` so the human page and all three machine-readable layers stay in sync, per the site's own stated policy. Fixed a stale "Q2 2026" label found in `llms.txt` along the way. Cross-checked every new line against the extraction's do-not-publish list before shipping — no internal agent names beyond Ares, no infra/token/message counts, no unannounced deals.

---

## Session 006 — 2026-08-23

**Time:** ~12:44–12:50 IST
**Operator:** Ares
**Approved by:** Rushindra Sinha (flagged the issue directly, fix approved by proceeding)
**Status:** Pushed to production — first push through the now-working CI/CD pipeline

### Trigger

Rushindra flagged a screenshot: the "Platform Presence" section headline claims "100M+ personal views across platforms" directly above a bar chart of follower counts. Felt misleading — like the chart was breaking down the 100M figure when it's an entirely different, much smaller metric.

### Work done

Confirmed the chart's `PLATFORMS` array (`app/page.tsx`) sums to 110K + 63K + 43K + 18.2K + 7.3K = ~241.5K — matching the site's own canonical "241K" audience figure already used on `/about` and `/llm`. Changed the section headline from "100M+ personal views across platforms." to "241K combined audience across platforms." so it describes what the chart actually shows. Left the 100M+ views claim untouched everywhere else on the site (hero copy, `/about`) since it's accurate there and not paired with a contradicting chart.

### Verification

`npm run build` clean. This is the first real-world push through the CI/CD pipeline fixed in Session 005 — verify the GitHub Actions "Deploy to Vercel" run succeeds, not just that the push happened.

---

## Session 005 — 2026-08-23

**Time:** ~12:00–12:20 IST
**Operator:** Ares
**Approved by:** Rushindra Sinha (explicit approval to delete the stray secret and ship the TEDx links)
**Status:** Pushed to production — this push is the live test of the VERCEL_TOKEN fix

### Trigger

Closing out the one item Session 004 left blocked, plus a gap spotted while that session was running: the site claims "2× TEDx" in three places but links neither talk.

### Work done

1. **VERCEL_TOKEN, closed.** Root cause confirmed, not just worked around: the Claude Code CLI's Vercel integration authenticates via a `vca_`-prefixed OAuth-app session, and Vercel structurally blocks OAuth-app sessions from minting new personal access tokens via API (`403 Cannot create tokens for this app`) — reproduced identically even after a fresh interactive `vercel login`, so it isn't an auth-freshness issue, it's the app type. Rushindra generated a token directly from the Vercel dashboard and it's now in place as `VERCEL_TOKEN` via `gh secret set`.
2. **Stray secret cleanup.** A manual `gh secret set` attempt during the token rotation used the raw old token string as the secret *name* instead of the value, leaving `VCP_...DFL` sitting in the repo's Actions secrets. Confirmed the underlying token was already rotated/revoked (inert), got explicit go-ahead, deleted it. Only `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` remain.
3. **TEDx links.** `app/about/page.tsx` "two TEDx stages" line now links both talks: TEDxNMIMS ("Can You Get Paid To Play Video Games?", with Mohit Israney) and TEDxSanjivani University ("Passion Pivots Redefine Career Frontiers").

### Verification

`npm run build` clean. This commit's push is the real-world test of the GitHub Actions deploy pipeline with the new token — see CHANGELOG for the run result.

---

## Session 004 — 2026-08-23

**Time:** ~10:30–11:15 IST  
**Operator:** Ares  
**Approved by:** Rushindra Sinha (explicit approval to make and push/deploy these changes)  
**Status:** Pushed to production ✓ (2 of 3 items fully closed; VERCEL_TOKEN blocked, see below)

### Trigger

Three items left open from the Aug 22 audit follow-up (Session 003, item 4 and the CI/CD deploy history).

### Work done

| # | Item | Before | Action |
|---|------|--------|--------|
| 1 | Founding-year contradiction | `page.tsx` said '17; `llm/route.ts`/`llms.txt` said "LATE 2018, not 2017" | Confirmed real facts with Rushindra Sinha: started as a proprietorship July/Aug 2017, incorporated Nov 2018. Made every copy source (`page.tsx`, `about/page.tsx`, `index.md/route.ts`, `llm/route.ts`, `llms.txt`) state both dates the same way |
| 2 | 404 markdown negotiation gap | `proxy.ts` matcher only covered `/`; unknown paths always got HTML regardless of Accept | Widened matcher to all extension-less paths; unknown path + `Accept: text/markdown` now returns the markdown 404 body directly (404 status, correct Content-Type, Vary). Shared body extracted to `app/lib/notFoundMarkdown.ts` |
| 3 | Stale `VERCEL_TOKEN` GH secret | Last rotated 2026-04-28, most recent Actions run (Aug 22) failed | BLOCKED — see below |

### VERCEL_TOKEN finding

`vercel tokens add` against the ambient authenticated CLI session fails with `Error: Cannot create tokens for this app. (403)`, regardless of `--scope` or `--project`. The local `auth.json` holds a `vca_`-prefixed OAuth-app token (from "Sign in with Vercel"), and Vercel does not allow OAuth-app-issued CLI sessions to mint new personal access tokens via the API — only a token created through the classic dashboard/email login flow can do that. No non-interactive fix exists from here. Did not attempt browser-based `vercel login` since that touches account credentials and the instruction was to check back first rather than automate it. `gh secret set` was not run because there is no new token value to set. Net effect: GitHub Actions auto-deploy-on-push is still broken; this release was shipped via manual `vercel deploy --prod` on the ambient CLI session, same as the workaround already in use.

### Verification

`npm run build` clean. Tested locally with `next start`: `Accept: text/markdown` on `/` returns the homepage markdown (unchanged behavior), on a nonexistent path returns the 404 markdown body with `404` status and `Vary: Accept, Accept-Encoding`; no-Accept-header requests get HTML in both cases. Confirmed against production after deploy (see CHANGELOG / final report for exact curl output and commit hash).

### Open / needs decision

- VERCEL_TOKEN: needs Rushindra to either run `vercel login` interactively (browser/email) to get a token-minting-capable session, or generate a token from the Vercel dashboard directly and hand it over for `gh secret set`.

---

## Session 003 — 2026-08-22

**Time:** ~01:30–02:00 IST  
**Operator:** Ares  
**Approved by:** Rushindra Sinha (Discord, 2026-08-22 07:39 IST — "Go for it, push")  
**Status:** Pushed to production ✓

### Trigger

Is Agentic readiness audit scored rushindra.com 74/100 with 7 items (2 Essential, 5 Recommended). Rushi dropped the audit into #web-dev › rushindra.com.

### Work done

Implemented 6 of 7 audit items. Item 5 (brand-name search rank) is external SEO/PR, not a code change.

| # | Item | Before | Action |
|---|------|--------|--------|
| 1 | Agent-friendly 404s | Partial | `app/not-found.tsx` with markdown recovery block |
| 2 | Markdown content negotiation | Failed | `proxy.ts` + `app/index.md/route.ts` |
| 3 | Agent when-to-use guidance | Failed | New section in `llms.txt` and `/llm` |
| 4 | Trust anchor pages | Failed | `/about`, `/contact`, `/privacy` |
| 5 | Brand discoverability | Partial | OUT OF SCOPE — needs press/backlinks |
| 6 | Metadata (og:image) | Partial | `app/opengraph-image.tsx` via ImageResponse |
| 7 | Schema contactPoint/address | Partial | Person JSON-LD + WebSite node |

### Findings not in the audit

1. **Next 16 renamed `middleware` → `proxy`.** Writing `middleware.ts` would have silently done nothing.
2. **`public/sitemap.xml` + `public/robots.txt` shadowed the generated `app/` routes.** Caught by the verification script when the new URLs did not appear locally. Static duplicates removed.
3. **Apex `rushindra.com` 307-redirects to `www.rushindra.com`**, while every canonical URL and JSON-LD claims the apex. Redirect chain masking the apex is exactly what audit item 5 warns about. NOT changed — Vercel domain config, needs Rushi's decision.
4. **Content contradiction:** `page.tsx` timeline says Global Esports founded '17; `llms.txt` says "LATE 2018 — not 2017 or 2019". Contradictory first-party facts hurt agent entity resolution. NOT resolved — needs Rushi to confirm which is correct.
5. **`llms.txt` was stale** — missing ClutchPass, Ges, Clutch Creator, xReader.ai, YT Shorts Pipeline, all live on the homepage. Added.

### Verification

`scripts/verify-agent-readiness.sh` — 26 assertions, 26 passed against a local production build. `npm run build` clean. `npm run lint` unchanged (6 pre-existing errors in `page.tsx`, present at HEAD, none introduced).

### Open / needs decision

- Apex vs www canonical (item 5)
- Global Esports founding year contradiction
- HTML-branch `Vary: Accept` relies on `vercel.json` edge headers — unverifiable locally, must be re-checked after deploy

---

## Session 001 — 2026-04-27

**Time:** ~20:00–23:18 IST  
**Operator:** Ares  
**Approved by:** Rushindra Sinha  
**Status:** Pushed to production ✓

### Work done

**Planning & research**
- Explored full codebase, prior draft websites (rushindra-com-homepage-v3.jsx, rushindra-com-opus-edited.jsx)
- Deep research via files: rushi_public_persona_audit_2026-02-25.md, rushi_technical_founder_deep_audit_2026-02-25.md, GE-intelligence-master.md, AD-handover-intel.md
- Identified gaps in previous drafts: missing marquee, missing platform stats, missing animated counters, weak bio, generic timeline

**Build**
- Scaffolded Next.js 16 app from scratch at `/Users/rushindrasinha/rushindra-dot-com/`
- Wrote `globals.css`: full design system, CSS variables, keyframes (marquee, roleFadeIn, barFill, reveal)
- Wrote `layout.tsx`: metadata, OG tags, Twitter cards, Google Fonts setup
- Wrote `page.tsx` (~1100 lines): complete single-page React component with all sections

**Content corrections (during session)**

| Issue | Wrong | Correct |
|-------|-------|---------|
| Contact email | `rush@globalesports.in` | `rushindra@globalesports.com` |
| GE website | `globalesports.in` | `globalesports.com` |
| Lifetime views | 19.9M (YouTube only) | 100M+ (cross-platform personal) |
| Years building | 10+ | 20+ |
| Missing stat | — | 5B+ Views for Creators & Brands |
| Missing stat | — | 50+ GitHub Repos |
| Missing stat | — | 2x TEDx |
| xReader.ai link | GitHub repo | xreader.ai (live site) |
| Missing product | — | YouTube Shorts Pipeline |

**Story upgrades (session)**
- Added: D.Y. Patil Medical College, Pune
- Added: Google Glass surgery live-streaming (first in India)
- Added: General Assembly 480hr full-stack bootcamp
- Added: Stanford GSB program name (Innovative Healthcare Leadership)
- Added: Phoenix RO had thousands of active players
- Added: Sold first game commercially at 18
- Added: Won Valorant Conqueror Championship
- Added: 1 of 10 permanent VCT Pacific franchise teams globally
- Added: India's only profitable esports org, 18+ competitors shut down 2024
- Added: Tribeca Film Festival winning entry contribution
- Added: National inline speed skating rankings

**Deployment**
- GitHub repo created: github.com/rushindrasinha/rushindra-dot-com
- Vercel deployment: gesports-pvt-ltd/rushindra-dot-com
- rushindra.com DNS connected by Rushindra ~23:16 IST

### Final state — v1.0.0
- 8 sections: Hero, Marquee, Story+Timeline, Products, Platform Stats, Now, Contact, Footer
- 6 hero stats: 100M+ Personal Views, 241K+ Total Reach, 20+ Years Building, 5B+ Views for Creators & Brands, 50+ GitHub Repos, 2x TEDx
- 8 products: Global Esports, thumbnail.gg, Aarees, ClutchPass, Ges, Clutch Creator, xReader.ai, YT Shorts Pipeline
- 5 platform bars: YouTube (110K), Instagram (63K), X (43K), Twitch (18.2K), LinkedIn (7.3K)
- 4 NOW items: Ges, Aarees v5, Creator growth, Global Esports
- 4 contact routes: Brand Partnership, Speaking/Podcast, Business Opportunity, Media/Press

---

_Future sessions appended below this line._

---

## Session 002 — 2026-04-28

**Time:** ~10:38–11:00 IST  
**Operator:** Ares  
**Approved by:** Rushindra Sinha  
**Status:** Pushed to production ✓

### Trigger

Rushi requested a site improvement pass covering: better browser (headless, no visible Chrome windows), site hygiene, favicon, compliance, copy quality, and GitHub repo version control.

### Work done

**Bug fixes**
- `gridColumn: "span 2"` was applied to the card div, not the grid child (Reveal wrapper). Global Esports wide card was never actually spanning 2 columns since v1.0.0. Fixed by moving `gridColumn` to Reveal `style` prop.
- Removed "Media" nav link — pointed to non-existent `#media` section ID.

**Visual**
- Platform bars: switched from linear to sqrt scale. LinkedIn (7.3K) was rendering at 6.6% width (invisible). Now all bars are proportionally visible.
- Marquee separator dots `·` between each item.
- Products grid: added `.products-grid` CSS class with responsive breakpoints (3-col → 2-col at 900px → 1-col at 640px).

**Content & copy**
- Hero subtitle: made proof-first with specific "1-of-10 VCT Pacific" and "only profitable org" claims.
- Platform section header: reconciled "lifetime views" → "personal views" to match hero.
- Removed Ges pricing from public NOW section.
- "Q2 2026" label is now dynamically generated — won't go stale quarterly.

**SEO compliance**
- `metadataBase`, canonical URL, sitemap.xml, robots.txt, JSON-LD Person schema, themeColor viewport meta, OG siteName.

**Security**
- 5 security headers added in next.config.ts: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control.

**Favicon**
- `app/icon.svg` — branded "R" monogram in accent green on dark background.

**Code hygiene**
- Removed unused `useCallback` import.
- Removed 5 default Next.js public/ SVG assets.
- Fixed broken `CLAUDE.md`.
- `Reveal` component: added `className` prop.
- `aria-label` on all nav and CTA buttons.

**Docs**
- `CLAUDE.md`: fully restored with hard rules, workflow, weekly pass checklist.
- `CHANGELOG.md`: v1.1.0 entry added.
- `PRODUCT_LOG.md`: this entry.
- `package.json`: version bumped 0.1.0 → 1.1.0.

### Final state — v1.1.0
- All v1.0.0 sections intact, no content removed except Ges pilot pricing
- Nav: 4 links (About, Work, Now, Contact) — was 5 (Media removed)
- Platform bars: sqrt scale with 6% minimum width
- Grid: fully responsive
- SEO score: sitemap ✓, robots ✓, canonical ✓, JSON-LD ✓, OG ✓, Twitter card ✓
- Security: 5 headers active


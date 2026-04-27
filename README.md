# rushindra.com

Personal website for Dr. Rushindra Sinha — founder, builder, creator.

**Live:** https://rushindra.com  
**Vercel project:** https://vercel.com/gesports-pvt-ltd/rushindra-dot-com  
**GitHub:** https://github.com/rushindrasinha/rushindra-dot-com

---

## Stack

- Next.js 16 (App Router, TypeScript)
- Google Fonts: Instrument Serif + Outfit
- Pure CSS animations + inline styles (no UI library)
- Intersection Observer API for scroll animations
- Deployed on Vercel (auto-deploy on push to `main`)

## Local development

```bash
npm install
npm run dev        # dev server → localhost:3000
npm run build      # production build
npm start          # serve production build locally
```

## Deployment rules

> **No changes are pushed to production without explicit approval from Rushindra.**

1. All proposed changes are made to the local copy first
2. A diff/summary is sent for review
3. Only after explicit approval → `git push origin main`
4. Vercel auto-deploys within ~60 seconds of push

## Weekly pass (automated)

Ares runs a weekly review of the offline version covering:
- Stat accuracy (follower counts, view counts)
- "Now" section currency (update for current quarter)
- Broken or outdated links
- New products/projects to add
- Story/timeline updates if milestones occurred
- Any copy that feels stale

All changes proposed as a diff. Nothing ships without approval.

## File structure

```
app/
  layout.tsx      — metadata, fonts, root HTML
  page.tsx        — full page component (all sections)
  globals.css     — CSS variables, keyframes, base styles
next.config.ts    — Next.js config
CHANGELOG.md      — version history of every change
PRODUCT_LOG.md    — timestamped session log
README.md         — this file
```

## Design tokens

| Token | Value |
|-------|-------|
| Background | `#08080a` |
| Accent (lime) | `#9cff57` |
| Blue | `#5ebaff` |
| Text | `#e2e0da` |
| Text mid | `#98958d` |
| Text dim | `#585450` |
| Display font | Instrument Serif |
| Body font | Outfit |

## Contact email

`rushindra@globalesports.com` — professional/business  
`sinha@rushindra.com` — personal brand

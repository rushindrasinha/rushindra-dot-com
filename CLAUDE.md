# CLAUDE.md — rushindra.com

Instructions for Ares when working on this project.

## Hard rules

1. **Never push to GitHub without explicit "yes" from Rushindra.** Make all changes locally, present the diff, wait for approval.
2. Vercel auto-deploys on push to `main` — a push IS a production deploy.
3. Run `npm run build` before every commit. Do not commit if build fails.

## Workflow

```
edit locally → npm run build → present diff → wait for approval → git push origin main
```

## Every ship requires

- Version bump in `package.json` (semver: patch/minor/major)
- New entry in `CHANGELOG.md` (newest first)
- New session entry in `PRODUCT_LOG.md`

## Content location

All copy and data is in `app/page.tsx` — top of file, clearly marked DATA section. No CMS.

## Weekly pass checklist

- [ ] Update PLATFORMS follower counts (page.tsx)
- [ ] Update NOW section items if priorities changed
- [ ] Verify all product URLs are live
- [ ] Check hero/marquee stats are still accurate
- [ ] Add new products to WORK array if shipped
- [ ] Log session in PRODUCT_LOG.md

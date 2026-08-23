// Shared markdown body for the 404 case. Used by both the rendered HTML
// not-found page (app/not-found.tsx) and the Accept: text/markdown branch
// served directly out of proxy.ts, so the two variants never drift apart.
export const NOT_FOUND_MARKDOWN = `# 404 — Not Found

The requested path does not exist on rushindra.com.

## Where to look next

- [/](https://rushindra.com/) — homepage, full profile
- [/about](https://rushindra.com/about) — biography and background
- [/contact](https://rushindra.com/contact) — contact routes and channels
- [/llms.txt](https://rushindra.com/llms.txt) — structured profile for LLMs and agents
- [/llm](https://rushindra.com/llm) — full machine-readable agent briefing
- [/sitemap.xml](https://rushindra.com/sitemap.xml) — every indexable URL

Canonical host: https://rushindra.com
`;

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NOT_FOUND_MARKDOWN } from "./app/lib/notFoundMarkdown";

// acceptmarkdown.com — the homepage answers in text/markdown when an agent
// asks for it, and always advertises that the response varies on Accept so a
// CDN cannot hand the HTML variant to an agent (or vice versa). The same
// negotiation applies to the 404 case: an agent that lands on a dead path
// with Accept: text/markdown gets the plain-markdown recovery block instead
// of the branded HTML not-found page.
const VARY = "Accept, Accept-Encoding";

// Every real, routable path on the site. Anything outside this set is a 404
// as far as content negotiation is concerned — kept in sync manually since
// this is a small, fully static route table (see app/ for the source of
// truth if this list ever needs to grow).
const KNOWN_PATHS = new Set([
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/llm",
  "/index.md",
  "/llms.txt",
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.ico",
  "/icon.svg",
  "/opengraph-image",
]);

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Ignore the wildcard browsers send; only an explicit text/markdown counts.
  return accept.split(",").some((part) => part.trim().toLowerCase().startsWith("text/markdown"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const markdown = wantsMarkdown(request.headers.get("accept"));

  if (pathname === "/" && markdown) {
    const response = NextResponse.rewrite(new URL("/index.md", request.url));
    response.headers.set("Vary", VARY);
    return response;
  }

  if (markdown && !KNOWN_PATHS.has(pathname)) {
    // Unknown path, agent explicitly asked for markdown: short-circuit
    // straight to the markdown 404 body instead of letting Next.js render
    // (and this middleware pass through) the HTML not-found page.
    return new NextResponse(NOT_FOUND_MARKDOWN, {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": VARY,
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Vary", VARY);
  return response;
}

export const config = {
  // Run on every extension-less path (i.e. every page-shaped request, not
  // static/image/asset requests) so the 404 branch above can see paths that
  // don't match any route — not just "/". Files with an extension
  // (llms.txt, icon.svg, favicon.ico, ...) are real static/generated routes
  // Next serves directly and don't need this negotiation pass.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

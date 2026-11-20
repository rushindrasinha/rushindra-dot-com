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
  "/new",
  "/clean",
  "/v2",
  "/v3",
  "/v4",
  "/bots",
  "/live",
  "/api/live",
]);

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Ignore the wildcard browsers send; only an explicit text/markdown counts.
  return accept.split(",").some((part) => part.trim().toLowerCase().startsWith("text/markdown"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const markdown = wantsMarkdown(request.headers.get("accept"));
  const host = (request.headers.get("host") || request.nextUrl.host).split(":")[0].toLowerCase();
  const liveHost = host === "rushi.live" || host === "www.rushi.live";
  const liveMarkdown = "# Rushi Live\n\nWatch Rushindra Sinha live and follow the latest clips.\n\n- [YouTube](https://youtube.com/@rushindrasinha)\n- [Twitch](https://twitch.tv/rushindrasinha)\n- [Kick](https://kick.com/rushindrasinha)\n- [X](https://x.com/irushi)\n- [Instagram](https://instagram.com/rushindrasinha)\n\n[About Rushindra](https://rushindra.com/)\n";
  const moved = (origin: string, path: string) => {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = origin;
    url.port = "";
    url.pathname = path;
    return NextResponse.redirect(url, 308);
  };

  if ((host === "rushindra.com" || host === "www.rushindra.com") && (pathname === "/live" || pathname === "/live/")) {
    return moved("rushi.live", "/");
  }

  if (liveHost) {
    // No redirects or hints for old private-tool paths; do not forward query data.
    if (["/login", "/reset-password", "/signup", "/auth", "/forgot-password"].some((p) => pathname === p || pathname.startsWith(p + "/"))) {
      return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
    }
    if (host === "www.rushi.live") return moved("rushi.live", pathname);
    if (pathname === "/live" || pathname === "/live/") return moved("rushi.live", "/");
    if (pathname === "/robots.txt") {
      return new NextResponse("User-agent: *\nAllow: /\nSitemap: https://rushi.live/sitemap.xml\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
    if (pathname === "/sitemap.xml") {
      return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://rushi.live/</loc></url></urlset>', { headers: { "Content-Type": "application/xml; charset=utf-8" } });
    }
    if (pathname === "/llms.txt" || pathname === "/index.md" || pathname === "/llm" || (pathname === "/" && markdown)) {
      return new NextResponse(liveMarkdown, { headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: VARY } });
    }
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/live";
      return NextResponse.rewrite(url);
    }
    if (pathname === "/api/live" || pathname.startsWith("/_next/") || pathname.startsWith("/_vercel/insights/") || ["/favicon.ico", "/icon.svg", "/opengraph-image"].includes(pathname)) {
      return NextResponse.next();
    }
    // This hostname is a live hub, not a second copy of the portfolio.
    return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  }

  if (pathname.startsWith("/_next/") || /\.[^/]+$/.test(pathname)) return NextResponse.next();

  if (pathname === "/live" && markdown) {
    return new NextResponse(liveMarkdown, { headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: VARY } });
  }

  if (pathname === "/" && markdown) {
    const response = NextResponse.rewrite(new URL("/index.md", request.url));
    response.headers.set("Vary", VARY);
    return response;
  }

  if (markdown && !KNOWN_PATHS.has(pathname) && !pathname.startsWith("/bots/") && !pathname.startsWith("/go/")) {
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
  // Include robots/sitemap/assets so the live hostname cannot leak portfolio routes.
  // Static assets pass through before main-site content negotiation above.
  matcher: ["/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// acceptmarkdown.com — the homepage answers in text/markdown when an agent
// asks for it, and always advertises that the response varies on Accept so a
// CDN cannot hand the HTML variant to an agent (or vice versa).
const VARY = "Accept, Accept-Encoding";

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Ignore the wildcard browsers send; only an explicit text/markdown counts.
  return accept.split(",").some((part) => part.trim().toLowerCase().startsWith("text/markdown"));
}

export function proxy(request: NextRequest) {
  if (wantsMarkdown(request.headers.get("accept"))) {
    const response = NextResponse.rewrite(new URL("/index.md", request.url));
    response.headers.set("Vary", VARY);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", VARY);
  return response;
}

export const config = {
  matcher: "/",
};

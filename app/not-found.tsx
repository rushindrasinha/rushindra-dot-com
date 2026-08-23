import type { Metadata } from "next";
import Link from "next/link";
import { NOT_FOUND_MARKDOWN } from "./lib/notFoundMarkdown";

export const metadata: Metadata = {
  title: "404 — Page not found | Dr. Rushindra Sinha",
  description:
    "This page does not exist on rushindra.com. Recovery links to the sitemap, llms.txt, and the machine-readable agent briefing.",
  robots: { index: false, follow: true },
};

const RECOVERY = [
  { href: "/", label: "/", desc: "Homepage — full profile, work, and contact routes" },
  { href: "/about", label: "/about", desc: "Biography and background" },
  { href: "/contact", label: "/contact", desc: "Contact routes and channels" },
  { href: "/llms.txt", label: "/llms.txt", desc: "Structured profile for LLMs and agents" },
  { href: "/llm", label: "/llm", desc: "Full machine-readable agent briefing" },
  { href: "/sitemap.xml", label: "/sitemap.xml", desc: "Every indexable URL on this site" },
];

// Plain-markdown recovery block, rendered here for humans/browsers hitting
// the 404 with an HTML Accept header. Agents sending Accept: text/markdown
// get this exact same text served directly (no HTML wrapper) from proxy.ts,
// since Next.js middleware runs ahead of this component and short-circuits
// the response before it ever reaches this render path.
const MARKDOWN_BODY = NOT_FOUND_MARKDOWN;

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#08080a",
        color: "#e2e0da",
        fontFamily: "var(--font-body)",
        padding: "clamp(48px, 10vh, 120px) clamp(24px, 5vw, 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <p
          style={{
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#9cff57",
            margin: "0 0 20px 0",
            fontWeight: 600,
          }}
        >
          Error 404
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 7vw, 64px)",
            lineHeight: 1.05,
            margin: "0 0 20px 0",
            fontWeight: 400,
          }}
        >
          This page doesn&apos;t exist.
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "#98958d",
            lineHeight: 1.7,
            fontWeight: 300,
            margin: "0 0 40px 0",
          }}
        >
          The path you requested isn&apos;t on this site. If you&apos;re an agent or
          crawler, the links below are the fastest way to recover — a
          machine-readable copy of this list is in the block at the bottom.
        </p>

        <div style={{ display: "grid", gap: 10 }}>
          {RECOVERY.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.025)",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: "#9cff57" }}>
                  {r.label}
                </span>
                <span style={{ fontSize: 13, color: "#98958d", fontWeight: 300 }}>
                  {r.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <pre
          style={{
            marginTop: 44,
            padding: "20px 22px",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.025)",
            borderRadius: 10,
            fontSize: 12,
            lineHeight: 1.6,
            color: "#585450",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {MARKDOWN_BODY}
        </pre>
      </div>
    </main>
  );
}

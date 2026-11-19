import type { Metadata } from "next";

// ── DATA ─────────────────────────────────────────────────────────────
// Handles: X is @irushi; every other platform uses the shared handle.
const LIVE_HANDLE = "rushindrasinha";
const CHANNELS = [
  { name: "YouTube", note: "Streams, VODs, Shorts", url: `https://youtube.com/@${LIVE_HANDLE}`, handle: `@${LIVE_HANDLE}` },
  { name: "Twitch", note: "Live now and chat", url: `https://twitch.tv/${LIVE_HANDLE}`, handle: `@${LIVE_HANDLE}` },
  { name: "Kick", note: "Live now and chat", url: `https://kick.com/${LIVE_HANDLE}`, handle: `@${LIVE_HANDLE}` },
  { name: "X", note: "Clips and updates", url: "https://x.com/irushi", handle: "@irushi" },
  { name: "Instagram", note: "Reels and stories", url: `https://instagram.com/${LIVE_HANDLE}`, handle: `@${LIVE_HANDLE}` },
];
// ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Live — Dr. Rushindra Sinha",
  description: "Watch Rushindra Sinha live: YouTube, Twitch, Kick, X and Instagram. All channels in one place.",
  alternates: { canonical: "/live" },
  openGraph: {
    title: "Live — Dr. Rushindra Sinha",
    description: "Watch live on YouTube, Twitch or Kick. Clips on X and Instagram.",
    url: "https://rushindra.com/live",
    type: "website",
  },
};

export default function LivePage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "var(--bg)",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(32px, 8vw, 80px) var(--px)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        <p style={{ color: "var(--accent)", fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
          Live
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 11vw, 64px)",
            lineHeight: 1.05,
            color: "var(--white)",
            fontWeight: 400,
            margin: "12px 0 8px",
          }}
        >
          Watch me play. Live.
        </h1>
        <p style={{ color: "var(--text-mid)", fontSize: 17, lineHeight: 1.5, margin: "0 0 32px" }}>
          Streaming on every platform. Pick yours.
        </p>

        <nav aria-label="Streaming and social channels" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CHANNELS.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                minHeight: 64,
                padding: "14px 20px",
                background: "var(--surface-strong)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                color: "var(--white)",
                textDecoration: "none",
              }}
            >
              <span>
                <span style={{ display: "block", fontSize: 18, fontWeight: 600 }}>{c.name}</span>
                <span style={{ display: "block", fontSize: 14, color: "var(--text-mid)", marginTop: 2 }}>{c.note}</span>
              </span>
              <span style={{ fontSize: 14, color: "var(--accent)", whiteSpace: "nowrap" }}>{c.handle} →</span>
            </a>
          ))}
        </nav>

        <p style={{ marginTop: 32, fontSize: 14 }}>
          <a href="/" style={{ color: "var(--text-dim)" }}>rushindra.com</a>
        </p>
      </div>
    </main>
  );
}

import { ImageResponse } from "next/og";

// Shared 1200x630 card for /bots and /bots/<slug>. No emoji: next/og fetches
// emoji from a CDN at build time, and this site keeps the build offline-safe.
export const ogSize = { width: 1200, height: 630 };

export function botsOg({ kicker, title, line, color }: { kicker: string; title: string; line: string; color: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "72px 84px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: 1200, height: 630, background: `radial-gradient(900px 520px at 0% 0%, ${color}33, transparent 70%)` }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color }}>
          <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: color }} />
          {kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: title.length > 18 ? 88 : 112, color: "#ffffff", letterSpacing: -4, lineHeight: 1, fontWeight: 700 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#98958d", marginTop: 28, lineHeight: 1.35, maxWidth: 980 }}>
            {line.length > 110 ? `${line.slice(0, 110).replace(/\s+\S*$/, "")}...` : line}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8a857c" }}>
          <span>rushindra.com/bots</span>
          <span style={{ color: "#e2e0da" }}>by Rushi</span>
        </div>
      </div>
    ),
    ogSize,
  );
}

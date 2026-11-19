import type { Metadata } from "next";

// ── DATA ─────────────────────────────────────────────────────────────
// Handles: X is @irushi; every other platform uses the shared handle.
const H = "rushindrasinha";
type Channel = { name: string; note: string; cta: string; url: string; handle: string; glow: string; icon: string; live?: boolean };
const CHANNELS: Channel[] = [
  {
    name: "YouTube", note: "Streams, VODs and Shorts", cta: "Watch", url: `https://youtube.com/@${H}`, handle: `@${H}`, glow: "255,0,51",
    icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
    live: true,
  },
  {
    name: "Twitch", note: "Live now, with chat", cta: "Watch", url: `https://twitch.tv/${H}`, handle: `@${H}`, glow: "145,70,255",
    icon: "M11.6 11.1h1.8V5.8h-1.8v5.3zm4.9 0h1.8V5.8h-1.8v5.3zM6.3 0 1.7 4.6v14.8h5.5V24l4.6-4.6h3.7L22.3 12.9V0H6.3zm14.2 12-3.6 3.6h-5.5l-3.2 3.2v-3.2H5.5V1.8h15v10.2z",
    live: true,
  },
  {
    name: "Kick", note: "Live now, with chat", cta: "Watch", url: `https://kick.com/${H}`, handle: `@${H}`, glow: "83,252,24",
    icon: "M2 2h6v6h2.5V5.5H13V3h3v3.5h-2.5V9H11v2.5h2.5V14H16v2.5h3V19h-3v3h-3v-2.5h-2.5V17H8v5H2V2z",
    live: true,
  },
  {
    name: "X", note: "Clips, updates and takes", cta: "Follow", url: "https://x.com/irushi", handle: "@irushi", glow: "230,230,235",
    icon: "M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.3H4.3l13.3 17.3z",
  },
  {
    name: "Instagram", note: "Reels and stories", cta: "Follow", url: `https://instagram.com/${H}`, handle: `@${H}`, glow: "225,48,108",
    icon: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z",
  },
];
// ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Live — Dr. Rushindra Sinha",
  description: "Watch Rushindra Sinha live: YouTube, Twitch, Kick. Clips and updates on X and Instagram. All channels in one place.",
  alternates: { canonical: "/live" },
  openGraph: {
    title: "Live — Dr. Rushindra Sinha",
    description: "Watch live on YouTube, Twitch or Kick. Clips on X and Instagram.",
    url: "https://rushindra.com/live",
    type: "website",
  },
};

const CSS = `
.lv{position:relative;min-height:100dvh;overflow:hidden;background:var(--bg);color:var(--text);font-family:var(--font-body);display:flex;justify-content:center;padding:clamp(40px,9vw,96px) var(--px)}
.lv::before,.lv::after{content:"";position:absolute;border-radius:50%;filter:blur(90px);opacity:.28;pointer-events:none}
.lv::before{width:520px;height:520px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(145,70,255,.9),transparent 70%)}
.lv::after{width:560px;height:560px;bottom:-220px;right:-160px;background:radial-gradient(circle,rgba(83,252,24,.55),transparent 70%)}
.lv-wrap{position:relative;z-index:1;width:100%;max-width:760px}
.lv-badge{display:inline-flex;align-items:center;gap:10px;padding:7px 14px;border:1px solid var(--border);border-radius:999px;background:rgba(255,255,255,.03);font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.lv-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 0 rgba(83,252,24,.6);animation:lvp 2s infinite}
@keyframes lvp{70%{box-shadow:0 0 0 10px rgba(83,252,24,0)}100%{box-shadow:0 0 0 0 rgba(83,252,24,0)}}
.lv h1{font-family:var(--font-display);font-weight:500;font-size:clamp(44px,12vw,84px);line-height:1;letter-spacing:-.03em;color:var(--white);margin:22px 0 14px}
.lv h1 span{background:linear-gradient(90deg,#9146ff,#53fc18);-webkit-background-clip:text;background-clip:text;color:transparent}
.lv-sub{font-size:clamp(16px,4.2vw,19px);line-height:1.5;color:var(--text-mid);max-width:480px;margin:0 0 clamp(28px,6vw,44px)}
.lv-grid{display:grid;grid-template-columns:1fr;gap:14px}
@media(min-width:640px){.lv-grid{grid-template-columns:1fr 1fr}.lv-card:first-child{grid-column:1/-1}}
.lv-card{--g:255,255,255;position:relative;display:flex;flex-direction:column;gap:18px;min-height:150px;padding:22px;border-radius:20px;text-decoration:none;color:var(--white);background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(8px);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;-webkit-tap-highlight-color:transparent}
.lv-card::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(120% 90% at 0% 0%,rgba(var(--g),.22),transparent 60%);opacity:.7;transition:opacity .25s;pointer-events:none}
.lv-card:hover,.lv-card:focus-visible{transform:translateY(-3px);border-color:rgba(var(--g),.65);box-shadow:0 18px 50px -18px rgba(var(--g),.55)}
.lv-card:hover::before{opacity:1}
.lv-card:active{transform:scale(.985)}
.lv-card:focus-visible{outline:2px solid rgba(var(--g),.9);outline-offset:3px}
.lv-top{position:relative;display:flex;align-items:center;justify-content:space-between}
.lv-ico{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:rgba(var(--g),.16);border:1px solid rgba(var(--g),.35)}
.lv-ico svg{width:24px;height:24px;fill:rgb(var(--g))}
.lv-tag{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-mid);border:1px solid var(--border);border-radius:999px;padding:4px 10px}
.lv-body{position:relative;margin-top:auto}
.lv-name{display:block;font-family:var(--font-display);font-size:24px;font-weight:600;letter-spacing:-.01em}
.lv-note{display:block;font-size:15px;color:var(--text-mid);margin-top:3px}
.lv-row{position:relative;display:flex;align-items:center;justify-content:space-between;font-size:15px}
.lv-handle{color:var(--text-mid)}
.lv-cta{display:inline-flex;align-items:center;gap:6px;font-weight:600;color:rgb(var(--g))}
.lv-cta i{font-style:normal;transition:transform .25s}
.lv-card:hover .lv-cta i{transform:translateX(4px)}
.lv-foot{margin-top:36px;font-size:14px;color:var(--text-dim)}
.lv-foot a{color:var(--text-dim);text-decoration:none;border-bottom:1px solid var(--border)}
@media(prefers-reduced-motion:reduce){.lv-dot{animation:none}.lv-card,.lv-cta i{transition:none}}
`;

export default function LivePage() {
  return (
    <main className="lv">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="lv-wrap">
        <span className="lv-badge"><span className="lv-dot" aria-hidden="true" />Streams</span>
        <h1>Watch me <span>play.</span></h1>
        <p className="lv-sub">Streaming on every platform. Pick yours and join the stream.</p>

        <nav aria-label="Streaming and social channels" className="lv-grid">
          {CHANNELS.map((c) => (
            <a
              key={c.name}
              className="lv-card"
              style={{ ["--g" as string]: c.glow }}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.cta} on ${c.name} (${c.handle})`}
            >
              <span className="lv-top">
                <span className="lv-ico">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={c.icon} /></svg>
                </span>
                {c.live ? <span className="lv-tag">Streams</span> : null}
              </span>
              <span className="lv-body">
                <span className="lv-name">{c.name}</span>
                <span className="lv-note">{c.note}</span>
              </span>
              <span className="lv-row">
                <span className="lv-handle">{c.handle}</span>
                <span className="lv-cta">{c.cta} <i aria-hidden="true">→</i></span>
              </span>
            </a>
          ))}
        </nav>

        <p className="lv-foot"><a href="/">rushindra.com</a></p>
      </div>
    </main>
  );
}

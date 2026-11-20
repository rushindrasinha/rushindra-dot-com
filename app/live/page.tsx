import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import LiveStatus from "./LiveStatus";

// Instrument Serif Italic (OFL) — vendored woff2, extracted from @fontsource/instrument-serif
// with `npm pack` so it is not a runtime dependency. Scoped to this page only: it is the one
// second voice on the site, everything else stays Space Grotesk / Outfit / JetBrains Mono.
const serifItalic = localFont({
  src: "../fonts/instrument-serif-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-serif-italic",
  display: "swap",
});

// ── DATA ─────────────────────────────────────────────────────────────
// Handles: X is @irushi; every other platform uses the shared handle.
const H = "rushindrasinha";
type Channel = { no: string; name: string; note: string; cta: string; url: string; handle: string; brand: string; icon: string; canLive?: boolean };
const CHANNELS: Channel[] = [
  {
    no: "01", name: "YouTube", note: "Streams, VODs and Shorts", cta: "Watch", url: `https://youtube.com/@${H}`, handle: `@${H}`, brand: "255,0,51",
    icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
    canLive: true,
  },
  {
    no: "02", name: "Twitch", note: "Streams with live chat", cta: "Watch", url: `https://twitch.tv/${H}`, handle: `@${H}`, brand: "145,70,255",
    icon: "M11.6 11.1h1.8V5.8h-1.8v5.3zm4.9 0h1.8V5.8h-1.8v5.3zM6.3 0 1.7 4.6v14.8h5.5V24l4.6-4.6h3.7L22.3 12.9V0H6.3zm14.2 12-3.6 3.6h-5.5l-3.2 3.2v-3.2H5.5V1.8h15v10.2z",
    canLive: true,
  },
  {
    no: "03", name: "Kick", note: "Streams with live chat", cta: "Watch", url: `https://kick.com/${H}`, handle: `@${H}`, brand: "83,252,24",
    icon: "M2 2h6v6h2.5V5.5H13V3h3v3.5h-2.5V9H11v2.5h2.5V14H16v2.5h3V19h-3v3h-3v-2.5h-2.5V17H8v5H2V2z",
    canLive: true,
  },
  {
    no: "04", name: "X", note: "Clips, updates and takes", cta: "Follow", url: "https://x.com/irushi", handle: "@irushi", brand: "230,230,235",
    icon: "M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.3H4.3l13.3 17.3z",
  },
  {
    no: "05", name: "Instagram", note: "Reels and stories", cta: "Follow", url: `https://instagram.com/${H}`, handle: `@${H}`, brand: "225,48,108",
    icon: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z",
  },
];

const FORMATS = ["IRL", "Games", "Cooking", "Drives", "Coding", "Real talk", "Podcasts", "Behind the scenes"];
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
.lv{--lv-red:#ff3b30;position:relative;display:flex;flex-direction:column;min-height:100dvh;overflow-x:clip;background:var(--bg);color:var(--text);font-family:var(--font-body)}
[data-theme="light"] .lv{--bg:#f5f5f0;--surface:rgba(0,0,0,.035);--border:rgba(0,0,0,.12);--text:#1a1915;--text-mid:#545250;--accent:#4d9e1a;--lv-red:#c0271a}
.lv-in{width:100%;max-width:var(--max-w);margin:0 auto;padding:0 var(--px)}
.lv-mono{font-family:var(--font-mono);font-size:clamp(10.5px,2.7vw,12px);letter-spacing:.16em;text-transform:uppercase}

/* 1 — status bar */
.lv-bar{border-bottom:1px solid var(--border)}
.lv-bar .lv-in{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:50px;padding-top:9px;padding-bottom:9px}
.lv-status{display:flex;align-items:center;flex-wrap:wrap;gap:4px 8px;color:var(--text-mid)}
.lv-dot{width:7px;height:7px;border-radius:50%;background:var(--text-mid);flex:none}
.lv-label{color:var(--text)}
.lv-status.is-on .lv-dot{background:var(--lv-red);animation:lv-pulse 1.7s ease-in-out infinite}
.lv-status.is-on .lv-label{color:var(--lv-red);font-weight:600}
@keyframes lv-pulse{0%,100%{opacity:1}50%{opacity:.2}}
.lv-ch-count{display:none;color:var(--text-mid);white-space:nowrap}
@media(min-width:600px){.lv-ch-count{display:block}}

/* 2 — hero */
.lv-hero{position:relative;padding-top:clamp(44px,11vw,104px);padding-bottom:clamp(30px,6vw,56px)}
.lv-arc{position:absolute;left:50%;top:clamp(54px,13vw,132px);width:min(1500px,164%);aspect-ratio:3/1;transform:translateX(-50%);border-radius:50% 50% 0 0/100% 100% 0 0;border-top:1px solid var(--accent);opacity:.32;pointer-events:none;-webkit-mask-image:linear-gradient(90deg,transparent,#000 24%,#000 76%,transparent);mask-image:linear-gradient(90deg,transparent,#000 24%,#000 76%,transparent)}
.lv-word{position:relative;display:flex;flex-wrap:wrap;align-items:flex-end;gap:0 clamp(10px,2vw,26px);margin:0}
.lv-live{font-family:var(--font-display);font-weight:700;font-size:clamp(96px,32vw,260px);line-height:.8;letter-spacing:-.045em;text-transform:uppercase;color:var(--text)}
.lv-uns{font-family:var(--font-serif-italic),Georgia,serif;font-style:italic;font-weight:400;font-size:clamp(34px,9.5vw,92px);line-height:1;color:var(--text-mid);padding-bottom:clamp(4px,1.2vw,16px)}
.lv-uns i{font-style:inherit;color:var(--accent)}
.lv-deck{position:relative;max-width:46ch;margin-top:clamp(20px,4vw,30px);font-size:clamp(15px,3.8vw,17px);line-height:1.6;color:var(--text-mid)}

/* lower third */
.lv-host{position:relative;display:inline-flex;align-items:center;gap:12px;max-width:100%;margin-top:clamp(24px,5vw,38px);padding:8px 16px 8px 9px;border:1px solid var(--border);border-left:3px solid var(--accent);background:var(--surface)}
.lv-host img{width:clamp(48px,13vw,56px);height:clamp(48px,13vw,56px);object-fit:cover;border:1px solid var(--accent);filter:grayscale(1) contrast(1.06);flex:none}
.lv-host-n{display:block;font-family:var(--font-display);font-weight:500;font-size:clamp(14px,3.6vw,16px);line-height:1.2;color:var(--text)}
.lv-host-m{display:block;margin-top:6px;color:var(--text-mid)}

/* 3 — ticker */
.lv-tick{margin-top:clamp(28px,6vw,52px);padding:11px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden}
.lv-tick-in{display:flex;width:max-content;animation:lv-marq 36s linear infinite}
.lv-tick-g{display:flex;flex:none}
.lv-ti{display:inline-flex;align-items:center;font-family:var(--font-mono);font-size:clamp(10.5px,2.7vw,12px);letter-spacing:.2em;text-transform:uppercase;color:var(--text-mid);white-space:nowrap}
.lv-ti::after{content:"";width:5px;height:5px;margin:0 clamp(14px,3.4vw,26px);background:var(--accent);flex:none}
@keyframes lv-marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* 4 — channel index */
.lv-list{display:flex;flex-direction:column;margin-top:clamp(36px,7vw,68px);border-top:1px solid var(--border)}
.lv-grp{order:10;padding:clamp(22px,4.5vw,30px) var(--px) 11px}
.lv-grp-2{order:20}
.lv-grp>span{display:block;width:100%;max-width:var(--max-w);margin:0 auto;color:var(--text-mid)}
.lv-row{position:relative;isolation:isolate;display:block;padding:17px var(--px);border-bottom:1px solid var(--border);color:var(--text);text-decoration:none;-webkit-tap-highlight-color:transparent}
.lv-row[data-p="youtube"]{order:11}
.lv-row[data-p="twitch"]{order:12}
.lv-row[data-p="kick"]{order:13}
.lv-row[data-p="x"]{order:21}
.lv-row[data-p="instagram"]{order:22}
.lv-row::before{content:"";position:absolute;inset:0;z-index:-1;background:rgba(var(--b),.12);transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.22,1,.36,1)}
.lv-row::after{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:rgb(var(--b));transform:scaleX(0);transform-origin:left;transition:transform .3s ease}
.lv-row[data-p="kick"]::before{background:rgba(255,255,255,.06)}
[data-theme="light"] .lv-row[data-p="kick"]::before,[data-theme="light"] .lv-row[data-p="x"]::before{background:rgba(0,0,0,.06)}
[data-theme="light"] .lv-row[data-p="x"]{--b:38,38,42}
.lv-row:hover::before,.lv-row:focus-visible::before{transform:scaleX(1)}
.lv-row:hover::after,.lv-row:focus-visible::after{transform:scaleX(1)}
.lv-row:focus-visible{outline:2px solid var(--accent);outline-offset:-3px}
.lv-rin{display:grid;width:100%;max-width:var(--max-w);min-height:42px;margin:0 auto;align-items:center;column-gap:14px;row-gap:5px;grid-template-columns:auto minmax(0,1fr) 44px;grid-template-areas:"num name cap" "note note cap" "hand hand cap"}
.lv-num{grid-area:num;font-family:var(--font-mono);font-size:12px;letter-spacing:.1em;color:var(--text-mid);align-self:center}
.lv-name{grid-area:name;display:flex;align-items:center;flex-wrap:wrap;gap:6px 12px;min-width:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,7vw,34px);line-height:1.05;letter-spacing:-.02em;transition:transform .3s cubic-bezier(.22,1,.36,1)}
.lv-ico{width:20px;height:20px;fill:currentColor;flex:none;opacity:.92}
.lv-note{grid-area:note;font-size:15px;line-height:1.45;color:var(--text-mid)}
.lv-hand{grid-area:hand;font-family:var(--font-mono);font-size:11.5px;letter-spacing:.08em;color:var(--text-mid)}
.lv-cap{grid-area:cap;align-self:center;justify-self:end;display:grid;place-items:center;width:44px;height:44px;border:1px solid var(--border);border-radius:50%;font-size:15px;color:var(--text-mid);transition:background-color .3s ease,color .3s ease,border-color .3s ease}
.lv-row:hover .lv-name,.lv-row:focus-visible .lv-name{transform:translateX(8px)}
.lv-row:hover .lv-cap,.lv-row:focus-visible .lv-cap{background:rgb(var(--b));border-color:rgb(var(--b));color:#0a0a0c}
@media(min-width:900px){
.lv-rin{grid-template-columns:54px minmax(0,2.2fr) minmax(0,3fr) minmax(0,1.5fr) 44px;grid-template-areas:"num name note hand cap";column-gap:clamp(20px,2.6vw,36px);row-gap:0;min-height:54px}
.lv-row{padding:22px var(--px)}
.lv-name{font-size:clamp(30px,3.4vw,46px);flex-wrap:nowrap;white-space:nowrap}
.lv-ico{width:22px;height:22px}
.lv-hand{justify-self:end;white-space:nowrap}
}
/* live state */
.lv-onair{display:none}
.lv-note-on{display:none}
.lv-row.is-live::after{transform:scaleX(1);background:var(--lv-red)}
.lv-row.is-live{order:10}
.lv-row.is-live .lv-onair{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--lv-red)}
.lv-row.is-live .lv-note-off{display:none}
.lv-row.is-live .lv-note-on{display:inline}
.lv-row.is-live .lv-note{color:var(--lv-red)}

/* 5 — finale */
.lv-foot{margin-top:auto;padding-top:clamp(44px,9vw,84px);overflow:clip}
.lv-back{display:inline-block;padding:4px 0;color:var(--text-mid);text-decoration:none}
.lv-back:hover{color:var(--text)}
.lv-ghost{display:block;margin-top:clamp(14px,3vw,26px);text-decoration:none}
.lv-ghost span{display:block;margin-bottom:-.17em;font-family:var(--font-display);font-weight:700;font-size:min(13vw,185px);line-height:.78;letter-spacing:-.04em;text-align:center;white-space:nowrap;color:rgba(226,224,218,.08);color:color-mix(in srgb,var(--text) 8%,transparent)}
.lv-ghost:hover span{color:color-mix(in srgb,var(--text) 14%,transparent)}

@media(prefers-reduced-motion:reduce){
.lv-tick-in{animation:none}
.lv-status.is-on .lv-dot{animation:none}
.lv-row::before,.lv-row::after,.lv-name,.lv-cap{transition:none}
}
`;

export default function LivePage() {
  return (
    <main className={`lv ${serifItalic.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="lv-bar">
        <div className="lv-in">
          <LiveStatus />
          <span className="lv-ch-count lv-mono">CH 01—05</span>
        </div>
      </div>

      <header className="lv-hero lv-in">
        <span className="lv-arc" aria-hidden="true" />
        <h1 className="lv-word">
          <span className="lv-live">Live</span>{" "}
          <span className="lv-uns">Unscripted<i>.</i></span>
        </h1>
        <p className="lv-deck">IRL streams, games, cooking, drives, coding, real talk, podcasts, behind the scenes. Anything goes. Pick a platform and join in.</p>
        <div className="lv-host">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rushi-avatar.jpg" alt="" width={56} height={56} />
          <span>
            <span className="lv-host-n">Dr. Rushindra Sinha</span>
            <span className="lv-host-m lv-mono">Host · rushindra.com</span>
          </span>
        </div>
      </header>

      <div className="lv-tick" aria-hidden="true">
        <div className="lv-tick-in">
          {[0, 1].map((g) => (
            <span className="lv-tick-g" key={g}>
              {FORMATS.map((f) => <span className="lv-ti" key={f}>{f}</span>)}
            </span>
          ))}
        </div>
      </div>

      <nav aria-label="Streaming and social channels" className="lv-list">
        <div className="lv-grp"><span className="lv-mono">Watch live</span></div>
        <div className="lv-grp lv-grp-2"><span className="lv-mono">Follow</span></div>
        {CHANNELS.map((c) => (
          <a
            key={c.name}
            className="lv-row"
            data-p={c.name.toLowerCase()}
            style={{ ["--b" as string]: c.brand }}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${c.cta} on ${c.name} (${c.handle})`}
          >
            <span className="lv-rin">
              <span className="lv-num">{c.no}</span>
              <span className="lv-name">
                <svg className="lv-ico" viewBox="0 0 24 24" aria-hidden="true"><path d={c.icon} /></svg>
                {c.name}
                {c.canLive ? <span className="lv-onair">● On air</span> : null}
              </span>
              <span className="lv-note">
                <span className="lv-note-off">{c.note}</span>
                {c.canLive ? <span className="lv-note-on">Live right now — join</span> : null}
              </span>
              <span className="lv-hand">{c.handle}</span>
              <span className="lv-cap" aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </nav>

      <footer className="lv-foot">
        <div className="lv-in"><Link className="lv-back lv-mono" href="/">← rushindra.com</Link></div>
        <Link className="lv-ghost" href="/" aria-label="Back to rushindra.com"><span aria-hidden="true">RUSHINDRA.COM</span></Link>
      </footer>
    </main>
  );
}

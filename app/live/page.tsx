import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import LiveState, { type Platform } from "./LiveState";
import LiveStatus from "./LiveStatus";
import Monitor from "./Monitor";
import ThemeToggle from "./ThemeToggle";

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

const WATCH = CHANNELS.filter((c) => c.canLive);
const FOLLOW = CHANNELS.filter((c) => !c.canLive);

// The monitor links to whichever channel is actually live; CHANNELS stays the only
// place a URL is written down.
const LIVE_LINKS = Object.fromEntries(WATCH.map((c) => [c.name.toLowerCase(), c.url])) as Record<Platform, string>;

// Reads the theme the home page stores, before first paint, so /live is not stuck in dark.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})()`;
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
/* ── tokens ───────────────────────────────────────────────────────── */
.lv{
--lv-red:#ff3b30;--accent-txt:var(--accent);
--dot:rgba(156,255,87,.15);--guide:rgba(156,255,87,.12);--vig:rgba(2,2,5,.62);
--mon-b1:#2c2e33;--mon-b2:#0f1012;--mon-edge:rgba(255,255,255,.11);
--duo:#9cff57;--duo-ink:#070a07;
--l3-bg:rgba(11,11,13,.9);--l3-x:clamp(6px,2vw,16px);
--ghost-o:.42;
/* SMPTE-ish bars, pulled a little off full saturation so they sit in the brand */
--cb1:#dcdad2;--cb2:#d9ca4e;--cb3:#4fc3cb;--cb4:#51b558;--cb5:#c34ca1;--cb6:#d1423a;--cb7:#4154b9;
--cbl1:#3b3bb5;--cbl2:#111214;--cbl3:#a440af;--cbl4:#111214;--cbl5:#30b7c3;--cbl6:#111214;--cbl7:#87867f;
--cbg1:var(--cb1);
--cb-grad:linear-gradient(90deg,var(--cb1) 0 14.2857%,var(--cb2) 0 28.5714%,var(--cb3) 0 42.8571%,var(--cb4) 0 57.1428%,var(--cb5) 0 71.4285%,var(--cb6) 0 85.7142%,var(--cb7) 0 100%);
/* the ghost word needs a grey in slot 1: a near-white bar disappears on paper */
--cb-ghost:linear-gradient(90deg,var(--cbg1) 0 14.2857%,var(--cb2) 0 28.5714%,var(--cb3) 0 42.8571%,var(--cb4) 0 57.1428%,var(--cb5) 0 71.4285%,var(--cb6) 0 85.7142%,var(--cb7) 0 100%);
position:relative;display:flex;flex-direction:column;min-height:100dvh;overflow-x:clip;background:var(--bg);color:var(--text);font-family:var(--font-body)}

[data-theme="light"] .lv{
--bg:#f4f1ea;--surface:rgba(0,0,0,.04);--border:rgba(0,0,0,.13);--text:#1a1915;--text-mid:#545250;
--accent:#3f8f12;--accent-txt:#2f6e0c;--lv-red:#c0271a;
--dot:rgba(63,143,18,.24);--guide:rgba(63,143,18,.2);--vig:rgba(96,88,66,.14);
--mon-b1:#d8d4c9;--mon-b2:#a4a097;--mon-edge:rgba(255,255,255,.62);
--duo-ink:#15140f;
--l3-bg:rgba(250,248,243,.94);
--ghost-o:.58;
--cb1:#dfdcd2;--cbg1:#8e8b81}

.lv-in{width:100%;max-width:var(--max-w);margin:0 auto;padding:0 var(--px)}
.lv-mono{font-family:var(--font-mono);font-size:clamp(10.5px,2.7vw,12px);letter-spacing:.16em;text-transform:uppercase}

/* ── 1 · colour-bar edge + status bar ─────────────────────────────── */
.lv-cbtop{flex:none;height:3px;background:var(--cb-grad)}
.lv-bar{position:relative;border-bottom:1px solid var(--border);background:color-mix(in srgb,var(--text) 3%,transparent)}
.lv[data-live="on"] .lv-bar{box-shadow:inset 0 -2px 0 var(--lv-red)}
.lv-bar .lv-in{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:52px;padding-top:4px;padding-bottom:4px}
.lv-status{display:flex;align-items:center;flex-wrap:wrap;gap:4px 8px;min-width:0;color:var(--text-mid)}
.lv-dot{width:7px;height:7px;border-radius:50%;background:var(--text-mid);flex:none}
.lv-label{color:var(--text)}
.lv-status.is-on .lv-dot{background:var(--lv-red);animation:lv-pulse 1.7s ease-in-out infinite}
.lv-status.is-on .lv-label{color:var(--lv-red);font-weight:600}
@keyframes lv-pulse{0%,100%{opacity:1}50%{opacity:.22}}
.lv-bar-r{display:flex;align-items:center;gap:clamp(6px,2vw,18px);flex:none}
.lv-count{display:none}
@media(min-width:620px){.lv-count{display:block;color:var(--text-mid);white-space:nowrap}}
.lv-theme{display:grid;place-items:center;width:44px;height:44px;margin-right:-11px;padding:0;border:0;border-radius:50%;background:none;color:var(--text-mid);cursor:pointer}
.lv-theme:hover{color:var(--text);background:var(--surface)}
.lv-theme:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.lv-theme svg{width:19px;height:19px;flex:none}
.lv-i-sun circle{fill:currentColor}
.lv-i-sun g{fill:none;stroke:currentColor}
.lv-i-moon{fill:currentColor}
.lv-i-moon{display:none}
[data-theme="light"] .lv-i-moon{display:block}
[data-theme="light"] .lv-i-sun{display:none}

/* ── 2 · hero ─────────────────────────────────────────────────────── */
.lv-hero{position:relative;padding-top:clamp(32px,7.5vw,72px);padding-bottom:clamp(40px,7vw,70px)}
.lv-dots{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle,var(--dot) 1px,transparent 1px);background-size:clamp(17px,2.3vw,25px) clamp(17px,2.3vw,25px);-webkit-mask-image:radial-gradient(ellipse 80% 88% at 58% 44%,#000 8%,transparent 72%);mask-image:radial-gradient(ellipse 80% 88% at 58% 44%,#000 8%,transparent 72%)}
.lv-safe{position:absolute;inset:clamp(10px,2.4vw,24px) clamp(12px,3vw,34px);pointer-events:none;border:1px solid var(--guide)}
.lv-safe::before{content:"";position:absolute;inset:clamp(13px,2.8vw,32px);border:1px dashed var(--guide)}
.lv-safe::after{content:"";position:absolute;left:50%;top:0;width:1px;height:clamp(9px,1.8vw,16px);background:var(--guide)}
.lv-vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 94% 78% at 52% 36%,transparent 36%,var(--vig) 100%)}
.lv-hero-g{position:relative;z-index:1;display:grid;gap:clamp(34px,6vw,46px)}
@media(min-width:900px){.lv-hero-g{grid-template-columns:minmax(0,1fr) minmax(0,46%);align-items:center;gap:clamp(24px,4vw,54px)}}
.lv-type{min-width:0}
.lv-kick{display:inline-flex;align-items:center;gap:9px;margin-bottom:clamp(16px,3vw,24px);padding:5px 12px;border:1px solid var(--border);border-radius:999px;background:var(--surface);color:var(--text-mid)}
.lv-kick::before{content:"";width:6px;height:6px;background:var(--accent);flex:none}
.lv-word{display:flex;flex-direction:column;align-items:flex-start;margin:0}
.lv-live{font-family:var(--font-display);font-weight:700;font-size:clamp(88px,30vw,180px);line-height:.78;letter-spacing:-.05em;text-transform:uppercase;color:var(--text)}
.lv-uns{margin-top:clamp(6px,1.4vw,14px);font-family:var(--font-serif-italic),Georgia,serif;font-style:italic;font-weight:400;font-size:clamp(32px,8.6vw,74px);line-height:1;color:var(--text-mid)}
.lv-uns i{font-style:inherit;color:var(--accent-txt)}
.lv-deck{max-width:44ch;margin-top:clamp(18px,3.4vw,26px);font-size:clamp(15px,3.8vw,17px);line-height:1.62;color:var(--text-mid)}

/* ── 3 · the monitor ──────────────────────────────────────────────── */
.lv-mon-wrap{position:relative;width:100%;max-width:448px;margin:0 auto;padding-bottom:30px}
.lv-mon{position:relative;padding-top:13px;transform-style:preserve-3d}
@media(min-width:900px){
.lv-mon-wrap{margin:0 0 0 auto;perspective:1400px}
.lv-mon{transform:rotateY(-6deg) rotateX(1.2deg)}
}
.lv-tally{position:absolute;top:0;left:50%;width:38px;height:14px;margin-left:-19px;border-radius:5px 5px 0 0;background:linear-gradient(180deg,var(--mon-b1),var(--mon-b2));box-shadow:inset 0 1px 0 var(--mon-edge)}
.lv-tally::after{content:"";position:absolute;left:50%;top:4px;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:#50535a}
.lv-mon[data-on="on"] .lv-tally::after{background:#ff2a1f;box-shadow:0 0 11px 3px rgba(255,42,31,.6);animation:lv-pulse 1.6s ease-in-out infinite}

.lv-mon-plate{display:block;position:relative;padding:clamp(11px,2.4vw,16px);border-radius:clamp(14px,2.6vw,20px);background:linear-gradient(168deg,var(--mon-b1) 0%,var(--mon-b2) 74%);box-shadow:inset 0 1px 0 var(--mon-edge),inset 0 -2px 3px rgba(0,0,0,.45),0 26px 54px -24px rgba(0,0,0,.85),0 3px 10px -4px rgba(0,0,0,.55);color:inherit;text-decoration:none}
a.lv-mon-plate:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
.lv-screen{position:relative;display:block;aspect-ratio:4/3;overflow:hidden;border-radius:clamp(5px,1vw,9px);background:#07080a;box-shadow:inset 0 0 0 1px rgba(0,0,0,.75),inset 0 0 36px rgba(0,0,0,.5)}

.lv-bars{position:absolute;inset:0;background:var(--cb-grad)}
.lv-bars::after{content:"";position:absolute;left:0;right:0;bottom:0;height:25%;background:linear-gradient(90deg,var(--cbl1) 0 14.2857%,var(--cbl2) 0 28.5714%,var(--cbl3) 0 42.8571%,var(--cbl4) 0 57.1428%,var(--cbl5) 0 71.4285%,var(--cbl6) 0 85.7142%,var(--cbl7) 0 100%)}
.lv-bars::before{content:"";position:absolute;left:0;right:0;bottom:0;height:8%;z-index:1;background:linear-gradient(90deg,#0c0d10 0 24%,#1a1b20 0 36%,#0c0d10 0 48%,#242529 0 60%,#0c0d10 0 100%)}

.lv-feed{position:absolute;inset:0;isolation:isolate;background:var(--duo)}
.lv-feed img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 20%;mix-blend-mode:multiply;filter:grayscale(1) contrast(1.12) brightness(1.16)}
.lv-feed::after{content:"";position:absolute;inset:0;background:radial-gradient(118% 94% at 50% 6%,transparent 34%,var(--duo-ink) 118%);mix-blend-mode:multiply}

.lv-vf{position:absolute;inset:clamp(7px,1.6vw,12px);pointer-events:none}
.lv-vf::before,.lv-vf::after{content:"";position:absolute;width:clamp(15px,3.4vw,24px);height:clamp(15px,3.4vw,24px);border:2px solid rgba(244,243,236,.8)}
.lv-vf-a::before{top:0;left:0;border-right:0;border-bottom:0}
.lv-vf-a::after{right:0;bottom:0;border-left:0;border-top:0}
.lv-vf-b::before{top:0;right:0;border-left:0;border-bottom:0}
.lv-vf-b::after{bottom:0;left:0;border-right:0;border-top:0}

.lv-scan{position:absolute;inset:0;pointer-events:none;opacity:.6;background:repeating-linear-gradient(0deg,rgba(0,0,0,.42) 0 1px,rgba(0,0,0,0) 1px 3px);animation:lv-scan 1.3s steps(3) infinite}
@keyframes lv-scan{to{transform:translateY(3px)}}
.lv-roll{position:absolute;left:0;right:0;top:-42%;height:42%;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(255,255,255,.085),transparent);animation:lv-roll 6.5s linear infinite}
@keyframes lv-roll{to{transform:translateY(340%)}}
.lv-gloss{position:absolute;inset:0;pointer-events:none;background:linear-gradient(116deg,rgba(255,255,255,.16) 0 15%,rgba(255,255,255,.05) 15% 28%,rgba(255,255,255,0) 40%)}

.lv-osd{position:absolute;z-index:3;display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:4px;background:rgba(6,7,9,.9);font-family:var(--font-mono);font-size:clamp(9px,1.9vw,10.5px);font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#f1f0ea;white-space:nowrap}
.lv-rec{top:clamp(8px,1.8vw,13px);left:clamp(8px,1.8vw,13px);color:#ff5146}
.lv-rec-d{width:7px;height:7px;border-radius:50%;background:#ff5146;flex:none;animation:lv-pulse 1.4s ease-in-out infinite}
.lv-tc{top:clamp(8px,1.8vw,13px);right:clamp(8px,1.8vw,13px);letter-spacing:.07em;font-variant-numeric:tabular-nums}
.lv-ch00{top:clamp(8px,1.8vw,13px);left:clamp(8px,1.8vw,13px)}
.lv-plate{position:absolute;z-index:3;left:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:8px;padding:9px clamp(12px,2.6vw,18px);border:1px solid rgba(241,240,234,.22);border-radius:5px;background:rgba(6,7,9,.9);font-family:var(--font-mono);font-size:clamp(10px,2.3vw,13px);font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:#f1f0ea;white-space:nowrap}
.lv-plate i{font-style:normal;color:#9cff57}
.lv-now{position:absolute;z-index:3;left:0;bottom:clamp(28px,6.4vw,44px);display:inline-flex;align-items:center;padding:7px clamp(10px,2.2vw,15px);border-left:4px solid #0a0a0c;background:#9cff57;font-family:var(--font-mono);font-size:clamp(9.5px,2vw,11.5px);font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#07140a;white-space:nowrap}
.lv-mon[data-on="off"] .lv-feed,.lv-mon[data-on="off"] .lv-vf,.lv-mon[data-on="off"] .lv-rec,.lv-mon[data-on="off"] .lv-tc,.lv-mon[data-on="off"] .lv-now{display:none}
.lv-mon[data-on="on"] .lv-bars,.lv-mon[data-on="on"] .lv-plate,.lv-mon[data-on="on"] .lv-ch00{display:none}

/* lower third, straddling the monitor's bottom-left corner */
.lv-l3{position:absolute;z-index:5;left:var(--l3-x);bottom:0;display:flex;align-items:center;gap:11px;max-width:calc(100% - var(--l3-x)*2);padding:7px 15px 7px 11px;border:1px solid var(--border);background:var(--l3-bg);box-shadow:0 14px 30px -16px rgba(0,0,0,.75)}
.lv-l3-bar{position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--accent)}
.lv-l3 img{width:clamp(40px,10vw,48px);height:clamp(40px,10vw,48px);object-fit:cover;border:1px solid var(--accent);filter:grayscale(1) contrast(1.06);flex:none}
.lv-l3-n{display:block;font-family:var(--font-display);font-weight:500;font-size:clamp(13.5px,3.4vw,15px);line-height:1.2;color:var(--text)}
.lv-l3-m{display:block;margin-top:5px;font-size:clamp(9px,2.4vw,11px);letter-spacing:.13em;color:var(--text-mid)}

/* ── 4 · format tape ──────────────────────────────────────────────── */
.lv-tape{position:relative;z-index:3;width:104%;margin:clamp(-16px,-2vw,-8px) 0 clamp(10px,2.4vw,20px) -2%;padding:clamp(9px,1.8vw,13px) 0;overflow:hidden;background:var(--accent);color:#07090a;transform:rotate(-1.5deg);box-shadow:0 12px 34px -20px rgba(0,0,0,.9)}
[data-theme="light"] .lv-tape{background:#1a1915;color:#9cff57}
.lv-tape-in{display:flex;width:max-content;animation:lv-marq 36s linear infinite}
.lv-tape-g{display:flex;flex:none}
.lv-ti{display:inline-flex;align-items:center;font-family:var(--font-mono);font-size:clamp(10.5px,2.7vw,12.5px);font-weight:700;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap}
.lv-ti::after{content:"";width:5px;height:5px;margin:0 clamp(14px,3.4vw,26px);background:currentColor;opacity:.55;flex:none}
@keyframes lv-marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ── 5 · channel guide ────────────────────────────────────────────── */
.lv-grp{margin-top:clamp(26px,5vw,44px)}
.lv-grp-h{display:flex;align-items:center;gap:14px;margin:0 0 clamp(12px,2.4vw,18px);font-weight:400;color:var(--text-mid)}
.lv-grp-h::after{content:"";flex:1;height:1px;background:var(--border)}
.lv-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(9px,1.6vw,14px)}

.lv-ch{position:relative;isolation:isolate;overflow:hidden;display:grid;grid-template-rows:auto 1fr;gap:10px;min-height:112px;padding:clamp(13px,2.6vw,18px);border-radius:14px;background:var(--fill);color:var(--fg);text-decoration:none;-webkit-tap-highlight-color:transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 10px 24px -18px rgba(0,0,0,.85);transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease}
.lv-ch[data-p="youtube"]{min-height:152px;--fill:#e00030;--fg:#fff;--fg2:#fff;--gl:#0a0a0c;--gl-o:.18}
.lv-ch[data-p="twitch"]{--fill:#9146ff;--fg:#fff;--fg2:#fff;--gl:#0a0a0c;--gl-o:.18}
.lv-ch[data-p="kick"]{--fill:#53fc18;--fg:#07140a;--fg2:rgba(7,20,10,.82);--gl:#fff;--gl-o:.22}
.lv-ch[data-p="x"]{--fill:#0f0f10;--fg:#fff;--fg2:rgba(255,255,255,.78);--gl:#fff;--gl-o:.15;box-shadow:inset 0 0 0 1px rgba(255,255,255,.16),0 10px 24px -18px rgba(0,0,0,.85)}
[data-theme="light"] .lv-ch[data-p="x"]{--fill:#1a1915;box-shadow:inset 0 0 0 1px rgba(0,0,0,.4),0 10px 24px -18px rgba(0,0,0,.6)}
.lv-ch[data-p="instagram"]{--fill:#962fbf;--fg:#fff;--fg2:#fff;--gl:#0b0818;--gl-o:.2;background-image:linear-gradient(rgba(10,8,22,.12),rgba(10,8,22,.12)),linear-gradient(225deg,#feda75 0%,#fa7e1e 26%,#d62976 52%,#962fbf 76%,#4f5bd5 100%)}
.lv-ch[data-p="instagram"]::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(0deg,rgba(10,8,22,.6),transparent 62%)}

.lv-ch-glyph{position:absolute;right:-30px;bottom:-52px;z-index:0;width:clamp(170px,23vw,232px);height:auto;fill:var(--gl);opacity:var(--gl-o);pointer-events:none;transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .35s ease}
.lv-ch-top,.lv-ch-body{position:relative;z-index:1}
.lv-ch-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.lv-ch-no{font-family:var(--font-mono);font-size:clamp(10px,2.4vw,11.5px);font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:var(--fg2)}
.lv-ch-body{align-self:end;padding-right:54px}
.lv-ch-name{display:block;font-family:var(--font-display);font-weight:600;font-size:clamp(27px,6.4vw,38px);line-height:1.02;letter-spacing:-.025em}
.lv-ch-note{display:block;margin-top:7px;font-size:clamp(14px,3.5vw,15.5px);line-height:1.4;color:var(--fg2)}
.lv-ch-hand{display:block;margin-top:5px;font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;color:var(--fg2)}
.lv-ch-go{position:absolute;z-index:1;right:clamp(13px,2.6vw,18px);bottom:clamp(13px,2.6vw,18px);display:grid;place-items:center;width:42px;height:42px;border:1.5px solid var(--fg);border-radius:50%;font-size:16px;color:var(--fg);transition:background-color .3s ease,color .3s ease}
.lv-ch:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
@media(hover:hover){
.lv-ch:hover{transform:translateY(-4px);box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 26px 46px -24px rgba(0,0,0,.9)}
.lv-ch:hover .lv-ch-glyph{transform:rotate(-7deg) scale(1.08);opacity:calc(var(--gl-o) + .05)}
.lv-ch:hover .lv-ch-go{background:var(--fg);color:var(--fill)}
}
.lv-ch:focus-visible .lv-ch-go{background:var(--fg);color:var(--fill)}

/* live state */
.lv-ch-badge,.lv-ch-on{display:none}
.lv-ch.is-live{order:-1;box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 0 0 2px #ff5146,0 18px 36px -22px rgba(0,0,0,.9)}
.lv-ch.is-live .lv-ch-off{display:none}
.lv-ch.is-live .lv-ch-on{display:inline}
.lv-ch.is-live .lv-ch-badge{display:inline-flex;align-items:center;gap:6px;flex:none;padding:4px 10px;border:1px solid rgba(255,255,255,.26);border-radius:999px;background:#0a0a0c;font-family:var(--font-mono);font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#ff5146;white-space:nowrap}
.lv-ch-badge i{width:6px;height:6px;border-radius:50%;background:#ff5146;flex:none;animation:lv-pulse 1.5s ease-in-out infinite}

@media(min-width:620px) and (max-width:899px){
.lv-ch{min-height:142px}
.lv-ch[data-p="youtube"]{min-height:200px}
}
@media(min-width:900px){
.lv-ch,.lv-ch[data-p="youtube"]{min-height:0}
.lv-grid{grid-template-columns:repeat(6,minmax(0,1fr));grid-auto-rows:clamp(146px,14.6vw,176px)}
.lv-grid-w .lv-ch[data-p="youtube"]{grid-column:span 3;grid-row:span 2}
.lv-grid-w .lv-ch[data-p="youtube"] .lv-ch-glyph{right:-44px;bottom:-70px;width:clamp(230px,21vw,312px)}
.lv-grid-w .lv-ch[data-p="twitch"],.lv-grid-w .lv-ch[data-p="kick"]{grid-column:span 3}
.lv-grid-f{grid-auto-rows:clamp(138px,13.4vw,164px)}
.lv-grid-f .lv-ch[data-p="x"]{grid-column:span 2}
.lv-grid-f .lv-ch[data-p="instagram"]{grid-column:span 4}
/* Twitch + Kick live but not YouTube is the one reorder that would leave a hole in the
   6-column flow, so YouTube drops its row span and runs full width underneath. */
.lv[data-live-platforms="twitch kick"] .lv-grid-w .lv-ch[data-p="youtube"]{grid-column:span 6;grid-row:auto}
.lv-ch-name{font-size:clamp(30px,3.2vw,44px)}
}

/* ── 6 · finale ───────────────────────────────────────────────────── */
.lv-foot{margin-top:auto;padding-top:clamp(46px,9vw,86px);overflow:clip}
.lv-back{display:inline-block;padding:4px 0;color:var(--text-mid);text-decoration:none}
.lv-back:hover{color:var(--text)}
.lv-ghost{display:block;margin-top:clamp(14px,3vw,26px);text-decoration:none}
.lv-ghost span{display:block;margin-bottom:-.17em;font-family:var(--font-display);font-weight:700;font-size:min(13vw,185px);line-height:.78;letter-spacing:-.04em;text-align:center;white-space:nowrap;color:var(--text);opacity:.1;background-image:var(--cb-ghost)}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
.lv-ghost span{-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;opacity:var(--ghost-o)}
}
.lv-ghost:hover span{opacity:calc(var(--ghost-o) + .18)}

@media(prefers-reduced-motion:reduce){
.lv-tape-in{animation:none}
.lv-status.is-on .lv-dot,.lv-tally::after,.lv-rec-d,.lv-ch-badge i{animation:none}
.lv-scan{animation:none}
.lv-roll{display:none}
.lv-mon{transform:none}
.lv-ch,.lv-ch-glyph,.lv-ch-go{transition:none}
.lv-ch:hover{transform:none}
.lv-ch:hover .lv-ch-glyph{transform:none}
}
`;

function ChannelBlock({ c }: { c: Channel }) {
  return (
    <a
      className="lv-ch"
      data-p={c.name.toLowerCase()}
      style={{ ["--b" as string]: c.brand }}
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${c.cta} on ${c.name} (${c.handle})`}
    >
      <svg className="lv-ch-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d={c.icon} /></svg>
      <span className="lv-ch-top">
        <span className="lv-ch-no">CH {c.no}</span>
        {c.canLive ? <span className="lv-ch-badge"><i aria-hidden="true" />On air</span> : null}
      </span>
      <span className="lv-ch-body">
        <span className="lv-ch-name">{c.name}</span>
        <span className="lv-ch-note">
          <span className="lv-ch-off">{c.note}</span>
          {c.canLive ? <span className="lv-ch-on">Live right now — join</span> : null}
        </span>
        <span className="lv-ch-hand">{c.handle}</span>
      </span>
      <span className="lv-ch-go" aria-hidden="true">↗</span>
    </a>
  );
}

export default function LivePage() {
  return (
    <main className={`lv ${serifItalic.variable}`} data-live="off">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />

      <LiveState>
        <div className="lv-cbtop" aria-hidden="true" />

        <div className="lv-bar">
          <div className="lv-in">
            <LiveStatus />
            <span className="lv-bar-r">
              <span className="lv-count lv-mono">CH 01—05</span>
              <ThemeToggle />
            </span>
          </div>
        </div>

        <header className="lv-hero">
          <span className="lv-dots" aria-hidden="true" />
          <span className="lv-safe" aria-hidden="true" />
          <span className="lv-vig" aria-hidden="true" />
          <div className="lv-in lv-hero-g">
            <div className="lv-type">
              <span className="lv-kick lv-mono">Channel guide · 05 channels</span>
              <h1 className="lv-word">
                <span className="lv-live">Live</span>{" "}
                <span className="lv-uns">Unscripted<i>.</i></span>
              </h1>
              <p className="lv-deck">IRL streams, games, cooking, drives, coding, real talk, podcasts, behind the scenes. Anything goes. Pick a platform and join in.</p>
            </div>
            <Monitor links={LIVE_LINKS} />
          </div>
        </header>

        <div className="lv-tape" aria-hidden="true">
          <div className="lv-tape-in">
            {[0, 1].map((g) => (
              <span className="lv-tape-g" key={g}>
                {FORMATS.map((f) => <span className="lv-ti" key={f}>{f}</span>)}
              </span>
            ))}
          </div>
        </div>

        <nav aria-label="Streaming and social channels" className="lv-in">
          <section className="lv-grp">
            <h2 className="lv-grp-h lv-mono"><span>Watch live</span></h2>
            <div className="lv-grid lv-grid-w">
              {WATCH.map((c) => <ChannelBlock c={c} key={c.name} />)}
            </div>
          </section>
          <section className="lv-grp">
            <h2 className="lv-grp-h lv-mono"><span>Follow</span></h2>
            <div className="lv-grid lv-grid-f">
              {FOLLOW.map((c) => <ChannelBlock c={c} key={c.name} />)}
            </div>
          </section>
        </nav>

        <footer className="lv-foot">
          <div className="lv-in"><Link className="lv-back lv-mono" href="/">← rushindra.com</Link></div>
          <Link className="lv-ghost" href="/" aria-label="Back to rushindra.com"><span aria-hidden="true">RUSHINDRA.COM</span></Link>
        </footer>
      </LiveState>
    </main>
  );
}

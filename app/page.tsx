"use client";

import { useState, useEffect, useRef, Fragment, createContext, useContext } from "react";
import { siX, siInstagram, siYoutube, siGithub, siTwitch } from "simple-icons";
import Link from "next/link";
import CursorFX from "./components/CursorFX";
import { BOTS } from "./lib/bots";

// ============================================================================
// DESIGN TOKENS
// ============================================================================
const DARK_C = {
  bg: "#08080a",
  surface: "rgba(255,255,255,0.025)",
  surfaceStrong: "rgba(255,255,255,0.045)",
  border: "rgba(255,255,255,0.07)",
  borderAccent: "rgba(156,255,87,0.22)",
  accent: "#9cff57",
  accentDim: "rgba(156,255,87,0.1)",
  blue: "#5ebaff",
  text: "#e2e0da",
  textMid: "#98958d",
  textDim: "#8a857c",
  white: "#ffffff",
};

const LIGHT_C = {
  bg: "#f5f5f0",
  surface: "rgba(0,0,0,0.035)",
  surfaceStrong: "rgba(0,0,0,0.06)",
  border: "rgba(0,0,0,0.09)",
  borderAccent: "rgba(80,160,30,0.28)",
  accent: "#4d9e1a",
  accentDim: "rgba(80,160,30,0.1)",
  blue: "#1a6fa8",
  text: "#1a1915",
  textMid: "#545250",
  textDim: "#66645e",
  white: "#0a0908",
};

const ThemeCtx = createContext(DARK_C);

const F = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
};

// ============================================================================
// DATA
// ============================================================================
// Ticker = identity words (Rushi, 2026-09-29 17:10). Proof points live in the stats row
// and the rest of the page. Because the ticker says who he is, the label above the name
// and the lead sentence must NOT repeat these words (that caused the "double Doctor").
const ROLES = ["Doctor.", "Entrepreneur.", "Gamer.", "Builder.", "Creator."];

// Proof deck (v1.7, from the Oct 2026 personal-site study): every ticker word gets a card
// with hard facts, so the rotating word never reads as a vague self-description.
const IDENTITIES = [
  { word: "Doctor", code: "MED", proof: ["MBBS, D.Y. Patil, 2014", "Live-streamed surgeries on Google Glass", "Stanford GSB × Medicine, 2017"] },
  { word: "Entrepreneur", code: "FND", proof: ["Global Esports: India's first VC-backed esports org", "1 of 10 VCT Pacific partners, picked by Riot", "Founder of Jeufy, prompt to playable"] },
  { word: "Gamer", code: "GMR", proof: ["Ran Phoenix RO, 2008", "Sold my first game at 18", "VCT Pacific Stage 2 champions, 2026"] },
  { word: "Builder", code: "BLD", proof: ["Ares: the AI OS that runs my companies", "2,300+ stars on one open-source repo", "A browser FPS from a single prompt"] },
  { word: "Creator", code: "CRT", proof: ["250K+ followers, 100M+ views", "Tribeca Film Festival, first place, 2014", "Two TEDx stages"] },
];

const NAV_LINKS: [string, string][] = [
  ["About", "about"],
  ["Work", "work"],
  ["Talks", "talks"],
  ["Now", "now"],
  ["Contact", "contact"],
];

const TIMELINE = [
  { yr: "'93", t: "First games on a hospital computer, borrowed time between a parent's rounds. Early exposure to systems, play, and digital worlds." },
  { yr: "'08", t: "Built Phoenix RO, a Ragnarok Online private server with thousands of active players. Developed and sold my first online game commercially at 18. First real lessons in products, monetization, and running live internet infrastructure." },
  { yr: "'14", t: "MBBS from D.Y. Patil Medical College, Navi Mumbai. Pioneered Google Glass for live-streaming surgeries in India. With Mohit Israney: first place at the Tribeca Film Festival, second place at the Beijing film festival. Realized the deeper instinct was building, not practice." },
  { yr: "'16", t: "San Francisco. 480-hour full-stack bootcamp at General Assembly. The coding foundations locked in." },
  { yr: "'17", t: "Completed Stanford GSB's The Innovative Health Care Leader, a design thinking and leadership programme. Came home and started Global Esports in Mumbai with Mohit Israney — a proprietorship under my name at first. Incorporated the company and transferred the business over by November '18. India's first VC-backed esports organization." },
  { yr: "'20", t: "First TEDx stage: TEDx NMIMS, \"Can You Get Paid To Play Video Games?\", with Mohit Israney." },
  { yr: "'22", t: "Riot Games selected Global Esports as one of 10 permanent VCT Pacific franchise partners globally. Won Valorant Conqueror Championship. Competed on the world stage in Seoul." },
  { yr: "'24", t: "GE achieves profitability. 18+ Indian esports competitors shut down. GE was the only one standing." },
  { yr: "'26", t: "Global Esports' best season: Masters London, VCT Pacific Stage 2 champions, and the org's first-ever VALORANT Champions qualification (Shanghai). January: started building Ares, an AI operating system, on OpenClaw — voice-first, model-agnostic, running the companies from a Discord command centre. Creator-founder era. Building systems that compound, and the machine that builds them. Second TEDx stage: TEDx Sanjivani University. October: launched Jeufy, a prompt-to-playable games studio." },
];

const WORK = [
  {
    name: "Global Esports",
    tag: "Company",
    status: "Live",
    line: "India's first VC-backed esports org. 2026 VCT Pacific Stage 2 champions and first-ever VALORANT Champions qualification (Shanghai). One of 10 permanent VCT Pacific franchise teams selected by Riot Games globally. India's only profitable esports org while 18+ competitors shut down.",
    url: "https://globalesports.com",
    wide: true,
  },
  {
    name: "Jeufy",
    tag: "Studio",
    status: "Live",
    line: "Prompt to playable. A games studio that builds with AI agents, and Jeufy Create lets anyone do the same from one sentence. First game: Dhamaka Arena, an India-flavoured arena shooter that went from brief to live multiplayer in under 40 minutes.",
    url: "https://jeufy.com",
  },
  {
    name: "Ares",
    tag: "AI System",
    status: "Live",
    line: "My own AI operating system, built on OpenClaw. Multi-agent, voice-first, model-agnostic. Runs my companies from a Discord command centre, in public.",
    url: "https://github.com/rushindrasinha/openclaw-guide",
  },
  {
    name: "Verticals.gg",
    tag: "Platform",
    status: "Building",
    line: "A platform for AI-made vertical short dramas: 60 to 120 second episodes with a recurring cast. Anyone can watch and create; our own studio makes the originals.",
    url: "https://verticals.gg",
  },
  {
    name: "Mundhe Maps",
    tag: "Public Good",
    status: "Live",
    line: "A public map of Mumbai food businesses actioned by FDA Maharashtra. Updated daily.",
    url: "https://mundhemaps.com",
  },
  {
    name: "thumbnail.gg",
    tag: "Product",
    status: "Live",
    line: "AI thumbnail generation for YouTube creators. Click-through intelligence at production scale.",
    url: "https://thumbnail.gg",
  },
  {
    name: "Aarees",
    tag: "Platform",
    status: "Building",
    line: "AI creator platform on WhatsApp. Multi-agent runtime with direct phone-number access. Next version in build.",
    url: "https://aarees.com",
  },
  {
    name: "ClutchPass",
    tag: "Product",
    status: "Active",
    line: "AI battle pass for competitive gamers. Retention, coaching, and progression built in.",
    url: "https://clutchpass.gg",
  },
  {
    name: "Bots",
    tag: "Directory",
    status: "Live",
    line: `${BOTS.length} Grok Bots I built, ready to open and run: clips, brand deals, games, inbox, trips, meals and more.`,
    url: "/bots",
  },
  {
    name: "rushi.live",
    tag: "Tool",
    status: "Live",
    line: "Prompt Engine. Turns plain-language intent into production-ready AI prompts for any major AI tool.",
    url: "https://rushi.live",
  },
  {
    name: "YT Shorts Pipeline",
    tag: "Open Source",
    status: "Shipped",
    line: "2,300+ GitHub stars. Fully automated YouTube Shorts engine: news → script → AI visuals → voiceover → captions → upload.",
    url: "https://github.com/rushindrasinha/youtube-shorts-pipeline",
  },
  {
    name: "Operation Blackout",
    tag: "Open Source",
    status: "Shipped",
    line: "A contemporary-military browser FPS, built from a single prompt. Every texture, mesh, and sound generated procedurally in code. Zero external assets.",
    url: "https://github.com/rushindrasinha/operation-blackout",
  },
  {
    name: "Agent tooling",
    tag: "Open Source",
    status: "Shipped",
    line: "Field-tested tools for running real AI agents: openclaw-guide, ares-mbl, skill-audit-router, xreader-mcp.",
    url: "https://github.com/rushindrasinha",
  },
  {
    name: "xReader.ai",
    tag: "Tool",
    status: "Shipped",
    line: "X threads as clean readable articles. Also shipped: Clutch Creator, a one-click content-angle Chrome extension.",
    url: "https://xreader.ai",
  },
];

const TALKS = [
  { event: "TEDx Sanjivani University · 2026", title: "Passion Pivots Redefine Career Frontiers", url: "https://youtu.be/KIZiMBvIeog", img: "/talks/tedx-sanjivani.jpg", note: "" },
  { event: "TEDx NMIMS · 2020", title: "Can You Get Paid To Play Video Games?", url: "https://youtu.be/DFw5fSh9D3I", img: "/talks/tedx-nmims.jpg", note: "With co-founder Mohit Israney" },
];

const PLATFORMS = [
  { name: "YouTube", subs: 110000, display: "110K", url: "https://youtube.com/c/RushindraSinha" },
  { name: "Instagram", subs: 63000, display: "63K", url: "https://instagram.com/rushindrasinha" },
  { name: "X", subs: 43000, display: "43K", url: "https://x.com/irushi" },
  { name: "Twitch", subs: 18200, display: "18.2K", url: "https://twitch.tv/rushindrasinha" },
  { name: "LinkedIn", subs: 7300, display: "7.3K", url: "https://linkedin.com/in/rushindrasinha" },
];

const NOW = [
  { label: "Jeufy", desc: "Prompt to playable. A games studio that builds with AI agents, plus Jeufy Create for anyone with one sentence." },
  { label: "Ares", desc: "Building and running his own AI operating system, on OpenClaw, in public." },
  { label: "An AI-native team", desc: "Teaching the team to master AI instead of replacing them with it. Same people, a different order of output." },
  { label: "Verticals.gg", desc: "A platform for AI-made vertical short dramas, where anyone can watch and create. Originals from our own studio." },
  { label: "Aarees", desc: "Next version of the WhatsApp-native creator AI, in build." },
  { label: "Global Esports", desc: "2026 VCT Pacific Stage 2 champions. Played VALORANT Champions Shanghai, the org's first Champions." },
];

const MARQUEE_ITEMS = [
  "Jeufy",
  "Global Esports",
  "VCT Pacific Champions",
  "Champions Shanghai 2026",
  "100M+ Personal Views",
  "thumbnail.gg",
  "Aarees",
  "TEDx Speaker",
  "Stanford GSB",
  "Doctor",
  "AI Builder",
  "Mundhe Maps",
  "Ares",
  "Verticals.gg",
  "5B+ Views for Creators & Brands",
  "250K+ Followers",
];

const TAG_CLASS: Record<string, string> = {
  Company: "tag-company",
  Product: "tag-product",
  Platform: "tag-platform",
  Tool: "tag-tool",
  "Open Source": "tag-open",
  "AI System": "tag-product",
  Studio: "tag-company",
  "Public Good": "tag-platform",
};

const SOCIALS = [
  { name: "X", url: "https://x.com/irushi" },
  { name: "Instagram", url: "https://instagram.com/rushindrasinha" },
  { name: "YouTube", url: "https://youtube.com/c/RushindraSinha" },
  { name: "LinkedIn", url: "https://linkedin.com/in/rushindrasinha" },
  { name: "GitHub", url: "https://github.com/rushindrasinha" },
  { name: "Twitch", url: "https://twitch.tv/rushindrasinha" },
];

// LinkedIn isn't in simple-icons (brand removal), so its glyph is inlined.
const LINKEDIN_PATH = "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z";
const SOCIAL_ICON: Record<string, string> = {
  X: siX.path,
  Instagram: siInstagram.path,
  YouTube: siYoutube.path,
  LinkedIn: LINKEDIN_PATH,
  GitHub: siGithub.path,
  Twitch: siTwitch.path,
};

function SocialIcons({ size = 16, gap = 14, tap = false }: { size?: number; gap?: number; tap?: boolean }) {
  const C = useContext(ThemeCtx);
  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          className="social-icon"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", color: C.textMid, minWidth: tap ? 44 : size + 8, minHeight: tap ? 44 : size + 8 }}
        >
          <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
            <path d={SOCIAL_ICON[s.name]} />
          </svg>
        </a>
      ))}
    </div>
  );
}

const CONTACT_ROUTES = [
  { label: "Brand Partnership", desc: "Sponsorships, campaigns, strategic partnerships." },
  { label: "Speaking / Podcast", desc: "Conferences, panels, podcast appearances." },
  { label: "Business Opportunity", desc: "Investment, ventures, strategic conversations." },
  { label: "Media / Press", desc: "Interviews, features, quotes." },
];

// ============================================================================
// HOOKS
// ============================================================================
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

function useCounter(end: number, duration = 2000, shouldCount = true) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useInView(0.3);
  const ran = useRef(false);

  useEffect(() => {
    if (!visible || ran.current || !shouldCount) return;
    ran.current = true;

    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * end * 10) / 10);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [visible, end, duration, shouldCount]);

  return [ref, val] as const;
}

// ============================================================================
// COMPONENTS
// ============================================================================
function Reveal({ children, delay = 0, style = {}, className = "" }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={`reveal${className ? ` ${className}` : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  const C = useContext(ThemeCtx);
  return (
    <p style={{ fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", color: C.accent, fontWeight: 500, margin: "0 0 14px 0", fontFamily: F.mono }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  const C = useContext(ThemeCtx);
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px, 4.2vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 12px 0", color: C.white, lineHeight: 1.08 }}>{children}</h2>
      <span style={{ display: "block", width: 28, height: 2, borderRadius: 1, background: C.accent }} />
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const C = useContext(ThemeCtx);
  const color = status === "Live" ? C.accent : status === "Active" ? C.blue : (status === "Soon" || status === "Building") ? "#ffcc44" : C.textDim;
  const glow = (status === "Live" || status === "Active") ? `0 0 8px ${color}66` : "none";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color, fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", fontFamily: F.mono }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: glow, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// Live IST clock, rendered after mount so SSR and client markup agree.
function LiveStatus() {
  const C = useContext(ThemeCtx);
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <p style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px", margin: 0, fontFamily: F.mono, fontSize: 12, letterSpacing: "1.4px", textTransform: "uppercase", color: C.textMid }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.accent }}>
        <span className="live-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, boxShadow: `0 0 8px ${C.accent}` }} />
        Building in public
      </span>
      <span aria-hidden="true" className="live-sep">·</span>
      <span style={{ whiteSpace: "nowrap" }}>
        {t ? `${t} IST` : "IST"} <span aria-hidden="true">·</span> Now: <a href="https://jeufy.com" target="_blank" rel="noopener noreferrer" style={{ color: C.text, textDecoration: "none", borderBottom: `1px solid ${C.borderAccent}` }}>Jeufy</a>
      </span>
    </p>
  );
}

// Desktop: a fanned deck of identity cards synced to the ticker. Hover a card to hold it.
function ProofDeck({ active, onPick, onHold }: { active: number; onPick: (i: number) => void; onHold: (h: boolean) => void }) {
  const C = useContext(ThemeCtx);
  const n = IDENTITIES.length;
  return (
    <div className="proof-deck" onMouseEnter={() => onHold(true)} onMouseLeave={() => onHold(false)} aria-label="Identity cards">
      {IDENTITIES.map((id, i) => {
        let off = i - active;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        const isActive = off === 0;
        return (
          <button
            key={id.word}
            className="proof-card"
            onMouseEnter={() => onPick(i)}
            onFocus={() => onPick(i)}
            aria-pressed={isActive}
            style={{
              transform: `translateX(${off * 46}px) translateY(${Math.abs(off) * 14}px) rotate(${off * 6}deg) scale(${isActive ? 1 : 0.92})`,
              zIndex: 10 - Math.abs(off),
              opacity: Math.abs(off) > 2 ? 0 : isActive ? 1 : 0.42,
              background: isActive ? C.bg : C.surfaceStrong,
              borderColor: isActive ? C.accent : C.border,
              boxShadow: isActive ? `0 0 0 1px ${C.accent}33, 0 24px 60px rgba(0,0,0,0.45), 0 0 40px ${C.accent}22` : "0 16px 40px rgba(0,0,0,0.35)",
            }}
          >
            <span style={{ display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontSize: 11, letterSpacing: "1.6px", color: isActive ? C.accent : C.textDim }}>
              <span>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              <span>{id.code}</span>
            </span>
            <span style={{ display: "block", fontFamily: F.display, fontSize: 38, fontWeight: 700, letterSpacing: "-0.04em", color: C.white, margin: "26px 0 18px", lineHeight: 1, opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease" }}>{id.word}.</span>
            <span style={{ display: "block", height: 1, background: isActive ? C.borderAccent : C.border, marginBottom: 16 }} />
            <span style={{ display: "grid", gap: 12, opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease" }}>
              {id.proof.map((p) => (
                <span key={p} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.45, color: isActive ? C.text : C.textMid, fontWeight: 400, textAlign: "left" }}>
                  <span style={{ color: C.accent, fontFamily: F.mono }}>›</span>
                  <span>{p}</span>
                </span>
              ))}
            </span>
            <span aria-hidden="true" className="proof-card-foot" style={{ color: C.textDim }}>RUSHINDRA.COM</span>
          </button>
        );
      })}
    </div>
  );
}

// Mobile / narrow: the active identity's proof sits right under the ticker.
function ProofLines({ active }: { active: number }) {
  const C = useContext(ThemeCtx);
  const id = IDENTITIES[active];
  return (
    <ul key={active} className="proof-lines ticker-text" style={{ listStyle: "none", padding: "14px 16px", margin: "14px 0 0 0", display: "grid", gap: 8, border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.accent}`, borderRadius: 10, background: C.surface }}>
      {id.proof.map((p) => (
        <li key={p} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.45, color: C.text, fontWeight: 300 }}>
          <span style={{ color: C.accent, fontFamily: F.mono }}>›</span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  const C = useContext(ThemeCtx);
  return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border} 20%, ${C.border} 80%, transparent)` }} />;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
function magnetize(e: React.MouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width / 2);
  const y = e.clientY - (r.top + r.height / 2);
  el.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
}
function unmagnetize(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.transform = "translate(0, 0)";
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1181px)");
    const on = () => setIsWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const C = isDark ? DARK_C : LIGHT_C;

  const toggleTheme = () => {
    setIsDark((d) => {
      const next = !d;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setIsDark(false);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ticker + proof deck rotate together; hovering the deck or tapping a segment holds it.
  const [held, setHeld] = useState(false);
  const holdUntil = useRef(0);
  useEffect(() => {
    if (held) return;
    const interval = setInterval(() => {
      if (Date.now() < holdUntil.current) return;
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [held]);
  const pickRole = (i: number) => { setRoleIdx(i); holdUntil.current = Date.now() + 8000; };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const now = new Date();
  const qLabel = `Q${Math.ceil((now.getMonth() + 1) / 3)} ${now.getFullYear()}`;

  const [viewCount, vC] = useCounter(100, 2000);
  const [reachCount, rC] = useCounter(250, 1800);
  const [yearsCount, yC] = useCounter(20, 1600);
  const [creatorViews, cV] = useCounter(5, 1800);
  const [reposCount, rpC] = useCounter(50, 1400);
  const [tedxCount, tC] = useCounter(2, 1000);

  return (
    <ThemeCtx.Provider value={C}>
    <div style={{ background: C.bg, color: C.text, fontFamily: F.body, minHeight: "100vh", overflowX: "hidden" }}>
      <CursorFX accent={C.accent} />
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 110,
          zIndex: 999,
          pointerEvents: "none",
          opacity: scrolled ? 0 : 1,
          transition: "opacity 0.35s ease",
          background: `linear-gradient(180deg, ${C.bg} 0%, transparent 100%)`,
        }}
      />

      {/* ========== NAV ========== */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "16px clamp(24px, 5vw, 64px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: scrolled ? (isDark ? "rgba(8,8,10,0.9)" : "rgba(245,245,240,0.94)") : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          transition: "all 0.35s ease",
        }}
      >
        <button onClick={() => scrollTo("hero")} aria-label="Back to top" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F.mono, fontSize: 20, fontWeight: 600, color: C.accent, letterSpacing: 0, minWidth: 44, minHeight: 44, textAlign: "left" }}>
          R_
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div className="nav-links" style={{ display: "flex", gap: 28, fontSize: 12, fontWeight: 500, letterSpacing: "1.4px", fontFamily: F.body }}>
            {NAV_LINKS.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={`Go to ${label} section`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: C.textMid,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = C.accent;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = C.textMid;
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Outside .nav-links on purpose: that row is hidden on phones, /bots is not. */}
          <Link
            href="/bots"
            style={{ color: C.textMid, textDecoration: "none", transition: "color 0.2s", fontSize: 12, fontWeight: 500, letterSpacing: "1.4px", fontFamily: F.body }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = C.accent;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = C.textMid;
            }}
          >
            Bots
          </Link>
          <div className="nav-socials" style={{ alignItems: "center", paddingLeft: 18, borderLeft: `1px solid ${C.border}` }}>
            <SocialIcons size={15} gap={4} />
          </div>
          <button
            className="nav-cta"
            onClick={() => scrollTo("contact")}
            onMouseMove={magnetize}
            onMouseLeave={unmagnetize}
            aria-label="Go to contact section"
            style={{
              padding: "8px 18px",
              background: C.accent,
              color: C.bg,
              border: "none",
              borderRadius: 7,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: F.body,
              transition: "transform 0.15s cubic-bezier(.22,1,.36,1)",
              flexShrink: 0,
            }}
          >
            Work together
          </button>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "none",
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              cursor: "pointer",
              color: C.textMid,
              fontSize: 15,
              lineHeight: 1,
              padding: "5px 8px",
              transition: "border-color 0.2s, color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = C.accent;
              el.style.color = C.accent;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = C.border;
              el.style.color = C.textMid;
            }}
          >
            {isDark ? "☀" : "☾"}
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              background: "none",
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              cursor: "pointer",
              color: C.text,
              flexShrink: 0,
            }}
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M1 1L15 11M15 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="0" y1="1" x2="16" y2="1" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.5" />
                </>
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div
            className="nav-mobile-panel"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              padding: "12px clamp(24px, 5vw, 64px) 20px",
              background: isDark ? "rgba(8,8,10,0.98)" : "rgba(245,245,240,0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: `1px solid ${C.border}`,
              gap: 4,
            }}
          >
            {NAV_LINKS.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={`Go to ${label} section`}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  color: C.text,
                  fontSize: 15,
                  fontWeight: 500,
                  padding: "10px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {label}
              </button>
            ))}
            <div style={{ marginTop: 10, marginLeft: -12 }}>
              <SocialIcons size={20} gap={0} tap />
            </div>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                marginTop: 8,
                padding: "12px 20px",
                background: C.accent,
                color: C.bg,
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: F.body,
              }}
            >
              Work together
            </button>
          </div>
        )}
      </nav>

      {/* ========== HERO ========== */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "140px clamp(24px, 5vw, 64px) 100px", position: "relative" }}>
        <div className="hero-dot-grid" aria-hidden="true" />
        {/* Gradient orbs */}
        <div className="hero-orb-pulse" style={{ position: "absolute", top: "15%", right: "-8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(156,255,87,0.08) 0%, transparent 65%)", filter: "blur(100px)", pointerEvents: "none" }} />
        <div className="hero-orb-pulse-alt" style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(94,186,255,0.04) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

        {isWide && (
          <div className="hero-3d-wrap">
            <ProofDeck active={roleIdx} onPick={pickRole} onHold={setHeld} />
          </div>
        )}

        <div style={{ maxWidth: 920, position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <img src="/rushi-avatar.jpg" alt="Dr. Rushindra Sinha" width={64} height={64} className="hero-avatar" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.accent}`, flexShrink: 0 }} />
              <LiveStatus />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.98, margin: 0, color: C.white }}>
                Dr. Rushindra Sinha.
              </h1>
            </div>

            <div style={{ minHeight: 36, marginBottom: 24 }}>
              <p aria-hidden="true" style={{ fontFamily: F.mono, fontSize: "clamp(20px, 2.6vw, 30px)", color: C.accent, lineHeight: 1.2, margin: 0, fontWeight: 500 }}>
                <span style={{ color: C.textDim }}>&gt; </span>
                <span key={roleIdx} className="ticker-text">{ROLES[roleIdx]}</span>
                <span className="caret" aria-hidden="true">_</span>
              </p>
              {/* Rotation indicator: one segment per word, current one fills until the next */}
              <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                {ROLES.map((r, i) => (
                  <button key={i} onClick={() => pickRole(i)} aria-label={`Show ${r}`} className="ticker-seg">
                    <span style={{ position: "relative", display: "block", width: 18, height: 3, borderRadius: 2, background: C.border, overflow: "hidden" }}>
                      {i < roleIdx && <span style={{ position: "absolute", inset: 0, background: C.accent, opacity: 0.55 }} />}
                      {i === roleIdx && <span key={`${roleIdx}-${held}`} className={held ? "" : "ticker-fill"} style={{ position: "absolute", inset: 0, background: C.accent }} />}
                    </span>
                  </button>
                ))}
              </div>
              {!isWide && <ProofLines active={roleIdx} />}
              {/* Screen readers get the full list once, not a flickering single item */}
              <ul className="sr-only">
                {ROLES.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ fontSize: "clamp(16px, 1.6vw, 19px)", lineHeight: 1.7, color: C.text, maxWidth: 620, margin: "0 0 20px 0", fontWeight: 300 }}>
              I build the AI systems that run my companies, and I build them in public. Founder of Jeufy, a games studio that turns a prompt into a playable game. Co-founder of Global Esports: 2026 VCT Pacific Stage 2 champions and the org&apos;s first VALORANT Champions.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 36px 0", fontWeight: 400, fontFamily: F.mono }}>
              Stanford GSB · Global Esports · Jeufy · 2× TEDx
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 64 }}>
              <button
                onClick={() => scrollTo("work")}
                onMouseMove={magnetize}
                onMouseLeave={(e) => {
                  unmagnetize(e);
                  (e.target as HTMLElement).style.opacity = "1";
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.opacity = "0.9";
                }}
                style={{
                  padding: "12px 28px",
                  background: C.accent,
                  color: C.bg,
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.8px",
                  cursor: "pointer",
                  fontFamily: F.body,
                  transition: "transform 0.15s cubic-bezier(.22,1,.36,1), opacity 0.2s",
                }}
              >
                Explore the work
              </button>
              <button
                onClick={() => scrollTo("contact")}
                aria-label="Go to contact section"
                onMouseMove={magnetize}
                onMouseEnter={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.borderColor = C.white;
                  el.style.color = C.white;
                }}
                onMouseLeave={(e) => {
                  unmagnetize(e);
                  const el = e.target as HTMLElement;
                  el.style.borderColor = C.accent;
                  el.style.color = C.accent;
                }}
                style={{
                  padding: "12px 28px",
                  background: "transparent",
                  color: C.accent,
                  border: `1px solid ${C.accent}`,
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.8px",
                  cursor: "pointer",
                  fontFamily: F.body,
                  transition: "transform 0.15s cubic-bezier(.22,1,.36,1), border-color 0.2s, color 0.2s",
                }}
              >
                Work together
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <div className="hero-stats">
              {[
                { ref: viewCount, val: vC, suffix: "M+", label: "Personal Views" },
                { ref: reachCount, val: rC, suffix: "K+", label: "Total Reach" },
                { ref: yearsCount, val: yC, suffix: "+", label: "Years Building" },
                { ref: creatorViews, val: cV, suffix: "B+", label: "Views for Creators & Brands" },
                { ref: reposCount, val: rpC, suffix: "+", label: "GitHub Repos" },
                { ref: tedxCount, val: tC, suffix: "x TEDx", label: "Stages" },
              ].map((stat, i) => (
                <div key={i} ref={stat.ref as any}>
                  <div style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: C.accent, lineHeight: 1, fontFamily: F.display, letterSpacing: "-0.03em" }}>
                    {stat.val}
                    {stat.suffix}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMid, letterSpacing: "0.5px", textTransform: "uppercase", marginTop: 6, fontWeight: 500, fontFamily: F.mono }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ========== MARQUEE ========== */}
      <section style={{ padding: "32px 0", background: "rgba(156,255,87,0.02)", overflow: "hidden", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", overflow: "hidden" }}>
          <div className="marquee-inner" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <Fragment key={i}>
                <div style={{ whiteSpace: "nowrap", fontSize: 12, fontWeight: 600, color: C.textMid, letterSpacing: "1px", textTransform: "uppercase" }}>
                  {item}
                </div>
                <span style={{ color: C.textDim, fontSize: 16, lineHeight: 1, flexShrink: 0 }}>·</span>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ========== STORY & TIMELINE ========== */}
      <section id="about" style={{ padding: "96px clamp(24px, 5vw, 64px)", maxWidth: "100%" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <Reveal>
            <Label>The Story</Label>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>Doctor. Gamer. Founder. Built from first principles.</SectionTitle>
          </Reveal>

          <div className="story-grid">
            <Reveal delay={0.1} className="story-portrait">
              <figure style={{ margin: 0 }}>
                <img
                  src="/rushi.jpg"
                  alt="Dr. Rushindra Sinha"
                  width={400}
                  height={400}
                  loading="lazy"
                  style={{ width: "100%", maxWidth: 400, height: "auto", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 14, border: `1px solid ${C.border}`, display: "block" }}
                />
              </figure>
            </Reveal>

          <Reveal delay={0.14}>
            <div style={{ fontSize: 16, lineHeight: 1.85, color: C.textMid, fontWeight: 300 }}>
              <p style={{ marginBottom: 22 }}>
                Games found me at two. First plays on a hospital computer, borrowed time between a parent&apos;s rounds. By 2008 I was running Phoenix RO, a Ragnarok Online private server with thousands of active players. At 18, I developed and sold my first game commercially. I learned what it meant to build products people live inside before anyone called it a career.
              </p>
              <p className={`story-more${storyOpen ? " open" : ""}`} style={{ marginBottom: 22 }}>
                I completed my MBBS at D.Y. Patil Medical College, Navi Mumbai in 2014. I was already experimenting, using Google Glass to live-stream surgeries, one of the first in India to do so. But the pull toward building was too strong. San Francisco. A 480-hour full-stack bootcamp at General Assembly. Stanford GSB&apos;s Innovative Health Care Leader program, from design thinking to personal leadership, completed in 2017. Self-teaching code from zero while holding a medical degree. I wanted to be dangerous with both.
              </p>
              <p className={`story-more${storyOpen ? " open" : ""}`} style={{ marginBottom: 22 }}>
                In 2017 I started Global Esports, India&apos;s first VC-backed esports organization. It ran as a proprietorship under my own name for the first year; I incorporated the company and moved the business over by November 2018. We won the Valorant Conqueror Championship. Riot Games selected us as one of 10 permanent VCT Pacific franchise partners globally. We stayed profitable while 18+ Indian esports competitors shut down. In 2026 we won VCT Pacific Stage 2 and qualified for VALORANT Champions for the first time. Alongside that: 100M+ personal views across platforms, 5B+ generated for creators and brands, two TEDx stages, first place at the 2014 Tribeca Film Festival and second place at the Beijing film festival with Mohit, and national rankings in inline speed skating.
              </p>
              <p className={`story-more${storyOpen ? " open" : ""}`} style={{ marginBottom: 22 }}>
                Today I build AI systems in public. Ares, my own AI operating system, runs my companies from a Discord command centre, and most of what I ship now starts as a voice note. In October 2026 I launched Jeufy, a games studio that builds with AI agents: prompt to playable. I didn&apos;t replace my team with AI. I taught them to master it.
              </p>
              <button
                className="story-toggle tap"
                onClick={() => setStoryOpen((o) => !o)}
                aria-expanded={storyOpen}
                style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, color: C.accent, fontFamily: F.mono, fontSize: 13, padding: "10px 16px", cursor: "pointer", marginBottom: 8 }}
              >
                {storyOpen ? "Show less" : "Read the full story + timeline"}
              </button>
            </div>
          </Reveal>
          </div>

          <Reveal delay={0.26}>
            <div style={{ marginTop: 72 }}>
              <Label>Timeline</Label>
              <div style={{ position: "relative", paddingLeft: 32, marginTop: 16 }}>
                <div style={{ position: "absolute", left: 6, top: 8, bottom: 0, width: 1, background: `linear-gradient(180deg, ${C.accent} 0%, ${C.border} 100%)` }} />

                {TIMELINE.map((t, i) => (
                  <Reveal key={t.yr} delay={0.04 * i}>
                    <div className={i < TIMELINE.length - 3 ? `timeline-early${storyOpen ? " open" : ""}` : ""} style={{ display: "flex", gap: 18, marginBottom: 22, alignItems: "flex-start", position: "relative" }}>
                      <div
                        className={i === TIMELINE.length - 1 ? "timeline-dot-live" : ""}
                        style={{
                          position: "absolute",
                          left: -26,
                          top: 7,
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: i === TIMELINE.length - 1 ? C.accent : C.border,
                          boxShadow: i === TIMELINE.length - 1 ? `0 0 10px ${C.accent}66` : "none",
                        }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.accent, minWidth: 36, fontFamily: F.mono }}>{t.yr}</span>
                      <span style={{ fontSize: 14, color: C.textMid, fontWeight: 300, lineHeight: 1.6 }}>{t.t}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ========== PRODUCTS BENTO ========== */}
      <section id="work" style={{ padding: "96px clamp(24px, 5vw, 64px)" }}>
        <div style={{ maxWidth: "100%" }}>
          <Reveal>
            <Label>Selected Work</Label>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>Proof of execution.</SectionTitle>
          </Reveal>

          <p className="swipe-hint" style={{ fontSize: 12, color: C.textMid, fontFamily: F.mono, margin: "-24px 0 12px 0" }}>Swipe →</p>
          <div className="products-grid">
            {WORK.map((w, i) => (
              <Reveal key={w.name} delay={Math.min(0.05 * i, 0.3)} style={{ gridColumn: w.wide ? "span 2" : undefined }}>
                <a
                  href={w.url}
                  {...(w.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`card${w.wide ? " card-featured" : ""}`}
                  style={{
                    padding: 24,
                    height: "100%",
                    cursor: "pointer",
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, gap: 12 }}>
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 600, color: C.white, fontFamily: F.display, letterSpacing: "-0.02em" }}>{w.name}</h3>
                      <span className={TAG_CLASS[w.tag] ?? ""} style={{ display: "inline-block", padding: "4px 8px", borderRadius: 4, background: C.surfaceStrong, color: C.textMid, fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: F.mono }}>
                        {w.tag}
                      </span>
                    </div>
                    <StatusDot status={w.status} />
                  </div>

                  <p style={{ margin: 0, fontSize: 14, color: C.textMid, lineHeight: 1.7, fontWeight: 300 }}>{w.line}</p>

                  <p style={{ margin: "12px 0 0 0", fontSize: 12, color: C.accent, fontWeight: 500, fontFamily: F.mono }}>View →</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ========== TALKS ========== */}
      <section id="talks" style={{ padding: "96px clamp(24px, 5vw, 64px)" }}>
        <div style={{ maxWidth: "100%" }}>
          <Reveal>
            <Label>Talks</Label>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>Two TEDx stages.</SectionTitle>
          </Reveal>
          <div className="talks-grid">
            {TALKS.map((t, i) => (
              <Reveal key={t.url} delay={0.08 * i}>
                <a href={t.url} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "block", textDecoration: "none", color: "inherit", overflow: "hidden", padding: 0, height: "100%" }}>
                  <div style={{ position: "relative", aspectRatio: "16 / 9", background: C.surfaceStrong }}>
                    <img src={t.img} alt={`${t.event}: ${t.title}`} loading="lazy" width={960} height={540} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <span aria-hidden="true" style={{ position: "absolute", left: 16, bottom: 16, width: 44, height: 44, borderRadius: "50%", background: C.accent, color: "#08080a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>▶</span>
                  </div>
                  <div style={{ padding: 20 }}>
                    <p style={{ margin: "0 0 6px 0", fontSize: 12, color: C.accent, fontFamily: F.mono, textTransform: "uppercase", letterSpacing: "1px" }}>{t.event}</p>
                    <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: C.white, fontFamily: F.display, letterSpacing: "-0.02em", lineHeight: 1.3 }}>{t.title}</h3>
                    {t.note && <p style={{ margin: "8px 0 0 0", fontSize: 13, color: C.textMid }}>{t.note}</p>}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ========== PLATFORMS ========== */}
      <section style={{ padding: "96px clamp(24px, 5vw, 64px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <Label>Platform Presence</Label>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>A quarter million personal followers across socials.</SectionTitle>
          </Reveal>

          <div style={{ display: "grid", gap: 20, marginTop: 32 }}>
            {PLATFORMS.map((p, i) => {
              const maxSubs = Math.max(...PLATFORMS.map(x => x.subs));
              const pct = Math.max((Math.sqrt(p.subs) / Math.sqrt(maxSubs)) * 100, 6);

              return (
                <Reveal key={p.name} delay={0.08 * i}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 80px", gap: 16, alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>{p.name}</span>
                      <div style={{ height: 2, background: C.border, borderRadius: 999, overflow: "hidden" }}>
                        <div className="stat-bar-fill" style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 999 }} />
                      </div>
                      <span style={{ textAlign: "right", fontSize: 13, fontWeight: 600, color: C.text }}>{p.display}</span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ========== NOW ========== */}
      <section id="now" style={{ padding: "96px clamp(24px, 5vw, 64px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <Label>Current Focus · {qLabel}</Label>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>What I'm building right now.</SectionTitle>
          </Reveal>

          <div style={{ display: "grid", gap: 14, marginTop: 32 }}>
            {NOW.map((item, i) => (
              <Reveal key={item.label} delay={0.08 * i}>
                <div className="card" style={{ padding: "22px 26px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 3, minHeight: 40, borderRadius: 2, background: C.accent, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h4 style={{ margin: "0 0 6px 0", fontSize: 16, fontWeight: 600, color: C.white }}>{item.label}</h4>
                    <p style={{ margin: 0, fontSize: 14, color: C.textMid, lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ========== CONTACT ========== */}
      <section id="contact" style={{ padding: "96px clamp(24px, 5vw, 64px) 96px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal>
            <Label>Work With Me</Label>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>Route by intent, not a form.</SectionTitle>
          </Reveal>

          <Reveal delay={0.16}>
            <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.7, fontWeight: 300, margin: "0 0 36px 0" }}>
              Open to conversations that create real value. Be specific about what you want and why.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", margin: "-12px 0 32px 0" }}>
              <a className="tap" href="mailto:sinha@rushindra.com" style={{ fontFamily: F.mono, fontSize: 15, color: C.white, textDecoration: "none" }}>sinha@rushindra.com</a>
              <button
                className="tap"
                onClick={() => {
                  navigator.clipboard?.writeText("sinha@rushindra.com").then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  });
                }}
                aria-label="Copy email address"
                style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, color: copied ? C.accent : C.textMid, fontFamily: F.mono, fontSize: 12, padding: "8px 14px", cursor: "pointer" }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {CONTACT_ROUTES.map((r, i) => (
              <Reveal key={r.label} delay={0.08 * i}>
                <a href={`mailto:sinha@rushindra.com?subject=${encodeURIComponent(r.label)}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card" style={{ padding: 22, height: "100%" }}>
                    <h4 style={{ margin: "0 0 6px 0", fontSize: 15, fontWeight: 600, color: C.white }}>{r.label}</h4>
                    <p style={{ margin: 0, fontSize: 13, color: C.textMid, lineHeight: 1.5, fontWeight: 300 }}>{r.desc}</p>
                    <p style={{ margin: "10px 0 0 0", fontSize: 12, color: C.accent, fontWeight: 600 }}>Reach out →</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div style={{ display: "flex", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
              {SOCIALS.map((s) => (
                <a key={s.name} className="tap" href={s.url} target="_blank" rel="noopener" style={{ color: C.textMid, textDecoration: "none", fontSize: 13, fontWeight: 400, transition: "color 0.2s", fontFamily: F.mono }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.accent)} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = C.textMid)}>
                  {s.name} →
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ========== CLOSING STATEMENT ========== */}
      <section style={{ padding: "80px clamp(24px, 5vw, 64px)", textAlign: "center" }}>
        <Reveal>
          <p
            style={{
              fontFamily: F.display,
              fontSize: "clamp(26px, 4vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: C.white,
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            Built at the edge of every era. Still building.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <button
            onClick={() => scrollTo("hero")}
            onMouseMove={magnetize}
            onMouseLeave={(e) => {
              unmagnetize(e);
              const el = e.currentTarget;
              el.style.color = C.textMid;
              el.style.borderColor = C.border;
            }}
            aria-label="Back to top"
            style={{
              marginTop: 32,
              background: "none",
              border: `1px solid ${C.border}`,
              borderRadius: 999,
              padding: "10px 22px",
              color: C.textMid,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.6px",
              cursor: "pointer",
              fontFamily: F.body,
              transition: "transform 0.15s cubic-bezier(.22,1,.36,1), color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = C.accent;
              el.style.borderColor = C.borderAccent;
            }}
          >
            Back to top ↑
          </button>
        </Reveal>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ padding: "24px clamp(24px, 5vw, 64px) 36px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p style={{ margin: 0, fontSize: 12, color: C.textDim, fontWeight: 300 }}>© 2026 Dr. Rushindra Sinha</p>
      </footer>
    </div>
    </ThemeCtx.Provider>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================================
// DESIGN TOKENS
// ============================================================================
const C = {
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
  textDim: "#585450",
  white: "#ffffff",
};

const F = {
  display: "var(--font-display)",
  body: "var(--font-body)",
};

// ============================================================================
// DATA
// ============================================================================
const ROLES = ["Founder.", "Builder.", "Creator.", "Doctor."];

const TIMELINE = [
  { yr: "'93", t: "First games on a hospital computer — borrowed time between a parent's rounds. Early exposure to systems, play, and digital worlds." },
  { yr: "'08", t: "Built Phoenix RO — a Ragnarok Online private server with thousands of active players. Developed and sold my first online game commercially at 18. First real lessons in products, monetization, and running live internet infrastructure." },
  { yr: "'14", t: "MBBS from D.Y. Patil Medical College, Pune. Pioneered Google Glass for live-streaming surgeries in India. Realized the deeper instinct was building, not practice." },
  { yr: "'16", t: "San Francisco. 480-hour full-stack bootcamp at General Assembly. Stanford GSB: Innovative Healthcare Leadership. The coding and business foundations locked in." },
  { yr: "'17", t: "Co-founded Global Esports in Mumbai with Mohit Israney. India's first VC-backed esports organization." },
  { yr: "'22", t: "Riot Games selected Global Esports as one of 10 permanent VCT Pacific franchise partners globally. Won Valorant Conqueror Championship. Competed on the world stage in Seoul." },
  { yr: "'24", t: "GE achieves profitability. 18+ Indian esports competitors shut down — GE was the only one standing. Contributed to a Tribeca Film Festival-winning entry. 2x TEDx stages." },
  { yr: "'26", t: "Creator-founder era. AI-native products. Building the machine that builds." },
];

const WORK = [
  {
    name: "Global Esports",
    tag: "Company",
    status: "Live",
    line: "India's first VC-backed esports org. Won Valorant Conqueror Championship. One of 10 permanent VCT Pacific franchise teams selected by Riot Games globally. India's only profitable esports org while 18+ competitors shut down.",
    url: "https://globalesports.in",
    wide: true,
  },
  {
    name: "thumbnail.gg",
    tag: "Product",
    status: "Live",
    line: "AI thumbnail generation for YouTube creators. Speed, intelligence, and workflow leverage.",
    url: "https://thumbnail.gg",
  },
  {
    name: "Aarees",
    tag: "Platform",
    status: "Active",
    line: "AI creator tools platform on WhatsApp. Multi-agent runtime. The consumer layer.",
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
    name: "Ges",
    tag: "Product",
    status: "Soon",
    line: "AI business operator for serious creators. Turning audience into direct revenue.",
    url: null,
  },
  {
    name: "Clutch Creator",
    tag: "Tool",
    status: "Shipped",
    line: "Chrome extension: turn any page into content angles with one click.",
    url: "https://github.com/rushindrasinha/clutch-creator",
  },
  {
    name: "xReader.ai",
    tag: "Tool",
    status: "Shipped",
    line: "X threads as clean readable articles. Built for durable thinking.",
    url: "https://github.com/rushindrasinha/x-article-reader",
  },
];

const PLATFORMS = [
  { name: "YouTube", subs: 110000, display: "110K", url: "https://youtube.com/c/RushindraSinha" },
  { name: "Instagram", subs: 63000, display: "63K", url: "https://instagram.com/rushindrasinha" },
  { name: "X", subs: 43000, display: "43K", url: "https://x.com/irushi" },
  { name: "Twitch", subs: 18200, display: "18.2K", url: "https://twitch.tv/rushindrasinha" },
  { name: "LinkedIn", subs: 7300, display: "7.3K", url: "https://linkedin.com/in/rushindrasinha" },
];

const NOW = [
  { label: "Ges", desc: "AI business operator for creators. Concierge pilot launching — 10 creators, ₹50K/month." },
  { label: "Aarees v5", desc: "Rebuilding on Meta WhatsApp Cloud API. Multi-agent runtime. Phone number features." },
  { label: "Creator growth", desc: "Distribution as first-class lever. Content compounding. Flywheel closing." },
  { label: "Global Esports", desc: "Operating through the final VCT Pacific franchise era." },
];

const MARQUEE_ITEMS = [
  "Global Esports",
  "VCT Pacific",
  "100M+ Personal Views",
  "thumbnail.gg",
  "Aarees",
  "TEDx Speaker",
  "Stanford GSB",
  "MD",
  "AI Builder",
  "ClutchPass",
  "5B+ Views for Creators & Brands",
  "241K Reach",
];

const SOCIALS = [
  { name: "X", url: "https://x.com/irushi" },
  { name: "Instagram", url: "https://instagram.com/rushindrasinha" },
  { name: "YouTube", url: "https://youtube.com/c/RushindraSinha" },
  { name: "LinkedIn", url: "https://linkedin.com/in/rushindrasinha" },
  { name: "GitHub", url: "https://github.com/rushindrasinha" },
  { name: "Twitch", url: "https://twitch.tv/rushindrasinha" },
];

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
function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: C.accent, fontWeight: 600, margin: "0 0 14px 0", fontFamily: F.body }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px, 4.2vw, 54px)", fontWeight: 400, fontStyle: "italic", margin: "0 0 40px 0", color: C.white, lineHeight: 1.1 }}>{children}</h2>;
}

function StatusDot({ status }: { status: string }) {
  const color = status === "Live" ? C.accent : status === "Active" ? C.blue : status === "Soon" ? "#ffcc44" : C.textDim;
  const glow = (status === "Live" || status === "Active") ? `0 0 8px ${color}66` : "none";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color, fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: glow, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border }} />;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const [viewCount, vC] = useCounter(100, 2000);
  const [reachCount, rC] = useCounter(241, 1800);
  const [yearsCount, yC] = useCounter(20, 1600);
  const [creatorViews, cV] = useCounter(5, 1800);
  const [reposCount, rpC] = useCounter(50, 1400);
  const [tedxCount, tC] = useCounter(2, 1000);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: F.body, minHeight: "100vh", overflowX: "hidden" }}>
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
          background: scrolled ? "rgba(8,8,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          transition: "all 0.35s ease",
        }}
      >
        <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F.display, fontSize: 24, fontStyle: "italic", color: C.accent, letterSpacing: 1 }}>
          R.
        </button>

        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", fontSize: 12, fontWeight: 500, letterSpacing: "1.4px", textTransform: "uppercase" }}>
          {[
            ["About", "about"],
            ["Work", "work"],
            ["Now", "now"],
            ["Media", "media"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
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
      </nav>

      {/* ========== HERO ========== */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "140px clamp(24px, 5vw, 64px) 100px", position: "relative" }}>
        {/* Gradient orbs */}
        <div style={{ position: "absolute", top: "15%", right: "-8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(156,255,87,0.08) 0%, transparent 65%)", filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(94,186,255,0.04) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 920, position: "relative", zIndex: 1 }}>
          <Reveal>
            <Label>Creator-Founder · AI · Media · Gaming · Performance</Label>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(56px, 8vw, 100px)", fontWeight: 400, lineHeight: 1.02, margin: 0, color: C.white }}>
                Dr. Rushindra
              </h1>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(56px, 8vw, 100px)", fontWeight: 400, lineHeight: 1.02, margin: 0, color: C.white }}>
                Sinha.
              </h1>
            </div>

            <div style={{ height: 36, marginBottom: 24 }}>
              <p style={{ fontFamily: F.display, fontSize: "clamp(20px, 2.8vw, 32px)", fontStyle: "italic", color: C.accent, lineHeight: 1.2, margin: 0, fontWeight: 400 }}>
                {ROLES[roleIdx]}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: C.textMid, maxWidth: 660, margin: "0 0 20px 0", fontWeight: 300 }}>
              I build companies, content, and AI-native systems at the intersection of medicine, esports, and the internet. Founder of Global Esports, VCT Pacific franchise partner.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <p style={{ fontSize: 14, color: C.textDim, margin: "0 0 36px 0", fontWeight: 400 }}>
              MD · Stanford GSB executive education · Founder, Global Esports · TEDx Speaker
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 64 }}>
              <button
                onClick={() => scrollTo("work")}
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
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.opacity = "1";
                }}
              >
                Explore the work
              </button>
              <button
                onClick={() => scrollTo("contact")}
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
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.borderColor = C.white;
                  el.style.color = C.white;
                }}
                onMouseLeave={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.borderColor = C.accent;
                  el.style.color = C.accent;
                }}
              >
                Work together
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[
                { ref: viewCount, val: vC, suffix: "M+", label: "Personal Views" },
                { ref: reachCount, val: rC, suffix: "K+", label: "Total Reach" },
                { ref: yearsCount, val: yC, suffix: "+", label: "Years Building" },
                { ref: creatorViews, val: cV, suffix: "B+", label: "Views for Creators & Brands" },
                { ref: reposCount, val: rpC, suffix: "+", label: "GitHub Repos" },
                { ref: tedxCount, val: tC, suffix: "x TEDx", label: "Stages" },
              ].map((stat, i) => (
                <div key={i} ref={stat.ref as any}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: C.accent, lineHeight: 1 }}>
                    {stat.val}
                    {stat.suffix}
                  </div>
                  <div style={{ fontSize: 11, color: C.textDim, letterSpacing: "1px", textTransform: "uppercase", marginTop: 6, fontWeight: 500 }}>
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
          <div className="marquee-inner" style={{ display: "flex", gap: 24 }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div key={i} style={{ whiteSpace: "nowrap", fontSize: 12, fontWeight: 600, color: C.textMid, letterSpacing: "1px", textTransform: "uppercase" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ========== STORY & TIMELINE ========== */}
      <section id="about" style={{ padding: "96px clamp(24px, 5vw, 64px)", maxWidth: "100%" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <Label>The Story</Label>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>Doctor. Founder. Creator. Built from first principles.</SectionTitle>
          </Reveal>

          <Reveal delay={0.14}>
            <div style={{ fontSize: 16, lineHeight: 1.9, color: C.textMid, fontWeight: 300 }}>
              <p style={{ marginBottom: 22 }}>
                Games found me at two — first plays on a hospital computer, borrowed time between a parent's rounds. By 2008 I was running Phoenix RO, a Ragnarok Online private server with thousands of active players. At 18, I developed and sold my first game commercially. I learned what it meant to build products people live inside before anyone called it a career.
              </p>
              <p style={{ marginBottom: 22 }}>
                I completed my MBBS at D.Y. Patil Medical College, Pune in 2014. I was already experimenting — using Google Glass to live-stream surgeries, one of the first in India to do so. But the pull toward building was too strong. San Francisco. A 480-hour full-stack bootcamp at General Assembly. Stanford GSB's Innovative Healthcare Leadership program. Self-teaching code from zero while holding a medical degree. I wanted to be dangerous with both.
              </p>
              <p style={{ marginBottom: 22 }}>
                In 2017 I co-founded Global Esports — India's first VC-backed esports organization. We won the Valorant Conqueror Championship. Riot Games selected us as one of 10 permanent VCT Pacific franchise partners globally. We stayed profitable while 18+ Indian esports competitors shut down in 2024. Alongside that: 100M+ personal views across platforms, 5B+ generated for creators and brands, two TEDx stages, a contribution to a Tribeca Film Festival-winning film, and national rankings in inline speed skating. Today I build AI-native products, creator infrastructure, and the systems that let me operate at scale.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div style={{ marginTop: 72 }}>
              <Label>Timeline</Label>
              <div style={{ position: "relative", paddingLeft: 32, marginTop: 16 }}>
                <div style={{ position: "absolute", left: 6, top: 8, bottom: 0, width: 1, background: `linear-gradient(180deg, ${C.accent} 0%, ${C.border} 100%)` }} />

                {TIMELINE.map((t, i) => (
                  <Reveal key={t.yr} delay={0.04 * i}>
                    <div style={{ display: "flex", gap: 18, marginBottom: 22, alignItems: "flex-start", position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: -26,
                          top: 7,
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: i === TIMELINE.length - 1 ? C.accent : "#333",
                          boxShadow: i === TIMELINE.length - 1 ? `0 0 10px ${C.accent}66` : "none",
                        }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.textDim, minWidth: 36, fontFamily: F.body }}>{t.yr}</span>
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginTop: 16,
            }}
          >
            {WORK.map((w, i) => (
              <Reveal key={w.name} delay={0.08 * i}>
                <div
                  className="card"
                  onClick={() => w.url && window.open(w.url, "_blank")}
                  style={{
                    gridColumn: w.wide ? "span 2" : "span 1",
                    padding: 26,
                    height: "100%",
                    cursor: w.url ? "pointer" : "default",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, gap: 12 }}>
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700, color: C.white }}>{w.name}</h3>
                      <span style={{ display: "inline-block", padding: "4px 8px", borderRadius: 4, background: C.surfaceStrong, color: C.textDim, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                        {w.tag}
                      </span>
                    </div>
                    <StatusDot status={w.status} />
                  </div>

                  <p style={{ margin: 0, fontSize: 14, color: C.textMid, lineHeight: 1.7, fontWeight: 300 }}>{w.line}</p>

                  {w.url && <p style={{ margin: "12px 0 0 0", fontSize: 12, color: C.accent, fontWeight: 600 }}>View →</p>}
                </div>
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
            <SectionTitle>100M+ lifetime views across platforms.</SectionTitle>
          </Reveal>

          <div style={{ display: "grid", gap: 20, marginTop: 32 }}>
            {PLATFORMS.map((p, i) => {
              const maxSubs = 110000;
              const pct = (p.subs / maxSubs) * 100;

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
            <Label>Current Focus — Q2 2026</Label>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {CONTACT_ROUTES.map((r, i) => (
              <Reveal key={r.label} delay={0.08 * i}>
                <a href={`mailto:rushindra@globalesports.com?subject=${encodeURIComponent(r.label)}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card" style={{ padding: 22, height: "100%" }}>
                    <h4 style={{ margin: "0 0 6px 0", fontSize: 15, fontWeight: 600, color: C.white }}>{r.label}</h4>
                    <p style={{ margin: 0, fontSize: 13, color: C.textDim, lineHeight: 1.5, fontWeight: 300 }}>{r.desc}</p>
                    <p style={{ margin: "10px 0 0 0", fontSize: 12, color: C.accent, fontWeight: 600 }}>Reach out →</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div style={{ display: "flex", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener" style={{ color: C.textDim, textDecoration: "none", fontSize: 13, fontWeight: 400, transition: "color 0.2s" }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.accent)} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = C.textDim)}>
                  {s.name} →
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ========== FOOTER ========== */}
      <footer style={{ padding: "36px clamp(24px, 5vw, 64px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ margin: 0, fontSize: 12, color: C.textDim, fontWeight: 300 }}>© 2026 Dr. Rushindra Sinha</p>
        <p style={{ margin: 0, fontSize: 11, color: C.textDim, fontWeight: 300, fontFamily: F.display, fontStyle: "italic" }}>From gaming servers to AI systems.</p>
      </footer>
    </div>
  );
}

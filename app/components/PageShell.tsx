import Link from "next/link";

// Shared chrome for the standalone trust-anchor pages (/about, /contact,
// /privacy). Deliberately server-rendered and dependency-free so these pages
// stay fast and fully readable without JavaScript — agents parse them directly.
export const C = {
  bg: "#08080a",
  surface: "rgba(255,255,255,0.025)",
  border: "rgba(255,255,255,0.07)",
  accent: "#9cff57",
  text: "#e2e0da",
  textMid: "#98958d",
  textDim: "#585450",
  white: "#ffffff",
};

export function PageShell({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily: "var(--font-body)",
        padding: "clamp(40px, 8vh, 88px) clamp(24px, 5vw, 64px) 96px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            fontSize: 13,
            color: C.textDim,
            textDecoration: "none",
            fontWeight: 400,
          }}
        >
          ← rushindra.com
        </Link>

        <p
          style={{
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: C.accent,
            margin: "40px 0 18px 0",
            fontWeight: 600,
          }}
        >
          {label}
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 6vw, 56px)",
            lineHeight: 1.06,
            margin: "0 0 36px 0",
            fontWeight: 400,
            letterSpacing: -1,
          }}
        >
          {title}
        </h1>

        {children}

        <footer
          style={{
            marginTop: 72,
            paddingTop: 28,
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            fontSize: 13,
          }}
        >
          {[
            ["/", "Home"],
            ["/about", "About"],
            ["/contact", "Contact"],
            ["/privacy", "Privacy"],
            ["/llms.txt", "llms.txt"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              style={{ color: C.textDim, textDecoration: "none" }}
            >
              {label}
            </Link>
          ))}
        </footer>
      </div>
    </main>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 16,
        color: C.textMid,
        lineHeight: 1.75,
        fontWeight: 300,
        margin: "0 0 22px 0",
      }}
    >
      {children}
    </p>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 20,
        color: C.white,
        fontWeight: 600,
        margin: "44px 0 16px 0",
      }}
    >
      {children}
    </h2>
  );
}

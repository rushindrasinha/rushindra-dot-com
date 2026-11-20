"use client";
import { useLayoutEffect, useState } from "react";

type Theme = "dark" | "light";

const stored = (): Theme => {
  if (typeof window === "undefined") return "dark";
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
};

/**
 * Shares the `theme` localStorage key with the home page, so the choice follows the
 * visitor between / and /live. The icon swap is pure CSS off `[data-theme]`, so it never
 * flashes the wrong glyph before hydration; state only drives the label.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(stored);

  // The page's inline script sets the attribute before paint. React's dev-only remount
  // drops attributes it does not own, so re-assert it here. No-op in production.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const flip = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="lv-theme"
      onClick={flip}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
    >
      <svg className="lv-i-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4.2" />
        <g strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 2.4v2.6M12 19v2.6M2.4 12H5M19 12h2.6M5.2 5.2 7 7M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8" />
        </g>
      </svg>
      <svg className="lv-i-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20.3 14.9A8.6 8.6 0 0 1 9.1 3.7a8.6 8.6 0 1 0 11.2 11.2z" />
      </svg>
    </button>
  );
}

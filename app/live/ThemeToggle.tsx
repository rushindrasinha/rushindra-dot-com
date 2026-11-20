"use client";
import { useLayoutEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const stored = (): Theme => {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
};

// The <html data-theme> attribute is the single source of truth: the page's inline
// script sets it before paint, this button flips it. Subscribing to it (instead of
// seeding state from localStorage) keeps the aria-label correct after hydration.
const subscribe = (cb: () => void) => {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => o.disconnect();
};
const current = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const serverTheme = (): Theme => "dark";

/**
 * Shares the `theme` localStorage key with the home page, so the choice follows the
 * visitor between / and /live. The icon swap is pure CSS off `[data-theme]`, so it never
 * flashes the wrong glyph before hydration.
 */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, current, serverTheme);

  // React's dev-only remount can drop attributes it does not own; re-assert the stored
  // choice if the attribute went missing. No-op in production.
  useLayoutEffect(() => {
    if (!document.documentElement.dataset.theme) document.documentElement.dataset.theme = stored();
  }, []);

  const flip = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {}
    document.documentElement.dataset.theme = next;
  };

  return (
    <button
      type="button"
      className="lv-theme"
      onClick={flip}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
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

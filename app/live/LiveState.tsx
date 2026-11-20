"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const PLATFORMS = ["youtube", "twitch", "kick"] as const;
export type Platform = (typeof PLATFORMS)[number];
export type Snapshot = Record<Platform, boolean> & { live: boolean };

export const LABEL: Record<Platform, string> = { youtube: "YouTube", twitch: "Twitch", kick: "Kick" };

const Ctx = createContext<Snapshot | null>(null);

/** Null until the first /api/live response lands, so server and client agree on "off air". */
export const useLive = () => useContext(Ctx);

export const liveOn = (s: Snapshot | null) => (s ? PLATFORMS.filter((p) => s[p]) : []);

/**
 * The page's single /api/live fetch. Everything that needs live state either reads the
 * context (status bar, monitor) or reads the attributes this sets on the `.lv` root:
 * `data-live="on|off"` and `data-live-platforms="twitch kick"`, which let plain CSS light
 * up the channel blocks. The `is-live` class from v2 is still toggled on each block.
 */
export default function LiveState({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<Snapshot | null>(null);

  useEffect(() => {
    let on = true;
    const tick = () =>
      fetch("/api/live")
        .then((r) => r.json())
        .then((j) => on && setS(j))
        .catch(() => {});
    tick();
    const id = setInterval(tick, 45000);
    return () => {
      on = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".lv");
    if (!root) return;
    root.dataset.live = s?.live ? "on" : "off";
    root.dataset.livePlatforms = liveOn(s).join(" ");
    PLATFORMS.forEach((p) => {
      document.querySelectorAll(`.lv-ch[data-p="${p}"]`).forEach((el) => el.classList.toggle("is-live", !!s?.[p]));
    });
  }, [s]);

  return <Ctx.Provider value={s}>{children}</Ctx.Provider>;
}

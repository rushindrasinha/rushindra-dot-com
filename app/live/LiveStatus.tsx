"use client";
import { useEffect, useState } from "react";

type S = { youtube: boolean; twitch: boolean; kick: boolean; live: boolean };

export default function LiveStatus() {
  const [s, setS] = useState<S | null>(null);
  useEffect(() => {
    let on = true;
    const tick = () => fetch("/api/live").then((r) => r.json()).then((j) => on && setS(j)).catch(() => {});
    tick();
    const id = setInterval(tick, 45000);
    return () => { on = false; clearInterval(id); };
  }, []);
  useEffect(() => {
    if (!s) return;
    (["youtube", "twitch", "kick"] as const).forEach((p) => {
      document.querySelector(`.lv-card[data-p="${p}"]`)?.classList.toggle("is-live", s[p]);
    });
  }, [s]);
  const live = !!s?.live;
  return (
    <span className={`lv-badge${live ? " lv-badge-live" : ""}`} role="status">
      <span className="lv-dot" aria-hidden="true" />
      {live ? "Live now" : "Streams"}
    </span>
  );
}

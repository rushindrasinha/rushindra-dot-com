"use client";
import { useEffect, useState } from "react";

type S = { youtube: boolean; twitch: boolean; kick: boolean; live: boolean };

const PLATFORMS = ["youtube", "twitch", "kick"] as const;
const LABEL: Record<(typeof PLATFORMS)[number], string> = { youtube: "YouTube", twitch: "Twitch", kick: "Kick" };

const ist = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());

export default function LiveStatus() {
  const [s, setS] = useState<S | null>(null);
  // Null until mounted so the server and first client render agree.
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    let on = true;
    const tick = () => fetch("/api/live").then((r) => r.json()).then((j) => on && setS(j)).catch(() => {});
    tick();
    const id = setInterval(tick, 45000);
    return () => { on = false; clearInterval(id); };
  }, []);

  useEffect(() => {
    const tick = () => setClock(ist());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!s) return;
    PLATFORMS.forEach((p) => {
      document.querySelectorAll(`.lv-row[data-p="${p}"]`).forEach((el) => el.classList.toggle("is-live", s[p]));
    });
  }, [s]);

  const live = !!s?.live;
  const on = PLATFORMS.filter((p) => s?.[p]).map((p) => LABEL[p]);

  return (
    <span className={`lv-status lv-mono${live ? " is-on" : ""}`} role="status">
      <span className="lv-dot" aria-hidden="true" />
      <span className="lv-label">{live ? `On air · Now on ${on.join(", ")}` : "Off air"}</span>
      <span aria-hidden="true">·</span>
      <span className="lv-clock">{clock ?? "--:--"} IST</span>
    </span>
  );
}

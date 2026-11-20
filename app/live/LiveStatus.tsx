"use client";
import { useEffect, useState } from "react";
import { LABEL, liveOn, useLive } from "./LiveState";

const ist = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());

export default function LiveStatus() {
  const s = useLive();
  // Null until mounted so the server and first client render agree.
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setClock(ist());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const on = liveOn(s).map((p) => LABEL[p]);
  const live = on.length > 0;

  return (
    <span className={`lv-status lv-mono${live ? " is-on" : ""}`} role="status">
      <span className="lv-dot" aria-hidden="true" />
      <span className="lv-label">{live ? `On air · Now on ${on.join(", ")}` : "Off air"}</span>
      <span aria-hidden="true">·</span>
      <span className="lv-clock">{clock ?? "--:--"} IST</span>
    </span>
  );
}

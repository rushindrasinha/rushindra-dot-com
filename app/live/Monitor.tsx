"use client";
import { useEffect, useState } from "react";
import { LABEL, type Platform, liveOn, useLive } from "./LiveState";

/** HH:MM:SS:FF since the monitor went live. Only runs while on air. */
function useTimecode(active: boolean) {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const fmt = (ms: number) => {
      const s = Math.floor(ms / 1000);
      return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60, Math.floor((ms % 1000) / 40)]
        .map((n) => String(n).padStart(2, "0"))
        .join(":");
    };
    const id = setInterval(() => setTc(fmt(Date.now() - start)), 100);
    return () => clearInterval(id);
  }, [active]);
  return tc;
}

export default function Monitor({ links }: { links: Record<Platform, string> }) {
  const s = useLive();
  const on = liveOn(s);
  const live = on.length > 0;
  const first = on[0];
  const tc = useTimecode(live);

  const screen = (
    <span className="lv-screen">
      <span className="lv-bars" aria-hidden="true" />
      <span className="lv-feed" aria-hidden="true">
        {/* 400x400 source, never rendered wider than the 420px screen. The duotone and
            scanlines carry the softness. Plain <img>: no optimiser, no extra request. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rushi.jpg" alt="" width={400} height={400} decoding="async" />
      </span>
      <span className="lv-vf lv-vf-a" aria-hidden="true" />
      <span className="lv-vf lv-vf-b" aria-hidden="true" />
      <span className="lv-roll" aria-hidden="true" />
      <span className="lv-scan" aria-hidden="true" />
      <span className="lv-gloss" aria-hidden="true" />

      <span className="lv-osd lv-rec">
        <span className="lv-rec-d" aria-hidden="true" />
        Rec
      </span>
      <span className="lv-osd lv-tc">{tc}</span>
      <span className="lv-osd lv-ch00">CH 00</span>
      <span className="lv-plate">
        Off air
        <i aria-hidden="true">·</i>
        Back soon
      </span>
      <span className="lv-now">{first ? `Now on ${LABEL[first]}` : "Now on air"}</span>
    </span>
  );

  return (
    <div className="lv-mon-wrap">
      <div className="lv-mon" data-on={live ? "on" : "off"}>
        <span className="lv-tally" aria-hidden="true" />
        {live && first ? (
          <a
            className="lv-mon-plate"
            href={links[first]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch the live stream on ${LABEL[first]}`}
          >
            {screen}
          </a>
        ) : (
          <div className="lv-mon-plate">{screen}</div>
        )}
      </div>

      <div className="lv-l3">
        <span className="lv-l3-bar" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rushi-avatar.jpg" alt="" width={56} height={56} decoding="async" />
        <span>
          <span className="lv-l3-n">Dr. Rushindra Sinha</span>
          <span className="lv-l3-m lv-mono">Host · rushindra.com</span>
        </span>
      </div>
    </div>
  );
}

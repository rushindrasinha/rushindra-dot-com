"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { Bot } from "../lib/bots";
import s from "./bots.module.css";

type Cat = { name: string; color: string; count: number };

export const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M6.5 9.5a3 3 0 0 0 4.2 0l2-2a3 3 0 0 0-4.2-4.2l-.6.6M9.5 6.5a3 3 0 0 0-4.2 0l-2 2a3 3 0 0 0 4.2 4.2l.6-.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Clock = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 4.8V8l2.2 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Shield = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 1.8 13 3.6v4c0 3-2.1 5.3-5 6.6-2.9-1.3-5-3.6-5-6.6v-4L8 1.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export function CopyLink({ slug, className }: { slug: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`${className ?? s.ghost} ${done ? s.copied : ""}`}
      aria-label={done ? "Link copied" : "Copy link to this bot"}
      title="Copy link"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(`https://rushindra.com/bots/${slug}`);
          setDone(true);
          track("bot_copy_link", { slug });
          setTimeout(() => setDone(false), 1600);
        } catch {}
      }}
    >
      {done ? <Check /> : <LinkIcon />}
    </button>
  );
}

export function BotCard({ bot, color, from }: { bot: Bot; color: string; from: string }) {
  return (
    <article className={s.card} style={{ ["--c" as string]: color }}>
      <div className={s.cardHead}>
        <span className={s.icon} aria-hidden>
          {bot.emoji}
        </span>
        <span className={s.cat}>{bot.category}</span>
      </div>
      <h3 className={s.cardName}>
        <Link href={`/bots/${bot.slug}`}>{bot.name}</Link>
      </h3>
      <p className={s.oneLiner}>{bot.oneLiner}</p>
      {(bot.runsOnItsOwn || bot.asksFirst) && (
        <div className={s.badges}>
          {bot.runsOnItsOwn && (
            <span className={s.badge}>
              <Clock /> Runs on a schedule
            </span>
          )}
          {bot.asksFirst && (
            <span className={s.badge}>
              <Shield /> Asks before it acts
            </span>
          )}
        </div>
      )}
      <div className={s.cardFoot}>
        <a
          className={s.open}
          href={`/go/${bot.slug}?ref=${from}`}
          target="_blank"
          rel="noopener"
          onClick={() => track("bot_open", { slug: bot.slug, from })}
        >
          Open in {bot.platform === "Grok Bot" ? "Grok" : bot.platform} <ArrowOut />
        </a>
        <CopyLink slug={bot.slug} />
      </div>
    </article>
  );
}

export default function BotGrid({ bots, cats }: { bots: Bot[]; cats: Cat[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const [missing, setMissing] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const colors = useMemo(() => Object.fromEntries(cats.map((c) => [c.name, c.color])), [cats]);

  // Filters live in the URL (?c=games&q=clip) so a filtered view is shareable.
  // Read once after hydration: the static HTML always renders the full list.
  const hydrated = useRef(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get("c");
    const match = cats.find((x) => x.name.toLowerCase() === c?.toLowerCase());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL, an external source
    if (match) setCat(match.name);
    if (p.get("q")) setQ(p.get("q")!);
    if (p.get("missing")) setMissing(p.get("missing"));
  }, [cats]);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    const p = new URLSearchParams();
    if (cat) p.set("c", cat.toLowerCase());
    if (q.trim()) p.set("q", q.trim());
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [q, cat]);

  // Searches are the demand signal: what people want that the shelf may not have yet.
  useEffect(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 3) return;
    const t = setTimeout(() => track("bot_search", { q: term.slice(0, 60) }), 1200);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        input.current?.focus();
      }
      if (e.key === "Escape" && typing === input.current) {
        setQ("");
        input.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(e.intersectionRatio < 1), {
      threshold: [1],
      rootMargin: "-1px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return bots.filter((b) => {
      if (cat && b.category !== cat) return false;
      if (!terms.length) return true;
      const hay = [b.name, b.oneLiner, b.description, b.category, b.platform, ...b.tags, ...b.uses]
        .join(" ")
        .toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [bots, q, cat]);

  const filtered = Boolean(cat || q.trim());

  return (
    <section aria-label="All bots">
      <div ref={bar} className={`${s.toolbar} ${stuck ? s.toolbarStuck : ""}`}>
        <div className={s.toolbarInner}>
          <label className={s.search}>
            <span className={s.searchIcon} aria-hidden>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <input
              ref={input}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search bots"
              aria-label="Search bots"
              autoComplete="off"
              spellCheck={false}
            />
            <span className={s.kbd} aria-hidden>
              /
            </span>
          </label>
          <div className={s.chips} role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`${s.chip} ${cat === null ? s.chipOn : ""}`}
              aria-pressed={cat === null}
              onClick={() => setCat(null)}
            >
              All <i>{bots.length}</i>
            </button>
            {cats.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`${s.chip} ${cat === c.name ? s.chipOn : ""}`}
                aria-pressed={cat === c.name}
                style={{ ["--c" as string]: c.color }}
                onClick={() => setCat(cat === c.name ? null : c.name)}
              >
                <span className={s.chipDot} aria-hidden />
                {c.name} <i>{c.count}</i>
              </button>
            ))}
          </div>
        </div>
      </div>

      {missing && (
        <p className={s.notice} role="status">
          There&apos;s no bot at &ldquo;{missing}&rdquo; any more, or the link had a typo. Here&apos;s everything that&apos;s live.
          <button type="button" aria-label="Dismiss" onClick={() => setMissing(null)}>
            ×
          </button>
        </p>
      )}

      <h2 className={s.srOnly}>All bots</h2>
      <div className={`${s.resultLine} ${s.mono}`} aria-live="polite">
        <span>
          {filtered ? `${shown.length} of ${bots.length} bots` : `All ${bots.length} bots`}
        </span>
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setCat(null);
            }}
          >
            Clear
          </button>
        )}
      </div>

      <div className={s.grid}>
        {shown.map((b) => (
          <BotCard key={b.slug} bot={b} color={colors[b.category]} from="bots" />
        ))}
        {shown.length === 0 && (
          <div className={s.empty}>
            Nothing matches &ldquo;{q}&rdquo; yet.{" "}
            <a href={`mailto:sinha@rushindra.com?subject=${encodeURIComponent(`Bot idea: ${q}`)}`} style={{ color: "var(--accent)" }}>
              Tell me what you need
            </a>{" "}
            and it might be the next one.
          </div>
        )}
      </div>
    </section>
  );
}

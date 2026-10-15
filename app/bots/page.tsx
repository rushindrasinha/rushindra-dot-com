import type { Metadata } from "next";
import Link from "next/link";
import { BOTS, CATEGORIES, getBot } from "../lib/bots";
import BotGrid from "./BotGrid";
import s from "./bots.module.css";

const TITLE = "Bots by Rushi: AI bots you can open and run";
const DESC = `${BOTS.length} Grok Bots built by Dr. Rushindra Sinha for clips, posts, games, brand deals, merch and more. Open one and it's yours to run.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/bots" },
  openGraph: { title: TITLE, description: DESC, url: "https://rushindra.com/bots", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, creator: "@irushi" },
};

const START_HERE: { slug: string; when: string; why: string }[] = [
  { slug: "maker", when: "Want your own", why: "Describe a job and it builds a focused bot for it. Nothing gets created until you say yes." },
  { slug: "cos", when: "Running a few", why: "A chief of staff that audits your bots every weekday and watches your usage limits." },
  { slug: "clip-finder", when: "Quick win", why: "Paste one transcript, get 5 to 8 ranked clips with hooks and captions. Nothing to connect." },
];

export default function BotsPage() {
  const cats = Object.entries(CATEGORIES)
    .map(([name, v]) => ({ name, color: v.color, count: BOTS.filter((b) => b.category === name).length }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
  const asks = BOTS.filter((b) => b.asksFirst).length;
  const scheduled = BOTS.filter((b) => b.runsOnItsOwn).length;
  const updated = new Date(BOTS.map((b) => b.addedAt).sort().at(-1)!).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESC,
    url: "https://rushindra.com/bots",
    author: { "@type": "Person", name: "Dr. Rushindra Sinha", url: "https://rushindra.com" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: BOTS.length,
      itemListElement: BOTS.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: b.name,
          description: b.oneLiner,
          url: `https://rushindra.com/bots/${b.slug}`,
          applicationCategory: `${b.category} bot`,
          operatingSystem: b.platform,
          author: { "@type": "Person", name: "Dr. Rushindra Sinha", url: "https://rushindra.com" },
        },
      })),
    },
  };

  return (
    <main className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={s.wrap}>
        <nav className={s.topbar}>
          <Link href="/">← rushindra.com</Link>
          <a href="https://x.com/irushi" target="_blank" rel="noopener">
            @irushi
          </a>
        </nav>

        <header className={s.hero}>
          <div>
            <p className={`${s.kicker} ${s.mono}`}>
              <span className={s.pulse} aria-hidden />
              {BOTS.length} live · Grok Bots
            </p>
            <h1 className={s.h1}>
              I build bots.
              <br />
              <em>Take one.</em>
            </h1>
          </div>
          <div>
            <p className={s.lead}>
              Every bot I&apos;ve built, from clipping VODs to closing brand deals. Open one in Grok and you get
              your own copy to run and change. <strong>Most of them draft first and ask before they act.</strong>
            </p>
            <div className={s.stats}>
              <div className={s.stat}>
                <b>{BOTS.length}</b>
                <span>Bots</span>
              </div>
              <div className={s.stat}>
                <b>{cats.length}</b>
                <span>Categories</span>
              </div>
              <div className={s.stat}>
                <b>{asks}</b>
                <span>Ask first</span>
              </div>
              <div className={s.stat}>
                <b>{scheduled}</b>
                <span>On a schedule</span>
              </div>
            </div>
          </div>
        </header>

        <h2 className={s.srOnly}>Start here</h2>
        <section className={s.startHere} aria-label="Start here">
          {START_HERE.map((p) => {
            const b = getBot(p.slug);
            if (!b) return null;
            return (
              <Link
                key={b.slug}
                href={`/bots/${b.slug}`}
                className={s.pick}
                style={{ ["--c" as string]: CATEGORIES[b.category].color }}
              >
                <span className={s.pickWhen}>{p.when}</span>
                <span className={s.pickName}>
                  <span aria-hidden>{b.emoji}</span> {b.name}
                </span>
                <p>{p.why}</p>
              </Link>
            );
          })}
        </section>

        <BotGrid bots={BOTS} cats={cats} />

        <section className={s.submit}>
          <div>
            <h2>Built a bot worth sharing?</h2>
            <p>
              Right now this shelf is mine. It opens up soon, to other builders and to more than Grok. Send me
              yours and I&apos;ll take a look.
            </p>
          </div>
          <a
            className={s.submitBtn}
            href={`mailto:sinha@rushindra.com?subject=${encodeURIComponent("Bot for rushindra.com/bots")}&body=${encodeURIComponent("Bot name:\nLink:\nWhat it does (one line):\nPlatform:\n")}`}
          >
            Submit a bot
          </a>
        </section>

        <footer className={s.footer}>
          <span>Built by Rushi. Updated {updated}.</span>
          <span>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </span>
        </footer>
      </div>
    </main>
  );
}

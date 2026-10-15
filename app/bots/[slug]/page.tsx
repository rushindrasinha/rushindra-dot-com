import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOTS, CATEGORIES, getBot, related } from "../../lib/bots";
import { ArrowOut, BotCard, CopyLink } from "../BotGrid";
import s from "../bots.module.css";

// One shareable page per bot: rushindra.com/bots/<slug>. This is the link to
// post on X; /go/<slug> is the direct jump to the template.

export const dynamicParams = false;

export function generateStaticParams() {
  return BOTS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const bot = getBot((await params).slug);
  if (!bot) return {};
  const title = `${bot.name}: a ${bot.platform} by Rushi`;
  return {
    title,
    description: bot.oneLiner,
    alternates: { canonical: `/bots/${bot.slug}` },
    openGraph: { title, description: bot.oneLiner, url: `https://rushindra.com/bots/${bot.slug}`, type: "website" },
    twitter: { card: "summary_large_image", title, description: bot.oneLiner, creator: "@irushi" },
  };
}

export default async function BotPage({ params }: { params: Promise<{ slug: string }> }) {
  const bot = getBot((await params).slug);
  if (!bot) notFound();
  const color = CATEGORIES[bot.category].color;
  const more = related(bot);
  // The description usually opens with the one-liner; show only what it adds.
  const rest = bot.description.startsWith(bot.oneLiner)
    ? bot.description.slice(bot.oneLiner.length).trim()
    : bot.description;
  // Newer templates publish one short description and no use list; skip the empty panel.
  const hasDetail = bot.uses.length > 0 || Boolean(rest);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: bot.name,
    description: bot.description,
    applicationCategory: `${bot.category} bot`,
    operatingSystem: bot.platform,
    url: `https://rushindra.com/bots/${bot.slug}`,
    author: { "@type": "Person", name: "Dr. Rushindra Sinha", url: "https://rushindra.com" },
  };

  return (
    <main className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={s.wrap}>
        <nav className={s.topbar}>
          <Link href="/bots">← All bots</Link>
          <Link href="/">rushindra.com</Link>
        </nav>

        <article className={s.detail} style={{ ["--c" as string]: color }}>
          <div className={s.detailHead}>
            <span className={`${s.icon} ${s.detailIcon}`} aria-hidden>
              {bot.emoji}
            </span>
            <div>
              <Link href={`/bots?c=${bot.category.toLowerCase()}`} className={s.cat} style={{ textDecoration: "none" }}>
                {bot.category} · {bot.platform}
              </Link>
              <h1 className={s.detailName}>{bot.name}</h1>
            </div>
          </div>

          <p className={s.detailLead}>{bot.oneLiner}</p>

          <div className={s.actions}>
            <a className={s.open} href={`/go/${bot.slug}?ref=detail`} target="_blank" rel="noopener">
              Open in {bot.platform === "Grok Bot" ? "Grok" : bot.platform} <ArrowOut />
            </a>
            <CopyLink slug={bot.slug} className={s.share} />
          </div>

          <div className={s.facts} style={hasDetail ? undefined : { gridTemplateColumns: "minmax(0, 1fr)", maxWidth: 520 }}>
            {hasDetail && (
              <section className={s.panel}>
                <h2>What it does</h2>
                {bot.uses.length > 0 && (
                  <ul className={s.uses}>
                    {bot.uses.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                )}
                {rest && <p style={{ marginTop: bot.uses.length ? 20 : 0 }}>{rest}</p>}
              </section>
            )}

            <section className={s.panel}>
              <h2>Before you open it</h2>
              <dl>
                {bot.needs && (
                  <div className={s.factRow}>
                    <dt>Connect</dt>
                    <dd>{bot.needs.length ? bot.needs.join(", ") : "Nothing. It works from what you give it."}</dd>
                  </div>
                )}
                {bot.runsOnItsOwn && (
                  <div className={s.factRow}>
                    <dt>Runs on a schedule</dt>
                    <dd style={{ textTransform: "capitalize" }}>{bot.runsOnItsOwn}</dd>
                  </div>
                )}
                <div className={s.factRow}>
                  <dt>Control</dt>
                  <dd>
                    {bot.asksFirst
                      ? "Drafts and plans only. It asks before it sends, posts or spends."
                      : "Check the template's own rules after you open it."}
                  </dd>
                </div>
                <div className={s.factRow}>
                  <dt>Your copy</dt>
                  <dd>Opening it gives you your own version to rename and change.</dd>
                </div>
              </dl>
            </section>
          </div>

          {more.length > 0 && (
            <section className={s.more}>
              <h2 className={s.mono}>More like this</h2>
              <div className={s.moreGrid}>
                {more.map((b) => (
                  <BotCard key={b.slug} bot={b} color={CATEGORIES[b.category].color} from={`related-${bot.slug}`} />
                ))}
              </div>
            </section>
          )}
        </article>

        <footer className={s.footer}>
          <span>Built by Rushi.</span>
          <span>
            <Link href="/bots">All bots</Link>
            <Link href="/">Home</Link>
            <Link href="/contact">Contact</Link>
          </span>
        </footer>
      </div>
    </main>
  );
}

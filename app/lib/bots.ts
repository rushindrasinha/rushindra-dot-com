import raw from "../../data/bots.json";

// Single source for /bots, /bots/[slug], /go/[slug], the sitemap and llms.txt.
// Validated at import time, so a bad entry in data/bots.json fails the build
// instead of shipping a broken card.

export type Bot = {
  slug: string; // never changes after launch: /go/<slug> links are shared publicly
  aliases: string[]; // old slugs from before a rename; /go and /bots redirect them to slug
  name: string;
  oneLiner: string;
  description: string;
  platform: string;
  link: string;
  category: string;
  tags: string[];
  emoji: string;
  status: "live" | "coming-soon" | "hidden";
  uses: string[];
  needs: string[] | null; // null = not confirmed, so the UI says nothing
  runsOnItsOwn: string | null;
  asksFirst: boolean;
  featured: boolean;
  addedAt: string;
};

export const CATEGORIES: Record<string, { color: string; blurb: string }> = {
  Content: { color: "#5ebaff", blurb: "Clips, posts, scripts and stories" },
  Growth: { color: "#ffb547", blurb: "Leads, deals, giveaways and PR" },
  Creative: { color: "#ff7ab6", blurb: "AI image and video" },
  Games: { color: "#b48cff", blurb: "Build, polish and grow games" },
  Operations: { color: "#9cff57", blurb: "Run your bots and your day" },
  Engineering: { color: "#4fe3c1", blurb: "Ship code and sites" },
  Commerce: { color: "#ff8a5c", blurb: "Sell merch" },
  Productivity: { color: "#ffe066", blurb: "Inbox, money, admin and memory" },
  Personal: { color: "#ff6b6b", blurb: "Trips, meals, study, fitness and family" },
  Business: { color: "#d4b483", blurb: "Run and grow a small business" },
};

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function validate(list: unknown[]): Bot[] {
  const seen = new Set<string>();
  return list.map((entry, i) => {
    const b = entry as Bot;
    const fail = (why: string) => {
      throw new Error(`data/bots.json entry ${i} (${b?.slug ?? "?"}): ${why}`);
    };
    if (!b.slug || !SLUG.test(b.slug)) fail("slug must be lowercase a-z, 0-9, hyphens");
    if (seen.has(b.slug)) fail("duplicate slug");
    seen.add(b.slug);
    if (!b.name || b.name.length > 40) fail("name missing or over 40 chars");
    if (!b.oneLiner || b.oneLiner.length > 180) fail("oneLiner missing or over 180 chars");
    if (!CATEGORIES[b.category]) fail(`unknown category "${b.category}"`);
    if (!["live", "coming-soon", "hidden"].includes(b.status)) fail("bad status");
    if (b.status === "live" && !/^https:\/\//.test(b.link)) fail("live bot needs an https link");
    if (!Array.isArray(b.tags) || !Array.isArray(b.uses)) fail("tags and uses must be arrays");
    if (!Array.isArray(b.aliases)) fail("aliases must be an array");
    for (const a of b.aliases) {
      if (!SLUG.test(a) || seen.has(a)) fail(`alias "${a}" is malformed or already taken`);
      seen.add(a);
    }
    return b;
  });
}

export const ALL_BOTS = validate(raw as unknown[]);
{
  const slugs = new Set(ALL_BOTS.map((b) => b.slug));
  const clash = ALL_BOTS.flatMap((b) => b.aliases).find((a) => slugs.has(a));
  if (clash) throw new Error(`data/bots.json: alias "${clash}" is also a live slug`);
}

// What the public sees, in file order. Featured bots get the "Start here" row instead of the top of the grid.
export const BOTS = ALL_BOTS.filter((b) => b.status !== "hidden");

export function getBot(slug: string): Bot | undefined {
  return BOTS.find((b) => b.slug === slug);
}

// For /go: a link shared before a rename still reaches the bot.
export function getBotOrAlias(slug: string): Bot | undefined {
  return getBot(slug) ?? BOTS.find((b) => b.aliases.includes(slug));
}

export function related(bot: Bot, n = 3): Bot[] {
  // Same category first, then featured bots to fill the row.
  const same = BOTS.filter((b) => b.slug !== bot.slug && b.category === bot.category);
  const rest = BOTS.filter((b) => b.slug !== bot.slug && b.category !== bot.category && b.featured);
  return [...same, ...rest].slice(0, n);
}

export const goUrl = (slug: string) => `/go/${slug}`;

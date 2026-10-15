import { BOTS, CATEGORIES, getBot } from "../../lib/bots";
import { botsOg, ogSize } from "../og";

export const alt = "A bot by Rushi";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return BOTS.map((b) => ({ slug: b.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const bot = getBot((await params).slug)!;
  return botsOg({
    kicker: `${bot.category} · ${bot.platform}`,
    title: bot.name,
    line: bot.oneLiner,
    color: CATEGORIES[bot.category].color,
  });
}

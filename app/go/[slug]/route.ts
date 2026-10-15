import { NextRequest, NextResponse } from "next/server";
import { track } from "@vercel/analytics/server";
import { getBot } from "../../lib/bots";

// rushindra.com/go/<slug>: the short, shareable link for every bot. Logs the
// click, then 302s to the bot's template page. Unknown slugs land on
// /bots?missing=<slug>, which shows a notice, so a dead link still finds the directory.
export async function GET(request: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const bot = getBot(slug);
  if (!bot || bot.status !== "live") {
    const to = new URL("/bots", request.url);
    to.searchParams.set("missing", slug.slice(0, 60));
    return NextResponse.redirect(to, 302);
  }

  const ref = request.nextUrl.searchParams.get("ref") ?? "direct";
  const event = {
    slug: bot.slug,
    category: bot.category,
    platform: bot.platform,
    ref: ref.slice(0, 40),
    referer: (request.headers.get("referer") ?? "").slice(0, 120),
    country: request.headers.get("x-vercel-ip-country") ?? "",
  };

  // Runtime logs are the plan-independent record; Vercel custom events are a
  // bonus where the plan supports them. Neither may ever block the redirect.
  console.log(JSON.stringify({ event: "bot_click", at: new Date().toISOString(), ...event }));
  try {
    await track("bot_click", event, { request });
  } catch {}

  return NextResponse.redirect(bot.link, {
    status: 302,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

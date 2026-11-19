// Live-status check for /live. Public endpoints only, no keys.
export const revalidate = 30;

const H = "rushindrasinha";
const UA = "Mozilla/5.0 (compatible; rushindra.com live check)";

async function twitch(): Promise<boolean> {
  try {
    const r = await fetch("https://gql.twitch.tv/gql", {
      method: "POST",
      headers: { "Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko", "Content-Type": "application/json" },
      body: JSON.stringify({ query: `query{user(login:"${H}"){stream{id}}}` }),
      signal: AbortSignal.timeout(6000),
    });
    const j = await r.json();
    return !!j?.data?.user?.stream?.id;
  } catch { return false; }
}

async function kick(): Promise<boolean> {
  try {
    const r = await fetch(`https://kick.com/api/v2/channels/${H}`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(6000) });
    const j = await r.json();
    return !!j?.livestream?.is_live;
  } catch { return false; }
}

async function youtube(): Promise<boolean> {
  try {
    const r = await fetch(`https://www.youtube.com/@${H}/live`, { headers: { "User-Agent": UA, "Accept-Language": "en" }, signal: AbortSignal.timeout(6000) });
    const t = await r.text();
    return t.includes('"isLiveNow":true');
  } catch { return false; }
}

export async function GET() {
  const [yt, tw, ki] = await Promise.all([youtube(), twitch(), kick()]);
  return Response.json(
    { youtube: yt, twitch: tw, kick: ki, live: yt || tw || ki },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
  );
}

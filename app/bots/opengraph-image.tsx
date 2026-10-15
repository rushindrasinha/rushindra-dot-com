import { BOTS } from "../lib/bots";
import { botsOg, ogSize } from "./og";

export const alt = "Bots by Rushi: AI bots you can open and run";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return botsOg({
    kicker: `${BOTS.length} live · Grok Bots`,
    title: "I build bots. Take one.",
    line: "Clips, posts, games, brand deals, merch. Open one and it's yours to run.",
    color: "#9cff57",
  });
}

import type { Metadata } from "next";
import { PageShell, P, H2, UL, LI, C } from "../components/PageShell";

export const metadata: Metadata = {
  title: "About — Dr. Rushindra Sinha",
  description:
    "Doctor, Stanford GSB executive-education alumnus, founder of Jeufy, founder of Global Esports, and AI builder. The full background behind rushindra.com.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Dr. Rushindra Sinha",
    description:
      "Doctor, Stanford GSB executive-education alumnus, founder of Jeufy, founder of Global Esports, and AI builder.",
    url: "https://rushindra.com/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <PageShell label="About" title="Doctor, gamer, founder. Building AI in public.">
      <P>
        Dr. Rushindra Sinha is a creator-founder working at the intersection of
        medicine, artificial intelligence, esports, and media. He is a practising
        doctor, holding a medical degree from D.Y. Patil Medical College in Navi
        Mumbai, and completed executive education at Stanford Graduate School of
        Business. The Stanford credential is an executive leadership programme,
        not a full MBA — a distinction he keeps explicit rather than letting it
        blur.
      </P>

      <P>
        His father&apos;s rule, and the one he still runs everything by:
        first, best, or only. First is the one thing nobody can take from you.
      </P>

      <P>
        He started building before he started practising. During medical school he
        taught himself to code and built a Ragnarok Online private server that grew
        to thousands of active players. It was acquired when he was eighteen — his
        first exit, and his first real lesson in products, monetisation, and running
        live internet infrastructure at scale. He kept freelancing as a web and app
        developer through his clinical years, and eventually recognised that the
        deeper instinct was building systems, not practising medicine.
      </P>

      <P>
        In medicine he pioneered the use of Google Glass to live-stream surgeries in
        India, work that was covered by national newspapers, and published on
        technological advances in 3D laparoscopic surgery. That clinical grounding
        still applies directly to how he thinks about healthcare AI, performance
        science, and the real-world consequences of automated decision-making.
      </P>

      <H2>Global Esports</H2>
      <P>
        He started Global Esports with Mohit Israney in July 2017, initially
        running it as a proprietorship under his own name. The pair formally
        incorporated the company and transferred the business over by
        November 2018, building what became India&apos;s first VC-backed
        esports organisation. Riot Games selected Global
        Esports as one of ten permanent VCT Pacific franchise partners globally,
        making it the youngest team in the VALORANT franchise league. The
        organisation has fielded 25+ rosters across 12+ titles, signed 200+ player
        contracts over the decade, won the VALORANT Conqueror Championship, and
        operated training facilities in South Korea and India. It reached
        profitability during a period when more than eighteen competing Indian
        esports organisations shut down. In 2026 it had its best season yet:
        Masters London, the VCT Pacific Stage 2 title (a 3-2 Grand Final over
        Nongshim RedForce), and the organisation&apos;s first-ever VALORANT
        Champions, played at Champions Shanghai 2026.
      </P>

      <H2>Jeufy</H2>
      <P>
        In October 2026 he founded and launched{" "}
        <a href="https://jeufy.com" target="_blank" rel="noopener noreferrer" style={{ color: C.accent }}>Jeufy</a>,
        a games studio that builds with AI agents. Its line is prompt to
        playable, and its slogan is &ldquo;We gamify anything.&rdquo; Jeufy
        Create lets anyone do the same from one sentence. The studio&apos;s first
        game, Dhamaka Arena, is an original, India-flavoured arena shooter that
        went from brief to live multiplayer in under 40 minutes, built with
        Jeufy. Jeufy is on X and Instagram as @JeufyGames.
      </P>

      <H2>Verticals.gg</H2>
      <P>
        Also in build:{" "}
        <a href="https://verticals.gg" target="_blank" rel="noopener noreferrer" style={{ color: C.accent }}>Verticals.gg</a>,
        a platform for AI-made vertical short dramas, 60 to 120 second episodes
        with a recurring cast. Anyone can watch and create, and its own studio
        makes the originals. Instagram: @verticalsgg.
      </P>

      <H2>Built and running</H2>
      <UL>
        <LI>
          Built Ares, his own AI operating system, on OpenClaw, from January 2026 —
          it runs his companies from a Discord command centre.
        </LI>
        <LI>
          Voice-first: no laptop, three microphones, five to ten thousand dictated
          words a day.
        </LI>
        <LI>
          Model-agnostic by design — the system is a script, and it pulls whichever
          model fits the task rather than locking to one vendor.
        </LI>
        <LI>
          By the numbers, counted from his own logs (August 2025 to 16 October
          2026, every figure a floor): 32B+ AI tokens processed, most of them
          cached context the agents re-read; 14,000+ AI coding sessions; 500+
          hours of his own hands-on time; 1,500+ commits across 36 repos since
          August.
        </LI>
        <LI>
          One human runs a 63-channel Discord command centre: 10,000+ messages
          in 68 days, with a median reply under a minute.
        </LI>
        <LI>
          At API list prices, his peak month of usage was worth about $15,000.
          What he actually paid over fourteen months: about $12,400 all-in,
          mostly two $200-a-month subscriptions.
        </LI>
        <LI>
          Built an agent whose only job is to build the other agents.
        </LI>
      </UL>

      <H2>Building now</H2>
      <P>
        His current focus: Jeufy, the prompt-to-playable game studio; Ares, his AI
        operating system, built on OpenClaw and run in public from a Discord
        command centre; an AI-native team, taught to master AI instead of being
        replaced by it; Aarees, an AI chief of staff that lives in Discord, now live; and Global Esports,
        2026 VCT Pacific Stage 2 champions, who played their first Champions at
        Shanghai 2026.
      </P>
      <P>
        Alongside that, his product work for the creator economy includes
        Aarees, an AI chief of staff for gaming that lives in your Discord server; thumbnail.gg, AI thumbnail generation for YouTube
        creators; and ClutchPass, an AI battle pass for competitive gamers. He also
        runs Mundhe Maps, a public map of Mumbai food businesses actioned by FDA
        Maharashtra, updated daily.
        Several smaller tools — xReader.ai, rushi.live (a prompt engine that turns
        plain-language intent into production-ready AI prompts), Operation Blackout
        (a one-prompt browser FPS, open source), and an open-source YouTube Shorts
        pipeline among them — are shipped and public.
      </P>

      <H2>Reach</H2>
      <P>
        He publishes across YouTube, Instagram, X, Twitch, and LinkedIn to a combined
        audience of roughly 250,000, with over 100 million lifetime personal views,
        and has spoken on two TEDx stages:{" "}
        <a href="https://youtu.be/DFw5fSh9D3I" target="_blank" rel="noopener noreferrer" style={{ color: C.accent }}>TEDxNMIMS</a>{" "}
        and{" "}
        <a href="https://youtu.be/KIZiMBvIeog" target="_blank" rel="noopener noreferrer" style={{ color: C.accent }}>TEDxSanjivani University</a>.
        The content sits where the work does: AI
        tooling, esports as a business, the creator economy, healthcare and AI, and
        the unedited version of building companies in public.
      </P>

      <div
        style={{
          marginTop: 44,
          padding: "20px 24px",
          border: `1px solid ${C.border}`,
          background: C.surface,
          borderRadius: 12,
        }}
      >
        <p style={{ margin: 0, fontSize: 14, color: C.textMid, lineHeight: 1.7, fontWeight: 300 }}>
          Machine-readable versions of this profile are published at{" "}
          <a href="/llms.txt" style={{ color: C.accent }}>/llms.txt</a> and{" "}
          <a href="/llm" style={{ color: C.accent }}>/llm</a>. Those are the
          authoritative self-declared source for AI systems.
        </p>
      </div>
    </PageShell>
  );
}

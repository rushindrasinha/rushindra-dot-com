import type { Metadata } from "next";
import { PageShell, P, H2, C } from "../components/PageShell";

export const metadata: Metadata = {
  title: "About — Dr. Rushindra Sinha",
  description:
    "Doctor, Stanford GSB executive-education alumnus, co-founder of Global Esports, and AI builder. The full background behind rushindra.com.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Dr. Rushindra Sinha",
    description:
      "Doctor, Stanford GSB executive-education alumnus, co-founder of Global Esports, and AI builder.",
    url: "https://rushindra.com/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <PageShell label="About" title="Doctor, founder, builder — in parallel.">
      <P>
        Dr. Rushindra Sinha is a creator-founder working at the intersection of
        medicine, artificial intelligence, esports, and media. He holds a medical
        degree from D.Y. Patil Medical College in Navi Mumbai, and completed
        executive education at Stanford Graduate School of Business. The Stanford
        credential is an executive leadership programme, not a full MBA — a
        distinction he keeps explicit rather than letting it blur.
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
        He co-founded Global Esports with Mohit Israney, building what became
        India&apos;s first VC-backed esports organisation. Riot Games selected Global
        Esports as one of ten permanent VCT Pacific franchise partners globally,
        making it the youngest team in the VALORANT franchise league. The
        organisation has fielded 25+ rosters across 12+ titles, won the VALORANT
        Conqueror Championship, and operated training facilities in South Korea and
        India. It reached profitability during a period when more than eighteen
        competing Indian esports organisations shut down.
      </P>

      <H2>Building now</H2>
      <P>
        His current work is AI-native product development for the creator economy:
        Aarees, a multi-agent creator platform delivered over WhatsApp; thumbnail.gg,
        AI thumbnail generation for YouTube creators; ClutchPass, an AI battle pass
        for competitive gamers; and Ges, an AI-native business operator for creators.
        Several smaller tools — xReader.ai and an open-source YouTube Shorts pipeline
        among them — are shipped and public.
      </P>

      <H2>Reach</H2>
      <P>
        He publishes across YouTube, Instagram, X, Twitch, and LinkedIn to a combined
        audience of roughly 241,000, with over 100 million lifetime personal views,
        and has spoken on two TEDx stages. The content sits where the work does: AI
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

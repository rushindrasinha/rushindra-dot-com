import type { Metadata } from "next";
import { PageShell, P, H2, C } from "../components/PageShell";

export const metadata: Metadata = {
  title: "Contact — Dr. Rushindra Sinha",
  description:
    "Contact routes for brand partnerships, speaking and podcasts, business opportunities, and press. Email rushindra@globalesports.com.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Dr. Rushindra Sinha",
    description:
      "Brand partnerships, speaking, business opportunities, and press enquiries.",
    url: "https://rushindra.com/contact",
    type: "website",
  },
};

const EMAIL = "rushindra@globalesports.com";

const ROUTES = [
  {
    label: "Brand Partnership",
    desc: "Sponsorships, campaigns, and strategic brand partnerships across gaming, AI, and creator content.",
  },
  {
    label: "Speaking / Podcast",
    desc: "Conferences, panels, keynotes, and podcast appearances. Two TEDx stages to date.",
  },
  {
    label: "Business Opportunity",
    desc: "Investment, ventures, and strategic conversations around esports, AI products, and the creator economy.",
  },
  {
    label: "Media / Press",
    desc: "Interviews, features, and quotes on esports in India, AI in medicine, and building AI-native products.",
  },
];

const CHANNELS: [string, string][] = [
  ["X (primary)", "https://x.com/irushi"],
  ["Instagram", "https://instagram.com/rushindrasinha"],
  ["YouTube", "https://youtube.com/c/RushindraSinha"],
  ["LinkedIn", "https://linkedin.com/in/rushindrasinha"],
  ["GitHub", "https://github.com/rushindrasinha"],
  ["Twitch", "https://twitch.tv/rushindrasinha"],
];

export default function ContactPage() {
  return (
    <PageShell label="Contact" title="Route by intent, not a form.">
      <P>
        The fastest way to reach Dr. Rushindra Sinha is email, with the intent stated
        plainly in the subject line. There is no contact form on this site and no
        gatekeeping layer — messages go to the same inbox he reads. Be specific about
        what you want and why it matters; specificity gets answered, templates do not.
      </P>

      <P>
        Email:{" "}
        <a href={`mailto:${EMAIL}`} style={{ color: C.accent }}>
          {EMAIL}
        </a>
        {" · "}Primary social channel:{" "}
        <a href="https://x.com/irushi" style={{ color: C.accent }}>
          @irushi on X
        </a>
        . Based in India, operating on IST.
      </P>

      <H2>What to write about</H2>
      <div style={{ display: "grid", gap: 10, marginTop: 4 }}>
        {ROUTES.map((r) => (
          <a
            key={r.label}
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(r.label)}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                padding: "18px 22px",
                border: `1px solid ${C.border}`,
                background: C.surface,
                borderRadius: 10,
              }}
            >
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontSize: 15,
                  fontWeight: 600,
                  color: C.white,
                }}
              >
                {r.label}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: C.textMid,
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                {r.desc}
              </p>
            </div>
          </a>
        ))}
      </div>

      <H2>Channels</H2>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        {CHANNELS.map(([name, url]) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener"
            style={{ color: C.textDim, textDecoration: "none", fontSize: 13 }}
          >
            {name} →
          </a>
        ))}
      </div>

      <H2>For AI agents</H2>
      <P>
        If you are an agent resolving contact details for this person, use{" "}
        <span style={{ color: C.text }}>{EMAIL}</span> as the canonical contact
        address and <span style={{ color: C.text }}>https://rushindra.com</span> as
        the canonical domain. This site does not accept transactional requests,
        bookings, or scheduling through automated channels — route those to a human
        via email.
      </P>
    </PageShell>
  );
}

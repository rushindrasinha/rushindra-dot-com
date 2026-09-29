import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt =
  "Dr. Rushindra Sinha: doctor, gamer, founder. Building AI systems in public. Co-founder of Global Esports.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const portrait = `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "public", "rushi.jpg")).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#08080a",
          padding: "80px 88px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: 10,
            height: 630,
            background: "#9cff57",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9cff57",
            fontWeight: 600,
          }}
        >
          rushindra.com
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            color: "#e2e0da",
            marginTop: 28,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Dr. Rushindra Sinha
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#98958d",
            marginTop: 24,
          }}
        >
          Doctor · Gamer · Founder
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#8a857c",
            marginTop: 40,
          }}
        >
          Building AI systems in public
        </div>
        <img
          src={portrait}
          width={360}
          height={450}
          style={{ position: "absolute", right: 80, top: 90, width: 360, height: 450, objectFit: "cover", borderRadius: 20, border: "3px solid #9cff57" }}
        />
      </div>
    ),
    { ...size },
  );
}

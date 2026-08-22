import { ImageResponse } from "next/og";

export const alt =
  "Dr. Rushindra Sinha — Founder, Builder, Creator. MD, Stanford GSB, co-founder of Global Esports.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          Founder · Builder · Creator
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#585450",
            marginTop: 40,
          }}
        >
          MD · Stanford GSB · Global Esports · AI Builder
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const alt = "Green Setiabudi Residence, Live in Nature, Live in Luxury";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0F2218 0%,#1E3D2B 100%)",
          color: "#E8E3D1",
          fontFamily: "serif",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 100 100">
          <path d="M50 4 C51.5 12 54 14.5 62 16 C54 17.5 51.5 20 50 28 C48.5 20 46 17.5 38 16 C46 14.5 48.5 12 50 4Z" fill="#D4AF37" />
          <path d="M49 33 C32 34 18 43 10 58 C26 56 40 50 49 42Z" fill="#A9C88A" />
          <path d="M51 33 C68 34 82 43 90 58 C74 56 60 50 51 42Z" fill="#A9C88A" />
          <path fillRule="evenodd" d="M24 64 L50 47 L76 64 V88 H24Z M44 88 V74 Q50 70 56 74 V88Z" fill="#D4AF37" />
        </svg>
        <div style={{ fontSize: 76, letterSpacing: 10, marginTop: 28, color: "#A9C88A" }}>GREEN SETIABUDI</div>
        <div style={{ fontSize: 34, letterSpacing: 18, marginTop: 6, color: "#D4AF37" }}>RESIDENCE</div>
        <div style={{ fontSize: 26, letterSpacing: 6, marginTop: 36, opacity: 0.85 }}>
          LIVE IN NATURE, LIVE IN LUXURY
        </div>
        <div style={{ fontSize: 22, marginTop: 14, opacity: 0.6 }}>Setiabudi, Bandung</div>
      </div>
    ),
    { ...size },
  );
}

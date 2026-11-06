import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Social share card: the headline set large on the studio grid. */
export function renderOgImage({ label, lines }: { label: string; lines: string[] }) {
  const last = lines.length - 1;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0b",
          color: "#f3f1ec",
          padding: "64px 72px",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#929292" }}>
          <span style={{ color: "#f3f1ec" }}>FWD STUDIO</span>
          <span>{label.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
          {lines.map((line, i) => (
            <span key={line} style={{ display: "flex" }}>
              {line.toUpperCase()}
              {i === last ? <span style={{ color: "#ff5a36" }}>. →</span> : null}
            </span>
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}

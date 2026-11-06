// Illustrated screens for the concept projects. Everything is sized in cqw
// (percent of the frame width), so each screen scales as one image.
// All copy and numbers here are fictional sample content.

/* ---------------------------------------------------------------- */
/* 01 — Ridgeline Builders: business website for a general contractor */
/* ---------------------------------------------------------------- */

const ridge = { bg: "#181915", fg: "#efe9dc", muted: "#8f8a7d", accent: "#d9a441" };

function Blueprint({ className = "" }: { className?: string }) {
  return (
    <div
      className={"relative overflow-hidden " + className}
      style={{
        background: `linear-gradient(135deg, #2a2a24 0%, #22231d 100%)`,
      }}
    >
      {/* blueprint grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(217,164,65,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(217,164,65,.14) 1px, transparent 1px)",
          backgroundSize: "8% 8%",
        }}
      />
      {/* building outline */}
      <svg viewBox="0 0 200 140" className="absolute inset-[10%] h-[80%] w-[80%]" fill="none" preserveAspectRatio="xMidYMax meet">
        <g stroke={ridge.accent} strokeWidth="1.1">
          <path d="M20 135 V60 L80 25 L140 60 V135" />
          <path d="M140 135 V80 H185 V135" />
          <path d="M5 135 H195" />
          <rect x="45" y="75" width="22" height="22" />
          <rect x="93" y="75" width="22" height="22" />
          <rect x="68" y="105" width="24" height="30" />
          <rect x="152" y="92" width="22" height="16" />
        </g>
        <g stroke={ridge.fg} strokeOpacity=".35" strokeWidth=".6" strokeDasharray="2 2">
          <path d="M20 50 H140" />
          <path d="M80 10 V135" />
        </g>
      </svg>
    </div>
  );
}

export function RidgelineDesktop() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: ridge.bg, color: ridge.fg }}>
      <div className="flex items-center justify-between px-[4cqw] py-[2.2cqw] text-[1.25cqw]">
        <span className="text-[1.6cqw] font-extrabold tracking-[0.12em]">RIDGELINE</span>
        <span className="flex gap-[2.6cqw]" style={{ color: ridge.muted }}>
          <span>Services</span>
          <span>Projects</span>
          <span>Process</span>
          <span>About</span>
        </span>
        <span className="px-[1.6cqw] py-[0.8cqw] font-semibold" style={{ background: ridge.accent, color: ridge.bg }}>
          Request a quote
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[1.05fr_1fr] gap-[3cqw] px-[4cqw] pt-[3cqw]">
        <div className="flex flex-col">
          <span className="text-[1.1cqw] tracking-[0.2em]" style={{ color: ridge.accent }}>
            GENERAL CONTRACTOR
          </span>
          <span className="mt-[1.6cqw] text-[5.6cqw] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase">
            Built right.
            <br />
            Built to last.
          </span>
          <span className="mt-[2cqw] max-w-[85%] text-[1.35cqw] leading-[1.5]" style={{ color: ridge.muted }}>
            Residential builds, commercial fit-outs and renovations, managed from first drawing to final walkthrough.
          </span>
          <span className="mt-auto mb-[3cqw] flex gap-[1cqw] text-[1.1cqw]">
            {["Residential", "Commercial", "Renovation"].map((t) => (
              <span key={t} className="border px-[1.2cqw] py-[0.6cqw]" style={{ borderColor: "rgba(239,233,220,.2)" }}>
                {t}
              </span>
            ))}
          </span>
        </div>
        <Blueprint className="mb-[3cqw]" />
      </div>
    </div>
  );
}

export function RidgelineMobile() {
  return (
    <div className="absolute inset-0 flex flex-col pt-[14cqw]" style={{ background: ridge.bg, color: ridge.fg }}>
      <div className="flex items-center justify-between px-[7cqw] text-[4.5cqw]">
        <span className="font-extrabold tracking-[0.12em]">RIDGELINE</span>
        <span className="flex flex-col gap-[1.4cqw]">
          <span className="block h-px w-[6cqw]" style={{ background: ridge.fg }} />
          <span className="block h-px w-[6cqw]" style={{ background: ridge.fg }} />
        </span>
      </div>
      <div className="px-[7cqw] pt-[10cqw]">
        <span className="text-[3.2cqw] tracking-[0.2em]" style={{ color: ridge.accent }}>
          GENERAL CONTRACTOR
        </span>
        <div className="mt-[3cqw] text-[12cqw] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase">
          Built right. Built to last.
        </div>
      </div>
      <Blueprint className="mx-[7cqw] mt-[8cqw] aspect-[4/3]" />
      <div className="mx-[7cqw] mt-[7cqw] py-[3.6cqw] text-center text-[4.2cqw] font-semibold" style={{ background: ridge.accent, color: ridge.bg }}>
        Request a quote
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 02 — Solace Physio: booking landing page for a physiotherapy clinic */
/* ---------------------------------------------------------------- */

const solace = { bg: "#ece7dd", fg: "#1f2a26", muted: "#6c726d", accent: "#2f5d50", soft: "#dcd5c7" };
const serif = { fontFamily: 'Georgia, "Times New Roman", serif' };

const slots = ["9:00", "10:30", "12:00", "14:30", "16:00", "17:30"];

export function SolaceDesktop() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: solace.bg, color: solace.fg }}>
      <div className="flex items-center justify-between px-[4cqw] py-[2.2cqw] text-[1.25cqw]">
        <span className="text-[1.9cqw]" style={serif}>
          Solace<span style={{ color: solace.accent }}>.</span>
        </span>
        <span className="flex gap-[2.6cqw]" style={{ color: solace.muted }}>
          <span>Treatments</span>
          <span>Team</span>
          <span>Pricing</span>
        </span>
        <span className="rounded-full px-[1.8cqw] py-[0.8cqw] text-white" style={{ background: solace.accent }}>
          Book a visit
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[1.1fr_1fr] items-center gap-[4cqw] px-[4cqw] pb-[3cqw]">
        <div>
          <span className="text-[1.15cqw] tracking-[0.18em]" style={{ color: solace.accent }}>
            PHYSIOTHERAPY CLINIC
          </span>
          <div className="mt-[1.4cqw] text-[5.2cqw] leading-[1.02] tracking-[-0.02em]" style={serif}>
            Physio that fits
            <br />
            <em style={{ color: solace.accent }}>your week.</em>
          </div>
          <div className="mt-[2cqw] max-w-[82%] text-[1.35cqw] leading-[1.55]" style={{ color: solace.muted }}>
            Evening and weekend appointments. Book online in under a minute.
          </div>
        </div>
        <div className="rounded-[1.6cqw] bg-white/70 p-[2.4cqw] shadow-[0_2cqw_4cqw_-2cqw_rgba(31,42,38,0.25)]">
          <div className="flex items-center justify-between text-[1.3cqw]">
            <span className="font-semibold">Choose a time</span>
            <span style={{ color: solace.muted }}>Thu, 14</span>
          </div>
          <div className="mt-[1.8cqw] grid grid-cols-3 gap-[1cqw] text-[1.2cqw]">
            {slots.map((s, i) => (
              <span
                key={s}
                className="rounded-[0.8cqw] py-[1cqw] text-center"
                style={
                  i === 3
                    ? { background: solace.accent, color: "#fff" }
                    : { background: solace.soft, color: solace.fg }
                }
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-[1.8cqw] rounded-full py-[1.1cqw] text-center text-[1.3cqw] text-white" style={{ background: solace.fg }}>
            Confirm booking
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolaceMobile() {
  return (
    <div className="absolute inset-0 flex flex-col pt-[14cqw]" style={{ background: solace.bg, color: solace.fg }}>
      <div className="flex items-center justify-between px-[7cqw] text-[5cqw]" style={serif}>
        <span>
          Solace<span style={{ color: solace.accent }}>.</span>
        </span>
      </div>
      <div className="px-[7cqw] pt-[9cqw] text-[11cqw] leading-[1.02] tracking-[-0.02em]" style={serif}>
        Physio that fits <em style={{ color: solace.accent }}>your week.</em>
      </div>
      <div className="mx-[7cqw] mt-[9cqw] rounded-[5cqw] bg-white/70 p-[6cqw]">
        <div className="text-[4cqw] font-semibold">Choose a time</div>
        <div className="mt-[4cqw] grid grid-cols-3 gap-[2.4cqw] text-[3.6cqw]">
          {slots.map((s, i) => (
            <span
              key={s}
              className="rounded-[2.4cqw] py-[2.6cqw] text-center"
              style={i === 3 ? { background: solace.accent, color: "#fff" } : { background: solace.soft }}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-[5cqw] rounded-full py-[3.4cqw] text-center text-[4cqw] text-white" style={{ background: solace.fg }}>
          Confirm booking
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 03 — Fieldnote: operations dashboard for a field-service business   */
/* ---------------------------------------------------------------- */

const field = { bg: "#0f1218", panel: "#161b24", fg: "#e6ebf5", muted: "#7c8698", accent: "#7aa2ff", line: "rgba(255,255,255,.07)" };
const bars = [38, 52, 44, 66, 58, 74, 61, 82, 70, 88, 76, 92];

export function FieldnoteDesktop() {
  return (
    <div className="absolute inset-0 grid grid-cols-[16%_1fr] text-[1.15cqw]" style={{ background: field.bg, color: field.fg }}>
      <div className="flex flex-col gap-[1.4cqw] border-r p-[2cqw]" style={{ borderColor: field.line }}>
        <span className="mb-[1.4cqw] text-[1.5cqw] font-bold">
          field<span style={{ color: field.accent }}>note</span>
        </span>
        {["Overview", "Jobs", "Schedule", "Crews", "Invoices"].map((n, i) => (
          <span
            key={n}
            className="rounded-[0.5cqw] px-[1cqw] py-[0.7cqw]"
            style={i === 0 ? { background: field.panel, color: field.fg } : { color: field.muted }}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-[1.8cqw] p-[2.4cqw]">
        <div className="flex items-center justify-between">
          <span className="text-[1.9cqw] font-semibold">Overview</span>
          <span className="rounded-[0.5cqw] px-[1.2cqw] py-[0.6cqw]" style={{ background: field.accent, color: field.bg }}>
            + New job
          </span>
        </div>
        <div className="grid grid-cols-3 gap-[1.4cqw]">
          {[
            ["Open jobs", "24"],
            ["Scheduled today", "9"],
            ["Unpaid invoices", "6"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[0.8cqw] p-[1.6cqw]" style={{ background: field.panel }}>
              <div style={{ color: field.muted }}>{k}</div>
              <div className="mt-[0.6cqw] text-[3cqw] font-semibold tracking-[-0.02em]">{v}</div>
            </div>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-[1.5fr_1fr] gap-[1.4cqw]">
          <div className="flex flex-col rounded-[0.8cqw] p-[1.6cqw]" style={{ background: field.panel }}>
            <span style={{ color: field.muted }}>Jobs completed · 12 weeks</span>
            <div className="mt-[1.4cqw] flex flex-1 items-end gap-[0.7cqw]">
              {bars.map((b, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[0.3cqw]"
                  style={{ height: `${b}%`, background: i === bars.length - 1 ? field.accent : "rgba(122,162,255,.28)" }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[0.9cqw] rounded-[0.8cqw] p-[1.6cqw]" style={{ background: field.panel }}>
            <span style={{ color: field.muted }}>Today</span>
            {["08:00  Boiler service", "10:30  Roof inspection", "13:00  Kitchen install", "15:30  Site survey"].map((r) => (
              <span key={r} className="border-b pb-[0.7cqw] font-mono text-[1.05cqw]" style={{ borderColor: field.line }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FieldnoteMobile() {
  return (
    <div className="absolute inset-0 flex flex-col gap-[4cqw] px-[6cqw] pt-[15cqw]" style={{ background: field.bg, color: field.fg }}>
      <div className="flex items-center justify-between">
        <span className="text-[5cqw] font-bold">
          field<span style={{ color: field.accent }}>note</span>
        </span>
        <span className="size-[7cqw] rounded-full" style={{ background: field.panel }} />
      </div>
      <div className="rounded-[3cqw] p-[5cqw]" style={{ background: field.panel }}>
        <div className="text-[3.6cqw]" style={{ color: field.muted }}>
          Scheduled today
        </div>
        <div className="mt-[1cqw] text-[12cqw] font-semibold tracking-[-0.03em]">9</div>
        <div className="mt-[3cqw] flex h-[14cqw] items-end gap-[1.6cqw]">
          {bars.slice(-8).map((b, i) => (
            <span key={i} className="flex-1 rounded-t-[0.8cqw]" style={{ height: `${b}%`, background: i === 7 ? field.accent : "rgba(122,162,255,.28)" }} />
          ))}
        </div>
      </div>
      {["Boiler service", "Roof inspection", "Kitchen install"].map((r, i) => (
        <div key={r} className="flex items-center justify-between rounded-[3cqw] px-[5cqw] py-[4cqw] text-[3.8cqw]" style={{ background: field.panel }}>
          <span>{r}</span>
          <span className="font-mono text-[3.2cqw]" style={{ color: field.muted }}>
            {["08:00", "10:30", "13:00"][i]}
          </span>
        </div>
      ))}
    </div>
  );
}

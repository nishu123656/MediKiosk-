import { useState } from "react";

// ─── Icon primitive ───────────────────────────────────────────────────────────
const Icon = ({
  d, size = 18, stroke = "currentColor", fill = "none",
}: { d: string; size?: number; stroke?: string; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ic = {
  heart:       "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  thermometer: "M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z",
  droplet:     "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  send:        "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  video:       "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  arrowLeft:   "M19 12H5M12 5l-7 7 7 7",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  chevDown:    "M19 9l-7 7-7-7",
  chevUp:      "M5 15l7-7 7 7",
  download:    "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  printer:     "M6 9V2h12v7 M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
  lock:        "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
};

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  primary:       "#0d7a6e",
  primaryLight:  "#f0fdf9",
  primaryBorder: "#b2e8e0",
  primaryDim:    "#d1faf5",
  navy:          "#0f1f3d",
  gray:          "#64748b",
  grayLight:     "#94a3b8",
  bg:            "#f5f7fa",
  white:         "#ffffff",
  border:        "#e8ecf0",
  muted:         "#f8fafc",
  danger:        "#e84b4b",
  dangerLight:   "#fff5f5",
  dangerBorder:  "#fecaca",
  success:       "#16a34a",
  successLight:  "#f0fdf4",
  successBorder: "#bbf7d0",
  amber:         "#d97706",
  amberLight:    "#fffbeb",
  amberBorder:   "#fde68a",
  purple:        "#7c3aed",
  purpleLight:   "#f5f3ff",
  blue:          "#1d4ed8",
  blueLight:     "#eff6ff",
  blueBorder:    "#bfdbfe",
};

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionCard({
  children, style,
}: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: T.white,
      border: `1px solid ${T.border}`,
      borderRadius: 11,
      overflow: "hidden",
      ...style,
    }}>
      {children}
    </div>
  );
}

function CardHeader({
  icon, iconStroke, iconBg, title, badge,
}: {
  icon: string; iconStroke: string; iconBg: string; title: string;
  badge?: { label: string; color: string; bg: string; border: string };
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 18px",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon d={icon} size={15} stroke={iconStroke} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</span>
      </div>
      {badge && (
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
          color: badge.color, background: badge.bg,
          border: `1px solid ${badge.border}`,
          padding: "3px 9px", borderRadius: 20,
        }}>
          {badge.label}
        </span>
      )}
    </div>
  );
}

// Row: label + value
function DataRow({
  label, value, valueStyle, missing,
}: {
  label: string; value: string;
  valueStyle?: React.CSSProperties; missing?: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: 8,
      padding: "9px 18px",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <span style={{
        fontSize: 12, color: T.grayLight, flexShrink: 0, minWidth: 160,
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 13,
        fontWeight: missing ? 400 : 500,
        color: missing ? T.grayLight : T.navy,
        fontStyle: missing ? "italic" : "normal",
        ...valueStyle,
      }}>
        {value}
      </span>
      {missing && (
        <span style={{
          marginLeft: "auto", fontSize: 10, fontWeight: 600, color: T.amber,
          background: T.amberLight, border: `1px solid ${T.amberBorder}`,
          padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap" as const,
        }}>
          Missing
        </span>
      )}
    </div>
  );
}

// ─── Top bar ─────────────────────────────────────────────────────────────────
function TopBar({ onBack }: { onBack: () => void }) {
  return (
    <header style={{
      background: T.white, borderBottom: `1px solid ${T.border}`,
      height: 60, display: "flex", alignItems: "center",
      padding: "0 28px", flexShrink: 0, gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={ic.heart} size={16} stroke="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, letterSpacing: "-0.01em" }}>MediKiosk</div>
          <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 500, letterSpacing: "0.04em" }}>HEALTH PLATFORM</div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 12 }}>
        <button onClick={onBack} style={{ fontSize: 12, color: T.grayLight, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "Inter, system-ui, sans-serif" }}>
          Clinical Intake
        </button>
        <Icon d={ic.chevDown} size={12} stroke={T.grayLight} />
        <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>Clinical Summary</span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 14px", background: T.white, border: `1px solid ${T.border}`,
          borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.gray,
          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
        }}>
          <Icon d={ic.printer} size={14} stroke={T.gray} />
          Print
        </button>
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 14px", background: T.white, border: `1px solid ${T.border}`,
          borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.gray,
          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
        }}>
          <Icon d={ic.download} size={14} stroke={T.gray} />
          Export PDF
        </button>
      </div>
    </header>
  );
}

// ─── Patient identity strip ───────────────────────────────────────────────────
function PatientStrip() {
  return (
    <div style={{
      background: T.navy,
      padding: "20px 28px",
      display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" as const,
    }}>
      {/* Avatar */}
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: T.primary,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0,
      }}>
        R
      </div>

      {/* Name + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
          Rahul Sharma
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
          Age: 24 &nbsp;·&nbsp; Male &nbsp;·&nbsp; Visit ID: MK-2026-00421
        </div>
      </div>

      {/* Status chip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "7px 14px",
        background: "rgba(13,122,110,0.25)",
        border: "1px solid rgba(13,122,110,0.4)",
        borderRadius: 8,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#5dd6c8" }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#5dd6c8" }}>
          Ready for Doctor Review
        </span>
      </div>

      {/* Visit time */}
      <div style={{ textAlign: "right" as const }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Check-in completed</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
          Today, 10:42 AM
        </div>
      </div>
    </div>
  );
}

// ─── Disclaimer banner ────────────────────────────────────────────────────────
function DisclaimerBanner() {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "12px 16px",
      background: T.amberLight,
      border: `1px solid ${T.amberBorder}`,
      borderRadius: 9,
      marginBottom: 0,
    }}>
      <Icon d={ic.info} size={15} stroke={T.amber} />
      <p style={{ fontSize: 12, color: "#78350f", margin: 0, lineHeight: 1.6 }}>
        <strong>Preliminary clinical insight — not a diagnosis.</strong>{" "}
        Final assessment must be made by a qualified healthcare professional.
        This summary is prepared to assist clinical review and must not replace a doctor's consultation.
      </p>
    </div>
  );
}

// ─── Section 1 — Chief Complaint ─────────────────────────────────────────────
function ChiefComplaintCard() {
  return (
    <SectionCard>
      <CardHeader
        icon={ic.stethoscope} iconStroke={T.primary} iconBg={T.primaryLight}
        title="Chief Complaint"
      />
      <div style={{ padding: "16px 18px" }}>
        <p style={{
          fontSize: 16, fontWeight: 600, color: T.navy,
          margin: "0 0 6px", lineHeight: 1.4,
        }}>
          "Cough and mild fever for 3 days"
        </p>
        <p style={{ fontSize: 12, color: T.grayLight, margin: 0 }}>
          Reported by patient &nbsp;·&nbsp; Sep 10, 2026
        </p>
      </div>
    </SectionCard>
  );
}

// ─── Section 2 — Symptom History ─────────────────────────────────────────────
function SymptomHistoryCard() {
  const rows = [
    { label: "Onset",                value: "3 days ago (Sep 7, 2026)"   },
    { label: "Character",            value: "Dry, persistent cough"      },
    { label: "Severity",             value: "Moderate"                   },
    { label: "Timing",               value: "Intermittent throughout day"},
    { label: "Associated symptoms",  value: "Mild fever, fatigue"        },
    { label: "Aggravating factors",  value: "Worse at night"             },
    { label: "Relieving factors",    value: "Not specified"              },
  ];
  return (
    <SectionCard>
      <CardHeader
        icon={ic.activity} iconStroke={T.purple} iconBg={T.purpleLight}
        title="Symptom History"
        badge={{ label: "Patient-reported", color: T.purple, bg: T.purpleLight, border: "#ddd6fe" }}
      />
      <div>
        {rows.map((r, i) => (
          <DataRow
            key={r.label} label={r.label} value={r.value}
            valueStyle={r.label === "Severity" ? { color: T.amber, fontWeight: 600 } : undefined}
          />
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Section 3 — Medical History ─────────────────────────────────────────────
function MedicalHistoryCard() {
  const rows = [
    { label: "Previous conditions", value: "None reported",        missing: false },
    { label: "Current medicines",   value: "None reported",        missing: false },
    { label: "Allergies",           value: "No known allergies",   missing: false },
    { label: "Surgical history",    value: "Not provided",         missing: true  },
    { label: "Family history",      value: "Not provided",         missing: true  },
  ];
  return (
    <SectionCard>
      <CardHeader
        icon={ic.user} iconStroke={T.blue} iconBg={T.blueLight}
        title="Medical History"
      />
      <div>
        {rows.map((r) => (
          <DataRow key={r.label} label={r.label} value={r.value} missing={r.missing} />
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Section 4 — Vitals ──────────────────────────────────────────────────────
function VitalsCard() {
  const vitals = [
    { label: "Temperature",      value: "Not recorded", missing: true  },
    { label: "SpO₂",             value: "Not recorded", missing: true  },
    { label: "Blood Pressure",   value: "Not recorded", missing: true  },
    { label: "Pulse Rate",       value: "Not recorded", missing: true  },
    { label: "Respiratory Rate", value: "Not recorded", missing: true  },
    { label: "Weight",           value: "Not recorded", missing: true  },
  ];
  return (
    <SectionCard>
      <CardHeader
        icon={ic.thermometer} iconStroke={T.amber} iconBg={T.amberLight}
        title="Vitals"
        badge={{ label: "Not recorded", color: T.amber, bg: T.amberLight, border: T.amberBorder }}
      />
      <div style={{ padding: "12px 18px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px",
          background: T.amberLight, border: `1px solid ${T.amberBorder}`,
          borderRadius: 8, marginBottom: 12,
        }}>
          <Icon d={ic.alertTri} size={14} stroke={T.amber} />
          <p style={{ fontSize: 12, color: "#78350f", margin: 0 }}>
            Vitals were not collected during check-in. The doctor may record them during the consultation.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {vitals.map((v) => (
            <div key={v.label} style={{
              padding: "10px 12px",
              background: T.muted,
              border: `1px solid ${T.border}`,
              borderRadius: 8,
            }}>
              <div style={{ fontSize: 11, color: T.grayLight, marginBottom: 4 }}>{v.label}</div>
              <div style={{ fontSize: 12, color: T.grayLight, fontStyle: "italic" }}>—</div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Section 5 — Red Flag Assessment ─────────────────────────────────────────
function RedFlagCard() {
  const flags = [
    { flag: false, text: "No chest pain reported"                          },
    { flag: false, text: "No shortness of breath reported"                 },
    { flag: false, text: "No loss of consciousness"                        },
    { flag: false, text: "No severe allergic reaction"                     },
    { flag: true,  text: "Fever present — monitor body temperature"        },
    { flag: false, text: "No neurological symptoms"                        },
  ];
  const hasFlags = flags.some((f) => f.flag);

  return (
    <SectionCard>
      <CardHeader
        icon={ic.shield}
        iconStroke={hasFlags ? T.amber : T.success}
        iconBg={hasFlags ? T.amberLight : T.successLight}
        title="Red Flag Assessment"
        badge={
          hasFlags
            ? { label: "1 flag", color: T.amber, bg: T.amberLight, border: T.amberBorder }
            : { label: "Safety check completed", color: T.success, bg: T.successLight, border: T.successBorder }
        }
      />
      <div style={{ padding: "14px 18px" }}>
        {!hasFlags && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px",
            background: T.successLight, border: `1px solid ${T.successBorder}`,
            borderRadius: 8, marginBottom: 14,
          }}>
            <Icon d={ic.checkCircle} size={15} stroke={T.success} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>
              No immediate red flags identified
            </span>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {flags.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                background: f.flag ? "#fef3c7" : T.successLight,
                border: `1px solid ${f.flag ? T.amberBorder : T.successBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon
                  d={f.flag ? ic.alertTri : ic.check}
                  size={10}
                  stroke={f.flag ? T.amber : T.success}
                />
              </div>
              <span style={{
                fontSize: 13, lineHeight: 1.5,
                color: f.flag ? "#78350f" : T.gray,
                fontWeight: f.flag ? 500 : 400,
              }}>
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Section 6 — Clinical Intelligence ───────────────────────────────────────
function ClinicalIntelligenceCard() {
  const considerations = [
    "Acute viral upper respiratory tract infection",
    "Influenza or flu-like illness",
    "Asthma exacerbation triggered by infection",
  ];
  const missing = ["Temperature reading", "SpO₂ measurement", "Relevant medical history", "Contact or travel history"];

  return (
    <SectionCard style={{ borderLeft: `3px solid ${T.amber}`, borderRadius: "0 11px 11px 0" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: T.amberLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.activity} size={15} stroke={T.amber} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Clinical Intelligence</span>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 600, color: T.amber,
            background: T.amberLight, border: `1px solid ${T.amberBorder}`,
            padding: "3px 9px", borderRadius: 20,
          }}>
            Risk: Moderate
          </span>
        </div>
        <p style={{ fontSize: 11, color: T.grayLight, margin: "7px 0 0", fontStyle: "italic" }}>
          Preliminary clinical insight — not a diagnosis
        </p>
      </div>

      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Possible considerations */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em", marginBottom: 10 }}>
            POSSIBLE CONSIDERATIONS
          </div>
          {considerations.map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 12px",
              background: i === 0 ? T.muted : "transparent",
              border: i === 0 ? `1px solid ${T.border}` : "none",
              borderRadius: 8,
              marginBottom: 4,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: T.primary,
                background: T.primaryLight, border: `1px solid ${T.primaryBorder}`,
                width: 20, height: 20, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 13, color: T.navy, fontWeight: i === 0 ? 500 : 400 }}>
                {c}
              </span>
              {i === 0 && (
                <span style={{
                  marginLeft: "auto", fontSize: 10, fontWeight: 600, color: T.primary,
                  background: T.primaryLight, border: `1px solid ${T.primaryBorder}`,
                  padding: "2px 8px", borderRadius: 20,
                }}>
                  Most likely
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Missing information */}
        <div style={{ paddingTop: 4, borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em", marginBottom: 10 }}>
            MISSING INFORMATION
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {missing.map((m) => (
              <div key={m} style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "7px 10px",
                background: T.amberLight, border: `1px solid ${T.amberBorder}`,
                borderRadius: 7,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.amber, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#78350f" }}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested clinical review */}
        <div style={{
          padding: "12px 14px",
          background: T.primaryLight, border: `1px solid ${T.primaryBorder}`,
          borderRadius: 9,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em", marginBottom: 6 }}>
            SUGGESTED CLINICAL REVIEW
          </div>
          <p style={{ fontSize: 13, color: T.navy, margin: 0, lineHeight: 1.6 }}>
            Consider checking vital signs and respiratory examination during consultation.
            Assess for duration of fever and response to any self-medication taken.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Section 7 — Patient Documents ───────────────────────────────────────────
const DOCS = [
  { name: "Prescription — Dr. Mehta",   date: "Aug 28, 2026", status: "OCR Verified", statusColor: T.success, statusBg: T.successLight, statusBorder: T.successBorder },
  { name: "Blood Test Report",           date: "Aug 25, 2026", status: "OCR Verified", statusColor: T.success, statusBg: T.successLight, statusBorder: T.successBorder },
  { name: "Discharge Summary",           date: "Jul 12, 2026", status: "Uploaded",     statusColor: T.gray,    statusBg: T.muted,        statusBorder: T.border        },
];

function DocumentsCard() {
  return (
    <SectionCard>
      <CardHeader
        icon={ic.fileText} iconStroke={T.blue} iconBg={T.blueLight}
        title="Patient Documents"
        badge={{ label: `${DOCS.length} files`, color: T.blue, bg: T.blueLight, border: T.blueBorder }}
      />
      <div>
        {DOCS.map((doc, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 18px",
            borderBottom: i < DOCS.length - 1 ? `1px solid ${T.border}` : "none",
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8, flexShrink: 0,
              background: T.blueLight,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon d={ic.fileText} size={16} stroke={T.blue} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.navy, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>
                {doc.name}
              </div>
              <div style={{ fontSize: 11, color: T.grayLight, marginTop: 2 }}>{doc.date}</div>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 600,
              color: doc.statusColor, background: doc.statusBg, border: `1px solid ${doc.statusBorder}`,
              padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const,
            }}>
              {doc.status}
            </span>
            <button style={{
              padding: "6px 12px",
              background: T.white, border: `1px solid ${T.border}`,
              borderRadius: 7, fontSize: 12, color: T.gray, cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <Icon d={ic.eye} size={13} stroke={T.gray} />
              View
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Section 8 — Patient Timeline ────────────────────────────────────────────
const TIMELINE = [
  { type: "consultation", label: "Endocrinology Consultation", meta: "Dr. Priya Mehta · Apollo Hospitals", date: "Aug 28, 2026", dot: T.primary,  bg: T.primaryLight  },
  { type: "lab",          label: "HbA1c + Lipid Profile",       meta: "Thyrocare Labs · 6 results",         date: "Aug 25, 2026", dot: T.amber,   bg: T.amberLight    },
  { type: "prescription", label: "Prescription Updated",        meta: "Metformin dose adjusted",            date: "Aug 28, 2026", dot: T.purple,  bg: T.purpleLight   },
];

function TimelineCard() {
  return (
    <SectionCard>
      <CardHeader
        icon={ic.clock} iconStroke={T.gray} iconBg={T.muted}
        title="Recent Patient History"
      />
      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 0 }}>
        {TIMELINE.map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, alignItems: "flex-start",
            paddingBottom: i < TIMELINE.length - 1 ? 18 : 0,
            position: "relative",
          }}>
            {i < TIMELINE.length - 1 && (
              <div style={{
                position: "absolute", left: 14, top: 28, bottom: 0,
                width: 1, background: T.border,
              }} />
            )}
            <div style={{
              width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
              background: item.bg, border: `1.5px solid ${item.dot}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.dot }} />
            </div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: T.grayLight, marginTop: 2 }}>{item.meta}</div>
                </div>
                <span style={{ fontSize: 11, color: T.grayLight, flexShrink: 0 }}>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Sticky action bar ────────────────────────────────────────────────────────
function ActionBar({
  onEdit, onSend, onStart,
}: { onEdit: () => void; onSend: () => void; onStart: () => void }) {
  return (
    <div style={{
      position: "sticky" as const, bottom: 0, zIndex: 20,
      background: T.white,
      borderTop: `1px solid ${T.border}`,
      padding: "14px 28px",
      display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" as const,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginRight: "auto" }}>
        <Icon d={ic.lock} size={13} stroke={T.grayLight} />
        <span style={{ fontSize: 11, color: T.grayLight }}>
          Summary shared only with your treating physician.
        </span>
      </div>

      <button
        onClick={onEdit}
        style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "10px 18px",
          background: T.white, border: `1px solid ${T.border}`,
          borderRadius: 9, fontSize: 13, fontWeight: 500, color: T.gray,
          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <Icon d={ic.edit} size={14} stroke={T.gray} />
        Edit Summary
      </button>

      <button
        onClick={onSend}
        style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "10px 18px",
          background: T.white,
          border: `1px solid ${T.primary}`,
          borderRadius: 9, fontSize: 13, fontWeight: 600, color: T.primary,
          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <Icon d={ic.send} size={14} stroke={T.primary} />
        Send to Doctor
      </button>

      <button
        onClick={onStart}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "11px 24px",
          background: T.primary, border: "none",
          borderRadius: 9, fontSize: 13, fontWeight: 600, color: "#fff",
          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
          letterSpacing: "0.01em",
        }}
      >
        <Icon d={ic.video} size={15} stroke="#fff" />
        Start Consultation
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ClinicalSummary({
  onBack,
  onDashboard,
}: {
  onBack: () => void;
  onDashboard: () => void;
}) {
  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      fontFamily: "Inter, system-ui, sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      <TopBar onBack={onBack} />
      <PatientStrip />

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 0" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", flexDirection: "column", gap: 16,
          paddingBottom: 100,
        }}>

          <DisclaimerBanner />

          {/* Two-column upper: main sections left, sidebar right */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) 300px",
            gap: 16,
            alignItems: "start",
          }}>
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <ChiefComplaintCard />
              <SymptomHistoryCard />
              <MedicalHistoryCard />
              <VitalsCard />
            </div>

            {/* Right column — sticky */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <RedFlagCard />
              <ClinicalIntelligenceCard />
            </div>
          </div>

          {/* Full-width lower sections */}
          <DocumentsCard />
          <TimelineCard />

        </div>
      </div>

      <ActionBar
        onEdit={onBack}
        onSend={() => {}}
        onStart={onDashboard}
      />
    </div>
  );
}

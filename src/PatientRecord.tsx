import { useState } from "react";

// ─── Icon ─────────────────────────────────────────────────────────────────────
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
  chevLeft:    "M15 18l-6-6 6-6",
  chevRight:   "M9 18l6-6-6-6",
  chevDown:    "M19 9l-7 7-7-7",
  chevUp:      "M5 15l7-7 7 7",
  video:       "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  more:        "M12 5h.01M12 12h.01M12 19h.01",
  print:       "M6 9V2h12v7 M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
  share:       "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8 M16 6l-4-4-4 4 M12 2v13",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  flask:       "M9 3h6m-5 6l-4 11h14L16 9 M10 3v6 M14 3v6",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  link:        "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  externalLink:"M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6 M15 3h6v6 M10 14L21 3",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6z",
  download:    "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  abha:        "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
};

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  primary:       "#0d7a6e",
  primaryLight:  "#f0fdf9",
  primaryBorder: "#b2e8e0",
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
  blue:          "#1d4ed8",
  blueLight:     "#eff6ff",
  blueBorder:    "#bfdbfe",
  purple:        "#7c3aed",
  purpleLight:   "#f5f3ff",
  purpleBorder:  "#ddd6fe",
};

// ─── Tab list ─────────────────────────────────────────────────────────────────
type Tab = "overview" | "summary" | "timeline" | "documents" | "prescriptions" | "lab" | "abha";
const TABS: { id: Tab; label: string }[] = [
  { id: "overview",      label: "Overview"         },
  { id: "summary",       label: "Clinical Summary" },
  { id: "timeline",      label: "Health Timeline"  },
  { id: "documents",     label: "Documents"        },
  { id: "prescriptions", label: "Prescriptions"    },
  { id: "lab",           label: "Lab Reports"      },
  { id: "abha",          label: "ABHA Records"     },
];

// ─── Tiny helper components ───────────────────────────────────────────────────
function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${border}`, padding: "2px 9px", borderRadius: 20 }}>
      {label}
    </span>
  );
}

function SectionHead({ title, icon, right }: { title: string; icon: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <Icon d={icon} size={15} stroke={T.primary} />
      <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>{title}</span>
      {right}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
      <span style={{ fontSize: 12, color: T.grayLight, minWidth: 160, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: mono ? T.primary : T.navy, fontFamily: mono ? "monospace, monospace" : "inherit", lineHeight: 1.45 }}>{value}</span>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, padding: "18px 20px", ...style }}>
      {children}
    </div>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 20, alignItems: "start" }}>

      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Patient info */}
        <Card>
          <SectionHead title="Patient Information" icon={ic.user} />
          <div>
            <Row label="Age"          value="24 years" />
            <Row label="Gender"       value="Male" />
            <Row label="Date of birth" value="14 March 2002" />
            <Row label="Mobile"       value="+91 ••••••1234" />
            <Row label="Blood group"  value={<span style={{ color: T.grayLight }}>Not available</span>} />
            <Row label="ABHA status"  value={<Badge label="Connected" color={T.success} bg={T.successLight} border={T.successBorder} />} />
            <Row label="Allergies"    value="No known allergies reported" />
          </div>
        </Card>

        {/* Clinical summary excerpt */}
        <Card>
          <SectionHead title="Chief Complaint" icon={ic.activity} />
          <div style={{ padding: "12px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, marginBottom: 14 }}>
            <p style={{ margin: 0, fontSize: 13, color: T.navy, fontStyle: "italic", lineHeight: 1.6 }}>
              "Cough and mild fever for 3 days"
            </p>
          </div>
          <div>
            <Row label="Onset"               value="3 days ago" />
            <Row label="Character"           value="Dry cough" />
            <Row label="Severity"            value={<Badge label="Moderate" color={T.amber} bg={T.amberLight} border={T.amberBorder} />} />
            <Row label="Associated symptoms" value="Mild fever" />
            <Row label="Timing"              value="Intermittent" />
            <Row label="Aggravating"         value="Worse at night" />
          </div>
        </Card>

        {/* Medical history */}
        <Card>
          <SectionHead title="Medical History" icon={ic.fileText} />
          <div>
            <Row label="Previous conditions" value="No previous conditions reported" />
            <Row label="Surgeries"           value={<span style={{ color: T.grayLight }}>None reported</span>} />
            <Row label="Current medicines"   value="None reported" />
            <Row label="Family history"      value={<span style={{ color: T.grayLight }}>Not available</span>} />
          </div>
        </Card>

      </div>

      {/* Right column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Clinical intelligence */}
        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.amber}`, borderRadius: "0 11px 11px 0", padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Icon d={ic.activity} size={14} stroke={T.amber} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>Preliminary Clinical Insight</span>
            <Badge label="Risk: Moderate" color={T.amber} bg={T.amberLight} border={T.amberBorder} />
          </div>
          <p style={{ fontSize: 10, color: T.grayLight, margin: "0 0 14px", fontStyle: "italic" }}>
            Not a diagnosis — for clinical reference only
          </p>

          <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>POSSIBLE CONSIDERATIONS</div>
          {["Respiratory infection", "Viral illness", "Asthma exacerbation"].map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 5,
              padding: i === 0 ? "7px 10px" : "3px 8px",
              background: i === 0 ? T.muted : "transparent",
              border: i === 0 ? `1px solid ${T.border}` : "none",
              borderRadius: i === 0 ? 7 : 0,
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontSize: 12, color: T.navy, fontWeight: i === 0 ? 500 : 400, flex: 1 }}>{c}</span>
              {i === 0 && <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 6px", borderRadius: 20 }}>Most likely</span>}
            </div>
          ))}

          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>MISSING INFORMATION</div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
              {["Temperature", "SpO₂", "Relevant medical history"].map((m) => (
                <span key={m} style={{ fontSize: 11, color: "#78350f", background: T.amberLight, border: `1px solid ${T.amberBorder}`, padding: "2px 9px", borderRadius: 20 }}>{m}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14, padding: "10px 12px", background: T.blueLight, border: `1px solid ${T.blueBorder}`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.blue, marginBottom: 3 }}>SUGGESTED REVIEW</div>
            <p style={{ margin: 0, fontSize: 11, color: "#1e3a8a", lineHeight: 1.5 }}>
              Consider checking vital signs and respiratory symptoms during clinical evaluation.
            </p>
          </div>

          <div style={{ marginTop: 12, padding: "8px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7 }}>
            <p style={{ margin: 0, fontSize: 10, color: T.gray, lineHeight: 1.55 }}>
              Preliminary clinical insight — not a diagnosis. Final assessment must be made by a qualified healthcare professional.
            </p>
          </div>
        </div>

        {/* Safety check */}
        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.success}`, borderRadius: "0 11px 11px 0", padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Icon d={ic.shield} size={14} stroke={T.success} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>Safety Check</span>
            <Badge label="No Red Flags" color={T.success} bg={T.successLight} border={T.successBorder} />
          </div>
          <div style={{ padding: "10px 12px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 8, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Icon d={ic.checkCircle} size={14} stroke={T.success} />
              <p style={{ margin: 0, fontSize: 12, color: "#14532d", lineHeight: 1.5 }}>
                No immediate red flags identified from the information provided.
              </p>
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: T.primary, fontWeight: 600, padding: 0, fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
            View assessment details
            <Icon d={ic.chevRight} size={12} stroke={T.primary} />
          </button>
        </div>

        {/* ABHA mini */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Icon d={ic.abha} size={14} stroke={T.primary} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>ABHA Health Records</span>
            <Badge label="Connected" color={T.success} bg={T.successLight} border={T.successBorder} />
          </div>
          <div>
            <Row label="Records available" value="12 records" />
            <Row label="Last consent"      value="Sep 10, 2026" />
            <Row label="Consent duration"  value="90 days" />
          </div>
          <button style={{ marginTop: 12, width: "100%", padding: "8px", background: T.white, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon d={ic.link} size={13} stroke={T.primary} />
            View shared records
          </button>
          <p style={{ margin: "8px 0 0", fontSize: 10, color: T.grayLight, textAlign: "center" }}>Access is based on patient consent.</p>
        </Card>

      </div>
    </div>
  );
}

// ─── Clinical summary tab ─────────────────────────────────────────────────────
function SummaryTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 20, alignItems: "start" }}>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <SectionHead title="Chief Complaint" icon={ic.activity} />
          <div style={{ padding: "12px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8 }}>
            <p style={{ margin: 0, fontSize: 13, color: T.navy, fontStyle: "italic", lineHeight: 1.6 }}>"Cough and mild fever for 3 days"</p>
          </div>
        </Card>

        <Card>
          <SectionHead title="Symptom History" icon={ic.fileText} />
          <Row label="Onset"               value="3 days ago" />
          <Row label="Character"           value="Dry cough" />
          <Row label="Severity"            value={<Badge label="Moderate" color={T.amber} bg={T.amberLight} border={T.amberBorder} />} />
          <Row label="Associated symptoms" value="Mild fever (low-grade)" />
          <Row label="Timing"              value="Intermittent" />
          <Row label="Aggravating factors" value="Worse at night" />
          <Row label="Relieving factors"   value={<span style={{ color: T.grayLight }}>Not specified</span>} />
        </Card>

        <Card>
          <SectionHead title="Medical History" icon={ic.fileText} />
          <Row label="Previous conditions" value="No previous conditions reported" />
          <Row label="Hospitalisation"     value={<span style={{ color: T.grayLight }}>None reported</span>} />
          <Row label="Surgeries"           value={<span style={{ color: T.grayLight }}>None reported</span>} />
          <Row label="Chronic illness"     value={<span style={{ color: T.grayLight }}>None reported</span>} />
          <Row label="Family history"      value={<span style={{ color: T.grayLight }}>Not available</span>} />
        </Card>

        <Card>
          <SectionHead title="Current Medicines" icon={ic.pill} />
          <div style={{ padding: "28px 0", textAlign: "center" }}>
            <Icon d={ic.pill} size={28} stroke={T.border} />
            <p style={{ margin: "10px 0 0", fontSize: 12, color: T.grayLight }}>None reported</p>
          </div>
        </Card>
      </div>

      {/* Right — intelligence again */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.amber}`, borderRadius: "0 11px 11px 0", padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Icon d={ic.activity} size={14} stroke={T.amber} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>Preliminary Clinical Insight</span>
            <Badge label="Risk: Moderate" color={T.amber} bg={T.amberLight} border={T.amberBorder} />
          </div>
          <p style={{ fontSize: 10, color: T.grayLight, margin: "0 0 14px", fontStyle: "italic" }}>Not a diagnosis — for clinical reference only</p>

          <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>POSSIBLE CONSIDERATIONS</div>
          {["Respiratory infection", "Viral illness", "Asthma exacerbation"].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, padding: i === 0 ? "7px 10px" : "3px 8px", background: i === 0 ? T.muted : "transparent", border: i === 0 ? `1px solid ${T.border}` : "none", borderRadius: i === 0 ? 7 : 0 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontSize: 12, color: T.navy, fontWeight: i === 0 ? 500 : 400, flex: 1 }}>{c}</span>
              {i === 0 && <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 6px", borderRadius: 20 }}>Most likely</span>}
            </div>
          ))}

          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>MISSING INFORMATION</div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
              {["Temperature", "SpO₂", "Relevant medical history"].map((m) => (
                <span key={m} style={{ fontSize: 11, color: "#78350f", background: T.amberLight, border: `1px solid ${T.amberBorder}`, padding: "2px 9px", borderRadius: 20 }}>{m}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14, padding: "10px 12px", background: T.blueLight, border: `1px solid ${T.blueBorder}`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.blue, marginBottom: 3 }}>SUGGESTED REVIEW</div>
            <p style={{ margin: 0, fontSize: 11, color: "#1e3a8a", lineHeight: 1.5 }}>Consider checking vital signs and respiratory symptoms during clinical evaluation.</p>
          </div>

          <div style={{ marginTop: 12, padding: "8px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7 }}>
            <p style={{ margin: 0, fontSize: 10, color: T.gray, lineHeight: 1.55 }}>Preliminary clinical insight — not a diagnosis. Final assessment must be made by a qualified healthcare professional.</p>
          </div>
        </div>

        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.success}`, borderRadius: "0 11px 11px 0", padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Icon d={ic.shield} size={14} stroke={T.success} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>Safety Check</span>
            <Badge label="No Red Flags" color={T.success} bg={T.successLight} border={T.successBorder} />
          </div>
          <div style={{ padding: "10px 12px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 8, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Icon d={ic.checkCircle} size={14} stroke={T.success} />
              <p style={{ margin: 0, fontSize: 12, color: "#14532d", lineHeight: 1.5 }}>No immediate red flags identified from the information provided.</p>
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: T.primary, fontWeight: 600, padding: 0, fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
            View assessment details <Icon d={ic.chevRight} size={12} stroke={T.primary} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline tab ─────────────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  {
    date: "12 Sep 2026", day: "Today",
    label: "Clinical Intake", detail: "Cough + fever reported. Severity: Moderate.",
    dot: T.primary, icon: ic.activity, tag: "Intake",
    tagColor: T.primary, tagBg: T.primaryLight, tagBorder: T.primaryBorder,
  },
  {
    date: "08 Sep 2026", day: "",
    label: "Lab Report", detail: "Blood test uploaded. Results pending review.",
    dot: T.amber, icon: ic.flask, tag: "Lab",
    tagColor: T.amber, tagBg: T.amberLight, tagBorder: T.amberBorder,
  },
  {
    date: "08 Sep 2026", day: "",
    label: "Prescription", detail: "Previous prescription. Paracetamol 500mg for 3 days.",
    dot: T.purple, icon: ic.pill, tag: "Rx",
    tagColor: T.purple, tagBg: T.purpleLight, tagBorder: T.purpleBorder,
  },
  {
    date: "15 Aug 2026", day: "",
    label: "Doctor Consultation", detail: "General consultation with Dr. Mehta — General Medicine.",
    dot: T.blue, icon: ic.video, tag: "Consult",
    tagColor: T.blue, tagBg: T.blueLight, tagBorder: T.blueBorder,
  },
];

function TimelineTab() {
  return (
    <div style={{ maxWidth: 680 }}>
      <Card>
        <SectionHead title="Health Timeline" icon={ic.clock} />
        <div style={{ position: "relative" }}>
          {TIMELINE_EVENTS.map((ev, i) => (
            <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < TIMELINE_EVENTS.length - 1 ? 24 : 0, position: "relative" }}>
              {i < TIMELINE_EVENTS.length - 1 && (
                <div style={{ position: "absolute", left: 11, top: 26, bottom: 0, width: 1, background: T.border }} />
              )}
              {/* Dot */}
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: ev.dot + "18", border: `2px solid ${ev.dot}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ev.dot }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" as const }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{ev.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: ev.tagColor, background: ev.tagBg, border: `1px solid ${ev.tagBorder}`, padding: "1px 7px", borderRadius: 20 }}>{ev.tag}</span>
                  {ev.day && <span style={{ fontSize: 11, fontWeight: 600, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 7px", borderRadius: 20 }}>{ev.day}</span>}
                  <span style={{ marginLeft: "auto", fontSize: 11, color: T.grayLight, whiteSpace: "nowrap" as const }}>{ev.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: T.gray, lineHeight: 1.5 }}>{ev.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Documents tab ────────────────────────────────────────────────────────────
const DOCS = [
  { name: "Blood Test Report",     date: "08 Sep 2026", status: "OCR verified", statusColor: T.success, statusBg: T.successLight, statusBorder: T.successBorder, icon: ic.flask },
  { name: "Previous Prescription", date: "08 Sep 2026", status: "Verified",     statusColor: T.primary, statusBg: T.primaryLight, statusBorder: T.primaryBorder, icon: ic.pill  },
  { name: "General Consultation",  date: "15 Aug 2026", status: "Uploaded",     statusColor: T.blue,    statusBg: T.blueLight,    statusBorder: T.blueBorder,    icon: ic.fileText },
];

function DocumentsTab() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Card>
        <SectionHead title="Medical Documents" icon={ic.fileText}
          right={<span style={{ fontSize: 11, color: T.grayLight }}>{DOCS.length} documents</span>}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {DOCS.map((doc, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "13px 0",
              borderBottom: i < DOCS.length - 1 ? `1px solid ${T.border}` : "none",
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={doc.icon} size={16} stroke={T.gray} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 3 }}>{doc.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const }}>
                  <span style={{ fontSize: 11, color: T.grayLight }}>{doc.date}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: doc.statusColor, background: doc.statusBg, border: `1px solid ${doc.statusBorder}`, padding: "1px 8px", borderRadius: 20 }}>
                    {doc.status}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button style={{ padding: "6px 14px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon d={ic.eye} size={13} stroke={T.gray} />
                  View
                </button>
                <button style={{ padding: "6px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center" }}>
                  <Icon d={ic.download} size={13} stroke={T.gray} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Prescriptions tab ────────────────────────────────────────────────────────
function PrescriptionsTab() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Card>
        <SectionHead title="Prescriptions" icon={ic.pill}
          right={<Badge label="1 active" color={T.success} bg={T.successLight} border={T.successBorder} />}
        />
        <div style={{ border: `1px solid ${T.border}`, borderRadius: 9, overflow: "hidden" }}>
          <div style={{ display: "flex", padding: "9px 16px", background: T.muted, borderBottom: `1px solid ${T.border}`, gap: 12 }}>
            {["Medicine", "Dosage", "Frequency", "Duration", "Prescribed by"].map((h) => (
              <div key={h} style={{ flex: 1, fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.05em" }}>{h.toUpperCase()}</div>
            ))}
          </div>
          <div style={{ display: "flex", padding: "12px 16px", gap: 12 }}>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: T.navy }}>Paracetamol</div>
            <div style={{ flex: 1, fontSize: 13, color: T.navy }}>500 mg</div>
            <div style={{ flex: 1, fontSize: 13, color: T.navy }}>Twice daily</div>
            <div style={{ flex: 1, fontSize: 13, color: T.navy }}>3 days</div>
            <div style={{ flex: 1, fontSize: 13, color: T.gray }}>Dr. Mehta</div>
          </div>
        </div>
        <p style={{ margin: "10px 0 0", fontSize: 11, color: T.grayLight }}>Prescription date: 08 Sep 2026</p>
      </Card>
    </div>
  );
}

// ─── Lab reports tab ──────────────────────────────────────────────────────────
function LabTab() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Card>
        <SectionHead title="Lab Reports" icon={ic.flask} />
        <div style={{ border: `1px solid ${T.border}`, borderRadius: 9, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px" }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: T.amberLight, border: `1px solid ${T.amberBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={ic.flask} size={16} stroke={T.amber} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>Blood Test Report</div>
              <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                <span style={{ fontSize: 11, color: T.grayLight }}>08 Sep 2026</span>
                <Badge label="Results pending review" color={T.amber} bg={T.amberLight} border={T.amberBorder} />
              </div>
            </div>
            <button style={{ padding: "6px 14px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon d={ic.eye} size={13} stroke={T.gray} />
              View
            </button>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: "12px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: T.gray }}>Lab results are uploaded by the patient or their care provider and may require clinical verification before use in diagnosis.</p>
        </div>
      </Card>
    </div>
  );
}

// ─── ABHA tab ─────────────────────────────────────────────────────────────────
function AbhaTab() {
  return (
    <div style={{ maxWidth: 680 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.abha} size={17} stroke={T.primary} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>ABHA Health Records</div>
            <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>Ayushman Bharat Health Account</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Badge label="Connected" color={T.success} bg={T.successLight} border={T.successBorder} />
          </div>
        </div>

        <Row label="ABHA number"      value={<span style={{ fontFamily: "monospace", fontSize: 12, color: T.navy }}>••••-••••-••••-1234</span>} />
        <Row label="Records available" value="12 records across 4 providers" />
        <Row label="Last consent"     value="Sep 10, 2026 — Dr. Priya Mehta" />
        <Row label="Consent duration" value="90 days (expires Dec 9, 2026)" />
        <Row label="Consent scope"    value="Health records, lab reports, prescriptions" />

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button style={{ flex: 1, padding: "9px", background: T.white, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon d={ic.externalLink} size={13} stroke={T.primary} />
            View shared records
          </button>
          <button style={{ flex: 1, padding: "9px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon d={ic.info} size={13} stroke={T.gray} />
            Consent details
          </button>
        </div>

        <div style={{ marginTop: 14, padding: "10px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
            Access is based on patient consent. All ABHA record access is logged and governed under the National Digital Health Mission (NDHM) framework.
          </p>
        </div>
      </Card>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function PatientRecord({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [moreOpen, setMoreOpen] = useState(false);

  function renderTab() {
    if (tab === "overview")      return <OverviewTab />;
    if (tab === "summary")       return <SummaryTab />;
    if (tab === "timeline")      return <TimelineTab />;
    if (tab === "documents")     return <DocumentsTab />;
    if (tab === "prescriptions") return <PrescriptionsTab />;
    if (tab === "lab")           return <LabTab />;
    if (tab === "abha")          return <AbhaTab />;
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy }}>

      {/* Top bar */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        {/* Primary bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 28px", height: 60 }}>
          {/* Back */}
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.gray, fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 500, padding: "4px 0" }}>
            <Icon d={ic.chevLeft} size={16} stroke={T.gray} />
            Back
          </button>

          <div style={{ width: 1, height: 26, background: T.border }} />

          {/* Logo mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={14} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.navy, letterSpacing: "-0.01em" }}>Patient Clinical Record</div>
              <div style={{ fontSize: 10, color: T.grayLight }}>MediKiosk Health Platform</div>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Status chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success }} />
            <span style={{ fontSize: 11, color: T.success, fontWeight: 600 }}>Clinical summary ready</span>
          </div>

          <div style={{ width: 1, height: 26, background: T.border }} />

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button style={{ padding: "7px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon d={ic.print} size={13} stroke={T.gray} />
              Print
            </button>
            <button style={{ padding: "7px 14px", background: T.white, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon d={ic.edit} size={13} stroke={T.primary} />
              Create Prescription
            </button>
            <button style={{ padding: "7px 16px", background: T.primary, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon d={ic.video} size={14} stroke="#fff" />
              Start Consultation
            </button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setMoreOpen((v) => !v)} style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer" }}>
                <Icon d={ic.more} size={18} stroke={T.gray} />
              </button>
              {moreOpen && (
                <>
                  <div onClick={() => setMoreOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 30 }} />
                  <div style={{ position: "absolute", right: 0, top: 40, background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", width: 176, zIndex: 40, overflow: "hidden" }}>
                    {[
                      { label: "Share record", icon: ic.share },
                      { label: "Download PDF", icon: ic.download },
                      { label: "ABHA records", icon: ic.link },
                    ].map((item) => (
                      <button key={item.label} onClick={() => setMoreOpen(false)} style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "10px 14px",
                        background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.navy, textAlign: "left", fontFamily: "Inter, system-ui, sans-serif",
                      }}>
                        <Icon d={item.icon} size={14} stroke={T.gray} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Patient strip */}
        <div style={{ background: T.navy, padding: "12px 28px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>R</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Rahul Sharma</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>24 years • Male • Patient ID: MK-00421</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: "rgba(255,255,255,0.07)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)" }}>
              <Icon d={ic.abha} size={12} stroke="#5dd6c8" />
              <span style={{ fontSize: 11, color: "#5dd6c8", fontWeight: 600 }}>ABHA Connected</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: "rgba(255,255,255,0.07)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)" }}>
              <Icon d={ic.shield} size={12} stroke="#5dd6c8" />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>No known allergies</span>
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ display: "flex", padding: "0 28px", borderTop: `1px solid ${T.border}`, overflowX: "auto" as const }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "12px 16px", background: "none", border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? T.primary : T.gray,
                borderBottom: tab === t.id ? `2px solid ${T.primary}` : "2px solid transparent",
                whiteSpace: "nowrap" as const, fontFamily: "Inter, system-ui, sans-serif",
                transition: "color 0.12s, border-color 0.12s", marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Tab content */}
      <main style={{ flex: 1, padding: "28px 28px 80px", maxWidth: 1160, width: "100%", margin: "0 auto", boxSizing: "border-box" as const }}>
        {renderTab()}
      </main>

      {/* Sticky bottom bar */}
      <div style={{
        position: "sticky", bottom: 0, background: T.white,
        borderTop: `1px solid ${T.border}`,
        padding: "12px 28px", display: "flex", alignItems: "center", gap: 10, zIndex: 10,
      }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 12, color: T.grayLight }}>Patient: <strong style={{ color: T.navy }}>Rahul Sharma</strong> · MK-00421</span>
        </div>
        <button style={{ padding: "9px 18px", background: T.white, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 7 }}>
          <Icon d={ic.edit} size={15} stroke={T.primary} />
          Create Prescription
        </button>
        <button style={{ padding: "9px 20px", background: T.primary, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 7 }}>
          <Icon d={ic.video} size={15} stroke="#fff" />
          Start Consultation
        </button>
      </div>
    </div>
  );
}

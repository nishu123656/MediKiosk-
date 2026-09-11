import { useState, useRef, useEffect } from "react";

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
  heart:        "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  check:        "M20 6L9 17l-5-5",
  checkCircle:  "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  arrowLeft:    "M19 12H5M12 5l-7 7 7 7",
  arrowRight:   "M5 12h14M12 5l7 7-7 7",
  chevRight:    "M9 18l6-6-6-6",
  mic:          "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8",
  micOff:       "M1 1l22 22 M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6 M17 16.95A7 7 0 015 12v-2m14 0v2c0 .64-.08 1.27-.23 1.88 M12 19v4 M8 23h8",
  send:         "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  info:         "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  alertTri:     "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  shield:       "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  fileText:     "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  user:         "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  activity:     "M22 12h-4l-3 9L9 3l-3 9H2",
  pill:         "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  stethoscope:  "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  thermometer:  "M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z",
  clock:        "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  chevDown:     "M19 9l-7 7-7-7",
  chevUp:       "M5 15l7-7 7 7",
  eye:          "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  phone:        "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.01 2 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  lock:         "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
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
};

// ─── Simulated question sequence ─────────────────────────────────────────────
const QUESTIONS = [
  {
    id:       1,
    question: "What is your main concern today?",
    type:     "text" as const,
    answered: "Cough with mild fever",
  },
  {
    id:       2,
    question: "How would you describe the cough?",
    type:     "options" as const,
    answered: "Dry, persistent",
    options:  ["Dry cough", "Productive (with phlegm)", "Barking", "Whooping", "Not sure"],
  },
  {
    id:       3,
    question: "Are you experiencing any fever?",
    type:     "options" as const,
    answered: "Yes — mild, around 99–100°F",
    options:  ["No fever", "Mild (99–100°F)", "Moderate (100–102°F)", "High (above 102°F)", "Not sure"],
  },
  {
    id:       4,
    question: "When did your cough start?",
    type:     "options" as const,
    answered: null,
    options:  ["Today", "1–3 days ago", "4–7 days ago", "More than a week ago"],
  },
  {
    id:       5,
    question: "Do you have any other symptoms alongside the cough?",
    type:     "multi" as const,
    answered: null,
    options:  ["Runny nose", "Sore throat", "Headache", "Body aches", "Shortness of breath", "Chest pain", "Loss of taste or smell", "None of the above"],
  },
  {
    id:       6,
    question: "On a scale of severity, how much is the cough affecting your daily activity?",
    type:     "severity" as const,
    answered: null,
  },
  {
    id:       7,
    question: "Do you have any known medical conditions?",
    type:     "text" as const,
    answered: null,
  },
  {
    id:       8,
    question: "Are you currently taking any medicines?",
    type:     "text" as const,
    answered: null,
  },
  {
    id:       9,
    question: "Do you have any known allergies — to medicines or otherwise?",
    type:     "text" as const,
    answered: null,
  },
  {
    id:       10,
    question: "Is there anything else you'd like your doctor to know before the consultation?",
    type:     "text" as const,
    answered: null,
  },
];

// ─── Collected data panel ─────────────────────────────────────────────────────
const COLLECTED = [
  { label: "Chief Complaint",      value: "Cough",           status: "filled" as const },
  { label: "Duration",             value: "3 days",          status: "filled" as const },
  { label: "Associated Symptoms",  value: "Fever",           status: "filled" as const },
  { label: "Severity",             value: "Moderate",        status: "filled" as const },
  { label: "Medical History",      value: "Not provided",    status: "empty"  as const },
  { label: "Current Medicines",    value: "Not provided",    status: "empty"  as const },
  { label: "Allergies",            value: "Not provided",    status: "empty"  as const },
  { label: "Vitals",               value: "Not available",   status: "empty"  as const },
];

const SAFETY = [
  { flag: false, text: "No chest pain reported"                    },
  { flag: false, text: "No shortness of breath reported"           },
  { flag: true,  text: "Fever present — monitor temperature"       },
  { flag: false, text: "No loss of consciousness"                  },
];

const CLINICAL_CONSIDERATIONS = [
  { label: "Possible considerations", value: "Acute viral upper respiratory tract infection", risk: null   },
  { label: "Risk level",              value: "Low to moderate",                                risk: "low" },
];

const MISSING = [
  "Duration of fever",
  "Associated symptoms (sore throat, runny nose)",
  "Travel or contact history",
  "Vaccination history",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TopBar() {
  return (
    <header style={{
      background: T.white,
      borderBottom: `1px solid ${T.border}`,
      height: 60,
      display: "flex", alignItems: "center",
      padding: "0 24px",
      flexShrink: 0,
      gap: 16,
      position: "sticky",
      top: 0,
      zIndex: 20,
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

      {/* Step label */}
      <div style={{ marginLeft: "auto", fontSize: 12, color: T.grayLight, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontWeight: 600, color: T.navy }}>Step 4 of 5</span>
        &nbsp;·&nbsp;Clinical Intake
      </div>
    </header>
  );
}

// ─── Thin linear progress bar ─────────────────────────────────────────────────
function IntakeProgress({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Clinical Check-in</span>
        <span style={{ fontSize: 12, color: T.grayLight }}>
          Question <span style={{ fontWeight: 600, color: T.navy }}>{current}</span> of {total}
        </span>
      </div>
      <div style={{ height: 4, background: T.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: T.primary,
          width: `${pct}%`,
          transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}

// ─── Quick option pill ────────────────────────────────────────────────────────
function QuickOption({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "9px 16px",
        borderRadius: 8,
        border: `1.5px solid ${selected ? T.primary : T.border}`,
        background: selected ? T.primaryLight : T.white,
        color: selected ? T.navy : T.gray,
        fontSize: 13, fontWeight: selected ? 600 : 400,
        cursor: "pointer",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex", alignItems: "center", gap: 7,
        transition: "all 0.15s",
        whiteSpace: "nowrap" as const,
      }}
    >
      {selected && (
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={ic.check} size={9} stroke="#fff" />
        </div>
      )}
      {label}
    </button>
  );
}

// ─── History entry row ────────────────────────────────────────────────────────
function HistoryRow({ q, a, qNum }: { q: string; a: string; qNum: number }) {
  return (
    <div style={{ paddingBottom: 14, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{
          width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1,
          background: T.successLight, border: `1px solid ${T.successBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon d={ic.check} size={11} stroke={T.success} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: T.grayLight, marginBottom: 2 }}>Q{qNum}</div>
          <div style={{ fontSize: 12, color: T.gray, marginBottom: 4, lineHeight: 1.5 }}>{q}</div>
          <div style={{
            fontSize: 13, fontWeight: 600, color: T.navy,
            padding: "5px 10px",
            background: T.muted,
            border: `1px solid ${T.border}`,
            borderRadius: 7,
            display: "inline-block",
          }}>
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Collected info panel ─────────────────────────────────────────────────────
function CollectedPanel() {
  const [clinicalOpen, setClinicalOpen] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Information collected */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={ic.fileText} size={15} stroke={T.primary} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Information Collected</span>
          </div>
          <p style={{ fontSize: 11, color: T.grayLight, margin: "4px 0 0" }}>
            Updated as you answer each question
          </p>
        </div>
        <div style={{ padding: "4px 0 8px" }}>
          {COLLECTED.map((item) => (
            <div key={item.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "8px 16px",
              gap: 12,
            }}>
              <span style={{ fontSize: 12, color: T.gray, flexShrink: 0 }}>{item.label}</span>
              <span style={{
                fontSize: 12,
                fontWeight: item.status === "filled" ? 600 : 400,
                color: item.status === "filled" ? T.navy : T.grayLight,
                textAlign: "right",
                fontStyle: item.status === "empty" ? "italic" : "normal",
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety check */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={ic.shield} size={15} stroke={T.success} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Safety Check</span>
          </div>
        </div>
        <div style={{ padding: "10px 16px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          {SAFETY.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
              <div style={{
                width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                background: s.flag ? "#fef3c7" : T.successLight,
                border: `1px solid ${s.flag ? "#fde68a" : T.successBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon
                  d={s.flag ? ic.alertTri : ic.check}
                  size={9}
                  stroke={s.flag ? T.amber : T.success}
                />
              </div>
              <span style={{ fontSize: 12, color: s.flag ? "#92400e" : T.gray, lineHeight: 1.5 }}>
                {s.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Intelligence */}
      <div style={{
        background: T.white,
        border: `1px solid ${T.border}`,
        borderLeft: `3px solid ${T.amber}`,
        borderRadius: "0 11px 11px 0",
        overflow: "hidden",
      }}>
        <button
          onClick={() => setClinicalOpen((v) => !v)}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 16px",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={ic.activity} size={15} stroke={T.amber} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Clinical Intelligence</span>
          </div>
          <Icon d={clinicalOpen ? ic.chevUp : ic.chevDown} size={14} stroke={T.grayLight} />
        </button>

        {clinicalOpen && (
          <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${T.border}` }}>
            <p style={{ fontSize: 11, color: T.grayLight, margin: "10px 0 14px", fontStyle: "italic" }}>
              Preliminary clinical insight — not a diagnosis
            </p>

            {CLINICAL_CONSIDERATIONS.map((c) => (
              <div key={c.label} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em", marginBottom: 3 }}>
                  {c.label.toUpperCase()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ fontSize: 12, color: T.navy }}>{c.value}</span>
                  {c.risk === "low" && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: T.success,
                      background: T.successLight, border: `1px solid ${T.successBorder}`,
                      padding: "1px 7px", borderRadius: 20,
                    }}>Low risk</span>
                  )}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em", marginBottom: 8 }}>
                MISSING INFORMATION
              </div>
              {MISSING.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.amber, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: T.gray }}>{m}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 14, padding: "10px 12px",
              background: T.amberLight, border: `1px solid ${T.amberBorder}`,
              borderRadius: 8,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em", marginBottom: 3 }}>
                SUGGESTED NEXT STEP
              </div>
              <p style={{ fontSize: 12, color: "#78350f", margin: 0, lineHeight: 1.5 }}>
                Complete remaining questions to allow a more accurate clinical summary for your doctor.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ClinicalIntake({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack: () => void;
}) {
  const TOTAL = QUESTIONS.length;
  const [currentIdx, setCurrentIdx] = useState(3);       // Q4 (0-indexed = 3)
  const [selectedOpts, setSelectedOpts] = useState<string[]>([]);
  const [freeText, setFreeText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [textFocused, setTextFocused] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const current = QUESTIONS[currentIdx];
  const answered = QUESTIONS.slice(0, currentIdx).filter((q) => q.answered);

  const canAdvance =
    selectedOpts.length > 0 || freeText.trim().length > 0;

  function advance() {
    if (!canAdvance) return;
    if (currentIdx < TOTAL - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedOpts([]);
      setFreeText("");
    } else {
      onContinue();
    }
  }

  function toggleOpt(opt: string) {
    if (current.type === "multi") {
      setSelectedOpts((prev) =>
        prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
      );
    } else {
      setSelectedOpts([opt]);
    }
  }

  const isLast = currentIdx === TOTAL - 1;
  const currentQ = currentIdx + 1;

  return (
    <div style={{
      minHeight: "100%",
      background: T.bg,
      fontFamily: "Inter, system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      <TopBar />

      {/* Two-column layout */}
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "minmax(0,1fr) 300px",
      }}>

        {/* ── LEFT: Question area ── */}
        <div style={{ padding: "36px 40px 60px" }}>
          <div style={{ maxWidth: 560 }}>

            <IntakeProgress current={currentQ} total={TOTAL} />

            {/* Conversation history (answered Qs) */}
            {answered.length > 0 && (
              <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                {answered.map((q) => (
                  <HistoryRow key={q.id} q={q.question} a={q.answered!} qNum={q.id} />
                ))}
              </div>
            )}

            {/* Current question card */}
            <div style={{
              background: T.white,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "24px 24px 20px",
              marginBottom: 20,
            }}>
              {/* Q number badge + question */}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: T.primaryLight, border: `1.5px solid ${T.primaryBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>Q{currentQ}</span>
                </div>
                <h2 style={{
                  fontSize: 17, fontWeight: 700, color: T.navy,
                  margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em",
                  paddingTop: 2,
                }}>
                  {current.question}
                </h2>
              </div>

              {/* Quick options */}
              {(current.type === "options" || current.type === "multi") && current.options && (
                <div style={{ marginBottom: 18 }}>
                  <p style={{ fontSize: 12, color: T.grayLight, margin: "0 0 10px" }}>
                    {current.type === "multi" ? "Select all that apply" : "Select one option"}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {current.options.map((opt) => (
                      <QuickOption
                        key={opt}
                        label={opt}
                        selected={selectedOpts.includes(opt)}
                        onClick={() => toggleOpt(opt)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Severity picker */}
              {current.type === "severity" && (
                <div style={{ marginBottom: 18 }}>
                  <p style={{ fontSize: 12, color: T.grayLight, margin: "0 0 10px" }}>How much is it affecting your daily activity?</p>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[
                      { id: "mild",     label: "Mild",     desc: "Can carry on normally",   dot: T.success, bg: "#f0fdf4", bd: "#bbf7d0" },
                      { id: "moderate", label: "Moderate", desc: "Limiting some activities", dot: T.amber,   bg: "#fffbeb", bd: "#fde68a" },
                      { id: "severe",   label: "Severe",   desc: "Significantly impaired",   dot: T.danger,  bg: "#fff5f5", bd: "#fecaca" },
                    ].map((s) => {
                      const active = selectedOpts.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelectedOpts([s.id])}
                          style={{
                            flex: 1, padding: "12px 10px",
                            background: active ? s.bg : T.white,
                            border: `1.5px solid ${active ? s.dot : T.border}`,
                            borderRadius: 9, cursor: "pointer", textAlign: "left",
                            fontFamily: "Inter, system-ui, sans-serif",
                            transition: "all 0.15s",
                          }}
                        >
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, marginBottom: 6 }} />
                          <div style={{ fontSize: 13, fontWeight: 600, color: active ? T.navy : T.navy }}>{s.label}</div>
                          <div style={{ fontSize: 11, color: T.grayLight, marginTop: 2, lineHeight: 1.4 }}>{s.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Free-text input */}
              <div>
                {(current.type === "options" || current.type === "multi" || current.type === "severity") && (
                  <p style={{ fontSize: 12, color: T.grayLight, margin: "0 0 8px" }}>
                    Or describe it in your own words
                  </p>
                )}
                <div style={{ position: "relative" }}>
                  <textarea
                    ref={textRef}
                    rows={current.type === "text" ? 4 : 2}
                    placeholder={
                      current.type === "text"
                        ? "Type your answer here..."
                        : "Add any additional details..."
                    }
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                    onFocus={() => setTextFocused(true)}
                    onBlur={() => setTextFocused(false)}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      border: `1.5px solid ${textFocused ? T.primary : T.border}`,
                      borderRadius: 9,
                      fontSize: 13, color: T.navy,
                      background: T.white,
                      outline: "none",
                      fontFamily: "Inter, system-ui, sans-serif",
                      resize: "vertical",
                      lineHeight: 1.6,
                      boxSizing: "border-box",
                      transition: "border-color 0.15s",
                    }}
                  />
                </div>
              </div>

              {/* Voice button */}
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => setIsRecording((v) => !v)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "8px 16px",
                    background: isRecording ? "#fff5f5" : T.muted,
                    border: `1px solid ${isRecording ? T.danger : T.border}`,
                    borderRadius: 8,
                    fontSize: 12, fontWeight: 500,
                    color: isRecording ? T.danger : T.gray,
                    cursor: "pointer",
                    fontFamily: "Inter, system-ui, sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {/* Pulse dot when recording */}
                  {isRecording ? (
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: T.danger, display: "inline-block",
                      animation: "pulse 1.2s ease-in-out infinite",
                    }} />
                  ) : (
                    <Icon d={ic.mic} size={14} stroke={T.gray} />
                  )}
                  {isRecording ? "Recording… tap to stop" : "Speak your answer"}
                </button>
                {isRecording && (
                  <span style={{ fontSize: 11, color: T.grayLight, marginLeft: 10 }}>
                    Your response will be transcribed automatically.
                  </span>
                )}
              </div>
            </div>

            {/* Navigation row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={currentIdx === 0 ? onBack : () => { setCurrentIdx((i) => i - 1); setSelectedOpts([]); setFreeText(""); }}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "10px 18px",
                  background: T.white, border: `1px solid ${T.border}`,
                  borderRadius: 9, fontSize: 13, fontWeight: 500, color: T.gray,
                  cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                <Icon d={ic.arrowLeft} size={14} stroke={T.gray} />
                {currentIdx === 0 ? "Back" : "Previous"}
              </button>

              <button
                onClick={advance}
                disabled={!canAdvance}
                style={{
                  flex: 1, padding: "11px 20px",
                  background: canAdvance ? T.primary : "#d1d9e0",
                  color: canAdvance ? "#fff" : T.grayLight,
                  border: "none", borderRadius: 9,
                  fontSize: 13, fontWeight: 600,
                  cursor: canAdvance ? "pointer" : "not-allowed",
                  fontFamily: "Inter, system-ui, sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "background 0.15s",
                }}
              >
                {isLast ? "Complete & Continue to Doctor Review" : "Next question"}
                <Icon d={ic.arrowRight} size={15} stroke={canAdvance ? "#fff" : T.grayLight} />
              </button>
            </div>

            {/* Confidentiality note */}
            <div style={{
              marginTop: 24, display: "flex", alignItems: "center", gap: 7,
              justifyContent: "center",
            }}>
              <Icon d={ic.lock} size={13} stroke={T.grayLight} />
              <span style={{ fontSize: 11, color: T.grayLight }}>
                Your responses are confidential and shared only with your treating physician.
              </span>
            </div>

          </div>
        </div>

        {/* ── RIGHT: Collected panel ── */}
        <div style={{
          borderLeft: `1px solid ${T.border}`,
          background: T.bg,
          padding: "24px 16px 40px",
        }}>
          <CollectedPanel />
        </div>
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

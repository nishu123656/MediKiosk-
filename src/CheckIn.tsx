import { useState, useRef } from "react";

// ─── Icon primitive — same as all MediKiosk screens ──────────────────────────
const Icon = ({
  d, size = 18, stroke = "currentColor", fill = "none",
}: { d: string; size?: number; stroke?: string; fill?: string }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const ic = {
  heart:       "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  arrowLeft:   "M19 12H5M12 5l-7 7 7 7",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  mic:         "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8",
  keyboard:    "M20 5H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2z M8 10h.01 M12 10h.01 M16 10h.01 M8 14h8",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.01 2 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  save:        "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  mapPin:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  fileSearch:  "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M12 18v-6 M9 15h6",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  moreHoriz:   "M5 12h.01 M12 12h.01 M19 12h.01",
};

// ─── Design tokens ────────────────────────────────────────────────────────────
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
  amber:         "#d97706",
  amberLight:    "#fffbeb",
  amberBorder:   "#fde68a",
};

// ─── Progress bar — 5 steps ───────────────────────────────────────────────────
const STEPS = [
  { label: "Account",        done: true  },
  { label: "Consent",        done: true  },
  { label: "Check-in",       done: false, current: true },
  { label: "Clinical Intake",done: false },
  { label: "Doctor Review",  done: false },
];

function ProgressBar() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 40 }}>
      {STEPS.map((step, i) => {
        const isLast = i === STEPS.length - 1;
        return (
          <div key={step.label} style={{ display: "flex", alignItems: "flex-start", flex: isLast ? "none" : 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: step.done ? T.primary : step.current ? T.primaryLight : T.muted,
                border: `1.5px solid ${step.done || step.current ? T.primary : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {step.done
                  ? <Icon d={ic.check} size={13} stroke="#fff" />
                  : <span style={{ fontSize: 11, fontWeight: 700, color: step.current ? T.primary : T.grayLight }}>
                      {i + 1}
                    </span>}
              </div>
              <span style={{
                fontSize: 11, whiteSpace: "nowrap",
                fontWeight: step.current ? 600 : 400,
                color: step.done ? T.primary : step.current ? T.navy : T.grayLight,
              }}>
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div style={{
                flex: 1, height: 1.5, marginTop: 13, marginLeft: 6, marginRight: 6,
                background: step.done ? T.primary : T.border,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  number, title, subtitle,
}: { number: number; title: string; subtitle?: string }) {
  return (
    <div style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 18 }}>
      <div style={{
        width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 1,
        background: T.primaryLight, border: `1.5px solid ${T.primaryBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>{number}</span>
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, letterSpacing: "-0.01em" }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 13, color: T.gray, marginTop: 3 }}>{subtitle}</div>
        )}
      </div>
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: T.border, margin: "28px 0" }} />;
}

// ─── Visit reason options ─────────────────────────────────────────────────────
const VISIT_REASONS = [
  { id: "new",      label: "New health concern",         icon: ic.alertTri,    desc: "Something I haven't had before"        },
  { id: "followup", label: "Follow-up visit",            icon: ic.checkCircle, desc: "Continuing care from a previous visit" },
  { id: "report",   label: "Review my test or report",   icon: ic.fileSearch,  desc: "Discuss results with a doctor"         },
  { id: "med",      label: "Medication-related concern", icon: ic.pill,        desc: "Dosage, side effects or refills"        },
  { id: "general",  label: "General consultation",       icon: ic.stethoscope, desc: "Routine check or advice"               },
  { id: "other",    label: "Other",                      icon: ic.moreHoriz,   desc: "Something else not listed above"       },
];

function ReasonSelector({
  selected, onSelect,
}: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {VISIT_REASONS.map((r) => {
        const active = selected === r.id;
        return (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "11px 14px",
              background: active ? T.primaryLight : T.white,
              border: `1.5px solid ${active ? T.primary : T.border}`,
              borderRadius: 9,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "Inter, system-ui, sans-serif",
              transition: "border-color 0.15s, background 0.15s",
            }}
          >
            {/* Icon tile */}
            <div style={{
              width: 34, height: 34, borderRadius: 8, flexShrink: 0,
              background: active ? "#d1faf5" : T.muted,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s",
            }}>
              <Icon d={r.icon} size={16} stroke={active ? T.primary : T.gray} />
            </div>
            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 13, fontWeight: active ? 600 : 500,
                color: active ? T.navy : T.navy,
              }}>
                {r.label}
              </div>
              <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>{r.desc}</div>
            </div>
            {/* Radio dot */}
            <div style={{
              width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
              border: `1.5px solid ${active ? T.primary : T.border}`,
              background: active ? T.primary : T.white,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>
              {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main concern textarea ────────────────────────────────────────────────────
const MAX_CHARS = 600;

function ConcernTextarea({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const remaining = MAX_CHARS - value.length;
  const nearLimit = remaining < 80;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <textarea
          rows={5}
          placeholder="Example: I've had a cough and mild fever for the last 3 days. It started suddenly and gets worse at night. I also feel a little tired..."
          value={value}
          maxLength={MAX_CHARS}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "12px 14px",
            border: `1.5px solid ${focused ? T.primary : T.border}`,
            borderRadius: 9,
            fontSize: 13,
            color: T.navy,
            background: T.white,
            outline: "none",
            fontFamily: "Inter, system-ui, sans-serif",
            resize: "vertical",
            lineHeight: 1.6,
            boxSizing: "border-box",
            transition: "border-color 0.15s",
          }}
        />
        {/* Character counter */}
        <div style={{
          position: "absolute", bottom: 10, right: 12,
          fontSize: 11,
          color: nearLimit ? T.amber : T.grayLight,
          fontWeight: nearLimit ? 600 : 400,
          pointerEvents: "none",
        }}>
          {remaining}
        </div>
      </div>
      <p style={{ fontSize: 12, color: T.grayLight, margin: "7px 0 0", lineHeight: 1.5 }}>
        You can describe your symptoms in your own words — in English or Hindi.
        More detail helps the doctor prepare better.
      </p>
    </div>
  );
}

// ─── Voice / Text mode selector ───────────────────────────────────────────────
function ModeSelector({
  mode, onSelect,
}: { mode: "text" | "voice"; onSelect: (m: "text" | "voice") => void }) {
  const opts = [
    {
      id:    "text"  as const,
      icon:  ic.keyboard,
      label: "Text",
      sub:   "Type your responses",
    },
    {
      id:    "voice" as const,
      icon:  ic.mic,
      label: "Voice",
      sub:   "Speak naturally",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 10 }}>
        {opts.map((o) => {
          const active = mode === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onSelect(o.id)}
              style={{
                flex: 1, padding: "14px 16px",
                background: active ? T.primaryLight : T.white,
                border: `1.5px solid ${active ? T.primary : T.border}`,
                borderRadius: 10,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12,
                fontFamily: "Inter, system-ui, sans-serif",
                transition: "all 0.15s",
                textAlign: "left",
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                background: active ? "#d1faf5" : T.muted,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}>
                <Icon d={o.icon} size={18} stroke={active ? T.primary : T.gray} />
              </div>
              <div>
                <div style={{
                  fontSize: 14, fontWeight: 600,
                  color: active ? T.navy : T.gray,
                }}>
                  {o.label}
                </div>
                <div style={{ fontSize: 12, color: T.grayLight, marginTop: 2 }}>{o.sub}</div>
              </div>
              {/* Selection dot */}
              <div style={{
                marginLeft: "auto",
                width: 16, height: 16, borderRadius: "50%",
                border: `1.5px solid ${active ? T.primary : T.border}`,
                background: active ? T.primary : T.white,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.15s",
              }}>
                {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
              </div>
            </button>
          );
        })}
      </div>
      <p style={{ fontSize: 12, color: T.grayLight, margin: 0 }}>
        You can switch between voice and text at any point during your check-in.
      </p>
    </div>
  );
}

// ─── Duration options ─────────────────────────────────────────────────────────
const DURATIONS = [
  "Less than 24 hours",
  "1–3 days",
  "4–7 days",
  "1–2 weeks",
  "More than 2 weeks",
  "Ongoing / recurring",
];

// ─── Severity scale ───────────────────────────────────────────────────────────
const SEVERITY = [
  { id: "mild",     label: "Mild",     desc: "Noticeable but not limiting daily activity", color: T.success,   bg: "#f0fdf4", border: "#bbf7d0" },
  { id: "moderate", label: "Moderate", desc: "Affecting some daily activities",            color: T.amber,     bg: "#fffbeb", border: "#fde68a" },
  { id: "severe",   label: "Severe",   desc: "Significantly limiting normal activity",     color: T.danger,    bg: "#fff5f5", border: "#fecaca" },
];

function SeverityPicker({
  selected, onSelect,
}: { selected: string; onSelect: (s: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {SEVERITY.map((s) => {
        const active = selected === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              flex: 1, padding: "12px 14px",
              background: active ? s.bg : T.white,
              border: `1.5px solid ${active ? s.color : T.border}`,
              borderRadius: 9,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "Inter, system-ui, sans-serif",
              transition: "all 0.15s",
            }}
          >
            {/* Indicator dot */}
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: active ? s.color : T.grayLight,
              marginBottom: 8,
              transition: "background 0.15s",
            }} />
            <div style={{
              fontSize: 13, fontWeight: 600,
              color: active ? s.color : T.navy,
              marginBottom: 4,
            }}>
              {s.label}
            </div>
            <div style={{ fontSize: 11, color: T.grayLight, lineHeight: 1.4 }}>{s.desc}</div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Select input ─────────────────────────────────────────────────────────────
function SelectInput({
  value, onChange, options, placeholder, icon,
}: {
  value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string; icon?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <Icon d={icon} size={15} stroke={focused ? T.primary : T.grayLight} />
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: `10px 36px 10px ${icon ? "38px" : "14px"}`,
          border: `1.5px solid ${focused ? T.primary : T.border}`,
          borderRadius: 9,
          fontSize: 13,
          color: value ? T.navy : T.grayLight,
          background: T.white,
          outline: "none",
          appearance: "none",
          fontFamily: "Inter, system-ui, sans-serif",
          cursor: "pointer",
          boxSizing: "border-box",
          transition: "border-color 0.15s",
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {/* Chevron */}
      <svg
        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        width={14} height={14} viewBox="0 0 24 24" fill="none"
        stroke={T.grayLight} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────
function TextInput({
  value, onChange, placeholder, icon,
}: { value: string; onChange: (v: string) => void; placeholder: string; icon?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <Icon d={icon} size={15} stroke={focused ? T.primary : T.grayLight} />
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: `10px 14px 10px ${icon ? "38px" : "14px"}`,
          border: `1.5px solid ${focused ? T.primary : T.border}`,
          borderRadius: 9,
          fontSize: 13,
          color: T.navy,
          background: T.white,
          outline: "none",
          fontFamily: "Inter, system-ui, sans-serif",
          boxSizing: "border-box",
          transition: "border-color 0.15s",
        }}
      />
    </div>
  );
}

// ─── Field label ──────────────────────────────────────────────────────────────
function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label style={{
      display: "block", fontSize: 13, fontWeight: 600,
      color: T.navy, marginBottom: 7,
    }}>
      {text}
      {required && <span style={{ color: T.danger, marginLeft: 3 }}>*</span>}
    </label>
  );
}

// ─── Emergency notice ─────────────────────────────────────────────────────────
function EmergencyNotice() {
  return (
    <div style={{
      padding: "16px 18px",
      background: T.dangerLight,
      border: `1px solid ${T.dangerBorder}`,
      borderLeft: `3px solid ${T.danger}`,
      borderRadius: "0 10px 10px 0",
      display: "flex", gap: 14, alignItems: "flex-start",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
        background: "#fee2e2",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon d={ic.alertTri} size={18} stroke={T.danger} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.danger, marginBottom: 4 }}>
          Having an emergency?
        </div>
        <p style={{
          fontSize: 12, color: "#7f1d1d", margin: "0 0 12px", lineHeight: 1.6,
        }}>
          If you have severe difficulty breathing, loss of consciousness, severe bleeding,
          or another medical emergency, do not wait — seek emergency medical care immediately.
        </p>
        <a
          href="tel:112"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "8px 16px",
            background: T.danger, color: "#fff",
            borderRadius: 8, fontSize: 12, fontWeight: 700,
            textDecoration: "none", letterSpacing: "0.01em",
          }}
        >
          <Icon d={ic.phone} size={13} stroke="#fff" />
          Emergency Help · Call 112
        </a>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CheckIn({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack: () => void;
}) {
  const [reason,   setReason]   = useState("");
  const [concern,  setConcern]  = useState("");
  const [mode,     setMode]     = useState<"text" | "voice">("text");
  const [city,     setCity]     = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");

  // Required: reason + concern (min 20 chars)
  const canContinue = reason !== "" && concern.trim().length >= 20;

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      fontFamily: "Inter, system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── Top bar ── */}
      <header style={{
        background: T.white,
        borderBottom: `1px solid ${T.border}`,
        height: 60,
        display: "flex", alignItems: "center",
        padding: "0 32px",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, background: T.primary, borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon d={ic.heart} size={16} stroke="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, letterSpacing: "-0.01em" }}>MediKiosk</div>
            <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 500, letterSpacing: "0.04em" }}>HEALTH PLATFORM</div>
          </div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: T.grayLight, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 600, color: T.navy }}>Step 3 of 5</span>
          &nbsp;·&nbsp;Health Check-in
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <div style={{
        flex: 1,
        display: "flex", justifyContent: "center",
        padding: "44px 24px 100px",
      }}>
        <div style={{ width: "100%", maxWidth: 640 }}>

          <ProgressBar />

          {/* Page heading */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{
              fontSize: 26, fontWeight: 700, color: T.navy,
              margin: "0 0 10px", letterSpacing: "-0.02em",
            }}>
              Start your health check-in
            </h1>
            <p style={{ fontSize: 14, color: T.gray, margin: 0, lineHeight: 1.7 }}>
              Tell us what brings you here today. We'll collect a few details before
              connecting you with a healthcare professional.
            </p>
          </div>

          {/* ── Section 1: Reason for visit ── */}
          <SectionHeading
            number={1}
            title="What would you like help with?"
            subtitle="Select the option that best describes your visit."
          />
          <ReasonSelector selected={reason} onSelect={setReason} />

          <Divider />

          {/* ── Section 2: Main concern ── */}
          <SectionHeading
            number={2}
            title="Tell us about your main concern"
          />
          <ConcernTextarea value={concern} onChange={setConcern} />

          {/* Inline prompt — only shown after selection */}
          {concern.length > 0 && concern.length < 20 && (
            <p style={{
              fontSize: 12, color: T.amber, marginTop: 8,
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <Icon d={ic.info} size={13} stroke={T.amber} />
              A little more detail helps your doctor prepare — aim for at least a sentence.
            </p>
          )}

          <Divider />

          {/* ── Section 3: Voice / Text preference ── */}
          <SectionHeading
            number={3}
            title="How would you like to continue?"
            subtitle="Choose how you'll share your information during this check-in."
          />
          <ModeSelector mode={mode} onSelect={setMode} />

          <Divider />

          {/* ── Section 4: Basic information ── */}
          <SectionHeading
            number={4}
            title="A few quick details"
            subtitle="These help the clinical team understand your situation before the consultation."
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* City */}
            <div>
              <Label text="Current location / city" />
              <TextInput
                value={city}
                onChange={setCity}
                placeholder="e.g. Mumbai, Delhi, Bengaluru"
                icon={ic.mapPin}
              />
            </div>

            {/* Duration */}
            <div>
              <Label text="How long have you had this concern?" />
              <SelectInput
                value={duration}
                onChange={setDuration}
                placeholder="Select duration"
                options={DURATIONS}
                icon={ic.clock}
              />
            </div>

            {/* Severity */}
            <div>
              <Label text="How much is this affecting you right now?" />
              <SeverityPicker selected={severity} onSelect={setSeverity} />
              <p style={{ fontSize: 12, color: T.grayLight, margin: "8px 0 0" }}>
                This is not a medical assessment — it helps us prioritise your care.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── Emergency notice ── */}
          <EmergencyNotice />

          <Divider />

          {/* ── Action row ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={onBack}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "11px 20px",
                  background: T.white, border: `1px solid ${T.border}`,
                  borderRadius: 9, fontSize: 13, fontWeight: 500, color: T.gray,
                  cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                <Icon d={ic.arrowLeft} size={14} stroke={T.gray} />
                Back
              </button>

              <button
                onClick={canContinue ? onContinue : undefined}
                disabled={!canContinue}
                title={!canContinue ? "Please select a reason for your visit and describe your concern." : undefined}
                style={{
                  flex: 1,
                  padding: "12px 24px",
                  background: canContinue ? T.primary : "#d1d9e0",
                  color: canContinue ? "#fff" : T.grayLight,
                  border: "none", borderRadius: 9,
                  fontSize: 14, fontWeight: 600,
                  cursor: canContinue ? "pointer" : "not-allowed",
                  letterSpacing: "0.01em",
                  fontFamily: "Inter, system-ui, sans-serif",
                  transition: "background 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                Continue to Clinical Intake
                <Icon d={ic.arrowRight} size={16} stroke={canContinue ? "#fff" : T.grayLight} />
              </button>
            </div>

            {/* Save for later */}
            <button
              style={{
                alignSelf: "center",
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 16px",
                background: "none", border: "none",
                fontSize: 12, color: T.grayLight,
                cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              <Icon d={ic.save} size={13} stroke={T.grayLight} />
              Save and continue later
            </button>
          </div>

          {/* Required fields note */}
          {!canContinue && (
            <p style={{
              marginTop: 10, fontSize: 12, color: T.grayLight, textAlign: "center",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            }}>
              <Icon d={ic.info} size={13} stroke={T.grayLight} />
              Select a reason for your visit and describe your concern to continue.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

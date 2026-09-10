import { useState } from "react";

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
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  mic:         "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8",
  link:        "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  arrowLeft:   "M19 12H5M12 5l-7 7 7 7",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  chevDown:    "M19 9l-7 7-7-7",
  chevUp:      "M5 15l7-7 7 7",
  lock:        "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  sliders:     "M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6",
};

// ─── Design tokens — exact match across all MediKiosk screens ────────────────
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
  success:       "#16a34a",
  successBg:     "#f0fdf4",
  successBorder: "#bbf7d0",
  amber:         "#d97706",
  amberLight:    "#fffbeb",
  amberBorder:   "#fde68a",
};

// ─── Progress bar ─────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Account",        done: true  },
  { label: "Consent",        done: false, current: true },
  { label: "Health Profile", done: false },
  { label: "Dashboard",      done: false },
];

function ProgressBar() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0, marginBottom: 40 }}>
      {STEPS.map((step, i) => {
        const isLast = i === STEPS.length - 1;
        return (
          <div
            key={step.label}
            style={{ display: "flex", alignItems: "flex-start", flex: isLast ? "none" : 1 }}
          >
            {/* Node + label */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: step.done
                  ? T.primary
                  : step.current
                    ? T.primaryLight
                    : T.muted,
                border: `1.5px solid ${step.done || step.current ? T.primary : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {step.done
                  ? <Icon d={ic.check} size={13} stroke="#fff" />
                  : <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: step.current ? T.primary : T.grayLight,
                    }}>
                      {i + 1}
                    </span>
                }
              </div>
              <span style={{
                fontSize: 11, whiteSpace: "nowrap",
                fontWeight: step.current ? 600 : 400,
                color: step.done ? T.primary : step.current ? T.navy : T.grayLight,
              }}>
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {!isLast && (
              <div style={{
                flex: 1, height: 1.5, marginTop: 13, marginLeft: 6, marginRight: 6,
                background: step.done ? T.primary : T.border,
                transition: "background 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Checkbox row ─────────────────────────────────────────────────────────────
function ConsentRow({
  checked, onChange, children, required,
}: {
  checked: boolean; onChange: () => void; children: React.ReactNode; required?: boolean;
}) {
  return (
    <label
      style={{ display: "flex", gap: 13, alignItems: "flex-start", cursor: "pointer" }}
    >
      {/* Custom checkbox */}
      <div
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onClick={onChange}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") onChange(); }}
        style={{
          width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 2,
          border: `1.5px solid ${checked ? T.primary : T.border}`,
          background: checked ? T.primary : T.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.15s",
          outline: "none",
        }}
      >
        {checked && <Icon d={ic.check} size={11} stroke="#fff" />}
      </div>

      <div style={{ lineHeight: 1.6 }}>
        <span style={{ fontSize: 13, color: T.gray }}>
          {children}
        </span>
        {required && (
          <span style={{
            marginLeft: 6, fontSize: 10, fontWeight: 600, color: T.primary,
            background: T.primaryLight, border: `1px solid ${T.primaryBorder}`,
            padding: "1px 7px", borderRadius: 20, verticalAlign: "middle",
            whiteSpace: "nowrap",
          }}>
            Required
          </span>
        )}
      </div>
    </label>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function ConsentSection({
  iconPath, iconColor, iconBg, title, subtitle, children,
}: {
  iconPath: string; iconColor: string; iconBg: string;
  title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      paddingBottom: 28,
      borderBottom: `1px solid ${T.border}`,
    }}>
      {/* Section header */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9, flexShrink: 0,
          background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon d={iconPath} size={17} stroke={iconColor} />
        </div>
        <div style={{ paddingTop: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 4 }}>
            {title}
          </div>
          <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.6, maxWidth: 520 }}>
            {subtitle}
          </div>
        </div>
      </div>

      <div style={{ paddingLeft: 48 }}>{children}</div>
    </div>
  );
}

// ─── ABHA input ───────────────────────────────────────────────────────────────
function AbhaInput({
  value, onChange, focused, setFocused, connected, onConnect, onSkip,
}: {
  value: string; onChange: (v: string) => void;
  focused: boolean; setFocused: (v: boolean) => void;
  connected: boolean; onConnect: () => void; onSkip: () => void;
}) {
  const isValid = /^\d{2}-\d{4}-\d{4}-\d{4}$/.test(value) ||
                  /^\d{14}$/.test(value.replace(/-/g, "")) ||
                  /^[a-zA-Z0-9._]{4,}@(abdm|ndhm)$/.test(value);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {connected ? (
        /* Connected state */
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "13px 16px",
          background: T.successBg,
          border: `1px solid ${T.successBorder}`,
          borderRadius: 9,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "#dcfce7", border: `1.5px solid ${T.successBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon d={ic.checkCircle} size={16} stroke={T.success} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>ABHA Connected</div>
            <div style={{ fontSize: 12, color: "#4ade80", marginTop: 1 }}>{value}</div>
          </div>
          <button
            onClick={() => onChange("")}
            style={{
              fontSize: 12, color: T.gray, background: "none",
              border: `1px solid ${T.border}`, borderRadius: 7,
              padding: "5px 12px", cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Change
          </button>
        </div>
      ) : (
        /* Input state */
        <>
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%",
              transform: "translateY(-50%)", pointerEvents: "none",
            }}>
              <Icon d={ic.link} size={15} stroke={focused ? T.primary : T.grayLight} />
            </span>
            <input
              type="text"
              placeholder="12-3456-7890-0001 or name@abdm"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: "100%",
                padding: "11px 14px 11px 40px",
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

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onConnect}
              disabled={!isValid}
              style={{
                padding: "10px 20px",
                background: isValid ? T.primary : "#d1d9e0",
                color: isValid ? "#fff" : T.grayLight,
                border: "none", borderRadius: 9,
                fontSize: 13, fontWeight: 600,
                cursor: isValid ? "pointer" : "not-allowed",
                fontFamily: "Inter, system-ui, sans-serif",
                transition: "background 0.15s",
                display: "flex", alignItems: "center", gap: 7,
              }}
            >
              <Icon d={ic.link} size={14} stroke={isValid ? "#fff" : T.grayLight} />
              Connect ABHA
            </button>
            <button
              onClick={onSkip}
              style={{
                padding: "10px 18px",
                background: "none",
                color: T.gray,
                border: `1px solid ${T.border}`,
                borderRadius: 9,
                fontSize: 13, fontWeight: 500,
                cursor: "pointer",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Skip for now
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── "How consent works" expandable ──────────────────────────────────────────
function ConsentExplainer() {
  const [open, setOpen] = useState(false);

  const steps = [
    {
      n: "1",
      title: "You choose which records to share",
      body: "Only documents and records you explicitly select are made available through ABDM.",
    },
    {
      n: "2",
      title: "You choose who can access them",
      body: "Each sharing request shows you the requester, the purpose, and the duration before you approve.",
    },
    {
      n: "3",
      title: "You can revoke access according to the consent terms",
      body: "Active consents can be reviewed and revoked from your ABHA settings at any time within the consent period.",
    },
  ];

  return (
    <div style={{
      border: `1px solid ${T.border}`,
      borderRadius: 10,
      overflow: "hidden",
    }}>
      {/* Toggle row */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "13px 16px",
          background: T.muted,
          border: "none", cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif",
          transition: "background 0.15s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Icon d={ic.eye} size={15} stroke={T.primary} />
          <span style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>
            How your consent works
          </span>
        </div>
        <Icon d={open ? ic.chevUp : ic.chevDown} size={15} stroke={T.gray} />
      </button>

      {/* Expanded content */}
      {open && (
        <div style={{
          padding: "20px 20px 20px",
          borderTop: `1px solid ${T.border}`,
          display: "flex", flexDirection: "column", gap: 0,
        }}>
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                paddingBottom: i < steps.length - 1 ? 20 : 0,
                position: "relative",
              }}
            >
              {/* Vertical connector */}
              {i < steps.length - 1 && (
                <div style={{
                  position: "absolute", left: 15, top: 32,
                  width: 1, bottom: 0,
                  background: T.border,
                }} />
              )}
              {/* Number node */}
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                background: T.primaryLight,
                border: `1.5px solid ${T.primaryBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.primary }}>{s.n}</span>
              </div>
              <div style={{ paddingTop: 3 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 4 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 12, color: T.gray, lineHeight: 1.6 }}>
                  {s.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Consent({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack: () => void;
}) {
  const [healthConsent, setHealthConsent]   = useState(false);
  const [voiceConsent,  setVoiceConsent]    = useState(false);
  const [abhaValue,     setAbhaValue]       = useState("");
  const [abhaFocused,   setAbhaFocused]     = useState(false);
  const [abhaConnected, setAbhaConnected]   = useState(false);
  const [learnMoreOpen, setLearnMoreOpen]   = useState(false);

  function handleAbhaConnect() {
    setAbhaConnected(true);
  }

  function handleAbhaChange(v: string) {
    setAbhaValue(v);
    setAbhaConnected(false);
  }

  const canContinue = healthConsent;

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
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, background: T.primary, borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon d={ic.heart} size={16} stroke="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, letterSpacing: "-0.01em" }}>
              MediKiosk
            </div>
            <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 500, letterSpacing: "0.04em" }}>
              HEALTH PLATFORM
            </div>
          </div>
        </div>

        {/* Step label in header */}
        <div style={{
          marginLeft: "auto",
          fontSize: 12, color: T.grayLight,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ fontWeight: 600, color: T.navy }}>Step 2 of 4</span>
          &nbsp;·&nbsp;Consent & ABHA Connection
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <div style={{
        flex: 1, overflowY: "auto",
        display: "flex", justifyContent: "center",
        padding: "44px 24px 80px",
      }}>
        <div style={{ width: "100%", maxWidth: 640 }}>

          {/* Progress */}
          <ProgressBar />

          {/* Page heading */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{
              fontSize: 26, fontWeight: 700, color: T.navy,
              margin: "0 0 10px", letterSpacing: "-0.02em",
            }}>
              Before we begin
            </h1>
            <p style={{
              fontSize: 14, color: T.gray, margin: 0, lineHeight: 1.7, maxWidth: 500,
            }}>
              Your consent helps us use your health information safely and
              transparently. Please read each section before agreeing.
            </p>
          </div>

          {/* ── Consent sections ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Section 1 — Health Data */}
            <ConsentSection
              iconPath={ic.fileText}
              iconColor={T.primary}
              iconBg={T.primaryLight}
              title="Health Information Consent"
              subtitle="MediKiosk may collect and process the information you provide during health check-in, consultations and document uploads to help organise your care."
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <ConsentRow
                  checked={healthConsent}
                  onChange={() => setHealthConsent((v) => !v)}
                  required
                >
                  I consent to MediKiosk collecting and processing my health
                  information for providing healthcare services.
                </ConsentRow>

                {/* Learn more */}
                <div style={{ paddingLeft: 31 }}>
                  <button
                    onClick={() => setLearnMoreOpen((v) => !v)}
                    style={{
                      fontSize: 12, color: T.primary, fontWeight: 600,
                      background: "none", border: "none", cursor: "pointer",
                      padding: 0, fontFamily: "Inter, system-ui, sans-serif",
                      display: "flex", alignItems: "center", gap: 5,
                    }}
                  >
                    <Icon d={ic.info} size={13} stroke={T.primary} />
                    {learnMoreOpen ? "Show less" : "Learn more about data use"}
                  </button>

                  {learnMoreOpen && (
                    <div style={{
                      marginTop: 12,
                      padding: "14px 16px",
                      background: T.muted,
                      border: `1px solid ${T.border}`,
                      borderRadius: 9,
                      fontSize: 12, color: T.gray, lineHeight: 1.7,
                    }}>
                      <p style={{ margin: "0 0 8px" }}>
                        The information you provide — including symptoms, medical history,
                        uploaded documents and consultation notes — is used solely to
                        deliver care coordination services within MediKiosk.
                      </p>
                      <p style={{ margin: 0 }}>
                        Your data is stored securely and is not sold, shared with advertisers
                        or disclosed to third parties without your explicit approval.
                        You may request deletion of your data at any time from your account settings.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ConsentSection>

            {/* Section 2 — Voice */}
            <ConsentSection
              iconPath={ic.mic}
              iconColor="#7c3aed"
              iconBg="#f5f3ff"
              title="Voice & Conversation"
              subtitle="If you choose voice-based health check-in, your spoken responses may be processed to create a structured clinical summary for your doctor."
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <ConsentRow
                  checked={voiceConsent}
                  onChange={() => setVoiceConsent((v) => !v)}
                >
                  I understand and consent to voice-based health information
                  processing when I use the voice check-in feature.
                </ConsentRow>

                {/* Text-only note */}
                <div style={{ paddingLeft: 31 }}>
                  <p style={{
                    fontSize: 12, color: T.grayLight, margin: 0, lineHeight: 1.6,
                  }}>
                    Prefer not to use voice?{" "}
                    <button
                      onClick={() => setVoiceConsent(false)}
                      style={{
                        fontSize: 12, color: T.primary, fontWeight: 600,
                        background: "none", border: "none", cursor: "pointer",
                        padding: 0, fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      Continue with text only
                    </button>
                    {" "}— voice features will not be enabled.
                  </p>
                </div>
              </div>
            </ConsentSection>

            {/* Section 3 — ABHA */}
            <div style={{ paddingBottom: 28, borderBottom: `1px solid ${T.border}` }}>
              {/* ABHA header — visually distinct with left accent */}
              <div style={{
                padding: "16px 18px",
                background: T.primaryLight,
                border: `1px solid ${T.primaryBorder}`,
                borderLeft: `3px solid ${T.primary}`,
                borderRadius: "0 10px 10px 0",
                marginBottom: 20,
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    background: "#d1faf5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon d={ic.link} size={17} stroke={T.primary} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 4 }}>
                      Connect your ABHA
                    </div>
                    <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.6 }}>
                      Connect your Ayushman Bharat Health Account to access and share
                      eligible health records through ABDM with your permission.
                    </div>
                  </div>
                </div>
              </div>

              <AbhaInput
                value={abhaValue}
                onChange={handleAbhaChange}
                focused={abhaFocused}
                setFocused={setAbhaFocused}
                connected={abhaConnected}
                onConnect={handleAbhaConnect}
                onSkip={() => {}}
              />

              {/* Consent note */}
              <div style={{
                marginTop: 14,
                display: "flex", gap: 8, alignItems: "flex-start",
              }}>
                <Icon d={ic.shield} size={14} stroke={T.grayLight} />
                <p style={{ fontSize: 12, color: T.grayLight, margin: 0, lineHeight: 1.6 }}>
                  You remain in control of your health records. Record sharing requires
                  your explicit consent for each request — ABDM does not centrally store
                  your records without your approval.
                </p>
              </div>

              {/* Explainer — below ABHA */}
              <div style={{ marginTop: 16 }}>
                <ConsentExplainer />
              </div>
            </div>

            {/* Summary strip */}
            <div style={{
              padding: "14px 16px",
              background: T.muted,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              display: "flex", alignItems: "flex-start", gap: 10,
            }}>
              <Icon d={ic.lock} size={15} stroke={T.grayLight} />
              <p style={{ fontSize: 12, color: T.grayLight, margin: 0, lineHeight: 1.6 }}>
                Your consents are recorded and can be reviewed or updated at any time
                from <span style={{ fontWeight: 600, color: T.gray }}>Settings → Privacy & Consent</span>.
                MediKiosk does not share your information without your knowledge.
              </p>
            </div>

          </div>

          {/* ── Action row ── */}
          <div style={{
            display: "flex", gap: 12, alignItems: "center",
            marginTop: 36, flexWrap: "wrap",
          }}>
            <button
              onClick={onBack}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "11px 20px",
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 9,
                fontSize: 13, fontWeight: 500, color: T.gray,
                cursor: "pointer",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              <Icon d={ic.arrowLeft} size={14} stroke={T.gray} />
              Back
            </button>

            <button
              onClick={canContinue ? onContinue : undefined}
              disabled={!canContinue}
              title={!canContinue ? "Please accept the required health data consent to continue." : undefined}
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
              Agree & Continue
              <Icon d={ic.arrowRight} size={16} stroke={canContinue ? "#fff" : T.grayLight} />
            </button>
          </div>

          {/* Mandatory note */}
          {!healthConsent && (
            <p style={{
              marginTop: 12, fontSize: 12, color: T.grayLight,
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <Icon d={ic.info} size={13} stroke={T.grayLight} />
              The health data consent is required to use MediKiosk services.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { UserRole, DEMO_ROLES } from "./types";

// ─── Icon primitive — identical to Dashboard & Register ───────────────────────
const Icon = ({
  d, size = 18, stroke = "currentColor", fill = "none",
}: { d: string; size?: number; stroke?: string; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ic = {
  heart:       "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  link:        "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  video:       "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  check:       "M20 6L9 17l-5-5",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.01 2 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  arrowLeft:   "M19 12H5M12 5l-7 7 7 7",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  refresh:     "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
  lock:        "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  globe:       "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  chevRight:   "M9 18l6-6-6-6",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  building:    "M3 21h18M3 7l9-4 9 4M4 11h16v10H4z M9 21v-6h6v6",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3M8 15v1a6 6 0 006 6 6 6 0 006-6v-4",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  flask:       "M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a5 5 0 11-4 0",
  sparkles:    "M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.122 2.122m8.485 8.485l2.122 2.122M5.636 18.364l2.122-2.122m8.485-8.485l2.122-2.122",
};

// ─── Design tokens — exact match with Dashboard & Register ───────────────────
const T = {
  primary:       "#0d7a6e",
  primaryLight:  "#f0fdf9",
  primaryBorder: "#b2e8e0",
  primaryDark:   "#0a6459",
  navy:          "#0f1f3d",
  navyDeep:      "#0a1628",
  gray:          "#64748b",
  grayLight:     "#94a3b8",
  bg:            "#f5f7fa",
  white:         "#ffffff",
  border:        "#e8ecf0",
  muted:         "#f8fafc",
  danger:        "#e84b4b",
  dangerBg:      "#fff5f5",
  success:       "#16a34a",
  successBg:     "#f0fdf4",
  successBorder: "#bbf7d0",
};

// ─── Validation ───────────────────────────────────────────────────────────────
function validateMobile(v: string) {
  return /^[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
}
function validateAbhaNumber(v: string) {
  return /^\d{2}-\d{4}-\d{4}-\d{4}$/.test(v) || /^\d{14}$/.test(v.replace(/-/g, ""));
}
function validateAbhaAddress(v: string) {
  return /^[a-zA-Z0-9._]{4,}@(abdm|ndhm)$/.test(v);
}

// ─── OTP box cluster ──────────────────────────────────────────────────────────
function OtpBoxes({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  function change(idx: number, raw: string) {
    if (!/^\d?$/.test(raw)) return;
    const next = [...value];
    next[idx] = raw;
    onChange(next);
    if (raw && idx < 5) refs[idx + 1].current?.focus();
  }

  function keydown(idx: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !value[idx] && idx > 0) refs[idx - 1].current?.focus();
  }

  // Paste handler: distribute digits across boxes
  function paste(e: React.ClipboardEvent) {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    const next = [...value];
    digits.forEach((d, i) => { next[i] = d; });
    onChange(next);
    const lastFilled = Math.min(digits.length, 5);
    refs[lastFilled].current?.focus();
  }

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const filled = !!value[idx];
        return (
          <input
            key={idx}
            ref={refs[idx]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[idx]}
            onChange={(e) => change(idx, e.target.value)}
            onKeyDown={(e) => keydown(idx, e)}
            onPaste={paste}
            style={{
              width: 48, height: 56,
              textAlign: "center",
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "Inter, system-ui, sans-serif",
              border: `1.5px solid ${filled ? T.primary : T.border}`,
              borderRadius: 10,
              background: filled ? T.primaryLight : T.white,
              color: T.navy,
              outline: "none",
              transition: "border-color 0.15s, background 0.15s",
              cursor: "text",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(initial = 0) {
  const [seconds, setSeconds] = useState(initial);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  function start(n: number) {
    if (ref.current) clearInterval(ref.current);
    setSeconds(n);
    ref.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clearInterval(ref.current!); return 0; }
        return s - 1;
      });
    }, 1000);
  }
  useEffect(() => () => { if (ref.current) clearInterval(ref.current); }, []);
  return { seconds, start };
}

// ─── Shared input style factory ───────────────────────────────────────────────
function inputStyle(focused: boolean, error?: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "11px 14px",
    border: `1.5px solid ${error ? T.danger : focused ? T.primary : T.border}`,
    borderRadius: 9,
    fontSize: 14,
    color: T.navy,
    background: error ? T.dangerBg : T.white,
    outline: "none",
    fontFamily: "Inter, system-ui, sans-serif",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s",
  };
}

// ─── Left brand panel ─────────────────────────────────────────────────────────
function BrandPanel() {
  const features = [
    { icon: ic.shield,   label: "Secure Health Records",          sub: "End-to-end encrypted. Accessible only by you." },
    { icon: ic.link,     label: "ABHA Connected",                  sub: "Linked to your Ayushman Bharat Health Account." },
    { icon: ic.video,    label: "Doctor & Teleconsultation Access", sub: "In-clinic and video consultations in one place." },
  ];

  return (
    <div style={{
      background: T.navy,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "48px 52px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle geometric accent — two large faint circles */}
      <div style={{
        position: "absolute", right: -80, top: -80,
        width: 320, height: 320, borderRadius: "50%",
        border: "1px solid rgba(13,122,110,0.18)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: -40, top: -40,
        width: 200, height: 200, borderRadius: "50%",
        border: "1px solid rgba(13,122,110,0.12)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: -60, bottom: -60,
        width: 240, height: 240, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.04)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: T.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon d={ic.heart} size={20} stroke="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.01em" }}>MediKiosk</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 500, letterSpacing: "0.06em" }}>HEALTH PLATFORM</div>
        </div>
      </div>

      {/* Tagline */}
      <h2 style={{
        fontSize: 30,
        fontWeight: 700,
        color: "#fff",
        margin: "0 0 16px",
        letterSpacing: "-0.025em",
        lineHeight: 1.2,
        maxWidth: 320,
      }}>
        Your health.<br />
        <span style={{ color: "#5dd6c8" }}>Connected.</span>
      </h2>
      <p style={{
        fontSize: 14,
        color: "rgba(255,255,255,0.55)",
        margin: "0 0 48px",
        lineHeight: 1.7,
        maxWidth: 340,
      }}>
        Access your appointments, medical records, prescriptions and connected healthcare services in one secure place.
      </p>

      {/* Feature list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {features.map((f) => (
          <div key={f.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
              background: "rgba(13,122,110,0.2)",
              border: "1px solid rgba(13,122,110,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon d={f.icon} size={16} stroke="#5dd6c8" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 3 }}>
                {f.label}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                {f.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ministry badge */}
      <div style={{
        marginTop: 52,
        paddingTop: 20,
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Icon d={ic.shield} size={13} stroke="rgba(255,255,255,0.25)" />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.5 }}>
          Aligned with ABDM · Ministry of Health & Family Welfare, India
        </span>
      </div>
    </div>
  );
}

// ─── Demo Role Selector ──────────────────────────────────────────────────────
function DemoRoleSelector({
  selectedRole,
  onSelectRole,
  onQuickLogin,
}: {
  selectedRole: UserRole;
  onSelectRole: (r: UserRole) => void;
  onQuickLogin: (r: UserRole) => void;
}) {
  const roleIcons: Record<UserRole, string> = {
    patient: ic.user,
    doctor: ic.stethoscope,
    hospital: ic.building,
    pharmacy: ic.pill,
    lab: ic.flask,
    admin: ic.shield,
  };

  const activeInfo = DEMO_ROLES[selectedRole];

  return (
    <div
      style={{
        background: T.white,
        border: `1.5px solid ${T.primaryBorder}`,
        borderRadius: 12,
        padding: "15px 16px",
        marginBottom: 20,
        boxShadow: "0 2px 8px rgba(13,122,110,0.06)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.sparkles} size={13} stroke={T.primary} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Demo Role Selector</span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: T.primary,
            background: T.primaryLight,
            border: `1px solid ${T.primaryBorder}`,
            padding: "2px 8px",
            borderRadius: 12,
            letterSpacing: "0.04em",
          }}
        >
          DEVELOPMENT & DEMO
        </span>
      </div>

      <p style={{ margin: "0 0 10px", fontSize: 11, color: T.gray, lineHeight: 1.4 }}>
        Select a role to test specific dashboards, permissions, and clinical flows:
      </p>

      {/* Grid of 6 roles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 6,
          marginBottom: 11,
        }}
      >
        {(Object.keys(DEMO_ROLES) as UserRole[]).map((r) => {
          const item = DEMO_ROLES[r];
          const isSelected = selectedRole === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => onSelectRole(r)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "8px 4px",
                borderRadius: 8,
                border: isSelected ? `1.5px solid ${T.primary}` : `1px solid ${T.border}`,
                background: isSelected ? T.primaryLight : T.muted,
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  background: isSelected ? T.primary : T.white,
                  border: isSelected ? "none" : `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon d={roleIcons[r]} size={13} stroke={isSelected ? "#fff" : T.navy} />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? T.primaryDark : T.navy,
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Role Card & Quick Launch */}
      <div
        style={{
          background: T.muted,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          padding: "9px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {activeInfo.name}
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, padding: "1px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>
              {activeInfo.badge}
            </span>
          </div>
          <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {activeInfo.subtitle}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onQuickLogin(selectedRole)}
          style={{
            padding: "6px 12px",
            background: T.primary,
            border: "none",
            borderRadius: 7,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
            boxShadow: "0 1px 3px rgba(13,122,110,0.25)",
          }}
        >
          Quick Demo <Icon d={ic.arrowRight} size={11} stroke="#fff" />
        </button>
      </div>
    </div>
  );
}

// ─── Login form panel ─────────────────────────────────────────────────────────
type LoginTab = "mobile" | "abha";
type LoginStage = "entry" | "otp" | "abha-form";

export default function Login({
  onLogin,
  onRegister,
  initialRole = "patient",
}: {
  onLogin: (role?: UserRole) => void;
  onRegister: () => void;
  initialRole?: UserRole;
}) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [tab, setTab] = useState<LoginTab>("mobile");
  const [stage, setStage] = useState<LoginStage>("entry");

  // Mobile flow
  const [mobile, setMobile] = useState(DEMO_ROLES[initialRole].defaultMobile);
  const [mobileFocused, setMobileFocused] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const { seconds: resendSec, start: startResend } = useCountdown();

  // ABHA flow
  const [abhaValue, setAbhaValue] = useState(DEMO_ROLES[initialRole].defaultAbha);
  const [abhaFocused, setAbhaFocused] = useState(false);
  const [abhaError, setAbhaError] = useState("");

  const mobileValid = validateMobile(mobile);
  const otpFilled = otp.join("").length === 6;

  function handleSelectRole(r: UserRole) {
    setSelectedRole(r);
    setMobile(DEMO_ROLES[r].defaultMobile);
    setAbhaValue(DEMO_ROLES[r].defaultAbha);
    setMobileError("");
    setAbhaError("");
    setOtpError("");
  }

  function handleQuickLogin(r: UserRole) {
    onLogin(r);
  }

  // ── Mobile: step 1 → send OTP
  function handleContinue() {
    if (!mobileValid) { setMobileError("Enter a valid 10-digit Indian mobile number."); return; }
    setMobileError("");
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setStage("otp");
    startResend(30);
  }

  // ── OTP: verify
  function handleVerify() {
    if (!otpFilled) { setOtpError("Please enter the complete 6-digit OTP."); return; }
    onLogin(selectedRole);
  }

  // ── Resend
  function handleResend() {
    if (resendSec > 0) return;
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    startResend(30);
  }

  // ── ABHA login
  function handleAbhaLogin() {
    const isNum  = validateAbhaNumber(abhaValue);
    const isAddr = validateAbhaAddress(abhaValue);
    if (!isNum && !isAddr) {
      setAbhaError("Enter a valid ABHA number (14 digits) or ABHA address (e.g. name@abdm).");
      return;
    }
    setAbhaError("");
    onLogin(selectedRole);
  }

  // ── Tab switch reset
  function switchTab(t: LoginTab) {
    setTab(t);
    setStage(t === "abha" ? "abha-form" : "entry");
    setMobileError(""); setAbhaError(""); setOtpError("");
  }

  // masked mobile display
  const maskedMobile = mobile.length >= 10
    ? `••••••${mobile.slice(-4)}`
    : mobile;

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      fontFamily: "Inter, system-ui, sans-serif",
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    }}>
      {/* ── LEFT ── */}
      <BrandPanel />

      {/* ── RIGHT ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 32px",
        overflowY: "auto",
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {/* Demo Role Selector for Development and Testing */}
          <DemoRoleSelector
            selectedRole={selectedRole}
            onSelectRole={handleSelectRole}
            onQuickLogin={handleQuickLogin}
          />

          {/* ── STAGE: entry (mobile tab) ── */}
          {stage === "entry" && tab === "mobile" && (
            <EntryForm
              tab={tab}
              onSwitchTab={switchTab}
              mobile={mobile}
              setMobile={setMobile}
              mobileFocused={mobileFocused}
              setMobileFocused={setMobileFocused}
              mobileError={mobileError}
              setMobileError={setMobileError}
              mobileValid={mobileValid}
              onContinue={handleContinue}
              onRegister={onRegister}
            />
          )}

          {/* ── STAGE: entry (abha tab) → abha-form ── */}
          {(stage === "abha-form" || tab === "abha") && stage !== "entry" && stage !== "otp" && (
            <AbhaForm
              tab={tab}
              onSwitchTab={switchTab}
              abhaValue={abhaValue}
              setAbhaValue={setAbhaValue}
              abhaFocused={abhaFocused}
              setAbhaFocused={setAbhaFocused}
              abhaError={abhaError}
              setAbhaError={setAbhaError}
              onLogin={handleAbhaLogin}
              onRegister={onRegister}
            />
          )}

          {/* ── STAGE: OTP ── */}
          {stage === "otp" && (
            <OtpForm
              mobile={maskedMobile}
              otp={otp}
              setOtp={setOtp}
              otpError={otpError}
              otpFilled={otpFilled}
              resendSec={resendSec}
              onVerify={handleVerify}
              onResend={handleResend}
              onChangeNumber={() => { setStage("entry"); setMobile(""); }}
            />
          )}

          {/* Security notice — always shown */}
          <div style={{
            marginTop: 28,
            display: "flex", alignItems: "center", gap: 8,
            justifyContent: "center",
          }}>
            <Icon d={ic.lock} size={13} stroke={T.grayLight} />
            <span style={{ fontSize: 11, color: T.grayLight }}>
              Your health information is protected and accessed securely.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Entry form (mobile tab default) ─────────────────────────────────────────
function EntryForm({
  tab, onSwitchTab, mobile, setMobile, mobileFocused, setMobileFocused,
  mobileError, setMobileError, mobileValid, onContinue, onRegister,
}: {
  tab: LoginTab; onSwitchTab: (t: LoginTab) => void;
  mobile: string; setMobile: (v: string) => void;
  mobileFocused: boolean; setMobileFocused: (v: boolean) => void;
  mobileError: string; setMobileError: (v: string) => void;
  mobileValid: boolean; onContinue: () => void; onRegister: () => void;
}) {
  return (
    <>
      <Heading />

      {/* Tab selector */}
      <TabBar tab={tab} onSwitch={onSwitchTab} />

      {/* Mobile field */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 7 }}>
          Mobile Number <span style={{ color: "#e84b4b" }}>*</span>
        </label>
        <div style={{ position: "relative", display: "flex" }}>
          {/* +91 prefix */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 14px",
            background: T.muted,
            borderTop: `1.5px solid ${mobileError ? T.danger : mobileFocused ? T.primary : T.border}`,
            borderBottom: `1.5px solid ${mobileError ? T.danger : mobileFocused ? T.primary : T.border}`,
            borderLeft: `1.5px solid ${mobileError ? T.danger : mobileFocused ? T.primary : T.border}`,
            borderRight: "none",
            borderRadius: "9px 0 0 9px",
            fontSize: 14, fontWeight: 600, color: T.gray,
            flexShrink: 0,
            transition: "border-color 0.15s",
          }}>
            +91
          </div>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="98765 43210"
            value={mobile}
            maxLength={10}
            onChange={(e) => {
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
              if (mobileError) setMobileError("");
            }}
            onFocus={() => setMobileFocused(true)}
            onBlur={() => setMobileFocused(false)}
            onKeyDown={(e) => { if (e.key === "Enter") onContinue(); }}
            style={{
              ...inputStyle(mobileFocused, !!mobileError),
              borderRadius: "0 9px 9px 0",
              paddingLeft: 14,
            }}
          />
        </div>
        {mobileError && (
          <p style={{ fontSize: 12, color: T.danger, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
            <Icon d={ic.info} size={13} stroke={T.danger} /> {mobileError}
          </p>
        )}
        <p style={{ fontSize: 12, color: T.grayLight, marginTop: 6 }}>
          You'll receive a one-time passcode on this number.
        </p>
      </div>

      {/* Continue button */}
      <button
        onClick={onContinue}
        style={{
          width: "100%", padding: "12px", marginBottom: 20,
          background: mobileValid ? T.primary : "#c7d4dc",
          color: "#fff", border: "none", borderRadius: 9,
          fontSize: 14, fontWeight: 600, cursor: mobileValid ? "pointer" : "not-allowed",
          letterSpacing: "0.01em", transition: "background 0.15s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        Continue
        <Icon d={ic.arrowRight} size={16} stroke="#fff" />
      </button>

      {/* Divider */}
      <Divider />

      {/* ABHA alternate */}
      <AbhaAlternate onSwitch={() => onSwitchTab("abha")} />

      {/* Register link */}
      <RegisterLink onRegister={onRegister} />
    </>
  );
}

// ─── ABHA form ────────────────────────────────────────────────────────────────
function AbhaForm({
  tab, onSwitchTab, abhaValue, setAbhaValue, abhaFocused,
  setAbhaFocused, abhaError, setAbhaError, onLogin, onRegister,
}: {
  tab: LoginTab; onSwitchTab: (t: LoginTab) => void;
  abhaValue: string; setAbhaValue: (v: string) => void;
  abhaFocused: boolean; setAbhaFocused: (v: boolean) => void;
  abhaError: string; setAbhaError: (v: string) => void;
  onLogin: () => void; onRegister: () => void;
}) {
  const valid = validateAbhaNumber(abhaValue) || validateAbhaAddress(abhaValue);
  return (
    <>
      <Heading />
      <TabBar tab={tab} onSwitch={onSwitchTab} />

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 7 }}>
          ABHA Number or ABHA Address <span style={{ color: "#e84b4b" }}>*</span>
        </label>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
            <Icon d={ic.link} size={16} stroke={abhaFocused ? T.primary : T.grayLight} />
          </span>
          <input
            type="text"
            placeholder="12-3456-7890-0001 or name@abdm"
            value={abhaValue}
            onChange={(e) => { setAbhaValue(e.target.value); if (abhaError) setAbhaError(""); }}
            onFocus={() => setAbhaFocused(true)}
            onBlur={() => setAbhaFocused(false)}
            onKeyDown={(e) => { if (e.key === "Enter") onLogin(); }}
            style={{ ...inputStyle(abhaFocused, !!abhaError), paddingLeft: 40 }}
          />
        </div>
        {abhaError
          ? <p style={{ fontSize: 12, color: T.danger, marginTop: 6, display: "flex", gap: 4, alignItems: "flex-start" }}>
              <Icon d={ic.info} size={13} stroke={T.danger} /> {abhaError}
            </p>
          : <p style={{ fontSize: 12, color: T.grayLight, marginTop: 6 }}>
              Use your 14-digit ABHA number or ABHA address ending with @abdm or @ndhm.
            </p>
        }
      </div>

      <button
        onClick={onLogin}
        style={{
          width: "100%", padding: "12px", marginBottom: 20,
          background: valid ? T.primary : "#c7d4dc",
          color: "#fff", border: "none", borderRadius: 9,
          fontSize: 14, fontWeight: 600, cursor: valid ? "pointer" : "not-allowed",
          letterSpacing: "0.01em", transition: "background 0.15s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        Login with ABHA
        <Icon d={ic.arrowRight} size={16} stroke="#fff" />
      </button>

      <Divider />
      <AbhaAlternate onSwitch={() => onSwitchTab("mobile")} isMobileAlt />
      <RegisterLink onRegister={onRegister} />
    </>
  );
}

// ─── OTP form ─────────────────────────────────────────────────────────────────
function OtpForm({
  mobile, otp, setOtp, otpError, otpFilled, resendSec,
  onVerify, onResend, onChangeNumber,
}: {
  mobile: string; otp: string[]; setOtp: (v: string[]) => void;
  otpError: string; otpFilled: boolean; resendSec: number;
  onVerify: () => void; onResend: () => void; onChangeNumber: () => void;
}) {
  return (
    <>
      {/* Back */}
      <button
        onClick={onChangeNumber}
        style={{
          display: "flex", alignItems: "center", gap: 6, marginBottom: 28,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, color: T.gray, padding: 0, fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <Icon d={ic.arrowLeft} size={14} stroke={T.gray} />
        Change mobile number
      </button>

      {/* Heading */}
      <h1 style={{ fontSize: 24, fontWeight: 700, color: T.navy, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
        Verify your mobile number
      </h1>
      <p style={{ fontSize: 14, color: T.gray, margin: "0 0 32px", lineHeight: 1.6 }}>
        We've sent a 6-digit verification code to{" "}
        <span style={{ fontWeight: 600, color: T.navy }}>+91 {mobile}</span>
      </p>

      {/* OTP label */}
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 12 }}>
        One-Time Passcode
      </label>

      <OtpBoxes value={otp} onChange={setOtp} />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button
          type="button"
          onClick={() => setOtp(["1", "2", "3", "4", "5", "6"])}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: T.primary,
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 0",
            fontFamily: "Inter, system-ui, sans-serif",
            textDecoration: "underline",
          }}
        >
          Auto-fill Demo OTP (123456)
        </button>
      </div>

      {otpError && (
        <p style={{ fontSize: 12, color: T.danger, marginTop: 10, display: "flex", gap: 4, alignItems: "center" }}>
          <Icon d={ic.info} size={13} stroke={T.danger} /> {otpError}
        </p>
      )}

      {/* Resend */}
      <div style={{ marginTop: 14, marginBottom: 28, fontSize: 13 }}>
        {resendSec > 0 ? (
          <span style={{ color: T.grayLight }}>
            Resend OTP in{" "}
            <span style={{ fontWeight: 600, color: T.navy, fontVariantNumeric: "tabular-nums" }}>
              {String(resendSec).padStart(2, "0")}s
            </span>
          </span>
        ) : (
          <button
            onClick={onResend}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontSize: 13, fontWeight: 600, color: T.primary, fontFamily: "Inter, system-ui, sans-serif",
              display: "flex", alignItems: "center", gap: 5,
            }}
          >
            <Icon d={ic.refresh} size={13} stroke={T.primary} />
            Resend OTP
          </button>
        )}
      </div>

      {/* Verify button */}
      <button
        onClick={onVerify}
        style={{
          width: "100%", padding: "12px",
          background: otpFilled ? T.primary : "#c7d4dc",
          color: "#fff", border: "none", borderRadius: 9,
          fontSize: 14, fontWeight: 600, cursor: otpFilled ? "pointer" : "not-allowed",
          letterSpacing: "0.01em", transition: "background 0.15s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        Verify & Continue
        <Icon d={ic.checkCircle} size={16} stroke="#fff" />
      </button>

      <p style={{ fontSize: 12, color: T.grayLight, marginTop: 16, textAlign: "center", lineHeight: 1.6 }}>
        Didn't receive it? Check your SMS inbox or try resending after the timer.
      </p>
    </>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function Heading() {
  return (
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: T.navy, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
        Welcome back
      </h1>
      <p style={{ fontSize: 14, color: T.gray, margin: 0, lineHeight: 1.6 }}>
        Sign in to continue to your MediKiosk health dashboard.
      </p>
    </div>
  );
}

function TabBar({ tab, onSwitch }: { tab: LoginTab; onSwitch: (t: LoginTab) => void }) {
  return (
    <div style={{
      display: "flex",
      background: T.muted,
      border: `1px solid ${T.border}`,
      borderRadius: 10,
      padding: 4,
      marginBottom: 24,
      gap: 0,
    }}>
      {([
        { id: "mobile" as LoginTab, label: "Mobile Number", icon: ic.phone },
        { id: "abha"   as LoginTab, label: "ABHA",          icon: ic.link  },
      ]).map(({ id, label, icon }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            onClick={() => onSwitch(id)}
            style={{
              flex: 1, padding: "9px 12px",
              border: "none", borderRadius: 7, cursor: "pointer",
              background: active ? T.white : "transparent",
              boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              color: active ? T.navy : T.gray,
              fontSize: 13, fontWeight: active ? 600 : 400,
              fontFamily: "Inter, system-ui, sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              transition: "all 0.15s",
            }}
          >
            <Icon d={icon} size={14} stroke={active ? T.primary : T.grayLight} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ flex: 1, height: 1, background: T.border }} />
      <span style={{ fontSize: 12, color: T.grayLight, whiteSpace: "nowrap" }}>or continue with</span>
      <div style={{ flex: 1, height: 1, background: T.border }} />
    </div>
  );
}

function AbhaAlternate({ onSwitch, isMobileAlt }: { onSwitch: () => void; isMobileAlt?: boolean }) {
  return (
    <button
      onClick={onSwitch}
      style={{
        width: "100%", padding: "11px",
        background: T.white,
        border: `1.5px solid ${T.border}`,
        borderRadius: 9, cursor: "pointer", marginBottom: 24,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        fontFamily: "Inter, system-ui, sans-serif",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.primary)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 6, background: T.primaryLight,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon d={isMobileAlt ? ic.phone : ic.link} size={14} stroke={T.primary} />
      </div>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>
          {isMobileAlt ? "Login with Mobile OTP" : "Login with ABHA"}
        </div>
        <div style={{ fontSize: 11, color: T.grayLight }}>
          {isMobileAlt
            ? "Receive a one-time code on your mobile number."
            : "Use your ABHA number or ABHA address."}
        </div>
      </div>
    </button>
  );
}

function RegisterLink({ onRegister }: { onRegister: () => void }) {
  return (
    <p style={{ textAlign: "center", fontSize: 13, color: T.grayLight, margin: 0 }}>
      New to MediKiosk?{" "}
      <button
        onClick={onRegister}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          color: T.primary, fontWeight: 600, fontSize: 13,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        Create an account
      </button>
    </p>
  );
}

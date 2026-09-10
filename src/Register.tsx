import { useState, useRef } from "react";

// ─── Shared Icon primitive (same as Dashboard) ────────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }: { d: string; size?: number; stroke?: string; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.01 2 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  check: "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  info: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  alert: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  eyeOff: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24 M1 1l22 22",
  message: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  globe: "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  refresh: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
  arrowLeft: "M19 12H5M12 5l-7 7 7 7",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  chevronDown: "M19 9l-7 7-7-7",
};

// ─── Design tokens (same as Dashboard) ───────────────────────────────────────
const T = {
  primary: "#0d7a6e",
  primaryLight: "#f0fdf9",
  primaryBorder: "#b2e8e0",
  navy: "#0f1f3d",
  gray: "#64748b",
  grayLight: "#94a3b8",
  bg: "#f5f7fa",
  white: "#ffffff",
  border: "#e8ecf0",
  borderHover: "#cbd5e1",
  danger: "#e84b4b",
  dangerBg: "#fff5f5",
  dangerBorder: "#fecaca",
  success: "#16a34a",
  successBg: "#f0fdf4",
  successBorder: "#bbf7d0",
  amber: "#d97706",
  amberBg: "#fffbeb",
  amberBorder: "#fde68a",
  muted: "#f8fafc",
};

// ─── Field validation helpers ─────────────────────────────────────────────────
type FieldState = "idle" | "valid" | "error";

function validate(name: string, value: string): { state: FieldState; msg: string } {
  if (!value.trim()) return { state: "idle", msg: "" };
  switch (name) {
    case "fullName":
      return value.trim().split(" ").length < 2
        ? { state: "error", msg: "Please enter your full name (first and last)." }
        : { state: "valid", msg: "" };
    case "mobile":
      return /^[6-9]\d{9}$/.test(value.replace(/\s/g, ""))
        ? { state: "valid", msg: "" }
        : { state: "error", msg: "Enter a valid 10-digit Indian mobile number." };
    case "email":
      if (!value) return { state: "idle", msg: "" };
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? { state: "valid", msg: "" }
        : { state: "error", msg: "Enter a valid email address." };
    case "abhaNumber":
      if (!value) return { state: "idle", msg: "" };
      return /^\d{2}-\d{4}-\d{4}-\d{4}$/.test(value) || /^\d{14}$/.test(value.replace(/-/g, ""))
        ? { state: "valid", msg: "" }
        : { state: "error", msg: "ABHA number format: 12-3456-7890-0001" };
    case "abhaAddress":
      if (!value) return { state: "idle", msg: "" };
      return /^[a-zA-Z0-9._]{4,}@(abdm|ndhm)$/.test(value)
        ? { state: "valid", msg: "" }
        : { state: "error", msg: "Format: yourname@abdm or yourname@ndhm" };
    case "otp":
      return /^\d{6}$/.test(value)
        ? { state: "valid", msg: "" }
        : { state: "error", msg: "Enter the 6-digit OTP sent to your mobile." };
    default:
      return { state: "valid", msg: "" };
  }
}

// ─── Reusable field components ────────────────────────────────────────────────
function FieldLabel({ label, required, optional }: { label: string; required?: boolean; optional?: boolean }) {
  return (
    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
      {label}
      {required && <span style={{ color: T.danger, marginLeft: 3 }}>*</span>}
      {optional && <span style={{ color: T.grayLight, fontWeight: 400, fontSize: 11, marginLeft: 6 }}>(optional)</span>}
    </label>
  );
}

function FieldHint({ msg }: { msg: string }) {
  return <p style={{ fontSize: 11, color: T.grayLight, marginTop: 5, lineHeight: 1.5 }}>{msg}</p>;
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p style={{ fontSize: 11, color: T.danger, marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
      <Icon d={icons.alert} size={12} stroke={T.danger} /> {msg}
    </p>
  );
}

function FieldSuccess() {
  return (
    <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
      <Icon d={icons.check} size={15} stroke={T.success} />
    </span>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: `1px solid ${T.border}`,
  borderRadius: 9,
  fontSize: 13,
  color: T.navy,
  background: T.white,
  outline: "none",
  fontFamily: "Inter, system-ui, sans-serif",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

function TextInput({
  name, placeholder, value, onChange, state, icon, rightSlot, type = "text",
}: {
  name: string; placeholder: string; value: string;
  onChange: (v: string) => void; state: FieldState; icon?: string; rightSlot?: React.ReactNode; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = state === "error" ? T.danger : state === "valid" ? T.success : focused ? T.primary : T.border;
  const bg = state === "error" ? T.dangerBg : T.white;
  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <Icon d={icon} size={15} stroke={state === "error" ? T.danger : T.grayLight} />
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputBase, paddingLeft: icon ? 38 : 14, paddingRight: (state === "valid" || rightSlot) ? 40 : 14, borderColor, background: bg }}
      />
      {state === "valid" && !rightSlot && <FieldSuccess />}
      {rightSlot && <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>{rightSlot}</span>}
    </div>
  );
}

function SelectInput({
  value, onChange, options, placeholder,
}: {
  value: string; onChange: (v: string) => void; options: { label: string; value: string }[]; placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputBase, appearance: "none", paddingRight: 36, borderColor: focused ? T.primary : T.border, color: value ? T.navy : T.grayLight, cursor: "pointer" }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon d={icons.chevronDown} size={14} stroke={T.grayLight} />
      </span>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function FormSection({
  number, title, subtitle, children,
}: {
  number: number; title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ paddingBottom: 32, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.primaryLight, border: `1.5px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.primary }}>{number}</span>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, letterSpacing: "-0.01em" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ paddingLeft: 42 }}>{children}</div>
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function ConsentCheck({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
      <div
        onClick={onChange}
        style={{
          width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${checked ? T.primary : T.border}`,
          background: checked ? T.primary : T.white, display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 1, cursor: "pointer", transition: "all 0.15s",
        }}
      >
        {checked && <Icon d={icons.check} size={11} stroke="#fff" />}
      </div>
      <span style={{ fontSize: 13, color: T.gray, lineHeight: 1.6 }}>{children}</span>
    </label>
  );
}

// ─── OTP input row ────────────────────────────────────────────────────────────
function OTPInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  function handleChange(idx: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...value];
    next[idx] = val;
    onChange(next);
    if (val && idx < 5) refs[idx + 1].current?.focus();
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !value[idx] && idx > 0) refs[idx - 1].current?.focus();
  }

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <input
          key={idx}
          ref={refs[idx]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx]}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          style={{
            width: 44, height: 52, textAlign: "center", fontSize: 20, fontWeight: 700,
            border: `1.5px solid ${value[idx] ? T.primary : T.border}`, borderRadius: 9,
            color: T.navy, background: value[idx] ? T.primaryLight : T.white, outline: "none",
            fontFamily: "Inter, system-ui, sans-serif", transition: "all 0.15s",
          }}
        />
      ))}
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBar({ step }: { step: number }) {
  const steps = ["Personal Info", "ABHA", "Preferences", "Verification", "Consent"];
  return (
    <div style={{ display: "flex", gap: 0, alignItems: "center", marginBottom: 36 }}>
      {steps.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: done ? T.primary : active ? T.primaryLight : T.muted,
                border: `1.5px solid ${done ? T.primary : active ? T.primary : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {done
                  ? <Icon d={icons.check} size={13} stroke="#fff" />
                  : <span style={{ fontSize: 11, fontWeight: 700, color: active ? T.primary : T.grayLight }}>{i + 1}</span>}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, color: active ? T.primary : done ? T.gray : T.grayLight, whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 1.5, background: done ? T.primary : T.border, marginBottom: 22, marginLeft: 6, marginRight: 6, transition: "background 0.3s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Registration component ──────────────────────────────────────────────
export default function Register({ onSignIn }: { onSignIn: () => void }) {
  // Step 0=Personal, 1=ABHA, 2=Prefs, 3=Verify, 4=Consent, 5=Done
  const [step, setStep] = useState(0);

  // Personal
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // ABHA
  const [abhaNumber, setAbhaNumber] = useState("");
  const [abhaAddress, setAbhaAddress] = useState("");
  const [abhaConnected, setAbhaConnected] = useState(false);

  // Prefs
  const [language, setLanguage] = useState("");
  const [commMode, setCommMode] = useState<"voice" | "text" | "both" | "">("");

  // OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Consent
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);

  const otpValue = otpDigits.join("");
  const nameState = fullName ? validate("fullName", fullName).state : "idle";
  const mobileState = mobile ? validate("mobile", mobile).state : "idle";
  const emailState = email ? validate("email", email).state : "idle";
  const abhaNumState = abhaNumber ? validate("abhaNumber", abhaNumber).state : "idle";
  const abhaAddrState = abhaAddress ? validate("abhaAddress", abhaAddress).state : "idle";
  const otpState = otpValue ? validate("otp", otpValue).state : "idle";

  function startOtpTimer() {
    setOtpTimer(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setOtpTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0; }
        return t - 1;
      });
    }, 1000);
  }

  function sendOtp() {
    if (mobileState !== "valid") return;
    setOtpSent(true);
    startOtpTimer();
  }

  function verifyOtp() {
    if (otpState === "valid") setOtpVerified(true);
  }

  const stepCanProceed = [
    nameState === "valid" && dob && gender && mobileState === "valid",
    true, // ABHA optional
    language && commMode,
    otpVerified,
    consent1 && consent2,
  ];

  if (step === 5) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, system-ui, sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 380 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.successBg, border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Icon d={icons.checkCircle} size={28} stroke={T.success} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: T.navy, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Account Created</h2>
          <p style={{ fontSize: 14, color: T.gray, lineHeight: 1.6, margin: "0 0 28px" }}>
            Welcome to MediKiosk, {fullName.split(" ")[0]}. Your health records and connected care services are ready.
          </p>
          <button
            onClick={onSignIn}
            style={{ width: "100%", padding: "12px", background: T.primary, color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: "0.01em" }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Top bar */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={icons.heart} size={16} stroke="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, letterSpacing: "-0.01em" }}>MediKiosk</div>
            <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 500, letterSpacing: "0.04em" }}>HEALTH PLATFORM</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: T.gray }}>
          Already registered?
          <button
            onClick={onSignIn}
            style={{ color: T.primary, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}
          >
            Sign in
          </button>
        </div>
      </header>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "40px 24px 60px" }}>
        <div style={{ width: "100%", maxWidth: 640 }}>

          {/* Heading */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: T.navy, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              Create your MediKiosk account
            </h1>
            <p style={{ fontSize: 14, color: T.gray, margin: 0, lineHeight: 1.6 }}>
              Register securely to access your health records and connected care services.
            </p>
          </div>

          {/* Step bar */}
          <StepBar step={step} />

          {/* Form card */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: "32px 36px 28px", display: "flex", flexDirection: "column", gap: 28 }}>

            {/* ── Step 0: Personal Information ── */}
            {step === 0 && (
              <FormSection number={1} title="Personal Information" subtitle="This information helps identify you in the healthcare network.">
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                  {/* Full Name */}
                  <div>
                    <FieldLabel label="Full Name" required />
                    <TextInput
                      name="fullName" placeholder="e.g. Rahul Sharma"
                      value={fullName} onChange={setFullName}
                      state={nameState} icon={icons.user}
                    />
                    {nameState === "error" && <FieldError msg={validate("fullName", fullName).msg} />}
                    {nameState === "idle" && <FieldHint msg="Enter your name exactly as it appears on your Aadhaar card." />}
                  </div>

                  {/* DOB + Gender (2-col) */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <FieldLabel label="Date of Birth" required />
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                          <Icon d={icons.calendar} size={15} stroke={T.grayLight} />
                        </span>
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          max={new Date().toISOString().split("T")[0]}
                          style={{ ...inputBase, paddingLeft: 38, borderColor: dob ? T.success : T.border, color: dob ? T.navy : T.grayLight }}
                        />
                      </div>
                    </div>
                    <div>
                      <FieldLabel label="Gender" required />
                      <SelectInput
                        value={gender}
                        onChange={setGender}
                        placeholder="Select gender"
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                          { value: "other", label: "Other" },
                          { value: "prefer_not", label: "Prefer not to say" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <FieldLabel label="Mobile Number" required />
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: 12, fontWeight: 600, color: T.grayLight }}>+91</span>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        style={{ ...inputBase, paddingLeft: 44, borderColor: mobileState === "error" ? T.danger : mobileState === "valid" ? T.success : T.border, background: mobileState === "error" ? T.dangerBg : T.white }}
                      />
                      {mobileState === "valid" && <FieldSuccess />}
                    </div>
                    {mobileState === "error" && <FieldError msg={validate("mobile", mobile).msg} />}
                    {mobileState === "idle" && <FieldHint msg="Used for OTP verification and appointment reminders." />}
                  </div>

                  {/* Email */}
                  <div>
                    <FieldLabel label="Email Address" optional />
                    <TextInput
                      name="email" placeholder="rahul.sharma@email.com"
                      value={email} onChange={setEmail}
                      state={emailState} icon={icons.mail}
                    />
                    {emailState === "error" && <FieldError msg={validate("email", email).msg} />}
                    {emailState === "idle" && <FieldHint msg="For appointment confirmations and health report notifications." />}
                  </div>
                </div>
              </FormSection>
            )}

            {/* ── Step 1: ABHA ── */}
            {step === 1 && (
              <FormSection number={2} title="ABHA Health Connection" subtitle="Connect your Ayushman Bharat Health Account for seamless record access.">
                <div style={{ marginBottom: 16, padding: "12px 14px", background: T.amberBg, border: `1px solid ${T.amberBorder}`, borderRadius: 9 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <Icon d={icons.info} size={14} stroke={T.amber} />
                    <p style={{ fontSize: 12, color: "#92400e", margin: 0, lineHeight: 1.6 }}>
                      You can connect your ABHA to access and share health records with your consent. Your records are shared only when you explicitly approve each sharing request.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <FieldLabel label="ABHA Number" optional />
                    <TextInput
                      name="abhaNumber" placeholder="12-3456-7890-0001"
                      value={abhaNumber} onChange={setAbhaNumber}
                      state={abhaNumState} icon={icons.link}
                    />
                    {abhaNumState === "error" && <FieldError msg={validate("abhaNumber", abhaNumber).msg} />}
                    {abhaNumState === "idle" && <FieldHint msg="14-digit ABHA number from your Ayushman Bharat card." />}
                  </div>

                  <div>
                    <FieldLabel label="ABHA Address" optional />
                    <TextInput
                      name="abhaAddress" placeholder="rahul.sharma@abdm"
                      value={abhaAddress} onChange={setAbhaAddress}
                      state={abhaAddrState} icon={icons.globe}
                    />
                    {abhaAddrState === "error" && <FieldError msg={validate("abhaAddress", abhaAddress).msg} />}
                    {abhaAddrState === "idle" && <FieldHint msg="Your ABHA address ends with @abdm or @ndhm." />}
                  </div>

                  <button
                    onClick={() => { if (abhaNumState === "valid" || abhaAddrState === "valid") setAbhaConnected(true); }}
                    style={{
                      padding: "10px 20px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer",
                      background: abhaConnected ? T.successBg : T.primaryLight,
                      color: abhaConnected ? T.success : T.primary,
                      border: `1px solid ${abhaConnected ? T.successBorder : T.primaryBorder}`,
                      display: "flex", alignItems: "center", gap: 8, width: "fit-content", transition: "all 0.15s",
                    } as React.CSSProperties}
                  >
                    <Icon d={abhaConnected ? icons.checkCircle : icons.link} size={15} stroke={abhaConnected ? T.success : T.primary} />
                    {abhaConnected ? "ABHA Connected" : "Connect ABHA"}
                  </button>

                  {abhaConnected && (
                    <div style={{ padding: "12px 14px", background: T.successBg, border: `1px solid ${T.successBorder}`, borderRadius: 9, fontSize: 12, color: "#166534", display: "flex", gap: 8, alignItems: "center" }}>
                      <Icon d={icons.shield} size={14} stroke={T.success} />
                      ABHA account linked. Health records will be accessible through your consent approvals.
                    </div>
                  )}

                  <p style={{ fontSize: 12, color: T.grayLight, lineHeight: 1.6, margin: 0 }}>
                    Skipping ABHA is fine — you can connect it later from your profile settings.
                  </p>
                </div>
              </FormSection>
            )}

            {/* ── Step 2: Preferences ── */}
            {step === 2 && (
              <FormSection number={3} title="Preferences" subtitle="Customize how MediKiosk communicates with you.">
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <FieldLabel label="Preferred Language" required />
                    <SelectInput
                      value={language}
                      onChange={setLanguage}
                      placeholder="Select language"
                      options={[
                        { value: "en", label: "English" },
                        { value: "hi", label: "हिंदी (Hindi)" },
                        { value: "mr", label: "मराठी (Marathi)" },
                        { value: "bn", label: "বাংলা (Bengali)" },
                        { value: "te", label: "తెలుగు (Telugu)" },
                        { value: "ta", label: "தமிழ் (Tamil)" },
                        { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
                        { value: "gu", label: "ગુજરાતી (Gujarati)" },
                        { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
                        { value: "ml", label: "മലയാളം (Malayalam)" },
                        { value: "or", label: "ଓଡ଼ିଆ (Odia)" },
                      ]}
                    />
                    <FieldHint msg="Appointment reminders and notifications will use this language." />
                  </div>

                  <div>
                    <FieldLabel label="Preferred Communication Mode" required />
                    <div style={{ display: "flex", gap: 10 }}>
                      {([
                        { id: "voice", label: "Voice Call", icon: icons.phone },
                        { id: "text", label: "SMS / Text", icon: icons.message },
                        { id: "both", label: "Both", icon: icons.globe },
                      ] as const).map((opt) => {
                        const active = commMode === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setCommMode(opt.id)}
                            style={{
                              flex: 1, padding: "11px 12px", border: `1.5px solid ${active ? T.primary : T.border}`,
                              borderRadius: 9, background: active ? T.primaryLight : T.white, cursor: "pointer",
                              display: "flex", alignItems: "center", gap: 8, fontSize: 13,
                              fontWeight: active ? 600 : 400, color: active ? T.primary : T.gray,
                              transition: "all 0.15s", fontFamily: "Inter, system-ui, sans-serif",
                            }}
                          >
                            <Icon d={opt.icon} size={15} stroke={active ? T.primary : T.grayLight} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <FieldHint msg="We'll use this to send appointment confirmations, reminders, and health alerts." />
                  </div>
                </div>
              </FormSection>
            )}

            {/* ── Step 3: Verification ── */}
            {step === 3 && (
              <FormSection number={4} title="Mobile Verification" subtitle="Confirm your identity with a one-time passcode.">
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                  {/* Mobile display */}
                  <div style={{ padding: "12px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 11, color: T.grayLight, marginBottom: 2 }}>Mobile number</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.navy }}>+91 {mobile}</div>
                    </div>
                    <button
                      onClick={() => setStep(0)}
                      style={{ fontSize: 12, color: T.primary, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
                    >
                      Change
                    </button>
                  </div>

                  {!otpSent ? (
                    <button
                      onClick={sendOtp}
                      disabled={mobileState !== "valid"}
                      style={{
                        padding: "11px 24px", background: mobileState === "valid" ? T.primary : T.muted,
                        color: mobileState === "valid" ? "#fff" : T.grayLight, border: "none",
                        borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: mobileState === "valid" ? "pointer" : "not-allowed",
                        display: "flex", alignItems: "center", gap: 8, width: "fit-content",
                      }}
                    >
                      <Icon d={icons.phone} size={15} stroke={mobileState === "valid" ? "#fff" : T.grayLight} />
                      Send OTP
                    </button>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <p style={{ fontSize: 13, color: T.gray, margin: 0 }}>
                        A 6-digit OTP has been sent to <strong style={{ color: T.navy }}>+91 {mobile}</strong>. It is valid for 10 minutes.
                      </p>

                      <div>
                        <FieldLabel label="Enter OTP" required />
                        <OTPInput value={otpDigits} onChange={setOtpDigits} />
                        {otpState === "error" && <FieldError msg="OTP must be 6 digits." />}
                      </div>

                      {!otpVerified ? (
                        <button
                          onClick={verifyOtp}
                          disabled={otpState !== "valid"}
                          style={{
                            padding: "10px 24px", background: otpState === "valid" ? T.primary : T.muted,
                            color: otpState === "valid" ? "#fff" : T.grayLight, border: "none",
                            borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: otpState === "valid" ? "pointer" : "not-allowed",
                            width: "fit-content",
                          }}
                        >
                          Verify OTP
                        </button>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: T.success, fontSize: 13, fontWeight: 600 }}>
                          <Icon d={icons.checkCircle} size={16} stroke={T.success} />
                          Mobile number verified successfully
                        </div>
                      )}

                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.grayLight }}>
                        {otpTimer > 0 ? (
                          <span>Resend OTP in <strong style={{ color: T.navy }}>{otpTimer}s</strong></span>
                        ) : (
                          <button
                            onClick={() => { setOtpDigits(["", "", "", "", "", ""]); setOtpVerified(false); startOtpTimer(); }}
                            style={{ display: "flex", alignItems: "center", gap: 6, color: T.primary, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 12 }}
                          >
                            <Icon d={icons.refresh} size={12} stroke={T.primary} />
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FormSection>
            )}

            {/* ── Step 4: Consent ── */}
            {step === 4 && (
              <FormSection number={5} title="Consent & Data Use" subtitle="Please read and confirm the following before creating your account.">
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                  <div style={{ padding: "14px 16px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, marginBottom: 4 }}>
                    <p style={{ fontSize: 12, color: T.gray, margin: 0, lineHeight: 1.7 }}>
                      MediKiosk collects only the health information required to provide you with coordinated care services. Your data is encrypted, stored securely, and never shared without your explicit consent.
                    </p>
                  </div>

                  <ConsentCheck checked={consent1} onChange={() => setConsent1((v) => !v)}>
                    I agree to MediKiosk collecting and processing my health information for the purpose of providing healthcare services, appointment management, and clinical coordination.
                  </ConsentCheck>

                  <ConsentCheck checked={consent2} onChange={() => setConsent2((v) => !v)}>
                    I consent to sharing selected health records through ABDM/ABHA only when I explicitly approve each individual sharing request. I understand I can revoke consent at any time from my profile.
                  </ConsentCheck>

                  {(!consent1 || !consent2) && (
                    <div style={{ padding: "10px 14px", background: T.amberBg, border: `1px solid ${T.amberBorder}`, borderRadius: 8, fontSize: 12, color: "#92400e", display: "flex", gap: 8, alignItems: "center" }}>
                      <Icon d={icons.info} size={13} stroke={T.amber} />
                      Both consents are required to use MediKiosk services.
                    </div>
                  )}

                  <p style={{ fontSize: 11, color: T.grayLight, margin: 0, lineHeight: 1.6, paddingTop: 4 }}>
                    By creating an account, you also agree to MediKiosk's{" "}
                    <a href="#" style={{ color: T.primary }}>Terms of Service</a> and{" "}
                    <a href="#" style={{ color: T.primary }}>Privacy Policy</a>.
                  </p>
                </div>
              </FormSection>
            )}

          </div>

          {/* Navigation buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: T.white, color: T.gray, border: `1px solid ${T.border}`, borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
              >
                <Icon d={icons.arrowLeft} size={14} stroke={T.gray} />
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!stepCanProceed[step]}
                style={{
                  padding: "11px 28px", background: stepCanProceed[step] ? T.primary : T.muted,
                  color: stepCanProceed[step] ? "#fff" : T.grayLight, border: "none",
                  borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: stepCanProceed[step] ? "pointer" : "not-allowed",
                  letterSpacing: "0.01em", transition: "all 0.15s",
                }}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => { if (consent1 && consent2) setStep(5); }}
                disabled={!consent1 || !consent2}
                style={{
                  padding: "11px 32px", background: (consent1 && consent2) ? T.primary : T.muted,
                  color: (consent1 && consent2) ? "#fff" : T.grayLight, border: "none",
                  borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: (consent1 && consent2) ? "pointer" : "not-allowed",
                  letterSpacing: "0.01em", transition: "all 0.15s",
                }}
              >
                Create Account
              </button>
            )}
          </div>

          {/* Sign in link */}
          <p style={{ textAlign: "center", fontSize: 13, color: T.grayLight, marginTop: 24 }}>
            Already have an account?{" "}
            <button onClick={onSignIn} style={{ color: T.primary, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
              Sign in to MediKiosk
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

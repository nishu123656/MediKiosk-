import { useState, useRef } from "react";

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
  chevDown:    "M19 9l-7 7-7-7",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  building:    "M3 21h18M3 7l9-4 9 4M4 11h16v10H4z M9 21v-6h6v6",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  upload:      "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  x:           "M18 6L6 18M6 6l12 12",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  save:        "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  globe:       "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail:        "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  mapPin:      "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  hash:        "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  clipboard:   "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2 M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z",
};

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  primary:       "#0d7a6e",
  primaryLight:  "#f0fdf9",
  primaryBorder: "#b2e8e0",
  primaryDark:   "#095f55",
  navy:          "#0f1f3d",
  gray:          "#64748b",
  grayLight:     "#94a3b8",
  bg:            "#f5f7fa",
  white:         "#ffffff",
  border:        "#e8ecf0",
  muted:         "#f8fafc",
  success:       "#16a34a",
  successLight:  "#f0fdf4",
  successBorder: "#bbf7d0",
  amber:         "#d97706",
  amberLight:    "#fffbeb",
  amberBorder:   "#fde68a",
  blue:          "#1d4ed8",
  blueLight:     "#eff6ff",
  blueBorder:    "#bfdbfe",
  danger:        "#e84b4b",
  dangerLight:   "#fff5f5",
  dangerBorder:  "#fecaca",
};

// ─── Progress steps ───────────────────────────────────────────────────────────
const STEPS = [
  { label: "Organisation Details" },
  { label: "Verification"         },
  { label: "Review"               },
  { label: "Approval"             },
];

function ProgressBar({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {STEPS.map((s, i) => {
        const done    = i < current;
        const active  = i === current;
        const isLast  = i === STEPS.length - 1;
        return (
          <div key={s.label} style={{ display: "flex", alignItems: "center", flex: isLast ? 0 : 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: done ? T.primary : active ? T.navy : T.white,
                border: `2px solid ${done ? T.primary : active ? T.primary : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {done
                  ? <Icon d={ic.check} size={13} stroke="#fff" />
                  : <span style={{ fontSize: 11, fontWeight: 700, color: active ? "#fff" : T.grayLight }}>{i + 1}</span>
                }
              </div>
              <span style={{
                fontSize: 10, fontWeight: active || done ? 700 : 400,
                color: done ? T.primary : active ? T.navy : T.grayLight,
                whiteSpace: "nowrap" as const, textAlign: "center" as const,
              }}>{s.label}</span>
            </div>
            {!isLast && (
              <div style={{ flex: 1, height: 2, background: done ? T.primary : T.border, margin: "0 6px", marginBottom: 20, minWidth: 16 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Field atoms ──────────────────────────────────────────────────────────────
interface FieldProps {
  label:       string;
  required?:   boolean;
  note?:       string;
  error?:      string;
  children:    React.ReactNode;
}
function Field({ label, required, note, error, children }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: T.navy, display: "flex", gap: 3 }}>
        {label}
        {required && <span style={{ color: T.danger, fontWeight: 700 }}>*</span>}
      </label>
      {children}
      {note  && !error && <span style={{ fontSize: 11, color: T.grayLight }}>{note}</span>}
      {error && <span style={{ fontSize: 11, color: T.danger }}>{error}</span>}
    </div>
  );
}

const inputStyle = (focused: boolean, error?: string): React.CSSProperties => ({
  width: "100%", padding: "9px 12px", fontSize: 13, color: T.navy,
  border: `1px solid ${error ? T.danger : focused ? T.primary : T.border}`,
  borderRadius: 8, background: T.white, outline: "none",
  fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const,
  transition: "border-color 0.15s",
});

function Input({
  placeholder, value, onChange, type = "text", disabled, icon,
}: { placeholder?: string; value: string; onChange: (v: string) => void; type?: string; disabled?: boolean; icon?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <Icon d={icon} size={14} stroke={focused ? T.primary : T.grayLight} />
        </span>
      )}
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...inputStyle(focused), paddingLeft: icon ? 32 : 12 }}
      />
    </div>
  );
}

function Select({
  value, onChange, options, placeholder,
}: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...inputStyle(focused), appearance: "none" as const, paddingRight: 32, cursor: "pointer" }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon d={ic.chevDown} size={14} stroke={T.grayLight} />
      </span>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  num, title, subtitle, icon, children,
}: { num: number; title: string; subtitle?: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
      {/* Section head */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={icon} size={16} stroke={T.primary} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em" }}>SECTION {num}</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ padding: "24px 24px" }}>
        {children}
      </div>
    </div>
  );
}

// ─── 2-col grid ───────────────────────────────────────────────────────────────
function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
      {children}
    </div>
  );
}

// ─── Upload component ─────────────────────────────────────────────────────────
interface UploadedFile { name: string; size: string; }

function UploadBox({
  label, required, uploaded, onUpload, onRemove,
}: { label: string; required?: boolean; uploaded: UploadedFile | null; onUpload: (f: UploadedFile) => void; onRemove: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const f = files[0];
    const kb = f.size / 1024;
    onUpload({ name: f.name, size: kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB` });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: T.navy, display: "flex", gap: 3 }}>
        {label}
        {required && <span style={{ color: T.danger }}>*</span>}
      </label>

      {uploaded ? (
        /* Uploaded state */
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "#dcfce7", border: `1px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon d={ic.fileText} size={14} stroke={T.success} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{uploaded.name}</div>
            <div style={{ fontSize: 10, color: T.grayLight }}>{uploaded.size} · Uploaded</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 9px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 11, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
              <Icon d={ic.eye} size={11} stroke={T.gray} />
              View
            </button>
            <button onClick={onRemove} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 9px", background: T.white, border: `1px solid ${T.dangerBorder}`, borderRadius: 6, fontSize: 11, color: T.danger, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
              <Icon d={ic.x} size={11} stroke={T.danger} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => ref.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
          style={{
            padding: "22px 16px", borderRadius: 9, textAlign: "center", cursor: "pointer",
            border: `2px dashed ${drag ? T.primary : T.border}`,
            background: drag ? T.primaryLight : T.muted,
            transition: "all 0.15s",
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 9, background: T.white, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
            <Icon d={ic.upload} size={16} stroke={T.primary} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 3 }}>Upload Document</div>
          <div style={{ fontSize: 11, color: T.grayLight }}>Drag & drop or click to browse</div>
          <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={(e) => handleFiles(e.target.files)} />
        </div>
      )}
    </div>
  );
}

// ─── Medicine chip group ──────────────────────────────────────────────────────
const MEDICINE_SYSTEMS = ["Ayurveda", "Yoga & Naturopathy", "Unani", "Siddha", "Homoeopathy", "Multi-system"];

function ChipGroup({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 7, flexWrap: "wrap" as const }}>
      {MEDICINE_SYSTEMS.map((s) => {
        const on = selected.includes(s);
        return (
          <button key={s} onClick={() => onToggle(s)} style={{
            padding: "6px 14px", borderRadius: 20, cursor: "pointer",
            border: `1px solid ${on ? T.primary : T.border}`,
            background: on ? T.primaryLight : T.white,
            color: on ? T.primary : T.gray,
            fontSize: 12, fontWeight: on ? 700 : 400,
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            {on && <Icon d={ic.check} size={11} stroke={T.primary} />}
            {s}
          </button>
        );
      })}
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, height: 56, display: "flex", alignItems: "center", padding: "0 28px", gap: 12 }}>
        <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={ic.heart} size={12} stroke="#fff" />
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>MediKiosk</span>
        <div style={{ flex: 1 }} />
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: T.gray, fontFamily: "Inter, system-ui, sans-serif" }}>
          Return to Home
        </button>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 540 }}>

          {/* Success card */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 13, padding: "40px 36px", marginBottom: 16 }}>
            {/* Icon */}
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.successLight, border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
              <Icon d={ic.checkCircle} size={28} stroke={T.success} />
            </div>

            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: T.navy, marginBottom: 8, letterSpacing: "-0.02em" }}>Registration Submitted</div>
              <p style={{ margin: 0, fontSize: 13, color: T.gray, lineHeight: 1.7 }}>
                Your hospital profile is under verification. Our team will review your submitted details and documents.
              </p>
            </div>

            {/* Status + ID */}
            <div style={{ background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, padding: "16px 20px", marginBottom: 24 }}>
              {[
                { label: "Status",          value: "Pending Verification", color: T.amber   },
                { label: "Registration ID", value: "MK-HOS-2026-0042",    color: T.navy    },
                { label: "Submitted",       value: "10 September 2026",    color: T.navy    },
                { label: "Facility",        value: "City Care Hospital",   color: T.navy    },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: T.gray }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: row.color }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Next step */}
            <div style={{ padding: "12px 16px", background: T.blueLight, border: `1px solid ${T.blueBorder}`, borderRadius: 8, marginBottom: 24, display: "flex", gap: 9, alignItems: "flex-start" }}>
              <Icon d={ic.info} size={14} stroke={T.blue} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.blue, marginBottom: 2 }}>Next Step</div>
                <p style={{ margin: 0, fontSize: 12, color: T.blue, lineHeight: 1.55 }}>
                  An administrator will review your submitted details and documents. You will be notified via email once the review is complete.
                </p>
              </div>
            </div>

            <button style={{
              width: "100%", padding: "12px",
              background: T.primary, border: "none", borderRadius: 9,
              fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <Icon d={ic.clipboard} size={15} stroke="#fff" />
              View Application Status
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ padding: "12px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, display: "flex", gap: 9, alignItems: "flex-start" }}>
            <Icon d={ic.shield} size={13} stroke={T.primary} />
            <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
              Registration is subject to document verification and compliance with applicable healthcare regulations. MediKiosk reserves the right to approve, reject, or request additional information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function HospitalRegistration({ onBack }: { onBack: () => void }) {
  // ── Form state ─────────────────────────────────────────────────────────────
  const [hospitalName,       setHospitalName]       = useState("");
  const [facilityType,       setFacilityType]       = useState("");
  const [medicineSystems,    setMedicineSystems]    = useState<string[]>([]);
  const [address,            setAddress]            = useState("");
  const [city,               setCity]               = useState("");
  const [stateVal,           setStateVal]           = useState("");
  const [pin,                setPin]                = useState("");
  const [officialPhone,      setOfficialPhone]      = useState("");
  const [officialEmail,      setOfficialEmail]      = useState("");

  const [regNumber,          setRegNumber]          = useState("");
  const [issuingAuthority,   setIssuingAuthority]   = useState("");
  const [regYear,            setRegYear]            = useState("");
  const [website,            setWebsite]            = useState("");

  const [adminName,          setAdminName]          = useState("");
  const [adminDesignation,   setAdminDesignation]   = useState("");
  const [adminPhone,         setAdminPhone]         = useState("");
  const [adminEmail,         setAdminEmail]         = useState("");

  const [docReg,             setDocReg]             = useState<{ name: string; size: string } | null>(null);
  const [docEstab,           setDocEstab]           = useState<{ name: string; size: string } | null>(null);
  const [docAdditional,      setDocAdditional]      = useState<{ name: string; size: string } | null>(null);

  const [declared,           setDeclared]           = useState(false);
  const [errors,             setErrors]             = useState<Record<string, string>>({});
  const [submitted,          setSubmitted]          = useState(false);
  const [saveDraft,          setSaveDraft]          = useState(false);

  function toggleMedicine(v: string) {
    setMedicineSystems((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!hospitalName.trim())     e.hospitalName      = "Hospital name is required.";
    if (!facilityType)            e.facilityType      = "Please select a facility type.";
    if (medicineSystems.length === 0) e.medicineSystems = "Select at least one system of medicine.";
    if (!address.trim())          e.address           = "Address is required.";
    if (!city.trim())             e.city              = "City is required.";
    if (!stateVal.trim())         e.state             = "State is required.";
    if (!pin.trim())              e.pin               = "PIN code is required.";
    if (!officialPhone.trim())    e.officialPhone     = "Official phone number is required.";
    if (!officialEmail.trim())    e.officialEmail     = "Official email is required.";
    if (!regNumber.trim())        e.regNumber         = "Registration number is required.";
    if (!issuingAuthority.trim()) e.issuingAuthority  = "Issuing authority is required.";
    if (!regYear.trim())          e.regYear           = "Year of registration is required.";
    if (!adminName.trim())        e.adminName         = "Administrator name is required.";
    if (!adminDesignation.trim()) e.adminDesignation  = "Designation is required.";
    if (!adminPhone.trim())       e.adminPhone        = "Administrator phone is required.";
    if (!adminEmail.trim())       e.adminEmail        = "Administrator email is required.";
    if (!docReg)                  e.docReg            = "Registration certificate is required.";
    if (!docEstab)                e.docEstab          = "Establishment document is required.";
    if (!declared)                e.declared          = "You must confirm the declaration to proceed.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (validate()) setSubmitted(true);
  }

  function handleSaveDraft() {
    setSaveDraft(true);
    setTimeout(() => setSaveDraft(false), 2000);
  }

  if (submitted) return <SuccessScreen onBack={onBack} />;

  const INDIA_STATES = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
    "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
    "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
    "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir",
    "Ladakh","Puducherry","Chandigarh","Dadra & Nagar Haveli","Daman & Diu","Lakshadweep","Andaman & Nicobar",
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy }}>

      {/* ── Header ── */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 28px", gap: 14 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.gray, fontSize: 13, fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif", padding: "4px 0" }}>
            <Icon d={ic.chevLeft} size={15} stroke={T.gray} />
            Back
          </button>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={12} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Register your Hospital</div>
              <div style={{ fontSize: 10, color: T.grayLight }}>Healthcare Facility Onboarding · MediKiosk</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={handleSaveDraft}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 16px",
              background: saveDraft ? T.successLight : T.muted,
              border: `1px solid ${saveDraft ? T.successBorder : T.border}`,
              borderRadius: 8, fontSize: 12, fontWeight: 600,
              color: saveDraft ? T.success : T.gray,
              cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
              transition: "all 0.2s",
            }}
          >
            <Icon d={saveDraft ? ic.check : ic.save} size={13} stroke={saveDraft ? T.success : T.gray} />
            {saveDraft ? "Draft Saved" : "Save as Draft"}
          </button>
        </div>

        {/* Progress */}
        <div style={{ padding: "14px 28px 16px", borderTop: `1px solid ${T.border}` }}>
          <ProgressBar current={0} />
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* Page heading */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: T.navy, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Register your Hospital</h1>
          <p style={{ margin: 0, fontSize: 13, color: T.gray, lineHeight: 1.65 }}>
            Join MediKiosk to manage doctors, patients, appointments and connected care securely. All submitted information is reviewed by our team before activation.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── Section 1 ── */}
          <Section num={1} title="Hospital Information" subtitle="Basic details about your healthcare facility" icon={ic.building}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              <Field label="Hospital / Healthcare Facility Name" required error={errors.hospitalName}>
                <Input placeholder="Enter full legal name of the facility" value={hospitalName} onChange={setHospitalName} />
              </Field>

              <Grid2>
                <Field label="Facility Type" required error={errors.facilityType}>
                  <Select
                    value={facilityType} onChange={setFacilityType}
                    placeholder="Select facility type"
                    options={["Hospital", "Clinic", "AYUSH Hospital", "Wellness Centre", "Diagnostic Centre"]}
                  />
                </Field>
              </Grid2>

              <Field label="System of Medicine" required error={errors.medicineSystems}
                note="Select all that apply to your facility.">
                <ChipGroup selected={medicineSystems} onToggle={toggleMedicine} />
              </Field>

              <div style={{ height: 1, background: T.border }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em" }}>FACILITY ADDRESS</div>

              <Field label="Street Address" required error={errors.address}>
                <Input placeholder="Building, street, locality" value={address} onChange={setAddress} icon={ic.mapPin} />
              </Field>

              <Grid2>
                <Field label="City" required error={errors.city}>
                  <Input placeholder="City" value={city} onChange={setCity} />
                </Field>
                <Field label="State" required error={errors.state}>
                  <Select value={stateVal} onChange={setStateVal} placeholder="Select state" options={INDIA_STATES} />
                </Field>
              </Grid2>

              <Grid2>
                <Field label="PIN Code" required error={errors.pin}>
                  <Input placeholder="6-digit PIN code" value={pin} onChange={setPin} type="text" />
                </Field>
              </Grid2>

              <div style={{ height: 1, background: T.border }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em" }}>CONTACT DETAILS</div>

              <Grid2>
                <Field label="Official Mobile Number" required error={errors.officialPhone}>
                  <Input placeholder="+91 XXXXX XXXXX" value={officialPhone} onChange={setOfficialPhone} icon={ic.phone} type="tel" />
                </Field>
                <Field label="Official Email Address" required error={errors.officialEmail}>
                  <Input placeholder="admin@hospital.in" value={officialEmail} onChange={setOfficialEmail} icon={ic.mail} type="email" />
                </Field>
              </Grid2>

            </div>
          </Section>

          {/* ── Section 2 ── */}
          <Section num={2} title="Registration Details" subtitle="Government and statutory registration information" icon={ic.hash}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              <Grid2>
                <Field label="Registration / Establishment Number" required error={errors.regNumber}>
                  <Input placeholder="e.g. KA-HOS-2019-00481" value={regNumber} onChange={setRegNumber} />
                </Field>
                <Field label="Issuing Authority" required error={errors.issuingAuthority}>
                  <Input placeholder="e.g. District Health Office" value={issuingAuthority} onChange={setIssuingAuthority} />
                </Field>
              </Grid2>

              <Grid2>
                <Field label="Year of Registration" required error={errors.regYear}>
                  <Input placeholder="e.g. 2019" value={regYear} onChange={setRegYear} type="text" />
                </Field>
                <Field label="Hospital Website" note="Optional">
                  <Input placeholder="https://www.yourhospital.in" value={website} onChange={setWebsite} icon={ic.globe} />
                </Field>
              </Grid2>

              <div style={{ padding: "10px 14px", background: T.blueLight, border: `1px solid ${T.blueBorder}`, borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Icon d={ic.info} size={13} stroke={T.blue} />
                <p style={{ margin: 0, fontSize: 11, color: T.blue, lineHeight: 1.55 }}>
                  Verification details help us confirm that your healthcare facility is legitimate and registered with the appropriate authority. This information is not shared publicly.
                </p>
              </div>

            </div>
          </Section>

          {/* ── Section 3 ── */}
          <Section num={3} title="Authorised Administrator" subtitle="Details of the person authorised to register this facility" icon={ic.user}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Role chip */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 20, width: "fit-content" }}>
                <Icon d={ic.shield} size={12} stroke={T.primary} />
                <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>Role: Hospital Administrator</span>
              </div>

              <Grid2>
                <Field label="Full Name" required error={errors.adminName}>
                  <Input placeholder="As per official ID" value={adminName} onChange={setAdminName} icon={ic.user} />
                </Field>
                <Field label="Designation" required error={errors.adminDesignation}>
                  <Input placeholder="e.g. Medical Director, CEO" value={adminDesignation} onChange={setAdminDesignation} />
                </Field>
              </Grid2>

              <Grid2>
                <Field label="Mobile Number" required error={errors.adminPhone}>
                  <Input placeholder="+91 XXXXX XXXXX" value={adminPhone} onChange={setAdminPhone} icon={ic.phone} type="tel" />
                </Field>
                <Field label="Email Address" required error={errors.adminEmail}>
                  <Input placeholder="Work email address" value={adminEmail} onChange={setAdminEmail} icon={ic.mail} type="email" />
                </Field>
              </Grid2>

              <div style={{ padding: "10px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Icon d={ic.alertTri} size={13} stroke={T.amber} />
                <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
                  The administrator will receive all communications and hold primary access to the MediKiosk dashboard. Ensure this is a verified, active contact.
                </p>
              </div>

            </div>
          </Section>

          {/* ── Section 4 ── */}
          <Section num={4} title="Verification Documents" subtitle="Upload official documents for identity and registration verification" icon={ic.fileText}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Format note */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" as const }}>
                {["PDF", "JPG", "PNG"].map((f) => (
                  <span key={f} style={{ fontSize: 11, fontWeight: 700, color: T.gray, background: T.muted, border: `1px solid ${T.border}`, padding: "3px 10px", borderRadius: 6 }}>{f}</span>
                ))}
                <span style={{ fontSize: 11, color: T.grayLight }}>Maximum file size: 10 MB per document</span>
              </div>

              <UploadBox
                label="Hospital Registration Certificate"
                required
                uploaded={docReg}
                onUpload={setDocReg}
                onRemove={() => setDocReg(null)}
              />
              {errors.docReg && <span style={{ fontSize: 11, color: T.danger, marginTop: -12 }}>{errors.docReg}</span>}

              <UploadBox
                label="Establishment / License Document"
                required
                uploaded={docEstab}
                onUpload={setDocEstab}
                onRemove={() => setDocEstab(null)}
              />
              {errors.docEstab && <span style={{ fontSize: 11, color: T.danger, marginTop: -12 }}>{errors.docEstab}</span>}

              <UploadBox
                label="Additional Supporting Document"
                uploaded={docAdditional}
                onUpload={setDocAdditional}
                onRemove={() => setDocAdditional(null)}
              />

              <div style={{ padding: "10px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Icon d={ic.shield} size={13} stroke={T.primary} />
                <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
                  Uploaded documents are stored securely and used only for verification purposes. They are not shared externally without your consent.
                </p>
              </div>

            </div>
          </Section>

          {/* ── Section 5 — Declaration ── */}
          <div style={{ background: T.white, border: `1px solid ${errors.declared ? T.dangerBorder : T.border}`, borderRadius: 11, padding: "22px 24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Declaration</div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
              {/* Custom checkbox */}
              <div
                onClick={() => setDeclared((v) => !v)}
                style={{
                  width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                  border: `2px solid ${declared ? T.primary : errors.declared ? T.danger : T.border}`,
                  background: declared ? T.primary : T.white,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {declared && <Icon d={ic.check} size={11} stroke="#fff" />}
              </div>
              <span style={{ fontSize: 13, color: T.navy, lineHeight: 1.65 }}>
                I confirm that the information provided is accurate and that I am authorised to register this healthcare facility on behalf of the organisation. I understand that providing false information may result in rejection or deregistration.
              </span>
            </label>

            {errors.declared && (
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon d={ic.alertTri} size={12} stroke={T.danger} />
                <span style={{ fontSize: 11, color: T.danger }}>{errors.declared}</span>
              </div>
            )}
          </div>

          {/* ── Validation summary ── */}
          {Object.keys(errors).length > 0 && (
            <div style={{ padding: "14px 18px", background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, borderRadius: 9, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon d={ic.alertTri} size={15} stroke={T.danger} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.danger, marginBottom: 4 }}>Please fix the following errors</div>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {Object.values(errors).slice(0, 5).map((e, i) => (
                    <li key={i} style={{ fontSize: 12, color: T.danger, marginBottom: 2 }}>{e}</li>
                  ))}
                  {Object.keys(errors).length > 5 && (
                    <li style={{ fontSize: 12, color: T.danger }}>…and {Object.keys(errors).length - 5} more.</li>
                  )}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Sticky action bar ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30,
        background: T.white, borderTop: `1px solid ${T.border}`,
        padding: "14px 28px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 -4px 20px rgba(15,31,61,0.06)",
      }}>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 18px",
            background: "none", border: `1px solid ${T.border}`, borderRadius: 9,
            fontSize: 13, fontWeight: 500, color: T.gray, cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <Icon d={ic.chevLeft} size={14} stroke={T.gray} />
          Back
        </button>

        <div style={{ flex: 1 }} />

        <div style={{ fontSize: 11, color: T.grayLight, display: "flex", alignItems: "center", gap: 5 }}>
          <Icon d={ic.shield} size={12} stroke={T.grayLight} />
          Submitted securely via MediKiosk
        </div>

        <button
          onClick={handleSaveDraft}
          style={{
            padding: "10px 18px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9,
            fontSize: 13, fontWeight: 500, color: T.gray, cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <Icon d={saveDraft ? ic.check : ic.save} size={14} stroke={saveDraft ? T.success : T.gray} />
          {saveDraft ? "Saved" : "Save Draft"}
        </button>

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 28px", background: T.primary, border: "none", borderRadius: 9,
            fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          Submit for Verification
          <Icon d={ic.arrowRight} size={14} stroke="#fff" />
        </button>
      </div>
    </div>
  );
}

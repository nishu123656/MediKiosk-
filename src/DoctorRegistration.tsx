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
  chevRight:   "M9 18l6-6-6-6",
  chevDown:    "M19 9l-7 7-7-7",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  upload:      "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  image:       "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 0L21 21M3 16l5-5 4 4 3-3",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mapPin:      "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  building:    "M3 21h18M3 7l9-4 9 4M4 11h16v10H4z M9 21v-6h6v6",
  x:           "M18 6L6 18M6 6l12 12",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  circle:      "M12 12m-9 0a9 9 0 1018 0 9 9 0 00-18 0",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  save:        "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  trash:       "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3M8 15v1a6 6 0 006 6 6 6 0 006-6v-4",
  doctors:     "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail:        "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  badge:       "M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-4.78-4.77 4 4 0 010-6.76z M16 8.5l-4.5 4-2-2",
  hash:        "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  globe:       "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  award:       "M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  briefcase:   "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  logout:      "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
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

// ─── Shared helpers ───────────────────────────────────────────────────────────
const STEPS = [
  "Personal Details",
  "Professional Details",
  "Documents",
  "Hospital Approval",
];

const MEDICINE_SYSTEMS = [
  "Ayurveda",
  "Yoga & Naturopathy",
  "Unani",
  "Siddha",
  "Homoeopathy",
  "Modern Medicine",
];

const SPECIALIZATIONS: Record<string, string[]> = {
  "Ayurveda":            ["General Ayurveda", "Panchakarma", "Kaumarabhritya", "Shalakya Tantra", "Kayachikitsa"],
  "Yoga & Naturopathy":  ["Yoga Therapy", "Naturopathy", "Dietetics", "Hydrotherapy"],
  "Unani":               ["General Unani", "Moalajat", "Ilmul Advia", "Jarahiyat"],
  "Siddha":              ["General Siddha", "Gunapadam", "Noi Nadal", "Sirappu Maruthuvam"],
  "Homoeopathy":         ["Classical Homoeopathy", "Paediatrics", "Dermatology", "Psychiatry"],
  "Modern Medicine":     ["General Medicine", "Cardiology", "Endocrinology", "Orthopaedics", "Gynaecology", "Paediatrics", "Neurology", "Dermatology", "Ophthalmology", "ENT"],
};

const COUNCILS = [
  "Central Council of Indian Medicine (CCIM)",
  "Central Council of Homoeopathy (CCH)",
  "Medical Council of India (MCI)",
  "Delhi Medical Council",
  "Maharashtra Medical Council",
  "Tamil Nadu Medical Council",
  "Karnataka Medical Council",
  "Kerala Medical Council",
  "Rajasthan Ayurved Council",
  "Other",
];

const HOSPITALS = [
  { id: "h1", name: "AyurCare Hospital",       system: "Ayurveda",       location: "Jaipur, Rajasthan",        verified: true  },
  { id: "h2", name: "Swasthya Wellness Centre", system: "Multi-system",   location: "New Delhi",                verified: false },
  { id: "h3", name: "Arogya Clinic",            system: "Ayurveda",       location: "Pune, Maharashtra",        verified: true  },
  { id: "h4", name: "NatureCure Institute",     system: "Naturopathy",    location: "Bengaluru, Karnataka",     verified: true  },
  { id: "h5", name: "YogaWell Institute",        system: "Yoga & Naturopathy", location: "Rishikesh, Uttarakhand", verified: true },
];

const DEPARTMENTS = [
  "General Medicine", "Outpatient Department (OPD)", "Emergency",
  "Panchakarma", "Dietetics", "Paediatrics", "Orthopaedics", "Gynaecology",
];

const DESIGNATIONS = [
  "Consultant", "Senior Consultant", "Resident Doctor", "Medical Officer",
  "Chief Medical Officer", "Associate Professor", "Professor & HOD",
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0, marginBottom: 32 }}>
      {STEPS.map((label, i) => {
        const done   = i < step;
        const active = i === step;
        const last   = i === STEPS.length - 1;
        return (
          <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            {/* Connector left */}
            {i > 0 && (
              <div style={{
                position: "absolute", left: 0, top: 13, width: "50%", height: 2,
                background: done || active ? T.primary : T.border,
              }} />
            )}
            {/* Connector right */}
            {!last && (
              <div style={{
                position: "absolute", right: 0, top: 13, width: "50%", height: 2,
                background: done ? T.primary : T.border,
              }} />
            )}
            {/* Dot */}
            <div style={{
              width: 28, height: 28, borderRadius: "50%", zIndex: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: done ? T.primary : active ? T.white : T.white,
              border: `2px solid ${done ? T.primary : active ? T.primary : T.border}`,
              fontSize: 11, fontWeight: 700,
              color: done ? "#fff" : active ? T.primary : T.grayLight,
              flexShrink: 0,
            }}>
              {done ? <Icon d={ic.check} size={13} stroke="#fff" /> : i + 1}
            </div>
            <div style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? T.navy : done ? T.primary : T.grayLight, marginTop: 6, textAlign: "center", lineHeight: 1.3 }}>
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: T.gray, marginTop: 3 }}>{subtitle}</div>}
    </div>
  );
}

function FieldWrap({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
        {label}{required && <span style={{ color: T.danger, marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
          <Icon d={ic.alertTri} size={11} stroke={T.danger} />
          <span style={{ fontSize: 11, color: T.danger }}>{error}</span>
        </div>
      )}
    </div>
  );
}

function Input({
  placeholder, value, onChange, type = "text", onFocus, onBlur, focused,
}: {
  placeholder?: string; value: string; onChange: (v: string) => void;
  type?: string; onFocus?: () => void; onBlur?: () => void; focused?: boolean;
}) {
  return (
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus} onBlur={onBlur}
      style={{
        width: "100%", padding: "9px 12px", fontSize: 13, color: T.navy,
        border: `1px solid ${focused ? T.primary : T.border}`, borderRadius: 8,
        background: T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif",
        boxSizing: "border-box" as const,
      }}
    />
  );
}

function Select({
  value, onChange, children, focused, onFocus, onBlur,
}: {
  value: string; onChange: (v: string) => void; children: React.ReactNode;
  focused?: boolean; onFocus?: () => void; onBlur?: () => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus} onBlur={onBlur}
        style={{
          width: "100%", padding: "9px 32px 9px 12px", fontSize: 13, color: value ? T.navy : T.grayLight,
          border: `1px solid ${focused ? T.primary : T.border}`, borderRadius: 8,
          background: T.muted, outline: "none", appearance: "none" as const,
          fontFamily: "Inter, system-ui, sans-serif", cursor: "pointer",
          boxSizing: "border-box" as const,
        }}
      >
        {children}
      </select>
      <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon d={ic.chevDown} size={14} stroke={T.grayLight} />
      </span>
    </div>
  );
}

interface DocFile { name: string; size: string; status: "uploaded" | "uploading" | "error" }

function UploadBox({
  label, required, file, onUpload, onRemove,
}: {
  label: string; required?: boolean; file: DocFile | null;
  onUpload: () => void; onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onUpload();
  }

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
        {label}{required && <span style={{ color: T.danger, marginLeft: 3 }}>*</span>}
      </div>
      {!file ? (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `1.5px dashed ${dragging ? T.primary : T.border}`,
            borderRadius: 9, padding: "18px 16px",
            background: dragging ? T.primaryLight : T.muted,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            cursor: "pointer", transition: "all 0.15s",
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 8, background: dragging ? T.primaryLight : T.white, border: `1px solid ${dragging ? T.primaryBorder : T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.upload} size={16} stroke={dragging ? T.primary : T.grayLight} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: dragging ? T.primary : T.navy }}>Click to upload or drag and drop</div>
          <div style={{ fontSize: 11, color: T.grayLight }}>PDF, JPG, PNG · Max 10 MB</div>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={onUpload} />
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9 }}>
          <div style={{ width: 34, height: 34, borderRadius: 7, background: T.successLight, border: `1px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon d={ic.fileText} size={16} stroke={T.success} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{file.name}</div>
            <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>
              {file.size} · <span style={{ color: T.success, fontWeight: 600 }}>Uploaded</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button style={{ padding: "5px 10px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 11, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
              <Icon d={ic.eye} size={11} stroke={T.gray} />
              View
            </button>
            <button onClick={onRemove} style={{ padding: "5px 10px", background: T.white, border: `1px solid ${T.dangerBorder}`, borderRadius: 6, fontSize: 11, color: T.danger, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
              <Icon d={ic.trash} size={11} stroke={T.danger} />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Pending State ────────────────────────────────────────────────────────────
function PendingState({ onBack }: { onBack: () => void }) {
  const stages = [
    { label: "Registration submitted",  done: true,  active: false },
    { label: "Documents uploaded",      done: true,  active: false },
    { label: "Hospital review",         done: false, active: true  },
    { label: "Account activation",      done: false, active: false },
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 28px", gap: 12 }}>
          <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.heart} size={12} stroke="#fff" />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>MediKiosk</span>
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          {/* Status card */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
            {/* Amber header */}
            <div style={{ padding: "20px 24px", background: T.amberLight, borderBottom: `1px solid ${T.amberBorder}`, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#fef3c7", border: `2px solid ${T.amberBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={ic.clock} size={20} stroke={T.amber} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#78350f" }}>Application Submitted</div>
                <div style={{ fontSize: 12, color: T.amber, marginTop: 2 }}>Pending Hospital Approval</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.amber, background: "#fef3c7", border: `1px solid ${T.amberBorder}`, padding: "2px 10px", borderRadius: 20 }}>
                  Under Review
                </span>
              </div>
            </div>

            <div style={{ padding: "20px 24px" }}>
              {/* Details grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 22, padding: "14px", background: T.muted, borderRadius: 9, border: `1px solid ${T.border}` }}>
                {[
                  { label: "Doctor", value: "Dr. Mehta" },
                  { label: "Hospital", value: "AyurCare Hospital" },
                  { label: "Application ID", value: "MK-DOC-2026-0081" },
                ].map((r) => (
                  <div key={r.label}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em" }}>{r.label.toUpperCase()}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginTop: 3 }}>{r.value}</div>
                  </div>
                ))}
              </div>

              {/* Stages */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.navy, marginBottom: 12, letterSpacing: "0.04em" }}>VERIFICATION STAGES</div>
                {stages.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12, position: "relative" }}>
                    {/* Connector */}
                    {i < stages.length - 1 && (
                      <div style={{ position: "absolute", left: 11, top: 24, bottom: -12, width: 1, background: s.done ? T.primary : T.border }} />
                    )}
                    {/* Icon */}
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                      background: s.done ? T.primary : s.active ? T.amberLight : T.white,
                      border: `2px solid ${s.done ? T.primary : s.active ? T.amber : T.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 1,
                    }}>
                      {s.done
                        ? <Icon d={ic.check} size={11} stroke="#fff" />
                        : s.active
                          ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.amber }} />
                          : <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.border }} />
                      }
                    </div>
                    <div style={{ paddingTop: 2 }}>
                      <div style={{ fontSize: 13, fontWeight: s.done || s.active ? 600 : 400, color: s.done ? T.navy : s.active ? T.amber : T.grayLight }}>
                        {s.label}
                      </div>
                      {s.active && (
                        <div style={{ fontSize: 11, color: T.amber, marginTop: 2 }}>Hospital is reviewing your application</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notice */}
              <div style={{ padding: "10px 14px", background: T.blueLight, border: `1px solid ${T.blueBorder}`, borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 20 }}>
                <Icon d={ic.info} size={13} stroke={T.blue} />
                <p style={{ margin: 0, fontSize: 11, color: T.blue, lineHeight: 1.6 }}>
                  Your profile will become active after the required verification and hospital approval are completed. You will be notified by email at each stage.
                </p>
              </div>

              <button
                onClick={onBack}
                style={{ width: "100%", padding: "11px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Verified State ───────────────────────────────────────────────────────────
function VerifiedState({ onDashboard, onProfile }: { onDashboard: () => void; onProfile: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 28px", gap: 12 }}>
          <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.heart} size={12} stroke="#fff" />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>MediKiosk</span>
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
            {/* Green header */}
            <div style={{ padding: "22px 24px", background: T.successLight, borderBottom: `1px solid ${T.successBorder}`, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#dcfce7", border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={ic.shieldCheck} size={22} stroke={T.success} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#14532d" }}>Doctor Verified</div>
                <div style={{ fontSize: 12, color: T.success, marginTop: 2 }}>Your professional profile has been approved.</div>
              </div>
            </div>

            <div style={{ padding: "20px 24px" }}>
              {/* Profile row */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px", background: T.muted, borderRadius: 9, border: `1px solid ${T.border}`, marginBottom: 20 }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: T.primary, flexShrink: 0 }}>M</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>Dr. Mehta</div>
                  <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>Ayurveda · AyurCare Hospital</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.success, background: "#dcfce7", border: `1px solid ${T.successBorder}`, padding: "1px 8px", borderRadius: 20 }}>
                      ✓ Verified Doctor
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 8px", borderRadius: 20 }}>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Hospital line */}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "8px 0", borderBottom: `1px solid ${T.border}`, marginBottom: 8 }}>
                <span style={{ color: T.gray }}>Hospital</span>
                <span style={{ fontWeight: 600, color: T.navy }}>AyurCare Hospital</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "8px 0", borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
                <span style={{ color: T.gray }}>Application ID</span>
                <span style={{ fontWeight: 600, color: T.navy }}>MK-DOC-2026-0081</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={onDashboard}
                  style={{ width: "100%", padding: "11px", background: T.primary, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
                >
                  Go to Doctor Dashboard
                  <Icon d={ic.arrowRight} size={14} stroke="#fff" />
                </button>
                <button
                  onClick={onProfile}
                  style={{ width: "100%", padding: "10px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
                >
                  <Icon d={ic.user} size={13} stroke={T.gray} />
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function DoctorRegistration({ onBack, onDashboard }: { onBack: () => void; onDashboard?: () => void }) {
  const [step,         setStep]         = useState(0);
  const [viewState,    setViewState]    = useState<"form" | "pending" | "verified">("form");
  const [saveDraft,    setSaveDraft]    = useState(false);
  const [errors,       setErrors]       = useState<Record<string, string>>({});

  // ── Step 0: Personal ───────────────────────────────────────────────────────
  const [fullName,     setFullName]     = useState("");
  const [mobile,       setMobile]       = useState("");
  const [email,        setEmail]        = useState("");
  const [dob,          setDob]          = useState("");
  const [gender,       setGender]       = useState("");
  const [photoFile,    setPhotoFile]    = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  // ── Step 1: Professional ───────────────────────────────────────────────────
  const [regNumber,    setRegNumber]    = useState("");
  const [council,      setCouncil]      = useState("");
  const [regYear,      setRegYear]      = useState("");
  const [medSystem,    setMedSystem]    = useState("");
  const [specialization, setSpec]       = useState("");
  const [experience,   setExperience]   = useState("");
  const [langHindi,    setLangHindi]    = useState(false);
  const [langEnglish,  setLangEnglish]  = useState(false);
  const [langOther,    setLangOther]    = useState("");

  // ── Step 2: Documents ──────────────────────────────────────────────────────
  const [docReg,       setDocReg]       = useState<DocFile | null>(null);
  const [docDegree,    setDocDegree]    = useState<DocFile | null>(null);
  const [docExtra,     setDocExtra]     = useState<DocFile | null>(null);
  const [declaration,  setDeclaration]  = useState(false);

  // ── Step 3: Hospital ───────────────────────────────────────────────────────
  const [hospitalSearch, setHSearch]   = useState("");
  const [hFocus,       setHFocus]       = useState(false);
  const [selectedHosp, setSelHosp]     = useState<typeof HOSPITALS[0] | null>(null);
  const [department,   setDept]         = useState("");
  const [designation,  setDesig]        = useState("");

  // ── Focus states ───────────────────────────────────────────────────────────
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  function fProps(key: string) {
    return {
      focused: !!focused[key],
      onFocus: () => setFocused((f) => ({ ...f, [key]: true })),
      onBlur:  () => setFocused((f) => ({ ...f, [key]: false })),
    };
  }

  const filteredHospitals = HOSPITALS.filter((h) =>
    !hospitalSearch || h.name.toLowerCase().includes(hospitalSearch.toLowerCase())
  );

  function fakeDoc(name: string): DocFile {
    return { name, size: `${(Math.random() * 1.5 + 0.3).toFixed(1)} MB`, status: "uploaded" };
  }

  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!fullName.trim())  e.fullName = "Full name is required";
      if (!mobile.trim())    e.mobile   = "Mobile number is required";
      if (!email.trim())     e.email    = "Email address is required";
      if (!gender)           e.gender   = "Please select a gender";
    }
    if (step === 1) {
      if (!regNumber.trim()) e.regNumber = "Registration number is required";
      if (!council)          e.council   = "Please select a council";
      if (!medSystem)        e.medSystem = "Please select a system of medicine";
      if (!specialization)   e.spec      = "Please select a specialization";
    }
    if (step === 2) {
      if (!docReg)     e.docReg    = "Registration certificate is required";
      if (!docDegree)  e.docDegree = "Degree certificate is required";
      if (!declaration) e.decl     = "Please confirm the declaration";
    }
    if (step === 3) {
      if (!selectedHosp)      e.hospital    = "Please select a hospital";
      if (!department)        e.department  = "Please select a department";
      if (!designation)       e.designation = "Please select a designation";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    if (step < 3) setStep((s) => s + 1);
  }

  function handleSubmit() {
    if (!validateStep()) return;
    setViewState("pending");
  }

  function handleDraft() {
    setSaveDraft(true);
    setTimeout(() => setSaveDraft(false), 2200);
  }

  if (viewState === "pending") {
    return <PendingState onBack={onBack} />;
  }
  if (viewState === "verified") {
    return <VerifiedState onDashboard={onDashboard || onBack} onProfile={() => {}} />;
  }

  const specOptions = medSystem ? SPECIALIZATIONS[medSystem] || [] : [];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, display: "flex", flexDirection: "column" }}>

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
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Register as a Doctor</div>
              <div style={{ fontSize: 10, color: T.grayLight }}>MediKiosk · Doctor Onboarding</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={handleDraft}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: saveDraft ? T.successLight : T.muted, border: `1px solid ${saveDraft ? T.successBorder : T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: saveDraft ? T.success : T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", transition: "all 0.2s" }}
          >
            <Icon d={saveDraft ? ic.check : ic.save} size={13} stroke={saveDraft ? T.success : T.navy} />
            {saveDraft ? "Draft saved" : "Save as Draft"}
          </button>
        </div>
        <div style={{ padding: "8px 28px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ margin: 0, fontSize: 12, color: T.gray }}>
            Join a verified healthcare organisation and provide consultations through MediKiosk.
          </p>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{ flex: 1, padding: "28px 28px 80px", maxWidth: 760, width: "100%", margin: "0 auto", boxSizing: "border-box" as const }}>

        <ProgressBar step={step} />

        {/* ── STEP 0: Personal ── */}
        {step === 0 && (
          <div>
            <SectionTitle title="Personal Details" subtitle="Provide your personal information as it appears on official documents." />

            {/* Photo upload */}
            <div style={{ marginBottom: 22, display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: photoFile ? T.primaryLight : T.muted, border: `2px solid ${photoFile ? T.primaryBorder : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                  {photoFile
                    ? <span style={{ fontSize: 22, fontWeight: 700, color: T.primary }}>{fullName ? fullName.charAt(0).toUpperCase() : "?"}</span>
                    : <Icon d={ic.user} size={26} stroke={T.grayLight} />
                  }
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>Profile Photo</div>
                <button
                  onClick={() => photoRef.current?.click()}
                  style={{ padding: "7px 14px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Icon d={ic.image} size={13} stroke={T.gray} />
                  {photoFile ? "Change Photo" : "Upload Photo"}
                </button>
                <div style={{ fontSize: 11, color: T.grayLight, marginTop: 5 }}>JPG, PNG · Max 5 MB · Optional</div>
                <input ref={photoRef} type="file" accept=".jpg,.jpeg,.png" style={{ display: "none" }} onChange={() => setPhotoFile("uploaded")} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <FieldWrap label="Full Name" required error={errors.fullName}>
                  <Input placeholder="Dr. Firstname Lastname" value={fullName} onChange={setFullName} {...fProps("fullName")} />
                </FieldWrap>
              </div>

              <FieldWrap label="Mobile Number" required error={errors.mobile}>
                <Input placeholder="+91 98765 43210" value={mobile} onChange={setMobile} type="tel" {...fProps("mobile")} />
              </FieldWrap>

              <FieldWrap label="Email Address" required error={errors.email}>
                <Input placeholder="doctor@example.com" value={email} onChange={setEmail} type="email" {...fProps("email")} />
              </FieldWrap>

              <FieldWrap label="Date of Birth" error={errors.dob}>
                <Input placeholder="DD / MM / YYYY" value={dob} onChange={setDob} type="date" {...fProps("dob")} />
              </FieldWrap>

              <FieldWrap label="Gender" required error={errors.gender}>
                <Select value={gender} onChange={setGender} {...fProps("gender")}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </Select>
              </FieldWrap>
            </div>
          </div>
        )}

        {/* ── STEP 1: Professional ── */}
        {step === 1 && (
          <div>
            <SectionTitle title="Professional Details" subtitle="Your medical credentials and clinical background." />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <FieldWrap label="Medical Registration Number" required error={errors.regNumber}>
                  <Input placeholder="e.g. CCIM-2021-08432" value={regNumber} onChange={setRegNumber} {...fProps("regNumber")} />
                </FieldWrap>
              </div>

              <FieldWrap label="Registration Council" required error={errors.council}>
                <Select value={council} onChange={setCouncil} {...fProps("council")}>
                  <option value="">Select council</option>
                  {COUNCILS.map((c) => <option key={c}>{c}</option>)}
                </Select>
              </FieldWrap>

              <FieldWrap label="Year of Registration" error={errors.regYear}>
                <Input placeholder="e.g. 2019" value={regYear} onChange={setRegYear} {...fProps("regYear")} />
              </FieldWrap>
            </div>

            {/* System of medicine */}
            <FieldWrap label="Primary System of Medicine" required error={errors.medSystem}>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                {MEDICINE_SYSTEMS.map((s) => {
                  const sel = medSystem === s;
                  return (
                    <button
                      key={s}
                      onClick={() => { setMedSystem(s); setSpec(""); }}
                      style={{
                        padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                        background: sel ? T.primary : T.white,
                        color:      sel ? "#fff"    : T.gray,
                        border: `1.5px solid ${sel ? T.primary : T.border}`,
                        cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", transition: "all 0.12s",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </FieldWrap>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FieldWrap label="Specialization" required error={errors.spec}>
                <Select value={specialization} onChange={setSpec} {...fProps("spec")}>
                  <option value="">{medSystem ? "Select specialization" : "Select system first"}</option>
                  {specOptions.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </FieldWrap>

              <FieldWrap label="Years of Experience">
                <Select value={experience} onChange={setExperience} {...fProps("exp")}>
                  <option value="">Select range</option>
                  <option>Less than 1 year</option>
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5–10 years</option>
                  <option>10–20 years</option>
                  <option>20+ years</option>
                </Select>
              </FieldWrap>
            </div>

            {/* Languages */}
            <FieldWrap label="Languages Spoken">
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" as const, marginBottom: 10 }}>
                {[
                  { label: "Hindi",   val: langHindi,   set: setLangHindi   },
                  { label: "English", val: langEnglish, set: setLangEnglish },
                ].map((l) => (
                  <label key={l.label} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={l.val}
                      onChange={(e) => l.set(e.target.checked)}
                      style={{ accentColor: T.primary, width: 15, height: 15 }}
                    />
                    <span style={{ fontSize: 13, color: T.navy }}>{l.label}</span>
                  </label>
                ))}
              </div>
              <Input placeholder="Other languages (comma separated)" value={langOther} onChange={setLangOther} {...fProps("langOther")} />
            </FieldWrap>
          </div>
        )}

        {/* ── STEP 2: Documents ── */}
        {step === 2 && (
          <div>
            <SectionTitle title="Professional Documents" subtitle="Upload clear, legible copies. All documents are stored securely and reviewed only for verification." />

            <UploadBox
              label="Medical Registration Certificate" required
              file={docReg}
              onUpload={() => setDocReg(fakeDoc("Medical_Registration_Certificate.pdf"))}
              onRemove={() => setDocReg(null)}
            />
            {errors.docReg && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12, marginTop: -4 }}>
                <Icon d={ic.alertTri} size={11} stroke={T.danger} />
                <span style={{ fontSize: 11, color: T.danger }}>{errors.docReg}</span>
              </div>
            )}

            <UploadBox
              label="Degree / Qualification Certificate" required
              file={docDegree}
              onUpload={() => setDocDegree(fakeDoc("Degree_Certificate.pdf"))}
              onRemove={() => setDocDegree(null)}
            />
            {errors.docDegree && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12, marginTop: -4 }}>
                <Icon d={ic.alertTri} size={11} stroke={T.danger} />
                <span style={{ fontSize: 11, color: T.danger }}>{errors.docDegree}</span>
              </div>
            )}

            <UploadBox
              label="Additional Certificate"
              file={docExtra}
              onUpload={() => setDocExtra(fakeDoc("Additional_Certificate.pdf"))}
              onRemove={() => setDocExtra(null)}
            />

            {/* Format note */}
            <div style={{ padding: "10px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start", marginTop: 8, marginBottom: 22 }}>
              <Icon d={ic.info} size={12} stroke={T.grayLight} />
              <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
                Accepted formats: PDF, JPG, PNG. Maximum file size 10 MB per document. Documents must be legible and unmodified.
              </p>
            </div>

            {/* Declaration */}
            <div style={{ padding: "16px 18px", background: T.muted, border: `1px solid ${errors.decl ? T.dangerBorder : T.border}`, borderRadius: 9 }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                  style={{ accentColor: T.primary, width: 15, height: 15, marginTop: 2, flexShrink: 0 }}
                />
                <span style={{ fontSize: 13, color: T.navy, lineHeight: 1.6 }}>
                  I confirm that the professional information and documents provided by me are accurate, genuine and up-to-date. I understand that providing false information may result in permanent suspension from the MediKiosk platform.
                </span>
              </label>
              {errors.decl && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
                  <Icon d={ic.alertTri} size={11} stroke={T.danger} />
                  <span style={{ fontSize: 11, color: T.danger }}>{errors.decl}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 3: Hospital Affiliation ── */}
        {step === 3 && (
          <div>
            <SectionTitle title="Hospital Affiliation" subtitle="Select a verified hospital on the MediKiosk network. Hospital approval is required before your profile is activated." />

            {/* Hospital search */}
            <FieldWrap label="Search Hospital" required error={errors.hospital}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <Icon d={ic.search} size={14} stroke={T.grayLight} />
                </span>
                <input
                  type="text"
                  placeholder="Search verified hospitals..."
                  value={hospitalSearch}
                  onChange={(e) => setHSearch(e.target.value)}
                  onFocus={() => setHFocus(true)}
                  onBlur={() => setTimeout(() => setHFocus(false), 150)}
                  style={{
                    width: "100%", padding: "9px 12px 9px 32px", fontSize: 13, color: T.navy,
                    border: `1px solid ${hFocus ? T.primary : T.border}`, borderRadius: 8,
                    background: T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif",
                    boxSizing: "border-box" as const,
                  }}
                />
                {/* Dropdown */}
                {hFocus && filteredHospitals.length > 0 && (
                  <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 30, background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, boxShadow: "0 8px 24px rgba(0,0,0,0.10)", marginTop: 4, overflow: "hidden" }}>
                    {filteredHospitals.map((h) => (
                      <button
                        key={h.id}
                        onMouseDown={() => { setSelHosp(h); setHSearch(h.name); }}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", textAlign: "left" as const }}
                      >
                        <div style={{ width: 30, height: 30, borderRadius: 7, background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon d={ic.building} size={14} stroke={T.gray} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{h.name}</div>
                          <div style={{ fontSize: 11, color: T.gray }}>{h.system} · {h.location}</div>
                        </div>
                        {h.verified && (
                          <span style={{ fontSize: 10, fontWeight: 700, color: T.success, background: T.successLight, border: `1px solid ${T.successBorder}`, padding: "1px 8px", borderRadius: 20 }}>
                            ✓ Verified
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FieldWrap>

            {/* Selected hospital */}
            {selectedHosp && (
              <div style={{ padding: "14px 16px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 10, display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: T.white, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon d={ic.building} size={18} stroke={T.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{selectedHosp.name}</div>
                  <div style={{ fontSize: 11, color: T.primary, marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon d={ic.mapPin} size={11} stroke={T.primary} />
                    {selectedHosp.location}
                  </div>
                </div>
                {selectedHosp.verified && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.success, background: T.successLight, border: `1px solid ${T.successBorder}`, padding: "2px 10px", borderRadius: 20 }}>
                    ✓ Verified
                  </span>
                )}
                <button onClick={() => { setSelHosp(null); setHSearch(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <Icon d={ic.x} size={14} stroke={T.grayLight} />
                </button>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FieldWrap label="Department" required error={errors.department}>
                <Select value={department} onChange={setDept} {...fProps("dept")}>
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                </Select>
              </FieldWrap>

              <FieldWrap label="Designation" required error={errors.designation}>
                <Select value={designation} onChange={setDesig} {...fProps("desig")}>
                  <option value="">Select designation</option>
                  {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
                </Select>
              </FieldWrap>
            </div>

            {/* Hospital approval notice */}
            <div style={{ padding: "12px 16px", background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderRadius: 9, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon d={ic.alertTri} size={14} stroke={T.amber} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 3 }}>Hospital Approval Required</div>
                <p style={{ margin: 0, fontSize: 11, color: T.amber, lineHeight: 1.55 }}>
                  After submission, the selected hospital must review and approve your affiliation before your account is activated. You will be notified by email once a decision is made.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Error summary ── */}
        {Object.keys(errors).length > 0 && (
          <div style={{ marginTop: 18, padding: "12px 16px", background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, borderRadius: 9 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
              <Icon d={ic.alertTri} size={14} stroke={T.danger} />
              <span style={{ fontSize: 12, fontWeight: 700, color: T.danger }}>Please fix the following before continuing</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {Object.values(errors).slice(0, 5).map((e, i) => (
                <li key={i} style={{ fontSize: 12, color: T.danger, marginBottom: 3 }}>{e}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Sticky footer ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.white, borderTop: `1px solid ${T.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 20 }}>
        <div>
          {step > 0 && (
            <button
              onClick={() => { setStep((s) => s - 1); setErrors({}); }}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}
            >
              <Icon d={ic.chevLeft} size={14} stroke={T.navy} />
              Back
            </button>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={handleDraft}
            style={{ padding: "9px 16px", background: saveDraft ? T.successLight : T.muted, border: `1px solid ${saveDraft ? T.successBorder : T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: saveDraft ? T.success : T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 6 }}
          >
            <Icon d={saveDraft ? ic.check : ic.save} size={13} stroke={saveDraft ? T.success : T.gray} />
            {saveDraft ? "Saved" : "Save Draft"}
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 22px", background: T.primary, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Continue
              <Icon d={ic.chevRight} size={14} stroke="#fff" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 22px", background: T.primary, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Submit for Verification
              <Icon d={ic.arrowRight} size={14} stroke="#fff" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

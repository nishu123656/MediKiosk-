import { useState } from "react";

const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }: {
  d: string; size?: number; stroke?: string; fill?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const T = {
  primary: "#0d7a6e", primaryLight: "#f0fdf9", primaryBorder: "#b2e8e0",
  navy: "#0f1f3d", gray: "#64748b", grayLight: "#94a3b8",
  bg: "#f5f7fa", white: "#ffffff", border: "#e8ecf0", muted: "#f8fafc",
  danger: "#e84b4b", dangerLight: "#fff5f5", dangerBorder: "#fecaca",
  success: "#16a34a", successLight: "#f0fdf4", successBorder: "#bbf7d0",
  amber: "#d97706", amberLight: "#fffbeb", amberBorder: "#fde68a",
  blue: "#1d4ed8", blueLight: "#eff6ff", blueBorder: "#bfdbfe",
  purple: "#7c3aed", purpleLight: "#f5f3ff", purpleBorder: "#ddd6fe",
};

const ic = {
  heart:       "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  dashboard:   "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  queue:       "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  appts:       "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  consults:    "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  patients:    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z",
  rx:          "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  lab:         "M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a5 5 0 11-4 0",
  teleconsult: "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  records:     "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  avail:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  bell:        "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  settings:    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  logout:      "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  chevDown:    "M19 9l-7 7-7-7",
  check:       "M20 6L9 17l-5-5",
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  video:       "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  award:       "M12 15l-4.5 2.5 1-4.5L5 10l4.5-.5L12 5l2.5 4.5 4.5.5-3.5 3 1 4.5z",
  building:    "M3 21h18M3 7v1a3 3 0 006 0V7m6 0v1a3 3 0 006 0V7M3 7l9-4 9 4M4 21V7m16 14V7",
  globe:       "M12 22a10 10 0 100-20 10 10 0 000 20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  star:        "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  plus:        "M12 5v14M5 12h14",
  save:        "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  x:           "M18 6L6 18M6 6l12 12",
  toggle:      "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  camera:      "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
};

const NAV = [
  { id: "dashboard",   label: "Dashboard",       icon: ic.dashboard   },
  { id: "queue",       label: "Patient Queue",    icon: ic.queue,      badge: 5, badgeColor: T.amber  },
  { id: "appts",       label: "Appointments",     icon: ic.appts,      badge: 8, badgeColor: T.blue   },
  { id: "consults",    label: "Consultations",    icon: ic.consults    },
  { id: "patients",    label: "Patients",         icon: ic.patients    },
  { id: "rx",          label: "Prescriptions",    icon: ic.rx          },
  { id: "lab",         label: "Lab Tests",        icon: ic.lab         },
  { id: "teleconsult", label: "Teleconsultation", icon: ic.teleconsult },
  { id: "records",     label: "Medical Records",  icon: ic.records     },
  { id: "avail",       label: "Availability",     icon: ic.avail       },
  { id: "notif",       label: "Notifications",    icon: ic.bell,       badge: 3, badgeColor: T.danger },
  { id: "settings",    label: "Settings",         icon: ic.settings    },
];

type SchedStatus = "scheduled" | "waiting" | "in-consultation" | "completed" | "cancelled";
const SCHED_STATUS: Record<SchedStatus, { label: string; color: string; bg: string; border: string }> = {
  "scheduled":       { label: "Scheduled",      color: T.blue,    bg: T.blueLight,    border: T.blueBorder    },
  "waiting":         { label: "Waiting",         color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  "in-consultation": { label: "In Consultation", color: T.primary, bg: T.primaryLight, border: T.primaryBorder },
  "completed":       { label: "Completed",       color: T.success, bg: T.successLight, border: T.successBorder },
  "cancelled":       { label: "Cancelled",       color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
};

const SCHEDULE_TODAY = [
  { time: "09:00 AM", patient: "Rahul Sharma",   pid: "MK-2947", type: "In-person", token: "T-01", status: "completed"       as SchedStatus },
  { time: "09:30 AM", patient: "Anita Desai",    pid: "MK-1832", type: "In-person", token: "T-02", status: "completed"       as SchedStatus },
  { time: "10:00 AM", patient: "Mohammed Rafi",  pid: "MK-3104", type: "Video",     token: "T-03", status: "in-consultation" as SchedStatus },
  { time: "10:30 AM", patient: "Geeta Pillai",   pid: "MK-0912", type: "In-person", token: "T-04", status: "waiting"         as SchedStatus },
  { time: "11:00 AM", patient: "Vikram Singh",   pid: "MK-2204", type: "In-person", token: "T-05", status: "scheduled"       as SchedStatus },
  { time: "11:30 AM", patient: "Sunita Agarwal", pid: "MK-2011", type: "Audio",     token: "T-06", status: "scheduled"       as SchedStatus },
  { time: "02:00 PM", patient: "Arjun Mehta",    pid: "MK-1498", type: "Video",     token: "T-07", status: "scheduled"       as SchedStatus },
  { time: "02:30 PM", patient: "Dev Narayan",    pid: "MK-4021", type: "In-person", token: "T-08", status: "scheduled"       as SchedStatus },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const INITIAL_SCHEDULE: Record<string, { enabled: boolean; start: string; end: string; maxPts: number; duration: number }> = {
  Mon: { enabled: true,  start: "09:00", end: "13:00", maxPts: 8,  duration: 20 },
  Tue: { enabled: true,  start: "09:00", end: "13:00", maxPts: 8,  duration: 20 },
  Wed: { enabled: true,  start: "14:00", end: "18:00", maxPts: 8,  duration: 20 },
  Thu: { enabled: true,  start: "09:00", end: "13:00", maxPts: 8,  duration: 20 },
  Fri: { enabled: true,  start: "09:00", end: "17:00", maxPts: 12, duration: 15 },
  Sat: { enabled: true,  start: "10:00", end: "13:00", maxPts: 6,  duration: 20 },
  Sun: { enabled: false, start: "09:00", end: "12:00", maxPts: 4,  duration: 30 },
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function Pill({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, background: bg, border: `1px solid ${border}`, padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div style={{ padding: "13px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</div>
        {sub && <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function FieldRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0, padding: "11px 0", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ width: 200, flexShrink: 0, fontSize: 11, color: T.grayLight, fontWeight: 600, paddingTop: 1 }}>{label}</div>
      <div style={{ flex: 1, fontSize: 13, color: T.navy, fontWeight: 500, fontFamily: mono ? "monospace" : undefined }}>{value}</div>
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
      <span style={{ fontSize: 13, color: T.navy }}>{label}</span>
      <button
        onClick={() => onChange(!on)}
        style={{ width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer", background: on ? T.primary : T.border, position: "relative" as const, transition: "background 0.2s", flexShrink: 0 }}
      >
        <span style={{ position: "absolute" as const, top: 3, left: on ? 20 : 3, width: 16, height: 16, borderRadius: "50%", background: T.white, transition: "left 0.2s", display: "block" }} />
      </button>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.grayLight, marginBottom: 5, letterSpacing: "0.03em" }}>{label.toUpperCase()}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: "100%", padding: "8px 11px", fontSize: 13, color: T.navy, border: `1px solid ${focused ? T.primary : T.border}`, borderRadius: 8, background: T.white, outline: "none", fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const, transition: "border-color 0.15s" }}
      />
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.grayLight, marginBottom: 5, letterSpacing: "0.03em" }}>{label.toUpperCase()}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: "100%", padding: "8px 11px", fontSize: 13, color: T.navy, border: `1px solid ${focused ? T.primary : T.border}`, borderRadius: 8, background: T.white, outline: "none", fontFamily: "Inter, system-ui, sans-serif", appearance: "none" as const, cursor: "pointer" }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Avatar({ initials, size = 80 }: { initials: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: T.primary + "18", border: `2px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 700, color: T.primary, flexShrink: 0, letterSpacing: "-0.02em" }}>
      {initials}
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function DoctorProfile({ onBack }: { onBack: () => void }) {
  const [activeNav,     setActiveNav]     = useState("avail");
  const [saved,         setSaved]         = useState(false);
  const [editMode,      setEditMode]      = useState(false);
  const [schedule,      setSchedule]      = useState(INITIAL_SCHEDULE);
  const [consultModes,  setConsultModes]  = useState({ inperson: true, video: true, audio: false });
  const [settings,      setSettings]      = useState({
    emergency: true, followupNotif: true, appointmentNotif: true, reportNotif: true,
  });

  // Editable professional fields
  const [profFields, setProfFields] = useState({
    name:         "Dr. Priya Mehta",
    spec:         "Endocrinology & Metabolism",
    qual:         "MBBS, MD (Medicine), DM (Endocrinology)",
    reg:          "MCI-2018-38412",
    experience:   "12 years",
    hospital:     "Apollo Hospitals, Mumbai",
    dept:         "Endocrinology & Diabetology",
    designation:  "Senior Consultant",
    languages:    "English, Hindi, Marathi",
    followupDays: "14",
    bufferMins:   "10",
    consultFee:   "₹800",
  });

  function handleSave() {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 2500);
  }

  function setDay(day: string, key: string, val: string | boolean | number) {
    setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], [key]: val } }));
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, overflow: "hidden" }}>

      {/* ═══ SIDEBAR ═══ */}
      <aside style={{ width: 210, minWidth: 210, background: T.navy, display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0 }}>
        <div style={{ padding: "16px 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={13} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>MediKiosk</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", fontWeight: 600, letterSpacing: "0.07em" }}>DOCTOR PORTAL</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "8px 7px", overflowY: "auto" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", padding: "6px 8px 3px" }}>DOCTOR WORKSPACE</div>
          {NAV.map((item) => {
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7, border: "none", cursor: "pointer", background: active ? "rgba(13,122,110,0.22)" : "transparent", color: active ? "#5dd6c8" : "rgba(255,255,255,0.52)", fontSize: 12, fontWeight: active ? 600 : 400, textAlign: "left" as const, transition: "all 0.12s", marginBottom: 1, fontFamily: "Inter, system-ui, sans-serif" }}>
                <span style={{ opacity: active ? 1 : 0.7, flexShrink: 0 }}>
                  <Icon d={item.icon} size={14} stroke="currentColor" />
                </span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge !== undefined && (
                  <span style={{ background: item.badgeColor || T.danger, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 9, padding: "1px 5px" }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "6px 7px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={onBack} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,100,100,0.6)", fontSize: 12, textAlign: "left" as const, fontFamily: "Inter, system-ui, sans-serif" }}>
            <Icon d={ic.logout} size={14} stroke="currentColor" />Logout
          </button>
        </div>
        <div style={{ padding: "8px 10px 14px" }}>
          <div style={{ padding: "9px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 9, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>PM</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Dr. Priya Mehta</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>Endocrinologist</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.success }} />
                <span style={{ fontSize: 9, color: T.success, fontWeight: 600 }}>On Duty</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Header */}
        <header style={{ height: 56, background: T.white, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 14, flexShrink: 0, position: "sticky" as const, top: 0, zIndex: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Doctor Profile</div>
            <div style={{ fontSize: 10, color: T.grayLight }}>Manage your professional profile and consultation availability.</div>
          </div>

          {/* Save / Cancel strip — shown when editing */}
          {editMode && (
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setEditMode(false)} style={{ padding: "6px 14px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                <Icon d={ic.x} size={12} stroke={T.gray} />Cancel
              </button>
              <button onClick={handleSave} style={{ padding: "6px 14px", background: T.primary, border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                <Icon d={ic.save} size={12} stroke="#fff" />Save Changes
              </button>
            </div>
          )}

          {saved && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20 }}>
              <Icon d={ic.check} size={12} stroke={T.success} />
              <span style={{ fontSize: 11, fontWeight: 700, color: T.success }}>Saved successfully</span>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 11px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20 }}>
            <Icon d={ic.shieldCheck} size={12} stroke={T.success} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.success }}>Verified Doctor</span>
          </div>

          <div style={{ position: "relative" as const, cursor: "pointer" }}>
            <Icon d={ic.bell} size={17} stroke={T.gray} />
            <span style={{ position: "absolute" as const, top: -3, right: -4, width: 13, height: 13, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
          </div>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>PM</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>Dr. Priya Mehta</div>
              <div style={{ fontSize: 9, color: T.grayLight }}>Endocrinologist</div>
            </div>
            <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />
          </div>
        </header>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 56px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 296px", gap: 18 }}>

            {/* ── LEFT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* ── Doctor Profile Card ── */}
              <Card>
                <CardHeader
                  title="Doctor Profile"
                  sub="MCI-registered, Apollo Hospitals · Mumbai"
                  right={
                    <button onClick={() => setEditMode(!editMode)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 13px", background: editMode ? T.navy : T.muted, border: `1px solid ${editMode ? T.navy : T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: editMode ? "#fff" : T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                      <Icon d={ic.edit} size={12} stroke={editMode ? "#fff" : T.navy} />
                      {editMode ? "Editing…" : "Edit Profile"}
                    </button>
                  }
                />
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

                    {/* Photo placeholder */}
                    <div style={{ position: "relative" as const, flexShrink: 0 }}>
                      <Avatar initials="PM" size={88} />
                      {editMode && (
                        <button style={{ position: "absolute" as const, bottom: 0, right: 0, width: 24, height: 24, borderRadius: "50%", background: T.primary, border: `2px solid ${T.white}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon d={ic.camera} size={11} stroke="#fff" />
                        </button>
                      )}
                    </div>

                    {/* Identity */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const }}>
                        <div>
                          {editMode
                            ? <input value={profFields.name} onChange={(e) => setProfFields((p) => ({ ...p, name: e.target.value }))} style={{ fontSize: 20, fontWeight: 700, color: T.navy, border: `1px solid ${T.primary}`, borderRadius: 6, padding: "2px 8px", outline: "none", fontFamily: "Inter, system-ui, sans-serif", width: 260 }} />
                            : <div style={{ fontSize: 20, fontWeight: 700, color: T.navy }}>{profFields.name}</div>
                          }
                          <div style={{ fontSize: 13, color: T.gray, marginTop: 3 }}>{profFields.spec}</div>
                          <div style={{ fontSize: 12, color: T.grayLight, marginTop: 2 }}>{profFields.qual}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 6 }}>
                          <Pill label="Verified Doctor" color={T.success} bg={T.successLight} border={T.successBorder} />
                          <Pill label="MCI Registered" color={T.blue} bg={T.blueLight} border={T.blueBorder} />
                          <Pill label="On Duty" color={T.primary} bg={T.primaryLight} border={T.primaryBorder} />
                        </div>
                      </div>

                      {/* Key stats strip */}
                      <div style={{ display: "flex", gap: 0, marginTop: 16, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                        {[
                          { label: "Experience",     value: profFields.experience, icon: ic.award    },
                          { label: "Hospital",       value: "Apollo Hospitals",    icon: ic.building },
                          { label: "Department",     value: profFields.dept,       icon: ic.stethoscope },
                          { label: "Languages",      value: profFields.languages,  icon: ic.globe    },
                          { label: "Consult Fee",    value: profFields.consultFee, icon: ic.star     },
                        ].map((s, i, arr) => (
                          <div key={s.label} style={{ flex: 1, paddingRight: i < arr.length - 1 ? 16 : 0, marginRight: i < arr.length - 1 ? 16 : 0, borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                              <Icon d={s.icon} size={12} stroke={T.grayLight} />
                              <span style={{ fontSize: 10, color: T.grayLight, fontWeight: 600 }}>{s.label}</span>
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, lineHeight: 1.3 }}>{s.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* ── Consultation Modes ── */}
              <Card>
                <CardHeader title="Consultation Modes" sub="Enable the modes you offer to patients" />
                <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { key: "inperson" as const, label: "In-Person",          icon: ic.stethoscope, color: T.primary, sub: "OPD consultation at hospital"      },
                    { key: "video"    as const, label: "Video Consultation",  icon: ic.video,       color: T.blue,    sub: "MediKiosk secure video call"        },
                    { key: "audio"    as const, label: "Audio Consultation",  icon: ic.phone,       color: T.purple,  sub: "Phone consultation for follow-ups"  },
                  ].map((m) => {
                    const on = consultModes[m.key];
                    return (
                      <div key={m.key} onClick={() => setConsultModes((p) => ({ ...p, [m.key]: !p[m.key] }))}
                        style={{ padding: "14px 16px", border: `1.5px solid ${on ? m.color + "50" : T.border}`, borderRadius: 10, cursor: "pointer", background: on ? m.color + "07" : T.muted, transition: "all 0.15s", position: "relative" as const }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: on ? m.color + "14" : T.border + "40", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon d={m.icon} size={15} stroke={on ? m.color : T.grayLight} />
                          </div>
                          <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${on ? m.color : T.border}`, background: on ? m.color : T.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {on && <Icon d={ic.check} size={9} stroke="#fff" />}
                          </div>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: on ? T.navy : T.gray }}>{m.label}</div>
                        <div style={{ fontSize: 10, color: T.grayLight, marginTop: 3, lineHeight: 1.4 }}>{m.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* ── Availability Schedule ── */}
              <Card>
                <CardHeader
                  title="Availability Schedule"
                  sub="Weekly consultation hours — click a day to toggle"
                  right={
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 11, color: T.grayLight }}>Duration · Max patients per session</span>
                    </div>
                  }
                />
                <div style={{ overflowX: "auto" as const }}>
                  {/* Column headers */}
                  <div style={{ display: "grid", gridTemplateColumns: "80px 90px 1fr 1fr 90px 90px", background: T.muted, borderBottom: `1px solid ${T.border}` }}>
                    {["Day", "Active", "Start Time", "End Time", "Duration", "Max Pts"].map((h) => (
                      <div key={h} style={{ padding: "7px 14px", fontSize: 9, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em" }}>{h.toUpperCase()}</div>
                    ))}
                  </div>
                  {DAYS.map((day, i) => {
                    const row = schedule[day];
                    return (
                      <div key={day} style={{ display: "grid", gridTemplateColumns: "80px 90px 1fr 1fr 90px 90px", alignItems: "center", borderBottom: i < DAYS.length - 1 ? `1px solid ${T.border}` : "none", background: !row.enabled ? T.muted + "80" : T.white }}>
                        <div style={{ padding: "10px 14px", fontSize: 12, fontWeight: 700, color: row.enabled ? T.navy : T.grayLight }}>{day}</div>
                        <div style={{ padding: "10px 14px" }}>
                          <button
                            onClick={() => setDay(day, "enabled", !row.enabled)}
                            style={{ width: 38, height: 21, borderRadius: 11, border: "none", cursor: "pointer", background: row.enabled ? T.primary : T.border, position: "relative" as const, transition: "background 0.2s" }}
                          >
                            <span style={{ position: "absolute" as const, top: 2.5, left: row.enabled ? 18 : 2.5, width: 16, height: 16, borderRadius: "50%", background: T.white, transition: "left 0.2s", display: "block" }} />
                          </button>
                        </div>
                        <div style={{ padding: "8px 14px" }}>
                          <input type="time" value={row.start} disabled={!row.enabled}
                            onChange={(e) => setDay(day, "start", e.target.value)}
                            style={{ padding: "5px 8px", fontSize: 12, color: row.enabled ? T.navy : T.grayLight, border: `1px solid ${T.border}`, borderRadius: 7, background: row.enabled ? T.white : T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif", cursor: row.enabled ? "auto" : "not-allowed" }} />
                        </div>
                        <div style={{ padding: "8px 14px" }}>
                          <input type="time" value={row.end} disabled={!row.enabled}
                            onChange={(e) => setDay(day, "end", e.target.value)}
                            style={{ padding: "5px 8px", fontSize: 12, color: row.enabled ? T.navy : T.grayLight, border: `1px solid ${T.border}`, borderRadius: 7, background: row.enabled ? T.white : T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif", cursor: row.enabled ? "auto" : "not-allowed" }} />
                        </div>
                        <div style={{ padding: "8px 14px" }}>
                          <select value={row.duration} disabled={!row.enabled}
                            onChange={(e) => setDay(day, "duration", Number(e.target.value))}
                            style={{ padding: "5px 8px", fontSize: 12, color: row.enabled ? T.navy : T.grayLight, border: `1px solid ${T.border}`, borderRadius: 7, background: row.enabled ? T.white : T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif", cursor: row.enabled ? "pointer" : "not-allowed" }}>
                            {[10, 15, 20, 30, 45, 60].map((v) => <option key={v} value={v}>{v} min</option>)}
                          </select>
                        </div>
                        <div style={{ padding: "8px 14px" }}>
                          <select value={row.maxPts} disabled={!row.enabled}
                            onChange={(e) => setDay(day, "maxPts", Number(e.target.value))}
                            style={{ padding: "5px 8px", fontSize: 12, color: row.enabled ? T.navy : T.grayLight, border: `1px solid ${T.border}`, borderRadius: 7, background: row.enabled ? T.white : T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif", cursor: row.enabled ? "pointer" : "not-allowed" }}>
                            {[4, 6, 8, 10, 12, 16, 20].map((v) => <option key={v} value={v}>{v}</option>)}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* ── Today's Schedule ── */}
              <Card>
                <CardHeader title="Today's Schedule" sub={`${SCHEDULE_TODAY.length} appointments · Sep 10, 2026`} right={
                  <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
                    <span style={{ color: T.gray }}>Completed: <strong style={{ color: T.success }}>2</strong></span>
                    <span style={{ color: T.gray }}>Remaining: <strong style={{ color: T.navy }}>6</strong></span>
                  </div>
                } />
                {/* Column heads */}
                <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 120px 80px 110px 50px", background: T.muted, borderBottom: `1px solid ${T.border}` }}>
                  {["Time", "Patient", "Type", "Token", "Status", ""].map((h) => (
                    <div key={h} style={{ padding: "7px 12px", fontSize: 9, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em" }}>{h.toUpperCase()}</div>
                  ))}
                </div>
                {SCHEDULE_TODAY.map((s, i) => {
                  const sc = SCHED_STATUS[s.status];
                  const isCurrent = s.status === "in-consultation";
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr 120px 80px 110px 50px", alignItems: "center", borderBottom: i < SCHEDULE_TODAY.length - 1 ? `1px solid ${T.border}` : "none", background: isCurrent ? T.primaryLight + "70" : s.status === "completed" ? T.muted + "60" : T.white }}>
                      <div style={{ padding: "10px 12px", fontSize: 12, fontWeight: 700, color: isCurrent ? T.primary : T.navy }}>{s.time}</div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: s.status === "completed" ? T.gray : T.navy }}>{s.patient}</div>
                        <div style={{ fontSize: 10, color: T.grayLight }}>{s.pid}</div>
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: s.type === "Video" ? T.blue : s.type === "Audio" ? T.purple : T.gray, background: s.type === "Video" ? T.blueLight : s.type === "Audio" ? T.purpleLight : T.muted, border: `1px solid ${s.type === "Video" ? T.blueBorder : s.type === "Audio" ? T.purpleBorder : T.border}`, padding: "1px 8px", borderRadius: 20 }}>
                          {s.type}
                        </span>
                      </div>
                      <div style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: T.primary, fontFamily: "monospace" }}>{s.token}</div>
                      <div style={{ padding: "10px 12px" }}><Pill label={sc.label} color={sc.color} bg={sc.bg} border={sc.border} /></div>
                      <div style={{ padding: "10px 6px" }}>
                        {isCurrent && (
                          <button style={{ padding: "4px 8px", background: T.primary, border: "none", borderRadius: 6, fontSize: 9, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                            Open
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </Card>

              {/* ── Professional Information ── */}
              <Card>
                <CardHeader
                  title="Professional Information"
                  sub="Displayed on your MediKiosk public profile"
                  right={
                    !editMode && (
                      <button onClick={() => setEditMode(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 11, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                        <Icon d={ic.edit} size={11} stroke={T.gray} />Edit
                      </button>
                    )
                  }
                />
                <div style={{ padding: "6px 20px 4px" }}>
                  {editMode ? (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "14px 0" }}>
                      <Input label="Specialization" value={profFields.spec} onChange={(v) => setProfFields((p) => ({ ...p, spec: v }))} />
                      <Input label="Qualifications" value={profFields.qual} onChange={(v) => setProfFields((p) => ({ ...p, qual: v }))} />
                      <Input label="Registration Number" value={profFields.reg} onChange={(v) => setProfFields((p) => ({ ...p, reg: v }))} />
                      <Input label="Years of Experience" value={profFields.experience} onChange={(v) => setProfFields((p) => ({ ...p, experience: v }))} />
                      <Input label="Hospital Affiliation" value={profFields.hospital} onChange={(v) => setProfFields((p) => ({ ...p, hospital: v }))} />
                      <Input label="Department" value={profFields.dept} onChange={(v) => setProfFields((p) => ({ ...p, dept: v }))} />
                      <Input label="Designation" value={profFields.designation} onChange={(v) => setProfFields((p) => ({ ...p, designation: v }))} />
                      <Input label="Consultation Languages" value={profFields.languages} onChange={(v) => setProfFields((p) => ({ ...p, languages: v }))} />
                      <Input label="Consultation Fee" value={profFields.consultFee} onChange={(v) => setProfFields((p) => ({ ...p, consultFee: v }))} />
                    </div>
                  ) : (
                    <>
                      <FieldRow label="Specialization"           value={profFields.spec}        />
                      <FieldRow label="Qualifications"           value={profFields.qual}        />
                      <FieldRow label="Registration Number"      value={profFields.reg}   mono  />
                      <FieldRow label="Experience"               value={profFields.experience}  />
                      <FieldRow label="Hospital Affiliation"     value={profFields.hospital}    />
                      <FieldRow label="Department"               value={profFields.dept}        />
                      <FieldRow label="Designation"              value={profFields.designation} />
                      <FieldRow label="Consultation Languages"   value={profFields.languages}   />
                      <FieldRow label="Consultation Fee"         value={profFields.consultFee}  />
                      <div style={{ padding: "11px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Icon d={ic.shieldCheck} size={13} stroke={T.success} />
                          <span style={{ fontSize: 11, color: T.success, fontWeight: 600 }}>MCI registration verified by MediKiosk Admin</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>

            </div>

            {/* ── RIGHT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Quick Actions */}
              <Card>
                <CardHeader title="Quick Actions" />
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
                  {[
                    { label: "Edit Profile",        icon: ic.edit,     color: T.navy    },
                    { label: "Manage Availability", icon: ic.avail,    color: T.primary },
                    { label: "View Appointments",   icon: ic.appts,    color: T.blue    },
                    { label: "Start Consultation",  icon: ic.consults, color: T.success  },
                  ].map((a) => (
                    <button key={a.label} onClick={a.label === "Edit Profile" ? () => setEditMode(true) : undefined}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, fontWeight: 600, color: T.navy, textAlign: "left" as const }}>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: a.color + "12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon d={a.icon} size={13} stroke={a.color} />
                      </div>
                      {a.label}
                      <span style={{ marginLeft: "auto" }}><Icon d={ic.arrowRight} size={12} stroke={T.grayLight} /></span>
                    </button>
                  ))}
                </div>
                {/* Save / Cancel footer when editing */}
                {editMode && (
                  <div style={{ padding: "10px 16px 14px", borderTop: `1px solid ${T.border}`, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                    <button onClick={handleSave} style={{ width: "100%", padding: "9px", background: T.primary, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Icon d={ic.save} size={14} stroke="#fff" />Save Changes
                    </button>
                    <button onClick={() => setEditMode(false)} style={{ width: "100%", padding: "9px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                      Cancel
                    </button>
                  </div>
                )}
              </Card>

              {/* Consultation Settings */}
              <Card>
                <CardHeader title="Consultation Settings" sub="Controls appointment and notification behaviour" />
                <div style={{ padding: "4px 20px 8px" }}>
                  {editMode ? (
                    <div style={{ padding: "12px 0", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                      <Input label="Follow-up period (days)" value={profFields.followupDays} onChange={(v) => setProfFields((p) => ({ ...p, followupDays: v }))} />
                      <Input label="Appointment buffer (mins)" value={profFields.bufferMins} onChange={(v) => setProfFields((p) => ({ ...p, bufferMins: v }))} />
                      <Select label="Default consultation duration" value="20 minutes" options={["10 minutes", "15 minutes", "20 minutes", "30 minutes", "45 minutes"]} onChange={() => {}} />
                    </div>
                  ) : (
                    <>
                      <FieldRow label="Follow-up period"        value={`${profFields.followupDays} days`} />
                      <FieldRow label="Appointment buffer"      value={`${profFields.bufferMins} minutes`} />
                      <FieldRow label="Default duration"        value="20 minutes" />
                    </>
                  )}
                  <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 4, marginTop: 4 }}>
                    <Toggle on={settings.emergency}       onChange={(v) => setSettings((s) => ({ ...s, emergency: v }))}       label="Emergency consultations" />
                    <Toggle on={settings.followupNotif}   onChange={(v) => setSettings((s) => ({ ...s, followupNotif: v }))}   label="Follow-up reminders"     />
                    <Toggle on={settings.appointmentNotif}onChange={(v) => setSettings((s) => ({ ...s, appointmentNotif: v }))}label="Appointment notifications" />
                    <Toggle on={settings.reportNotif}     onChange={(v) => setSettings((s) => ({ ...s, reportNotif: v }))}     label="Lab report alerts"        />
                  </div>
                </div>
              </Card>

              {/* MediKiosk Connections */}
              <Card>
                <CardHeader title="MediKiosk Services" sub="Connected healthcare ecosystem" />
                <div>
                  {[
                    { label: "ABHA / ABDM",         sub: "Health ID linked",          color: T.primary, connected: true  },
                    { label: "Apollo Hospitals",     sub: "Hospital affiliation",       color: T.blue,    connected: true  },
                    { label: "Thyrocare Diagnostics",sub: "Lab integration",           color: T.amber,   connected: true  },
                    { label: "Teleconsultation",     sub: "MediKiosk Connect",         color: T.purple,  connected: true  },
                    { label: "Pharmacy Network",     sub: "Prescription routing",      color: T.success, connected: false },
                  ].map((c, i, arr) => (
                    <div key={c.label} style={{ padding: "10px 18px", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: c.color + "12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon d={ic.toggle} size={12} stroke={c.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{c.label}</div>
                        <div style={{ fontSize: 10, color: T.grayLight }}>{c.sub}</div>
                      </div>
                      {c.connected
                        ? <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success }} />
                            <span style={{ fontSize: 10, fontWeight: 700, color: T.success }}>Connected</span>
                          </div>
                        : <button style={{ fontSize: 10, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 20, padding: "2px 9px", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>Connect</button>
                      }
                    </div>
                  ))}
                </div>
              </Card>

              {/* ABHA notice */}
              <div style={{ padding: "12px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 9 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Icon d={ic.shieldCheck} size={12} stroke={T.primary} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>ABHA / ABDM Compliant</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: T.primary, lineHeight: 1.6 }}>
                  Your profile, prescriptions and consultation records are linked to patients through their ABHA Health IDs with explicit consent. All data follows ABDM standards.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

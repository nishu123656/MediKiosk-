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
  patients:    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z",
  doctors:     "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M22 11l-1.5 1.5L18 10l-1.5 1.5",
  appts:       "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  consults:    "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  depts:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  rx:          "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  lab:         "M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a5 5 0 11-4 0",
  pharmacy:    "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  records:     "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  staff:       "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  reports:     "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  bell:        "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  settings:    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  logout:      "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  chevDown:    "M19 9l-7 7-7-7",
  chevRight:   "M9 18l6-6-6-6",
  check:       "M20 6L9 17l-5-5",
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  plus:        "M12 5v14M5 12h14",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  bed:         "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M2 22h20 M6 11h4 M14 11h4",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  link:        "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  wifi:        "M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01",
  building:    "M3 21h18M3 7v1a3 3 0 006 0V7m6 0v1a3 3 0 006 0V7M3 7l9-4 9 4M4 21V7m16 14V7",
};

const NAV = [
  { id: "dashboard",    label: "Dashboard",      icon: ic.dashboard,  },
  { id: "patients",     label: "Patients",        icon: ic.patients,   badge: 248, badgeColor: T.primary },
  { id: "doctors",      label: "Doctors",         icon: ic.doctors,    },
  { id: "appointments", label: "Appointments",    icon: ic.appts,      badge: 18, badgeColor: T.amber },
  { id: "consults",     label: "Consultations",   icon: ic.consults,   },
  { id: "departments",  label: "Departments",     icon: ic.depts,      },
  { id: "rx",           label: "Prescriptions",   icon: ic.rx,         },
  { id: "lab",          label: "Lab Tests",       icon: ic.lab,        badge: 12, badgeColor: T.blue },
  { id: "pharmacy",     label: "Pharmacy",        icon: ic.pharmacy,   },
  { id: "records",      label: "Health Records",  icon: ic.records,    },
  { id: "staff",        label: "Staff",           icon: ic.staff,      },
  { id: "reports",      label: "Reports",         icon: ic.reports,    },
  { id: "notif",        label: "Notifications",   icon: ic.bell,       badge: 5, badgeColor: T.danger },
  { id: "settings",     label: "Settings",        icon: ic.settings,   },
];

type ApptStatus = "scheduled" | "waiting" | "in-consultation" | "completed";
const APPT_STATUS: Record<ApptStatus, { label: string; color: string; bg: string; border: string }> = {
  "scheduled":        { label: "Scheduled",       color: T.blue,    bg: T.blueLight,    border: T.blueBorder    },
  "waiting":          { label: "Waiting",          color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  "in-consultation":  { label: "In Consultation",  color: T.primary, bg: T.primaryLight, border: T.primaryBorder },
  "completed":        { label: "Completed",        color: T.success, bg: T.successLight, border: T.successBorder },
};

const APPOINTMENTS = [
  { patient: "Rahul Sharma",   pid: "MK-2947", doctor: "Dr. Priya Mehta",    dept: "Endocrinology", time: "09:00 AM", type: "In-person",  status: "completed"        as ApptStatus },
  { patient: "Anita Desai",    pid: "MK-1832", doctor: "Dr. S. Krishnan",     dept: "Cardiology",    time: "09:30 AM", type: "In-person",  status: "completed"        as ApptStatus },
  { patient: "Mohammed Rafi",  pid: "MK-3104", doctor: "Dr. Kavita Nair",     dept: "Neurology",     time: "10:00 AM", type: "Video",       status: "in-consultation"  as ApptStatus },
  { patient: "Geeta Pillai",   pid: "MK-0912", doctor: "Dr. Amit Verma",      dept: "Orthopaedics",  time: "10:30 AM", type: "In-person",  status: "waiting"          as ApptStatus },
  { patient: "Vikram Singh",   pid: "MK-2204", doctor: "Dr. Priya Mehta",     dept: "Endocrinology", time: "11:00 AM", type: "In-person",  status: "waiting"          as ApptStatus },
  { patient: "Sunita Agarwal", pid: "MK-2011", doctor: "Dr. R. Patel",        dept: "Gynaecology",   time: "11:30 AM", type: "In-person",  status: "scheduled"        as ApptStatus },
  { patient: "Arjun Mehta",    pid: "MK-1498", doctor: "Dr. S. Krishnan",     dept: "Cardiology",    time: "12:00 PM", type: "Video",       status: "scheduled"        as ApptStatus },
];

type QPriority = "normal" | "urgent" | "emergency";
const QPRIO: Record<QPriority, { label: string; color: string; bg: string; border: string }> = {
  normal:    { label: "Normal",    color: T.gray,    bg: T.muted,        border: T.border        },
  urgent:    { label: "Urgent",    color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  emergency: { label: "Emergency", color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
};

const QUEUE = [
  { token: "T-001", patient: "Geeta Pillai",   pid: "MK-0912", doctor: "Dr. Amit Verma",  wait: "18 min", priority: "urgent"    as QPriority },
  { token: "T-002", patient: "Vikram Singh",   pid: "MK-2204", doctor: "Dr. Priya Mehta", wait: "24 min", priority: "normal"    as QPriority },
  { token: "T-003", patient: "Dev Narayan",    pid: "MK-4021", doctor: "Dr. S. Krishnan", wait: "31 min", priority: "normal"    as QPriority },
  { token: "T-004", patient: "Lalitha Bai",    pid: "MK-1199", doctor: "Dr. Kavita Nair", wait: "9 min",  priority: "emergency" as QPriority },
  { token: "T-005", patient: "Aryan Kapoor",   pid: "MK-3855", doctor: "Dr. R. Patel",    wait: "42 min", priority: "normal"    as QPriority },
];

const DOCTORS = [
  { name: "Dr. Priya Mehta",    spec: "Endocrinology",  avail: true,  consults: 12, dept: "OPD Block A" },
  { name: "Dr. S. Krishnan",    spec: "Cardiology",     avail: true,  consults: 9,  dept: "OPD Block B" },
  { name: "Dr. Kavita Nair",    spec: "Neurology",      avail: true,  consults: 7,  dept: "OPD Block C" },
  { name: "Dr. Amit Verma",     spec: "Orthopaedics",   avail: false, consults: 6,  dept: "Trauma Wing" },
  { name: "Dr. R. Patel",       spec: "Gynaecology",    avail: true,  consults: 8,  dept: "OPD Block A" },
  { name: "Dr. Vishal Nanda",   spec: "General Surgery",avail: false, consults: 11, dept: "Surgical OT" },
];

const SERVICES = [
  { label: "Consultation",    icon: ic.stethoscope, color: T.primary, value: "74 today",  sub: "42 active doctors" },
  { label: "Lab Diagnostics", icon: ic.lab,         color: T.blue,    value: "56 tests",  sub: "Thyrocare partner"  },
  { label: "Pharmacy",        icon: ic.pharmacy,    color: T.purple,  value: "63 Rx",     sub: "In-house dispensary"},
  { label: "Teleconsultation",icon: ic.consults,    color: T.amber,   value: "18 online", sub: "MediKiosk Connect"  },
  { label: "Health Records",  icon: ic.records,     color: T.success, value: "ABHA linked",sub: "ABDM compliant"    },
];

type TLType = "checkin" | "consultation" | "prescription" | "lab" | "followup";
const TL_CFG: Record<TLType, { icon: string; color: string; bg: string }> = {
  checkin:      { icon: ic.user,        color: T.primary, bg: T.primaryLight },
  consultation: { icon: ic.stethoscope, color: T.blue,    bg: T.blueLight    },
  prescription: { icon: ic.rx,          color: T.purple,  bg: T.purpleLight  },
  lab:          { icon: ic.lab,         color: T.amber,   bg: T.amberLight   },
  followup:     { icon: ic.clock,       color: T.success, bg: T.successLight },
};

const TIMELINE = [
  { type: "checkin"      as TLType, patient: "Rahul Sharma",   event: "Check-in registered at OPD",               time: "09:01 AM" },
  { type: "consultation" as TLType, patient: "Anita Desai",    event: "Consultation completed — Dr. S. Krishnan", time: "09:44 AM" },
  { type: "prescription" as TLType, patient: "Rahul Sharma",   event: "Prescription issued — Dr. Priya Mehta",    time: "09:52 AM" },
  { type: "lab"          as TLType, patient: "Geeta Pillai",   event: "Lab order: CBC + CRP — Critical result",    time: "10:11 AM" },
  { type: "followup"     as TLType, patient: "Arjun Mehta",    event: "Follow-up scheduled for Sep 24, 2026",     time: "10:30 AM" },
];

const WEEKLY = [
  { day: "Mon", patients: 198, consults: 62, appts: 71 },
  { day: "Tue", patients: 212, consults: 68, appts: 78 },
  { day: "Wed", patients: 224, consults: 71, appts: 82 },
  { day: "Thu", patients: 235, consults: 74, appts: 86 },
  { day: "Fri", patients: 241, consults: 76, appts: 88 },
  { day: "Sat", patients: 188, consults: 58, appts: 67 },
  { day: "Today", patients: 248, consults: 74, appts: 86 },
];
const maxWeekly = Math.max(...WEEKLY.map((w) => w.patients));

const CONNECTED = [
  { label: "ABHA / ABDM",      sub: "Health ID linked",             status: "connected", color: T.primary },
  { label: "Pharmacy Network", sub: "In-house + MediKiosk",         status: "connected", color: T.purple  },
  { label: "Diagnostics",      sub: "Thyrocare partner",            status: "connected", color: T.blue    },
  { label: "Teleconsultation", sub: "MediKiosk Connect",            status: "connected", color: T.amber   },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function Pill({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, background: bg, border: `1px solid ${border}`, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
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
    <div style={{ padding: "13px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</div>
        {sub && <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function ViewAll() {
  return (
    <button style={{ fontSize: 11, fontWeight: 600, color: T.primary, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
      View all <Icon d={ic.arrowRight} size={12} stroke={T.primary} />
    </button>
  );
}

function StatTile({ label, value, icon, color, sub }: { label: string; value: string; icon: string; color: string; sub?: string }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "13px 15px", display: "flex", gap: 11, alignItems: "flex-start" }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: color + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={15} stroke={color} />
      </div>
      <div>
        <div style={{ fontSize: 19, fontWeight: 700, color: T.navy, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 11, color: T.gray, marginTop: 3 }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

function ColHead({ cols, widths }: { cols: string[]; widths: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: widths, background: T.muted, borderBottom: `1px solid ${T.border}` }}>
      {cols.map((h) => (
        <div key={h} style={{ padding: "7px 12px", fontSize: 9, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em" }}>{h.toUpperCase()}</div>
      ))}
    </div>
  );
}

// ── Weekly chart ───────────────────────────────────────────────────────────────
function WeeklyChart() {
  const [hover, setHover] = useState<number | null>(null);
  const W = 340, H = 80, gap = 3;
  const groupW = (W - gap * (WEEKLY.length + 1)) / WEEKLY.length;
  const barW = (groupW - 4) / 3;
  const series = [
    { key: "patients" as const, color: T.primary, label: "Patients" },
    { key: "consults" as const, color: T.blue,    label: "Consultations" },
    { key: "appts"    as const, color: T.purple,  label: "Appointments" },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
        {series.map((s) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
            <span style={{ fontSize: 10, color: T.gray }}>{s.label}</span>
          </div>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ display: "block" }}>
        {WEEKLY.map((d, gi) => {
          const gx = gap + gi * (groupW + gap);
          const today = d.day === "Today";
          return (
            <g key={d.day} onMouseEnter={() => setHover(gi)} onMouseLeave={() => setHover(null)}>
              {hover === gi && <rect x={gx - 2} y={0} width={groupW + 4} height={H + 2} rx="3" fill={T.primary + "08"} />}
              {series.map((s, si) => {
                const bh = Math.max(3, (d[s.key] / maxWeekly) * H);
                const bx = gx + si * (barW + 2);
                const by = H - bh;
                return <rect key={s.key} x={bx} y={by} width={barW} height={bh} rx="2" fill={today ? s.color : s.color + "50"} />;
              })}
              <text x={gx + groupW / 2} y={H + 14} textAnchor="middle" fontSize="8"
                fill={today ? T.primary : T.grayLight} fontWeight={today ? "700" : "400"}>
                {d.day}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ name, color = T.primary, size = 28 }: { name: string; color?: string; size?: number }) {
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  const COLORS = [T.primary, T.blue, T.purple, T.amber, T.success];
  const idx = name.charCodeAt(0) % COLORS.length;
  const bg = color === T.primary ? COLORS[idx] : color;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg + "20", border: `1.5px solid ${bg}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 700, color: bg, flexShrink: 0, letterSpacing: "-0.02em" }}>
      {initials}
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function HospitalDashboard({ onBack }: { onBack: () => void }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQ,   setSearchQ]   = useState("");
  const [sFocus,    setSFocus]    = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, overflow: "hidden" }}>

      {/* ═══ SIDEBAR ═══ */}
      <aside style={{ width: 214, minWidth: 214, background: T.navy, display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "16px 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={13} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>MediKiosk</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", fontWeight: 600, letterSpacing: "0.07em" }}>HOSPITAL</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "8px 7px", overflowY: "auto" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", padding: "6px 8px 3px" }}>HOSPITAL MANAGEMENT</div>
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
          <div style={{ padding: "9px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 9 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Apollo Hospitals</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>Mumbai, Maharashtra</div>
            <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.success }} />
              <span style={{ fontSize: 9, color: T.success, fontWeight: 600 }}>Verified Hospital</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Header */}
        <header style={{ height: 56, background: T.white, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 22px", gap: 14, flexShrink: 0, position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Hospital Dashboard</div>
            <div style={{ fontSize: 10, color: T.grayLight }}>Manage patients, doctors and connected healthcare services.</div>
          </div>
          <div style={{ position: "relative", width: 210 }}>
            <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ic.search} size={13} stroke={T.grayLight} />
            </span>
            <input type="text" placeholder="Search patients, doctors..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} onFocus={() => setSFocus(true)} onBlur={() => setSFocus(false)}
              style={{ width: "100%", padding: "6px 10px 6px 26px", fontSize: 12, color: T.navy, border: `1px solid ${sFocus ? T.primary : T.border}`, borderRadius: 7, background: T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 11px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20 }}>
            <Icon d={ic.shieldCheck} size={12} stroke={T.success} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.success }}>Verified Hospital</span>
          </div>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <Icon d={ic.bell} size={17} stroke={T.gray} />
            <span style={{ position: "absolute", top: -3, right: -4, width: 13, height: 13, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>5</span>
          </div>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>AH</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>Apollo Hospitals</div>
              <div style={{ fontSize: 9, color: T.grayLight }}>Mumbai, Maharashtra</div>
            </div>
            <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />
          </div>
        </header>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px 48px" }}>

          {/* ── STATS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
            <StatTile label="Today's Patients"    value="248" icon={ic.patients} color={T.primary} sub="↑ 12 vs yesterday"    />
            <StatTile label="Appointments"         value="86"  icon={ic.appts}   color={T.blue}    sub="18 pending"            />
            <StatTile label="Active Doctors"       value="42"  icon={ic.doctors} color={T.success} sub="6 on leave today"     />
            <StatTile label="Today's Consultations"value="74"  icon={ic.consults}color={T.purple}  sub="↑ 8 vs yesterday"     />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
            <StatTile label="Pending Appointments" value="18"  icon={ic.clock}   color={T.amber}   sub="Next: 10:30 AM"        />
            <StatTile label="Lab Tests"            value="56"  icon={ic.lab}     color={T.blue}    sub="12 critical pending"   />
            <StatTile label="Prescriptions"        value="63"  icon={ic.rx}      color={T.purple}  sub="Issued today"          />
            <StatTile label="Available Beds"       value="128" icon={ic.bed}     color={T.success} sub="of 320 total"          />
          </div>

          {/* ── 2-COL LAYOUT ── */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 308px", gap: 16 }}>

            {/* ── LEFT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Quick Actions */}
              <Card>
                <CardHeader title="Quick Actions" />
                <div style={{ padding: "14px 18px", display: "flex", gap: 10, flexWrap: "wrap" as const }}>
                  {[
                    { label: "Register Patient",   icon: ic.plus,    color: T.primary },
                    { label: "Add Doctor",          icon: ic.doctors, color: T.blue    },
                    { label: "Create Appointment",  icon: ic.appts,   color: T.purple  },
                    { label: "Start Consultation",  icon: ic.consults,color: T.success  },
                    { label: "Order Lab Test",      icon: ic.lab,     color: T.amber   },
                  ].map((a) => (
                    <button key={a.label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", background: a.color + "10", border: `1px solid ${a.color}28`, borderRadius: 8, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, fontWeight: 600, color: a.color }}>
                      <Icon d={a.icon} size={13} stroke={a.color} />
                      {a.label}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Today's Appointments */}
              <Card>
                <CardHeader title="Today's Appointments" sub={`${APPOINTMENTS.length} scheduled · Sep 10, 2026`} right={<ViewAll />} />
                <ColHead cols={["Patient", "Doctor", "Department", "Time", "Type", "Status"]} widths="1fr 160px 140px 90px 90px 130px" />
                {APPOINTMENTS.map((a, i) => {
                  const sc = APPT_STATUS[a.status];
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 160px 140px 90px 90px 130px", alignItems: "center", borderBottom: i < APPOINTMENTS.length - 1 ? `1px solid ${T.border}` : "none", background: a.status === "in-consultation" ? T.primaryLight + "70" : T.white }}>
                      <div style={{ padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar name={a.patient} size={26} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{a.patient}</div>
                          <div style={{ fontSize: 10, color: T.grayLight }}>{a.pid}</div>
                        </div>
                      </div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{a.doctor}</div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{a.dept}</div>
                      <div style={{ padding: "9px 12px", fontSize: 11, fontWeight: 600, color: T.navy }}>{a.time}</div>
                      <div style={{ padding: "9px 12px" }}>
                        <span style={{ fontSize: 10, color: a.type === "Video" ? T.blue : T.gray, background: a.type === "Video" ? T.blueLight : T.muted, border: `1px solid ${a.type === "Video" ? T.blueBorder : T.border}`, padding: "1px 7px", borderRadius: 20, fontWeight: 600 }}>
                          {a.type}
                        </span>
                      </div>
                      <div style={{ padding: "9px 12px" }}><Pill label={sc.label} color={sc.color} bg={sc.bg} border={sc.border} /></div>
                    </div>
                  );
                })}
              </Card>

              {/* Patient Queue */}
              <Card>
                <CardHeader title="Patient Queue" sub={`${QUEUE.length} patients waiting`} right={<ViewAll />} />
                <ColHead cols={["Token", "Patient", "Doctor", "Priority", "Wait Time", "Action"]} widths="70px 1fr 150px 100px 90px 130px" />
                {QUEUE.map((q, i) => {
                  const pc = QPRIO[q.priority];
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr 150px 100px 90px 130px", alignItems: "center", borderBottom: i < QUEUE.length - 1 ? `1px solid ${T.border}` : "none", background: q.priority === "emergency" ? T.dangerLight + "50" : T.white }}>
                      <div style={{ padding: "9px 12px" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: T.primary, fontFamily: "monospace" }}>{q.token}</span>
                      </div>
                      <div style={{ padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar name={q.patient} size={24} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{q.patient}</div>
                          <div style={{ fontSize: 10, color: T.grayLight }}>{q.pid}</div>
                        </div>
                      </div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{q.doctor}</div>
                      <div style={{ padding: "9px 12px" }}><Pill label={pc.label} color={pc.color} bg={pc.bg} border={pc.border} /></div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray, display: "flex", alignItems: "center", gap: 3 }}>
                        <Icon d={ic.clock} size={11} stroke={T.grayLight} />{q.wait}
                      </div>
                      <div style={{ padding: "9px 8px" }}>
                        <button style={{ padding: "4px 10px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 6, fontSize: 10, fontWeight: 700, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon d={ic.eye} size={10} stroke={T.primary} />Open Record
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Card>

              {/* Doctors & Departments */}
              <Card>
                <CardHeader title="Doctors & Departments" sub="On duty today" right={<ViewAll />} />
                <ColHead cols={["Doctor", "Specialty", "Department", "Status", "Consultations"]} widths="1fr 160px 140px 110px 130px" />
                {DOCTORS.map((d, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 160px 140px 110px 130px", alignItems: "center", borderBottom: i < DOCTORS.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <div style={{ padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar name={d.name} size={26} />
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{d.name}</div>
                    </div>
                    <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{d.spec}</div>
                    <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{d.dept}</div>
                    <div style={{ padding: "9px 12px" }}>
                      <Pill
                        label={d.avail ? "Available" : "Unavailable"}
                        color={d.avail ? T.success : T.danger}
                        bg={d.avail ? T.successLight : T.dangerLight}
                        border={d.avail ? T.successBorder : T.dangerBorder}
                      />
                    </div>
                    <div style={{ padding: "9px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ flex: 1, height: 4, background: T.border, borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${Math.min(100, (d.consults / 15) * 100)}%`, background: T.primary, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: T.navy, minWidth: 20, textAlign: "right" as const }}>{d.consults}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Card>

              {/* Clinical Services */}
              <Card>
                <CardHeader title="Clinical Services" sub="Connected to MediKiosk ecosystem" />
                <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                  {SERVICES.map((s) => (
                    <div key={s.label} style={{ padding: "13px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, textAlign: "center" as const, cursor: "pointer" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color + "14", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                        <Icon d={s.icon} size={15} stroke={s.color} />
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: T.navy, marginBottom: 3 }}>{s.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: T.grayLight }}>{s.sub}</div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

            {/* ── RIGHT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Hospital Performance chart */}
              <Card>
                <CardHeader title="Hospital Performance" sub="Last 7 days" />
                <div style={{ padding: "14px 18px 10px" }}>
                  <WeeklyChart />
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                    {[
                      { label: "Today's patients",      value: "248", color: T.primary },
                      { label: "Today's consultations", value: "74",  color: T.blue    },
                      { label: "Today's appointments",  value: "86",  color: T.purple  },
                      { label: "Bed occupancy",         value: "192 / 320", color: T.navy },
                    ].map((r) => (
                      <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: T.gray }}>{r.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: r.color }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Recent Patient Activity */}
              <Card>
                <CardHeader title="Recent Patient Activity" sub="Live updates" right={<ViewAll />} />
                <div>
                  {TIMELINE.map((t, i) => {
                    const cfg = TL_CFG[t.type];
                    return (
                      <div key={i} style={{ padding: "10px 18px", borderBottom: i < TIMELINE.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", gap: 10, alignItems: "flex-start", position: "relative" as const }}>
                        {i < TIMELINE.length - 1 && (
                          <div style={{ position: "absolute", left: 29, top: 38, bottom: 0, width: 1, background: T.border }} />
                        )}
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: cfg.bg, border: `1.5px solid ${cfg.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                          <Icon d={cfg.icon} size={11} stroke={cfg.color} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>{t.patient}</div>
                          <div style={{ fontSize: 11, color: T.gray, marginTop: 1, lineHeight: 1.4 }}>{t.event}</div>
                          <div style={{ fontSize: 10, color: T.grayLight, marginTop: 3, display: "flex", alignItems: "center", gap: 3 }}>
                            <Icon d={ic.clock} size={9} stroke={T.grayLight} />{t.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Connected MediKiosk Services */}
              <Card>
                <CardHeader title="Connected Services" sub="MediKiosk ecosystem" />
                <div>
                  {CONNECTED.map((c, i) => (
                    <div key={i} style={{ padding: "10px 18px", borderBottom: i < CONNECTED.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: c.color + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon d={ic.link} size={12} stroke={c.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{c.label}</div>
                        <div style={{ fontSize: 10, color: T.grayLight }}>{c.sub}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: T.success }}>Connected</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 18px", background: T.muted, borderTop: `1px solid ${T.border}` }}>
                  <p style={{ margin: 0, fontSize: 10, color: T.grayLight, lineHeight: 1.55 }}>
                    All patient data is ABDM-compliant. Records shared only with explicit ABHA consent.
                  </p>
                </div>
              </Card>

              {/* ABHA / ABDM summary */}
              <div style={{ padding: "13px 15px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 9 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                  <Icon d={ic.shieldCheck} size={13} stroke={T.primary} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.primary }}>ABHA / ABDM</span>
                  <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: T.success, background: T.successLight, border: `1px solid ${T.successBorder}`, padding: "1px 7px", borderRadius: 20 }}>Active</span>
                </div>
                {[
                  { label: "Patients with ABHA ID", value: "1,842" },
                  { label: "Records synced today",   value: "248"   },
                  { label: "Consent requests",       value: "16 active" },
                ].map((r) => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
                    <span style={{ color: T.gray }}>{r.label}</span>
                    <span style={{ fontWeight: 700, color: T.navy }}>{r.value}</span>
                  </div>
                ))}
                <p style={{ margin: "8px 0 0", fontSize: 10, color: T.primary, lineHeight: 1.55 }}>
                  This hospital is part of the National Digital Health Mission. Patient records are linked to ABHA IDs with explicit consent.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

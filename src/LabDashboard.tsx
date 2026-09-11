import { useState } from "react";

const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }: {
  d: string; size?: number; stroke?: string; fill?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ic = {
  heart:      "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  dashboard:  "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  testOrders: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  patients:   "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z",
  samples:    "M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a5 5 0 11-4 0",
  reports:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  catalogue:  "M4 6h16M4 12h16M4 18h7",
  appts:      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  payments:   "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  analytics:  "M22 12h-4l-3 9L9 3l-3 9H2",
  bell:       "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  settings:   "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  logout:     "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  search:     "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  chevDown:   "M19 9l-7 7-7-7",
  check:      "M20 6L9 17l-5-5",
  shieldCheck:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  alertTri:   "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info:       "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  clock:      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  plus:       "M12 5v14M5 12h14",
  eye:        "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  fileText:   "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  user:       "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  upload:     "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  send:       "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z",
  rupee:      "M6 3h12M6 8h12M6 13h8 M14 13c2 0 4 1 4 4s-2 4-4 4H6",
  activity:   "M22 12h-4l-3 9L9 3l-3 9H2",
  flask:      "M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a5 5 0 11-4 0",
  microscope: "M6 18h8 M3 22h18 M14 22a7 7 0 007-7H7a7 7 0 007 7z M9 8h1 M14 8h1",
  link:       "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  timeline:   "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  doctor:     "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M22 11a4 4 0 01-4 4M18 7a4 4 0 014 4",
  phone:      "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  refresh:    "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
};

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

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",  label: "Dashboard",         icon: ic.dashboard,  },
  { id: "orders",     label: "Test Orders",        icon: ic.testOrders, badge: 12, badgeColor: T.amber },
  { id: "patients",   label: "Patients",           icon: ic.patients    },
  { id: "samples",    label: "Samples",            icon: ic.samples     },
  { id: "reports",    label: "Reports",            icon: ic.reports,    badge: 21, badgeColor: T.success },
  { id: "catalogue",  label: "Test Catalogue",     icon: ic.catalogue   },
  { id: "appts",      label: "Appointments",       icon: ic.appts       },
  { id: "payments",   label: "Payments",           icon: ic.payments    },
  { id: "analytics",  label: "Analytics",          icon: ic.analytics   },
  { id: "notif",      label: "Notifications",      icon: ic.bell,       badge: 3, badgeColor: T.danger },
  { id: "settings",   label: "Settings",           icon: ic.settings    },
];

// ─── Data ─────────────────────────────────────────────────────────────────────
type Priority = "routine" | "urgent" | "critical";
const PRIO_CFG: Record<Priority, { label: string; color: string; bg: string; border: string }> = {
  routine:  { label: "Routine",  color: T.gray,    bg: T.muted,        border: T.border        },
  urgent:   { label: "Urgent",   color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  critical: { label: "Critical", color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
};

const TEST_ORDERS = [
  { id: "LAB-4821", patient: "Rahul Sharma",   pid: "MK-2947", doc: "Dr. Priya Mehta",  tests: ["HbA1c", "Lipid Profile"],              time: "09:14 AM", priority: "urgent"   as Priority },
  { id: "LAB-4820", patient: "Anita Desai",    pid: "MK-1832", doc: "Dr. S. Krishnan",  tests: ["CBC", "LFT", "Thyroid (TSH)"],         time: "09:01 AM", priority: "routine"  as Priority },
  { id: "LAB-4819", patient: "Mohammed Rafi",  pid: "MK-3104", doc: "Dr. Kavita Nair",  tests: ["Blood Glucose (Fasting)"],             time: "08:48 AM", priority: "routine"  as Priority },
  { id: "LAB-4818", patient: "Geeta Pillai",   pid: "MK-0912", doc: "Dr. Amit Verma",   tests: ["CBC", "CRP", "Urine R/M"],             time: "08:35 AM", priority: "critical" as Priority },
  { id: "LAB-4817", patient: "Vikram Singh",   pid: "MK-2204", doc: "Dr. Priya Mehta",  tests: ["Vitamin D", "Calcium", "Phosphorus"], time: "08:22 AM", priority: "routine"  as Priority },
];

type SampleStatus = "collected" | "pending" | "processing" | "rejected";
const SAMPLE_STATUS: Record<SampleStatus, { label: string; color: string; bg: string; border: string }> = {
  collected:  { label: "Collected",  color: T.success, bg: T.successLight, border: T.successBorder },
  pending:    { label: "Pending",    color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  processing: { label: "Processing", color: T.blue,    bg: T.blueLight,    border: T.blueBorder    },
  rejected:   { label: "Rejected",   color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
};

const SAMPLES = [
  { patient: "Rahul Sharma",   test: "HbA1c",                  type: "Blood (EDTA)",  status: "processing" as SampleStatus, time: "09:18 AM" },
  { patient: "Anita Desai",    test: "CBC",                     type: "Blood (EDTA)",  status: "collected"  as SampleStatus, time: "09:06 AM" },
  { patient: "Mohammed Rafi",  test: "Blood Glucose (Fasting)", type: "Blood (F)",     status: "pending"    as SampleStatus, time: "—"        },
  { patient: "Geeta Pillai",   test: "CBC + CRP",               type: "Blood (EDTA)",  status: "collected"  as SampleStatus, time: "08:40 AM" },
  { patient: "Vikram Singh",   test: "Vitamin D",               type: "Serum",         status: "pending"    as SampleStatus, time: "—"        },
  { patient: "Sunita Agarwal", test: "Urine R/M",               type: "Urine (Midstream)", status: "processing" as SampleStatus, time: "08:14 AM" },
];

const PROCESSING = [
  { test: "HbA1c",                  patient: "Rahul Sharma",   pct: 72, eta: "10:30 AM", machine: "Analyzer-2" },
  { test: "Lipid Profile",          patient: "Rahul Sharma",   pct: 45, eta: "11:00 AM", machine: "Analyzer-1" },
  { test: "CBC",                    patient: "Anita Desai",    pct: 88, eta: "10:15 AM", machine: "Hematology" },
  { test: "Blood Glucose (Fasting)",patient: "Mohammed Rafi",  pct: 20, eta: "11:30 AM", machine: "Glucometer" },
  { test: "CRP",                    patient: "Geeta Pillai",   pct: 60, eta: "10:45 AM", machine: "Analyzer-2" },
];

type ResultStatus = "normal" | "abnormal" | "critical";
const RESULT_STATUS: Record<ResultStatus, { label: string; color: string; bg: string; border: string }> = {
  normal:   { label: "Normal",   color: T.success, bg: T.successLight, border: T.successBorder },
  abnormal: { label: "Abnormal", color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  critical: { label: "Critical", color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
};

const REPORTS_READY = [
  { id: "RPT-0941", patient: "Sunita Agarwal", pid: "MK-2011", test: "Thyroid (TSH)",     doc: "Dr. Priya Mehta", result: "abnormal" as ResultStatus, date: "Today, 08:02 AM" },
  { id: "RPT-0940", patient: "Arjun Mehta",    pid: "MK-1498", test: "Blood Glucose",     doc: "Dr. Kavita Nair", result: "normal"   as ResultStatus, date: "Today, 07:44 AM" },
  { id: "RPT-0939", patient: "Priya Joshi",    pid: "MK-3367", test: "CBC",               doc: "Dr. Amit Verma",  result: "normal"   as ResultStatus, date: "Today, 07:30 AM" },
  { id: "RPT-0938", patient: "Dev Narayan",    pid: "MK-4021", test: "Lipid Profile",     doc: "Dr. S. Krishnan", result: "abnormal" as ResultStatus, date: "Today, 07:10 AM" },
];

const CRITICAL_RESULTS = [
  { patient: "Geeta Pillai",  pid: "MK-0912", test: "CRP (C-Reactive Protein)", value: "148 mg/L",   ref: "< 5 mg/L",  doc: "Dr. Amit Verma"   },
  { patient: "Aarav Mehta",   pid: "MK-2841", test: "Blood Glucose (Random)",   value: "448 mg/dL",  ref: "< 200 mg/dL",doc: "Dr. Priya Mehta"  },
  { patient: "Lalitha Bai",   pid: "MK-1199", test: "Serum Potassium",          value: "6.8 mEq/L",  ref: "3.5–5.0",   doc: "Dr. S. Krishnan"  },
];

const CATALOGUE = [
  { test: "Complete Blood Count (CBC)",   category: "Haematology",   price: "₹280",  tat: "4 hrs",   available: true  },
  { test: "HbA1c",                        category: "Diabetes",      price: "₹480",  tat: "6 hrs",   available: true  },
  { test: "Lipid Profile",                category: "Cardiology",    price: "₹620",  tat: "8 hrs",   available: true  },
  { test: "Thyroid (TSH, T3, T4)",        category: "Endocrinology", price: "₹740",  tat: "8 hrs",   available: true  },
  { test: "Blood Glucose (Fasting)",      category: "Diabetes",      price: "₹80",   tat: "2 hrs",   available: true  },
  { test: "Liver Function Test (LFT)",    category: "Biochemistry",  price: "₹520",  tat: "6 hrs",   available: true  },
  { test: "Vitamin D (25-OH)",            category: "Nutrition",     price: "₹1,100",tat: "24 hrs",  available: true  },
  { test: "COVID-19 RT-PCR",              category: "Microbiology",  price: "₹499",  tat: "12 hrs",  available: false },
];

const WEEKLY_TESTS = [
  { day: "Mon", vol: 48 },
  { day: "Tue", vol: 61 },
  { day: "Wed", vol: 53 },
  { day: "Thu", vol: 70 },
  { day: "Fri", vol: 58 },
  { day: "Sat", vol: 42 },
  { day: "Today", vol: 64 },
];
const maxVol = Math.max(...WEEKLY_TESTS.map((w) => w.vol));

const DELIVERIES = [
  { patient: "Sunita Agarwal", report: "Thyroid (TSH)", toPatient: true, toDoctor: true, toTimeline: true,  time: "08:05 AM" },
  { patient: "Arjun Mehta",    report: "Blood Glucose", toPatient: true, toDoctor: true, toTimeline: false, time: "07:48 AM" },
  { patient: "Priya Joshi",    report: "CBC",           toPatient: true, toDoctor: false, toTimeline: false, time: "07:34 AM" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function ViewAll({ label = "View all", onClick }: { label?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ fontSize: 11, fontWeight: 600, color: T.primary, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
      {label} <Icon d={ic.arrowRight} size={12} stroke={T.primary} />
    </button>
  );
}

function StatTile({ label, value, icon, color, sub }: { label: string; value: string; icon: string; color: string; sub?: string }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: color + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={16} stroke={color} />
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: T.navy, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 11, color: T.gray, marginTop: 3 }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: T.grayLight, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function ColHead({ cols }: { cols: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols.map(() => "1fr").join(" "), background: T.muted, borderBottom: `1px solid ${T.border}` }}>
      {cols.map((h) => (
        <div key={h} style={{ padding: "7px 12px", fontSize: 9, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em" }}>{h.toUpperCase()}</div>
      ))}
    </div>
  );
}

// ─── Weekly volume chart ──────────────────────────────────────────────────────
function WeeklyChart() {
  const W = 260, H = 68, gap = 4;
  const bw = (W - gap * (WEEKLY_TESTS.length + 1)) / WEEKLY_TESTS.length;
  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ display: "block" }}>
        {WEEKLY_TESTS.map((d, i) => {
          const bh = Math.max(4, (d.vol / maxVol) * H);
          const x  = gap + i * (bw + gap);
          const y  = H - bh;
          const today = d.day === "Today";
          return (
            <g key={d.day}>
              <rect x={x} y={y} width={bw} height={bh} rx="3" fill={today ? T.primary : T.border} />
              <text x={x + bw / 2} y={H + 14} textAnchor="middle"
                fontSize="8" fill={today ? T.primary : T.grayLight} fontWeight={today ? "700" : "400"}>
                {d.day}
              </text>
              {today && (
                <text x={x + bw / 2} y={y - 4} textAnchor="middle" fontSize="8" fill={T.primary} fontWeight="700">{d.vol}</text>
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: T.grayLight }}>Tests / day</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.primary }}>Avg {Math.round(WEEKLY_TESTS.reduce((a,b)=>a+b.vol,0)/7)} tests/day</span>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function LabDashboard({
  onBack,
  hideSidebar = false,
  onNavigate,
}: {
  onBack: () => void;
  hideSidebar?: boolean;
  onNavigate?: (s: string) => void;
}) {
  const [activeNav, setActiveNav]     = useState("dashboard");
  const [sFocus,    setSFocus]        = useState(false);
  const [searchQ,   setSearchQ]       = useState("");
  const [notified,  setNotified]      = useState<string[]>([]);
  const [processed, setProcessed]     = useState<string[]>([]);

  return (
    <div style={{ display: "flex", minHeight: "100%", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, width: "100%" }}>

      {/* ═══ SIDEBAR ═══ */}
      {!hideSidebar && (
      <aside style={{ width: 210, minWidth: 210, background: T.navy, display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "18px 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={13} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>MediKiosk</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", fontWeight: 600, letterSpacing: "0.07em" }}>DIAGNOSTICS</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "8px 7px", overflowY: "auto" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", padding: "6px 8px 3px" }}>LAB & DIAGNOSTICS</div>
          {NAV.map((item) => {
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => {
                setActiveNav(item.id);
                if (onNavigate) {
                  if (item.id === "patients") onNavigate("record");
                  else if (item.id === "reports" || item.id === "orders" || item.id === "samples" || item.id === "catalogue") onNavigate("lab");
                  else if (item.id === "appts") onNavigate("appt-booking");
                  else if (item.id === "payments") onNavigate("payments");
                  else if (item.id === "analytics") onNavigate("reports");
                  else if (item.id === "notif") onNavigate("notifications");
                  else if (item.id === "settings") onNavigate("settings");
                }
              }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7, border: "none", cursor: "pointer", background: active ? "rgba(13,122,110,0.22)" : "transparent", color: active ? "#5dd6c8" : "rgba(255,255,255,0.52)", fontSize: 12, fontWeight: active ? 600 : 400, textAlign: "left" as const, transition: "all 0.12s", marginBottom: 1, fontFamily: "Inter, system-ui, sans-serif" }}>
                <span style={{ opacity: active ? 1 : 0.7, flexShrink: 0 }}>
                  <Icon d={item.icon} size={14} stroke="currentColor" />
                </span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ background: item.badgeColor || T.danger, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 9, padding: "1px 5px" }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "8px 7px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={onBack} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,100,100,0.6)", fontSize: 12, textAlign: "left" as const, fontFamily: "Inter, system-ui, sans-serif" }}>
            <Icon d={ic.logout} size={14} stroke="currentColor" />
            Logout
          </button>
        </div>
        <div style={{ padding: "8px 10px 14px" }}>
          <div style={{ padding: "9px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 9 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Thyrocare Labs</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>Jaipur, Rajasthan</div>
            <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.success }} />
              <span style={{ fontSize: 9, color: T.success, fontWeight: 600 }}>Verified Diagnostic Centre</span>
            </div>
          </div>
        </div>
      </aside>
      )}

      {/* ═══ MAIN ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Header */}
        <header style={{ height: 56, background: T.white, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 22px", gap: 14, flexShrink: 0, position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Lab & Diagnostics</div>
            <div style={{ fontSize: 10, color: T.grayLight }}>Manage diagnostic tests, samples and patient reports.</div>
          </div>
          <div style={{ position: "relative", width: 200 }}>
            <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ic.search} size={13} stroke={T.grayLight} />
            </span>
            <input type="text" placeholder="Search patients, tests..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} onFocus={() => setSFocus(true)} onBlur={() => setSFocus(false)}
              style={{ width: "100%", padding: "6px 10px 6px 26px", fontSize: 12, color: T.navy, border: `1px solid ${sFocus ? T.primary : T.border}`, borderRadius: 7, background: T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 11px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20 }}>
            <Icon d={ic.shieldCheck} size={12} stroke={T.success} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.success }}>Verified Diagnostic Centre</span>
          </div>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <Icon d={ic.bell} size={17} stroke={T.gray} />
            <span style={{ position: "absolute", top: -3, right: -4, width: 13, height: 13, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
          </div>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>TL</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>Thyrocare Labs</div>
              <div style={{ fontSize: 9, color: T.grayLight }}>Jaipur, Rajasthan</div>
            </div>
            <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />
          </div>
        </header>

        {/* Body */}
        <div style={{ flex: 1, padding: "18px 22px 48px" }}>

          {/* ── STATS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 18 }}>
            <StatTile label="Today's Tests"    value="64"      icon={ic.flask}     color={T.primary} sub="↑ 8 vs yesterday"   />
            <StatTile label="Pending Samples"  value="12"      icon={ic.samples}   color={T.amber}   sub="Awaiting collection" />
            <StatTile label="Processing"       value="18"      icon={ic.analytics} color={T.blue}    sub="In analyzers"        />
            <StatTile label="Reports Ready"    value="21"      icon={ic.reports}   color={T.success}  sub="Ready to deliver"   />
            <StatTile label="Critical Reports" value="3"       icon={ic.alertTri}  color={T.danger}   sub="Doctor alert needed" />
            <StatTile label="Today's Revenue"  value="₹32,450" icon={ic.rupee}     color={T.purple}   sub="↑ ₹3.1k vs avg"    />
          </div>

          {/* ── 2-COL LAYOUT ── */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 16 }}>

            {/* ── LEFT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* ── Critical Results ALERT ── */}
              <div style={{ background: T.dangerLight, border: `1.5px solid ${T.dangerBorder}`, borderRadius: 11, overflow: "hidden" }}>
                <div style={{ padding: "11px 18px", borderBottom: `1px solid ${T.dangerBorder}`, display: "flex", alignItems: "center", gap: 9, justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.danger }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.danger }}>Critical Results — Immediate Action Required</span>
                  </div>
                  <Pill label={`${CRITICAL_RESULTS.length} critical`} color={T.danger} bg={T.dangerLight} border={T.dangerBorder} />
                </div>
                {CRITICAL_RESULTS.map((c, i) => (
                  <div key={i} style={{ padding: "11px 18px", borderBottom: i < CRITICAL_RESULTS.length - 1 ? `1px solid ${T.dangerBorder}` : "none", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.danger + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon d={ic.alertTri} size={14} stroke={T.danger} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{c.patient}</span>
                        <span style={{ fontSize: 10, color: T.grayLight }}>{c.pid}</span>
                      </div>
                      <div style={{ fontSize: 11, color: T.navy, marginTop: 2 }}>
                        <span style={{ fontWeight: 600 }}>{c.test}:</span> <span style={{ color: T.danger, fontWeight: 700 }}>{c.value}</span>
                        <span style={{ color: T.grayLight }}> (Ref: {c.ref})</span>
                      </div>
                      <div style={{ fontSize: 10, color: T.gray, marginTop: 1 }}>Referring doctor: {c.doc}</div>
                    </div>
                    <button
                      onClick={() => setNotified((n) => n.includes(c.patient) ? n : [...n, c.patient])}
                      style={{ padding: "5px 12px", background: notified.includes(c.patient) ? T.successLight : T.danger, border: `1px solid ${notified.includes(c.patient) ? T.successBorder : "transparent"}`, borderRadius: 7, fontSize: 11, fontWeight: 700, color: notified.includes(c.patient) ? T.success : "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5, flexShrink: 0, transition: "all 0.18s" }}
                    >
                      {notified.includes(c.patient)
                        ? <><Icon d={ic.check} size={12} stroke={T.success} />Notified</>
                        : <><Icon d={ic.phone} size={12} stroke="#fff" />Notify Doctor</>
                      }
                    </button>
                  </div>
                ))}
              </div>

              {/* ── Pending Test Orders ── */}
              <Card>
                <CardHeader
                  title="Pending Test Orders"
                  sub={`${TEST_ORDERS.length} orders awaiting processing`}
                  right={<ViewAll onClick={() => onNavigate && onNavigate("lab")} />}
                />
                <ColHead cols={["Order ID", "Patient", "Tests Ordered", "Doctor", "Time", "Priority", "Action"]} />
                {TEST_ORDERS.map((o, i) => {
                  const pc = PRIO_CFG[o.priority];
                  const isProc = processed.includes(o.id);
                  return (
                    <div key={o.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 130px 80px 90px 120px", alignItems: "center", borderBottom: i < TEST_ORDERS.length - 1 ? `1px solid ${T.border}` : "none", background: o.priority === "critical" ? T.dangerLight + "80" : T.white }}>
                      <div style={{ padding: "10px 12px", fontSize: 11, fontWeight: 600, color: T.navy, fontFamily: "monospace" }}>{o.id}</div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{o.patient}</div>
                        <div style={{ fontSize: 10, color: T.grayLight }}>{o.pid}</div>
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 11, color: T.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{o.tests.join(", ")}</div>
                        <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{o.tests.length} test{o.tests.length > 1 ? "s" : ""}</div>
                      </div>
                      <div style={{ padding: "10px 12px", fontSize: 11, color: T.gray }}>{o.doc}</div>
                      <div style={{ padding: "10px 12px", fontSize: 11, color: T.gray }}>{o.time}</div>
                      <div style={{ padding: "10px 12px" }}><Pill label={pc.label} color={pc.color} bg={pc.bg} border={pc.border} /></div>
                      <div style={{ padding: "10px 8px", display: "flex", gap: 6 }}>
                        <button onClick={() => onNavigate && onNavigate("lab")} style={{ padding: "4px 9px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 10, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 3 }}>
                          <Icon d={ic.eye} size={10} stroke={T.gray} />View
                        </button>
                        <button
                          onClick={() => setProcessed((p) => p.includes(o.id) ? p : [...p, o.id])}
                          style={{ padding: "4px 9px", background: isProc ? T.successLight : T.primary, border: `1px solid ${isProc ? T.successBorder : "transparent"}`, borderRadius: 6, fontSize: 10, fontWeight: 700, color: isProc ? T.success : "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}
                        >
                          {isProc ? "✓ Done" : "Process"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Card>

              {/* ── Sample Collection ── */}
              <Card>
                <CardHeader title="Sample Collection" sub="Active sample tracking" right={<ViewAll onClick={() => onNavigate && onNavigate("lab")} />} />
                <ColHead cols={["Patient", "Test", "Sample Type", "Collection Time", "Status"]} />
                {SAMPLES.map((s, i) => {
                  const sc = SAMPLE_STATUS[s.status];
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px 120px 110px", alignItems: "center", borderBottom: i < SAMPLES.length - 1 ? `1px solid ${T.border}` : "none" }}>
                      <div style={{ padding: "9px 12px", fontSize: 12, fontWeight: 600, color: T.navy }}>{s.patient}</div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{s.test}</div>
                      <div style={{ padding: "9px 12px" }}>
                        <span style={{ color: T.navy, background: T.muted, border: `1px solid ${T.border}`, padding: "2px 8px", borderRadius: 8, fontFamily: "monospace", fontSize: "10px" }}>{s.type}</span>
                      </div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: s.time === "—" ? T.grayLight : T.gray }}>{s.time}</div>
                      <div style={{ padding: "9px 12px" }}><Pill label={sc.label} color={sc.color} bg={sc.bg} border={sc.border} /></div>
                    </div>
                  );
                })}
              </Card>

              {/* ── Test Processing ── */}
              <Card>
                <CardHeader title="Test Processing" sub={`${PROCESSING.length} tests in progress`} right={<ViewAll onClick={() => onNavigate && onNavigate("lab")} />} />
                <div>
                  {PROCESSING.map((p, i) => (
                    <div key={i} style={{ padding: "12px 18px", borderBottom: i < PROCESSING.length - 1 ? `1px solid ${T.border}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{p.test}</span>
                          <span style={{ fontSize: 11, color: T.gray, marginLeft: 8 }}>· {p.patient}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 10, color: T.grayLight }}>{p.machine}</span>
                          <span style={{ fontSize: 11, color: T.gray, display: "flex", alignItems: "center", gap: 3 }}>
                            <Icon d={ic.clock} size={11} stroke={T.grayLight} />
                            ETA {p.eta}
                          </span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: p.pct >= 80 ? T.success : T.primary }}>{p.pct}%</span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div style={{ height: 5, background: T.border, borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${p.pct}%`, background: p.pct >= 80 ? T.success : T.primary, borderRadius: 3, transition: "width 0.3s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* ── Reports Ready ── */}
              <Card>
                <CardHeader title="Reports Ready for Review" sub={`${REPORTS_READY.length} reports awaiting sign-off`} right={<ViewAll onClick={() => onNavigate && onNavigate("lab")} />} />
                <ColHead cols={["Report ID", "Patient", "Test", "Referring Doctor", "Result", "Actions"]} />
                {REPORTS_READY.map((r, i) => {
                  const rc = RESULT_STATUS[r.result];
                  return (
                    <div key={r.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr 130px 150px 100px 180px", alignItems: "center", borderBottom: i < REPORTS_READY.length - 1 ? `1px solid ${T.border}` : "none", background: r.result === "abnormal" ? T.amberLight + "50" : T.white }}>
                      <div style={{ padding: "10px 12px", fontSize: 10, fontWeight: 600, color: T.navy, fontFamily: "monospace" }}>{r.id}</div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{r.patient}</div>
                        <div style={{ fontSize: 10, color: T.grayLight }}>{r.pid} · {r.date}</div>
                      </div>
                      <div style={{ padding: "10px 12px", fontSize: 11, color: T.gray }}>{r.test}</div>
                      <div style={{ padding: "10px 12px", fontSize: 11, color: T.gray }}>{r.doc}</div>
                      <div style={{ padding: "10px 12px" }}><Pill label={rc.label} color={rc.color} bg={rc.bg} border={rc.border} /></div>
                      <div style={{ padding: "10px 8px", display: "flex", gap: 6 }}>
                        <button onClick={() => onNavigate && onNavigate("lab")} style={{ padding: "4px 9px", background: T.primary, border: "none", borderRadius: 6, fontSize: 10, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                          Review
                        </button>
                        <button onClick={() => onNavigate && onNavigate("lab")} style={{ padding: "4px 9px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 10, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 3 }}>
                          <Icon d={ic.upload} size={10} stroke={T.gray} />Upload
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Card>

              {/* ── Test Catalogue ── */}
              <Card>
                <CardHeader
                  title="Test Catalogue"
                  sub="Available diagnostic tests"
                  right={
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => onNavigate && onNavigate("lab")} style={{ padding: "5px 12px", background: T.primary, border: "none", borderRadius: 7, fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                        <Icon d={ic.plus} size={12} stroke="#fff" />Add Test
                      </button>
                      <ViewAll onClick={() => onNavigate && onNavigate("lab")} />
                    </div>
                  }
                />
                <ColHead cols={["Test Name", "Category", "Price", "Turnaround", "Availability"]} />
                {CATALOGUE.map((c, i) => (
                  <div key={c.test} style={{ display: "grid", gridTemplateColumns: "1fr 140px 80px 100px 110px", alignItems: "center", borderBottom: i < CATALOGUE.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <div style={{ padding: "9px 12px", fontSize: 12, fontWeight: 600, color: T.navy }}>{c.test}</div>
                    <div style={{ padding: "9px 12px" }}>
                      <span style={{ fontSize: 10, color: T.gray, background: T.muted, border: `1px solid ${T.border}`, padding: "1px 7px", borderRadius: 8 }}>{c.category}</span>
                    </div>
                    <div style={{ padding: "9px 12px", fontSize: 12, fontWeight: 700, color: T.navy }}>{c.price}</div>
                    <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray, display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon d={ic.clock} size={11} stroke={T.grayLight} />
                      {c.tat}
                    </div>
                    <div style={{ padding: "9px 12px" }}>
                      <Pill
                        label={c.available ? "Available" : "Unavailable"}
                        color={c.available ? T.success : T.danger}
                        bg={c.available ? T.successLight : T.dangerLight}
                        border={c.available ? T.successBorder : T.dangerBorder}
                      />
                    </div>
                  </div>
                ))}
              </Card>

            </div>

            {/* ── RIGHT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Quick Actions */}
              <Card>
                <CardHeader title="Quick Actions" />
                <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Create Test Order", icon: ic.plus,       color: T.primary, screen: "lab" },
                    { label: "Register Sample",   icon: ic.samples,    color: T.blue,    screen: "lab" },
                    { label: "Upload Report",     icon: ic.upload,     color: T.purple,  screen: "lab" },
                    { label: "View Patients",     icon: ic.patients,   color: T.amber,   screen: "record" },
                  ].map((a) => (
                    <button key={a.label} onClick={() => onNavigate && onNavigate(a.screen)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "12px 8px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: a.color + "14", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon d={a.icon} size={15} stroke={a.color} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: T.navy, textAlign: "center" as const, lineHeight: 1.3 }}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Weekly volume chart */}
              <Card>
                <CardHeader title="Weekly Test Volume" sub="Last 7 days" />
                <div style={{ padding: "14px 18px 10px" }}>
                  <WeeklyChart />
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                    {[
                      { label: "Today",     value: "64 tests",  color: T.primary },
                      { label: "This week", value: "396 tests", color: T.navy    },
                      { label: "Revenue",   value: "₹32,450",   color: T.success  },
                    ].map((r) => (
                      <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                        <span style={{ fontSize: 11, color: T.gray }}>{r.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: r.color }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Patient Report Delivery */}
              <Card>
                <CardHeader title="Report Delivery" sub="Sent to patients, doctors & ABHA timeline" />
                <div>
                  {DELIVERIES.map((d, i) => (
                    <div key={i} style={{ padding: "12px 18px", borderBottom: i < DELIVERIES.length - 1 ? `1px solid ${T.border}` : "none" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 3 }}>{d.patient}</div>
                      <div style={{ fontSize: 11, color: T.gray, marginBottom: 7 }}>{d.report} · {d.time}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: d.toPatient ? T.success : T.grayLight, background: d.toPatient ? T.successLight : T.muted, border: `1px solid ${d.toPatient ? T.successBorder : T.border}`, padding: "2px 8px", borderRadius: 20 }}>
                          {d.toPatient ? <Icon d={ic.check} size={9} stroke={T.success} /> : null}Patient
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: d.toDoctor ? T.success : T.grayLight, background: d.toDoctor ? T.successLight : T.muted, border: `1px solid ${d.toDoctor ? T.successBorder : T.border}`, padding: "2px 8px", borderRadius: 20 }}>
                          {d.toDoctor ? <Icon d={ic.check} size={9} stroke={T.success} /> : null}Doctor
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: d.toTimeline ? T.primary : T.grayLight, background: d.toTimeline ? T.primaryLight : T.muted, border: `1px solid ${d.toTimeline ? T.primaryBorder : T.border}`, padding: "2px 8px", borderRadius: 20 }}>
                          {d.toTimeline ? <Icon d={ic.check} size={9} stroke={T.primary} /> : null}Health Timeline
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 18px", borderTop: `1px solid ${T.border}`, background: T.muted }}>
                  <p style={{ margin: 0, fontSize: 10, color: T.grayLight, lineHeight: 1.55 }}>
                    Reports are delivered to the patient's ABHA-linked health timeline with explicit consent.
                  </p>
                </div>
              </Card>

              {/* Network note */}
              <div style={{ padding: "12px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 9 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Icon d={ic.shieldCheck} size={12} stroke={T.primary} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>MediKiosk Network</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: T.primary, lineHeight: 1.6 }}>
                  All diagnostic reports are linked to the patient's ABHA health ID and shared to their MediKiosk health timeline with explicit consent. Critical results trigger immediate doctor notifications.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

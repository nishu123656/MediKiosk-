import { useState, useEffect } from "react";

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useViewport() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

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
  heart:         "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  dashboard:     "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  queue:         "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  calendar:      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  stethoscope:   "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  users:         "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  pill:          "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  fileText:      "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  video:         "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  settings:      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  logout:        "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  bell:          "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  search:        "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  chevDown:      "M19 9l-7 7-7-7",
  chevRight:     "M9 18l6-6-6-6",
  chevUp:        "M5 15l7-7 7 7",
  checkCircle:   "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  activity:      "M22 12h-4l-3 9L9 3l-3 9H2",
  clock:         "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  user:          "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  edit:          "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  healthRec:     "M9 12h6 M12 9v6 M9 20H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2h-2",
  menu:          "M4 6h16M4 12h16M4 18h16",
  x:             "M18 6L6 18M6 6l12 12",
  arrowLeft:     "M19 12H5M12 19l-7-7 7-7",
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
  successLight:  "#f0fdf4",
  successBorder: "#bbf7d0",
  amber:         "#d97706",
  amberLight:    "#fffbeb",
  amberBorder:   "#fde68a",
  blue:          "#1d4ed8",
  blueLight:     "#eff6ff",
  blueBorder:    "#bfdbfe",
  purple:        "#7c3aed",
};

// ─── Data types ───────────────────────────────────────────────────────────────
type Priority = "high" | "medium" | "normal";
type QueueStatus = "waiting" | "in-consultation" | "completed";

interface QueuePatient {
  id: string;
  priority: Priority;
  name: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  waitMins: number;
  status: QueueStatus;
  allergies: string;
  medicines: string;
  duration: string;
  timeline: { label: string; date: string; dot: string }[];
  considerations: string[];
  risk: "High" | "Moderate" | "Low";
  missing: string[];
}

// ─── Queue data ───────────────────────────────────────────────────────────────
const QUEUE: QueuePatient[] = [
  {
    id: "MK-00421", priority: "high", name: "Rahul Sharma", age: 24, gender: "M",
    chiefComplaint: "Cough + fever", waitMins: 18, status: "waiting",
    allergies: "No known allergies", medicines: "None reported", duration: "3 days",
    timeline: [
      { label: "Consultation — Dr. Mehta", date: "Aug 28, 2026", dot: T.primary },
      { label: "Blood Test Report",         date: "Aug 25, 2026", dot: T.amber   },
      { label: "Prescription updated",      date: "Aug 28, 2026", dot: T.purple  },
    ],
    considerations: ["Respiratory infection", "Viral illness", "Asthma exacerbation"],
    risk: "Moderate",
    missing: ["Temperature", "SpO₂"],
  },
  {
    id: "MK-00422", priority: "medium", name: "Priya Verma", age: 31, gender: "F",
    chiefComplaint: "Severe headache", waitMins: 11, status: "waiting",
    allergies: "Penicillin", medicines: "Paracetamol 500mg PRN", duration: "2 days",
    timeline: [
      { label: "Neurology Consultation",  date: "Jul 10, 2026", dot: T.primary },
      { label: "MRI Brain Report",        date: "Jul 8, 2026",  dot: T.blue    },
    ],
    considerations: ["Tension-type headache", "Migraine", "Hypertensive headache"],
    risk: "Moderate",
    missing: ["Blood Pressure", "Neurological exam"],
  },
  {
    id: "MK-00423", priority: "normal", name: "Amit Kumar", age: 45, gender: "M",
    chiefComplaint: "Follow-up — diabetes", waitMins: 5, status: "waiting",
    allergies: "No known allergies", medicines: "Metformin 500mg, Glipizide 5mg", duration: "Ongoing",
    timeline: [
      { label: "HbA1c Review — Dr. Mehta", date: "Jun 12, 2026", dot: T.primary },
      { label: "HbA1c Lab Report",          date: "Jun 10, 2026", dot: T.amber   },
    ],
    considerations: ["Type 2 DM management review", "Medication adherence check"],
    risk: "Low",
    missing: ["Latest HbA1c", "Fasting glucose"],
  },
  {
    id: "MK-00420", priority: "high", name: "Sunita Rao", age: 62, gender: "F",
    chiefComplaint: "Chest tightness + breathlessness", waitMins: 0, status: "in-consultation",
    allergies: "Aspirin", medicines: "Amlodipine 5mg, Atorvastatin 10mg", duration: "4 hours",
    timeline: [
      { label: "Cardiology Consultation", date: "Sep 1, 2026", dot: T.primary },
      { label: "ECG Report",              date: "Sep 1, 2026", dot: T.danger  },
    ],
    considerations: ["Acute coronary syndrome", "Pulmonary embolism", "GERD exacerbation"],
    risk: "High",
    missing: ["ECG result", "Troponin levels", "SpO₂"],
  },
  {
    id: "MK-00419", priority: "normal", name: "Vijay Nair", age: 38, gender: "M",
    chiefComplaint: "Skin rash — 5 days", waitMins: 0, status: "completed",
    allergies: "Sulfa drugs", medicines: "None reported", duration: "5 days",
    timeline: [
      { label: "Dermatology Consultation", date: "Aug 15, 2026", dot: T.primary },
    ],
    considerations: ["Allergic contact dermatitis", "Eczema"],
    risk: "Low",
    missing: [],
  },
];

const PRIORITY_CFG = {
  high:   { label: "HIGH",   color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder, dot: T.danger    },
  medium: { label: "MED",    color: T.amber,   bg: T.amberLight,   border: T.amberBorder,  dot: T.amber     },
  normal: { label: "NORMAL", color: T.gray,    bg: T.muted,        border: T.border,       dot: T.grayLight },
};

const STATUS_CFG: Record<QueueStatus, { label: string; color: string; bg: string; border: string }> = {
  "waiting":         { label: "Waiting",        color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  "in-consultation": { label: "In Consultation", color: T.primary, bg: T.primaryLight, border: T.primaryBorder },
  "completed":       { label: "Completed",       color: T.success, bg: T.successLight, border: T.successBorder },
};

const RISK_CFG: Record<"High"|"Moderate"|"Low", { color: string; bg: string; border: string }> = {
  High:     { color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
  Moderate: { color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  Low:      { color: T.success, bg: T.successLight, border: T.successBorder },
};

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",    label: "Dashboard",        icon: ic.dashboard    },
  { id: "queue",        label: "Patient Queue",    icon: ic.queue        },
  { id: "appointments", label: "Appointments",     icon: ic.calendar     },
  { id: "consult",      label: "Consultations",    icon: ic.stethoscope  },
  { id: "patients",     label: "Patients",         icon: ic.users        },
  { id: "prescriptions",label: "Prescriptions",    icon: ic.pill         },
  { id: "records",      label: "Health Records",   icon: ic.healthRec    },
  { id: "tele",         label: "Teleconsultation", icon: ic.video        },
  { id: "settings",     label: "Settings",         icon: ic.settings     },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  active, setActive, onLogout, open, onClose, onNavigate,
}: {
  active: string; setActive: (v: string) => void;
  onLogout: () => void; open: boolean; onClose: () => void;
  onNavigate?: (s: string) => void;
}) {
  const { isMobile, isTablet } = useViewport();
  const narrow = isMobile || isTablet;

  return (
    <>
      {/* Mobile overlay */}
      {narrow && open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, background: "rgba(15,31,61,0.5)",
            zIndex: 40, backdropFilter: "blur(2px)",
          }}
        />
      )}

      <aside style={{
        width: 220, minWidth: 220, background: T.navy,
        display: "flex", flexDirection: "column",
        height: "100vh", flexShrink: 0,
        ...(narrow ? {
          position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.22s cubic-bezier(.4,0,.2,1)",
          boxShadow: open ? "4px 0 24px rgba(0,0,0,0.18)" : "none",
        } : {
          position: "sticky", top: 0,
        }),
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: T.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={ic.heart} size={16} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", letterSpacing: "-0.01em" }}>MediKiosk</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", fontWeight: 600, letterSpacing: "0.08em" }}>HEALTH PLATFORM</div>
            </div>
          </div>
          {narrow && (
            <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 4, marginLeft: 8 }}>
              <Icon d={ic.x} size={16} stroke="currentColor" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", padding: "10px 10px 6px" }}>
            DOCTOR WORKSPACE
          </div>
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  if (narrow) onClose();
                  if (onNavigate) {
                    if (item.id === "appointments") onNavigate("appt-booking");
                    else if (item.id === "consult" || item.id === "tele") onNavigate("consult");
                    else if (item.id === "patients" || item.id === "records") onNavigate("record");
                    else if (item.id === "prescriptions") onNavigate("prescription");
                    else if (item.id === "settings") onNavigate("settings");
                  }
                }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: isActive ? "rgba(13,122,110,0.3)" : "transparent",
                  color: isActive ? "#5dd6c8" : "rgba(255,255,255,0.48)",
                  fontSize: 13, fontWeight: isActive ? 600 : 400, textAlign: "left",
                  transition: "background 0.12s, color 0.12s", marginBottom: 1,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.65 }}>
                  <Icon d={item.icon} size={15} stroke="currentColor" />
                </span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.id === "queue" && (
                  <span style={{ background: T.danger, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 10, padding: "1px 6px", lineHeight: "14px" }}>7</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Doctor card */}
        <div style={{ padding: "10px 10px 14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>M</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dr. Priya Mehta</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>General Medicine</div>
            </div>
            <button onClick={onLogout} title="Logout" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "rgba(255,110,110,0.5)", flexShrink: 0 }}>
              <Icon d={ic.logout} size={14} stroke="currentColor" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { isMobile, isTablet } = useViewport();
  const narrow = isMobile || isTablet;
  return (
    <header style={{
      height: 60, background: T.white, borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", padding: narrow ? "0 16px" : "0 28px",
      gap: 12, flexShrink: 0, position: "sticky", top: 0, zIndex: 30,
    }}>
      {/* Menu toggle (mobile/tablet) */}
      {narrow && (
        <button onClick={onMenuClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.gray, flexShrink: 0 }}>
          <Icon d={ic.menu} size={20} stroke="currentColor" />
        </button>
      )}

      {/* Logo on mobile */}
      {narrow && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.heart} size={13} stroke="#fff" />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>MediKiosk</span>
        </div>
      )}

      {/* Online status (desktop) */}
      {!narrow && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.success }} />
          <span style={{ fontSize: 12, color: T.success, fontWeight: 600 }}>Online</span>
        </div>
      )}

      <div style={{ flex: 1 }} />

      {/* Date — desktop only */}
      {!isMobile && (
        <span style={{ fontSize: 12, color: T.grayLight, whiteSpace: "nowrap" }}>Wed, Sep 10 2026</span>
      )}

      {/* Divider */}
      {!narrow && <div style={{ width: 1, height: 26, background: T.border }} />}

      {/* Notifications */}
      <div style={{ position: "relative", cursor: "pointer", padding: 4 }}>
        <Icon d={ic.bell} size={19} stroke={T.gray} />
        <span style={{
          position: "absolute", top: 0, right: 0, width: 14, height: 14,
          background: T.danger, borderRadius: "50%",
          fontSize: 8, color: "#fff", fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>4</span>
      </div>

      {/* Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>M</div>
        {!isMobile && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, lineHeight: 1.2 }}>Dr. Priya Mehta</div>
            <div style={{ fontSize: 10, color: T.grayLight }}>General Medicine</div>
          </div>
        )}
        {!isMobile && <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />}
      </div>
    </header>
  );
}

// ─── Metric card ──────────────────────────────────────────────────────────────
function MetricCard({
  label, value, sub, color, icon, alert,
}: { label: string; value: number; sub: string; color: string; icon: string; alert?: boolean }) {
  return (
    <div style={{
      flex: 1, minWidth: 0, padding: "16px 18px",
      background: T.white, border: `1px solid ${alert ? color + "50" : T.border}`,
      borderTop: `3px solid ${color}`,
      borderRadius: 10, display: "flex", gap: 14, alignItems: "center",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 9, flexShrink: 0,
        background: color + "12",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon d={icon} size={18} stroke={color} />
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 700, color: alert ? color : T.navy, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginTop: 3 }}>{label}</div>
        <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}

// ─── Priority + Status badges ─────────────────────────────────────────────────
function PriorityBadge({ priority }: { priority: Priority }) {
  const cfg = PRIORITY_CFG[priority];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, letterSpacing: "0.04em" }}>{cfg.label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: QueueStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, color: cfg.color,
      background: cfg.bg, border: `1px solid ${cfg.border}`,
      padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap" as const,
    }}>
      {cfg.label}
    </span>
  );
}

// ─── Queue table (desktop) ────────────────────────────────────────────────────
type Filter = "All" | "High Priority" | "Waiting" | "In Consultation" | "Completed";
const FILTER_OPTS: Filter[] = ["All", "High Priority", "Waiting", "In Consultation", "Completed"];

function QueueTable({
  patients, selected, onSelect,
}: { patients: QueuePatient[]; selected: string | null; onSelect: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const { isMobile } = useViewport();

  const filtered = patients.filter((p) => {
    const fMatch =
      filter === "All" ? true :
      filter === "High Priority" ? p.priority === "high" :
      filter === "Waiting" ? p.status === "waiting" :
      filter === "In Consultation" ? p.status === "in-consultation" :
      filter === "Completed" ? p.status === "completed" : true;
    const q = search.toLowerCase();
    const sMatch = !q || p.name.toLowerCase().includes(q) || p.chiefComplaint.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    return fMatch && sMatch;
  });

  const waitingCount = patients.filter((p) => p.status === "waiting").length;

  if (isMobile) {
    // Mobile card list
    return (
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <MobileQueueHeader
          waitingCount={waitingCount} filter={filter} setFilter={setFilter}
          search={search} setSearch={setSearch} focused={focused} setFocused={setFocused}
        />
        {filtered.length === 0 ? (
          <div style={{ padding: "28px 16px", textAlign: "center", color: T.grayLight, fontSize: 13 }}>No patients match.</div>
        ) : filtered.map((p) => (
          <MobileQueueRow key={p.id} patient={p} selected={selected === p.id} onSelect={onSelect} />
        ))}
      </div>
    );
  }

  const COLS = [{ w: 88 }, { f: 1 }, { w: 88 }, { f: 1 }, { w: 80 }, { w: 148 }, { w: 84 }];

  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" as const }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>Patient Queue</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.danger, background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, padding: "2px 9px", borderRadius: 20 }}>
          {waitingCount} waiting
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}>
            <Icon d={ic.search} size={14} stroke={T.grayLight} />
          </span>
          <input
            type="text" placeholder="Search patient, ID..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{
              padding: "7px 12px 7px 30px", fontSize: 13, color: T.navy,
              border: `1px solid ${focused ? T.primary : T.border}`, borderRadius: 8,
              background: T.muted, outline: "none", width: 200, transition: "border-color 0.15s",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          />
        </div>
        <div style={{ display: "flex", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, padding: 3, gap: 1 }}>
          {FILTER_OPTS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "5px 10px", borderRadius: 6, border: "none", cursor: "pointer",
              background: filter === f ? T.white : "transparent",
              boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              fontSize: 11, fontWeight: filter === f ? 600 : 400,
              color: filter === f ? T.navy : T.gray,
              fontFamily: "Inter, system-ui, sans-serif", transition: "all 0.12s", whiteSpace: "nowrap" as const,
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div style={{ display: "flex", alignItems: "center", height: 38, padding: "0 20px", gap: 12, background: T.muted, borderBottom: `1px solid ${T.border}` }}>
        {["Priority", "Patient", "Age / Sex", "Chief Complaint", "Wait", "Status", "Action"].map((h, i) => (
          <div key={h} style={{ ...(COLS[i].f ? { flex: COLS[i].f } : { width: COLS[i].w }), fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em" }}>
            {h.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Rows */}
      {filtered.length === 0 ? (
        <div style={{ padding: "32px 20px", textAlign: "center", color: T.grayLight, fontSize: 13 }}>No patients match the current filter.</div>
      ) : filtered.map((p) => {
        const sel = selected === p.id;
        const highWaiting = p.priority === "high" && p.status === "waiting";
        return (
          <div key={p.id} onClick={() => onSelect(p.id)} style={{
            display: "flex", alignItems: "center", padding: "12px 20px",
            borderBottom: `1px solid ${T.border}`, gap: 12, cursor: "pointer",
            background: sel ? T.primaryLight : highWaiting ? "#fff8f8" : T.white,
            borderLeft: sel ? `3px solid ${T.primary}` : highWaiting ? `3px solid ${T.danger}` : "3px solid transparent",
            transition: "background 0.12s",
          }}>
            <div style={{ ...(COLS[0].f ? { flex: COLS[0].f } : { width: COLS[0].w }) }}>
              <PriorityBadge priority={p.priority} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ fontSize: 11, color: T.grayLight }}>{p.id}</div>
            </div>
            <div style={{ width: 88 }}>
              <span style={{ fontSize: 13, color: T.navy }}>{p.age} / {p.gender}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: T.navy, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{p.chiefComplaint}</div>
              <div style={{ fontSize: 11, color: T.grayLight }}>{p.duration}</div>
            </div>
            <div style={{ width: 80 }}>
              {p.status === "waiting" ? (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon d={ic.clock} size={12} stroke={p.waitMins > 15 ? T.danger : T.gray} />
                  <span style={{ fontSize: 13, fontWeight: p.waitMins > 15 ? 600 : 400, color: p.waitMins > 15 ? T.danger : T.navy }}>{p.waitMins}m</span>
                </div>
              ) : <span style={{ fontSize: 12, color: T.grayLight }}>—</span>}
            </div>
            <div style={{ width: 148 }}>
              <StatusBadge status={p.status} />
            </div>
            <div style={{ width: 84 }}>
              {p.status !== "completed" && (
                <button onClick={(e) => { e.stopPropagation(); onSelect(p.id); }} style={{
                  padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                  background: sel ? T.primary : T.white, color: sel ? "#fff" : T.primary,
                  border: `1px solid ${T.primaryBorder}`, borderRadius: 7,
                  fontFamily: "Inter, system-ui, sans-serif", transition: "all 0.12s",
                }}>Review</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Mobile queue toolbar ─────────────────────────────────────────────────────
function MobileQueueHeader({
  waitingCount, filter, setFilter, search, setSearch, focused, setFocused,
}: {
  waitingCount: number; filter: Filter; setFilter: (f: Filter) => void;
  search: string; setSearch: (s: string) => void; focused: boolean; setFocused: (v: boolean) => void;
}) {
  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>Patient Queue</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.danger, background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, padding: "2px 7px", borderRadius: 20 }}>{waitingCount} waiting</span>
      </div>
      <div style={{ padding: "0 16px 10px", position: "relative" }}>
        <span style={{ position: "absolute", left: 25, top: "50%", transform: "translateY(-50%)" }}>
          <Icon d={ic.search} size={14} stroke={T.grayLight} />
        </span>
        <input
          type="text" placeholder="Search patient..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: "8px 12px 8px 30px", fontSize: 13, color: T.navy,
            border: `1px solid ${focused ? T.primary : T.border}`, borderRadius: 8,
            background: T.muted, outline: "none",
            fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const,
          }}
        />
      </div>
      <div style={{ display: "flex", padding: "0 16px 10px", gap: 6, overflowX: "auto" as const }}>
        {FILTER_OPTS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "5px 12px", borderRadius: 20, border: `1px solid ${filter === f ? T.primary : T.border}`,
            background: filter === f ? T.primary : T.white, color: filter === f ? "#fff" : T.gray,
            fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" as const,
            fontFamily: "Inter, system-ui, sans-serif",
          }}>{f}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile queue row ─────────────────────────────────────────────────────────
function MobileQueueRow({ patient: p, selected, onSelect }: { patient: QueuePatient; selected: boolean; onSelect: (id: string) => void }) {
  const highWaiting = p.priority === "high" && p.status === "waiting";
  return (
    <div onClick={() => onSelect(p.id)} style={{
      padding: "12px 16px", borderBottom: `1px solid ${T.border}`, cursor: "pointer",
      background: selected ? T.primaryLight : highWaiting ? "#fff8f8" : T.white,
      borderLeft: selected ? `3px solid ${T.primary}` : highWaiting ? `3px solid ${T.danger}` : "3px solid transparent",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{p.name}</div>
          <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>{p.id} · {p.age} yrs / {p.gender}</div>
        </div>
        <PriorityBadge priority={p.priority} />
      </div>
      <div style={{ fontSize: 12, color: T.navy, marginBottom: 6 }}>{p.chiefComplaint} <span style={{ color: T.grayLight }}>· {p.duration}</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <StatusBadge status={p.status} />
        {p.status === "waiting" && (
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: p.waitMins > 15 ? T.danger : T.gray, fontWeight: p.waitMins > 15 ? 600 : 400 }}>
            <Icon d={ic.clock} size={12} stroke="currentColor" />
            {p.waitMins}m wait
          </span>
        )}
        {p.status !== "completed" && (
          <button onClick={(e) => { e.stopPropagation(); onSelect(p.id); }} style={{
            marginLeft: "auto", padding: "5px 14px", fontSize: 12, fontWeight: 600,
            background: selected ? T.primary : T.white, color: selected ? "#fff" : T.primary,
            border: `1px solid ${T.primaryBorder}`, borderRadius: 7, cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
          }}>Review</button>
        )}
      </div>
    </div>
  );
}

// ─── Patient detail panel ─────────────────────────────────────────────────────
function PatientPanel({
  patient, onClose, onOpenRecord, onStartConsult, onCreateRx,
}: { patient: QueuePatient | null; onClose?: () => void; onOpenRecord?: () => void; onStartConsult?: () => void; onCreateRx?: () => void }) {
  const [tlOpen, setTlOpen] = useState(true);

  if (!patient) {
    return (
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, padding: "40px 20px", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.muted, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <Icon d={ic.user} size={22} stroke={T.grayLight} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 4 }}>No patient selected</div>
        <p style={{ fontSize: 12, color: T.grayLight, margin: 0, lineHeight: 1.5 }}>Click <strong>Review</strong> on any patient row to view their clinical summary here.</p>
      </div>
    );
  }

  const rCfg = RISK_CFG[patient.risk];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Identity card */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        {/* Strip */}
        <div style={{ padding: "14px 16px", background: T.navy, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {patient.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{patient.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
              {patient.age} years · {patient.gender === "M" ? "Male" : "Female"} · {patient.id}
            </div>
          </div>
          <div style={{ flexShrink: 0, display: "flex", gap: 8, alignItems: "center" }}>
            <PriorityBadge priority={patient.priority} />
            {onClose && (
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 2 }}>
                <Icon d={ic.x} size={14} stroke="currentColor" />
              </button>
            )}
          </div>
        </div>

        {/* Quick facts */}
        <div>
          {[
            { label: "Chief complaint",   value: patient.chiefComplaint },
            { label: "Duration",          value: patient.duration       },
            { label: "Allergies",         value: patient.allergies      },
            { label: "Current medicines", value: patient.medicines      },
          ].map((row, i) => (
            <div key={row.label} style={{ display: "flex", gap: 10, padding: "8px 16px", borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
              <span style={{ fontSize: 11, color: T.grayLight, minWidth: 130, flexShrink: 0, paddingTop: 1 }}>{row.label}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: T.navy, lineHeight: 1.45 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical insight */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.amber}`, borderRadius: "0 11px 11px 0", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Icon d={ic.activity} size={14} stroke={T.amber} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>Clinical Intelligence</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: rCfg.color, background: rCfg.bg, border: `1px solid ${rCfg.border}`, padding: "2px 9px", borderRadius: 20 }}>
              Risk: {patient.risk}
            </span>
          </div>
          <p style={{ fontSize: 10, color: T.grayLight, margin: 0, fontStyle: "italic" }}>
            Preliminary clinical insight — not a diagnosis
          </p>
        </div>

        <div style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>POSSIBLE CONSIDERATIONS</div>
          {patient.considerations.map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 5,
              padding: i === 0 ? "7px 10px" : "3px 10px",
              background: i === 0 ? T.muted : "transparent",
              border: i === 0 ? `1px solid ${T.border}` : "none",
              borderRadius: i === 0 ? 7 : 0,
            }}>
              <span style={{
                fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight,
                border: `1px solid ${T.primaryBorder}`, width: 16, height: 16,
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{i + 1}</span>
              <span style={{ fontSize: 12, color: T.navy, fontWeight: i === 0 ? 500 : 400, flex: 1 }}>{c}</span>
              {i === 0 && (
                <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 6px", borderRadius: 20 }}>Most likely</span>
              )}
            </div>
          ))}

          {patient.missing.length > 0 && (
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 7 }}>MISSING INFORMATION</div>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
                {patient.missing.map((m) => (
                  <span key={m} style={{ fontSize: 11, color: "#78350f", background: T.amberLight, border: `1px solid ${T.amberBorder}`, padding: "2px 9px", borderRadius: 20 }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Patient timeline */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <button onClick={() => setTlOpen((v) => !v)} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", background: "none", border: "none", cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={ic.clock} size={14} stroke={T.gray} />
            <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>Patient Timeline</span>
          </div>
          <Icon d={tlOpen ? ic.chevUp : ic.chevDown} size={13} stroke={T.grayLight} />
        </button>
        {tlOpen && (
          <div style={{ padding: "4px 16px 14px", borderTop: `1px solid ${T.border}` }}>
            {patient.timeline.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", paddingBottom: i < patient.timeline.length - 1 ? 14 : 0, position: "relative" }}>
                {i < patient.timeline.length - 1 && (
                  <div style={{ position: "absolute", left: 11, top: 22, bottom: 0, width: 1, background: T.border }} />
                )}
                <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 2, background: item.dot + "18", border: `1.5px solid ${item.dot}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.dot }} />
                </div>
                <div style={{ paddingTop: 2 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={onOpenRecord} style={{
          width: "100%", padding: "10px 16px",
          background: T.white, border: `1px solid ${T.border}`, borderRadius: 9,
          fontSize: 13, fontWeight: 500, color: T.navy, cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <Icon d={ic.fileText} size={15} stroke={T.gray} />
          Open Patient Record
        </button>
        <button onClick={onCreateRx} style={{
          width: "100%", padding: "10px 16px",
          background: T.white, border: `1px solid ${T.primaryBorder}`, borderRadius: 9,
          fontSize: 13, fontWeight: 600, color: T.primary, cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <Icon d={ic.edit} size={15} stroke={T.primary} />
          Create Prescription
        </button>
        <button onClick={onStartConsult} style={{
          width: "100%", padding: "11px 16px",
          background: T.primary, border: "none", borderRadius: 9,
          fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <Icon d={ic.video} size={15} stroke="#fff" />
          Start Consultation
        </button>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function DoctorDashboard({
  onLogout,
  onOpenRecord,
  onStartConsult,
  onCreateRx,
  hideSidebar = false,
  onNavigate,
}: {
  onLogout: () => void;
  onOpenRecord?: () => void;
  onStartConsult?: () => void;
  onCreateRx?: () => void;
  hideSidebar?: boolean;
  onNavigate?: (s: string) => void;
}) {
  const { isMobile, isTablet, isDesktop } = useViewport();
  const narrow = isMobile || isTablet;
  const [activeNav, setActiveNav] = useState("queue");
  const [selectedId, setSelectedId] = useState<string | null>("MK-00421");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const selectedPatient = QUEUE.find((p) => p.id === selectedId) ?? null;

  function handleSelect(id: string) {
    setSelectedId(id);
    if (isMobile) setPanelOpen(true);
  }

  const openRecord = onOpenRecord || (() => onNavigate && onNavigate("record"));
  const startConsult = onStartConsult || (() => onNavigate && onNavigate("consult"));
  const createRx = onCreateRx || (() => onNavigate && onNavigate("prescription"));

  return (
    <div style={{
      display: "flex", minHeight: "100%", background: T.bg,
      fontFamily: "Inter, system-ui, sans-serif", color: T.navy, width: "100%",
    }}>
      {!hideSidebar && (
        <Sidebar
          active={activeNav} setActive={setActiveNav} onLogout={onLogout}
          open={sidebarOpen} onClose={() => setSidebarOpen(false)}
          onNavigate={onNavigate}
        />
      )}

      {/* Mobile patient panel overlay */}
      {isMobile && panelOpen && selectedPatient && (
        <>
          <div onClick={() => setPanelOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,31,61,0.45)", zIndex: 40, backdropFilter: "blur(2px)" }} />
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
            background: T.bg, borderRadius: "16px 16px 0 0",
            padding: "16px 16px 32px", overflowY: "auto" as const,
            maxHeight: "85vh",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
          }}>
            <div style={{ width: 36, height: 4, background: T.border, borderRadius: 2, margin: "0 auto 16px" }} />
            <PatientPanel patient={selectedPatient} onClose={() => setPanelOpen(false)} onOpenRecord={openRecord} onStartConsult={startConsult} onCreateRx={createRx} />
          </div>
        </>
      )}

      {/* Main column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div style={{ flex: 1, padding: narrow ? "16px 16px 40px" : "28px 28px 48px" }}>

          {/* Greeting */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: isMobile ? 19 : 23, fontWeight: 700, color: T.navy, margin: "0 0 5px", letterSpacing: "-0.02em" }}>
              Good morning, Dr. Mehta
            </h1>
            <p style={{ fontSize: 13, color: T.gray, margin: 0 }}>
              Here is today's patient care overview.
            </p>
          </div>

          {/* Metrics */}
          <div style={{
            display: "flex", gap: 12, marginBottom: 24,
            flexWrap: isMobile ? "wrap" as const : "nowrap" as const,
          }}>
            <MetricCard label="Today's Patients"  value={24} sub="Total scheduled"       color={T.primary} icon={ic.users}      />
            <MetricCard label="Waiting"           value={7}  sub="In queue now"           color={T.danger}  icon={ic.clock}       alert />
            <MetricCard label="In Consultation"   value={3}  sub="Active sessions"        color={T.primary} icon={ic.stethoscope} />
            <MetricCard label="Follow-ups"        value={3}  sub="Pending today"          color={T.amber}   icon={ic.calendar}    />
          </div>

          {/* Two-column grid or stacked */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "minmax(0,1fr) 300px" : "1fr",
            gap: 20, alignItems: "start",
          }}>
            <QueueTable
              patients={QUEUE}
              selected={selectedId}
              onSelect={handleSelect}
            />
            {/* Panel — only on tablet+ */}
            {!isMobile && (
              <PatientPanel patient={selectedPatient} onOpenRecord={openRecord} onStartConsult={startConsult} onCreateRx={createRx} />
            )}
          </div>

          {/* Tablet: panel below table */}
          {isTablet && selectedPatient && (
            <div style={{ marginTop: 20 }}>
              <PatientPanel patient={selectedPatient} onOpenRecord={openRecord} onStartConsult={startConsult} onCreateRx={createRx} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

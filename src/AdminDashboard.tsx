import { useState } from "react";

// ─── Icon ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }: {
  d: string; size?: number; stroke?: string; fill?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ic = {
  heart:        "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  dashboard:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  patients:     "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  hospitals:    "M3 21h18M3 7l9-4 9 4M4 11h16v10H4z M9 21v-6h6v6",
  doctors:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M22 11a4 4 0 01-4 4M18 7a4 4 0 014 4",
  pharmacy:     "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  labs:         "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0a2 2 0 002 2h6a2 2 0 002-2M9 14H5a2 2 0 01-2-2V9m0 0h18",
  appts:        "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  consult:      "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  rx:           "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  orders:       "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  abha:         "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  verify:       "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  audit:        "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  syshealth:    "M22 12h-4l-3 9L9 3l-3 9H2",
  settings:     "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  logout:       "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  search:       "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  bell:         "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  chevDown:     "M19 9l-7 7-7-7",
  chevRight:    "M9 18l6-6-6-6",
  check:        "M20 6L9 17l-5-5",
  checkCircle:  "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  shieldCheck:  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  xCircle:      "M12 2a10 10 0 100 20A10 10 0 0012 2zM15 9l-6 6M9 9l6 6",
  info:         "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  alertTri:     "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  clock:        "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  arrowRight:   "M5 12h14M12 5l7 7-7 7",
  user:         "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  fileText:     "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  mapPin:       "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  activity:     "M22 12h-4l-3 9L9 3l-3 9H2",
  server:       "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  database:     "M12 2C8.13 2 5 3.34 5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5c0-1.66-3.13-3-7-3zM5 12c0 1.66 3.13 3 7 3s7-1.34 7-3M5 8c0 1.66 3.13 3 7 3s7-1.34 7-3",
  cpu:          "M18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2zM9 9h6v6H9z M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3",
  brain:        "M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7H4a2 2 0 000 4h.5A2.5 2.5 0 017 13.5v0A2.5 2.5 0 019.5 16v0A2.5 2.5 0 0112 18.5V20a2 2 0 004 0v-1.5A2.5 2.5 0 0118.5 16v0A2.5 2.5 0 0121 13.5V12a2 2 0 000-4v-.5A2.5 2.5 0 0118.5 5v0A2.5 2.5 0 0116 2.5V2",
  mail:         "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  upload:       "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  globe:        "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  truck:        "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  package:      "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
  lock:         "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  link:         "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  eye:          "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  trending:     "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  refresh:      "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
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
  purpleLight:   "#f5f3ff",
  purpleBorder:  "#ddd6fe",
};

// ─── Nav definition ───────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",      icon: ic.dashboard  },
  { id: "patients",    label: "Patients",        icon: ic.patients   },
  { id: "hospitals",   label: "Hospitals",       icon: ic.hospitals  },
  { id: "doctors",     label: "Doctors",         icon: ic.doctors    },
  { id: "pharmacies",  label: "Pharmacies",      icon: ic.pharmacy   },
  { id: "labs",        label: "Labs",            icon: ic.labs       },
  { id: "appts",       label: "Appointments",    icon: ic.appts      },
  { id: "consult",     label: "Consultations",   icon: ic.consult    },
  { id: "rx",          label: "Prescriptions",   icon: ic.rx         },
  { id: "orders",      label: "Orders",          icon: ic.orders     },
  { id: "abha",        label: "ABHA / ABDM",     icon: ic.abha       },
  { id: "verify",      label: "Verification",    icon: ic.verify,    badge: 24 },
  { id: "audit",       label: "Audit Logs",      icon: ic.audit      },
  { id: "syshealth",   label: "System Health",   icon: ic.syshealth  },
  { id: "settings",    label: "Settings",        icon: ic.settings   },
];

// ─── Small reusable parts ─────────────────────────────────────────────────────
function Pill({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, background: bg, border: `1px solid ${border}`, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function SectionHead({ title, action, actionLabel }: { title: string; action?: () => void; actionLabel?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</span>
      {actionLabel && (
        <button onClick={action} style={{ fontSize: 11, fontWeight: 600, color: T.primary, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter, system-ui, sans-serif" }}>
          {actionLabel}
          <Icon d={ic.arrowRight} size={12} stroke={T.primary} />
        </button>
      )}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardPad({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "16px 18px" }}>{children}</div>;
}

// ─── Stat tile ────────────────────────────────────────────────────────────────
function StatTile({ label, value, icon, color, sub, trend }: {
  label: string; value: string; icon: string; color: string; sub?: string; trend?: "up" | "down" | "neutral";
}) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ width: 38, height: 38, borderRadius: 9, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={17} stroke={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: T.navy, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 11, color: T.gray, marginTop: 3, lineHeight: 1.3 }}>{label}</div>
        {sub && (
          <div style={{ fontSize: 10, color: trend === "up" ? T.success : trend === "down" ? T.danger : T.grayLight, marginTop: 4, fontWeight: 500 }}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "·"} {sub}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Mini bar chart (SVG, no library) ────────────────────────────────────────
const CONSULT_BARS = [
  { label: "Mon", val: 210 },
  { label: "Tue", val: 248 },
  { label: "Wed", val: 196 },
  { label: "Thu", val: 271 },
  { label: "Fri", val: 304 },
  { label: "Sat", val: 182 },
  { label: "Today", val: 286 },
];
const maxVal = Math.max(...CONSULT_BARS.map((b) => b.val));

function MiniBarChart() {
  const W = 280, H = 80, pad = 4;
  const barW = (W - pad * (CONSULT_BARS.length + 1)) / CONSULT_BARS.length;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 18}`} style={{ display: "block" }}>
      {CONSULT_BARS.map((b, i) => {
        const barH = Math.max(4, (b.val / maxVal) * H);
        const x = pad + i * (barW + pad);
        const y = H - barH;
        const isToday = b.label === "Today";
        return (
          <g key={b.label}>
            <rect x={x} y={y} width={barW} height={barH} rx="3"
              fill={isToday ? T.primary : T.border} />
            <text x={x + barW / 2} y={H + 14} textAnchor="middle"
              fontSize="8" fill={isToday ? T.primary : T.grayLight} fontWeight={isToday ? "700" : "400"}>
              {b.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Service health dot ───────────────────────────────────────────────────────
function ServiceRow({ name, status, latency }: { name: string; status: "operational" | "degraded" | "down"; latency: string }) {
  const cfg = {
    operational: { color: T.success, bg: T.successLight, border: T.successBorder, label: "Operational" },
    degraded:    { color: T.amber,   bg: T.amberLight,   border: T.amberBorder,   label: "Degraded"    },
    down:        { color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder,  label: "Down"        },
  }[status];
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.color, flexShrink: 0, marginRight: 10 }} />
      <span style={{ fontSize: 12, fontWeight: 500, color: T.navy, flex: 1 }}>{name}</span>
      <span style={{ fontSize: 10, color: T.grayLight, marginRight: 12 }}>{latency}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, padding: "1px 8px", borderRadius: 10 }}>{cfg.label}</span>
    </div>
  );
}

// ─── Timeline event ───────────────────────────────────────────────────────────
function TimelineEvent({ icon, color, iconBg, title, sub, time, last }: {
  icon: string; color: string; iconBg: string; title: string; sub: string; time: string; last?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 12, paddingBottom: last ? 0 : 16, position: "relative" }}>
      {!last && <div style={{ position: "absolute", left: 14, top: 30, bottom: 0, width: 1, background: T.border }} />}
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: iconBg, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
        <Icon d={icon} size={13} stroke={color} />
      </div>
      <div style={{ flex: 1, paddingTop: 2 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{title}</div>
        <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{sub}</div>
      </div>
      <div style={{ fontSize: 10, color: T.grayLight, flexShrink: 0, paddingTop: 3 }}>{time}</div>
    </div>
  );
}

// ─── Audit row ────────────────────────────────────────────────────────────────
function AuditRow({ icon, color, event, user, module, time }: {
  icon: string; color: string; event: string; user: string; module: string; time: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: color + "12", border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={12} stroke={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{event}</div>
        <div style={{ fontSize: 10, color: T.gray, marginTop: 1 }}>{user} · {module}</div>
      </div>
      <div style={{ fontSize: 10, color: T.grayLight, flexShrink: 0 }}>{time}</div>
    </div>
  );
}

// ─── Verification queue row ───────────────────────────────────────────────────
type VType = "hospital" | "doctor" | "pharmacy" | "lab";
const VT_CFG: Record<VType, { color: string; bg: string; border: string; label: string; icon: string }> = {
  hospital: { color: T.primary, bg: T.primaryLight, border: T.primaryBorder, label: "Hospital", icon: ic.hospitals },
  doctor:   { color: T.purple,  bg: T.purpleLight,  border: T.purpleBorder,  label: "Doctor",   icon: ic.doctors  },
  pharmacy: { color: T.blue,    bg: T.blueLight,    border: T.blueBorder,    label: "Pharmacy", icon: ic.pharmacy },
  lab:      { color: T.amber,   bg: T.amberLight,   border: T.amberBorder,   label: "Lab",      icon: ic.labs     },
};

interface VItem { id: string; name: string; type: VType; location: string; submitted: string; status: "pending" | "docs-pending" | "more-info" }
const V_STATUS = {
  pending:      { label: "Pending Review",   color: T.amber,  bg: T.amberLight,  border: T.amberBorder  },
  "docs-pending":{ label: "Docs Pending",    color: T.blue,   bg: T.blueLight,   border: T.blueBorder   },
  "more-info":  { label: "Info Requested",   color: T.purple, bg: T.purpleLight, border: T.purpleBorder },
};

const VQUEUE: VItem[] = [
  { id: "v1", name: "AyurCare Hospital",         type: "hospital", location: "Jaipur, Rajasthan",        submitted: "10 Sep 2026", status: "pending"       },
  { id: "v2", name: "Dr. Mehta",                 type: "doctor",   location: "Jaipur, Rajasthan",        submitted: "10 Sep 2026", status: "pending"       },
  { id: "v3", name: "Swasthya Wellness Centre",  type: "hospital", location: "New Delhi",                submitted: "09 Sep 2026", status: "docs-pending"  },
  { id: "v4", name: "MedPlus Pharmacy",          type: "pharmacy", location: "Mumbai, Maharashtra",      submitted: "09 Sep 2026", status: "pending"       },
  { id: "v5", name: "Dr. Priya Sharma",          type: "doctor",   location: "Jaipur, Rajasthan",        submitted: "09 Sep 2026", status: "docs-pending"  },
  { id: "v6", name: "Thyrocare Labs",             type: "lab",      location: "Thane, Maharashtra",       submitted: "08 Sep 2026", status: "more-info"     },
];

// ─── Network network numbers ──────────────────────────────────────────────────
const NETWORK = [
  { label: "Verified Hospitals",    value: "148", color: T.primary,  icon: ic.hospitals, sub: "8 states"       },
  { label: "Active Doctors",        value: "1,284", color: T.purple, icon: ic.doctors,   sub: "Across 12 systems" },
  { label: "Verified Pharmacies",   value: "326",  color: T.blue,    icon: ic.pharmacy,  sub: "18 cities"      },
  { label: "Diagnostic Centres",    value: "94",   color: T.amber,   icon: ic.labs,      sub: "6 accredited"   },
];

// ─── Root component ───────────────────────────────────────────────────────────
export default function AdminDashboard({
  onBack,
  hideSidebar = false,
  onNavigate,
}: {
  onBack: () => void;
  hideSidebar?: boolean;
  onNavigate?: (s: string) => void;
}) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQ,   setSearchQ]   = useState("");
  const [sFocus,    setSFocus]    = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100%", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, width: "100%" }}>

      {/* ══════════════════════ SIDEBAR ══════════════════════ */}
      {!hideSidebar && (
      <aside style={{ width: 216, minWidth: 216, background: T.navy, display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={ic.heart} size={14} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>MediKiosk</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.07em" }}>ADMIN CONSOLE</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", padding: "6px 8px 4px" }}>PLATFORM</div>
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  if (onNavigate) {
                    if (item.id === "hospitals" || item.id === "verify") onNavigate("hospital-verify");
                    else if (item.id === "doctors") onNavigate("doctor-approval");
                    else if (item.id === "patients") onNavigate("record");
                    else if (item.id === "pharmacies") onNavigate("pharmacy-dash");
                    else if (item.id === "labs") onNavigate("lab-dash");
                    else if (item.id === "appts") onNavigate("appt-booking");
                    else if (item.id === "consult") onNavigate("consult");
                    else if (item.id === "rx") onNavigate("prescription");
                    else if (item.id === "orders") onNavigate("order-tracking");
                    else if (item.id === "abha") onNavigate("abha");
                    else if (item.id === "audit") onNavigate("audit");
                    else if (item.id === "syshealth") onNavigate("reports");
                    else if (item.id === "settings") onNavigate("settings");
                  }
                }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 9,
                  padding: "8px 9px", borderRadius: 7, border: "none", cursor: "pointer",
                  background: isActive ? "rgba(13,122,110,0.22)" : "transparent",
                  color: isActive ? "#5dd6c8" : "rgba(255,255,255,0.52)",
                  fontSize: 12, fontWeight: isActive ? 600 : 400, textAlign: "left" as const,
                  transition: "all 0.12s", marginBottom: 1,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                <span style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }}>
                  <Icon d={item.icon} size={14} stroke="currentColor" />
                </span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ background: T.danger, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 9, padding: "1px 5px" }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: logout + admin */}
        <div style={{ padding: "8px 8px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button
            onClick={onBack}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 9px", borderRadius: 7, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,100,100,0.6)", fontSize: 12, textAlign: "left" as const, fontFamily: "Inter, system-ui, sans-serif", marginBottom: 2 }}
          >
            <Icon d={ic.logout} size={14} stroke="currentColor" />
            Exit Admin
          </button>
        </div>
        <div style={{ padding: "10px 12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 9 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>A</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>Platform Admin</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>Super Administrator</div>
            </div>
          </div>
        </div>
      </aside>
      )}

      {/* ══════════════════════ MAIN AREA ══════════════════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* ── Top header ── */}
        <header style={{ height: 58, background: T.white, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 16, flexShrink: 0, position: "sticky", top: 0, zIndex: 10 }}>
          {/* Title */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>Admin Dashboard</div>
            <div style={{ fontSize: 10, color: T.grayLight }}>Monitor the MediKiosk healthcare network and manage platform operations.</div>
          </div>

          {/* Search */}
          <div style={{ position: "relative", width: 220 }}>
            <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ic.search} size={13} stroke={T.grayLight} />
            </span>
            <input
              type="text" placeholder="Search network..."
              value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
              onFocus={() => setSFocus(true)} onBlur={() => setSFocus(false)}
              style={{ width: "100%", padding: "6px 10px 6px 28px", fontSize: 12, color: T.navy, border: `1px solid ${sFocus ? T.primary : T.border}`, borderRadius: 7, background: T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const }}
            />
          </div>

          {/* System status badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.success }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.success }}>All Systems Operational</span>
          </div>

          {/* Bell */}
          <div style={{ position: "relative", cursor: "pointer" }}>
            <Icon d={ic.bell} size={18} stroke={T.gray} />
            <span style={{ position: "absolute", top: -3, right: -4, width: 14, height: 14, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>5</span>
          </div>
          <div style={{ width: 1, height: 26, background: T.border }} />

          {/* Admin avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>A</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>Platform Admin</div>
              <div style={{ fontSize: 9, color: T.grayLight }}>Super Administrator</div>
            </div>
            <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />
          </div>
        </header>

        {/* ── Scrollable body ── */}
        <div style={{ flex: 1, padding: "22px 24px 48px" }}>

          {/* ══ 1. STAT TILES ══ */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 22 }}>
            <StatTile label="Total Patients"        value="12,480" icon={ic.patients}   color={T.primary} sub="+124 this week"  trend="up"      />
            <StatTile label="Verified Hospitals"    value="148"    icon={ic.hospitals}  color={T.blue}    sub="8 pending"      trend="neutral"  />
            <StatTile label="Active Doctors"        value="1,284"  icon={ic.doctors}    color={T.purple}  sub="+18 this month" trend="up"       />
            <StatTile label="Verified Pharmacies"   value="326"    icon={ic.pharmacy}   color={T.amber}   sub="18 cities"      trend="neutral"  />
            <StatTile label="Today's Consultations" value="286"    icon={ic.consult}    color={T.primary} sub="↑ 12% vs avg"   trend="up"       />
            <StatTile label="Pending Verifications" value="24"     icon={ic.verify}     color={T.danger}  sub="Action needed"  trend="down"     />
            <StatTile label="Active Orders"         value="174"    icon={ic.orders}     color={T.blue}    sub="62 out for delivery" trend="neutral" />
            <StatTile label="System Uptime"         value="99.5%"  icon={ic.syshealth}  color={T.success} sub="Last 30 days"   trend="neutral"  />
          </div>

          {/* ══ 2. MAIN 2-COL GRID ══ */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 18 }}>

            {/* ── LEFT COLUMN ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* ── Pending Verifications ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Pending Verifications</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.danger, background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, padding: "1px 7px", borderRadius: 12 }}>24 pending</span>
                  </div>
                  <button onClick={() => onNavigate && onNavigate("hospital-verify")} style={{ fontSize: 11, fontWeight: 600, color: T.primary, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                    View all <Icon d={ic.arrowRight} size={12} stroke={T.primary} />
                  </button>
                </div>
                {/* Table head */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 120px 110px 90px", background: T.muted, borderBottom: `1px solid ${T.border}` }}>
                  {["Organisation", "Type", "Location", "Submitted", "Action"].map((h) => (
                    <div key={h} style={{ padding: "8px 14px", fontSize: 9, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em" }}>{h.toUpperCase()}</div>
                  ))}
                </div>
                {VQUEUE.map((v, i) => {
                  const tc = VT_CFG[v.type];
                  const sc = V_STATUS[v.status];
                  return (
                    <div key={v.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 120px 110px 90px", alignItems: "center", borderBottom: i < VQUEUE.length - 1 ? `1px solid ${T.border}` : "none", background: T.white }}>
                      <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: tc.bg, border: `1px solid ${tc.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon d={tc.icon} size={12} stroke={tc.color} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{v.name}</span>
                      </div>
                      <div style={{ padding: "10px 14px" }}>
                        <Pill label={tc.label} color={tc.color} bg={tc.bg} border={tc.border} />
                      </div>
                      <div style={{ padding: "10px 14px", fontSize: 11, color: T.gray }}>{v.location}</div>
                      <div style={{ padding: "10px 14px", fontSize: 11, color: T.gray }}>{v.submitted}</div>
                      <div style={{ padding: "10px 10px" }}>
                        <button onClick={() => onNavigate && onNavigate(v.type === "hospital" ? "hospital-verify" : "doctor-approval")} style={{ padding: "4px 12px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 7, fontSize: 11, fontWeight: 600, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                          Review
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Card>

              {/* ── Today's Care Activity ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{"Today's Care Activity"}</span>
                  <span style={{ fontSize: 10, color: T.grayLight }}>10 September 2026</span>
                </div>
                <div style={{ padding: "16px 18px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 28px", alignItems: "start" }}>
                  {/* Chart */}
                  <div style={{ width: 290 }}>
                    <MiniBarChart />
                    <div style={{ fontSize: 10, color: T.grayLight, textAlign: "center" as const, marginTop: 2 }}>Daily consultations this week</div>
                  </div>
                  {/* Breakdown */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em", marginBottom: 12 }}>CONSULTATIONS · TODAY</div>
                    {[
                      { label: "Scheduled",   value: 86,  color: T.blue   },
                      { label: "In Progress", value: 34,  color: T.amber  },
                      { label: "Completed",   value: 148, color: T.success },
                      { label: "Cancelled",   value: 18,  color: T.danger  },
                    ].map((row) => (
                      <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: row.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: T.gray, flex: 1 }}>{row.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{row.value}</span>
                        {/* Mini bar */}
                        <div style={{ width: 80, height: 5, background: T.border, borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(row.value / 286) * 100}%`, background: row.color, borderRadius: 3 }} />
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: T.gray }}>Total consultations today</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.primary }}>286</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* ── ABHA / ABDM ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon d={ic.abha} size={14} stroke={T.primary} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>ABHA & ABDM Overview</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 7px", borderRadius: 10, marginLeft: "auto" }}>Consent-Protected</span>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
                    {[
                      { label: "Connected Patients",  value: "9,712",  color: T.primary  },
                      { label: "Consent Requests",    value: "1,084",  color: T.amber    },
                      { label: "Active Consents",     value: "7,438",  color: T.success  },
                      { label: "Revoked Consents",    value: "296",    color: T.danger   },
                    ].map((s) => (
                      <div key={s.label} style={{ padding: "12px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, textAlign: "center" as const }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: T.gray, marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "10px 14px", background: T.blueLight, border: `1px solid ${T.blueBorder}`, borderRadius: 8, display: "flex", gap: 8 }}>
                    <Icon d={ic.lock} size={12} stroke={T.blue} />
                    <p style={{ margin: 0, fontSize: 11, color: T.blue, lineHeight: 1.55 }}>
                      Health record access and sharing depend on patient consent. No records are accessed or transmitted without an active consent artefact from the patient.
                    </p>
                  </div>
                </div>
              </Card>

              {/* ── Pharmacy & Orders ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Pharmacy & Orders</span>
                </div>
                <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 14 }}>
                  {[
                    { label: "Today's Orders",    value: "174", icon: ic.package, color: T.blue   },
                    { label: "Preparing",          value: "48",  icon: ic.rx,      color: T.amber  },
                    { label: "Out for Delivery",   value: "62",  icon: ic.truck,   color: T.purple },
                    { label: "Delivered",          value: "64",  icon: ic.check,   color: T.success},
                  ].map((s) => (
                    <div key={s.label} style={{ padding: "12px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: s.color + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon d={s.icon} size={13} stroke={s.color} />
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: T.navy }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: T.gray, marginTop: 2, lineHeight: 1.3 }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Simple order progress */}
                <div style={{ padding: "0 18px 16px" }}>
                  <div style={{ fontSize: 10, color: T.grayLight, marginBottom: 7 }}>Order fulfilment progress today</div>
                  <div style={{ height: 6, background: T.border, borderRadius: 4, overflow: "hidden", display: "flex" }}>
                    {[
                      { w: (64/174)*100, color: T.success },
                      { w: (62/174)*100, color: T.purple  },
                      { w: (48/174)*100, color: T.amber   },
                    ].map((s, i) => (
                      <div key={i} style={{ width: `${s.w}%`, background: s.color, height: "100%" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
                    {[
                      { label: "Delivered",       color: T.success },
                      { label: "Out for Delivery",color: T.purple  },
                      { label: "Preparing",        color: T.amber   },
                    ].map((l) => (
                      <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: l.color }} />
                        <span style={{ fontSize: 10, color: T.gray }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* ── System Health ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>System Health</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.success, background: T.successLight, border: `1px solid ${T.successBorder}`, padding: "2px 9px", borderRadius: 12 }}>5/5 Operational</span>
                </div>
                <div style={{ padding: "6px 18px 8px" }}>
                  <ServiceRow name="API Gateway"           status="operational" latency="42 ms"  />
                  <ServiceRow name="Database Cluster"      status="operational" latency="8 ms"   />
                  <ServiceRow name="AI Clinical Service"   status="operational" latency="210 ms" />
                  <ServiceRow name="OCR Document Service"  status="operational" latency="340 ms" />
                  <div style={{ display: "flex", alignItems: "center", padding: "9px 0" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.success, flexShrink: 0, marginRight: 10 }} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: T.navy, flex: 1 }}>Notification Service</span>
                    <span style={{ fontSize: 10, color: T.grayLight, marginRight: 12 }}>18 ms</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.success, background: T.successLight, border: `1px solid ${T.successBorder}`, padding: "1px 8px", borderRadius: 10 }}>Operational</span>
                  </div>
                </div>
                <div style={{ padding: "10px 18px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 6, alignItems: "center" }}>
                  <Icon d={ic.refresh} size={11} stroke={T.grayLight} />
                  <span style={{ fontSize: 10, color: T.grayLight }}>Last checked: 10 Sep 2026, 09:47 AM · Auto-refresh every 60 s</span>
                </div>
              </Card>

              {/* ── Audit log ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Recent Audit Activity</span>
                  <button onClick={() => onNavigate && onNavigate("audit")} style={{ fontSize: 11, fontWeight: 600, color: T.primary, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                    Full log <Icon d={ic.arrowRight} size={12} stroke={T.primary} />
                  </button>
                </div>
                <div style={{ padding: "4px 18px 10px" }}>
                  <AuditRow icon={ic.lock}       color={T.navy}    event="Admin login"                      user="admin@medikiosk.in"      module="Auth"         time="09:44 AM" />
                  <AuditRow icon={ic.shieldCheck} color={T.success} event="Hospital verification approved"  user="Admin"                   module="Verification" time="09:31 AM" />
                  <AuditRow icon={ic.verify}      color={T.purple}  event="Doctor approval — Dr. Amit Verma" user="Hospital Admin"         module="Approvals"    time="09:18 AM" />
                  <AuditRow icon={ic.abha}        color={T.primary} event="ABHA consent granted"            user="Patient MK-2947"         module="ABDM"         time="08:55 AM" />
                  <AuditRow icon={ic.rx}          color={T.amber}   event="Prescription created"            user="Dr. Priya Mehta"         module="Prescriptions" time="08:42 AM" />
                  <AuditRow icon={ic.fileText}    color={T.blue}    event="Lab report uploaded"             user="Thyrocare Labs"           module="Diagnostics"  time="08:29 AM" />
                </div>
              </Card>

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* ── Healthcare Network ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Healthcare Network</span>
                </div>
                <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {NETWORK.map((n) => (
                    <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: T.muted, borderRadius: 8, border: `1px solid ${T.border}` }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: n.color + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon d={n.icon} size={15} stroke={n.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: T.gray }}>{n.label}</div>
                        <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{n.sub}</div>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: T.navy }}>{n.value}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* ── Platform Activity ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Platform Activity</span>
                </div>
                <CardPad>
                  <TimelineEvent
                    icon={ic.shieldCheck} color={T.success} iconBg={T.successLight}
                    title="Hospital verification approved"
                    sub="AyurCare Hospital · Jaipur"
                    time="09:31 AM"
                  />
                  <TimelineEvent
                    icon={ic.verify} color={T.purple} iconBg={T.purpleLight}
                    title="Doctor approved"
                    sub="Dr. Amit Verma · Panchakarma"
                    time="09:18 AM"
                  />
                  <TimelineEvent
                    icon={ic.rx} color={T.amber} iconBg={T.amberLight}
                    title="Prescription created"
                    sub="Dr. Priya Mehta · Patient MK-2947"
                    time="08:42 AM"
                  />
                  <TimelineEvent
                    icon={ic.pharmacy} color={T.blue} iconBg={T.blueLight}
                    title="Pharmacy order placed"
                    sub="MedPlus Pharmacy · Mumbai"
                    time="08:39 AM"
                  />
                  <TimelineEvent
                    icon={ic.labs} color={T.primary} iconBg={T.primaryLight}
                    title="Lab report uploaded"
                    sub="Thyrocare Labs · HbA1c results"
                    time="08:29 AM"
                    last
                  />
                </CardPad>
              </Card>

              {/* ── Quick verification summary ── */}
              <Card>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Verification Summary</span>
                </div>
                <CardPad>
                  {[
                    { label: "Hospitals",  pending: 8,  verified: 148, color: T.primary },
                    { label: "Doctors",    pending: 12, verified: 1284,color: T.purple  },
                    { label: "Pharmacies", pending: 3,  verified: 326, color: T.blue    },
                    { label: "Labs",       pending: 1,  verified: 94,  color: T.amber   },
                  ].map((row) => (
                    <div key={row.label} style={{ marginBottom: 13 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: T.navy }}>{row.label}</span>
                        <div style={{ display: "flex", gap: 8 }}>
                          <span style={{ fontSize: 10, color: T.danger, fontWeight: 600 }}>{row.pending} pending</span>
                          <span style={{ fontSize: 10, color: T.grayLight }}>·</span>
                          <span style={{ fontSize: 10, color: T.success, fontWeight: 600 }}>{row.verified.toLocaleString()} verified</span>
                        </div>
                      </div>
                      <div style={{ height: 4, background: T.border, borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(row.verified / (row.verified + row.pending)) * 100}%`, background: row.color, borderRadius: 3 }} />
                      </div>
                    </div>
                  ))}
                </CardPad>
              </Card>

              {/* ── Platform notice ── */}
              <div style={{ padding: "14px 16px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <Icon d={ic.info} size={12} stroke={T.primary} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>Smart India Hackathon · SIH 2026</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: T.primary, lineHeight: 1.6 }}>
                  MediKiosk integrates ABHA patient identifiers, ABDM consent workflows, AYUSH facility verification and multi-system medicine support across the national healthcare network.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

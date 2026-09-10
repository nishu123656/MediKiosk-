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
  orders:     "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  rx:         "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  medicines:  "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0a2 2 0 002 2h6a2 2 0 002-2M9 14H5a2 2 0 01-2-2V9m0 0h18",
  inventory:  "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  patients:   "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z",
  delivery:   "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  payments:   "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  reports:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  bell:       "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  settings:   "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  logout:     "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  search:     "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  chevDown:   "M19 9l-7 7-7-7",
  chevRight:  "M9 18l6-6-6-6",
  chevLeft:   "M15 18l-6-6 6-6",
  check:      "M20 6L9 17l-5-5",
  shieldCheck:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  xCircle:    "M12 2a10 10 0 100 20A10 10 0 0012 2zM15 9l-6 6M9 9l6 6",
  alertTri:   "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info:       "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  clock:      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  plus:       "M12 5v14M5 12h14",
  eye:        "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  fileText:   "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  mapPin:     "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  user:       "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  package:    "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
  rupee:      "M6 3h12M6 8h12M6 13h8 M14 13c2 0 4 1 4 4s-2 4-4 4H6",
  edit:       "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  refresh:    "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
  trending:   "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  activity:   "M22 12h-4l-3 9L9 3l-3 9H2",
  verify:     "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
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
  { id: "dashboard",  label: "Dashboard",     icon: ic.dashboard  },
  { id: "orders",     label: "Orders",        icon: ic.orders,    badge: 18 },
  { id: "rx",         label: "Prescriptions", icon: ic.rx         },
  { id: "medicines",  label: "Medicines",     icon: ic.medicines  },
  { id: "inventory",  label: "Inventory",     icon: ic.inventory, badge: 12, badgeColor: T.amber },
  { id: "patients",   label: "Patients",      icon: ic.patients   },
  { id: "delivery",   label: "Delivery",      icon: ic.delivery   },
  { id: "payments",   label: "Payments",      icon: ic.payments   },
  { id: "reports",    label: "Reports",       icon: ic.reports    },
  { id: "notif",      label: "Notifications", icon: ic.bell       },
  { id: "settings",   label: "Settings",      icon: ic.settings   },
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const RX_ORDERS = [
  { id: "RXO-001", patient: "Rahul Sharma",   pid: "MK-2947", rxId: "RX-MK-2026-0481", meds: ["Metformin 500mg", "Atorvastatin 10mg"], time: "09:12 AM", payment: "paid",    doc: "Dr. Priya Mehta"   },
  { id: "RXO-002", patient: "Anita Desai",    pid: "MK-1832", rxId: "RX-MK-2026-0479", meds: ["Amoxicillin 250mg", "Paracetamol 500mg", "ORS Sachet"], time: "09:04 AM", payment: "pending", doc: "Dr. S. Krishnan"    },
  { id: "RXO-003", patient: "Mohammed Rafi",  pid: "MK-3104", rxId: "RX-MK-2026-0476", meds: ["Omeprazole 20mg", "Domperidone 10mg"], time: "08:51 AM", payment: "paid",    doc: "Dr. Kavita Nair"   },
  { id: "RXO-004", patient: "Geeta Pillai",   pid: "MK-0912", rxId: "RX-MK-2026-0474", meds: ["Amlodipine 5mg", "Telmisartan 40mg", "Aspirin 75mg"], time: "08:38 AM", payment: "cod",     doc: "Dr. Amit Verma"    },
];

type OrdStatus = "pending" | "preparing" | "ready" | "out" | "delivered" | "cancelled";
const ORDERS = [
  { id: "ORD-4281", patient: "Rahul Sharma",  area: "Malviya Nagar", meds: 2, amount: "₹840",   status: "preparing" as OrdStatus,  time: "09:12 AM", partner: "Ravi (MK-D41)"  },
  { id: "ORD-4280", patient: "Anita Desai",   area: "C-Scheme",      meds: 3, amount: "₹1,240", status: "pending"   as OrdStatus,  time: "09:04 AM", partner: "—"               },
  { id: "ORD-4279", patient: "Mohammed Rafi", area: "Vaishali Nagar",meds: 2, amount: "₹620",   status: "out"       as OrdStatus,  time: "08:51 AM", partner: "Suresh (MK-D38)" },
  { id: "ORD-4278", patient: "Geeta Pillai",  area: "Bani Park",     meds: 3, amount: "₹1,680", status: "pending"   as OrdStatus,  time: "08:38 AM", partner: "—"               },
  { id: "ORD-4277", patient: "Vikram Singh",  area: "Mansarovar",    meds: 1, amount: "₹360",   status: "delivered" as OrdStatus,  time: "08:20 AM", partner: "Ravi (MK-D41)"  },
  { id: "ORD-4276", patient: "Sunita Agarwal",area: "Shyam Nagar",   meds: 4, amount: "₹2,100", status: "delivered" as OrdStatus,  time: "07:58 AM", partner: "Arjun (MK-D29)" },
  { id: "ORD-4275", patient: "Aarav Mehta",   area: "Jagatpura",     meds: 2, amount: "₹480",   status: "ready"     as OrdStatus,  time: "07:44 AM", partner: "—"               },
  { id: "ORD-4274", patient: "Priya Joshi",   area: "Sanganer",      meds: 3, amount: "₹920",   status: "cancelled" as OrdStatus,  time: "07:30 AM", partner: "—"               },
];

type StockStatus = "ok" | "low" | "critical";
const INVENTORY = [
  { name: "Metformin 500mg",    category: "Antidiabetic",    qty: 248, min: 50,  status: "ok"       as StockStatus },
  { name: "Amoxicillin 250mg",  category: "Antibiotic",      qty: 18,  min: 30,  status: "critical" as StockStatus },
  { name: "Atorvastatin 10mg",  category: "Lipid Lowering",  qty: 94,  min: 40,  status: "ok"       as StockStatus },
  { name: "Paracetamol 500mg",  category: "Analgesic",       qty: 412, min: 100, status: "ok"       as StockStatus },
  { name: "Omeprazole 20mg",    category: "PPI",              qty: 36,  min: 50,  status: "low"      as StockStatus },
  { name: "Amlodipine 5mg",     category: "Antihypertensive",qty: 28,  min: 40,  status: "low"      as StockStatus },
  { name: "Telmisartan 40mg",   category: "Antihypertensive",qty: 61,  min: 40,  status: "ok"       as StockStatus },
  { name: "Domperidone 10mg",   category: "Antiemetic",      qty: 14,  min: 30,  status: "critical" as StockStatus },
  { name: "Aspirin 75mg",       category: "Antiplatelet",    qty: 180, min: 60,  status: "ok"       as StockStatus },
  { name: "Vitamin D3 60K IU",  category: "Supplement",      qty: 22,  min: 30,  status: "low"      as StockStatus },
];

const DELIVERIES = [
  { id: "ORD-4281", area: "Malviya Nagar",  partner: "Ravi Kumar",   phone: "MK-D41", eta: "10:15 AM", status: "en-route"   },
  { id: "ORD-4279", area: "Vaishali Nagar", partner: "Suresh Patel", phone: "MK-D38", eta: "10:00 AM", status: "en-route"   },
  { id: "ORD-4275", area: "Jagatpura",      partner: "—",            phone: "—",      eta: "—",        status: "ready"      },
  { id: "ORD-4277", area: "Mansarovar",     partner: "Ravi Kumar",   phone: "MK-D41", eta: "—",        status: "delivered"  },
  { id: "ORD-4276", area: "Shyam Nagar",    partner: "Arjun Yadav",  phone: "MK-D29", eta: "—",        status: "delivered"  },
];

const RX_VERIFY = [
  { id: "RX-MK-2026-0481", patient: "Rahul Sharma",   doc: "Dr. Priya Mehta",  uploaded: "09:11 AM", status: "verified"   },
  { id: "RX-MK-2026-0479", patient: "Anita Desai",    doc: "Dr. S. Krishnan",  uploaded: "09:03 AM", status: "pending"    },
  { id: "RX-MK-2026-0476", patient: "Mohammed Rafi",  doc: "Dr. Kavita Nair",  uploaded: "08:50 AM", status: "verified"   },
  { id: "RX-MK-2026-0474", patient: "Geeta Pillai",   doc: "Dr. Amit Verma",   uploaded: "08:37 AM", status: "pending"    },
];

// Revenue last 7 days
const REVENUE = [
  { day: "Wed", amt: 38400 },
  { day: "Thu", amt: 42100 },
  { day: "Fri", amt: 51800 },
  { day: "Sat", amt: 29600 },
  { day: "Sun", amt: 22400 },
  { day: "Mon", amt: 44900 },
  { day: "Today", amt: 48620 },
];
const maxRev = Math.max(...REVENUE.map((r) => r.amt));

// ─── Status configs ───────────────────────────────────────────────────────────
const ORD_STATUS: Record<OrdStatus, { label: string; color: string; bg: string; border: string }> = {
  pending:   { label: "Pending",        color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  preparing: { label: "Preparing",      color: T.blue,    bg: T.blueLight,    border: T.blueBorder    },
  ready:     { label: "Ready",          color: T.primary, bg: T.primaryLight, border: T.primaryBorder },
  out:       { label: "Out for Delivery", color: T.purple, bg: T.purpleLight, border: T.purpleBorder  },
  delivered: { label: "Delivered",      color: T.success, bg: T.successLight, border: T.successBorder },
  cancelled: { label: "Cancelled",      color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
};
const STOCK_STATUS: Record<StockStatus, { label: string; color: string; bg: string; border: string }> = {
  ok:       { label: "In Stock",    color: T.success, bg: T.successLight, border: T.successBorder },
  low:      { label: "Low Stock",   color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  critical: { label: "Critical",   color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
};

// ─── Small helpers ────────────────────────────────────────────────────────────
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

function CardHeader({ title, right, sub }: { title: string; right?: React.ReactNode; sub?: string }) {
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

function ViewAll({ label = "View all" }: { label?: string }) {
  return (
    <button style={{ fontSize: 11, fontWeight: 600, color: T.primary, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
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

// ─── Revenue bar chart ────────────────────────────────────────────────────────
function RevenueChart() {
  const W = 260, H = 72, gap = 4;
  const barW = (W - gap * (REVENUE.length + 1)) / REVENUE.length;
  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ display: "block" }}>
        {REVENUE.map((r, i) => {
          const barH = Math.max(4, (r.amt / maxRev) * H);
          const x = gap + i * (barW + gap);
          const y = H - barH;
          const isToday = r.day === "Today";
          return (
            <g key={r.day}>
              <rect x={x} y={y} width={barW} height={barH} rx="3"
                fill={isToday ? T.primary : T.border} />
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                fontSize="8" fill={isToday ? T.primary : T.grayLight} fontWeight={isToday ? "700" : "400"}>
                {r.day}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 10, color: T.grayLight }}>₹{Math.round(REVENUE[0].amt / 1000)}k</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.primary }}>₹{(REVENUE[6].amt / 1000).toFixed(1)}k today</span>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function PharmacyDashboard({ onBack }: { onBack: () => void }) {
  const [activeNav,  setActiveNav]  = useState("dashboard");
  const [orderTab,   setOrderTab]   = useState<OrdStatus | "all">("all");
  const [searchQ,    setSearchQ]    = useState("");
  const [sFocus,     setSFocus]     = useState(false);
  const [rxOrders,   setRxOrders]   = useState(RX_ORDERS.map((r) => ({ ...r, accepted: false })));

  const ORDER_TABS: { id: OrdStatus | "all"; label: string }[] = [
    { id: "all",       label: "All"             },
    { id: "pending",   label: "Pending"         },
    { id: "preparing", label: "Preparing"       },
    { id: "ready",     label: "Ready"           },
    { id: "out",       label: "Out for Delivery"},
    { id: "delivered", label: "Delivered"       },
  ];

  const filteredOrders = orderTab === "all"
    ? ORDERS
    : ORDERS.filter((o) => o.status === orderTab);

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, overflow: "hidden" }}>

      {/* ══════════ SIDEBAR ══════════ */}
      <aside style={{ width: 210, minWidth: 210, background: T.navy, display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "18px 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={13} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>MediKiosk</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", fontWeight: 600, letterSpacing: "0.07em" }}>PHARMACY</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px 7px", overflowY: "auto" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", padding: "6px 8px 3px" }}>PHARMACY</div>
          {NAV.map((item) => {
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7, border: "none", cursor: "pointer", background: active ? "rgba(13,122,110,0.22)" : "transparent", color: active ? "#5dd6c8" : "rgba(255,255,255,0.52)", fontSize: 12, fontWeight: active ? 600 : 400, textAlign: "left" as const, transition: "all 0.12s", marginBottom: 1, fontFamily: "Inter, system-ui, sans-serif" }}>
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

        {/* Logout + pharmacy info */}
        <div style={{ padding: "8px 7px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={onBack} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,100,100,0.6)", fontSize: 12, textAlign: "left" as const, fontFamily: "Inter, system-ui, sans-serif" }}>
            <Icon d={ic.logout} size={14} stroke="currentColor" />
            Logout
          </button>
        </div>
        <div style={{ padding: "8px 10px 14px" }}>
          <div style={{ padding: "9px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 9 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>MedPlus Pharmacy</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>Jaipur, Rajasthan</div>
            <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.success }} />
              <span style={{ fontSize: 9, color: T.success, fontWeight: 600 }}>Verified Pharmacy</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════ MAIN ══════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Header */}
        <header style={{ height: 56, background: T.white, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 22px", gap: 14, flexShrink: 0, position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Pharmacy Dashboard</div>
            <div style={{ fontSize: 10, color: T.grayLight }}>Manage prescriptions, medicines and patient orders.</div>
          </div>

          {/* Search */}
          <div style={{ position: "relative", width: 200 }}>
            <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ic.search} size={13} stroke={T.grayLight} />
            </span>
            <input type="text" placeholder="Search orders, medicines..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} onFocus={() => setSFocus(true)} onBlur={() => setSFocus(false)}
              style={{ width: "100%", padding: "6px 10px 6px 26px", fontSize: 12, color: T.navy, border: `1px solid ${sFocus ? T.primary : T.border}`, borderRadius: 7, background: T.muted, outline: "none", fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const }} />
          </div>

          {/* Verified badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 11px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20 }}>
            <Icon d={ic.shieldCheck} size={12} stroke={T.success} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.success }}>Verified Pharmacy</span>
          </div>

          {/* Bell */}
          <div style={{ position: "relative", cursor: "pointer" }}>
            <Icon d={ic.bell} size={17} stroke={T.gray} />
            <span style={{ position: "absolute", top: -3, right: -4, width: 13, height: 13, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>4</span>
          </div>
          <div style={{ width: 1, height: 24, background: T.border }} />

          {/* Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>MP</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>MedPlus Pharmacy</div>
              <div style={{ fontSize: 9, color: T.grayLight }}>Jaipur, Rajasthan</div>
            </div>
            <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />
          </div>
        </header>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px 48px" }}>

          {/* ── STAT TILES ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 18 }}>
            <StatTile label="Today's Orders"     value="86"      icon={ic.orders}   color={T.primary} sub="↑ 14 vs yesterday" />
            <StatTile label="Pending"            value="18"      icon={ic.clock}    color={T.amber}   sub="Awaiting action"   />
            <StatTile label="Preparing"          value="24"      icon={ic.package}  color={T.blue}    sub="In progress"       />
            <StatTile label="Out for Delivery"   value="16"      icon={ic.delivery} color={T.purple}  sub="2 partners active" />
            <StatTile label="Low Stock Items"    value="12"      icon={ic.alertTri} color={T.danger}  sub="Action needed"     />
            <StatTile label="Today's Revenue"    value="₹48,620" icon={ic.rupee}    color={T.success} sub="↑ ₹4.2k vs avg"   />
          </div>

          {/* ── MAIN 2-COL GRID ── */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 296px", gap: 16 }}>

            {/* ── LEFT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* ── New Prescription Orders ── */}
              <Card>
                <CardHeader
                  title="New Prescription Orders"
                  sub={`${RX_ORDERS.length} orders awaiting acceptance`}
                  right={<ViewAll />}
                />
                <div>
                  {rxOrders.map((o, idx) => (
                    <div key={o.id} style={{ padding: "12px 18px", borderBottom: idx < rxOrders.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", alignItems: "flex-start", gap: 12 }}>
                      {/* Avatar */}
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: T.primary, flexShrink: 0 }}>
                        {o.patient.charAt(0)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{o.patient}</span>
                          <span style={{ fontSize: 10, color: T.grayLight }}>{o.pid}</span>
                          <span style={{ fontSize: 10, fontWeight: 600, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 7px", borderRadius: 10 }}>{o.rxId}</span>
                        </div>
                        <div style={{ fontSize: 11, color: T.gray, marginTop: 3 }}>
                          {o.meds.join(" · ")}
                        </div>
                        <div style={{ fontSize: 10, color: T.grayLight, marginTop: 2 }}>
                          {o.doc} · {o.time}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <Pill
                          label={o.payment === "paid" ? "Paid" : o.payment === "cod" ? "COD" : "Pending"}
                          color={o.payment === "paid" ? T.success : o.payment === "cod" ? T.amber : T.danger}
                          bg={o.payment === "paid" ? T.successLight : o.payment === "cod" ? T.amberLight : T.dangerLight}
                          border={o.payment === "paid" ? T.successBorder : o.payment === "cod" ? T.amberBorder : T.dangerBorder}
                        />
                        <button style={{ padding: "4px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 11, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon d={ic.eye} size={11} stroke={T.gray} />
                          View
                        </button>
                        {!o.accepted ? (
                          <button
                            onClick={() => setRxOrders((prev) => prev.map((r, i) => i === idx ? { ...r, accepted: true } : r))}
                            style={{ padding: "4px 12px", background: T.primary, border: "none", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}
                          >
                            Accept
                          </button>
                        ) : (
                          <span style={{ fontSize: 11, fontWeight: 700, color: T.success }}>✓ Accepted</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* ── Order Management ── */}
              <Card>
                <CardHeader title="Order Management" right={<ViewAll />} />
                {/* Tabs */}
                <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.border}`, overflowX: "auto" as const }}>
                  {ORDER_TABS.map((tab) => {
                    const count = tab.id === "all" ? ORDERS.length : ORDERS.filter((o) => o.status === tab.id).length;
                    const active = orderTab === tab.id;
                    return (
                      <button key={tab.id} onClick={() => setOrderTab(tab.id)}
                        style={{ padding: "9px 14px", fontSize: 11, fontWeight: active ? 700 : 500, color: active ? T.primary : T.gray, background: "none", border: "none", borderBottom: `2px solid ${active ? T.primary : "transparent"}`, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", whiteSpace: "nowrap" as const, display: "flex", alignItems: "center", gap: 5 }}>
                        {tab.label}
                        {count > 0 && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: active ? T.primary : T.grayLight, background: active ? T.primaryLight : T.muted, border: `1px solid ${active ? T.primaryBorder : T.border}`, padding: "0 5px", borderRadius: 8 }}>{count}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* Table head */}
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 90px 70px 80px 130px 80px", background: T.muted, borderBottom: `1px solid ${T.border}` }}>
                  {["Order ID", "Patient", "Area", "Items", "Amount", "Status", "Action"].map((h) => (
                    <div key={h} style={{ padding: "7px 12px", fontSize: 9, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em" }}>{h.toUpperCase()}</div>
                  ))}
                </div>
                {filteredOrders.map((o, i) => {
                  const sc = ORD_STATUS[o.status];
                  return (
                    <div key={o.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr 90px 70px 80px 130px 80px", alignItems: "center", borderBottom: i < filteredOrders.length - 1 ? `1px solid ${T.border}` : "none" }}>
                      <div style={{ padding: "9px 12px", fontSize: 11, fontWeight: 600, color: T.navy, fontFamily: "monospace" }}>{o.id}</div>
                      <div style={{ padding: "9px 12px" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{o.patient}</div>
                        <div style={{ fontSize: 10, color: T.grayLight }}>{o.time}</div>
                      </div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{o.area}</div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{o.meds} item{o.meds > 1 ? "s" : ""}</div>
                      <div style={{ padding: "9px 12px", fontSize: 11, fontWeight: 600, color: T.navy }}>{o.amount}</div>
                      <div style={{ padding: "9px 12px" }}><Pill label={sc.label} color={sc.color} bg={sc.bg} border={sc.border} /></div>
                      <div style={{ padding: "9px 8px" }}>
                        <button style={{ padding: "4px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 10, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                          View
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Card>

              {/* ── Medicine Inventory ── */}
              <Card>
                <CardHeader
                  title="Medicine Inventory"
                  sub={`${INVENTORY.filter((i) => i.status !== "ok").length} items need attention`}
                  right={
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ padding: "5px 12px", background: T.primary, border: "none", borderRadius: 7, fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                        <Icon d={ic.plus} size={12} stroke="#fff" />
                        Add Medicine
                      </button>
                      <ViewAll />
                    </div>
                  }
                />
                {/* Head */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 90px 90px 110px 70px", background: T.muted, borderBottom: `1px solid ${T.border}` }}>
                  {["Medicine", "Category", "Available", "Min. Stock", "Status", "Action"].map((h) => (
                    <div key={h} style={{ padding: "7px 12px", fontSize: 9, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em" }}>{h.toUpperCase()}</div>
                  ))}
                </div>
                {INVENTORY.map((item, i) => {
                  const sc = STOCK_STATUS[item.status];
                  const pct = Math.min(100, Math.round((item.qty / (item.min * 3)) * 100));
                  return (
                    <div key={item.name} style={{ display: "grid", gridTemplateColumns: "1fr 140px 90px 90px 110px 70px", alignItems: "center", borderBottom: i < INVENTORY.length - 1 ? `1px solid ${T.border}` : "none", background: item.status === "critical" ? T.dangerLight : item.status === "low" ? T.amberLight : T.white }}>
                      <div style={{ padding: "9px 12px" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{item.name}</div>
                      </div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{item.category}</div>
                      <div style={{ padding: "9px 12px" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: item.status === "critical" ? T.danger : item.status === "low" ? T.amber : T.navy }}>{item.qty}</div>
                        {/* Mini bar */}
                        <div style={{ width: 48, height: 3, background: T.border, borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: item.status === "critical" ? T.danger : item.status === "low" ? T.amber : T.success, borderRadius: 2 }} />
                        </div>
                      </div>
                      <div style={{ padding: "9px 12px", fontSize: 11, color: T.gray }}>{item.min}</div>
                      <div style={{ padding: "9px 12px" }}><Pill label={sc.label} color={sc.color} bg={sc.bg} border={sc.border} /></div>
                      <div style={{ padding: "9px 8px" }}>
                        <button style={{ padding: "3px 8px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 5, fontSize: 10, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Card>

            </div>

            {/* ── RIGHT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Quick Actions */}
              <Card>
                <CardHeader title="Quick Actions" />
                <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Add Medicine",      icon: ic.plus,      color: T.primary },
                    { label: "Update Inventory",  icon: ic.edit,      color: T.blue    },
                    { label: "View Prescriptions",icon: ic.rx,        color: T.purple  },
                    { label: "Manage Orders",     icon: ic.orders,    color: T.amber   },
                  ].map((a) => (
                    <button key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "12px 8px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", transition: "all 0.12s" }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: a.color + "14", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon d={a.icon} size={15} stroke={a.color} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: T.navy, textAlign: "center" as const, lineHeight: 1.3 }}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Revenue chart */}
              <Card>
                <CardHeader title="Revenue Overview" sub="Last 7 days" right={<ViewAll label="Details" />} />
                <div style={{ padding: "14px 18px 10px" }}>
                  <RevenueChart />
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                    {[
                      { label: "Today", value: "₹48,620", color: T.primary },
                      { label: "This week", value: "₹2,77,820", color: T.navy },
                      { label: "Avg / day", value: "₹39,689", color: T.gray },
                    ].map((r) => (
                      <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                        <span style={{ fontSize: 11, color: T.gray }}>{r.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: r.color }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Prescription Verification */}
              <Card>
                <CardHeader title="Prescription Verification" sub="Uploaded prescriptions" right={<ViewAll />} />
                <div>
                  {RX_VERIFY.map((r, i) => (
                    <div key={r.id} style={{ padding: "11px 18px", borderBottom: i < RX_VERIFY.length - 1 ? `1px solid ${T.border}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: r.status === "verified" ? T.successLight : T.amberLight, border: `1px solid ${r.status === "verified" ? T.successBorder : T.amberBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon d={ic.fileText} size={13} stroke={r.status === "verified" ? T.success : T.amber} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "space-between" }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{r.patient}</span>
                            {r.status === "verified"
                              ? <Pill label="Verified" color={T.success} bg={T.successLight} border={T.successBorder} />
                              : <Pill label="Pending"  color={T.amber}   bg={T.amberLight}   border={T.amberBorder}   />
                            }
                          </div>
                          <div style={{ fontSize: 10, color: T.gray, marginTop: 2 }}>{r.doc}</div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 5 }}>
                            <span style={{ fontSize: 10, color: T.grayLight }}>{r.id} · {r.uploaded}</span>
                            {r.status === "pending" && (
                              <button style={{ padding: "3px 9px", background: T.primary, border: "none", borderRadius: 5, fontSize: 10, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                                Review
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Today's Delivery */}
              <Card>
                <CardHeader title="Today's Delivery" sub={`${DELIVERIES.filter((d) => d.status === "en-route").length} active deliveries`} right={<ViewAll />} />
                <div>
                  {DELIVERIES.map((d, i) => {
                    const sc =
                      d.status === "delivered" ? { color: T.success, bg: T.successLight, border: T.successBorder, label: "Delivered"   } :
                      d.status === "en-route"  ? { color: T.purple,  bg: T.purpleLight,  border: T.purpleBorder,  label: "En Route"    } :
                                                 { color: T.primary, bg: T.primaryLight, border: T.primaryBorder, label: "Ready"       };
                    return (
                      <div key={d.id} style={{ padding: "11px 18px", borderBottom: i < DELIVERIES.length - 1 ? `1px solid ${T.border}` : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                          <div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.navy, fontFamily: "monospace" }}>{d.id}</span>
                            <span style={{ fontSize: 10, color: T.grayLight, marginLeft: 6 }}>· {d.area}</span>
                          </div>
                          <Pill label={sc.label} color={sc.color} bg={sc.bg} border={sc.border} />
                        </div>
                        <div style={{ display: "flex", gap: 12, fontSize: 10, color: T.gray }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Icon d={ic.user} size={10} stroke={T.grayLight} />
                            {d.partner !== "—" ? d.partner : "Unassigned"}
                          </span>
                          {d.eta !== "—" && (
                            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                              <Icon d={ic.clock} size={10} stroke={T.grayLight} />
                              ETA {d.eta}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Network note */}
              <div style={{ padding: "12px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 9 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Icon d={ic.shieldCheck} size={12} stroke={T.primary} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>MediKiosk Network</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: T.primary, lineHeight: 1.6 }}>
                  All prescriptions are verified against the originating doctor's MediKiosk credentials before dispensing. Patient consent is required for record access.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

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
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mapPin:      "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  bell:        "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  flask:       "M9 3h6M9 3v7l-4 9h14L21 10V3H9z M9 14h6",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  home:        "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  truck:       "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  building:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  x:           "M18 6L6 18M6 6l12 12",
  filter:      "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  tag:         "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  timeline:    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  plus:        "M12 5v14M5 12h14",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  droplet:     "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
  zap:         "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  thermometer: "M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z",
  microscope:  "M3 3h.01M7 3h4a1 1 0 011 1v4a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z M10 9v2m-3 5h6M12 11v5m-6 3h12",
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
  danger:        "#e84b4b",
  dangerLight:   "#fff5f5",
  dangerBorder:  "#fecaca",
};

// ─── Responsive ───────────────────────────────────────────────────────────────
function useW() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Test {
  id: string;
  name: string;
  shortName: string;
  price: number;
  homeCollection: boolean;
  turnaround: string;
  category: string;
  desc: string;
}

const TESTS: Test[] = [
  { id: "cbc",      name: "Complete Blood Count (CBC)",        shortName: "CBC",             price: 280,  homeCollection: true,  turnaround: "Same day",     category: "Blood Tests", desc: "Measures red cells, white cells, haemoglobin and platelets." },
  { id: "glucose",  name: "Blood Glucose – Fasting",           shortName: "Blood Glucose",   price: 120,  homeCollection: true,  turnaround: "Same day",     category: "Diabetes",    desc: "Fasting blood sugar to assess glucose metabolism." },
  { id: "hba1c",    name: "HbA1c – Glycated Haemoglobin",      shortName: "HbA1c",           price: 480,  homeCollection: true,  turnaround: "24 hours",     category: "Diabetes",    desc: "Average blood sugar over the past 2–3 months." },
  { id: "thyroid",  name: "Thyroid Profile (TSH, T3, T4)",     shortName: "Thyroid Profile", price: 650,  homeCollection: true,  turnaround: "24 hours",     category: "Thyroid",     desc: "Full thyroid function assessment." },
  { id: "lipid",    name: "Lipid Profile",                     shortName: "Lipid Profile",   price: 420,  homeCollection: true,  turnaround: "Same day",     category: "Heart Health",desc: "Total cholesterol, LDL, HDL and triglycerides." },
  { id: "urine",    name: "Urine Routine & Microscopy",        shortName: "Urine Routine",   price: 90,   homeCollection: false, turnaround: "Same day",     category: "Urine Tests", desc: "Physical, chemical and microscopic urine analysis." },
  { id: "spo2",     name: "SpO₂ / Vital Assessment",           shortName: "SpO₂ Vitals",     price: 150,  homeCollection: true,  turnaround: "On visit",     category: "Blood Tests", desc: "Pulse oximetry and baseline vitals check." },
  { id: "ecg",      name: "Electrocardiogram (ECG / 12-Lead)", shortName: "ECG",             price: 350,  homeCollection: false, turnaround: "Same day",     category: "Heart Health",desc: "Records electrical activity of the heart." },
];

const RECOMMENDED_IDS = ["cbc", "spo2"];

interface Lab { id: string; name: string; distance: string; homeCollection: boolean; turnaround: string; rating: number; }
const LABS: Lab[] = [
  { id: "medicare",  name: "MediCare Diagnostics",  distance: "2.4 km", homeCollection: true,  turnaround: "24 hours",    rating: 4.8 },
  { id: "healthlab", name: "HealthLab Diagnostics", distance: "4.1 km", homeCollection: true,  turnaround: "24–48 hours", rating: 4.5 },
  { id: "thyrocare", name: "Thyrocare Centre",      distance: "6.0 km", homeCollection: false, turnaround: "48 hours",    rating: 4.3 },
];

interface Report {
  id:       string;
  name:     string;
  date:     string;
  lab:      string;
  hasFlag:  boolean;
  flagNote: string;
}
const REPORTS: Report[] = [
  { id: "r1", name: "Complete Blood Count (CBC)", date: "08 Sep 2026", lab: "MediCare Diagnostics",  hasFlag: false, flagNote: ""                                   },
  { id: "r2", name: "Thyroid Profile",            date: "15 Aug 2026", lab: "HealthLab Diagnostics", hasFlag: true,  flagNote: "TSH slightly outside reference range"  },
  { id: "r3", name: "Lipid Profile",              date: "20 Jul 2026", lab: "MediCare Diagnostics",  hasFlag: false, flagNote: ""                                   },
];

const CATEGORIES = ["All", "Blood Tests", "Urine Tests", "Imaging", "Diabetes", "Thyroid", "Heart Health"];
type LabFilter = "nearby" | "home-collection" | "fast" | "price";
const LAB_FILTERS: { id: LabFilter; label: string }[] = [
  { id: "nearby",          label: "Nearby"          },
  { id: "home-collection", label: "Home Collection" },
  { id: "fast",            label: "Fast Reports"    },
  { id: "price",           label: "Lowest Price"    },
];

const SLOTS = ["8:00–9:00 AM", "9:00–10:00 AM", "10:00–11:00 AM", "11:00–12:00 PM", "2:00–3:00 PM", "3:00–4:00 PM"];
const DATES = ["Tue, 10 Sep", "Wed, 11 Sep", "Thu, 12 Sep", "Fri, 13 Sep", "Sat, 14 Sep"];

// ─── Small helpers ────────────────────────────────────────────────────────────
function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${border}`, padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function CardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function SectionHead({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</span>
      {action}
    </div>
  );
}

function TxtBtn({ label, onClick, color }: { label: string; onClick?: () => void; color?: string }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: color ?? T.primary, fontFamily: "Inter, system-ui, sans-serif", padding: 0 }}>
      {label}
    </button>
  );
}

function RadioRow({ selected, onSelect, label, sub }: { selected: boolean; onSelect: () => void; label: string; sub: string }) {
  return (
    <button onClick={onSelect} style={{
      display: "flex", alignItems: "center", gap: 12, width: "100%",
      padding: "10px 14px", borderRadius: 8, cursor: "pointer",
      border: `1.5px solid ${selected ? T.primary : T.border}`,
      background: selected ? T.primaryLight : T.white,
      fontFamily: "Inter, system-ui, sans-serif", textAlign: "left",
    }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${selected ? T.primary : T.grayLight}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {selected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.primary }} />}
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{label}</div>
        <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{sub}</div>
      </div>
    </button>
  );
}

// ─── Test row ─────────────────────────────────────────────────────────────────
function TestRow({
  test, recommended, onSelect, selected,
}: { test: Test; recommended?: boolean; onSelect: (t: Test) => void; selected: boolean }) {
  const catColor: Record<string, string> = {
    "Blood Tests":  T.primary,
    "Urine Tests":  T.blue,
    "Imaging":      T.purple,
    "Diabetes":     T.amber,
    "Thyroid":      "#0891b2",
    "Heart Health": T.danger,
    "Other":        T.gray,
  };
  const catBg: Record<string, string> = {
    "Blood Tests":  T.primaryLight,
    "Urine Tests":  T.blueLight,
    "Imaging":      T.purpleLight,
    "Diabetes":     T.amberLight,
    "Thyroid":      "#ecfeff",
    "Heart Health": T.dangerLight,
    "Other":        T.muted,
  };
  const cc = catColor[test.category] ?? T.gray;
  const cb = catBg[test.category]   ?? T.muted;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "13px 20px",
      background: selected ? T.primaryLight : T.white,
      borderLeft: selected ? `3px solid ${T.primary}` : "3px solid transparent",
      cursor: "pointer", transition: "background 0.12s",
    }} onClick={() => onSelect(test)}>
      {/* Category dot */}
      <div style={{ width: 36, height: 36, borderRadius: 9, background: cb, border: `1px solid ${cc}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={ic.flask} size={16} stroke={cc} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" as const, marginBottom: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{test.name}</span>
          {recommended && <Badge label="Dr. Recommended" color={T.primary} bg={T.primaryLight} border={T.primaryBorder} />}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
          {test.homeCollection && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon d={ic.home} size={11} stroke={T.grayLight} />
              <span style={{ fontSize: 11, color: T.gray }}>Home collection</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Icon d={ic.clock} size={11} stroke={T.grayLight} />
            <span style={{ fontSize: 11, color: T.gray }}>Reports in {test.turnaround}</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>₹{test.price}</div>
        <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>onwards</div>
      </div>
    </div>
  );
}

// ─── Lab card ─────────────────────────────────────────────────────────────────
function LabCard({ lab, selected, onSelect }: { lab: Lab; selected: boolean; onSelect: () => void }) {
  return (
    <div style={{
      background: T.white,
      border: `1px solid ${selected ? T.primary : T.border}`,
      borderLeft: `3px solid ${selected ? T.primary : "transparent"}`,
      borderRadius: "0 10px 10px 0",
      padding: "14px 16px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: selected ? T.primaryLight : T.muted, border: `1px solid ${selected ? T.primaryBorder : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={ic.microscope} size={16} stroke={selected ? T.primary : T.gray} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, flexWrap: "wrap" as const }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{lab.name}</span>
            <Badge label="✓ Verified" color={T.success} bg={T.successLight} border={T.successBorder} />
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" as const, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon d={ic.mapPin} size={11} stroke={T.grayLight} />
              <span style={{ fontSize: 11, color: T.gray }}>{lab.distance}</span>
            </div>
            {lab.homeCollection && (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Icon d={ic.home} size={11} stroke={T.grayLight} />
                <span style={{ fontSize: 11, color: T.gray }}>Home collection</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon d={ic.clock} size={11} stroke={T.grayLight} />
              <span style={{ fontSize: 11, color: T.gray }}>Reports within {lab.turnaround}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.amber }}>{lab.rating}</span>
            <span style={{ fontSize: 10, color: T.grayLight }}>/ 5.0 rating</span>
          </div>
        </div>
        <button
          onClick={onSelect}
          style={{
            padding: "7px 16px", borderRadius: 8,
            background: selected ? T.primary : T.white,
            border: `1px solid ${selected ? T.primary : T.primaryBorder}`,
            color: selected ? "#fff" : T.primary,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif", flexShrink: 0,
          }}
        >
          {selected ? "Selected" : "Select"}
        </button>
      </div>
    </div>
  );
}

// ─── Report row ───────────────────────────────────────────────────────────────
function ReportRow({ report }: { report: Report }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: report.hasFlag ? T.amberLight : T.muted, border: `1px solid ${report.hasFlag ? T.amberBorder : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={ic.fileText} size={15} stroke={report.hasFlag ? T.amber : T.gray} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{report.name}</span>
          {report.hasFlag && (
            <Badge label="Review recommended" color={T.amber} bg={T.amberLight} border={T.amberBorder} />
          )}
        </div>
        <div style={{ fontSize: 11, color: T.grayLight, marginTop: 2 }}>{report.lab} · {report.date}</div>
        {report.hasFlag && (
          <div style={{ fontSize: 11, color: "#92400e", marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon d={ic.alertTri} size={11} stroke={T.amber} />
            {report.flagNote} — discuss with your doctor
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <Badge label="✓ Available" color={T.success} bg={T.successLight} border={T.successBorder} />
        <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 11, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
          <Icon d={ic.eye} size={12} stroke={T.gray} />
          View
        </button>
      </div>
    </div>
  );
}

// ─── Booking confirmed ────────────────────────────────────────────────────────
function BookingConfirmed({ test, lab, date, slot, collection, onDismiss }: {
  test: Test; lab: Lab; date: string; slot: string; collection: "home" | "visit"; onDismiss: () => void;
}) {
  return (
    <div style={{ background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 11, padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#dcfce7", border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={ic.checkCircle} size={20} stroke={T.success} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#14532d", marginBottom: 4 }}>Test Booked Successfully</div>
          <div style={{ fontSize: 12, color: T.success, marginBottom: 12 }}>
            {test.name} · {lab.name}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const }}>
            {[
              { icon: ic.calendar, v: date        },
              { icon: ic.clock,    v: slot         },
              { icon: collection === "home" ? ic.home : ic.building, v: collection === "home" ? "Home Collection" : "Visit Lab" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Icon d={r.icon} size={12} stroke={T.success} />
                <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d" }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: T.success }}>
            Booking ID: <strong>MK-LAB-2026-3741</strong>
          </div>
        </div>
        <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon d={ic.x} size={15} stroke={T.success} />
        </button>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function LabDiagnostics({ onBack, onViewTimeline }: { onBack: () => void; onViewTimeline?: () => void }) {
  const w        = useW();
  const isMobile = w < 768;

  const [search,       setSearch]       = useState("");
  const [searchFocus,  setSearchFocus]  = useState(false);
  const [category,     setCategory]     = useState("All");
  const [labFilters,   setLabFilters]   = useState<LabFilter[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [selectedLab,  setSelectedLab]  = useState<Lab | null>(LABS[0]);
  const [collection,   setCollection]   = useState<"home" | "visit">("home");
  const [selectedDate, setSelectedDate] = useState(DATES[2]);
  const [selectedSlot, setSelectedSlot] = useState(SLOTS[2]);
  const [booked,       setBooked]       = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  const filteredTests = TESTS.filter((t) => {
    const q = search.toLowerCase();
    const matchQ = !q || t.name.toLowerCase().includes(q) || t.shortName.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    const matchC = category === "All" || t.category === category;
    return matchQ && matchC;
  });

  function toggleLabFilter(f: LabFilter) {
    setLabFilters((fs) => fs.includes(f) ? fs.filter((x) => x !== f) : [...fs, f]);
  }

  function handleSelectTest(t: Test) {
    setSelectedTest((prev) => prev?.id === t.id ? null : t);
    setBooked(false);
    if (isMobile && bookingRef.current) {
      setTimeout(() => bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }

  function handleBook() {
    if (!selectedTest || !selectedLab) return;
    setBooked(true);
  }

  // ── Booking panel ──────────────────────────────────────────────────────────
  const bookingPanel = (
    <div ref={bookingRef}>
      {booked && selectedTest && selectedLab ? (
        <CardShell>
          <div style={{ padding: 20 }}>
            <BookingConfirmed
              test={selectedTest} lab={selectedLab}
              date={selectedDate} slot={selectedSlot}
              collection={collection}
              onDismiss={() => { setBooked(false); setSelectedTest(null); }}
            />
          </div>
        </CardShell>
      ) : (
        <CardShell>
          <SectionHead title="Book a Test" action={selectedTest ? <TxtBtn label="Clear" onClick={() => setSelectedTest(null)} color={T.grayLight} /> : undefined} />
          <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Selected test */}
            {selectedTest ? (
              <div style={{ padding: "10px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <Icon d={ic.flask} size={14} stroke={T.primary} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.primary }}>{selectedTest.name}</div>
                  <div style={{ fontSize: 11, color: T.grayLight }}>₹{selectedTest.price} · {selectedTest.turnaround}</div>
                </div>
                <button onClick={() => setSelectedTest(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                  <Icon d={ic.x} size={13} stroke={T.primary} />
                </button>
              </div>
            ) : (
              <div style={{ padding: "12px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 12, color: T.grayLight }}>Select a test from the list to continue</p>
              </div>
            )}

            {/* Lab */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 6 }}>DIAGNOSTIC CENTRE</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{selectedLab?.name ?? "No lab selected"}</div>
              {selectedLab && <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{selectedLab.distance} · Reports in {selectedLab.turnaround}</div>}
            </div>

            {/* Collection */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>COLLECTION METHOD</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <RadioRow selected={collection === "home"} onSelect={() => setCollection("home")} label="Home Collection" sub="A technician visits your address" />
                <RadioRow selected={collection === "visit"} onSelect={() => setCollection("visit")} label="Visit Lab" sub="Walk in or appointment at centre" />
              </div>
            </div>

            {/* Date */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>SELECT DATE</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                {DATES.map((d) => (
                  <button key={d} onClick={() => setSelectedDate(d)} style={{
                    padding: "6px 12px", borderRadius: 7, cursor: "pointer",
                    border: `1px solid ${selectedDate === d ? T.primary : T.border}`,
                    background: selectedDate === d ? T.primaryLight : T.white,
                    fontSize: 11, fontWeight: selectedDate === d ? 700 : 400,
                    color: selectedDate === d ? T.primary : T.gray,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}>{d}</button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>SELECT TIME SLOT</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                {SLOTS.map((s) => (
                  <button key={s} onClick={() => setSelectedSlot(s)} style={{
                    padding: "5px 11px", borderRadius: 7, cursor: "pointer",
                    border: `1px solid ${selectedSlot === s ? T.primary : T.border}`,
                    background: selectedSlot === s ? T.primaryLight : T.white,
                    fontSize: 11, fontWeight: selectedSlot === s ? 700 : 400,
                    color: selectedSlot === s ? T.primary : T.gray,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Patient */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>R</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>Rahul Sharma</div>
                <div style={{ fontSize: 10, color: T.grayLight }}>Patient · MK-2947</div>
              </div>
            </div>

            {/* Book btn */}
            <button
              onClick={handleBook}
              disabled={!selectedTest || !selectedLab}
              style={{
                width: "100%", padding: "12px",
                background: selectedTest && selectedLab ? T.primary : T.muted,
                border: "none", borderRadius: 9,
                fontSize: 13, fontWeight: 700,
                color: selectedTest && selectedLab ? "#fff" : T.grayLight,
                cursor: selectedTest && selectedLab ? "pointer" : "default",
                fontFamily: "Inter, system-ui, sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <Icon d={ic.checkCircle} size={15} stroke={selectedTest && selectedLab ? "#fff" : T.grayLight} />
              Confirm Booking
              {selectedTest && <span style={{ opacity: 0.85 }}>· ₹{selectedTest.price}</span>}
            </button>

            {(!selectedTest || !selectedLab) && (
              <p style={{ margin: "-6px 0 0", fontSize: 11, color: T.grayLight, textAlign: "center" }}>
                Select a test and a diagnostic centre to continue
              </p>
            )}
          </div>
        </CardShell>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, display: "flex", flexDirection: "column" }}>

      {/* ── Header ── */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        {/* Top bar */}
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 28px", gap: 14 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.gray, fontSize: 13, fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif", padding: "4px 0" }}>
            <Icon d={ic.chevLeft} size={15} stroke={T.gray} />
            {!isMobile && "Back"}
          </button>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={12} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Lab & Diagnostics</div>
              {!isMobile && <div style={{ fontSize: 10, color: T.grayLight }}>Book tests · View reports · Track results</div>}
            </div>
          </div>
          <div style={{ flex: 1 }} />

          {/* Location */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 20, cursor: "pointer" }}>
              <Icon d={ic.mapPin} size={13} stroke={T.primary} />
              <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>Andheri West, Mumbai</span>
              <Icon d={ic.chevDown} size={12} stroke={T.grayLight} />
            </div>
          )}

          {/* Bell */}
          <div style={{ position: "relative", cursor: "pointer", padding: 4 }}>
            <Icon d={ic.bell} size={19} stroke={T.gray} />
            <span style={{ position: "absolute", top: 0, right: 0, width: 14, height: 14, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
          </div>

          {/* Profile */}
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer" }}>R</div>
        </div>

        {/* Search bar */}
        <div style={{ padding: "10px 28px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ic.search} size={14} stroke={T.grayLight} />
            </span>
            <input
              type="text"
              placeholder="Search blood tests, imaging, health packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              style={{
                width: "100%", padding: "8px 12px 8px 34px",
                fontSize: 13, color: T.navy,
                border: `1px solid ${searchFocus ? T.primary : T.border}`,
                borderRadius: 9, background: T.muted, outline: "none",
                fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const,
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                <Icon d={ic.x} size={13} stroke={T.grayLight} />
              </button>
            )}
          </div>
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, cursor: "pointer", flexShrink: 0 }}>
              <Icon d={ic.mapPin} size={13} stroke={T.primary} />
              <span style={{ fontSize: 11, color: T.navy }}>Mumbai</span>
            </div>
          )}
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1fr) 320px",
        gap: 20,
        padding: isMobile ? "16px 16px 100px" : "28px 28px 60px",
        maxWidth: 1200, width: "100%", margin: "0 auto",
        boxSizing: "border-box" as const, alignItems: "start",
      }}>

        {/* ── Left ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Page heading */}
          <div>
            <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: T.navy, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Lab & Diagnostics</h1>
            <p style={{ margin: 0, fontSize: 13, color: T.gray }}>Book diagnostic tests and keep your reports connected to your health timeline.</p>
          </div>

          {/* ── Recommended tests ── */}
          <CardShell>
            <SectionHead
              title="Recommended Tests"
              action={
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: T.primary }}>M</div>
                  <span style={{ fontSize: 11, color: T.gray }}>Dr. Mehta · 10 Sep 2026</span>
                </div>
              }
            />
            <div style={{ padding: "6px 0 0" }}>
              <div style={{ padding: "8px 20px 12px", display: "flex", alignItems: "center", gap: 7 }}>
                <Icon d={ic.stethoscope} size={13} stroke={T.primary} />
                <span style={{ fontSize: 11, color: T.gray }}>Tests recommended during your consultation on 10 Sep 2026. Select to book.</span>
              </div>
              {TESTS.filter((t) => RECOMMENDED_IDS.includes(t.id)).map((t, i, arr) => (
                <div key={t.id} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <TestRow
                    test={t}
                    recommended
                    selected={selectedTest?.id === t.id}
                    onSelect={handleSelectTest}
                  />
                </div>
              ))}
            </div>
          </CardShell>

          {/* ── Find a test ── */}
          <CardShell>
            <SectionHead title="Find a Test" />

            {/* Category tabs */}
            <div style={{ padding: "12px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 6, flexWrap: "wrap" as const }}>
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)} style={{
                  padding: "5px 13px", borderRadius: 20, cursor: "pointer",
                  border: `1px solid ${category === c ? T.primary : T.border}`,
                  background: category === c ? T.primaryLight : T.white,
                  color: category === c ? T.primary : T.gray,
                  fontSize: 12, fontWeight: category === c ? 700 : 400,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Test list */}
            <div>
              {filteredTests.length === 0 ? (
                <div style={{ padding: "28px 20px", textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 13, color: T.grayLight }}>No tests match "{search}" in {category}.</p>
                  <button onClick={() => { setSearch(""); setCategory("All"); }} style={{ marginTop: 8, fontSize: 12, color: T.primary, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", fontWeight: 600 }}>Clear filters</button>
                </div>
              ) : filteredTests.map((t, i) => (
                <div key={t.id} style={{ borderBottom: i < filteredTests.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <TestRow
                    test={t}
                    recommended={RECOMMENDED_IDS.includes(t.id)}
                    selected={selectedTest?.id === t.id}
                    onSelect={handleSelectTest}
                  />
                </div>
              ))}
            </div>
          </CardShell>

          {/* ── Verified labs ── */}
          <CardShell>
            <SectionHead
              title="Verified Diagnostic Centres"
              action={<Badge label={`${LABS.length} nearby`} color={T.gray} bg={T.muted} border={T.border} />}
            />
            <div style={{ padding: "12px 20px 8px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 6, flexWrap: "wrap" as const }}>
              {LAB_FILTERS.map((f) => {
                const active = labFilters.includes(f.id);
                return (
                  <button key={f.id} onClick={() => toggleLabFilter(f.id)} style={{
                    padding: "4px 12px", borderRadius: 20, cursor: "pointer",
                    border: `1px solid ${active ? T.primary : T.border}`,
                    background: active ? T.primaryLight : T.white,
                    color: active ? T.primary : T.gray,
                    fontSize: 11, fontWeight: active ? 700 : 400,
                    fontFamily: "Inter, system-ui, sans-serif",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    {active && <Icon d={ic.check} size={10} stroke={T.primary} />}
                    {f.label}
                  </button>
                );
              })}
            </div>
            <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
              {LABS.map((lab) => (
                <LabCard key={lab.id} lab={lab} selected={selectedLab?.id === lab.id} onSelect={() => setSelectedLab(lab)} />
              ))}
            </div>
          </CardShell>

          {/* Mobile: booking panel inline */}
          {isMobile && bookingPanel}

          {/* ── Recent reports ── */}
          <CardShell>
            <SectionHead title="Recent Lab Reports" action={<TxtBtn label="All reports" />} />
            <div style={{ padding: "4px 20px 12px" }}>
              {REPORTS.map((r) => <ReportRow key={r.id} report={r} />)}
              <div style={{ marginTop: 4, height: 1 }} />
            </div>
          </CardShell>

          {/* ── Health timeline connection ── */}
          <CardShell>
            <div style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: T.blueLight, border: `1px solid ${T.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={ic.timeline} size={16} stroke={T.blue} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Connected to Your Health Timeline</div>
                <p style={{ margin: "0 0 12px", fontSize: 11, color: T.gray, lineHeight: 1.6 }}>
                  Your reports automatically become part of your health timeline and are accessible to your treating doctors with your consent.
                </p>
                <button
                  onClick={onViewTimeline}
                  style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, fontWeight: 600, color: T.blue, fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  View Health Timeline <Icon d={ic.arrowRight} size={13} stroke={T.blue} />
                </button>
              </div>
            </div>
          </CardShell>

          {/* ── Safety notice ── */}
          <div style={{ padding: "14px 18px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: T.amberLight, border: `1px solid ${T.amberBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={ic.info} size={16} stroke={T.amber} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Clinical Disclaimer</div>
              <p style={{ margin: 0, fontSize: 12, color: T.gray, lineHeight: 1.65 }}>
                Diagnostic reports support clinical decision-making and are not a substitute for medical advice. Your doctor should interpret results in the context of your symptoms and full medical history.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: sticky booking panel + summary ── */}
        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 120 }}>
            {bookingPanel}

            {/* Quick stats */}
            <CardShell>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 12 }}>YOUR DIAGNOSTICS SUMMARY</div>
                {[
                  { label: "Reports available",   value: "3",          color: T.success },
                  { label: "Pending review",       value: "1",          color: T.amber   },
                  { label: "Tests this year",      value: "5",          color: T.navy    },
                  { label: "Last test",            value: "08 Sep 2026",color: T.gray    },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
                    <span style={{ fontSize: 12, color: T.gray }}>{row.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </CardShell>
          </div>
        )}
      </div>

      {/* ── Mobile sticky CTA ── */}
      {isMobile && selectedTest && !booked && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30, background: T.white, borderTop: `1px solid ${T.border}`, padding: "10px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{selectedTest.shortName}</div>
              <div style={{ fontSize: 11, color: T.grayLight }}>₹{selectedTest.price} · {selectedLab?.name ?? "Select a lab"}</div>
            </div>
          </div>
          <button
            onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            style={{
              width: "100%", padding: "12px",
              background: T.primary, border: "none", borderRadius: 9,
              fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <Icon d={ic.calendar} size={15} stroke="#fff" />
            Book {selectedTest.shortName}
          </button>
        </div>
      )}
    </div>
  );
}

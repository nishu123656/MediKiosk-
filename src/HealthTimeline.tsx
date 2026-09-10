import { useState, useEffect } from "react";

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
  heart:        "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  chevLeft:     "M15 18l-6-6 6-6",
  chevRight:    "M9 18l6-6-6-6",
  chevDown:     "M19 9l-7 7-7-7",
  chevUp:       "M5 15l7-7 7 7",
  check:        "M20 6L9 17l-5-5",
  checkCircle:  "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  search:       "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  bell:         "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  stethoscope:  "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  pill:         "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  flask:        "M9 3h6M9 3v7l-4 9h14L21 10V3H9z M9 14h6",
  fileText:     "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  video:        "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  cart:         "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0",
  shield:       "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  info:         "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  alertTri:     "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  arrowRight:   "M5 12h14M12 5l7 7-7 7",
  calendar:     "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  clock:        "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  activity:     "M22 12h-4l-3 9L9 3l-3 9H2",
  user:         "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  link:         "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  x:            "M18 6L6 18M6 6l12 12",
  eye:          "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  mapPin:       "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  package:      "M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  plus:         "M12 5v14M5 12h14",
  filter:       "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  printer:      "M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z",
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
  teal2:         "#0891b2",
  teal2Light:    "#ecfeff",
  teal2Border:   "#a5f3fc",
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

// ─── Event types ──────────────────────────────────────────────────────────────
type EventType = "consultation" | "prescription" | "lab" | "document" | "teleconsult" | "pharmacy";

interface TimelineEvent {
  id:         string;
  type:       EventType;
  date:       string;
  dateGroup:  string;
  title:      string;
  subtitle:   string;
  meta:       string;
  status:     string;
  statusKind: "success" | "primary" | "amber" | "blue" | "purple" | "gray";
  actions:    { label: string; primary?: boolean }[];
  detail: {
    rows:    { label: string; value: string }[];
    insight?: string;
    risk?:   string;
    note?:   string;
  };
}

const EVENTS: TimelineEvent[] = [
  {
    id: "e1", type: "consultation", date: "10 Sep 2026", dateGroup: "10 September 2026",
    title: "Doctor Consultation", subtitle: "Dr. Priya Mehta · General Medicine",
    meta: "Cough + mild fever", status: "Completed", statusKind: "success",
    actions: [{ label: "View Summary", primary: true }, { label: "View Consultation" }],
    detail: {
      rows: [
        { label: "Chief Complaint",    value: "Cough + mild fever" },
        { label: "Duration",           value: "3 days" },
        { label: "Doctor",             value: "Dr. Priya Mehta" },
        { label: "Specialisation",     value: "General Medicine" },
        { label: "Facility",           value: "Apollo Hospitals, Mumbai" },
        { label: "Consultation type",  value: "In-person" },
        { label: "Clinical summary",   value: "Productive cough for 3 days, low-grade fever 99.1 °F. No chest pain. Clear lung fields." },
      ],
      insight: "Possible respiratory infection or viral illness. No red-flag features noted.",
      risk:    "Low–Moderate",
      note:    "Preliminary clinical insight — not a diagnosis.",
    },
  },
  {
    id: "e2", type: "prescription", date: "10 Sep 2026", dateGroup: "10 September 2026",
    title: "Prescription", subtitle: "Dr. Priya Mehta",
    meta: "3 medicines · Paracetamol, Cetirizine, Ambroxol", status: "Approved", statusKind: "success",
    actions: [{ label: "View Prescription", primary: true }, { label: "Order Medicines" }],
    detail: {
      rows: [
        { label: "Prescribed by", value: "Dr. Priya Mehta" },
        { label: "Date",          value: "10 September 2026" },
        { label: "Prescription ID", value: "MKP-2026-4821" },
        { label: "Medicines",     value: "Paracetamol 500 mg · Cetirizine 10 mg · Ambroxol 30 mg" },
        { label: "Duration",      value: "3–5 days" },
        { label: "Follow-up",     value: "15 September 2026" },
      ],
    },
  },
  {
    id: "e3", type: "pharmacy", date: "10 Sep 2026", dateGroup: "10 September 2026",
    title: "Pharmacy Order", subtitle: "MediCare Pharmacy",
    meta: "Order ID: MK-ORD-2026-01842", status: "Preparing", statusKind: "amber",
    actions: [{ label: "Track Order", primary: true }],
    detail: {
      rows: [
        { label: "Pharmacy",    value: "MediCare Pharmacy (✓ Verified)" },
        { label: "Order ID",    value: "MK-ORD-2026-01842" },
        { label: "Items",       value: "3 medicines" },
        { label: "Delivery",    value: "Home Delivery · 30–45 min" },
        { label: "Payment",     value: "Pay at Delivery" },
        { label: "Status",      value: "Preparing Medicines" },
      ],
    },
  },
  {
    id: "e4", type: "lab", date: "08 Sep 2026", dateGroup: "08 September 2026",
    title: "Lab Report", subtitle: "MediCare Diagnostics",
    meta: "Complete Blood Count (CBC)", status: "Report Available", statusKind: "success",
    actions: [{ label: "View Report", primary: true }],
    detail: {
      rows: [
        { label: "Test",          value: "Complete Blood Count (CBC)" },
        { label: "Lab",           value: "MediCare Diagnostics (✓ Verified)" },
        { label: "Date",          value: "08 September 2026" },
        { label: "Ordered by",    value: "Dr. Priya Mehta" },
        { label: "Result status", value: "Within normal limits" },
        { label: "Report",        value: "Available for download" },
      ],
    },
  },
  {
    id: "e5", type: "document", date: "08 Sep 2026", dateGroup: "08 September 2026",
    title: "Medical Document", subtitle: "Previous Prescription",
    meta: "Uploaded by patient", status: "OCR Verified", statusKind: "blue",
    actions: [{ label: "View Document", primary: true }],
    detail: {
      rows: [
        { label: "Document type", value: "Prescription" },
        { label: "Uploaded",      value: "08 September 2026" },
        { label: "Source",        value: "Patient-uploaded" },
        { label: "OCR status",    value: "Verified — text extracted" },
        { label: "Linked to",     value: "Health Timeline · ABHA records" },
      ],
    },
  },
  {
    id: "e6", type: "teleconsult", date: "15 Aug 2026", dateGroup: "15 August 2026",
    title: "Teleconsultation", subtitle: "Dr. Priya Mehta · General Medicine",
    meta: "Duration: 18 minutes", status: "Completed", statusKind: "success",
    actions: [{ label: "View Consultation", primary: true }],
    detail: {
      rows: [
        { label: "Doctor",        value: "Dr. Priya Mehta" },
        { label: "Specialisation",value: "General Medicine" },
        { label: "Date",          value: "15 August 2026" },
        { label: "Duration",      value: "18 minutes" },
        { label: "Mode",          value: "Video Consultation" },
        { label: "Chief complaint", value: "Routine diabetes follow-up" },
      ],
      insight: "HbA1c target review — medication adherence discussed.",
    },
  },
  {
    id: "e7", type: "lab", date: "15 Aug 2026", dateGroup: "15 August 2026",
    title: "Lab Report", subtitle: "HealthLab Diagnostics",
    meta: "Thyroid Profile (TSH, T3, T4)", status: "Review Recommended", statusKind: "amber",
    actions: [{ label: "View Report", primary: true }],
    detail: {
      rows: [
        { label: "Test",          value: "Thyroid Profile — TSH, T3, T4" },
        { label: "Lab",           value: "HealthLab Diagnostics (✓ Verified)" },
        { label: "Date",          value: "15 August 2026" },
        { label: "Ordered by",    value: "Dr. Priya Mehta" },
        { label: "Result status", value: "TSH slightly outside reference range" },
      ],
      note: "Discuss results with your doctor. This report does not constitute a diagnosis.",
    },
  },
  {
    id: "e8", type: "prescription", date: "28 Jun 2026", dateGroup: "28 June 2026",
    title: "Prescription", subtitle: "Dr. Priya Mehta",
    meta: "3 medicines · Metformin, Atorvastatin, Aspirin", status: "Active", statusKind: "primary",
    actions: [{ label: "View Prescription", primary: true }],
    detail: {
      rows: [
        { label: "Prescribed by", value: "Dr. Priya Mehta" },
        { label: "Date",          value: "28 June 2026" },
        { label: "Medicines",     value: "Metformin 500 mg · Atorvastatin 10 mg · Aspirin 75 mg" },
        { label: "Duration",      value: "Ongoing" },
      ],
    },
  },
];

type FilterType = "all" | EventType;
const FILTERS: { id: FilterType; label: string }[] = [
  { id: "all",          label: "All"               },
  { id: "consultation", label: "Consultations"      },
  { id: "prescription", label: "Prescriptions"      },
  { id: "lab",          label: "Lab Reports"        },
  { id: "document",     label: "Documents"          },
  { id: "teleconsult",  label: "Teleconsultations"  },
  { id: "pharmacy",     label: "Pharmacy Orders"    },
];

// ─── Event palette ────────────────────────────────────────────────────────────
const EVT: Record<EventType, { icon: string; color: string; bg: string; border: string; label: string }> = {
  consultation: { icon: ic.stethoscope, color: T.primary,  bg: T.primaryLight,  border: T.primaryBorder,  label: "Consultation"      },
  prescription: { icon: ic.pill,        color: T.purple,   bg: T.purpleLight,   border: T.purpleBorder,   label: "Prescription"      },
  lab:          { icon: ic.flask,       color: T.amber,    bg: T.amberLight,    border: T.amberBorder,    label: "Lab Report"        },
  document:     { icon: ic.fileText,    color: T.blue,     bg: T.blueLight,     border: T.blueBorder,     label: "Document"          },
  teleconsult:  { icon: ic.video,       color: T.teal2,    bg: T.teal2Light,    border: T.teal2Border,    label: "Teleconsultation"  },
  pharmacy:     { icon: ic.cart,        color: T.navy,     bg: T.muted,         border: T.border,         label: "Pharmacy Order"    },
};

const STATUS_PALETTE: Record<string, { color: string; bg: string; border: string }> = {
  success: { color: T.success, bg: T.successLight, border: T.successBorder },
  primary: { color: T.primary, bg: T.primaryLight, border: T.primaryBorder },
  amber:   { color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  blue:    { color: T.blue,    bg: T.blueLight,    border: T.blueBorder    },
  purple:  { color: T.purple,  bg: T.purpleLight,  border: T.purpleBorder  },
  gray:    { color: T.gray,    bg: T.muted,        border: T.border        },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ label, kind = "gray" }: { label: string; kind?: string }) {
  const p = STATUS_PALETTE[kind] ?? STATUS_PALETTE.gray;
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: p.color, background: p.bg, border: `1px solid ${p.border}`, padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function MetricTile({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div style={{ flex: 1, padding: "14px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", gap: 12, alignItems: "flex-start", minWidth: 0 }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={16} stroke={color} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: T.navy, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ event, onClose }: { event: TimelineEvent; onClose: () => void }) {
  const evt = EVT[event.type];
  const sp  = STATUS_PALETTE[event.statusKind];

  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Head */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 9, background: evt.bg, border: `1px solid ${evt.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={evt.icon} size={17} stroke={evt.color} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 2 }}>{event.title}</div>
          <div style={{ fontSize: 11, color: T.gray }}>{event.date}</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon d={ic.x} size={15} stroke={T.grayLight} />
        </button>
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "16px 20px" }}>
        <div style={{ marginBottom: 14 }}>
          <Badge label={event.status} kind={event.statusKind} />
        </div>

        {event.detail.rows.map((row) => (
          <div key={row.label} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 2 }}>{row.label.toUpperCase()}</div>
            <div style={{ fontSize: 12, color: T.navy, lineHeight: 1.55 }}>{row.value}</div>
          </div>
        ))}

        {/* Clinical insight */}
        {event.detail.insight && (
          <div style={{ marginTop: 14, padding: "12px 14px", background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderLeft: `3px solid ${T.amber}`, borderRadius: "0 8px 8px 0" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.amber, letterSpacing: "0.07em", marginBottom: 4 }}>CLINICAL INSIGHT</div>
            <div style={{ fontSize: 12, color: "#92400e", lineHeight: 1.55 }}>{event.detail.insight}</div>
            {event.detail.risk && (
              <div style={{ marginTop: 6, fontSize: 11, color: T.amber }}>Risk level: <strong>{event.detail.risk}</strong></div>
            )}
            {event.detail.note && (
              <div style={{ marginTop: 6, fontSize: 10, color: "#b45309", fontStyle: "italic" }}>{event.detail.note}</div>
            )}
          </div>
        )}

        {event.detail.note && !event.detail.insight && (
          <div style={{ marginTop: 12, padding: "10px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7, display: "flex", gap: 7, alignItems: "flex-start" }}>
            <Icon d={ic.info} size={12} stroke={T.gray} />
            <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>{event.detail.note}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: "14px 20px", borderTop: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
        {event.actions.map((a) => (
          <button key={a.label} style={{
            width: "100%", padding: "9px",
            background: a.primary ? T.primary : T.white,
            border: `1px solid ${a.primary ? T.primary : T.border}`,
            borderRadius: 8, fontSize: 12, fontWeight: 700,
            color: a.primary ? "#fff" : T.navy, cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            {a.label}
            {a.primary && <Icon d={ic.arrowRight} size={13} stroke="#fff" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Timeline event card ──────────────────────────────────────────────────────
function EventCard({
  event, isLast, selected, onSelect, isMobile,
}: {
  event: TimelineEvent;
  isLast: boolean;
  selected: boolean;
  onSelect: (e: TimelineEvent) => void;
  isMobile: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const evt = EVT[event.type];
  const sp  = STATUS_PALETTE[event.statusKind];

  return (
    <div style={{ display: "flex", gap: 0 }}>
      {/* Spine column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: selected ? evt.color : evt.bg,
          border: `2px solid ${selected ? evt.color : evt.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, zIndex: 1, transition: "all 0.15s",
          boxShadow: selected ? `0 0 0 4px ${evt.color}22` : "none",
        }}>
          <Icon d={evt.icon} size={15} stroke={selected ? "#fff" : evt.color} />
        </div>
        {!isLast && (
          <div style={{ width: 2, flex: 1, minHeight: 20, background: T.border, margin: "4px 0" }} />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20, paddingLeft: 4 }}>
        <div
          onClick={() => isMobile ? setExpanded((v) => !v) : onSelect(event)}
          style={{
            background: T.white,
            border: `1px solid ${selected ? evt.color : T.border}`,
            borderLeft: `3px solid ${selected ? evt.color : evt.border}`,
            borderRadius: "0 10px 10px 0",
            padding: "13px 16px",
            cursor: "pointer",
            transition: "border-color 0.13s",
          }}
        >
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const, marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{event.title}</span>
                <Badge label={event.status} kind={event.statusKind} />
              </div>
              <div style={{ fontSize: 12, color: T.gray }}>{event.subtitle}</div>
            </div>
            {isMobile && (
              <Icon d={expanded ? ic.chevUp : ic.chevDown} size={14} stroke={T.grayLight} />
            )}
          </div>

          {/* Meta */}
          <div style={{ fontSize: 11, color: T.grayLight, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon d={ic.info} size={11} stroke={T.grayLight} />
            {event.meta}
          </div>

          {/* Actions row */}
          <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" as const }}>
            {event.actions.map((a) => (
              <button key={a.label} onClick={(e) => { e.stopPropagation(); onSelect(event); }} style={{
                padding: "4px 11px",
                background: a.primary ? T.primaryLight : T.muted,
                border: `1px solid ${a.primary ? T.primaryBorder : T.border}`,
                borderRadius: 6, fontSize: 11, fontWeight: 600,
                color: a.primary ? T.primary : T.gray, cursor: "pointer",
                fontFamily: "Inter, system-ui, sans-serif",
              }}>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile expanded detail */}
        {isMobile && expanded && (
          <div style={{ marginTop: 8 }}>
            <DetailPanel event={event} onClose={() => setExpanded(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyTimeline() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Icon d={ic.activity} size={24} stroke={T.grayLight} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 8 }}>No health records yet</div>
      <p style={{ margin: "0 0 20px", fontSize: 13, color: T.gray, lineHeight: 1.65, maxWidth: 320, marginLeft: "auto", marginRight: "auto" }}>
        Your consultations, prescriptions, lab reports and other healthcare activity will appear here.
      </p>
      <button style={{ padding: "10px 22px", background: T.primary, border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
        Start Health Check-in
      </button>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function HealthTimeline({ onBack }: { onBack: () => void }) {
  const w        = useW();
  const isMobile = w < 768;

  const [filter,       setFilter]       = useState<FilterType>("all");
  const [search,       setSearch]       = useState("");
  const [searchFocus,  setSearchFocus]  = useState(false);
  const [selectedEvt,  setSelectedEvt]  = useState<TimelineEvent | null>(EVENTS[0]);

  const filtered = EVENTS.filter((e) => {
    const matchF = filter === "all" || e.type === filter;
    const q = search.toLowerCase();
    const matchQ = !q || e.title.toLowerCase().includes(q) || e.subtitle.toLowerCase().includes(q) || e.meta.toLowerCase().includes(q);
    return matchF && matchQ;
  });

  // Group by date
  const groups: { dateGroup: string; events: TimelineEvent[] }[] = [];
  for (const evt of filtered) {
    const g = groups.find((x) => x.dateGroup === evt.dateGroup);
    if (g) g.events.push(evt);
    else groups.push({ dateGroup: evt.dateGroup, events: [evt] });
  }

  // ── Right panel ────────────────────────────────────────────────────────────
  const rightPanel = (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Detail */}
      {selectedEvt ? (
        <DetailPanel event={selectedEvt} onClose={() => setSelectedEvt(null)} />
      ) : (
        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, padding: "32px 20px", textAlign: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <Icon d={ic.eye} size={20} stroke={T.grayLight} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>Select a record</div>
          <p style={{ margin: 0, fontSize: 11, color: T.grayLight, lineHeight: 1.55 }}>
            Click any timeline event to view its full detail here.
          </p>
        </div>
      )}

      {/* Health snapshot */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>Health Snapshot</span>
        </div>
        <div style={{ padding: "14px 18px" }}>
          {[
            { label: "Current medicines",      value: "1 active",          color: T.primary },
            { label: "Known allergies",        value: "None reported",     color: T.success },
            { label: "Recent vitals",          value: "Not available",     color: T.grayLight },
            { label: "Upcoming appointment",   value: "15 Sep 2026",       color: T.navy    },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: T.gray }}>{row.label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: row.color }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABHA */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon d={ic.shield} size={14} stroke={T.primary} />
          <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>ABHA Health Records</span>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.success }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: T.success }}>Connected</span>
            <span style={{ fontSize: 10, color: T.grayLight, marginLeft: 2 }}>ID: 12-3456-7890-0001</span>
          </div>
          <p style={{ margin: "0 0 12px", fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
            Records linked through patient consent. Access and sharing depend on your consent settings.
          </p>
          <button style={{ width: "100%", padding: "8px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
            Manage Consent
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, display: "flex", flexDirection: "column" }}>

      {/* ── Header ── */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
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
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Health Timeline</div>
              {!isMobile && <div style={{ fontSize: 10, color: T.grayLight }}>One connected view of your healthcare journey</div>}
            </div>
          </div>
          <div style={{ flex: 1 }} />
          {!isMobile && (
            <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 13px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
              <Icon d={ic.printer} size={13} stroke={T.gray} />
              Export
            </button>
          )}
          <div style={{ position: "relative", cursor: "pointer", padding: 4 }}>
            <Icon d={ic.bell} size={19} stroke={T.gray} />
            <span style={{ position: "absolute", top: 0, right: 0, width: 14, height: 14, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer" }}>R</div>
        </div>

        {/* Patient strip */}
        <div style={{ padding: "10px 28px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" as const }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>R</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Rahul Sharma</div>
              <div style={{ fontSize: 11, color: T.gray }}>24 years · Male · <span style={{ color: T.success, fontWeight: 600 }}>ABHA Connected</span></div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          {/* Search */}
          <div style={{ position: "relative", width: isMobile ? "100%" : 260 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ic.search} size={13} stroke={T.grayLight} />
            </span>
            <input
              type="text"
              placeholder="Search health records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              style={{
                width: "100%", padding: "6px 10px 6px 30px",
                fontSize: 12, color: T.navy,
                border: `1px solid ${searchFocus ? T.primary : T.border}`,
                borderRadius: 8, background: T.muted, outline: "none",
                fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const,
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                <Icon d={ic.x} size={12} stroke={T.grayLight} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, maxWidth: 1200, width: "100%", margin: "0 auto", padding: isMobile ? "16px 16px 40px" : "24px 28px 60px", boxSizing: "border-box" as const }}>

        {/* Metrics row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" as const }}>
          <MetricTile label="Total Visits"    value="8"  icon={ic.stethoscope} color={T.primary} />
          <MetricTile label="Prescriptions"   value="6"  icon={ic.pill}        color={T.purple}  />
          <MetricTile label="Lab Reports"     value="12" icon={ic.flask}       color={T.amber}   />
          <MetricTile label="Documents"       value="9"  icon={ic.fileText}    color={T.blue}    />
        </div>

        {/* Filter tabs */}
        <div style={{ marginBottom: 20, overflowX: "auto" as const, paddingBottom: 4 }}>
          <div style={{ display: "flex", gap: 6, width: "max-content" }}>
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{
                  padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                  border: `1px solid ${active ? T.primary : T.border}`,
                  background: active ? T.primary : T.white,
                  color: active ? "#fff" : T.gray,
                  fontSize: 12, fontWeight: active ? 700 : 400,
                  fontFamily: "Inter, system-ui, sans-serif",
                  whiteSpace: "nowrap" as const,
                }}>
                  {f.label}
                  {f.id !== "all" && (
                    <span style={{ marginLeft: 5, fontSize: 10, fontWeight: 700, opacity: 0.7 }}>
                      {EVENTS.filter((e) => e.type === f.id).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1fr) 300px",
          gap: 20,
          alignItems: "start",
        }}>

          {/* ── Timeline column ── */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11 }}>
                <EmptyTimeline />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {groups.map((group, gi) => (
                  <div key={group.dateGroup} style={{ marginBottom: gi < groups.length - 1 ? 28 : 0 }}>
                    {/* Date label */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <div style={{ padding: "4px 12px", background: T.navy, borderRadius: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.03em" }}>{group.dateGroup}</span>
                      </div>
                      <div style={{ flex: 1, height: 1, background: T.border }} />
                    </div>

                    {/* Events in this group */}
                    <div style={{ paddingLeft: 6 }}>
                      {group.events.map((evt, i) => (
                        <EventCard
                          key={evt.id}
                          event={evt}
                          isLast={i === group.events.length - 1 && gi === groups.length - 1}
                          selected={selectedEvt?.id === evt.id}
                          onSelect={(e) => setSelectedEvt((prev) => prev?.id === e.id ? null : e)}
                          isMobile={isMobile}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right column (desktop) ── */}
          {!isMobile && (
            <div style={{ position: "sticky", top: 145 }}>
              {rightPanel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

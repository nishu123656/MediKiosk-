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
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  chevDown:    "M19 9l-7 7-7-7",
  chevLeft:    "M15 18l-6-6 6-6",
  chevRight:   "M9 18l6-6-6-6",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  building:    "M3 21h18M3 7v1a3 3 0 006 0V7m6 0v1a3 3 0 006 0V7M3 7l9-4 9 4M4 21V7m16 14V7",
  video:       "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  award:       "M12 15l-4.5 2.5 1-4.5L5 10l4.5-.5L12 5l2.5 4.5 4.5.5-3.5 3 1 4.5z",
  globe:       "M12 22a10 10 0 100-20 10 10 0 000 20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  star:        "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  filter:      "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  x:           "M18 6L6 18M6 6l12 12",
  arrowLeft:   "M19 12H5M12 19l-7-7 7-7",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  mapPin:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a1 1 0 11-2 0 1 1 0 012 0z",
  rupee:       "M6 3h12M6 8h12M6 13h8 M14 13c2 0 4 1 4 4s-2 4-4 4H6",
  plus:        "M12 5v14M5 12h14",
  confetti:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  clipboard:   "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2 M12 12h4 M12 16h4 M8 12h.01 M8 16h.01",
  bell:        "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
};

// ── Data ──────────────────────────────────────────────────────────────────────
const SPECIALTIES = ["All Specialties", "Endocrinology", "Cardiology", "Neurology", "Orthopaedics", "Gynaecology", "General Medicine", "Dermatology", "Psychiatry"];
const HOSPITALS   = ["All Hospitals", "Apollo Hospitals, Mumbai", "Kokilaben Hospital, Mumbai", "Nanavati Hospital, Mumbai", "Lilavati Hospital, Mumbai"];
const CONSULT_TYPES = ["All Types", "In-Person", "Video", "Audio"];
const LANGUAGES   = ["All Languages", "English", "Hindi", "Marathi", "Tamil", "Telugu", "Kannada"];
const AVAIL_OPTS  = ["Any Time", "Today", "Tomorrow", "This Week", "Next Week"];

interface Doctor {
  id: number;
  name: string;
  spec: string;
  qual: string;
  hospital: string;
  location: string;
  exp: string;
  fee: string;
  languages: string[];
  rating: number;
  reviews: number;
  nextSlot: string;
  modes: ("inperson" | "video" | "audio")[];
  verified: boolean;
}

const DOCTORS: Doctor[] = [
  {
    id: 1, name: "Dr. Priya Mehta", spec: "Endocrinology & Metabolism",
    qual: "MBBS, MD, DM (Endocrinology)", hospital: "Apollo Hospitals", location: "Bandra, Mumbai",
    exp: "12 yrs", fee: "₹800", languages: ["English", "Hindi", "Marathi"],
    rating: 4.9, reviews: 342, nextSlot: "Today, 11:00 AM",
    modes: ["inperson", "video"], verified: true,
  },
  {
    id: 2, name: "Dr. S. Krishnan", spec: "Cardiology",
    qual: "MBBS, MD, DM (Cardiology), FESC", hospital: "Kokilaben Hospital", location: "Andheri, Mumbai",
    exp: "18 yrs", fee: "₹1,200", languages: ["English", "Hindi", "Tamil"],
    rating: 4.8, reviews: 518, nextSlot: "Today, 2:30 PM",
    modes: ["inperson", "video", "audio"], verified: true,
  },
  {
    id: 3, name: "Dr. Kavita Nair", spec: "Neurology",
    qual: "MBBS, MD, DM (Neurology)", hospital: "Nanavati Hospital", location: "Vile Parle, Mumbai",
    exp: "9 yrs", fee: "₹900", languages: ["English", "Hindi", "Malayalam"],
    rating: 4.7, reviews: 201, nextSlot: "Tomorrow, 10:00 AM",
    modes: ["inperson", "video"], verified: true,
  },
  {
    id: 4, name: "Dr. Amit Verma", spec: "Orthopaedics",
    qual: "MBBS, MS (Ortho), DNB", hospital: "Lilavati Hospital", location: "Bandra, Mumbai",
    exp: "15 yrs", fee: "₹700", languages: ["English", "Hindi"],
    rating: 4.6, reviews: 289, nextSlot: "Sep 12, 9:00 AM",
    modes: ["inperson"], verified: true,
  },
  {
    id: 5, name: "Dr. Riya Patel", spec: "Gynaecology",
    qual: "MBBS, MS (OBG), Fellowship (MFM)", hospital: "Apollo Hospitals", location: "Bandra, Mumbai",
    exp: "11 yrs", fee: "₹850", languages: ["English", "Hindi", "Gujarati"],
    rating: 4.9, reviews: 476, nextSlot: "Today, 4:00 PM",
    modes: ["inperson", "video", "audio"], verified: true,
  },
];

// Calendar data — September 2026
const SEPT_DAYS: (number | null)[] = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
// today = 10, mark a few unavailable
const UNAVAILABLE = new Set([11, 13, 17, 20, 21, 24, 27]);
const SLOTS_AM = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
const SLOTS_PM = ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"];
const BOOKED   = new Set(["09:30 AM", "10:30 AM", "03:00 PM", "04:00 PM"]);

const REASONS = ["Routine Check-up", "Follow-up Consultation", "New Complaint", "Second Opinion", "Health Certificate", "Other"];
const SYMPTOMS_LIST = ["Fatigue", "Headache", "Chest Pain", "Shortness of Breath", "Back Pain", "Fever", "Nausea", "Dizziness", "Joint Pain", "Skin Rash"];

type View = "search" | "book" | "success";

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

function Stars({ n }: { n: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} d={ic.star} size={11} stroke={i <= Math.round(n) ? T.amber : T.border} fill={i <= Math.round(n) ? T.amber : "none"} />
      ))}
    </span>
  );
}

function ModeIcon({ m }: { m: "inperson" | "video" | "audio" }) {
  const cfg = { inperson: { d: ic.stethoscope, color: T.primary, label: "In-Person" }, video: { d: ic.video, color: T.blue, label: "Video" }, audio: { d: ic.phone, color: T.purple, label: "Audio" } };
  const c = cfg[m];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: c.color, background: c.color + "10", border: `1px solid ${c.color}25`, padding: "2px 8px", borderRadius: 20 }}>
      <Icon d={c.d} size={10} stroke={c.color} />{c.label}
    </span>
  );
}

function Avatar({ name, size = 56 }: { name: string; size?: number }) {
  const colors = [T.primary, T.blue, T.purple, T.amber, T.success];
  const bg = colors[name.charCodeAt(3) % colors.length];
  const initials = name.replace("Dr. ", "").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg + "18", border: `2px solid ${bg}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.3, fontWeight: 700, color: bg, flexShrink: 0, letterSpacing: "-0.02em" }}>
      {initials}
    </div>
  );
}

function FilterSelect({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const active = value !== options[0];
  return (
    <div style={{ position: "relative" as const }}>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ appearance: "none" as const, padding: "7px 28px 7px 11px", fontSize: 12, fontWeight: active ? 600 : 400, color: active ? T.primary : T.gray, background: active ? T.primaryLight : T.white, border: `1px solid ${active ? T.primaryBorder : T.border}`, borderRadius: 8, outline: "none", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <span style={{ position: "absolute" as const, right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" as const }}>
        <Icon d={ic.chevDown} size={12} stroke={active ? T.primary : T.grayLight} />
      </span>
    </div>
  );
}

// ── Search + Booking View ──────────────────────────────────────────────────────
export default function AppointmentBooking({ onBack }: { onBack: () => void }) {
  const [view,           setView]           = useState<View>("search");
  const [query,          setQuery]          = useState("");
  const [qFocus,         setQFocus]         = useState(false);
  const [filterSpec,     setFilterSpec]     = useState(SPECIALTIES[0]);
  const [filterHosp,     setFilterHosp]     = useState(HOSPITALS[0]);
  const [filterType,     setFilterType]     = useState(CONSULT_TYPES[0]);
  const [filterLang,     setFilterLang]     = useState(LANGUAGES[0]);
  const [filterAvail,    setFilterAvail]    = useState(AVAIL_OPTS[0]);
  const [selectedDoc,    setSelectedDoc]    = useState<Doctor | null>(null);
  const [consultMode,    setConsultMode]    = useState<"inperson" | "video" | "audio">("inperson");
  const [selectedDate,   setSelectedDate]   = useState<number | null>(null);
  const [selectedSlot,   setSelectedSlot]   = useState<string | null>(null);
  const [reason,         setReason]         = useState(REASONS[0]);
  const [symptoms,       setSymptoms]       = useState<string[]>([]);
  const [prefLang,       setPrefLang]       = useState("English");
  const [notes,          setNotes]          = useState("");
  const [apptId,         setApptId]         = useState("");
  const [tokenNum,       setTokenNum]       = useState("");

  const filteredDocs = DOCTORS.filter((d) => {
    const q = query.toLowerCase();
    const matchQ = !q || d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.hospital.toLowerCase().includes(q);
    const matchSpec = filterSpec === SPECIALTIES[0] || d.spec.includes(filterSpec);
    const matchHosp = filterHosp === HOSPITALS[0] || d.hospital === filterHosp.split(",")[0];
    const matchType = filterType === CONSULT_TYPES[0] || (filterType === "In-Person" && d.modes.includes("inperson")) || (filterType === "Video" && d.modes.includes("video")) || (filterType === "Audio" && d.modes.includes("audio"));
    const matchLang = filterLang === LANGUAGES[0] || d.languages.includes(filterLang);
    return matchQ && matchSpec && matchHosp && matchType && matchLang;
  });

  const activeFilters = [filterSpec, filterHosp, filterType, filterLang, filterAvail].filter((v, i) => v !== [SPECIALTIES, HOSPITALS, CONSULT_TYPES, LANGUAGES, AVAIL_OPTS][i][0]).length;

  function handleBook(doc: Doctor) {
    setSelectedDoc(doc);
    setConsultMode(doc.modes[0]);
    setSelectedDate(null);
    setSelectedSlot(null);
    setView("book");
    window.scrollTo(0, 0);
  }

  function handleConfirm() {
    const id = "APT-" + Math.floor(10000 + Math.random() * 90000);
    const tok = "T-" + String(Math.floor(1 + Math.random() * 20)).padStart(2, "0");
    setApptId(id);
    setTokenNum(tok);
    setView("success");
    window.scrollTo(0, 0);
  }

  const canConfirm = selectedDate !== null && selectedSlot !== null;

  const modeLabel = { inperson: "In-Person", video: "Video Consultation", audio: "Audio Consultation" };

  // ── SUCCESS ────────────────────────────────────────────────────────────────
  if (view === "success" && selectedDoc) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif" }}>
        <PageHeader onBack={onBack} />
        <div style={{ maxWidth: 600, margin: "60px auto", padding: "0 24px" }}>
          <Card>
            {/* Green banner */}
            <div style={{ background: T.successLight, borderBottom: `1px solid ${T.successBorder}`, padding: "28px 32px", textAlign: "center" as const }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.white, border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <Icon d={ic.checkCircle} size={28} stroke={T.success} />
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: T.success, marginBottom: 6 }}>Appointment Confirmed!</div>
              <div style={{ fontSize: 13, color: T.gray }}>Your appointment has been successfully booked on MediKiosk.</div>
            </div>

            {/* Details */}
            <div style={{ padding: "24px 32px" }}>
              {/* Appointment ID + Token */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
                {[
                  { label: "Appointment ID", value: apptId, mono: true },
                  { label: "Token Number",   value: tokenNum, mono: true },
                ].map((r) => (
                  <div key={r.label} style={{ padding: "12px 16px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9 }}>
                    <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 600, marginBottom: 5, letterSpacing: "0.05em" }}>{r.label.toUpperCase()}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.navy, fontFamily: r.mono ? "monospace" : undefined }}>{r.value}</div>
                  </div>
                ))}
              </div>

              {/* Doctor + summary */}
              <div style={{ display: "flex", gap: 14, padding: "16px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, marginBottom: 16 }}>
                <Avatar name={selectedDoc.name} size={48} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{selectedDoc.name}</div>
                  <div style={{ fontSize: 12, color: T.gray }}>{selectedDoc.spec}</div>
                  <div style={{ fontSize: 11, color: T.grayLight, display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                    <Icon d={ic.building} size={11} stroke={T.grayLight} />{selectedDoc.hospital} · {selectedDoc.location}
                  </div>
                </div>
                <Pill label="Verified Doctor" color={T.success} bg={T.successLight} border={T.successBorder} />
              </div>

              {[
                { label: "Date",               value: `Sep ${selectedDate}, 2026` },
                { label: "Time",               value: selectedSlot! },
                { label: "Consultation Type",  value: modeLabel[consultMode] },
                { label: "Hospital",           value: `${selectedDoc.hospital}, ${selectedDoc.location}` },
                { label: "Consultation Fee",   value: selectedDoc.fee },
                { label: "Reason for Visit",   value: reason },
              ].map((r, i, arr) => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ fontSize: 12, color: T.gray }}>{r.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{r.value}</span>
                </div>
              ))}

              {/* Notice */}
              <div style={{ marginTop: 18, padding: "11px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <Icon d={ic.info} size={14} stroke={T.primary} />
                  <p style={{ margin: 0, fontSize: 11, color: T.primary, lineHeight: 1.6 }}>
                    Appointment details have been added to your MediKiosk health timeline. You will receive a reminder 30 minutes before the consultation.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button onClick={() => setView("search")} style={{ flex: 1, padding: "11px", background: T.primary, border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                  View Appointment
                </button>
                <button style={{ flex: 1, padding: "11px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, fontSize: 13, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Icon d={ic.calendar} size={14} stroke={T.navy} />Add to Calendar
                </button>
              </div>
              <button onClick={() => { setView("search"); setSelectedDoc(null); }} style={{ width: "100%", marginTop: 8, padding: "9px", background: "none", border: "none", fontSize: 12, color: T.grayLight, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                Book another appointment
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ── BOOKING VIEW ───────────────────────────────────────────────────────────
  if (view === "book" && selectedDoc) {
    const doc = selectedDoc;
    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif" }}>
        <PageHeader onBack={onBack} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 60px" }}>
          {/* Back to search */}
          <button onClick={() => setView("search")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: T.gray, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", marginBottom: 18, padding: 0 }}>
            <Icon d={ic.arrowLeft} size={14} stroke={T.gray} />Back to search results
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 18 }}>

            {/* ── LEFT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Doctor card */}
              <Card>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <Avatar name={doc.name} size={60} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" as const }}>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: T.navy }}>{doc.name}</div>
                          <div style={{ fontSize: 13, color: T.gray, marginTop: 2 }}>{doc.spec}</div>
                          <div style={{ fontSize: 11, color: T.grayLight, marginTop: 2 }}>{doc.qual}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 5 }}>
                          {doc.verified && <Pill label="Verified Doctor" color={T.success} bg={T.successLight} border={T.successBorder} />}
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <Stars n={doc.rating} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>{doc.rating}</span>
                            <span style={{ fontSize: 11, color: T.grayLight }}>({doc.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" as const }}>
                        <span style={{ fontSize: 11, color: T.gray, display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon d={ic.building} size={12} stroke={T.grayLight} />{doc.hospital}
                        </span>
                        <span style={{ fontSize: 11, color: T.gray, display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon d={ic.mapPin} size={12} stroke={T.grayLight} />{doc.location}
                        </span>
                        <span style={{ fontSize: 11, color: T.gray, display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon d={ic.award} size={12} stroke={T.grayLight} />{doc.exp} experience
                        </span>
                        <span style={{ fontSize: 11, color: T.gray, display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon d={ic.globe} size={12} stroke={T.grayLight} />{doc.languages.join(", ")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" as const }}>
                        {doc.modes.map((m) => <ModeIcon key={m} m={m} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Consultation type */}
              <Card>
                <CardHeader title="Consultation Type" sub="Choose how you'd like to meet the doctor" />
                <div style={{ padding: "16px 20px", display: "flex", gap: 12 }}>
                  {(["inperson", "video", "audio"] as const).filter((m) => doc.modes.includes(m)).map((m) => {
                    const cfg = {
                      inperson: { label: "In-Person",         sub: "Visit hospital OPD",               icon: ic.stethoscope, color: T.primary },
                      video:    { label: "Video Consultation", sub: "Secure video call",                 icon: ic.video,       color: T.blue    },
                      audio:    { label: "Audio Consultation", sub: "Phone consultation",                icon: ic.phone,       color: T.purple  },
                    }[m];
                    const on = consultMode === m;
                    return (
                      <div key={m} onClick={() => setConsultMode(m)}
                        style={{ flex: 1, padding: "14px 16px", border: `1.5px solid ${on ? cfg.color + "60" : T.border}`, borderRadius: 10, cursor: "pointer", background: on ? cfg.color + "07" : T.muted, transition: "all 0.15s" }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: on ? cfg.color + "14" : T.border + "50", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 9 }}>
                          <Icon d={cfg.icon} size={15} stroke={on ? cfg.color : T.grayLight} />
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: on ? T.navy : T.gray }}>{cfg.label}</div>
                        <div style={{ fontSize: 10, color: T.grayLight, marginTop: 2 }}>{cfg.sub}</div>
                        {on && (
                          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />
                            <span style={{ fontSize: 10, fontWeight: 600, color: cfg.color }}>Selected</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Calendar */}
              <Card>
                <CardHeader title="Select Date" sub="September 2026 · Available dates highlighted" right={
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ width: 26, height: 26, border: `1px solid ${T.border}`, borderRadius: 6, background: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon d={ic.chevLeft} size={13} stroke={T.gray} />
                    </button>
                    <button style={{ width: 26, height: 26, border: `1px solid ${T.border}`, borderRadius: 6, background: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon d={ic.chevRight} size={13} stroke={T.gray} />
                    </button>
                  </div>
                } />
                <div style={{ padding: "14px 20px 18px" }}>
                  {/* Weekday headers */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} style={{ textAlign: "center" as const, fontSize: 10, fontWeight: 700, color: T.grayLight, padding: "4px 0", letterSpacing: "0.05em" }}>{d}</div>
                    ))}
                  </div>
                  {/* Days grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
                    {SEPT_DAYS.map((day, i) => {
                      if (!day) return <div key={i} />;
                      const past       = day < 10;
                      const unavail    = UNAVAILABLE.has(day);
                      const isToday    = day === 10;
                      const isSelected = selectedDate === day;
                      const disabled   = past || unavail;
                      return (
                        <button key={day} disabled={disabled} onClick={() => { setSelectedDate(day); setSelectedSlot(null); }}
                          style={{
                            height: 36, borderRadius: 8, border: isSelected ? `2px solid ${T.primary}` : isToday ? `1.5px solid ${T.primaryBorder}` : "1px solid transparent",
                            background: isSelected ? T.primary : isToday ? T.primaryLight : disabled ? "transparent" : T.muted,
                            color: isSelected ? "#fff" : isToday ? T.primary : disabled ? T.border : T.navy,
                            fontSize: 12, fontWeight: isSelected || isToday ? 700 : 400,
                            cursor: disabled ? "not-allowed" : "pointer", fontFamily: "Inter, system-ui, sans-serif",
                            position: "relative" as const, transition: "all 0.1s",
                          }}>
                          {day}
                          {isToday && !isSelected && (
                            <span style={{ position: "absolute" as const, bottom: 4, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: T.primary, display: "block" }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {/* Legend */}
                  <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                    {[
                      { dot: T.primary, label: "Today" },
                      { dot: T.muted,   label: "Available", border: T.border },
                      { dot: T.border,  label: "Unavailable" },
                    ].map((l) => (
                      <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: l.dot, border: l.border ? `1px solid ${l.border}` : undefined }} />
                        <span style={{ fontSize: 10, color: T.grayLight }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Time slots */}
              {selectedDate && (
                <Card>
                  <CardHeader title="Available Time Slots" sub={`Sep ${selectedDate}, 2026 · ${SLOTS_AM.length + SLOTS_PM.length - BOOKED.size} slots available`} />
                  <div style={{ padding: "14px 20px 18px" }}>
                    {[{ label: "Morning", slots: SLOTS_AM }, { label: "Afternoon / Evening", slots: SLOTS_PM }].map((group) => (
                      <div key={group.label} style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>{group.label.toUpperCase()}</div>
                        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                          {group.slots.map((s) => {
                            const booked  = BOOKED.has(s);
                            const isSel   = selectedSlot === s;
                            return (
                              <button key={s} disabled={booked} onClick={() => setSelectedSlot(s)}
                                style={{ padding: "7px 14px", border: `1.5px solid ${isSel ? T.primary : booked ? T.border : T.border}`, borderRadius: 8, background: isSel ? T.primary : booked ? T.muted : T.white, color: isSel ? "#fff" : booked ? T.grayLight : T.navy, fontSize: 12, fontWeight: isSel ? 700 : 400, cursor: booked ? "not-allowed" : "pointer", fontFamily: "Inter, system-ui, sans-serif", textDecoration: booked ? "line-through" : "none", transition: "all 0.1s" }}>
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <p style={{ margin: "6px 0 0", fontSize: 10, color: T.grayLight }}>Strikethrough slots are already booked. Each slot is {20} minutes.</p>
                  </div>
                </Card>
              )}

              {/* Visit details */}
              <Card>
                <CardHeader title="Appointment Details" sub="Tell the doctor about your visit" />
                <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column" as const, gap: 14 }}>

                  {/* Reason */}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.grayLight, marginBottom: 6, letterSpacing: "0.04em" }}>REASON FOR VISIT</label>
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7 }}>
                      {REASONS.map((r) => (
                        <button key={r} onClick={() => setReason(r)}
                          style={{ padding: "6px 13px", border: `1.5px solid ${reason === r ? T.primary : T.border}`, borderRadius: 20, background: reason === r ? T.primaryLight : T.white, color: reason === r ? T.primary : T.gray, fontSize: 12, fontWeight: reason === r ? 700 : 400, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.grayLight, marginBottom: 6, letterSpacing: "0.04em" }}>SYMPTOMS <span style={{ fontWeight: 400, color: T.grayLight }}>(optional — select all that apply)</span></label>
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7 }}>
                      {SYMPTOMS_LIST.map((s) => {
                        const on = symptoms.includes(s);
                        return (
                          <button key={s} onClick={() => setSymptoms((prev) => on ? prev.filter((x) => x !== s) : [...prev, s])}
                            style={{ padding: "5px 12px", border: `1px solid ${on ? T.amber + "60" : T.border}`, borderRadius: 20, background: on ? T.amberLight : T.muted, color: on ? T.amber : T.gray, fontSize: 11, fontWeight: on ? 600 : 400, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                            {on && "✓ "}{s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.grayLight, marginBottom: 6, letterSpacing: "0.04em" }}>ADDITIONAL NOTES <span style={{ fontWeight: 400 }}>(optional)</span></label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Any additional information for the doctor..."
                      style={{ width: "100%", padding: "9px 12px", fontSize: 13, color: T.navy, border: `1px solid ${T.border}`, borderRadius: 8, outline: "none", fontFamily: "Inter, system-ui, sans-serif", resize: "vertical" as const, boxSizing: "border-box" as const }} />
                  </div>

                  {/* Language */}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.grayLight, marginBottom: 6, letterSpacing: "0.04em" }}>PREFERRED LANGUAGE</label>
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap" as const }}>
                      {doc.languages.map((l) => (
                        <button key={l} onClick={() => setPrefLang(l)}
                          style={{ padding: "5px 13px", border: `1.5px solid ${prefLang === l ? T.primary : T.border}`, borderRadius: 20, background: prefLang === l ? T.primaryLight : T.white, color: prefLang === l ? T.primary : T.gray, fontSize: 12, fontWeight: prefLang === l ? 700 : 400, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Confirm */}
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setView("search")} style={{ padding: "12px 24px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, fontSize: 13, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                  Cancel
                </button>
                <button onClick={handleConfirm} disabled={!canConfirm}
                  style={{ flex: 1, padding: "12px", background: canConfirm ? T.primary : T.border, border: "none", borderRadius: 9, fontSize: 14, fontWeight: 700, color: canConfirm ? "#fff" : T.grayLight, cursor: canConfirm ? "pointer" : "not-allowed", fontFamily: "Inter, system-ui, sans-serif", transition: "all 0.15s" }}>
                  {canConfirm ? "Confirm Appointment" : "Select a date and time to continue"}
                </button>
              </div>
            </div>

            {/* ── RIGHT: Summary ── */}
            <div style={{ position: "sticky" as const, top: 20, alignSelf: "flex-start" as const, display: "flex", flexDirection: "column" as const, gap: 14 }}>
              <Card>
                <CardHeader title="Appointment Summary" />
                <div style={{ padding: "16px 18px" }}>
                  {/* Doctor */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${T.border}` }}>
                    <Avatar name={doc.name} size={42} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{doc.name}</div>
                      <div style={{ fontSize: 11, color: T.gray }}>{doc.spec}</div>
                      <div style={{ fontSize: 10, color: T.grayLight, marginTop: 2 }}>{doc.hospital}</div>
                    </div>
                  </div>

                  {[
                    { label: "Hospital",   value: `${doc.hospital}, ${doc.location}`, icon: ic.building },
                    { label: "Type",       value: modeLabel[consultMode],              icon: consultMode === "inperson" ? ic.stethoscope : consultMode === "video" ? ic.video : ic.phone },
                    { label: "Date",       value: selectedDate ? `Sep ${selectedDate}, 2026` : "Not selected", icon: ic.calendar },
                    { label: "Time",       value: selectedSlot  || "Not selected",     icon: ic.clock    },
                    { label: "Language",   value: prefLang,                             icon: ic.globe    },
                    { label: "Fee",        value: doc.fee,                              icon: ic.rupee    },
                  ].map((r) => (
                    <div key={r.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 11 }}>
                      <div style={{ width: 20, flexShrink: 0, marginTop: 1 }}>
                        <Icon d={r.icon} size={13} stroke={T.grayLight} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 600 }}>{r.label}</div>
                        <div style={{ fontSize: 12, color: (!selectedDate && r.label === "Date") || (!selectedSlot && r.label === "Time") ? T.grayLight : T.navy, fontWeight: 500 }}>{r.value}</div>
                      </div>
                    </div>
                  ))}

                  {/* Symptoms summary */}
                  {symptoms.length > 0 && (
                    <div style={{ marginTop: 4, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                      <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 600, marginBottom: 6 }}>SYMPTOMS</div>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
                        {symptoms.map((s) => (
                          <span key={s} style={{ fontSize: 10, color: T.amber, background: T.amberLight, border: `1px solid ${T.amberBorder}`, padding: "1px 8px", borderRadius: 20, fontWeight: 600 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completion indicator */}
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                      <span style={{ color: T.gray }}>Booking completion</span>
                      <span style={{ fontWeight: 700, color: canConfirm ? T.success : T.amber }}>{canConfirm ? "Ready" : "Incomplete"}</span>
                    </div>
                    <div style={{ height: 4, background: T.border, borderRadius: 3 }}>
                      <div style={{ height: "100%", width: canConfirm ? "100%" : selectedDate ? "66%" : "33%", background: canConfirm ? T.success : T.amber, borderRadius: 3, transition: "width 0.3s" }} />
                    </div>
                    {!canConfirm && (
                      <p style={{ margin: "8px 0 0", fontSize: 10, color: T.grayLight }}>
                        {!selectedDate ? "← Select a date from the calendar" : "← Select a time slot to continue"}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* ABHA notice */}
              <div style={{ padding: "12px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 9 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <Icon d={ic.shieldCheck} size={12} stroke={T.primary} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>ABHA Linked Booking</span>
                </div>
                <p style={{ margin: 0, fontSize: 10, color: T.primary, lineHeight: 1.6 }}>
                  This appointment will be linked to your ABHA Health ID. Your medical history will be shared with the doctor with your consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SEARCH VIEW ────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif" }}>
      <PageHeader onBack={onBack} />

      {/* Hero search strip */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.border}`, padding: "20px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Search bar */}
          <div style={{ position: "relative" as const, marginBottom: 14 }}>
            <span style={{ position: "absolute" as const, left: 14, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ic.search} size={16} stroke={qFocus ? T.primary : T.grayLight} />
            </span>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setQFocus(true)} onBlur={() => setQFocus(false)}
              placeholder="Search by doctor name, specialty or hospital..."
              style={{ width: "100%", padding: "11px 14px 11px 42px", fontSize: 14, color: T.navy, border: `1.5px solid ${qFocus ? T.primary : T.border}`, borderRadius: 10, background: T.white, outline: "none", fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const, transition: "border-color 0.15s" }} />
            {query && (
              <button onClick={() => setQuery("")} style={{ position: "absolute" as const, right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                <Icon d={ic.x} size={14} stroke={T.grayLight} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: T.gray, fontSize: 12 }}>
              <Icon d={ic.filter} size={13} stroke={T.gray} />
              <span style={{ fontWeight: 600 }}>Filter:</span>
            </div>
            <FilterSelect label="Specialty"  options={SPECIALTIES}    value={filterSpec}  onChange={setFilterSpec}  />
            <FilterSelect label="Hospital"   options={HOSPITALS}      value={filterHosp}  onChange={setFilterHosp}  />
            <FilterSelect label="Type"       options={CONSULT_TYPES}  value={filterType}  onChange={setFilterType}  />
            <FilterSelect label="Language"   options={LANGUAGES}      value={filterLang}  onChange={setFilterLang}  />
            <FilterSelect label="Availability" options={AVAIL_OPTS}   value={filterAvail} onChange={setFilterAvail} />
            {activeFilters > 0 && (
              <button onClick={() => { setFilterSpec(SPECIALTIES[0]); setFilterHosp(HOSPITALS[0]); setFilterType(CONSULT_TYPES[0]); setFilterLang(LANGUAGES[0]); setFilterAvail(AVAIL_OPTS[0]); }}
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.danger, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                <Icon d={ic.x} size={11} stroke={T.danger} />Clear ({activeFilters})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 24px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: T.gray }}>
            <span style={{ fontWeight: 700, color: T.navy }}>{filteredDocs.length}</span> doctor{filteredDocs.length !== 1 ? "s" : ""} found
            {query && <span> for "<span style={{ color: T.primary, fontWeight: 600 }}>{query}</span>"</span>}
          </div>
          <div style={{ fontSize: 11, color: T.grayLight }}>Sorted by availability</div>
        </div>

        {filteredDocs.length === 0 ? (
          <Card>
            <div style={{ padding: "48px", textAlign: "center" as const }}>
              <Icon d={ic.search} size={32} stroke={T.border} />
              <div style={{ marginTop: 14, fontSize: 15, fontWeight: 700, color: T.navy }}>No doctors found</div>
              <div style={{ fontSize: 13, color: T.gray, marginTop: 6 }}>Try adjusting your search or filters</div>
              <button onClick={() => { setQuery(""); setFilterSpec(SPECIALTIES[0]); setFilterHosp(HOSPITALS[0]); setFilterType(CONSULT_TYPES[0]); setFilterLang(LANGUAGES[0]); }}
                style={{ marginTop: 16, padding: "9px 20px", background: T.primary, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                Clear all filters
              </button>
            </div>
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
            {filteredDocs.map((doc) => (
              <Card key={doc.id}>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <Avatar name={doc.name} size={56} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Name + badges */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" as const }}>
                            <span style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>{doc.name}</span>
                            {doc.verified && <Pill label="Verified Doctor" color={T.success} bg={T.successLight} border={T.successBorder} />}
                          </div>
                          <div style={{ fontSize: 12, color: T.gray, marginTop: 3 }}>{doc.spec}</div>
                          <div style={{ fontSize: 11, color: T.grayLight, marginTop: 2 }}>{doc.qual}</div>
                        </div>
                        {/* Rating */}
                        <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end" }}>
                            <Stars n={doc.rating} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{doc.rating}</span>
                          </div>
                          <div style={{ fontSize: 10, color: T.grayLight, marginTop: 2 }}>{doc.reviews} reviews</div>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div style={{ display: "flex", gap: 18, marginTop: 11, flexWrap: "wrap" as const }}>
                        {[
                          { icon: ic.building,  val: `${doc.hospital}, ${doc.location}` },
                          { icon: ic.award,     val: `${doc.exp} experience`             },
                          { icon: ic.globe,     val: doc.languages.join(", ")            },
                        ].map((m, i) => (
                          <span key={i} style={{ fontSize: 11, color: T.gray, display: "flex", alignItems: "center", gap: 4 }}>
                            <Icon d={m.icon} size={12} stroke={T.grayLight} />{m.val}
                          </span>
                        ))}
                      </div>

                      {/* Modes + next slot + fee + buttons */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, flexWrap: "wrap" as const }}>
                        <div style={{ display: "flex", gap: 6, flex: 1, flexWrap: "wrap" as const }}>
                          {doc.modes.map((m) => <ModeIcon key={m} m={m} />)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: T.success }}>{doc.nextSlot}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{doc.fee} <span style={{ fontSize: 10, fontWeight: 400, color: T.grayLight }}>/ consult</span></div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button style={{ padding: "7px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                            <Icon d={ic.eye} size={12} stroke={T.gray} />View Profile
                          </button>
                          <button onClick={() => handleBook(doc)}
                            style={{ padding: "7px 16px", background: T.primary, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                            <Icon d={ic.calendar} size={12} stroke="#fff" />Book Appointment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* MediKiosk footer note */}
        <div style={{ marginTop: 24, padding: "13px 16px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 9, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Icon d={ic.shieldCheck} size={14} stroke={T.primary} />
          <p style={{ margin: 0, fontSize: 11, color: T.primary, lineHeight: 1.6 }}>
            All doctors listed are MCI-registered and verified by MediKiosk. Appointments are linked to your ABHA health ID. Teleconsultation sessions are end-to-end encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Shared Page Header ─────────────────────────────────────────────────────────
function PageHeader({ onBack }: { onBack: () => void }) {
  return (
    <header style={{ height: 56, background: T.white, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 14, position: "sticky" as const, top: 0, zIndex: 10 }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: T.gray, fontSize: 12, fontWeight: 600, fontFamily: "Inter, system-ui, sans-serif", padding: 0, flexShrink: 0 }}>
        <Icon d={ic.arrowLeft} size={15} stroke={T.gray} />Back
      </button>
      <div style={{ width: 1, height: 22, background: T.border }} />
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 24, height: 24, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={ic.heart} size={11} stroke="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Book an Appointment</div>
          <div style={{ fontSize: 10, color: T.grayLight }}>Find a doctor or hospital and choose a convenient consultation slot.</div>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 11px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20 }}>
        <Icon d={ic.shieldCheck} size={12} stroke={T.success} />
        <span style={{ fontSize: 11, fontWeight: 700, color: T.success }}>ABHA Verified</span>
      </div>
      <div style={{ position: "relative" as const }}>
        <Icon d={ic.bell} size={17} stroke={T.gray} />
        <span style={{ position: "absolute" as const, top: -3, right: -4, width: 13, height: 13, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
      </div>
    </header>
  );
}

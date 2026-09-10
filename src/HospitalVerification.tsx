import { useState } from "react";

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
  chevDown:    "M19 9l-7 7-7-7",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  circle:      "M12 12m-9 0a9 9 0 1018 0 9 9 0 00-18 0",
  building:    "M3 21h18M3 7l9-4 9 4M4 11h16v10H4z M9 21v-6h6v6",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  x:           "M18 6L6 18M6 6l12 12",
  xCircle:     "M12 2a10 10 0 100 20A10 10 0 0012 2zm4-4L8 16M16 8l-8 8",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  filter:      "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  mapPin:      "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail:        "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  hash:        "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  globe:       "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  clipboard:   "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2 M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  send:        "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z",
  printer:     "M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z",
  star:        "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  doctors:     "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
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

// ─── Types ────────────────────────────────────────────────────────────────────
type AppStatus = "pending" | "docs-pending" | "verified" | "rejected" | "more-info";

interface HospitalApp {
  id:            string;
  name:          string;
  system:        string;
  location:      string;
  state:         string;
  submitted:     string;
  docsTotal:     number;
  docsUploaded:  number;
  status:        AppStatus;
  regId:         string;
  facilityType:  string;
  regNumber:     string;
  issuingAuth:   string;
  regYear:       string;
  adminName:     string;
  adminTitle:    string;
  website:       string;
  docs: { name: string; date: string; type: string; verified: boolean }[];
  checklist: { label: string; done: boolean }[];
}

const APPS: HospitalApp[] = [
  {
    id: "h1", name: "AyurCare Hospital", system: "Ayurveda",
    location: "Jaipur, Rajasthan", state: "Rajasthan",
    submitted: "10 Sep 2026", docsTotal: 4, docsUploaded: 4,
    status: "pending", regId: "MK-HOS-2026-0042",
    facilityType: "AYUSH Hospital", regNumber: "REG-AYU-2026-0182",
    issuingAuth: "Rajasthan State AYUSH Board", regYear: "2024",
    adminName: "Dr. Rakesh Sharma", adminTitle: "Medical Director",
    website: "https://www.ayurcare.in",
    docs: [
      { name: "Hospital Registration Certificate", date: "10 Sep 2026", type: "PDF", verified: true  },
      { name: "Establishment / License Document",  date: "10 Sep 2026", type: "PDF", verified: true  },
      { name: "AYUSH Practitioner Certificate",    date: "10 Sep 2026", type: "PDF", verified: false },
      { name: "Facility Photograph",               date: "10 Sep 2026", type: "JPG", verified: true  },
    ],
    checklist: [
      { label: "Hospital name verified",          done: true  },
      { label: "Registration number verified",    done: true  },
      { label: "Facility type verified",          done: true  },
      { label: "Registration document reviewed",  done: true  },
      { label: "License document requires review",done: false },
    ],
  },
  {
    id: "h2", name: "Swasthya Wellness Centre", system: "Multi-system",
    location: "New Delhi", state: "Delhi",
    submitted: "09 Sep 2026", docsTotal: 4, docsUploaded: 3,
    status: "docs-pending", regId: "MK-HOS-2026-0041",
    facilityType: "Wellness Centre", regNumber: "DEL-WEL-2025-0091",
    issuingAuth: "Delhi Health Department", regYear: "2025",
    adminName: "Ms. Priya Nair", adminTitle: "Chief Operating Officer",
    website: "",
    docs: [
      { name: "Hospital Registration Certificate", date: "09 Sep 2026", type: "PDF", verified: true  },
      { name: "Establishment / License Document",  date: "09 Sep 2026", type: "PDF", verified: true  },
      { name: "NOC from Local Authority",          date: "09 Sep 2026", type: "PDF", verified: true  },
      { name: "Supporting Document",               date: "—",           type: "—",   verified: false },
    ],
    checklist: [
      { label: "Hospital name verified",          done: true  },
      { label: "Registration number verified",    done: true  },
      { label: "Facility type verified",          done: true  },
      { label: "Registration document reviewed",  done: false },
      { label: "License document requires review",done: false },
    ],
  },
  {
    id: "h3", name: "Arogya Clinic", system: "Ayurveda",
    location: "Pune, Maharashtra", state: "Maharashtra",
    submitted: "08 Sep 2026", docsTotal: 4, docsUploaded: 4,
    status: "verified", regId: "MK-HOS-2026-0040",
    facilityType: "Clinic", regNumber: "MH-AYU-2023-0445",
    issuingAuth: "Maharashtra AYUSH Directorate", regYear: "2023",
    adminName: "Dr. Suresh Patil", adminTitle: "Founder",
    website: "https://www.arogyaclinic.in",
    docs: [
      { name: "Hospital Registration Certificate", date: "08 Sep 2026", type: "PDF", verified: true },
      { name: "Establishment / License Document",  date: "08 Sep 2026", type: "PDF", verified: true },
      { name: "AYUSH Board Certificate",           date: "08 Sep 2026", type: "PDF", verified: true },
      { name: "Floor Plan",                        date: "08 Sep 2026", type: "PDF", verified: true },
    ],
    checklist: [
      { label: "Hospital name verified",          done: true },
      { label: "Registration number verified",    done: true },
      { label: "Facility type verified",          done: true },
      { label: "Registration document reviewed",  done: true },
      { label: "License document verified",       done: true },
    ],
  },
  {
    id: "h4", name: "SiddhaMed Centre", system: "Siddha",
    location: "Chennai, Tamil Nadu", state: "Tamil Nadu",
    submitted: "07 Sep 2026", docsTotal: 4, docsUploaded: 4,
    status: "rejected", regId: "MK-HOS-2026-0039",
    facilityType: "Clinic", regNumber: "TN-SID-2024-0012",
    issuingAuth: "Tamil Nadu AYUSH Board", regYear: "2024",
    adminName: "Dr. Murugan Raj", adminTitle: "Director",
    website: "",
    docs: [
      { name: "Hospital Registration Certificate", date: "07 Sep 2026", type: "PDF", verified: false },
      { name: "Establishment / License Document",  date: "07 Sep 2026", type: "PDF", verified: false },
      { name: "Supporting Document",               date: "07 Sep 2026", type: "PDF", verified: false },
      { name: "Facility Photograph",               date: "07 Sep 2026", type: "JPG", verified: false },
    ],
    checklist: [
      { label: "Hospital name verified",           done: false },
      { label: "Registration number verified",     done: false },
      { label: "Facility type verified",           done: true  },
      { label: "Registration document reviewed",   done: false },
      { label: "License document reviewed",        done: false },
    ],
  },
  {
    id: "h5", name: "YogaWell Institute", system: "Yoga & Naturopathy",
    location: "Rishikesh, Uttarakhand", state: "Uttarakhand",
    submitted: "06 Sep 2026", docsTotal: 4, docsUploaded: 4,
    status: "more-info", regId: "MK-HOS-2026-0038",
    facilityType: "Wellness Centre", regNumber: "UK-YOG-2024-0078",
    issuingAuth: "Uttarakhand AYUSH Department", regYear: "2024",
    adminName: "Ms. Kavya Sharma", adminTitle: "Managing Trustee",
    website: "https://www.yogawell.org",
    docs: [
      { name: "Hospital Registration Certificate", date: "06 Sep 2026", type: "PDF", verified: true  },
      { name: "Establishment / License Document",  date: "06 Sep 2026", type: "PDF", verified: true  },
      { name: "Supporting Document",               date: "06 Sep 2026", type: "PDF", verified: false },
      { name: "Facility Photograph",               date: "06 Sep 2026", type: "JPG", verified: true  },
    ],
    checklist: [
      { label: "Hospital name verified",           done: true  },
      { label: "Registration number verified",     done: true  },
      { label: "Facility type verified",           done: true  },
      { label: "Registration document reviewed",   done: true  },
      { label: "Supporting document pending",      done: false },
    ],
  },
];

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS: Record<AppStatus, { label: string; color: string; bg: string; border: string }> = {
  pending:      { label: "Pending Review",      color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  "docs-pending":{ label: "Documents Pending",  color: T.blue,    bg: T.blueLight,    border: T.blueBorder    },
  verified:     { label: "Verified",            color: T.success, bg: T.successLight, border: T.successBorder },
  rejected:     { label: "Rejected",            color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
  "more-info":  { label: "Info Requested",      color: T.purple,  bg: T.purpleLight,  border: T.purpleBorder  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ status }: { status: AppStatus }) {
  const s = STATUS[status];
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: s.bg, border: `1px solid ${s.border}`, padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {s.label}
    </span>
  );
}

function GenBadge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${border}`, padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function MetricCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div style={{ flex: 1, minWidth: 140, padding: "16px 18px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={17} stroke={color} />
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.navy, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 12 }}>
      <span style={{ fontSize: 11, color: T.gray, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: T.navy, textAlign: "right" as const }}>{value}</span>
    </div>
  );
}

// ─── Approval success ─────────────────────────────────────────────────────────
function ApprovalSuccess({ hospital, onView, onManage }: { hospital: HospitalApp; onView: () => void; onManage: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        {/* Green header */}
        <div style={{ padding: "20px 22px", background: T.successLight, borderBottom: `1px solid ${T.successBorder}`, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#dcfce7", border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.shieldCheck} size={22} stroke={T.success} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#14532d" }}>Hospital Verified</div>
            <div style={{ fontSize: 12, color: T.success, marginTop: 2 }}>{hospital.name}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <GenBadge label="✓ Verified" color={T.success} bg="#dcfce7" border={T.successBorder} />
          </div>
        </div>

        <div style={{ padding: "18px 22px" }}>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: T.gray, lineHeight: 1.65 }}>
            This hospital has been approved and can now onboard doctors, manage patients and access connected healthcare services on the MediKiosk network.
          </p>

          <div style={{ marginBottom: 16 }}>
            {[
              { label: "Registration ID", value: hospital.regId },
              { label: "Verified on",    value: "10 September 2026" },
              { label: "Reviewed by",    value: "Admin · MediKiosk" },
            ].map((r) => <Row key={r.label} label={r.label} value={r.value} />)}
          </div>

          {/* Capability note */}
          <div style={{ padding: "10px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 16 }}>
            <Icon d={ic.shield} size={13} stroke={T.primary} />
            <p style={{ margin: 0, fontSize: 11, color: T.primary, lineHeight: 1.55 }}>
              Only verified hospitals can onboard or activate doctors in the MediKiosk network. This hospital is now authorised to do so.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onView} style={{ flex: 1, padding: "10px", background: T.primary, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              View Hospital
              <Icon d={ic.arrowRight} size={13} stroke="#fff" />
            </button>
            <button onClick={onManage} style={{ flex: 1, padding: "10px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Icon d={ic.doctors} size={13} stroke={T.gray} />
              Manage Doctors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({
  hospital, onApprove, onReject, onRequestInfo, onClose,
}: {
  hospital: HospitalApp;
  onApprove:     () => void;
  onReject:      () => void;
  onRequestInfo: () => void;
  onClose:       () => void;
}) {
  const [notes,         setNotes]         = useState("");
  const [rejectConfirm, setRejectConfirm] = useState(false);
  const [notesFocused,  setNotesFocused]  = useState(false);

  const done  = hospital.checklist.filter((c) => c.done).length;
  const total = hospital.checklist.length;
  const pct   = Math.round((done / total) * 100);

  const isVerified = hospital.status === "verified";
  const isRejected = hospital.status === "rejected";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Identity strip */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", background: T.navy, display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.building} size={17} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{hospital.name}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>{hospital.regId} · {hospital.system}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge status={hospital.status} />
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "4px 7px", cursor: "pointer" }}>
              <Icon d={ic.x} size={14} stroke="rgba(255,255,255,0.6)" />
            </button>
          </div>
        </div>

        {/* Info rows */}
        <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {[
            { label: "Location",       value: hospital.location      },
            { label: "Facility Type",  value: hospital.facilityType  },
            { label: "System",         value: hospital.system        },
            { label: "Submitted",      value: hospital.submitted     },
          ].map((r) => (
            <div key={r.label}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em" }}>{r.label.toUpperCase()}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginTop: 2 }}>{r.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Administrator */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "11px 18px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Authorised Administrator</span>
        </div>
        <div style={{ padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: T.primary, flexShrink: 0 }}>
            {hospital.adminName.charAt(hospital.adminName.lastIndexOf(" ") + 1)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{hospital.adminName}</div>
            <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{hospital.adminTitle}</div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon d={ic.phone} size={11} stroke={T.grayLight} />
                <span style={{ fontSize: 11, color: T.gray }}>+91 ••••••1234</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon d={ic.mail} size={11} stroke={T.grayLight} />
                <span style={{ fontSize: 11, color: T.gray }}>admin@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration details */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "11px 18px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Registration Details</span>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <Row label="Registration Number" value={hospital.regNumber} />
          <Row label="Issuing Authority"   value={hospital.issuingAuth} />
          <Row label="Year"                value={hospital.regYear} />
          <Row label="Facility Type"       value={hospital.facilityType} />
          {hospital.website && <Row label="Website" value={hospital.website} />}
        </div>
      </div>

      {/* Documents */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "11px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Verification Documents</span>
          <span style={{ fontSize: 11, color: T.grayLight }}>{hospital.docsUploaded}/{hospital.docsTotal} uploaded</span>
        </div>
        <div style={{ padding: "8px 0" }}>
          {hospital.docs.map((doc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 18px", borderBottom: i < hospital.docs.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: doc.verified ? T.successLight : T.muted, border: `1px solid ${doc.verified ? T.successBorder : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={ic.fileText} size={13} stroke={doc.verified ? T.success : T.grayLight} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{doc.name}</div>
                <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{doc.type}{doc.date !== "—" ? ` · ${doc.date}` : " · Not uploaded"}</div>
              </div>
              {doc.date !== "—" ? (
                <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 11, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                  <Icon d={ic.eye} size={11} stroke={T.gray} />
                  View
                </button>
              ) : (
                <span style={{ fontSize: 10, color: T.grayLight, fontStyle: "italic" }}>Awaiting</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "11px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Verification Checklist</span>
          <span style={{ fontSize: 11, color: T.gray }}>{done} of {total} completed</span>
        </div>
        <div style={{ padding: "12px 18px" }}>
          {/* Progress bar */}
          <div style={{ height: 5, background: T.border, borderRadius: 4, marginBottom: 14, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? T.success : T.primary, borderRadius: 4, transition: "width 0.3s" }} />
          </div>
          {hospital.checklist.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
              <div style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                background: item.done ? T.success : T.white,
                border: `2px solid ${item.done ? T.success : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {item.done && <Icon d={ic.check} size={10} stroke="#fff" />}
              </div>
              <span style={{ fontSize: 12, color: item.done ? T.navy : T.grayLight, fontWeight: item.done ? 500 : 400 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit trail */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "11px 18px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Audit Information</span>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <Row label="Submitted"    value={hospital.submitted} />
          <Row label="Reviewed by"  value="Admin · MediKiosk" />
          <Row label="Reviewed on"  value="10 September 2026" />
          <Row label="Reference ID" value={hospital.regId} />
        </div>
      </div>

      {/* ── Decision area ── */}
      {!isVerified && !isRejected && (
        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
          <div style={{ padding: "11px 18px", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Admin Decision</span>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.navy, marginBottom: 6 }}>Verification Notes</div>
            <textarea
              placeholder="Add verification notes, observations, or reasons for decision..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onFocus={() => setNotesFocused(true)}
              onBlur={() => setNotesFocused(false)}
              rows={4}
              style={{
                width: "100%", padding: "10px 12px", fontSize: 12, color: T.navy,
                border: `1px solid ${notesFocused ? T.primary : T.border}`,
                borderRadius: 8, background: T.muted, outline: "none", resize: "vertical" as const,
                fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const,
                lineHeight: 1.6,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
              {/* Approve */}
              <button
                onClick={onApprove}
                style={{
                  width: "100%", padding: "11px",
                  background: T.primary, border: "none", borderRadius: 8,
                  fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
                  fontFamily: "Inter, system-ui, sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                }}
              >
                <Icon d={ic.shieldCheck} size={15} stroke="#fff" />
                Approve Hospital
              </button>

              {/* Request info */}
              <button
                onClick={onRequestInfo}
                style={{
                  width: "100%", padding: "10px",
                  background: T.white, border: `1px solid ${T.border}`, borderRadius: 8,
                  fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer",
                  fontFamily: "Inter, system-ui, sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                }}
              >
                <Icon d={ic.send} size={13} stroke={T.gray} />
                Request More Information
              </button>

              {/* Reject */}
              {!rejectConfirm ? (
                <button
                  onClick={() => setRejectConfirm(true)}
                  style={{
                    width: "100%", padding: "10px",
                    background: T.white, border: `1px solid ${T.dangerBorder}`, borderRadius: 8,
                    fontSize: 12, fontWeight: 600, color: T.danger, cursor: "pointer",
                    fontFamily: "Inter, system-ui, sans-serif",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                  }}
                >
                  <Icon d={ic.xCircle} size={13} stroke={T.danger} />
                  Reject Application
                </button>
              ) : (
                <div style={{ border: `1px solid ${T.dangerBorder}`, borderRadius: 9, padding: "12px 14px", background: T.dangerLight }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.danger, marginBottom: 6 }}>Confirm Rejection</div>
                  <p style={{ margin: "0 0 12px", fontSize: 11, color: T.danger, lineHeight: 1.55 }}>
                    This will permanently reject the application. The hospital can re-apply in the future. This action is logged in the audit trail.
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => setRejectConfirm(false)}
                      style={{ flex: 1, padding: "8px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onReject}
                      style={{ flex: 1, padding: "8px", background: T.danger, border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      Confirm Reject
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p style={{ margin: "12px 0 0", fontSize: 10, color: T.grayLight, textAlign: "center" as const }}>
              Decisions are logged in the audit trail and notified to the hospital via email.
            </p>
          </div>
        </div>
      )}

      {/* Already verified / rejected notice */}
      {isVerified && (
        <div style={{ padding: "12px 16px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 9, display: "flex", gap: 8 }}>
          <Icon d={ic.shieldCheck} size={14} stroke={T.success} />
          <p style={{ margin: 0, fontSize: 12, color: T.success, lineHeight: 1.5 }}>
            This hospital is verified and can onboard doctors and manage patients on MediKiosk.
          </p>
        </div>
      )}
      {isRejected && (
        <div style={{ padding: "12px 16px", background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, borderRadius: 9, display: "flex", gap: 8 }}>
          <Icon d={ic.xCircle} size={14} stroke={T.danger} />
          <p style={{ margin: 0, fontSize: 12, color: T.danger, lineHeight: 1.5 }}>
            This application was rejected. The hospital may re-apply with corrected documentation.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function HospitalVerification({ onBack }: { onBack: () => void }) {
  const [search,    setSearch]    = useState("");
  const [sFocus,    setSFocus]    = useState(false);
  const [statusF,   setStatusF]   = useState("All");
  const [systemF,   setSystemF]   = useState("All");
  const [selected,  setSelected]  = useState<HospitalApp | null>(APPS[0]);
  const [apps,      setApps]      = useState<HospitalApp[]>(APPS);
  const [approved,  setApproved]  = useState<string | null>(null);

  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    const matchQ = !q || a.name.toLowerCase().includes(q) || a.location.toLowerCase().includes(q);
    const matchS = statusF === "All" || (
      statusF === "Pending"          ? a.status === "pending"       :
      statusF === "Documents Pending"? a.status === "docs-pending"  :
      statusF === "Verified"         ? a.status === "verified"      :
      statusF === "Rejected"         ? a.status === "rejected"      : true
    );
    const matchM = systemF === "All" || a.system === systemF;
    return matchQ && matchS && matchM;
  });

  function handleApprove() {
    if (!selected) return;
    setApps((prev) => prev.map((a) => a.id === selected.id ? { ...a, status: "verified" as AppStatus } : a));
    setSelected((s) => s ? { ...s, status: "verified" } : s);
    setApproved(selected.id);
  }

  function handleReject() {
    if (!selected) return;
    setApps((prev) => prev.map((a) => a.id === selected.id ? { ...a, status: "rejected" as AppStatus } : a));
    setSelected((s) => s ? { ...s, status: "rejected" } : s);
  }

  function handleRequestInfo() {
    if (!selected) return;
    setApps((prev) => prev.map((a) => a.id === selected.id ? { ...a, status: "more-info" as AppStatus } : a));
    setSelected((s) => s ? { ...s, status: "more-info" } : s);
  }

  const pending  = apps.filter((a) => a.status === "pending").length;
  const verified = apps.filter((a) => a.status === "verified").length;
  const rejected = apps.filter((a) => a.status === "rejected").length;
  const docsPend = apps.filter((a) => a.status === "docs-pending").length;

  const systems = ["All", ...Array.from(new Set(APPS.map((a) => a.system)))];

  const selectStyle: React.CSSProperties = {
    padding: "6px 28px 6px 10px", fontSize: 12, color: T.navy,
    border: `1px solid ${T.border}`, borderRadius: 8, background: T.white,
    appearance: "none" as const, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
    outline: "none",
  };

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
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Hospital Verification</div>
              <div style={{ fontSize: 10, color: T.grayLight }}>Admin · MediKiosk Network</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          {/* Admin chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 20 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>A</div>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>Admin</span>
            <GenBadge label="Super Admin" color={T.primary} bg={T.primaryLight} border={T.primaryBorder} />
          </div>
        </div>

        {/* Subtitle strip */}
        <div style={{ padding: "8px 28px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ margin: 0, fontSize: 12, color: T.gray }}>
            Review and verify healthcare facilities before they can access the MediKiosk network.
          </p>
        </div>
      </header>

      <div style={{ flex: 1, padding: "24px 28px 60px", maxWidth: 1400, width: "100%", margin: "0 auto", boxSizing: "border-box" as const }}>

        {/* ── Metrics ── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" as const }}>
          <MetricCard label="Pending Verification" value={pending}  color={T.amber}   icon={ic.clock}      />
          <MetricCard label="Verified"             value={verified} color={T.success}  icon={ic.shieldCheck}/>
          <MetricCard label="Rejected"             value={rejected} color={T.danger}   icon={ic.xCircle}   />
          <MetricCard label="Documents Pending"    value={docsPend} color={T.blue}     icon={ic.fileText}  />
        </div>

        {/* ── Main layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 20, alignItems: "start" }}>

          {/* ── Left: queue ── */}
          <div>
            {/* Filters bar */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14, display: "flex", gap: 10, flexWrap: "wrap" as const, alignItems: "center" }}>
              {/* Search */}
              <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
                <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}>
                  <Icon d={ic.search} size={13} stroke={T.grayLight} />
                </span>
                <input
                  type="text" placeholder="Search hospitals..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSFocus(true)} onBlur={() => setSFocus(false)}
                  style={{
                    width: "100%", padding: "6px 10px 6px 28px", fontSize: 12, color: T.navy,
                    border: `1px solid ${sFocus ? T.primary : T.border}`,
                    borderRadius: 7, background: T.muted, outline: "none",
                    fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const,
                  }}
                />
              </div>

              {/* Status filter */}
              <div style={{ position: "relative" }}>
                <select value={statusF} onChange={(e) => setStatusF(e.target.value)} style={selectStyle}>
                  {["All", "Pending", "Documents Pending", "Verified", "Rejected"].map((o) => <option key={o}>{o}</option>)}
                </select>
                <span style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <Icon d={ic.chevDown} size={12} stroke={T.grayLight} />
                </span>
              </div>

              {/* System filter */}
              <div style={{ position: "relative" }}>
                <select value={systemF} onChange={(e) => setSystemF(e.target.value)} style={selectStyle}>
                  {systems.map((o) => <option key={o}>{o}</option>)}
                </select>
                <span style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <Icon d={ic.chevDown} size={12} stroke={T.grayLight} />
                </span>
              </div>

              <div style={{ fontSize: 11, color: T.grayLight, marginLeft: "auto" }}>
                {filtered.length} of {apps.length} applications
              </div>
            </div>

            {/* Table */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
              {/* Table head */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 140px 110px 90px 130px 90px", background: T.muted, borderBottom: `1px solid ${T.border}` }}>
                {["Hospital", "System", "Location", "Submitted", "Docs", "Status", "Action"].map((h) => (
                  <div key={h} style={{ padding: "9px 14px", fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em" }}>{h.toUpperCase()}</div>
                ))}
              </div>

              {/* Rows */}
              {filtered.length === 0 ? (
                <div style={{ padding: "36px 20px", textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 13, color: T.grayLight }}>No applications match the current filters.</p>
                </div>
              ) : filtered.map((app) => {
                const isSel = selected?.id === app.id;
                return (
                  <div
                    key={app.id}
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 130px 140px 110px 90px 130px 90px",
                      alignItems: "center",
                      background: isSel ? T.primaryLight : T.white,
                      borderBottom: `1px solid ${T.border}`,
                      borderLeft: `3px solid ${isSel ? T.primary : "transparent"}`,
                      transition: "background 0.12s",
                    }}
                  >
                    {/* Hospital name */}
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{app.name}</div>
                      <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{app.regId}</div>
                    </div>
                    {/* System */}
                    <div style={{ padding: "12px 14px", fontSize: 12, color: T.gray }}>{app.system}</div>
                    {/* Location */}
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon d={ic.mapPin} size={11} stroke={T.grayLight} />
                        <span style={{ fontSize: 12, color: T.gray }}>{app.location}</span>
                      </div>
                    </div>
                    {/* Submitted */}
                    <div style={{ padding: "12px 14px", fontSize: 11, color: T.gray }}>{app.submitted}</div>
                    {/* Docs */}
                    <div style={{ padding: "12px 14px" }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: app.docsUploaded === app.docsTotal ? T.success : T.amber,
                      }}>
                        {app.docsUploaded}/{app.docsTotal}
                      </span>
                    </div>
                    {/* Status */}
                    <div style={{ padding: "12px 14px" }}>
                      <Badge status={app.status} />
                    </div>
                    {/* Action */}
                    <div style={{ padding: "12px 10px" }}>
                      <button
                        onClick={() => { setSelected(app); setApproved(null); }}
                        style={{
                          padding: "5px 14px",
                          background: isSel ? T.primary : T.white,
                          border: `1px solid ${isSel ? T.primary : T.primaryBorder}`,
                          borderRadius: 7, fontSize: 11, fontWeight: 600,
                          color: isSel ? "#fff" : T.primary,
                          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
                        }}
                      >
                        {app.status === "verified" || app.status === "rejected" ? "View" : "Review"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Network note */}
            <div style={{ marginTop: 14, padding: "10px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <Icon d={ic.info} size={13} stroke={T.primary} />
              <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
                Only verified hospitals can onboard or activate doctors in the MediKiosk network. Verification decisions are logged and notified to the facility.
              </p>
            </div>
          </div>

          {/* ── Right: detail / approval ── */}
          <div style={{ position: "sticky", top: 110 }}>
            {!selected ? (
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, padding: "40px 24px", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <Icon d={ic.clipboard} size={22} stroke={T.grayLight} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 6 }}>Select an application</div>
                <p style={{ margin: 0, fontSize: 12, color: T.grayLight, lineHeight: 1.55 }}>
                  Click Review on any application in the queue to begin verification.
                </p>
              </div>
            ) : approved === selected.id ? (
              <ApprovalSuccess
                hospital={selected}
                onView={() => {}}
                onManage={() => {}}
              />
            ) : (
              <div style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" as const }}>
                <DetailPanel
                  hospital={selected}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRequestInfo={handleRequestInfo}
                  onClose={() => setSelected(null)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mapPin:      "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  building:    "M3 21h18M3 7l9-4 9 4M4 11h16v10H4z M9 21v-6h6v6",
  x:           "M18 6L6 18M6 6l12 12",
  xCircle:     "M12 2a10 10 0 100 20A10 10 0 0012 2zM15 9l-6 6M9 9l6 6",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail:        "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  send:        "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z",
  clipboard:   "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2 M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z",
  badge:       "M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-4.78-4.77 4 4 0 010-6.76z M16 8.5l-4.5 4-2-2",
  award:       "M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3M8 15v1a6 6 0 006 6 6 6 0 006-6v-4",
  doctors:     "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  hash:        "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  globe:       "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  briefcase:   "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  filter:      "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
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

// ─── Types ────────────────────────────────────────────────────────────────────
type DocStatus = "pending" | "docs-pending" | "approved" | "rejected" | "more-info";

interface DoctorApp {
  id:           string;
  name:         string;
  initials:     string;
  specialization: string;
  system:       string;
  regNumber:    string;
  council:      string;
  experience:   string;
  department:   string;
  designation:  string;
  docsTotal:    number;
  docsUploaded: number;
  status:       DocStatus;
  docId:        string;
  phone:        string;
  email:        string;
  languages:    string[];
  submitted:    string;
  docs: { name: string; date: string; verified: boolean }[];
  checklist: { label: string; done: boolean }[];
}

const DOCTORS: DoctorApp[] = [
  {
    id: "d1", name: "Dr. Mehta", initials: "M",
    specialization: "General Medicine", system: "Ayurveda",
    regNumber: "REG-2026-0182", council: "Central Council of Indian Medicine (CCIM)",
    experience: "8 years", department: "General Medicine", designation: "Consultant",
    docsTotal: 3, docsUploaded: 3, status: "pending",
    docId: "MK-DOC-2026-0081", phone: "+91 ••••••1234", email: "mehta@example.com",
    languages: ["Hindi", "English"], submitted: "10 Sep 2026",
    docs: [
      { name: "Medical Registration Certificate", date: "10 Sep 2026", verified: true  },
      { name: "Degree / Qualification Certificate", date: "10 Sep 2026", verified: true  },
      { name: "Additional Certificate",           date: "10 Sep 2026", verified: false },
    ],
    checklist: [
      { label: "Registration number reviewed", done: true  },
      { label: "Qualification reviewed",        done: true  },
      { label: "Documents reviewed",            done: true  },
      { label: "Specialization reviewed",       done: true  },
      { label: "Final hospital approval",       done: false },
    ],
  },
  {
    id: "d2", name: "Dr. Priya Sharma", initials: "P",
    specialization: "Ayurveda", system: "Ayurveda",
    regNumber: "REG-2025-0091", council: "Rajasthan Ayurved Council",
    experience: "5 years", department: "Outpatient Department (OPD)", designation: "Medical Officer",
    docsTotal: 3, docsUploaded: 2, status: "docs-pending",
    docId: "MK-DOC-2026-0082", phone: "+91 ••••••5678", email: "sharma@example.com",
    languages: ["Hindi", "English", "Gujarati"], submitted: "09 Sep 2026",
    docs: [
      { name: "Medical Registration Certificate", date: "09 Sep 2026", verified: true  },
      { name: "Degree / Qualification Certificate", date: "09 Sep 2026", verified: true  },
      { name: "Additional Certificate",           date: "—",           verified: false },
    ],
    checklist: [
      { label: "Registration number reviewed", done: true  },
      { label: "Qualification reviewed",        done: true  },
      { label: "Documents reviewed",            done: false },
      { label: "Specialization reviewed",       done: false },
      { label: "Final hospital approval",       done: false },
    ],
  },
  {
    id: "d3", name: "Dr. Amit Verma", initials: "A",
    specialization: "Panchakarma", system: "Ayurveda",
    regNumber: "REG-2024-0042", council: "Central Council of Indian Medicine (CCIM)",
    experience: "10 years", department: "Panchakarma", designation: "Senior Consultant",
    docsTotal: 3, docsUploaded: 3, status: "approved",
    docId: "MK-DOC-2026-0079", phone: "+91 ••••••9012", email: "verma@example.com",
    languages: ["Hindi", "English"], submitted: "08 Sep 2026",
    docs: [
      { name: "Medical Registration Certificate", date: "08 Sep 2026", verified: true },
      { name: "Degree / Qualification Certificate", date: "08 Sep 2026", verified: true },
      { name: "Additional Certificate",           date: "08 Sep 2026", verified: true },
    ],
    checklist: [
      { label: "Registration number reviewed", done: true },
      { label: "Qualification reviewed",        done: true },
      { label: "Documents reviewed",            done: true },
      { label: "Specialization reviewed",       done: true },
      { label: "Final hospital approval",       done: true },
    ],
  },
  {
    id: "d4", name: "Dr. Kavita Nair", initials: "K",
    specialization: "Yoga Therapy", system: "Yoga & Naturopathy",
    regNumber: "REG-2025-0133", council: "Central Council of Indian Medicine (CCIM)",
    experience: "3 years", department: "Outpatient Department (OPD)", designation: "Resident Doctor",
    docsTotal: 3, docsUploaded: 3, status: "more-info",
    docId: "MK-DOC-2026-0083", phone: "+91 ••••••3456", email: "nair@example.com",
    languages: ["Malayalam", "English", "Hindi"], submitted: "07 Sep 2026",
    docs: [
      { name: "Medical Registration Certificate", date: "07 Sep 2026", verified: true  },
      { name: "Degree / Qualification Certificate", date: "07 Sep 2026", verified: false },
      { name: "Additional Certificate",           date: "07 Sep 2026", verified: false },
    ],
    checklist: [
      { label: "Registration number reviewed", done: true  },
      { label: "Qualification reviewed",        done: false },
      { label: "Documents reviewed",            done: false },
      { label: "Specialization reviewed",       done: true  },
      { label: "Final hospital approval",       done: false },
    ],
  },
  {
    id: "d5", name: "Dr. Suresh Pillai", initials: "S",
    specialization: "Homoeopathy", system: "Homoeopathy",
    regNumber: "REG-2023-0205", council: "Central Council of Homoeopathy (CCH)",
    experience: "12 years", department: "General Medicine", designation: "Senior Consultant",
    docsTotal: 3, docsUploaded: 3, status: "rejected",
    docId: "MK-DOC-2026-0077", phone: "+91 ••••••7890", email: "pillai@example.com",
    languages: ["Malayalam", "English"], submitted: "06 Sep 2026",
    docs: [
      { name: "Medical Registration Certificate", date: "06 Sep 2026", verified: false },
      { name: "Degree / Qualification Certificate", date: "06 Sep 2026", verified: false },
      { name: "Additional Certificate",           date: "06 Sep 2026", verified: false },
    ],
    checklist: [
      { label: "Registration number reviewed", done: false },
      { label: "Qualification reviewed",        done: false },
      { label: "Documents reviewed",            done: false },
      { label: "Specialization reviewed",       done: true  },
      { label: "Final hospital approval",       done: false },
    ],
  },
  {
    id: "d6", name: "Dr. Ravi Kumar", initials: "R",
    specialization: "Shalakya Tantra", system: "Ayurveda",
    regNumber: "REG-2026-0199", council: "Central Council of Indian Medicine (CCIM)",
    experience: "6 years", department: "General Medicine", designation: "Consultant",
    docsTotal: 3, docsUploaded: 3, status: "pending",
    docId: "MK-DOC-2026-0084", phone: "+91 ••••••2345", email: "kumar@example.com",
    languages: ["Hindi", "Telugu"], submitted: "10 Sep 2026",
    docs: [
      { name: "Medical Registration Certificate", date: "10 Sep 2026", verified: true  },
      { name: "Degree / Qualification Certificate", date: "10 Sep 2026", verified: true  },
      { name: "Additional Certificate",           date: "10 Sep 2026", verified: false },
    ],
    checklist: [
      { label: "Registration number reviewed", done: true  },
      { label: "Qualification reviewed",        done: true  },
      { label: "Documents reviewed",            done: false },
      { label: "Specialization reviewed",       done: false },
      { label: "Final hospital approval",       done: false },
    ],
  },
];

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CFG: Record<DocStatus, { label: string; color: string; bg: string; border: string }> = {
  pending:       { label: "Pending Review",    color: T.amber,   bg: T.amberLight,   border: T.amberBorder   },
  "docs-pending":{ label: "Docs Pending",      color: T.blue,    bg: T.blueLight,    border: T.blueBorder    },
  approved:      { label: "Approved",          color: T.success, bg: T.successLight, border: T.successBorder },
  rejected:      { label: "Rejected",          color: T.danger,  bg: T.dangerLight,  border: T.dangerBorder  },
  "more-info":   { label: "Info Requested",    color: T.purple,  bg: T.purpleLight,  border: T.purpleBorder  },
};

// ─── Small helpers ────────────────────────────────────────────────────────────
function Badge({ status }: { status: DocStatus }) {
  const s = STATUS_CFG[status];
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: s.bg, border: `1px solid ${s.border}`, padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {s.label}
    </span>
  );
}

function MetricCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div style={{ flex: 1, minWidth: 130, padding: "16px 18px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9, gap: 12 }}>
      <span style={{ fontSize: 11, color: T.gray, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: T.navy, textAlign: "right" as const }}>{value}</span>
    </div>
  );
}

// ─── Approval success ─────────────────────────────────────────────────────────
function ApprovalSuccess({ doctor, onViewProfile, onViewDashboard }: {
  doctor: DoctorApp; onViewProfile: () => void; onViewDashboard: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "20px 22px", background: T.successLight, borderBottom: `1px solid ${T.successBorder}`, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#dcfce7", border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.shieldCheck} size={22} stroke={T.success} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#14532d" }}>Doctor Approved</div>
            <div style={{ fontSize: 12, color: T.success, marginTop: 2 }}>{doctor.name}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.success, background: "#dcfce7", border: `1px solid ${T.successBorder}`, padding: "2px 10px", borderRadius: 20 }}>✓ Active</span>
          </div>
        </div>

        <div style={{ padding: "18px 22px" }}>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: T.gray, lineHeight: 1.65 }}>
            {doctor.name} is now approved to provide consultations through AyurCare Hospital and will appear in the active doctor directory and patient appointment availability.
          </p>

          <div style={{ marginBottom: 16 }}>
            <InfoRow label="Hospital"    value="AyurCare Hospital" />
            <InfoRow label="Department"  value={doctor.department} />
            <InfoRow label="Designation" value={doctor.designation} />
            <InfoRow label="Status"      value="Active" />
            <InfoRow label="Approved on" value="10 September 2026" />
            <InfoRow label="Reviewed by" value="Hospital Administrator" />
          </div>

          <div style={{ padding: "10px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 16 }}>
            <Icon d={ic.info} size={12} stroke={T.primary} />
            <p style={{ margin: 0, fontSize: 11, color: T.primary, lineHeight: 1.55 }}>
              The doctor has been notified by email. Their profile is now live in the hospital directory.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onViewProfile} style={{ flex: 1, padding: "10px", background: T.primary, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              View Doctor Profile
              <Icon d={ic.arrowRight} size={13} stroke="#fff" />
            </button>
            <button onClick={onViewDashboard} style={{ flex: 1, padding: "10px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Icon d={ic.doctors} size={13} stroke={T.gray} />
              View Doctor Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ doctor, onApprove, onReject, onRequestInfo, onClose }: {
  doctor: DoctorApp;
  onApprove:     () => void;
  onReject:      () => void;
  onRequestInfo: () => void;
  onClose:       () => void;
}) {
  const [notes,         setNotes]         = useState("");
  const [rejectConfirm, setRejectConfirm] = useState(false);
  const [notesFocused,  setNotesFocused]  = useState(false);

  const done  = doctor.checklist.filter((c) => c.done).length;
  const total = doctor.checklist.length;
  const pct   = Math.round((done / total) * 100);

  const isApproved = doctor.status === "approved";
  const isRejected = doctor.status === "rejected";
  const isDecided  = isApproved || isRejected;

  // Avatar color per initial
  const avatarColors: Record<string, string> = {
    M: T.primary, P: T.purple, A: T.blue, K: T.amber, S: T.success, R: T.danger,
  };
  const avatarColor = avatarColors[doctor.initials] || T.primary;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Identity strip */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", background: T.navy, display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
              {doctor.initials}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{doctor.name}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>{doctor.specialization} · {doctor.experience}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge status={doctor.status} />
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "4px 7px", cursor: "pointer" }}>
              <Icon d={ic.x} size={14} stroke="rgba(255,255,255,0.6)" />
            </button>
          </div>
        </div>

        {/* Quick facts */}
        <div style={{ padding: "14px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {[
            { label: "Doctor ID",   value: doctor.docId      },
            { label: "Submitted",   value: doctor.submitted  },
            { label: "Department",  value: doctor.department },
            { label: "Designation", value: doctor.designation},
          ].map((r) => (
            <div key={r.label}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em" }}>{r.label.toUpperCase()}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginTop: 2 }}>{r.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Contact Information</span>
        </div>
        <div style={{ padding: "12px 18px", display: "flex", flexDirection: "column", gap: 7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={ic.phone} size={12} stroke={T.grayLight} />
            <span style={{ fontSize: 12, color: T.gray }}>{doctor.phone}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={ic.mail} size={12} stroke={T.grayLight} />
            <span style={{ fontSize: 12, color: T.gray }}>{doctor.email}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            <Icon d={ic.globe} size={12} stroke={T.grayLight} />
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
              {doctor.languages.map((l) => (
                <span key={l} style={{ fontSize: 11, fontWeight: 500, color: T.navy, background: T.muted, border: `1px solid ${T.border}`, padding: "1px 8px", borderRadius: 12 }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional details */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Professional Details</span>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <InfoRow label="Medical Registration No." value={doctor.regNumber}      />
          <InfoRow label="Registration Council"     value={doctor.council}        />
          <InfoRow label="System of Medicine"       value={doctor.system}         />
          <InfoRow label="Specialization"           value={doctor.specialization} />
          <InfoRow label="Experience"               value={doctor.experience}     />
          <InfoRow label="Department"               value={doctor.department}     />
        </div>
      </div>

      {/* Documents */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Professional Documents</span>
          <span style={{ fontSize: 11, color: T.grayLight }}>{doctor.docsUploaded}/{doctor.docsTotal} uploaded</span>
        </div>
        <div style={{ padding: "6px 0" }}>
          {doctor.docs.map((doc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 18px", borderBottom: i < doctor.docs.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: doc.verified ? T.successLight : T.muted, border: `1px solid ${doc.verified ? T.successBorder : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={ic.fileText} size={13} stroke={doc.verified ? T.success : T.grayLight} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{doc.name}</div>
                <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{doc.date !== "—" ? doc.date : "Not uploaded"}</div>
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

      {/* Verification checklist */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Verification Checklist</span>
          <span style={{ fontSize: 11, color: T.gray }}>{done} of {total} completed</span>
        </div>
        <div style={{ padding: "12px 18px" }}>
          <div style={{ height: 4, background: T.border, borderRadius: 4, marginBottom: 14, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? T.success : T.primary, borderRadius: 4, transition: "width 0.3s" }} />
          </div>
          {doctor.checklist.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
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

      {/* Audit */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Audit Information</span>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <InfoRow label="Submitted"    value={doctor.submitted}          />
          <InfoRow label="Reviewed by"  value="Hospital Administrator"    />
          <InfoRow label="Reviewed on"  value="10 September 2026"         />
          <InfoRow label="Reference ID" value={doctor.docId}              />
        </div>
      </div>

      {/* ── Decision ── */}
      {!isDecided && (
        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
          <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>Approval Decision</span>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.navy, marginBottom: 6 }}>Approval Notes</div>
            <textarea
              placeholder="Add approval notes, observations, or reasons for decision..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onFocus={() => setNotesFocused(true)}
              onBlur={() => setNotesFocused(false)}
              rows={3}
              style={{
                width: "100%", padding: "10px 12px", fontSize: 12, color: T.navy,
                border: `1px solid ${notesFocused ? T.primary : T.border}`,
                borderRadius: 8, background: T.muted, outline: "none", resize: "vertical" as const,
                fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const, lineHeight: 1.6,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
              {/* Approve */}
              <button
                onClick={onApprove}
                style={{ width: "100%", padding: "11px", background: T.primary, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
              >
                <Icon d={ic.shieldCheck} size={15} stroke="#fff" />
                Approve Doctor
              </button>

              {/* Request info */}
              <button
                onClick={onRequestInfo}
                style={{ width: "100%", padding: "10px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
              >
                <Icon d={ic.send} size={13} stroke={T.gray} />
                Request More Information
              </button>

              {/* Reject */}
              {!rejectConfirm ? (
                <button
                  onClick={() => setRejectConfirm(true)}
                  style={{ width: "100%", padding: "8px", background: "none", border: `1px solid ${T.dangerBorder}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.danger, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                >
                  <Icon d={ic.xCircle} size={13} stroke={T.danger} />
                  Reject
                </button>
              ) : (
                <div style={{ border: `1px solid ${T.dangerBorder}`, borderRadius: 9, padding: "12px 14px", background: T.dangerLight }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.danger, marginBottom: 5 }}>Confirm Rejection</div>
                  <p style={{ margin: "0 0 12px", fontSize: 11, color: T.danger, lineHeight: 1.55 }}>
                    The doctor will be notified. They may re-apply with updated documentation. This action is logged.
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setRejectConfirm(false)} style={{ flex: 1, padding: "8px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                      Cancel
                    </button>
                    <button onClick={onReject} style={{ flex: 1, padding: "8px", background: T.danger, border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                      Confirm Reject
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p style={{ margin: "12px 0 0", fontSize: 10, color: T.grayLight, textAlign: "center" as const }}>
              Decisions are logged and the doctor is notified by email.
            </p>
          </div>
        </div>
      )}

      {isApproved && (
        <div style={{ padding: "12px 16px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 9, display: "flex", gap: 8 }}>
          <Icon d={ic.shieldCheck} size={14} stroke={T.success} />
          <p style={{ margin: 0, fontSize: 12, color: T.success, lineHeight: 1.5 }}>
            This doctor is approved and active. They can accept patient appointments through AyurCare Hospital.
          </p>
        </div>
      )}

      {isRejected && (
        <div style={{ padding: "12px 16px", background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, borderRadius: 9, display: "flex", gap: 8 }}>
          <Icon d={ic.xCircle} size={14} stroke={T.danger} />
          <p style={{ margin: 0, fontSize: 12, color: T.danger, lineHeight: 1.5 }}>
            This application was rejected. The doctor may re-apply with corrected documentation.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Workflow status banner ───────────────────────────────────────────────────
const WORKFLOW_STAGES = [
  "Registered",
  "Pending Verification",
  "Hospital Review",
  "Approved",
  "Active",
];

function WorkflowBanner({ status }: { status: DocStatus }) {
  const activeIdx =
    status === "pending"       ? 2 :
    status === "docs-pending"  ? 1 :
    status === "approved"      ? 4 :
    status === "rejected"      ? 2 :
    status === "more-info"     ? 2 : 2;

  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 18px", marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 10 }}>VERIFICATION WORKFLOW</div>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {WORKFLOW_STAGES.map((s, i) => {
          const done   = i < activeIdx;
          const active = i === activeIdx;
          const last   = i === WORKFLOW_STAGES.length - 1;
          return (
            <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
              {i > 0 && (
                <div style={{ position: "absolute", left: 0, top: 9, width: "50%", height: 1.5, background: done || active ? T.primary : T.border }} />
              )}
              {!last && (
                <div style={{ position: "absolute", right: 0, top: 9, width: "50%", height: 1.5, background: done ? T.primary : T.border }} />
              )}
              <div style={{
                width: 18, height: 18, borderRadius: "50%", zIndex: 1,
                background: done ? T.primary : active ? T.white : T.white,
                border: `2px solid ${done ? T.primary : active ? T.primary : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {done
                  ? <Icon d={ic.check} size={9} stroke="#fff" />
                  : active
                    ? <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.primary }} />
                    : null
                }
              </div>
              <div style={{ fontSize: 9, fontWeight: active ? 700 : 500, color: active ? T.navy : done ? T.primary : T.grayLight, marginTop: 5, textAlign: "center" as const, lineHeight: 1.2 }}>
                {s}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function DoctorApproval({ onBack }: { onBack: () => void }) {
  const [search,   setSearch]   = useState("");
  const [sFocus,   setSFocus]   = useState(false);
  const [statusF,  setStatusF]  = useState("All");
  const [specF,    setSpecF]    = useState("All");
  const [deptF,    setDeptF]    = useState("All");
  const [doctors,  setDoctors]  = useState<DoctorApp[]>(DOCTORS);
  const [selected, setSelected] = useState<DoctorApp | null>(DOCTORS[0]);
  const [approved, setApproved] = useState<string | null>(null);

  const filtered = doctors.filter((d) => {
    const q = search.toLowerCase();
    const mQ = !q || d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q);
    const mS =
      statusF === "All"              ? true :
      statusF === "Pending"          ? d.status === "pending"      :
      statusF === "Docs Pending"     ? d.status === "docs-pending" :
      statusF === "Approved"         ? d.status === "approved"     :
      statusF === "Rejected"         ? d.status === "rejected"     : true;
    const mSp = specF === "All" || d.specialization === specF;
    const mD  = deptF === "All" || d.department === deptF;
    return mQ && mS && mSp && mD;
  });

  const pending  = doctors.filter((d) => d.status === "pending").length;
  const appCount = doctors.filter((d) => d.status === "approved").length;
  const rejected = doctors.filter((d) => d.status === "rejected").length;
  const docsPend = doctors.filter((d) => d.status === "docs-pending").length;

  const allSpecs = ["All", ...Array.from(new Set(DOCTORS.map((d) => d.specialization)))];
  const allDepts = ["All", ...Array.from(new Set(DOCTORS.map((d) => d.department)))];

  function updateStatus(id: string, status: DocStatus) {
    setDoctors((prev) => prev.map((d) => d.id === id ? { ...d, status } : d));
    setSelected((s) => s?.id === id ? { ...s, status } : s);
  }

  function handleApprove() {
    if (!selected) return;
    updateStatus(selected.id, "approved");
    setApproved(selected.id);
  }
  function handleReject() {
    if (!selected) return;
    updateStatus(selected.id, "rejected");
  }
  function handleRequestInfo() {
    if (!selected) return;
    updateStatus(selected.id, "more-info");
  }

  const selectStyle: React.CSSProperties = {
    padding: "6px 26px 6px 10px", fontSize: 12, color: T.navy,
    border: `1px solid ${T.border}`, borderRadius: 8, background: T.white,
    appearance: "none" as const, cursor: "pointer",
    fontFamily: "Inter, system-ui, sans-serif", outline: "none",
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
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Doctor Approvals</div>
              <div style={{ fontSize: 10, color: T.grayLight }}>Hospital Admin · AyurCare Hospital</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          {/* Hospital chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px 5px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 20 }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.building} size={11} stroke={T.primary} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>AyurCare Hospital</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.success, background: T.successLight, border: `1px solid ${T.successBorder}`, padding: "1px 7px", borderRadius: 12 }}>✓ Verified</span>
          </div>
        </div>
        <div style={{ padding: "8px 28px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ margin: 0, fontSize: 12, color: T.gray }}>
            Review doctors who have requested to join your hospital. Only approved doctors can appear in the active directory and patient appointment availability.
          </p>
        </div>
      </header>

      <div style={{ flex: 1, padding: "24px 28px 60px", maxWidth: 1400, width: "100%", margin: "0 auto", boxSizing: "border-box" as const }}>

        {/* ── Metrics ── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" as const }}>
          <MetricCard label="Pending Review"    value={pending}  color={T.amber}   icon={ic.clock}      />
          <MetricCard label="Approved"          value={appCount} color={T.success}  icon={ic.shieldCheck}/>
          <MetricCard label="Rejected"          value={rejected} color={T.danger}   icon={ic.xCircle}   />
          <MetricCard label="Documents Pending" value={docsPend} color={T.blue}     icon={ic.fileText}  />
        </div>

        {/* ── Main layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 20, alignItems: "start" }}>

          {/* ── Left: queue ── */}
          <div>
            {/* Workflow banner */}
            {selected && <WorkflowBanner status={selected.status} />}

            {/* Filters */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14, display: "flex", gap: 10, flexWrap: "wrap" as const, alignItems: "center" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
                <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}>
                  <Icon d={ic.search} size={13} stroke={T.grayLight} />
                </span>
                <input
                  type="text" placeholder="Search doctors..."
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

              {([
                { val: statusF, set: setStatusF, opts: ["All", "Pending", "Docs Pending", "Approved", "Rejected"] },
                { val: specF,   set: setSpecF,   opts: allSpecs },
                { val: deptF,   set: setDeptF,   opts: allDepts },
              ] as const).map((f, fi) => (
                <div key={fi} style={{ position: "relative" }}>
                  <select value={f.val} onChange={(e) => (f.set as (v: string) => void)(e.target.value)} style={selectStyle}>
                    {f.opts.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <span style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <Icon d={ic.chevDown} size={12} stroke={T.grayLight} />
                  </span>
                </div>
              ))}

              <div style={{ fontSize: 11, color: T.grayLight, marginLeft: "auto" }}>
                {filtered.length} of {doctors.length} doctors
              </div>
            </div>

            {/* Table */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
              {/* Head */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 140px 90px 70px 130px 80px", background: T.muted, borderBottom: `1px solid ${T.border}` }}>
                {["Doctor", "Specialization", "Registration No.", "Experience", "Docs", "Status", "Action"].map((h) => (
                  <div key={h} style={{ padding: "9px 14px", fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em" }}>{h.toUpperCase()}</div>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div style={{ padding: "36px 20px", textAlign: "center" as const }}>
                  <p style={{ margin: 0, fontSize: 13, color: T.grayLight }}>No doctors match the current filters.</p>
                </div>
              ) : filtered.map((doc) => {
                const isSel = selected?.id === doc.id;
                const avatarColors: Record<string, string> = { M: T.primary, P: T.purple, A: T.blue, K: T.amber, S: T.success, R: T.danger };
                const ac = avatarColors[doc.initials] || T.primary;
                return (
                  <div
                    key={doc.id}
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 130px 140px 90px 70px 130px 80px",
                      alignItems: "center",
                      background: isSel ? T.primaryLight : T.white,
                      borderBottom: `1px solid ${T.border}`,
                      borderLeft: `3px solid ${isSel ? T.primary : "transparent"}`,
                      transition: "background 0.12s",
                    }}
                  >
                    {/* Doctor */}
                    <div style={{ padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                        {doc.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{doc.name}</div>
                        <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{doc.docId}</div>
                      </div>
                    </div>
                    {/* Specialization */}
                    <div style={{ padding: "11px 14px", fontSize: 12, color: T.gray }}>{doc.specialization}</div>
                    {/* Reg no */}
                    <div style={{ padding: "11px 14px", fontSize: 11, color: T.navy, fontFamily: "monospace" }}>{doc.regNumber}</div>
                    {/* Experience */}
                    <div style={{ padding: "11px 14px", fontSize: 12, color: T.gray }}>{doc.experience}</div>
                    {/* Docs */}
                    <div style={{ padding: "11px 14px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: doc.docsUploaded === doc.docsTotal ? T.success : T.amber }}>
                        {doc.docsUploaded}/{doc.docsTotal}
                      </span>
                    </div>
                    {/* Status */}
                    <div style={{ padding: "11px 14px" }}>
                      <Badge status={doc.status} />
                    </div>
                    {/* Action */}
                    <div style={{ padding: "11px 10px" }}>
                      <button
                        onClick={() => { setSelected(doc); setApproved(null); }}
                        style={{
                          padding: "5px 12px",
                          background: isSel ? T.primary : T.white,
                          border: `1px solid ${isSel ? T.primary : T.primaryBorder}`,
                          borderRadius: 7, fontSize: 11, fontWeight: 600,
                          color: isSel ? "#fff" : T.primary,
                          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
                        }}
                      >
                        {doc.status === "approved" || doc.status === "rejected" ? "View" : "Review"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note */}
            <div style={{ marginTop: 14, padding: "10px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <Icon d={ic.info} size={13} stroke={T.primary} />
              <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
                Only doctors with an <strong>Approved</strong> status can accept patient appointments and appear in the hospital directory. Doctor registration alone does not grant active status.
              </p>
            </div>
          </div>

          {/* ── Right: detail ── */}
          <div style={{ position: "sticky", top: 110 }}>
            {!selected ? (
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, padding: "40px 24px", textAlign: "center" as const }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <Icon d={ic.clipboard} size={22} stroke={T.grayLight} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 6 }}>Select a doctor</div>
                <p style={{ margin: 0, fontSize: 12, color: T.grayLight, lineHeight: 1.55 }}>
                  Click Review on any doctor in the queue to begin the approval process.
                </p>
              </div>
            ) : approved === selected.id ? (
              <ApprovalSuccess
                doctor={selected}
                onViewProfile={() => {}}
                onViewDashboard={() => {}}
              />
            ) : (
              <div style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" as const }}>
                <DetailPanel
                  doctor={selected}
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

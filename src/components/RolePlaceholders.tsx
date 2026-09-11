import { useState } from "react";
import { UserRole, DEMO_ROLES } from "../types";

interface RolePlaceholderProps {
  featureId: string;
  currentRole: UserRole;
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const T = {
  primary: "#0d7a6e",
  primaryLight: "#f0fdf9",
  primaryBorder: "#b2e8e0",
  navy: "#0f1f3d",
  gray: "#64748b",
  grayLight: "#94a3b8",
  bg: "#f5f7fa",
  white: "#ffffff",
  border: "#e8ecf0",
  muted: "#f8fafc",
  danger: "#e84b4b",
  dangerLight: "#fff5f5",
  dangerBorder: "#fecaca",
  success: "#16a34a",
  successLight: "#f0fdf4",
  successBorder: "#bbf7d0",
  amber: "#d97706",
  amberLight: "#fffbeb",
  amberBorder: "#fde68a",
  blue: "#1d4ed8",
  blueLight: "#eff6ff",
  blueBorder: "#bfdbfe",
  purple: "#7c3aed",
  purpleLight: "#f5f3ff",
  purpleBorder: "#ddd6fe",
};

export default function RolePlaceholders({
  featureId,
  currentRole,
  onNavigate,
  onBack,
}: RolePlaceholderProps) {
  const roleInfo = DEMO_ROLES[currentRole];
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Header helper for all placeholder screens
  const ScreenHeader = ({ title, subtitle, actions }: { title: string; subtitle: string; actions?: React.ReactNode }) => (
    <div
      style={{
        background: T.white,
        borderBottom: `1px solid ${T.border}`,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 12px",
            background: T.muted,
            border: `1px solid ${T.border}`,
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            color: T.navy,
            cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <span>← Back</span>
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: T.navy, letterSpacing: "-0.01em" }}>
            {title}
          </h1>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: T.gray }}>
            {subtitle}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {actions}
      </div>
    </div>
  );

  // 1. FIND HEALTHCARE
  if (featureId === "find-healthcare") {
    const facilities = [
      { name: "Dr. Priya Mehta", role: "Senior Endocrinologist", clinic: "Apollo Hospitals, Mumbai", rating: "4.9 (128 reviews)", fee: "₹700", type: "doctor", screen: "appt-booking" },
      { name: "Dr. S. Krishnan", role: "General Physician", clinic: "Fortis Healthcare, Mumbai", rating: "4.8 (94 reviews)", fee: "₹500", type: "doctor", screen: "appt-booking" },
      { name: "Dr. Kavita Nair", role: "Cardiologist", clinic: "Max Super Specialty Hospital", rating: "4.9 (210 reviews)", fee: "₹900", type: "doctor", screen: "appt-booking" },
      { name: "AyurCare Holistic Hospital", role: "Multi-Specialty & AYUSH Centre", clinic: "Bandra West, Mumbai", rating: "4.7 (340 reviews)", fee: "Varies", type: "hospital", screen: "hospital-dash" },
      { name: "MedPlus 24x7 Pharmacy", role: "Authorized Pharmacy & Diagnostics", clinic: "Linking Road, Mumbai", rating: "4.8 (512 reviews)", fee: "Free Delivery", type: "pharmacy", screen: "pharmacy" },
      { name: "Thyrocare Central Diagnostics", role: "NABL Accredited Diagnostic Lab", clinic: "Navi Mumbai Central", rating: "4.9 (820 reviews)", fee: "Home Collection", type: "lab", screen: "lab" },
    ];

    const filtered = facilities.filter((f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.clinic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="Find Healthcare & Diagnostics"
          subtitle="Search certified ABDM doctors, hospitals, pharmacies and accredited diagnostic labs"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => onNavigate("appt-booking")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                + Book Appointment
              </button>
            </div>
          }
        />

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Search bar */}
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="text"
                placeholder="Search by doctor name, specialty, hospital or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, padding: "10px 14px", fontSize: 13, borderRadius: 8, border: `1px solid ${T.border}`, background: T.white, outline: "none", color: T.navy }}
              />
              <button
                onClick={() => onNavigate("doctor-profile")}
                style={{ padding: "10px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer" }}
              >
                Doctor Profile
              </button>
            </div>

            {/* List */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(460px, 1fr))", gap: 14 }}>
              {filtered.map((item, idx) => (
                <div key={idx} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: T.primary, fontWeight: 600, marginTop: 2 }}>{item.role}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: T.amber, background: T.amberLight, padding: "2px 8px", borderRadius: 12, border: `1px solid ${T.amberBorder}` }}>
                        ★ {item.rating}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 6 }}>📍 {item.clinic}</div>
                    <div style={{ fontSize: 12, color: T.navy, fontWeight: 600, marginTop: 4 }}>Fee: {item.fee}</div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                    <button
                      onClick={() => onNavigate("appt-booking")}
                      style={{ flex: 1, padding: "7px 10px", background: T.primary, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      Book In-Person
                    </button>
                    <button
                      onClick={() => onNavigate("consult")}
                      style={{ flex: 1, padding: "7px 10px", background: T.primaryLight, color: T.primary, border: `1px solid ${T.primaryBorder}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      Consult Online
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. MEDICAL DOCUMENTS
  if (featureId === "documents") {
    const documents = [
      { id: "DOC-102", name: "Comprehensive Blood Test Report.pdf", type: "Lab Report", date: "25 Aug 2026", size: "1.4 MB", provider: "Thyrocare Labs", verified: true },
      { id: "DOC-103", name: "Endocrinology Prescription - Dr. Priya.pdf", type: "Prescription", date: "28 Aug 2026", size: "480 KB", provider: "Apollo Hospital", verified: true },
      { id: "DOC-104", name: "ECG Cardiac Rhythm Analysis.pdf", type: "Cardiology", date: "12 Jul 2026", size: "2.8 MB", provider: "Fortis Healthcare", verified: true },
      { id: "DOC-105", name: "Discharge Summary - Routine Checkup.pdf", type: "Discharge Summary", date: "15 Jun 2026", size: "820 KB", provider: "Apollo Hospital", verified: true },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="Medical Documents & Health Locker"
          subtitle="All ABDM-linked health records, lab summaries and diagnostic uploads"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => showToast("Document uploaded successfully to ABHA Locker")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                + Upload Document
              </button>
              <button
                onClick={() => onNavigate("consent")}
                style={{ padding: "8px 14px", background: T.white, color: T.navy, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Consent Settings
              </button>
            </div>
          }
        />

        {actionNotice && (
          <div style={{ background: T.successLight, borderBottom: `1px solid ${T.successBorder}`, padding: "10px 24px", color: T.success, fontSize: 12, fontWeight: 600 }}>
            ✓ {actionNotice}
          </div>
        )}

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Locker Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "Total Documents", val: "14", color: T.navy },
                { label: "ABHA Linked", val: "14 (100%)", color: T.primary },
                { label: "Storage Used", val: "18.4 MB", color: T.blue },
                { label: "Active Consents", val: "3 Providers", color: T.success },
              ].map((s, i) => (
                <div key={i} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, padding: "12px 14px" }}>
                  <div style={{ fontSize: 11, color: T.gray }}>{s.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Document list */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}`, fontWeight: 700, fontSize: 13, color: T.navy }}>
                Uploaded Health Records
              </div>
              <div>
                {documents.map((doc, i) => (
                  <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: i < documents.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, fontWeight: 700, fontSize: 13 }}>
                        PDF
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{doc.name}</div>
                        <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>
                          {doc.provider} · {doc.date} · {doc.size}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button
                        onClick={() => onNavigate("record")}
                        style={{ padding: "5px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 11, fontWeight: 600, color: T.navy, cursor: "pointer" }}
                      >
                        View Record
                      </button>
                      <button
                        onClick={() => showToast(`Downloaded ${doc.name}`)}
                        style={{ padding: "5px 12px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 6, fontSize: 11, fontWeight: 600, color: T.primary, cursor: "pointer" }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. AI CLINICAL INTELLIGENCE
  if (featureId === "ai-intelligence") {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="AI Clinical Intelligence & Decision Support"
          subtitle="ABDM-compliant diagnostic guidance, drug interaction alerts and automated clinical triage"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => onNavigate("prescription")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Create Prescription
              </button>
              <button
                onClick={() => onNavigate("consult")}
                style={{ padding: "8px 14px", background: T.white, color: T.navy, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Open Consultation Room
              </button>
            </div>
          }
        />

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Active Clinical Warning Banner */}
            <div style={{ background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: T.danger, fontWeight: 700, fontSize: 13 }}>
                <span>⚠ Drug Interaction Alert Detected</span>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 12, color: T.navy, lineHeight: 1.5 }}>
                Patient <strong>Sunita Rao (MK-00420)</strong> is prescribed <em>Atorvastatin 10mg</em> while undergoing cardiac evaluation. Avoid co-administration with high-dose macrolides or CYP3A4 inhibitors. Check creatinine clearance before iodinated contrast.
              </p>
            </div>

            {/* Smart Modules */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Module 1 */}
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "18px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 8 }}>
                  Differential Diagnosis Assistant
                </div>
                <div style={{ fontSize: 12, color: T.gray, marginBottom: 12 }}>
                  Based on chief complaint: <em>"Chest tightness + breathlessness (4 hours)"</em>
                </div>
                {[
                  { dx: "Acute Coronary Syndrome", prob: "78% Match", level: "High Risk", color: T.danger },
                  { dx: "Gastroesophageal Reflux (GERD)", prob: "42% Match", level: "Moderate", color: T.amber },
                  { dx: "Musculoskeletal Chest Pain", prob: "24% Match", level: "Low Risk", color: T.success },
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{d.dx}</span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: T.gray }}>{d.prob}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: d.color, background: d.color + "15", padding: "1px 6px", borderRadius: 10 }}>{d.level}</span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => onNavigate("summary")}
                  style={{ width: "100%", marginTop: 14, padding: "8px", background: T.primaryLight, color: T.primary, border: `1px solid ${T.primaryBorder}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                >
                  View Clinical Summary
                </button>
              </div>

              {/* Module 2 */}
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "18px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 8 }}>
                  Recommended Clinical Protocols (SIH 2026)
                </div>
                <div style={{ fontSize: 12, color: T.gray, marginBottom: 12 }}>
                  Standard Treatment Guidelines for Indian Primary & Secondary Care
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: T.navy, lineHeight: 1.8 }}>
                  <li>Immediate 12-lead ECG within 10 minutes of presentation.</li>
                  <li>Serial high-sensitivity Troponin-I at 0h and 3h intervals.</li>
                  <li>Record ABHA consent token before retrieving prior ECG records.</li>
                  <li>Monitor SpO₂ continuously; target &gt; 94% on room air.</li>
                </ul>
                <button
                  onClick={() => onNavigate("record")}
                  style={{ width: "100%", marginTop: 14, padding: "8px", background: T.muted, color: T.navy, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                >
                  Review Patient Records
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. DEPARTMENTS (Hospital)
  if (featureId === "departments") {
    const depts = [
      { name: "Endocrinology & Diabetes", head: "Dr. Priya Mehta", doctors: 8, beds: "24 / 30", opd: "48 today", status: "Active" },
      { name: "Cardiology & Cath Lab", head: "Dr. Kavita Nair", doctors: 12, beds: "38 / 40", opd: "62 today", status: "Critical Care" },
      { name: "General Medicine & Checkup", head: "Dr. S. Krishnan", doctors: 16, beds: "45 / 50", opd: "114 today", status: "Active" },
      { name: "Ayurveda & AYUSH Center", head: "Dr. Raman Vaidya", doctors: 6, beds: "18 / 20", opd: "35 today", status: "Active" },
      { name: "Emergency & Trauma Triage", head: "Dr. Rajesh K.", doctors: 14, beds: "12 / 15", opd: "28 today", status: "24x7 Ready" },
      { name: "Pediatrics & Neonatal Care", head: "Dr. Sunita Sen", doctors: 9, beds: "22 / 25", opd: "41 today", status: "Active" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="Hospital Departments & Specialized Wards"
          subtitle="Manage medical units, on-duty physicians, bed allocations and emergency triage"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => onNavigate("doctor-approval")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Manage Doctors
              </button>
            </div>
          }
        />

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(460px, 1fr))", gap: 14 }}>
            {depts.map((d, i) => (
              <div key={i} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>Head: {d.head}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.success, background: T.successLight, padding: "2px 8px", borderRadius: 12, border: `1px solid ${T.successBorder}` }}>
                    {d.status}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12, padding: "8px 0", borderTop: `1px solid ${T.border}` }}>
                  <div>
                    <div style={{ fontSize: 10, color: T.gray }}>Doctors</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{d.doctors} Active</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: T.gray }}>Bed Occupancy</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{d.beds}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: T.gray }}>OPD Inflow</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{d.opd}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => onNavigate("appt-booking")}
                    style={{ flex: 1, padding: "6px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 11, fontWeight: 600, color: T.navy, cursor: "pointer" }}
                  >
                    Department Schedule
                  </button>
                  <button
                    onClick={() => onNavigate("doctor-approval")}
                    style={{ flex: 1, padding: "6px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 6, fontSize: 11, fontWeight: 600, color: T.primary, cursor: "pointer" }}
                  >
                    View Duty Doctors
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 5. INVENTORY (Pharmacy)
  if (featureId === "inventory") {
    const medicines = [
      { name: "Metformin 500mg", type: "Allopathy", qty: 450, min: 100, batch: "BAT-9941", expiry: "12/2027", status: "In Stock", color: T.success },
      { name: "Atorvastatin 10mg", type: "Allopathy", qty: 280, min: 80, batch: "BAT-8821", expiry: "08/2027", status: "In Stock", color: T.success },
      { name: "Amoxicillin 250mg", type: "Allopathy", qty: 22, min: 50, batch: "BAT-4102", expiry: "04/2026", status: "Low Stock", color: T.amber },
      { name: "Ashwagandha Churna", type: "Ayurveda", qty: 85, min: 30, batch: "AY-2910", expiry: "01/2028", status: "In Stock", color: T.success },
      { name: "Paracetamol 650mg", type: "Allopathy", qty: 8, min: 100, batch: "BAT-1109", expiry: "06/2026", status: "Critical Reorder", color: T.danger },
      { name: "Omeprazole 20mg", type: "Allopathy", qty: 160, min: 60, batch: "BAT-7741", expiry: "11/2027", status: "In Stock", color: T.success },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="Pharmacy Inventory & Stock Control"
          subtitle="Real-time pharmaceutical batch tracking, expiry monitoring and automatic reorder alerts"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => showToast("Reorder purchase order created")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                + Reorder Stock
              </button>
              <button
                onClick={() => onNavigate("pharmacy")}
                style={{ padding: "8px 14px", background: T.white, color: T.navy, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Pharmacy Store
              </button>
            </div>
          }
        />

        {actionNotice && (
          <div style={{ background: T.successLight, borderBottom: `1px solid ${T.successBorder}`, padding: "10px 24px", color: T.success, fontSize: 12, fontWeight: 600 }}>
            ✓ {actionNotice}
          </div>
        )}

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Current Medicine Batches</span>
              <span style={{ fontSize: 11, color: T.gray }}>Total: {medicines.length} SKUs</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 110px 100px 130px", background: T.muted, borderBottom: `1px solid ${T.border}`, padding: "8px 16px", fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.05em" }}>
              <span>MEDICINE</span>
              <span>TYPE</span>
              <span>STOCK</span>
              <span>BATCH</span>
              <span>EXPIRY</span>
              <span>STATUS</span>
            </div>
            {medicines.map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 110px 100px 130px", alignItems: "center", padding: "12px 16px", borderBottom: i < medicines.length - 1 ? `1px solid ${T.border}` : "none", fontSize: 12 }}>
                <span style={{ fontWeight: 600, color: T.navy }}>{m.name}</span>
                <span style={{ color: T.gray }}>{m.type}</span>
                <span style={{ fontWeight: 700, color: T.navy }}>{m.qty}</span>
                <span style={{ color: T.gray, fontFamily: "monospace" }}>{m.batch}</span>
                <span style={{ color: T.gray }}>{m.expiry}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: m.color, background: m.color + "15", padding: "2px 8px", borderRadius: 10, width: "fit-content" }}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 6. SAMPLES (Laboratory)
  if (featureId === "samples") {
    const samples = [
      { barcode: "SMP-99104", patient: "Rahul Sharma", test: "HbA1c & Fasting Glucose", tube: "EDTA / Purple", collected: "08:30 AM", status: "In Analyzer", color: T.amber },
      { barcode: "SMP-99105", patient: "Anita Desai", test: "Complete Blood Count (CBC)", tube: "EDTA / Purple", collected: "08:45 AM", status: "Completed", color: T.success },
      { barcode: "SMP-99106", patient: "Mohammed Rafi", test: "Lipid Profile & LFT", tube: "Serum / Gold", collected: "09:05 AM", status: "Collected", color: T.blue },
      { barcode: "SMP-99107", patient: "Geeta Pillai", test: "Thyroid Profile (T3, T4, TSH)", tube: "Serum / Red", collected: "09:18 AM", status: "In Analyzer", color: T.amber },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="Specimen & Sample Barcode Management"
          subtitle="Sample barcode verification, analyzer routing and cold chain temperature logging"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => onNavigate("lab")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Diagnostic Reports
              </button>
            </div>
          }
        />

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, fontWeight: 700, fontSize: 13, color: T.navy }}>
              Today's Specimen Queue
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "120px 140px 1fr 120px 100px 110px", background: T.muted, borderBottom: `1px solid ${T.border}`, padding: "8px 16px", fontSize: 10, fontWeight: 700, color: T.grayLight }}>
              <span>BARCODE</span>
              <span>PATIENT</span>
              <span>DIAGNOSTIC TEST</span>
              <span>COLLECTION TUBE</span>
              <span>TIME</span>
              <span>STATUS</span>
            </div>
            {samples.map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 140px 1fr 120px 100px 110px", alignItems: "center", padding: "12px 16px", borderBottom: i < samples.length - 1 ? `1px solid ${T.border}` : "none", fontSize: 12 }}>
                <span style={{ fontFamily: "monospace", fontWeight: 700, color: T.primary }}>{s.barcode}</span>
                <span style={{ fontWeight: 600, color: T.navy }}>{s.patient}</span>
                <span style={{ color: T.navy }}>{s.test}</span>
                <span style={{ color: T.gray }}>{s.tube}</span>
                <span style={{ color: T.gray }}>{s.collected}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.color + "15", padding: "2px 8px", borderRadius: 10 }}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 7. PAYMENTS & BILLING
  if (featureId === "payments") {
    const payments = [
      { id: "INV-2026-081", patient: "Rahul Sharma", service: "Endocrinology Consult + Metformin", amount: "₹1,240", mode: "UPI (Google Pay)", date: "Today, 09:15 AM", status: "Paid" },
      { id: "INV-2026-082", patient: "Anita Desai", service: "HbA1c & CBC Diagnostic Panel", amount: "₹850", mode: "ABDM PM-JAY Claim", date: "Today, 08:45 AM", status: "Settled" },
      { id: "INV-2026-083", patient: "Mohammed Rafi", service: "Pharmacy Prescription Order #4279", amount: "₹620", mode: "Cash on Delivery", date: "Today, 08:30 AM", status: "Pending" },
      { id: "INV-2026-084", patient: "Geeta Pillai", service: "Cardiology Followup Consultation", amount: "₹900", mode: "Credit Card (HDFC)", date: "Yesterday", status: "Paid" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="Billing, Invoices & Payment Gateway"
          subtitle="Instant UPI, cashless ABDM health insurance claims and patient invoices"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => showToast("New receipt generated")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                + Generate Invoice
              </button>
            </div>
          }
        />

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "Today's Collections", val: "₹48,250", color: T.primary },
                { label: "PM-JAY Claims", val: "₹18,400", color: T.blue },
                { label: "Pending COD", val: "₹3,120", color: T.amber },
                { label: "Settlement Rate", val: "99.4%", color: T.success },
              ].map((s, i) => (
                <div key={i} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, padding: "12px 14px" }}>
                  <div style={{ fontSize: 11, color: T.gray }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.val}</div>
                </div>
              ))}
            </div>

            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, fontWeight: 700, fontSize: 13, color: T.navy }}>
                Recent Invoices & Transactions
              </div>
              <div>
                {payments.map((p, i) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: i < payments.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{p.patient} · <span style={{ color: T.primary }}>{p.amount}</span></div>
                      <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>{p.service} · {p.mode} · {p.date}</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: p.status === "Paid" || p.status === "Settled" ? T.success : T.amber, background: (p.status === "Paid" || p.status === "Settled" ? T.success : T.amber) + "15", padding: "3px 10px", borderRadius: 12 }}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 8. REPORTS & ANALYTICS
  if (featureId === "reports" || featureId === "analytics") {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title={featureId === "analytics" ? "Diagnostic Analytics & Laboratory QA" : "Clinical & Operational Performance Reports"}
          subtitle="Aggregated healthcare metrics, turnaround times and national compliance data"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => showToast("Exported PDF summary report")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Export PDF
              </button>
            </div>
          }
        />

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px" }}>
                <div style={{ fontSize: 11, color: T.gray }}>Average Turnaround Time</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.navy, marginTop: 6 }}>1 hr 45 min</div>
                <div style={{ fontSize: 11, color: T.success, marginTop: 4 }}>↑ 18% faster than national benchmark</div>
              </div>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px" }}>
                <div style={{ fontSize: 11, color: T.gray }}>ABDM Electronic Consent Rate</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.primary, marginTop: 6 }}>98.2%</div>
                <div style={{ fontSize: 11, color: T.success, marginTop: 4 }}>Full ABHA compliance</div>
              </div>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px" }}>
                <div style={{ fontSize: 11, color: T.gray }}>Prescription Dispense Accuracy</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.purple, marginTop: 6 }}>99.9%</div>
                <div style={{ fontSize: 11, color: T.purple, marginTop: 4 }}>Zero critical adverse interactions</div>
              </div>
            </div>

            {/* Visual breakdown box */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "18px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 12 }}>
                Monthly Throughput Summary (September 2026)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Outpatient Teleconsultations", count: "1,248 completed", pct: 85, color: T.primary },
                  { label: "Diagnostic Lab Investigations", count: "2,410 processed", pct: 92, color: T.blue },
                  { label: "Pharmacy E-Prescriptions Filled", count: "3,180 dispensed", pct: 96, color: T.purple },
                  { label: "ABHA Health Locker Syncs", count: "6,920 records synced", pct: 99, color: T.success },
                ].map((row, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, color: T.navy }}>{row.label}</span>
                      <span style={{ color: T.gray }}>{row.count}</span>
                    </div>
                    <div style={{ height: 6, background: T.border, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${row.pct}%`, background: row.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 9. AUDIT LOGS (Admin)
  if (featureId === "audit-logs") {
    const logs = [
      { time: "09:32:10", user: "dr.priya.mehta@abdm", action: "ABHA Consent Request", patient: "Rahul Sharma (MK-2947)", status: "Granted", ip: "103.21.244.12" },
      { time: "09:28:44", user: "superadmin@abdm.gov", action: "Hospital Credential Verified", patient: "AyurCare Hospital (HOSP-MH-4012)", status: "Approved", ip: "14.139.122.9" },
      { time: "09:12:05", user: "rx@medplus", action: "Prescription Dispense Logged", patient: "RXO-001 / Metformin", status: "Success", ip: "182.72.10.4" },
      { time: "08:55:18", user: "lab@thyrocare", action: "NABL Report Cryptographic Sign", patient: "SMP-99104", status: "Signed", ip: "115.112.8.21" },
      { time: "08:40:02", user: "dr.s.krishnan@abdm", action: "Health Record Access Revoked", patient: "Anita Desai (MK-1832)", status: "Revoked by User", ip: "103.21.244.12" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="ABDM Security, Access & Audit Logs"
          subtitle="Immutable audit trail of all patient consent grants, clinical record views and system transactions"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => showToast("Exported SIH security audit logs")}
                style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                Export Audit Log
              </button>
            </div>
          }
        />

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, fontWeight: 700, fontSize: 13, color: T.navy }}>
              Real-time Platform Audit Trail
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "90px 170px 1fr 120px 110px", background: T.muted, borderBottom: `1px solid ${T.border}`, padding: "8px 16px", fontSize: 10, fontWeight: 700, color: T.grayLight }}>
              <span>TIMESTAMP</span>
              <span>USER IDENTITY</span>
              <span>ACTION & TARGET</span>
              <span>IP ADDRESS</span>
              <span>RESULT</span>
            </div>
            {logs.map((log, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 170px 1fr 120px 110px", alignItems: "center", padding: "12px 16px", borderBottom: i < logs.length - 1 ? `1px solid ${T.border}` : "none", fontSize: 12 }}>
                <span style={{ fontFamily: "monospace", color: T.gray }}>{log.time}</span>
                <span style={{ fontWeight: 600, color: T.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.user}</span>
                <div>
                  <div style={{ fontWeight: 600, color: T.navy }}>{log.action}</div>
                  <div style={{ fontSize: 10, color: T.gray }}>{log.patient}</div>
                </div>
                <span style={{ fontFamily: "monospace", color: T.gray, fontSize: 11 }}>{log.ip}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: log.status.includes("Revoked") ? T.amber : T.success, background: (log.status.includes("Revoked") ? T.amber : T.success) + "15", padding: "2px 8px", borderRadius: 10, width: "fit-content" }}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 10. SYSTEM HEALTH (Admin)
  if (featureId === "system-health") {
    const services = [
      { name: "ABDM Health Information Gateway (NDHM)", status: "Operational", latency: "24 ms", uptime: "99.98%" },
      { name: "Ayush Grid EHR Interoperability Bridge", status: "Operational", latency: "31 ms", uptime: "99.95%" },
      { name: "ABHA Number & Address Resolution Service", status: "Operational", latency: "18 ms", uptime: "100%" },
      { name: "National e-Prescription Registry", status: "Operational", latency: "28 ms", uptime: "99.99%" },
      { name: "Diagnostic Barcode & Report Vault", status: "Operational", latency: "42 ms", uptime: "99.94%" },
      { name: "SMS Gateway & OTP Verification Service", status: "Operational", latency: "120 ms", uptime: "99.91%" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="MediKiosk Platform Health & Infrastructure"
          subtitle="Live telemetry for ABDM gateway, microservices and national database clusters"
          actions={
            <button
              onClick={() => showToast("Health telemetry refreshed")}
              style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              Refresh Status
            </button>
          }
        />

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Overall status */}
            <div style={{ background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: T.success }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>All Systems Fully Operational</div>
                  <div style={{ fontSize: 12, color: T.gray }}>Platform incident response active · Zero service disruptions</div>
                </div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.success }}>99.97% Uptime (Past 90 Days)</div>
            </div>

            {/* Service list */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, fontWeight: 700, fontSize: 13, color: T.navy }}>
                Connected Infrastructure Services
              </div>
              {services.map((svc, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: i < services.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{svc.name}</div>
                    <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>Uptime: {svc.uptime}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11, color: T.gray, fontFamily: "monospace" }}>{svc.latency}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.success, background: T.successLight, padding: "2px 8px", borderRadius: 10, border: `1px solid ${T.successBorder}` }}>
                      {svc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 11. NOTIFICATIONS
  if (featureId === "notifications") {
    const roleNotifs = [
      { id: "n1", title: "Diagnostic Test Completed", desc: "HbA1c test results from Thyrocare Labs are verified and ready for review.", time: "15m ago", type: "lab", unread: true },
      { id: "n2", title: "Prescription Renewal Approved", desc: "Dr. Priya Mehta approved your 30-day Metformin refill.", time: "1h ago", type: "rx", unread: true },
      { id: "n3", title: "Upcoming Appointment Reminder", desc: "Follow-up consultation scheduled with Apollo Hospitals tomorrow at 10:30 AM.", time: "3h ago", type: "appt", unread: false },
      { id: "n4", title: "ABHA Health Locker Sync", desc: "Your ABDM records were successfully backed up to your national digital locker.", time: "1d ago", type: "sync", unread: false },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="Notification Center"
          subtitle={`Important medical alerts and updates for ${roleInfo.name}`}
          actions={
            <button
              onClick={() => showToast("All notifications marked as read")}
              style={{ padding: "8px 14px", background: T.white, color: T.navy, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              Mark All as Read
            </button>
          }
        />

        {actionNotice && (
          <div style={{ background: T.successLight, borderBottom: `1px solid ${T.successBorder}`, padding: "10px 24px", color: T.success, fontSize: 12, fontWeight: 600 }}>
            ✓ {actionNotice}
          </div>
        )}

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
            {roleNotifs.map((n) => (
              <div key={n.id} style={{ background: T.white, border: `1px solid ${n.unread ? T.primaryBorder : T.border}`, borderRadius: 9, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", boxShadow: n.unread ? "0 2px 8px rgba(13, 122, 110, 0.08)" : "none" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: n.unread ? T.primary : "transparent", marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 3, lineHeight: 1.5 }}>{n.desc}</div>
                    <div style={{ fontSize: 10, color: T.grayLight, marginTop: 6 }}>{n.time}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (n.type === "lab") onNavigate("lab");
                    else if (n.type === "rx") onNavigate("prescription");
                    else if (n.type === "appt") onNavigate("appt-booking");
                    else onNavigate("timeline");
                  }}
                  style={{ padding: "5px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 11, fontWeight: 600, color: T.primary, cursor: "pointer" }}
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 12. SETTINGS
  if (featureId === "settings") {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
        <ScreenHeader
          title="Account, Security & ABDM Settings"
          subtitle={`Manage settings and preferences for ${roleInfo.name} (${roleInfo.title})`}
          actions={
            <button
              onClick={() => showToast("Preferences updated successfully")}
              style={{ padding: "8px 14px", background: T.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              Save Preferences
            </button>
          }
        />

        {actionNotice && (
          <div style={{ background: T.successLight, borderBottom: `1px solid ${T.successBorder}`, padding: "10px 24px", color: T.success, fontSize: 12, fontWeight: 600 }}>
            ✓ {actionNotice}
          </div>
        )}

        <div style={{ flex: 1, padding: "20px 24px" }}>
          <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Identity Card */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "18px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 12 }}>
                ABDM Profile & Digital Identity
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: T.gray, display: "block", marginBottom: 4 }}>Full Name</label>
                  <input type="text" readOnly defaultValue={roleInfo.name} style={{ width: "100%", padding: "8px 10px", fontSize: 12, border: `1px solid ${T.border}`, borderRadius: 6, background: T.muted }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: T.gray, display: "block", marginBottom: 4 }}>ABHA / ABDM Address</label>
                  <input type="text" readOnly defaultValue={roleInfo.defaultAbha} style={{ width: "100%", padding: "8px 10px", fontSize: 12, border: `1px solid ${T.border}`, borderRadius: 6, background: T.muted }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: T.gray, display: "block", marginBottom: 4 }}>Registered Mobile</label>
                  <input type="text" readOnly defaultValue={`+91 ${roleInfo.defaultMobile}`} style={{ width: "100%", padding: "8px 10px", fontSize: 12, border: `1px solid ${T.border}`, borderRadius: 6, background: T.muted }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: T.gray, display: "block", marginBottom: 4 }}>Designation / Identifier</label>
                  <input type="text" readOnly defaultValue={roleInfo.subtitle} style={{ width: "100%", padding: "8px 10px", fontSize: 12, border: `1px solid ${T.border}`, borderRadius: 6, background: T.muted }} />
                </div>
              </div>
            </div>

            {/* Privacy & Consent */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "18px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 12 }}>
                Consent & Data Sharing Policies
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { title: "Require OTP for each new healthcare provider consent", checked: true },
                  { title: "Allow linked laboratories to upload diagnostic reports automatically", checked: true },
                  { title: "Enable SMS notifications for medication reminders", checked: true },
                  { title: "Participate in anonymized public health research telemetry", checked: false },
                ].map((item, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: T.navy, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked={item.checked} />
                    <span>{item.title}</span>
                  </label>
                ))}
              </div>
              <div style={{ marginTop: 14 }}>
                <button
                  onClick={() => onNavigate("consent")}
                  style={{ padding: "6px 12px", background: T.primaryLight, color: T.primary, border: `1px solid ${T.primaryBorder}`, borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                >
                  Manage Active Provider Consents →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback placeholder
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: T.bg }}>
      <ScreenHeader
        title={featureId.replace("-", " ").toUpperCase()}
        subtitle={`MediKiosk Healthcare Module · Active Role: ${roleInfo.title}`}
      />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: "32px 40px", maxWidth: 480, textAlign: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: T.primary, fontWeight: 700 }}>
            MK
          </div>
          <h2 style={{ margin: 0, fontSize: 18, color: T.navy, fontWeight: 700 }}>{featureId.replace("-", " ").toUpperCase()}</h2>
          <p style={{ fontSize: 13, color: T.gray, marginTop: 8, lineHeight: 1.6 }}>
            This feature is integrated into the MediKiosk healthcare ecosystem for role: <strong>{roleInfo.title}</strong>.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
            <button
              onClick={onBack}
              style={{ padding: "8px 16px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer" }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Consent from "./Consent";
import CheckIn from "./CheckIn";
import ClinicalIntake from "./ClinicalIntake";
import ClinicalSummary from "./ClinicalSummary";
import DoctorDashboard from "./DoctorDashboard";
import PatientRecord from "./PatientRecord";
import ConsultationRoom from "./ConsultationRoom";
import CreatePrescription from "./CreatePrescription";
import Pharmacy from "./Pharmacy";
import PharmacyCheckout from "./PharmacyCheckout";
import OrderTracking from "./OrderTracking";
import LabDiagnostics from "./LabDiagnostics";
import HealthTimeline from "./HealthTimeline";
import HospitalRegistration from "./HospitalRegistration";
import HospitalVerification from "./HospitalVerification";
import DoctorRegistration from "./DoctorRegistration";
import DoctorApproval from "./DoctorApproval";
import AdminDashboard from "./AdminDashboard";
import PharmacyDashboard from "./PharmacyDashboard";
import LabDashboard from "./LabDashboard";
import HospitalDashboard from "./HospitalDashboard";
import DoctorProfile from "./DoctorProfile";
import AppointmentBooking from "./AppointmentBooking";

// ─── Icons (inline SVG, Lucide-style) ───────────────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }: { d: string; size?: number; stroke?: string; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  appointments: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  timeline: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  documents: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  prescriptions: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  pharmacy: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  teleconsult: "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  notifications: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  profile: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  chevronRight: "M9 18l6-6-6-6",
  chevronDown: "M19 9l-7 7-7-7",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  pill: "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  fileText: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  video: "M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  alertCircle: "M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  building: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  stethoscope: "M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3 M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4",
  plus: "M12 5v14M5 12h14",
  info: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  refresh: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
  wifi: "M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01",
};

// ─── Palette ─────────────────────────────────────────────────────────────────
// Primary teal: #0d7a6e  Text navy: #0f1f3d  Gray: #64748b  BG: #f5f7fa

// ─── Nav items ───────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: icons.dashboard },
  { id: "appointments", label: "Appointments", icon: icons.appointments },
  { id: "timeline", label: "Health Timeline", icon: icons.timeline },
  { id: "documents", label: "Medical Documents", icon: icons.documents },
  { id: "prescriptions", label: "Prescriptions", icon: icons.prescriptions },
  { id: "pharmacy", label: "Pharmacy", icon: icons.pharmacy },
  { id: "teleconsult", label: "Teleconsultation", icon: icons.teleconsult },
];

const navBottom = [
  { id: "notifications", label: "Notifications", icon: icons.notifications },
  { id: "profile", label: "Profile", icon: icons.profile },
  { id: "settings", label: "Settings", icon: icons.settings },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, onLogout }: { active: string; setActive: (v: string) => void; onLogout?: () => void }) {
  return (
    <aside
      style={{ width: 220, minWidth: 220, background: "#0f1f3d", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}
    >
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#0d7a6e", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: "-0.01em" }}>MediKiosk</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.04em" }}>HEALTH PLATFORM</div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", padding: "8px 10px 6px" }}>PATIENT</div>
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                background: isActive ? "rgba(13,122,110,0.25)" : "transparent",
                color: isActive ? "#5dd6c8" : "rgba(255,255,255,0.55)",
                fontSize: 13, fontWeight: isActive ? 600 : 400, textAlign: "left",
                transition: "all 0.15s",
                marginBottom: 1,
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }}>
                <Icon d={item.icon} size={16} />
              </span>
              {item.label}
              {item.id === "notifications" && (
                <span style={{ marginLeft: "auto", background: "#e84b4b", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px" }}>3</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div style={{ padding: "10px 10px 8px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {navBottom.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
              background: active === item.id ? "rgba(13,122,110,0.2)" : "transparent",
              color: "rgba(255,255,255,0.5)", fontSize: 13, textAlign: "left",
              transition: "all 0.15s", marginBottom: 1,
            }}
          >
            <Icon d={item.icon} size={15} />
            {item.label}
          </button>
        ))}
        <button
          onClick={onLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "transparent", color: "rgba(255,100,100,0.6)", fontSize: 13, textAlign: "left",
            transition: "all 0.15s", marginTop: 2,
          }}
        >
          <Icon d={icons.logout} size={15} />
          Logout
        </button>
      </div>

      {/* Patient card */}
      <div style={{ padding: "12px 12px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0d7a6e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>R</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Rahul Sharma</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Patient ID: MK-2947</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Top Header ───────────────────────────────────────────────────────────────
function Header({ onRegister, onDoctorView, onHospitalReg, onHospitalVerify, onDoctorReg, onDoctorApproval, onAdmin, onPharmacyDash, onLabDash, onHospitalDash, onDoctorProfile, onApptBooking }: { onRegister: () => void; onDoctorView?: () => void; onHospitalReg?: () => void; onHospitalVerify?: () => void; onDoctorReg?: () => void; onDoctorApproval?: () => void; onAdmin?: () => void; onPharmacyDash?: () => void; onLabDash?: () => void; onHospitalDash?: () => void; onDoctorProfile?: () => void; onApptBooking?: () => void }) {
  return (
    <header style={{ height: 60, background: "#fff", borderBottom: "1px solid #e8ecf0", display: "flex", alignItems: "center", padding: "0 28px", gap: 16, flexShrink: 0, position: "sticky", top: 0, zIndex: 10 }}>
      {/* Breadcrumb */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Patient</span>
          <Icon d={icons.chevronRight} size={12} stroke="#94a3b8" />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#0f1f3d" }}>Dashboard</span>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", width: 240 }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
          <Icon d={icons.search} size={15} />
        </span>
        <input
          type="text"
          placeholder="Search records, doctors..."
          style={{ width: "100%", padding: "7px 12px 7px 32px", border: "1px solid #e8ecf0", borderRadius: 8, fontSize: 13, color: "#0f1f3d", background: "#f8fafc", outline: "none", fontFamily: "Inter, sans-serif" }}
        />
      </div>

      {/* Register new patient */}
      <button
        onClick={onRegister}
        style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
      >
        + Register Patient
      </button>

      {/* Appointment booking */}
      {onApptBooking && (
        <button
          onClick={onApptBooking}
          style={{ padding: "7px 14px", background: "#0d7a6e", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Book Appointment
        </button>
      )}
      {/* Doctor profile */}
      {onDoctorProfile && (
        <button
          onClick={onDoctorProfile}
          style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Doctor Profile
        </button>
      )}
      {/* Hospital dashboard */}
      {onHospitalDash && (
        <button
          onClick={onHospitalDash}
          style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Hospital
        </button>
      )}
      {/* Lab dashboard */}
      {onLabDash && (
        <button
          onClick={onLabDash}
          style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Lab Dashboard
        </button>
      )}
      {/* Pharmacy dashboard */}
      {onPharmacyDash && (
        <button
          onClick={onPharmacyDash}
          style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Pharmacy
        </button>
      )}
      {/* Admin dashboard */}
      {onAdmin && (
        <button
          onClick={onAdmin}
          style={{ padding: "7px 14px", background: "#0f1f3d", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Admin Console
        </button>
      )}
      {/* Doctor approval */}
      {onDoctorApproval && (
        <button
          onClick={onDoctorApproval}
          style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Doctor Approvals
        </button>
      )}
      {/* Doctor registration */}
      {onDoctorReg && (
        <button
          onClick={onDoctorReg}
          style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Register Doctor
        </button>
      )}
      {/* Hospital verify */}
      {onHospitalVerify && (
        <button
          onClick={onHospitalVerify}
          style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Verify Hospitals
        </button>
      )}
      {/* Doctor view */}
      {onHospitalReg && (
        <button
          onClick={onHospitalReg}
          style={{ padding: "7px 14px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Register Hospital
        </button>
      )}
      {onDoctorView && (
        <button
          onClick={onDoctorView}
          style={{ padding: "7px 14px", background: "#0f1f3d", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Doctor View
        </button>
      )}

      {/* Bell */}
      <div style={{ position: "relative", cursor: "pointer" }}>
        <Icon d={icons.bell} size={20} stroke="#64748b" />
        <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#e84b4b", borderRadius: "50%", fontSize: 9, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: "#e8ecf0" }} />

      {/* Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#0d7a6e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>R</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f1f3d" }}>Rahul Sharma</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
            <span style={{ fontSize: 10, color: "#16a34a", fontWeight: 600 }}>ABHA Verified</span>
          </div>
        </div>
        <Icon d={icons.chevronDown} size={14} stroke="#94a3b8" />
      </div>
    </header>
  );
}

// ─── Metric chip ─────────────────────────────────────────────────────────────
function MetricChip({ label, value, sub, color, icon }: { label: string; value: string; sub?: string; color: string; icon: string }) {
  return (
    <div style={{ flex: 1, padding: "16px 18px", background: "#fff", border: "1px solid #e8ecf0", borderRadius: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ width: 38, height: 38, borderRadius: 9, background: color + "12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={18} stroke={color} />
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#0f1f3d", lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#64748b", marginTop: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── Timeline event ──────────────────────────────────────────────────────────
const tlColors: Record<string, string> = {
  consultation: "#0d7a6e",
  prescription: "#7c3aed",
  lab: "#d97706",
  document: "#1d4ed8",
  followup: "#16a34a",
};

const tlBg: Record<string, string> = {
  consultation: "#f0fdf9",
  prescription: "#f5f3ff",
  lab: "#fffbeb",
  document: "#eff6ff",
  followup: "#f0fdf4",
};

function TimelineItem({ type, title, desc, date, last }: { type: string; title: string; desc: string; date: string; last?: boolean }) {
  const icons_map: Record<string, string> = {
    consultation: icons.stethoscope,
    prescription: icons.pill,
    lab: icons.activity,
    document: icons.fileText,
    followup: icons.clock,
  };
  return (
    <div style={{ display: "flex", gap: 14, paddingBottom: last ? 0 : 20, position: "relative" }}>
      {!last && <div style={{ position: "absolute", left: 18, top: 36, bottom: 0, width: 1, background: "#e8ecf0" }} />}
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: tlBg[type], border: `1.5px solid ${tlColors[type]}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icons_map[type]} size={16} stroke={tlColors[type]} />
      </div>
      <div style={{ flex: 1, paddingTop: 2 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f1f3d" }}>{title}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{desc}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: 12 }}>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>{date}</div>
            <button style={{ marginTop: 4, fontSize: 11, color: "#0d7a6e", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 }}>View →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Document row ────────────────────────────────────────────────────────────
function DocRow({ type, date, status, statusColor }: { type: string; date: string; status: string; statusColor: string }) {
  const docIcons: Record<string, string> = {
    Prescription: icons.pill,
    "Blood Test Report": icons.activity,
    "Discharge Summary": icons.documents,
    "Medical Report": icons.fileText,
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: "#f0fdf9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={docIcons[type] || icons.fileText} size={16} stroke="#0d7a6e" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#0f1f3d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{type}</div>
        <div style={{ fontSize: 11, color: "#94a3b8" }}>{date}</div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 600, color: statusColor, background: statusColor + "15", padding: "2px 8px", borderRadius: 20 }}>{status}</span>
      <button style={{ padding: 6, background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
        <Icon d={icons.eye} size={15} />
      </button>
    </div>
  );
}

// ─── Right panel: Health Snapshot ────────────────────────────────────────────
function HealthSnapshot() {
  const vitals = [
    { label: "Blood Pressure", value: "118/76", unit: "mmHg", status: "normal" },
    { label: "Heart Rate", value: "74", unit: "bpm", status: "normal" },
    { label: "SpO2", value: "98%", unit: "", status: "normal" },
    { label: "BMI", value: "23.4", unit: "kg/m²", status: "normal" },
  ];
  const meds = ["Metformin 500mg", "Atorvastatin 10mg", "Aspirin 75mg"];
  const allergies = ["Penicillin", "Sulfa drugs"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Vitals */}
      <Section title="Recent Vitals" tag="Last updated 3 days ago">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {vitals.map((v) => (
            <div key={v.label} style={{ padding: "10px 12px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e8ecf0" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>{v.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f1f3d" }}>{v.value} <span style={{ fontSize: 10, fontWeight: 400, color: "#94a3b8" }}>{v.unit}</span></div>
              <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 600, marginTop: 2 }}>● Normal</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Medications */}
      <Section title="Active Medications" tag={`${meds.length} medicines`}>
        {meds.map((m) => (
          <div key={m} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0d7a6e", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#0f1f3d" }}>{m}</span>
          </div>
        ))}
        <button style={{ marginTop: 8, fontSize: 11, color: "#0d7a6e", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>View all prescriptions →</button>
      </Section>

      {/* Allergies */}
      <Section title="Known Allergies">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {allergies.map((a) => (
            <span key={a} style={{ fontSize: 11, fontWeight: 600, color: "#b45309", background: "#fef3c7", padding: "3px 10px", borderRadius: 20, border: "1px solid #fde68a" }}>⚠ {a}</span>
          ))}
        </div>
      </Section>

      {/* Timeline summary */}
      <Section title="Care History">
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
          <span style={{ color: "#64748b" }}>Last consultation</span>
          <span style={{ fontWeight: 600, color: "#0f1f3d" }}>Aug 28, 2026</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
          <span style={{ color: "#64748b" }}>Next follow-up</span>
          <span style={{ fontWeight: 600, color: "#0d7a6e" }}>Sep 15, 2026</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span style={{ color: "#64748b" }}>Treating physician</span>
          <span style={{ fontWeight: 600, color: "#0f1f3d" }}>Dr. Mehta</span>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, tag, children }: { title: string; tag?: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#0f1f3d", letterSpacing: "0.01em" }}>{title}</span>
        {tag && <span style={{ fontSize: 10, color: "#94a3b8" }}>{tag}</span>}
      </div>
      {children}
    </div>
  );
}

// ─── Prescription row ─────────────────────────────────────────────────────────
function RxRow({ name, dosage, doctor, date }: { name: string; dosage: string; doctor: string; date: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid #f1f5f9" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f1f3d" }}>{name} <span style={{ fontWeight: 400, color: "#64748b", fontSize: 12 }}>{dosage}</span></div>
        <div style={{ fontSize: 11, color: "#94a3b8" }}>{doctor} · {date}</div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("dashboard");
  const [screen, setScreen] = useState<"login" | "register" | "consent" | "checkin" | "intake" | "summary" | "dashboard" | "doctor" | "record" | "consult" | "prescription" | "pharmacy" | "pharmacy-checkout" | "order-tracking" | "lab" | "timeline" | "hospital-reg" | "hospital-verify" | "doctor-reg" | "doctor-approval" | "admin" | "pharmacy-dash" | "lab-dash" | "hospital-dash" | "doctor-profile" | "appt-booking">("login");

  if (screen === "login") {
    return (
      <Login
        onLogin={() => setScreen("consent")}
        onRegister={() => setScreen("register")}
      />
    );
  }

  if (screen === "register") {
    return <Register onSignIn={() => setScreen("login")} />;
  }

  if (screen === "consent") {
    return (
      <Consent
        onContinue={() => setScreen("checkin")}
        onBack={() => setScreen("login")}
      />
    );
  }

  if (screen === "checkin") {
    return (
      <CheckIn
        onContinue={() => setScreen("intake")}
        onBack={() => setScreen("consent")}
      />
    );
  }

  if (screen === "intake") {
    return (
      <ClinicalIntake
        onContinue={() => setScreen("summary")}
        onBack={() => setScreen("checkin")}
      />
    );
  }

  if (screen === "summary") {
    return (
      <ClinicalSummary
        onBack={() => setScreen("intake")}
        onDashboard={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "doctor") {
    return <DoctorDashboard onLogout={() => setScreen("login")} onOpenRecord={() => setScreen("record")} onStartConsult={() => setScreen("consult")} onCreateRx={() => setScreen("prescription")} />;
  }

  if (screen === "record") {
    return <PatientRecord onBack={() => setScreen("doctor")} />;
  }

  if (screen === "consult") {
    return <ConsultationRoom onEnd={() => setScreen("doctor")} />;
  }

  if (screen === "prescription") {
    return <CreatePrescription onBack={() => setScreen("record")} />;
  }

  if (screen === "pharmacy") {
    return <Pharmacy onBack={() => setScreen("dashboard")} onCheckout={() => setScreen("pharmacy-checkout")} />;
  }

  if (screen === "pharmacy-checkout") {
    return <PharmacyCheckout onBack={() => setScreen("pharmacy")} onSuccess={() => setScreen("order-tracking")} />;
  }

  if (screen === "order-tracking") {
    return <OrderTracking onBack={() => setScreen("pharmacy-checkout")} onViewPrescription={() => setScreen("prescription")} onViewTimeline={() => setScreen("dashboard")} />;
  }

  if (screen === "lab") {
    return <LabDiagnostics onBack={() => setScreen("dashboard")} onViewTimeline={() => setScreen("timeline")} />;
  }

  if (screen === "timeline") {
    return <HealthTimeline onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "hospital-reg") {
    return <HospitalRegistration onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "hospital-verify") {
    return <HospitalVerification onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "doctor-reg") {
    return <DoctorRegistration onBack={() => setScreen("dashboard")} onDashboard={() => setScreen("doctor")} />;
  }

  if (screen === "doctor-approval") {
    return <DoctorApproval onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "admin") {
    return <AdminDashboard onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "pharmacy-dash") {
    return <PharmacyDashboard onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "lab-dash") {
    return <LabDashboard onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "hospital-dash") {
    return <HospitalDashboard onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "doctor-profile") {
    return <DoctorProfile onBack={() => setScreen("dashboard")} />;
  }

  if (screen === "appt-booking") {
    return <AppointmentBooking onBack={() => setScreen("dashboard")} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f5f7fa", fontFamily: "Inter, system-ui, sans-serif", color: "#0f1f3d", overflow: "hidden" }}>
      <Sidebar active={active} setActive={(v) => { setActive(v); if (v === "pharmacy") setScreen("pharmacy"); if (v === "timeline") setScreen("timeline"); }} onLogout={() => setScreen("login")} />

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Header onRegister={() => setScreen("register")} onDoctorView={() => setScreen("doctor")} onHospitalReg={() => setScreen("hospital-reg")} onHospitalVerify={() => setScreen("hospital-verify")} onDoctorReg={() => setScreen("doctor-reg")} onDoctorApproval={() => setScreen("doctor-approval")} onAdmin={() => setScreen("admin")} onPharmacyDash={() => setScreen("pharmacy-dash")} onLabDash={() => setScreen("lab-dash")} onHospitalDash={() => setScreen("hospital-dash")} onDoctorProfile={() => setScreen("doctor-profile")} onApptBooking={() => setScreen("appt-booking")} />

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 284px", gap: 24, maxWidth: 1280 }}>

            {/* ── LEFT COLUMN ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>

              {/* Greeting */}
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f1f3d", margin: 0, letterSpacing: "-0.02em" }}>Good morning, Rahul</h1>
                <p style={{ fontSize: 14, color: "#64748b", margin: "4px 0 0", fontWeight: 400 }}>Here's your health overview and upcoming care.</p>
              </div>

              {/* Primary action */}
              <div style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0f1f3d", marginBottom: 4 }}>Start a Health Check-in</div>
                  <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, maxWidth: 480 }}>Tell us what you're experiencing. MediKiosk will collect your symptoms and prepare a structured summary for your doctor.</div>
                </div>
                <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                  <button style={{ padding: "10px 20px", background: "#0d7a6e", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
                    Start Check-in
                  </button>
                  <button style={{ padding: "10px 18px", background: "#fff", color: "#0f1f3d", border: "1px solid #d4d9e1", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
                    Book Appointment
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: "flex", gap: 12 }}>
                <MetricChip label="Total Visits" value="24" sub="Since Jan 2024" color="#0d7a6e" icon={icons.building} />
                <MetricChip label="Upcoming" value="1" sub="Sep 15, 2026" color="#1d4ed8" icon={icons.appointments} />
                <MetricChip label="Active Medicines" value="3" sub="Ongoing" color="#7c3aed" icon={icons.pill} />
                <MetricChip label="Medical Reports" value="12" sub="All time" color="#d97706" icon={icons.fileText} />
              </div>

              {/* Upcoming Appointment */}
              <div style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#0f1f3d" }}>Upcoming Appointment</span>
                  <button style={{ fontSize: 12, color: "#0d7a6e", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>View all</button>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    {/* Doctor avatar */}
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, fontWeight: 700, color: "#1d4ed8" }}>M</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: "#0f1f3d" }}>Dr. Priya Mehta</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#16a34a", background: "#f0fdf4", padding: "2px 10px", borderRadius: 20, border: "1px solid #bbf7d0" }}>Confirmed</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Endocrinologist · Apollo Hospitals, Mumbai</div>
                      <div style={{ display: "flex", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Icon d={icons.appointments} size={14} stroke="#94a3b8" />
                          <span style={{ fontSize: 13, color: "#0f1f3d", fontWeight: 500 }}>Monday, Sep 15, 2026</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Icon d={icons.clock} size={14} stroke="#94a3b8" />
                          <span style={{ fontSize: 13, color: "#0f1f3d", fontWeight: 500 }}>11:30 AM</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Icon d={icons.video} size={14} stroke="#7c3aed" />
                          <span style={{ fontSize: 13, color: "#7c3aed", fontWeight: 500 }}>Video Consultation</span>
                        </div>
                      </div>
                    </div>
                    <button style={{ padding: "9px 18px", background: "#0d7a6e", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                      Join Consultation
                    </button>
                  </div>
                </div>
              </div>

              {/* Health Timeline */}
              <div style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#0f1f3d" }}>Health Timeline</span>
                  <button style={{ fontSize: 12, color: "#0d7a6e", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Full history</button>
                </div>
                <div style={{ padding: "20px" }}>
                  <TimelineItem type="consultation" title="Endocrinology Consultation" desc="Dr. Priya Mehta · Apollo Hospitals, Mumbai" date="Aug 28, 2026" />
                  <TimelineItem type="lab" title="HbA1c + Lipid Profile" desc="Thyrocare Labs · 6 results" date="Aug 25, 2026" />
                  <TimelineItem type="prescription" title="Prescription Updated" desc="Metformin dose adjusted — Dr. Mehta" date="Aug 28, 2026" />
                  <TimelineItem type="document" title="Discharge Summary Uploaded" desc="Nanavati Hospital · Appendectomy" date="Jul 12, 2026" />
                  <TimelineItem type="followup" title="Follow-up Scheduled" desc="Dr. Priya Mehta · 3 months review" date="Jun 15, 2026" last />
                </div>
              </div>

              {/* Clinical Insight */}
              <div style={{ background: "#fff", border: "1px solid #e8ecf0", borderLeft: "3px solid #d97706", borderRadius: "0 12px 12px 0", overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon d={icons.info} size={16} stroke="#d97706" />
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#0f1f3d" }}>Clinical Insight</span>
                    <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: "auto", fontStyle: "italic" }}>Preliminary clinical insight — not a diagnosis</span>
                  </div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px", lineHeight: 1.6 }}>
                    Based on your reported symptoms and recent lab values, the following considerations may warrant clinical review at your next appointment.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { label: "Possible considerations", value: "HbA1c trending above target range", icon: icons.alertCircle, color: "#d97706" },
                      { label: "Risk level", value: "Moderate — manageable with current plan", icon: icons.activity, color: "#0d7a6e" },
                      { label: "Missing information", value: "Fasting glucose reading not recorded", icon: icons.info, color: "#1d4ed8" },
                      { label: "Suggested next step", value: "Review medication adherence with Dr. Mehta", icon: icons.arrowRight, color: "#7c3aed" },
                    ].map((item) => (
                      <div key={item.label} style={{ padding: "12px 14px", background: "#f8fafc", borderRadius: 9, border: "1px solid #e8ecf0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                          <Icon d={item.icon} size={13} stroke={item.color} />
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>{item.label.toUpperCase()}</span>
                        </div>
                        <div style={{ fontSize: 12, color: "#0f1f3d", lineHeight: 1.5 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Documents + Prescriptions (side by side) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Documents */}
                <div style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f1f3d" }}>Recent Documents</span>
                    <button style={{ fontSize: 11, color: "#0d7a6e", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>All</button>
                  </div>
                  <div style={{ padding: "4px 14px 12px" }}>
                    <DocRow type="Prescription" date="Aug 28, 2026" status="Active" statusColor="#16a34a" />
                    <DocRow type="Blood Test Report" date="Aug 25, 2026" status="Reviewed" statusColor="#0d7a6e" />
                    <DocRow type="Discharge Summary" date="Jul 12, 2026" status="Archived" statusColor="#64748b" />
                    <DocRow type="Medical Report" date="Jun 3, 2026" status="Reviewed" statusColor="#0d7a6e" />
                  </div>
                </div>

                {/* Prescriptions */}
                <div style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f1f3d" }}>Recent Prescriptions</span>
                    <button style={{ fontSize: 11, color: "#0d7a6e", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>All</button>
                  </div>
                  <div style={{ padding: "4px 14px 12px" }}>
                    <RxRow name="Metformin" dosage="500mg · OD" doctor="Dr. Priya Mehta" date="Aug 28" />
                    <RxRow name="Atorvastatin" dosage="10mg · HS" doctor="Dr. Priya Mehta" date="Aug 28" />
                    <RxRow name="Aspirin" dosage="75mg · OD" doctor="Dr. Priya Mehta" date="Aug 28" />
                    <RxRow name="Vitamin D3" dosage="60K IU · Weekly" doctor="Dr. Priya Mehta" date="Jun 15" />
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* ABHA */}
              <div style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <Icon d={icons.shield} size={15} stroke="#0d7a6e" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0f1f3d" }}>ABHA Health Connection</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a" }}>Connected</span>
                  <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 4 }}>ID: 12-3456-7890-0001</span>
                </div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, lineHeight: 1.5 }}>
                  Health records are accessed through your explicit consent. No records are stored centrally without your permission.
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                  <span style={{ color: "#94a3b8" }}>Consent status</span>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>Active (3 providers)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 12 }}>
                  <span style={{ color: "#94a3b8" }}>Last synced</span>
                  <span style={{ color: "#0f1f3d", fontWeight: 500 }}>Today, 7:12 AM</span>
                </div>
                <button style={{ width: "100%", padding: "8px", background: "#f0fdf9", color: "#0d7a6e", border: "1px solid #b2e8e0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Manage Consent
                </button>
              </div>

              {/* Health Snapshot */}
              <div style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1f3d", marginBottom: 16 }}>Health Snapshot</div>
                <HealthSnapshot />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

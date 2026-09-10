import { useState } from "react";
import { UserRole, ScreenType, DEMO_ROLES } from "../types";

export default function UniversalNavBar({
  role,
  screen,
  onSelectRole,
  onSelectScreen,
  onLogout,
}: {
  role: UserRole;
  screen: ScreenType;
  onSelectRole: (r: UserRole) => void;
  onSelectScreen: (s: ScreenType) => void;
  onLogout: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const roleList: { id: UserRole; label: string; icon: string }[] = [
    { id: "patient", label: "Patient", icon: "👤" },
    { id: "doctor", label: "Doctor", icon: "🩺" },
    { id: "hospital", label: "Hospital", icon: "🏥" },
    { id: "pharmacy", label: "Pharmacy", icon: "💊" },
    { id: "lab", label: "Laboratory", icon: "🔬" },
    { id: "admin", label: "Admin", icon: "🛡️" },
  ];

  if (collapsed) {
    return (
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 16,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "#0f1f3d",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: 20,
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          fontSize: 12,
          fontWeight: 600,
          border: "1px solid rgba(255,255,255,0.15)",
          cursor: "pointer",
        }}
        onClick={() => setCollapsed(false)}
        title="Click to expand MediKiosk Role & Navigation Bar"
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0d7a6e" }} />
        <span>Role: {DEMO_ROLES[role].title}</span>
        <span style={{ opacity: 0.6, fontSize: 10 }}>({screen})</span>
        <span style={{ fontSize: 11, background: "rgba(255,255,255,0.15)", padding: "1px 6px", borderRadius: 10 }}>▼ Navigator</span>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0f1f3d",
        color: "#fff",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        padding: "6px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        fontSize: 12,
        zIndex: 9999,
        position: "sticky",
        top: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Brand & Active Role */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 22,
              height: 22,
              background: "#0d7a6e",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            MK
          </div>
          <span style={{ fontWeight: 700, letterSpacing: "-0.01em", color: "#fff" }}>
            MediKiosk
          </span>
          <span
            style={{
              fontSize: 9,
              background: "rgba(13,122,110,0.35)",
              color: "#5dd6c8",
              padding: "1px 6px",
              borderRadius: 4,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            ROLE NAVIGATOR
          </span>
        </div>
      </div>

      {/* Role Switcher Tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginRight: 2 }}>Role:</span>
        {roleList.map((r) => {
          const isActive = role === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onSelectRole(r.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 9px",
                borderRadius: 6,
                border: isActive ? "1px solid #5dd6c8" : "1px solid rgba(255,255,255,0.1)",
                background: isActive ? "#0d7a6e" : "rgba(255,255,255,0.06)",
                color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.12s",
                whiteSpace: "nowrap",
              }}
            >
              <span>{r.icon}</span>
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Screen Selector (All 26 screens) & Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Screen:</span>
          <select
            value={screen}
            onChange={(e) => onSelectScreen(e.target.value as ScreenType)}
            style={{
              background: "#162746",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 11,
              fontWeight: 500,
              outline: "none",
              cursor: "pointer",
              maxWidth: 190,
            }}
          >
            <optgroup label="Patient Portal & Clinical Intake">
              <option value="dashboard">Patient Dashboard</option>
              <option value="consent">Consent Flow (ABHA)</option>
              <option value="checkin">Check-In Kiosk</option>
              <option value="intake">Clinical Intake</option>
              <option value="summary">Clinical Summary</option>
              <option value="appt-booking">Book Appointment</option>
              <option value="timeline">Health Timeline</option>
              <option value="lab">Lab Diagnostics</option>
              <option value="pharmacy">Pharmacy Store</option>
              <option value="pharmacy-checkout">Pharmacy Checkout</option>
              <option value="order-tracking">Order Tracking</option>
            </optgroup>
            <optgroup label="Doctor Workspace">
              <option value="doctor">Doctor Dashboard (Queue)</option>
              <option value="consult">Consultation Room (Video)</option>
              <option value="record">Patient EHR Record</option>
              <option value="prescription">Create Prescription</option>
              <option value="doctor-profile">Doctor Profile</option>
              <option value="doctor-reg">Register Doctor</option>
              <option value="doctor-approval">Doctor Approval</option>
            </optgroup>
            <optgroup label="Hospital Management">
              <option value="hospital-dash">Hospital Dashboard</option>
              <option value="hospital-reg">Register Hospital</option>
              <option value="hospital-verify">Verify Hospital</option>
            </optgroup>
            <optgroup label="Pharmacy Workspace">
              <option value="pharmacy-dash">Pharmacy Dashboard</option>
            </optgroup>
            <optgroup label="Laboratory Workspace">
              <option value="lab-dash">Lab Dashboard</option>
            </optgroup>
            <optgroup label="Administration & Auth">
              <option value="admin">Admin Console</option>
              <option value="login">Login (Role Selector)</option>
              <option value="register">Register Account</option>
            </optgroup>
          </select>
        </div>

        {/* Switch / Sign Out */}
        <button
          type="button"
          onClick={onLogout}
          style={{
            padding: "4px 9px",
            background: "rgba(239,68,68,0.15)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 6,
            color: "#fca5a5",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          title="Return to Login Screen with Role Selector"
        >
          Logout
        </button>

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.45)",
            fontSize: 12,
            cursor: "pointer",
            padding: "2px 4px",
          }}
          title="Minimize top navigation bar"
        >
          ▲
        </button>
      </div>
    </div>
  );
}

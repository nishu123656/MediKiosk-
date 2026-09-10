import React from "react";
import { UserRole } from "../types";
import { DEMO_CREDENTIALS } from "../context/AuthContext";

interface AccountTypeSelectProps {
  onSelectRole: (role: UserRole) => void;
  onSelectRegister: (role: UserRole) => void;
  onQuickDemoLogin?: (role: UserRole) => void;
}

interface RoleCardConfig {
  role: UserRole;
  title: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  iconBg: string;
  iconColor: string;
  description: string;
  highlights: string[];
  canRegister: boolean;
  registerLabel?: string;
  svgIcon: React.ReactNode;
}

const ROLE_CARDS: RoleCardConfig[] = [
  {
    role: "patient",
    title: "Patient",
    badge: "ABHA Connected",
    badgeBg: "rgba(13,122,110,0.1)",
    badgeColor: "#0d7a6e",
    iconBg: "#f0fdf9",
    iconColor: "#0d7a6e",
    description: "Access your personal health records, OPD health check-in, appointments and digital prescriptions.",
    highlights: ["Mobile OTP / ABHA login", "Smart OPD Check-in", "Digital Prescriptions & Meds"],
    canRegister: true,
    registerLabel: "Create Patient Account",
    svgIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    role: "doctor",
    title: "Doctor",
    badge: "MCI / NMC Verified",
    badgeBg: "rgba(29,78,216,0.1)",
    badgeColor: "#1d4ed8",
    iconBg: "#eff6ff",
    iconColor: "#1d4ed8",
    description: "Clinical workbench, OPD patient queue, digital smart prescriptions and teleconsultations.",
    highlights: ["Patient Queue & Triage", "E-Prescriptions & Rx Signing", "AI Clinical Copilot"],
    canRegister: true,
    registerLabel: "Doctor Registration",
    svgIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  },
  {
    role: "hospital",
    title: "Hospital",
    badge: "NABH / State Reg",
    badgeBg: "rgba(109,40,217,0.1)",
    badgeColor: "#6d28d9",
    iconBg: "#f5f3ff",
    iconColor: "#6d28d9",
    description: "Multi-department administration, doctor credentialing, bed allocations and healthcare analytics.",
    highlights: ["Departments & Staff Roster", "Doctor Credentialing", "Admissions & Clinical Analytics"],
    canRegister: true,
    registerLabel: "Register Hospital Facility",
    svgIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
        <line x1="10" y1="9" x2="14" y2="9" />
        <line x1="12" y1="7" x2="12" y2="11" />
      </svg>
    ),
  },
  {
    role: "pharmacy",
    title: "Pharmacy",
    badge: "FDA Drug License",
    badgeBg: "rgba(5,150,105,0.1)",
    badgeColor: "#059669",
    iconBg: "#ecfdf5",
    iconColor: "#059669",
    description: "Digital prescription verification, drug inventory control, dispensing orders and doorstep delivery.",
    highlights: ["E-Prescription Verification", "Stock & Batch Inventory", "Dispensing & Tracking"],
    canRegister: true,
    registerLabel: "Register Pharmacy",
    svgIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
  },
  {
    role: "lab",
    title: "Laboratory",
    badge: "NABL ISO 15189",
    badgeBg: "rgba(217,119,6,0.1)",
    badgeColor: "#d97706",
    iconBg: "#fffbeb",
    iconColor: "#d97706",
    description: "Diagnostic test orders, barcode sample tracking, lab test catalogue and automated lab reports.",
    highlights: ["Test Orders & Phlebotomy", "Diagnostic Test Catalogue", "Verified Lab Reports"],
    canRegister: true,
    registerLabel: "Register Diagnostic Lab",
    svgIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
        <path d="M5.52 16h12.96" />
      </svg>
    ),
  },
  {
    role: "admin",
    title: "Admin",
    badge: "National Authority",
    badgeBg: "rgba(15,31,61,0.1)",
    badgeColor: "#0f1f3d",
    iconBg: "#f1f5f9",
    iconColor: "#0f1f3d",
    description: "Central platform governance, healthcare provider verifications, ABDM compliance and audit logs.",
    highlights: ["Provider Verification Queue", "ABDM Ecosystem Audits", "System Telemetry & Health"],
    canRegister: false,
    registerLabel: "Internal Personnel Only",
    svgIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export default function AccountTypeSelect({
  onSelectRole,
  onSelectRegister,
  onQuickDemoLogin,
}: AccountTypeSelectProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Top Header ── */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e8ecf0",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#0d7a6e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0f1f3d", letterSpacing: "-0.01em" }}>
              MediKiosk
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              National Connected Healthcare Platform
            </div>
          </div>
        </div>

        {/* Demo Environment Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              background: "rgba(13,122,110,0.08)",
              border: "1px solid rgba(13,122,110,0.25)",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 600,
              color: "#0d7a6e",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#0d7a6e",
                display: "inline-block",
              }}
            />
            Demo Environment · SIH 2026
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "44px 24px 60px",
          maxWidth: 1240,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Title Header */}
        <div style={{ textAlign: "center", marginBottom: 36, maxWidth: 640 }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0d7a6e",
              background: "rgba(13,122,110,0.08)",
              padding: "4px 12px",
              borderRadius: 20,
              marginBottom: 10,
            }}
          >
            Unified Healthcare Authentication
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#0f1f3d",
              margin: "0 0 10px",
              letterSpacing: "-0.03em",
            }}
          >
            Welcome to MediKiosk
          </h1>
          <p style={{ fontSize: 16, color: "#64748b", margin: 0, lineHeight: 1.6 }}>
            Select your account type to continue to your dedicated portal and role-based workspace.
          </p>
        </div>

        {/* ── 6 Roles Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 20,
            width: "100%",
            marginBottom: 36,
          }}
        >
          {ROLE_CARDS.map((c) => {
            const demo = DEMO_CREDENTIALS[c.role];
            return (
              <div
                key={c.role}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8ecf0",
                  borderRadius: 14,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 10px rgba(15,31,61,0.03)",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                <div>
                  {/* Top card row: Icon + Title + Badge */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: c.iconBg,
                          color: c.iconColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {c.svgIcon}
                      </div>
                      <div>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f1f3d", margin: 0 }}>
                          {c.title}
                        </h2>
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            padding: "2px 8px",
                            borderRadius: 4,
                            background: c.badgeBg,
                            color: c.badgeColor,
                            marginTop: 3,
                          }}
                        >
                          {c.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px", lineHeight: 1.55, minHeight: 40 }}>
                    {c.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                    {c.highlights.map((h) => (
                      <div key={h} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#334155" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d7a6e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom card actions */}
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                  <button
                    onClick={() => onSelectRole(c.role)}
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      background: "#0d7a6e",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      marginBottom: 10,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#095f55")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#0d7a6e")}
                  >
                    <span>Login as {c.title}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11 }}>
                    {c.canRegister ? (
                      <button
                        onClick={() => onSelectRegister(c.role)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#0d7a6e",
                          fontWeight: 600,
                          cursor: "pointer",
                          padding: 0,
                          fontSize: 11,
                          textDecoration: "underline",
                        }}
                      >
                        {c.registerLabel}
                      </button>
                    ) : (
                      <span style={{ color: "#94a3b8", fontWeight: 500, fontSize: 11 }}>
                        {c.registerLabel}
                      </span>
                    )}

                    {onQuickDemoLogin && (
                      <button
                        onClick={() => onQuickDemoLogin(c.role)}
                        title={`Quick test demo login (${demo.identifier})`}
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: 4,
                          padding: "2px 8px",
                          fontSize: 10,
                          color: "#475569",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Demo Fast-Track
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Demo Testing Credentials Drawer ── */}
        <div
          style={{
            width: "100%",
            background: "#ffffff",
            border: "1px solid #e8ecf0",
            borderRadius: 12,
            padding: "18px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(13,122,110,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0d7a6e",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f1f3d" }}>
                Pre-configured Demo Accounts (Click to test)
              </span>
            </div>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>
              Demo environment credentials · Simulated local verification
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 10,
            }}
          >
            {(Object.keys(DEMO_CREDENTIALS) as UserRole[]).map((r) => {
              const cred = DEMO_CREDENTIALS[r];
              return (
                <div
                  key={r}
                  onClick={() => onSelectRole(r)}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e8ecf0",
                    borderRadius: 8,
                    padding: "8px 12px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0d7a6e";
                    e.currentTarget.style.background = "#f0fdf9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e8ecf0";
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0f1f3d" }}>{cred.title}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#0d7a6e" }}>TEST</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, fontFamily: "monospace" }}>
                    {cred.identifier}
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>
                    {r === "patient" ? "OTP: " : "Pass: "}
                    <span style={{ fontFamily: "monospace", color: "#475569" }}>{cred.passwordOrOtp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

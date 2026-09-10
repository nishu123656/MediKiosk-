import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface LabLoginProps {
  onSuccess: () => void;
  onRegister: () => void;
  onBack: () => void;
}

export default function LabLogin({ onSuccess, onRegister, onBack }: LabLoginProps) {
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("lab@medikiosk.demo");
  const [password, setPassword] = useState("Lab@123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg("Please enter both Laboratory ID / Registered Email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login("lab", {
        email: identifier,
        name: "Thyrocare Central Diagnostics",
        regNumber: "NABL-MC-2019-4410 (ISO 15189)",
        department: "Pathology & Molecular Diagnostics",
        organization: "Thyrocare Diagnostics Network",
        verified: true,
      });
      onSuccess();
    }, 400);
  }

  function handleForgot() {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 4000);
  }

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
      {/* Header */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e8ecf0",
          padding: "0 32px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            color: "#64748b",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Account Types
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, color: "#64748b" }}>New diagnostic centre?</span>
          <button
            onClick={onRegister}
            style={{
              color: "#d97706",
              fontWeight: 600,
              fontSize: 13,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Register Laboratory
          </button>
        </div>
      </header>

      {/* Main Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "36px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            background: "#ffffff",
            border: "1px solid #e8ecf0",
            borderRadius: 16,
            padding: "36px 36px 32px",
            boxShadow: "0 4px 20px rgba(15,31,61,0.05)",
          }}
        >
          {/* Header Icon & Title */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "#fffbeb",
                color: "#d97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
                border: "1.5px solid #fde68a",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 2v7.31M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
                <path d="M5.52 16h12.96" />
              </svg>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 4,
                background: "rgba(217,119,6,0.1)",
                color: "#d97706",
                marginBottom: 6,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97706" }} />
              Diagnostic Laboratory Portal
            </div>

            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f1f3d", margin: "0 0 6px" }}>
              Laboratory Sign In
            </h1>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
              Process test orders, sample tracking, test catalogue and digital reports
            </p>
          </div>

          {/* Verification Status Card */}
          <div
            style={{
              padding: "10px 14px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 8,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#166534" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Verified Lab:</strong> Accreditation <strong>NABL-MC-2019-4410</strong>
              </span>
            </div>
            <span style={{ fontSize: 10, background: "#dcfce7", color: "#15803d", fontWeight: 700, padding: "1px 6px", borderRadius: 4 }}>
              ISO 15189
            </span>
          </div>

          {/* Forgot Message */}
          {forgotSent && (
            <div
              style={{
                padding: "8px 12px",
                background: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: 7,
                fontSize: 12,
                color: "#d97706",
                marginBottom: 16,
              }}
            >
              Password recovery link sent to registered laboratory director email.
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                padding: "8px 12px",
                background: "#fff5f5",
                border: "1px solid #fecaca",
                borderRadius: 7,
                fontSize: 12,
                color: "#e84b4b",
                marginBottom: 16,
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0f1f3d", marginBottom: 6 }}>
                Laboratory ID / Registered Email
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="lab@medikiosk.demo or LAB-MH-4410"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #e8ecf0",
                  borderRadius: 8,
                  fontSize: 13,
                  outline: "none",
                  color: "#0f1f3d",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#0f1f3d" }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgot}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#d97706",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter laboratory portal password"
                  style={{
                    width: "100%",
                    padding: "10px 40px 10px 14px",
                    border: "1px solid #e8ecf0",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                    color: "#0f1f3d",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="9" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: "#d97706",
                color: "#ffffff",
                border: "none",
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Authenticating Diagnostic Centre..." : "Sign In to Laboratory Portal"}
            </button>
          </form>

          {/* Registration link */}
          <div style={{ marginTop: 24, textAlign: "center", borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
            <span style={{ fontSize: 12, color: "#64748b" }}>New diagnostic centre or pathology lab? </span>
            <button
              onClick={onRegister}
              style={{
                background: "none",
                border: "none",
                color: "#d97706",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Register Laboratory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

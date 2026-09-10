import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface AdminLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onSuccess, onBack }: AdminLoginProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@medikiosk.demo");
  const [password, setPassword] = useState("Admin@123");
  const [twoFactorCode, setTwoFactorCode] = useState("842019");
  const [require2FA, setRequire2FA] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePrimarySubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both admin official email and security key/password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Advance to 2FA step
      setRequire2FA(true);
    }, 350);
  }

  function handleTwoFactorSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!twoFactorCode.trim() || twoFactorCode.length < 6) {
      setErrorMsg("Please enter the 6-digit administrative 2FA security token.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login("admin", {
        email,
        name: "National Health Authority Admin",
        regNumber: "ABDM-SYS-SUPERADMIN",
        department: "Platform Governance & Ecosystem Audits",
        organization: "Ministry of Health & Family Welfare",
        verified: true,
      });
      onSuccess();
    }, 400);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        color: "#f8fafc",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "rgba(15,23,42,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
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
            color: "rgba(255,255,255,0.7)",
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

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              background: "rgba(239,68,68,0.2)",
              color: "#f87171",
              border: "1px solid rgba(239,68,68,0.4)",
              padding: "2px 8px",
              borderRadius: 4,
              letterSpacing: "0.06em",
            }}
          >
            RESTRICTED ACCESS
          </span>
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
            background: "#1e293b",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "36px 36px 32px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Header Icon & Title */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "rgba(13,122,110,0.15)",
                color: "#5dd6c8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
                border: "1.5px solid rgba(13,122,110,0.4)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 4,
                background: "rgba(13,122,110,0.2)",
                color: "#5dd6c8",
                marginBottom: 6,
              }}
            >
              National Health Authority · ABDM
            </div>

            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", margin: "0 0 6px" }}>
              Platform Administrator Login
            </h1>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
              National healthcare governance, facility verification and security audits
            </p>
          </div>

          {/* Security Banner */}
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(15,23,42,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              marginBottom: 20,
              fontSize: 11,
              color: "#cbd5e1",
              lineHeight: 1.5,
            }}
          >
            <strong>Security Notice:</strong> Authorized government and platform administration personnel only. All access attempts and administrative sessions are audited.
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                padding: "8px 12px",
                background: "rgba(239,68,68,0.2)",
                border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: 7,
                fontSize: 12,
                color: "#fca5a5",
                marginBottom: 16,
              }}
            >
              {errorMsg}
            </div>
          )}

          {!require2FA ? (
            /* Step 1: Admin Credentials */
            <form onSubmit={handlePrimarySubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>
                  Administrative Email ID
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@medikiosk.demo"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                    background: "rgba(15,23,42,0.6)",
                    color: "#ffffff",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>
                  Master Security Key / Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    style={{
                      width: "100%",
                      padding: "10px 40px 10px 14px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 8,
                      fontSize: 13,
                      outline: "none",
                      background: "rgba(15,23,42,0.6)",
                      color: "#ffffff",
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
                  background: "#0d7a6e",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Verifying Credentials..." : "Proceed to 2FA Security Token"}
              </button>
            </form>
          ) : (
            /* Step 2: 2FA Verification */
            <form onSubmit={handleTwoFactorSubmit}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>
                    2FA Security Token / OTP
                  </label>
                  <span style={{ fontSize: 11, color: "#5dd6c8" }}>Demo: 842019</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Enter 6-digit 2FA code"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1.5px solid #0d7a6e",
                    borderRadius: 8,
                    fontSize: 16,
                    letterSpacing: "0.2em",
                    textAlign: "center",
                    outline: "none",
                    background: "rgba(15,23,42,0.6)",
                    color: "#ffffff",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#0d7a6e",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  marginBottom: 10,
                }}
              >
                {loading ? "Authorizing Admin Session..." : "Authorize Admin Dashboard"}
              </button>

              <button
                type="button"
                onClick={() => setRequire2FA(false)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "transparent",
                  color: "#94a3b8",
                  border: "none",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Back to credentials
              </button>
            </form>
          )}

          {/* Registration Notice */}
          <div style={{ marginTop: 24, textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
            <span style={{ fontSize: 11, color: "#64748b" }}>
              Public registration is disabled. Administrator accounts are pre-provisioned.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

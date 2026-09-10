import React, { useState, useEffect, useRef } from "react";
import { useAuth, DEMO_CREDENTIALS } from "../context/AuthContext";

interface PatientLoginProps {
  onSuccess: () => void;
  onRegister: () => void;
  onBack: () => void;
}

export default function PatientLogin({ onSuccess, onRegister, onBack }: PatientLoginProps) {
  const { login } = useAuth();

  const [tab, setTab] = useState<"mobile" | "abha">("mobile");

  // Mobile state
  const [mobile, setMobile] = useState("9999999999");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["1", "2", "3", "4", "5", "6"]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // ABHA state
  const [abhaInput, setAbhaInput] = useState("91-4820-1934-8821");

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // OTP countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpSent, timer]);

  function handleSendOtp() {
    setErrorMsg("");
    const cleaned = mobile.replace(/\s+/g, "");
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number (e.g. 9999999999)");
      return;
    }
    setOtpSent(true);
    setTimer(30);
    setCanResend(false);
    // Pre-fill demo OTP for convenience
    setOtpDigits(["1", "2", "3", "4", "5", "6"]);
  }

  function handleOtpChange(index: number, val: string) {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = val.slice(-1);
    setOtpDigits(newDigits);
    setErrorMsg("");

    if (val && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  function handleVerifyMobile() {
    const fullOtp = otpDigits.join("");
    if (fullOtp.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // In demo mode, accept 123456 or any 6 digits
      login("patient", {
        mobile,
        name: "Rahul Sharma",
        abhaId: "91-4820-1934-8821",
        verified: true,
      });
      onSuccess();
    }, 400);
  }

  function handleVerifyAbha() {
    setErrorMsg("");
    const trimmed = abhaInput.trim();
    if (!trimmed || trimmed.length < 5) {
      setErrorMsg("Please enter a valid ABHA Number (14 digits) or ABHA Address (e.g. rahul@abdm)");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      login("patient", {
        abhaId: trimmed,
        name: "Rahul Sharma",
        mobile: "9999999999",
        verified: true,
      });
      onSuccess();
    }, 400);
  }

  function handleQuickFillDemo() {
    setTab("mobile");
    setMobile("9999999999");
    setOtpSent(true);
    setOtpDigits(["1", "2", "3", "4", "5", "6"]);
    setErrorMsg("");
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
      {/* Top Header */}
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
          <span style={{ fontSize: 13, color: "#64748b" }}>New patient?</span>
          <button
            onClick={onRegister}
            style={{
              color: "#0d7a6e",
              fontWeight: 600,
              fontSize: 13,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </div>
      </header>

      {/* Main Content Area */}
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
          {/* Role Header */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "#f0fdf9",
                color: "#0d7a6e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
                border: "1.5px solid #b2e8e0",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <div
              style={{
                display: "inline-block",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 4,
                background: "rgba(13,122,110,0.1)",
                color: "#0d7a6e",
                marginBottom: 6,
              }}
            >
              Patient Portal
            </div>

            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f1f3d", margin: "0 0 6px" }}>
              Sign In to MediKiosk
            </h1>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
              Access personal health records, OPD queue and prescriptions
            </p>
          </div>

          {/* Demo Mode Notice */}
          <div
            style={{
              padding: "10px 14px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 8,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#92400e" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Demo Mode: Simulated OTP verification active</span>
            </div>
            <button
              onClick={handleQuickFillDemo}
              style={{
                background: "#fef3c7",
                border: "1px solid #d97706",
                borderRadius: 4,
                padding: "2px 6px",
                fontSize: 10,
                fontWeight: 700,
                color: "#92400e",
                cursor: "pointer",
              }}
            >
              Fill Demo
            </button>
          </div>

          {/* Method Tabs: Mobile vs ABHA */}
          <div
            style={{
              display: "flex",
              background: "#f1f5f9",
              padding: 4,
              borderRadius: 8,
              marginBottom: 22,
            }}
          >
            <button
              onClick={() => {
                setTab("mobile");
                setErrorMsg("");
              }}
              style={{
                flex: 1,
                padding: "8px",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                background: tab === "mobile" ? "#ffffff" : "transparent",
                color: tab === "mobile" ? "#0f1f3d" : "#64748b",
                boxShadow: tab === "mobile" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s",
              }}
            >
              Mobile Number
            </button>
            <button
              onClick={() => {
                setTab("abha");
                setErrorMsg("");
              }}
              style={{
                flex: 1,
                padding: "8px",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                background: tab === "abha" ? "#ffffff" : "transparent",
                color: tab === "abha" ? "#0f1f3d" : "#64748b",
                boxShadow: tab === "abha" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s",
              }}
            >
              ABHA ID / Address
            </button>
          </div>

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

          {/* Tab 1: Mobile OTP Form */}
          {tab === "mobile" && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0f1f3d", marginBottom: 6 }}>
                  Registered Mobile Number
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div
                    style={{
                      padding: "10px 12px",
                      background: "#f8fafc",
                      border: "1px solid #e8ecf0",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="10-digit mobile number"
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      border: "1px solid #e8ecf0",
                      borderRadius: 8,
                      fontSize: 13,
                      outline: "none",
                      color: "#0f1f3d",
                    }}
                  />
                  <button
                    onClick={handleSendOtp}
                    style={{
                      padding: "10px 16px",
                      background: otpSent ? "#f1f5f9" : "#0d7a6e",
                      color: otpSent ? "#0d7a6e" : "#ffffff",
                      border: otpSent ? "1px solid #b2e8e0" : "none",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {otpSent ? "Resend" : "Send OTP"}
                  </button>
                </div>
              </div>

              {/* 6-Digit OTP Section */}
              {otpSent && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#0f1f3d" }}>
                      Enter 6-Digit OTP
                    </label>
                    <span style={{ fontSize: 11, color: "#64748b" }}>
                      {timer > 0 ? `Resend in ${timer}s` : "Didn't receive OTP?"}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginBottom: 8 }}>
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={inputRefs[idx]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        style={{
                          width: 44,
                          height: 48,
                          textAlign: "center",
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#0f1f3d",
                          border: "1.5px solid #0d7a6e",
                          borderRadius: 8,
                          background: "#ffffff",
                          outline: "none",
                        }}
                      />
                    ))}
                  </div>

                  {canResend && (
                    <div style={{ textAlign: "right" }}>
                      <button
                        onClick={handleSendOtp}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#0d7a6e",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleVerifyMobile}
                disabled={isVerifying}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#0d7a6e",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isVerifying ? "not-allowed" : "pointer",
                  marginTop: 8,
                }}
              >
                {isVerifying ? "Verifying..." : "Verify & Continue to Dashboard"}
              </button>
            </div>
          )}

          {/* Tab 2: ABHA Form */}
          {tab === "abha" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0f1f3d", marginBottom: 6 }}>
                  ABHA Number or ABHA Address
                </label>
                <input
                  type="text"
                  value={abhaInput}
                  onChange={(e) => {
                    setAbhaInput(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="e.g. 91-4820-1934-8821 or rahul@abdm"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid #e8ecf0",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                    color: "#0f1f3d",
                    boxSizing: "border-box",
                  }}
                />
                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
                  Your 14-digit Ayushman Bharat Health Account number or mapped ABDM handle.
                </p>
              </div>

              <button
                onClick={handleVerifyAbha}
                disabled={isVerifying}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#0d7a6e",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isVerifying ? "not-allowed" : "pointer",
                }}
              >
                {isVerifying ? "Connecting ABDM..." : "Verify ABHA & Continue"}
              </button>
            </div>
          )}

          {/* Registration Footnote */}
          <div style={{ marginTop: 24, textAlign: "center", borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
            <span style={{ fontSize: 12, color: "#64748b" }}>Don't have a patient account? </span>
            <button
              onClick={onRegister}
              style={{
                background: "none",
                border: "none",
                color: "#0d7a6e",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Register as New Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

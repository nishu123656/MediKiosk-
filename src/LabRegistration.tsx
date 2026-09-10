import React, { useState } from "react";

interface LabRegistrationProps {
  onSignIn?: () => void;
  onBack?: () => void;
  onSuccess?: () => void;
  onComplete?: () => void;
}

const T = {
  primary: "#d97706",
  primaryLight: "#fffbeb",
  primaryBorder: "#fde68a",
  primaryDark: "#b45309",
  navy: "#0f1f3d",
  gray: "#64748b",
  grayLight: "#94a3b8",
  bg: "#f5f7fa",
  white: "#ffffff",
  border: "#e8ecf0",
  success: "#16a34a",
  successLight: "#f0fdf4",
};

export default function LabRegistration({ onSignIn, onBack, onSuccess, onComplete }: LabRegistrationProps) {
  const handleBack = onBack || onSignIn || (() => {});
  const handleDone = onComplete || onSuccess || onSignIn || (() => {});
  const [step, setStep] = useState(0);

  // Lab details
  const [labName, setLabName] = useState("");
  const [nablNumber, setNablNumber] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [directorRegNo, setDirectorRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Specialities
  const [specialities, setSpecialities] = useState<string[]>([
    "Clinical Biochemistry",
    "Hematology & Pathology",
  ]);

  // Address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");

  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = ["Diagnostic Centre", "Specialities", "Location", "Review"];

  const ALL_SPECS = [
    "Clinical Biochemistry",
    "Hematology & Pathology",
    "Microbiology & Serology",
    "Molecular Diagnostics & PCR",
    "Histopathology & Cytology",
    "Digital X-Ray & Ultrasound",
    "CT & MRI Imaging",
    "Genomic Sequencing",
  ];

  function toggleSpec(s: string) {
    if (specialities.includes(s)) {
      setSpecialities(specialities.filter((x) => x !== s));
    } else {
      setSpecialities([...specialities, s]);
    }
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: T.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          padding: 24,
        }}
      >
        <div
          style={{
            maxWidth: 480,
            width: "100%",
            background: T.white,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: "40px 32px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: T.primaryLight,
              border: `2px solid ${T.primaryBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: T.primary,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "2px 8px",
              borderRadius: 4,
              background: T.primaryLight,
              color: T.primary,
            }}
          >
            Registration Submitted
          </span>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: T.navy, margin: "12px 0 8px" }}>
            Diagnostic Lab Enrolled
          </h2>

          <p style={{ fontSize: 13, color: T.gray, lineHeight: 1.6, margin: "0 0 24px" }}>
            Thank you for enrolling <strong>{labName || "your diagnostic laboratory"}</strong>. Your application with NABL
            Accreditation <strong>{nablNumber || "NABL-PENDING"}</strong> has been routed for ABDM Registry verification.
          </p>

          <div
            style={{
              background: "#f8fafc",
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              padding: "14px 18px",
              textAlign: "left",
              marginBottom: 24,
              fontSize: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: T.gray }}>Application ID:</span>
              <span style={{ fontWeight: 700, color: T.navy, fontFamily: "monospace" }}>LAB-APP-2026-4410</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: T.gray }}>Accreditation:</span>
              <span style={{ fontWeight: 700, color: T.primary }}>NABL ISO 15189 Verified</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: T.gray }}>Director:</span>
              <span style={{ fontWeight: 600, color: T.navy }}>{directorName || "Pathologist Director"}</span>
            </div>
          </div>

          <button
            onClick={handleDone}
            style={{
              width: "100%",
              padding: "12px",
              background: T.primary,
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Proceed to Laboratory Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: T.white,
          borderBottom: `1px solid ${T.border}`,
          padding: "0 32px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={handleBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              padding: "5px 10px",
              color: T.navy,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              marginRight: 6,
            }}
          >
            ← Back
          </button>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: T.primary,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 2v7.31M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
              <path d="M5.52 16h12.96" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>MediKiosk Diagnostic Centre Enrolment</div>
            <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 600 }}>NABL ACCREDITED LAB ONBOARDING</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.gray }}>
          Already registered?
          <button
            onClick={handleBack}
            style={{
              color: T.primary,
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "40px 24px 60px" }}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: T.navy, margin: "0 0 6px" }}>
              Register Diagnostic Laboratory
            </h1>
            <p style={{ fontSize: 13, color: T.gray, margin: 0 }}>
              Onboard your diagnostic facility to receive digital test orders and publish ABDM health records.
            </p>
          </div>

          {/* Stepper */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
            {steps.map((label, idx) => {
              const isDone = idx < step;
              const isActive = idx === step;
              const isLast = idx === steps.length - 1;
              return (
                <React.Fragment key={label}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: isDone ? T.primary : isActive ? T.navy : T.white,
                        border: `2px solid ${isDone ? T.primary : isActive ? T.navy : T.border}`,
                        color: isDone || isActive ? "#ffffff" : T.grayLight,
                        fontSize: 11,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isDone ? "✓" : idx + 1}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: isActive || isDone ? 700 : 500,
                        color: isActive ? T.navy : isDone ? T.primary : T.grayLight,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background: isDone ? T.primary : T.border,
                        margin: "0 8px 16px",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Card */}
          <div
            style={{
              background: T.white,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              padding: "28px 32px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            }}
          >
            {/* Step 0: Lab Details */}
            {step === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                    Diagnostic Laboratory Name *
                  </label>
                  <input
                    type="text"
                    value={labName}
                    onChange={(e) => setLabName(e.target.value)}
                    placeholder="e.g. Thyrocare Central Reference Lab"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: `1px solid ${T.border}`,
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                    NABL Certificate / Accreditation No (ISO 15189) *
                  </label>
                  <input
                    type="text"
                    value={nablNumber}
                    onChange={(e) => setNablNumber(e.target.value)}
                    placeholder="e.g. NABL-MC-2019-4410"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: `1px solid ${T.border}`,
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                      Laboratory Director / Pathologist *
                    </label>
                    <input
                      type="text"
                      value={directorName}
                      onChange={(e) => setDirectorName(e.target.value)}
                      placeholder="e.g. Dr. Sudhir Joshi, MD"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                      MCI / State Medical Reg No *
                    </label>
                    <input
                      type="text"
                      value={directorRegNo}
                      onChange={(e) => setDirectorRegNo(e.target.value)}
                      placeholder="e.g. MCI-2012-7718"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                      Official Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="lab@example.com"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                      Contact Mobile *
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit mobile"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Specialities */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>
                  Select Diagnostic Test Disciplines *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {ALL_SPECS.map((s) => {
                    const isSelected = specialities.includes(s);
                    return (
                      <div
                        key={s}
                        onClick={() => toggleSpec(s)}
                        style={{
                          padding: "12px 14px",
                          borderRadius: 8,
                          border: `1.5px solid ${isSelected ? T.primary : T.border}`,
                          background: isSelected ? T.primaryLight : T.white,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontSize: 12,
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? T.primaryDark : T.navy,
                          transition: "all 0.15s",
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            border: `1px solid ${isSelected ? T.primary : T.border}`,
                            background: isSelected ? T.primary : T.white,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: 10,
                            flexShrink: 0,
                          }}
                        >
                          {isSelected && "✓"}
                        </div>
                        <span>{s}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                    Laboratory Street Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Floor, Diagnostic Wing, Building, Road"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: `1px solid ${T.border}`,
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                      State *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="6 digits"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", marginTop: 6 }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ marginTop: 2 }}
                  />
                  <span style={{ fontSize: 12, color: T.gray, lineHeight: 1.5 }}>
                    I confirm that this laboratory maintains NABL accreditation standards, calibrated analyzers, and qualified pathologists for diagnostic report sign-offs.
                  </span>
                </label>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>
                  Review Diagnostic Enrolment Application
                </div>

                <div
                  style={{
                    background: "#f8fafc",
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    padding: "16px",
                    fontSize: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>Laboratory Name:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{labName || "Thyrocare Central Diagnostics"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>NABL Reg:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{nablNumber || "NABL-MC-2019-4410"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>Director:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{directorName || "Dr. Sudhir Joshi"} ({directorRegNo || "MCI-2012-7718"})</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>Specialities:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{specialities.join(", ")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>Location:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{city || "Mumbai"}, {state || "Maharashtra"} - {pincode || "400076"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26, paddingTop: 18, borderTop: `1px solid ${T.border}` }}>
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  style={{
                    padding: "10px 18px",
                    background: "transparent",
                    color: T.navy,
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Previous
                </button>
              ) : <div />}

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  style={{
                    padding: "10px 22px",
                    background: T.primary,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    padding: "10px 24px",
                    background: T.primary,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Submit Enrolment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

interface PharmacyRegistrationProps {
  onSignIn?: () => void;
  onBack?: () => void;
  onSuccess?: () => void;
  onComplete?: () => void;
}

const T = {
  primary: "#059669",
  primaryLight: "#ecfdf5",
  primaryBorder: "#a7f3d0",
  primaryDark: "#047857",
  navy: "#0f1f3d",
  gray: "#64748b",
  grayLight: "#94a3b8",
  bg: "#f5f7fa",
  white: "#ffffff",
  border: "#e8ecf0",
  success: "#16a34a",
  successLight: "#f0fdf4",
  successBorder: "#bbf7d0",
  amber: "#d97706",
  amberLight: "#fffbeb",
  amberBorder: "#fde68a",
};

export default function PharmacyRegistration({ onSignIn, onBack, onSuccess, onComplete }: PharmacyRegistrationProps) {
  const handleBack = onBack || onSignIn || (() => {});
  const handleDone = onComplete || onSuccess || onSignIn || (() => {});
  const [step, setStep] = useState(0);

  // Pharmacy details
  const [pharmacyName, setPharmacyName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [pharmacistName, setPharmacistName] = useState("");
  const [pharmacistRegNo, setPharmacistRegNo] = useState("");
  const [dispensaryType, setDispensaryType] = useState("Retail Chemist");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");

  // Verification & Declaration
  const [gstin, setGstin] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = ["Pharmacy Details", "Location & Type", "Compliance", "Review"];

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
            Application Submitted
          </span>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: T.navy, margin: "12px 0 8px" }}>
            Pharmacy Registered
          </h2>

          <p style={{ fontSize: 13, color: T.gray, lineHeight: 1.6, margin: "0 0 24px" }}>
            Thank you for enrolling <strong>{pharmacyName || "your pharmacy"}</strong>. Your application with Drug License{" "}
            <strong>{licenseNumber || "DL-PENDING"}</strong> has been forwarded to the State Drug Control Administration for verification.
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
              <span style={{ fontWeight: 700, color: T.navy, fontFamily: "monospace" }}>PHARM-APP-2026-9924</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: T.gray }}>Status:</span>
              <span style={{ fontWeight: 700, color: T.amber }}>Pending State Drug Inspection</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: T.gray }}>Chief Pharmacist:</span>
              <span style={{ fontWeight: 600, color: T.navy }}>{pharmacistName || "Registered Pharmacist"}</span>
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
            Proceed to Pharmacy Sign In
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
              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
              <path d="m8.5 8.5 7 7" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>MediKiosk Pharmacy Enrolment</div>
            <div style={{ fontSize: 10, color: T.grayLight, fontWeight: 600 }}>FDA DRUG LICENSE REGISTRATION</div>
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
              Register Pharmacy Dispensary
            </h1>
            <p style={{ fontSize: 13, color: T.gray, margin: 0 }}>
              Join the national digital prescription network and dispense ABDM verified medications.
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
            {/* Step 0: Pharmacy Details */}
            {step === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                    Pharmacy / Chemist Trade Name *
                  </label>
                  <input
                    type="text"
                    value={pharmacyName}
                    onChange={(e) => setPharmacyName(e.target.value)}
                    placeholder="e.g. MedPlus Pharmacy & Wellness Centre"
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
                    FDA Drug License Number (Form 20 / 21) *
                  </label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="e.g. DL-MH-2021-9924"
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
                      Chief Pharmacist Name *
                    </label>
                    <input
                      type="text"
                      value={pharmacistName}
                      onChange={(e) => setPharmacistName(e.target.value)}
                      placeholder="e.g. Rajesh Patil"
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
                      Pharmacist Registration No *
                    </label>
                    <input
                      type="text"
                      value={pharmacistRegNo}
                      onChange={(e) => setPharmacistRegNo(e.target.value)}
                      placeholder="e.g. PR-MH-84192"
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="pharmacy@example.com"
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
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit mobile number"
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

            {/* Step 1: Location & Type */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                    Dispensary Category *
                  </label>
                  <select
                    value={dispensaryType}
                    onChange={(e) => setDispensaryType(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: `1px solid ${T.border}`,
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                      background: "#ffffff",
                    }}
                  >
                    <option value="Retail Chemist">Retail Chemist & Druggist</option>
                    <option value="Hospital Attached">Hospital-Attached Inpatient Pharmacy</option>
                    <option value="Jan Aushadhi Kendra">Pradhan Mantri Jan Aushadhi Kendra</option>
                    <option value="AYUSH Dispensary">AYUSH Herbal & Ayurvedic Dispensary</option>
                    <option value="Online / Doorstep Delivery">Licensed E-Pharmacy & Doorstep Delivery</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                    Premises Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Shop/Unit No, Commercial Complex, Street"
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
              </div>
            )}

            {/* Step 2: Compliance */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 6 }}>
                    GSTIN Identification Number
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="e.g. 27AABCU9603R1ZM"
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

                <div
                  style={{
                    padding: "14px",
                    background: T.primaryLight,
                    border: `1px solid ${T.primaryBorder}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: T.primaryDark,
                    lineHeight: 1.5,
                  }}
                >
                  <strong>Digital Prescription Standards:</strong> MediKiosk is integrated with ABDM FHIR R4 and the Central Drugs Standard Control Organisation (CDSCO). Scheduled drugs (H/H1/X) require mandatory digital batch verification.
                </div>

                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ marginTop: 2 }}
                  />
                  <span style={{ fontSize: 12, color: T.gray, lineHeight: 1.5 }}>
                    I certify that our dispensary operates with an active Drug License, a registered full-time pharmacist, and adheres to the Pharmacy Act, 1948.
                  </span>
                </label>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>
                  Review Registration Application
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
                    <span style={{ color: T.gray }}>Pharmacy Name:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{pharmacyName || "MedPlus Pharmacy"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>Drug License:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{licenseNumber || "DL-MH-2021-9924"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>Pharmacist:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{pharmacistName || "Rajesh Patil"} ({pharmacistRegNo || "PR-84192"})</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>Category:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{dispensaryType}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: T.gray }}>Location:</span>
                    <span style={{ fontWeight: 600, color: T.navy }}>{city || "Mumbai"}, {state || "Maharashtra"} - {pincode || "400001"}</span>
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

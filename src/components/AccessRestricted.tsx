import React from "react";
import { UserRole, DEMO_ROLES } from "../types";
import { useAuth } from "../context/AuthContext";

interface AccessRestrictedProps {
  targetRole?: UserRole;
  attemptedScreen?: string;
  onReturnDashboard: () => void;
  onLogout: () => void;
}

export default function AccessRestricted({
  targetRole,
  attemptedScreen,
  onReturnDashboard,
  onLogout,
}: AccessRestrictedProps) {
  const { currentUser, userRole } = useAuth();

  const currentRoleInfo = userRole ? DEMO_ROLES[userRole] : null;
  const targetRoleTitle = targetRole ? DEMO_ROLES[targetRole]?.title || targetRole : "Restricted Resource";

  return (
    <div
      style={{
        flex: 1,
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: "#f5f7fa",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: "#ffffff",
          border: "1.5px solid #e8ecf0",
          borderRadius: 16,
          padding: "36px 32px",
          boxShadow: "0 4px 24px rgba(15,31,61,0.06)",
          textAlign: "center",
        }}
      >
        {/* Security Shield Icon */}
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: "#fff5f5",
            border: "2px solid #fecaca",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "#e84b4b",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        {/* Badge */}
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: 12,
              background: "#fff1f2",
              color: "#e11d48",
              border: "1px solid #fecdd3",
            }}
          >
            Access Restricted · HTTP 403
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#0f1f3d",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          Unauthorized Role Access
        </h2>

        <p
          style={{
            fontSize: 14,
            color: "#64748b",
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}
        >
          You do not have permission to access the{" "}
          <strong style={{ color: "#0f1f3d" }}>{targetRoleTitle} workspace</strong>
          {attemptedScreen ? ` (${attemptedScreen})` : ""}. MediKiosk enforces strict role-based access control to safeguard patient health data and clinical governance.
        </p>

        {/* Current User Session Box */}
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e8ecf0",
            borderRadius: 10,
            padding: "14px 18px",
            textAlign: "left",
            marginBottom: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Active Signed-In Account
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f1f3d", marginTop: 2 }}>
              {currentUser?.name || "Authenticated User"}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 1 }}>
              Role: <span style={{ fontWeight: 600, color: "#0d7a6e" }}>{currentRoleInfo?.title || userRole}</span>
              {currentUser?.regNumber ? ` · ${currentUser.regNumber}` : ""}
            </div>
          </div>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              background: "rgba(13,122,110,0.1)",
              color: "#0d7a6e",
              fontSize: 11,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {currentRoleInfo?.badge || "Active"}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={onReturnDashboard}
            style={{
              width: "100%",
              padding: "12px 18px",
              background: "#0d7a6e",
              color: "#ffffff",
              border: "none",
              borderRadius: 9,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 2px 6px rgba(13,122,110,0.2)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return to {currentRoleInfo?.title || "My"} Dashboard
          </button>

          <button
            onClick={onLogout}
            style={{
              width: "100%",
              padding: "11px 18px",
              background: "#ffffff",
              color: "#64748b",
              border: "1px solid #e8ecf0",
              borderRadius: 9,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign In with a Different Account
          </button>
        </div>
      </div>
    </div>
  );
}

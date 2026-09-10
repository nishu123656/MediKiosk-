import { UserRole, DEMO_ROLES } from "../types";

interface TopRoleNavProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onLogout?: () => void;
}

export default function TopRoleNav({
  currentRole,
  onSelectRole,
  onLogout,
}: TopRoleNavProps) {
  const roles: { id: UserRole; label: string; icon: string }[] = [
    { id: "patient", label: "Patient", icon: "👤" },
    { id: "doctor", label: "Doctor", icon: "🩺" },
    { id: "hospital", label: "Hospital", icon: "🏥" },
    { id: "pharmacy", label: "Pharmacy", icon: "💊" },
    { id: "lab", label: "Laboratory", icon: "🔬" },
    { id: "admin", label: "Admin", icon: "🛡️" },
  ];

  const currentInfo = DEMO_ROLES[currentRole];

  return (
    <header
      style={{
        height: 50,
        background: "#0f1f3d",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        zIndex: 50,
        flexShrink: 0,
        fontFamily: "Inter, system-ui, sans-serif",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div
          style={{
            width: 30,
            height: 30,
            background: "#0d7a6e",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 2px 6px rgba(13, 122, 110, 0.4)",
          }}
        >
          <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            MediKiosk
          </div>
          <div style={{ fontSize: 9, color: "rgba(255, 255, 255, 0.45)", fontWeight: 500, letterSpacing: "0.04em" }}>
            HEALTHCARE PLATFORM
          </div>
        </div>
      </div>

      {/* Top Role Buttons */}
      <nav
        aria-label="Role Navigation"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255, 255, 255, 0.05)",
          padding: "3px 5px",
          borderRadius: 8,
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {roles.map((r) => {
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onSelectRole(r.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: isActive ? 600 : 500,
                cursor: "pointer",
                border: "none",
                transition: "all 0.15s ease",
                background: isActive ? "#0d7a6e" : "transparent",
                color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.72)",
                boxShadow: isActive ? "0 2px 6px rgba(13, 122, 110, 0.35)" : "none",
                fontFamily: "Inter, system-ui, sans-serif",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.72)";
                }
              }}
            >
              <span style={{ fontSize: 13 }}>{r.icon}</span>
              <span>{r.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User info & ABDM status badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        {/* ABDM live pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 9px",
            background: "rgba(22, 163, 74, 0.15)",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            borderRadius: 20,
            fontSize: 11,
            color: "#86efac",
            fontWeight: 600,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          <span>ABDM Active</span>
        </div>

        {/* User Card */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#0d7a6e",
              border: "1.5px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            {currentInfo.name.charAt(0)}
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#ffffff" }}>
              {currentInfo.name}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.5)" }}>
              {currentInfo.title}
            </div>
          </div>
        </div>

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "rgba(255, 255, 255, 0.7)",
              borderRadius: 6,
              padding: "5px 10px",
              fontSize: 11,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(232, 75, 75, 0.2)";
              e.currentTarget.style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
            }}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Exit</span>
          </button>
        )}
      </div>
    </header>
  );
}

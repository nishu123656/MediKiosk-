import React from "react";
import { UserRole, ScreenType, DEMO_ROLES } from "../types";
import { useAuth } from "../context/AuthContext";
import AccessRestricted from "./AccessRestricted";

interface RoleGuardProps {
  targetRole?: UserRole;
  allowedRoles?: UserRole[];
  screen?: ScreenType;
  children: React.ReactNode;
  onReturnDashboard: () => void;
  onLogout: () => void;
}

export default function RoleGuard({
  targetRole,
  allowedRoles,
  screen,
  children,
  onReturnDashboard,
  onLogout,
}: RoleGuardProps) {
  const { userRole, isAuthenticated, canAccessScreen } = useAuth();

  if (!isAuthenticated || !userRole) {
    return (
      <AccessRestricted
        targetRole={targetRole}
        attemptedScreen={screen}
        onReturnDashboard={onReturnDashboard}
        onLogout={onLogout}
      />
    );
  }

  // Admin has global supervision permissions
  if (userRole === "admin") {
    return <>{children}</>;
  }

  // Check allowedRoles list if provided
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(userRole)) {
      return (
        <AccessRestricted
          targetRole={targetRole || allowedRoles[0]}
          attemptedScreen={screen}
          onReturnDashboard={onReturnDashboard}
          onLogout={onLogout}
        />
      );
    }
  }

  // Check targetRole specific match
  if (targetRole && targetRole !== userRole) {
    return (
      <AccessRestricted
        targetRole={targetRole}
        attemptedScreen={screen}
        onReturnDashboard={onReturnDashboard}
        onLogout={onLogout}
      />
    );
  }

  // Check screen permission within current role
  if (screen && targetRole) {
    const isAllowed = canAccessScreen(targetRole, screen);
    if (!isAllowed) {
      return (
        <AccessRestricted
          targetRole={targetRole}
          attemptedScreen={screen}
          onReturnDashboard={onReturnDashboard}
          onLogout={onLogout}
        />
      );
    }
  }

  return <>{children}</>;
}

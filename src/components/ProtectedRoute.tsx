import React from "react";
import { UserRole, ScreenType } from "../types";
import { useAuth } from "../context/AuthContext";
import RoleGuard from "./RoleGuard";

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  allowedRoles?: UserRole[];
  screen?: ScreenType;
  fallbackLogin?: React.ReactNode;
  children: React.ReactNode;
  onReturnDashboard: () => void;
  onLogout: () => void;
}

export default function ProtectedRoute({
  requiredRole,
  allowedRoles,
  screen,
  fallbackLogin,
  children,
  onReturnDashboard,
  onLogout,
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    if (fallbackLogin) {
      return <>{fallbackLogin}</>;
    }
    return null;
  }

  return (
    <RoleGuard
      targetRole={requiredRole}
      allowedRoles={allowedRoles}
      screen={screen}
      onReturnDashboard={onReturnDashboard}
      onLogout={onLogout}
    >
      {children}
    </RoleGuard>
  );
}

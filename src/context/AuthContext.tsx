import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole, ScreenType, DEMO_ROLES } from "../types";

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  mobile?: string;
  abhaId?: string;
  regNumber?: string;
  organization?: string;
  department?: string;
  verified: boolean;
  avatarText?: string;
}

export interface DemoAccountCreds {
  role: UserRole;
  title: string;
  identifier: string; // email or mobile
  passwordOrOtp: string;
  user: AuthUser;
  description: string;
}

export const DEMO_CREDENTIALS: Record<UserRole, DemoAccountCreds> = {
  patient: {
    role: "patient",
    title: "Patient",
    identifier: "9999999999",
    passwordOrOtp: "123456",
    description: "Mobile OTP or ABHA Login",
    user: {
      id: "PT-2026-9921",
      name: "Rahul Sharma",
      role: "patient",
      mobile: "9999999999",
      abhaId: "91-4820-1934-8821",
      email: "rahul.sharma@example.com",
      organization: "National Health Authority",
      verified: true,
      avatarText: "RS",
    },
  },
  doctor: {
    role: "doctor",
    title: "Doctor",
    identifier: "doctor@medikiosk.demo",
    passwordOrOtp: "Doctor@123",
    description: "Verified Practitioner Login",
    user: {
      id: "DOC-MH-38412",
      name: "Dr. Priya Mehta",
      role: "doctor",
      email: "doctor@medikiosk.demo",
      regNumber: "MCI-2018-38412",
      department: "Internal Medicine & Endocrinology",
      organization: "AyurCare Multi-Speciality",
      verified: true,
      avatarText: "PM",
    },
  },
  hospital: {
    role: "hospital",
    title: "Hospital",
    identifier: "hospital@medikiosk.demo",
    passwordOrOtp: "Hospital@123",
    description: "Healthcare Facility Admin",
    user: {
      id: "HOSP-MH-4012",
      name: "AyurCare / Apollo Hospital",
      role: "hospital",
      email: "hospital@medikiosk.demo",
      regNumber: "NABH-MH-2022-4012",
      department: "Hospital Administration",
      organization: "Apollo AyurCare Healthcare Network",
      verified: true,
      avatarText: "AH",
    },
  },
  pharmacy: {
    role: "pharmacy",
    title: "Pharmacy",
    identifier: "pharmacy@medikiosk.demo",
    passwordOrOtp: "Pharmacy@123",
    description: "Licensed Dispensary Portal",
    user: {
      id: "PHARM-MH-8821",
      name: "MedPlus Pharmacy",
      role: "pharmacy",
      email: "pharmacy@medikiosk.demo",
      regNumber: "DL-MH-2021-9924 (Form 20/21)",
      department: "Central Pharmacy & Dispensary",
      organization: "MedPlus Healthcare Services",
      verified: true,
      avatarText: "MP",
    },
  },
  lab: {
    role: "lab",
    title: "Laboratory",
    identifier: "lab@medikiosk.demo",
    passwordOrOtp: "Lab@123",
    description: "NABL Diagnostic Centre",
    user: {
      id: "LAB-MH-4410",
      name: "Thyrocare Central Diagnostics",
      role: "lab",
      email: "lab@medikiosk.demo",
      regNumber: "NABL-MC-2019-4410 (ISO 15189)",
      department: "Pathology & Molecular Diagnostics",
      organization: "Thyrocare Diagnostics Network",
      verified: true,
      avatarText: "TC",
    },
  },
  admin: {
    role: "admin",
    title: "Admin",
    identifier: "admin@medikiosk.demo",
    passwordOrOtp: "Admin@123",
    description: "Platform Governance & ABDM",
    user: {
      id: "ADM-GOV-001",
      name: "National Health Authority Admin",
      role: "admin",
      email: "admin@medikiosk.demo",
      regNumber: "ABDM-SYS-SUPERADMIN",
      department: "Platform Operations & Governance",
      organization: "Ministry of Health & Family Welfare",
      verified: true,
      avatarText: "AD",
    },
  },
};

// Map role alias if needed (e.g. "laboratory" -> "lab")
export function normalizeRole(r: string): UserRole | null {
  if (r === "laboratory") return "lab";
  if (["patient", "doctor", "hospital", "pharmacy", "lab", "admin"].includes(r)) {
    return r as UserRole;
  }
  return null;
}

// Role allowed screens map for strict Role-Based Access Control
export const ROLE_PERMISSIONS: Record<UserRole, ScreenType[]> = {
  patient: [
    "dashboard",
    "register",
    "consent",
    "checkin",
    "intake",
    "summary",
    "appt-booking",
    "documents",
    "prescription",
    "pharmacy",
    "pharmacy-checkout",
    "order-tracking",
    "lab",
    "consult",
    "timeline",
    "notifications",
    "settings",
    "find-healthcare",
  ],
  doctor: [
    "doctor",
    "doctor-reg",
    "record",
    "consult",
    "summary",
    "prescription",
    "lab",
    "doctor-profile",
    "appt-booking",
    "ai-intelligence",
    "notifications",
    "settings",
  ],
  hospital: [
    "hospital-dash",
    "record",
    "doctor-approval",
    "departments",
    "appt-booking",
    "consult",
    "prescription",
    "lab-dash",
    "pharmacy-dash",
    "doctor-reg",
    "reports",
    "notifications",
    "hospital-reg",
    "settings",
  ],
  pharmacy: [
    "pharmacy-dash",
    "pharmacy-reg",
    "order-tracking",
    "prescription",
    "pharmacy",
    "inventory",
    "record",
    "payments",
    "reports",
    "notifications",
    "settings",
  ],
  lab: [
    "lab-dash",
    "lab-reg",
    "record",
    "samples",
    "lab",
    "appt-booking",
    "payments",
    "analytics",
    "notifications",
    "settings",
    "reports",
  ],
  admin: [
    "admin",
    "record",
    "hospital-verify",
    "doctor-approval",
    "pharmacy-dash",
    "lab-dash",
    "appt-booking",
    "consult",
    "prescription",
    "order-tracking",
    "consent",
    "audit-logs",
    "system-health",
    "settings",
    "reports",
    "notifications",
    "doctor-reg",
    "hospital-reg",
    "pharmacy-reg",
    "lab-reg",
  ],
};

interface AuthContextType {
  currentUser: AuthUser | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  login: (role: UserRole, customUser?: Partial<AuthUser>) => void;
  logout: () => void;
  canAccessScreen: (targetRole: UserRole, screen: ScreenType) => boolean;
  isRoleAuthorized: (targetRole: UserRole) => boolean;
}

const STORAGE_KEY = "medikiosk_auth_session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.user && parsed.role) {
          return parsed.user as AuthUser;
        }
      }
    } catch (e) {
      console.error("Failed to restore session from localStorage", e);
    }
    return null;
  });

  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role) {
          return parsed.role as UserRole;
        }
      }
    } catch {
      // Ignore
    }
    return null;
  });

  const isAuthenticated = !!currentUser && !!userRole;

  // Persist session to localStorage
  useEffect(() => {
    if (currentUser && userRole) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user: currentUser,
          role: userRole,
          timestamp: Date.now(),
        })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser, userRole]);

  function login(role: UserRole, customUser?: Partial<AuthUser>) {
    const template = DEMO_CREDENTIALS[role].user;
    const userObj: AuthUser = {
      ...template,
      ...(customUser || {}),
      role,
    };
    setCurrentUser(userObj);
    setUserRole(role);
  }

  function logout() {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  function isRoleAuthorized(targetRole: UserRole): boolean {
    if (!isAuthenticated || !userRole) return false;
    // Admins have platform-level inspection access, or strictly matching role
    if (userRole === "admin") return true;
    return userRole === targetRole;
  }

  function canAccessScreen(targetRole: UserRole, screen: ScreenType): boolean {
    if (!isAuthenticated || !userRole) return false;
    // Admin has platform-level management access across all modules
    if (userRole === "admin") return true;
    if (userRole !== targetRole) return false;
    const allowed = ROLE_PERMISSIONS[userRole] || [];
    return allowed.includes(screen);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRole,
        isAuthenticated,
        login,
        logout,
        canAccessScreen,
        isRoleAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

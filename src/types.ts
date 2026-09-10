export type UserRole = "patient" | "doctor" | "hospital" | "pharmacy" | "lab" | "admin";

export interface DemoRoleInfo {
  role: UserRole;
  title: string;
  name: string;
  subtitle: string;
  badge: string;
  defaultMobile: string;
  defaultAbha: string;
  targetScreen: ScreenType;
}

export type ScreenType =
  | "login"
  | "register"
  | "consent"
  | "checkin"
  | "intake"
  | "summary"
  | "dashboard"
  | "doctor"
  | "record"
  | "consult"
  | "prescription"
  | "pharmacy"
  | "pharmacy-checkout"
  | "order-tracking"
  | "lab"
  | "timeline"
  | "hospital-reg"
  | "hospital-verify"
  | "doctor-reg"
  | "doctor-approval"
  | "pharmacy-reg"
  | "lab-reg"
  | "admin"
  | "pharmacy-dash"
  | "lab-dash"
  | "hospital-dash"
  | "doctor-profile"
  | "appt-booking"
  | "find-healthcare"
  | "documents"
  | "ai-intelligence"
  | "departments"
  | "inventory"
  | "samples"
  | "payments"
  | "reports"
  | "analytics"
  | "audit-logs"
  | "system-health"
  | "notifications"
  | "settings";

export const DEMO_ROLES: Record<UserRole, DemoRoleInfo> = {
  patient: {
    role: "patient",
    title: "Patient",
    name: "Rahul Sharma",
    subtitle: "ABHA: 91-4820-1934-8821 · Patient ID: MK-2947",
    badge: "Patient Portal",
    defaultMobile: "9876543210",
    defaultAbha: "rahul.sharma@abdm",
    targetScreen: "dashboard",
  },
  doctor: {
    role: "doctor",
    title: "Doctor",
    name: "Dr. Priya Mehta",
    subtitle: "MCI-2018-38412 · Senior Endocrinologist",
    badge: "Doctor Workspace",
    defaultMobile: "9820011223",
    defaultAbha: "dr.priya.mehta@abdm",
    targetScreen: "doctor",
  },
  hospital: {
    role: "hospital",
    title: "Hospital",
    name: "AyurCare / Apollo Hospital",
    subtitle: "HOSP-MH-4012 · Mumbai Central",
    badge: "Hospital Admin",
    defaultMobile: "9819922334",
    defaultAbha: "admin@apollohospital",
    targetScreen: "hospital-dash",
  },
  pharmacy: {
    role: "pharmacy",
    title: "Pharmacy",
    name: "MedPlus Pharmacy",
    subtitle: "PHARM-MH-8821 · Bandra West",
    badge: "Pharmacy Store",
    defaultMobile: "9833344556",
    defaultAbha: "rx@medplus",
    targetScreen: "pharmacy-dash",
  },
  lab: {
    role: "lab",
    title: "Laboratory",
    name: "Thyrocare Central Diagnostics",
    subtitle: "LAB-NABL-4410 · Navi Mumbai",
    badge: "Diagnostic Lab",
    defaultMobile: "9844455667",
    defaultAbha: "lab@thyrocare",
    targetScreen: "lab-dash",
  },
  admin: {
    role: "admin",
    title: "Admin",
    name: "Platform Administrator",
    subtitle: "National Health Authority · ABDM Console",
    badge: "System Superadmin",
    defaultMobile: "9800011122",
    defaultAbha: "superadmin@abdm.gov",
    targetScreen: "admin",
  },
};

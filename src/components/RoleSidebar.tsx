import { UserRole, DEMO_ROLES } from "../types";
import { useAuth } from "../context/AuthContext";

export interface SidebarMenuItem {
  id: string;
  label: string;
  iconName: string;
  badge?: string | number;
  badgeColor?: string;
  targetScreen: string;
}

interface RoleSidebarProps {
  currentRole: UserRole;
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

// Icon helper using pure SVG paths matching MediKiosk aesthetic
const renderIcon = (name: string, size = 15) => {
  switch (name) {
    case "dashboard":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      );
    case "calendar":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "search":
    case "find":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "clipboard-check":
    case "intake":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      );
    case "file-text":
    case "summary":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "folder":
    case "records":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      );
    case "documents":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "pill":
    case "prescription":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4" />
        </svg>
      );
    case "pharmacy":
    case "medicines":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
          <path d="m5 2 5 5" />
          <path d="m2 5 5 5" />
        </svg>
      );
    case "package":
    case "orders":
    case "inventory":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case "flask":
    case "lab":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v7.31L4.17 18.5A2 2 0 0 0 5.86 21h12.28a2 2 0 0 0 1.69-2.5L14 9.31V2" />
          <line x1="8.5" y1="2" x2="15.5" y2="2" />
          <line x1="14" y1="9.3" x2="10" y2="9.3" />
        </svg>
      );
    case "video":
    case "teleconsult":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    case "clock":
    case "timeline":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "shield":
    case "abha":
    case "consent":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "bell":
    case "notifications":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case "settings":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "users":
    case "patients":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "list":
    case "queue":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      );
    case "cpu":
    case "ai":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      );
    case "activity":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case "hospital":
    case "building":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
          <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
          <line x1="10" y1="9" x2="14" y2="9" />
          <line x1="12" y1="7" x2="12" y2="11" />
        </svg>
      );
    case "doctor":
    case "stethoscope":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      );
    case "truck":
    case "delivery":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "credit-card":
    case "payments":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );
    case "bar-chart":
    case "reports":
    case "analytics":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      );
    case "check-circle":
    case "verify":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "server":
    case "syshealth":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "book-open":
    case "catalogue":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case "test-tube":
    case "samples":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2" />
          <path d="M8.5 2h7" />
          <path d="M14.5 16h-5" />
        </svg>
      );
    case "lock":
    case "audit":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "logout":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

// ROLE MENUS STRICTLY AS SPECIFIED IN USER PROMPT
export const ROLE_SIDEBAR_CONFIG: Record<UserRole, { sectionTitle: string; items: SidebarMenuItem[] }> = {
  patient: {
    sectionTitle: "PATIENT WORKSPACE",
    items: [
      { id: "dashboard",         label: "Dashboard",           iconName: "dashboard",        targetScreen: "dashboard" },
      { id: "appointments",      label: "Appointments",        iconName: "calendar",         targetScreen: "appt-booking" },
      { id: "find-healthcare",   label: "Find Healthcare",     iconName: "find",             targetScreen: "find-healthcare" },
      { id: "clinical-intake",   label: "Clinical Intake",     iconName: "intake",           targetScreen: "intake" },
      { id: "clinical-summary",  label: "Clinical Summary",    iconName: "summary",          targetScreen: "summary" },
      { id: "medical-records",   label: "Medical Records",     iconName: "records",          targetScreen: "record" },
      { id: "medical-documents", label: "Medical Documents",   iconName: "documents",        targetScreen: "documents" },
      { id: "prescriptions",     label: "Prescriptions",       iconName: "prescription",     targetScreen: "prescription" },
      { id: "pharmacy",          label: "Pharmacy",            iconName: "pharmacy",         targetScreen: "pharmacy" },
      { id: "orders",            label: "Orders",              iconName: "orders",           targetScreen: "order-tracking" },
      { id: "lab-diagnostics",   label: "Lab & Diagnostics",   iconName: "lab",              targetScreen: "lab" },
      { id: "teleconsultation",  label: "Teleconsultation",    iconName: "teleconsult",      targetScreen: "consult" },
      { id: "health-timeline",   label: "Health Timeline",     iconName: "timeline",         targetScreen: "timeline" },
      { id: "abha-consent",      label: "ABHA & Consent",      iconName: "consent",          targetScreen: "consent" },
      { id: "notifications",     label: "Notifications",       iconName: "notifications",    targetScreen: "notifications", badge: 3, badgeColor: "#0d7a6e" },
      { id: "settings",          label: "Settings",            iconName: "settings",         targetScreen: "settings" },
    ],
  },
  doctor: {
    sectionTitle: "DOCTOR WORKSPACE",
    items: [
      { id: "dashboard",         label: "Dashboard",                      iconName: "dashboard",    targetScreen: "doctor" },
      { id: "patient-queue",     label: "Patient Queue",                  iconName: "queue",        targetScreen: "doctor", badge: 7, badgeColor: "#e84b4b" },
      { id: "appointments",      label: "Appointments",                   iconName: "calendar",     targetScreen: "appt-booking" },
      { id: "patients",          label: "Patients",                       iconName: "patients",     targetScreen: "record" },
      { id: "patient-records",   label: "Patient Records",                iconName: "records",      targetScreen: "record" },
      { id: "consultations",     label: "Consultations",                  iconName: "teleconsult",  targetScreen: "consult" },
      { id: "clinical-summary",  label: "Clinical Summary",               iconName: "summary",      targetScreen: "summary" },
      { id: "ai-intelligence",   label: "Clinical Intelligence Copilot",  iconName: "ai",           targetScreen: "ai-intelligence" },
      { id: "prescriptions",     label: "Prescriptions",                  iconName: "prescription", targetScreen: "prescription" },
      { id: "lab-tests",         label: "Lab Tests",                      iconName: "lab",          targetScreen: "lab" },
      { id: "teleconsultation",  label: "Teleconsultation",               iconName: "teleconsult",  targetScreen: "consult" },
      { id: "availability",      label: "Availability",                   iconName: "clock",        targetScreen: "doctor-profile" },
      { id: "notifications",     label: "Notifications",                  iconName: "notifications",targetScreen: "notifications", badge: 4, badgeColor: "#0d7a6e" },
      { id: "settings",          label: "Settings",                       iconName: "settings",     targetScreen: "settings" },
    ],
  },
  hospital: {
    sectionTitle: "HOSPITAL MANAGEMENT",
    items: [
      { id: "dashboard",         label: "Dashboard",           iconName: "dashboard",    targetScreen: "hospital-dash" },
      { id: "patients",          label: "Patients",            iconName: "patients",     targetScreen: "record" },
      { id: "doctors",           label: "Doctors",             iconName: "doctor",       targetScreen: "doctor-approval" },
      { id: "departments",       label: "Departments",         iconName: "building",     targetScreen: "departments" },
      { id: "appointments",      label: "Appointments",        iconName: "calendar",     targetScreen: "appt-booking" },
      { id: "consultations",     label: "Consultations",       iconName: "teleconsult",  targetScreen: "consult" },
      { id: "prescriptions",     label: "Prescriptions",       iconName: "prescription", targetScreen: "prescription" },
      { id: "lab-tests",         label: "Lab Tests",           iconName: "lab",          targetScreen: "lab-dash" },
      { id: "pharmacy",          label: "Pharmacy",            iconName: "pharmacy",     targetScreen: "pharmacy-dash" },
      { id: "health-records",    label: "Health Records",      iconName: "records",      targetScreen: "record" },
      { id: "staff",             label: "Staff",               iconName: "users",        targetScreen: "doctor-reg" },
      { id: "reports",           label: "Reports",             iconName: "reports",      targetScreen: "reports" },
      { id: "notifications",     label: "Notifications",       iconName: "notifications",targetScreen: "notifications", badge: 5, badgeColor: "#0d7a6e" },
      { id: "settings",          label: "Settings",            iconName: "settings",     targetScreen: "hospital-reg" },
    ],
  },
  pharmacy: {
    sectionTitle: "PHARMACY DISPENSARY",
    items: [
      { id: "dashboard",         label: "Dashboard",                 iconName: "dashboard",    targetScreen: "pharmacy-dash" },
      { id: "orders",            label: "Orders",                    iconName: "orders",       targetScreen: "pharmacy-dash", badge: 18, badgeColor: "#e84b4b" },
      { id: "prescriptions",     label: "Prescriptions",             iconName: "prescription", targetScreen: "prescription" },
      { id: "rx-verify",         label: "Prescription Verification", iconName: "verify",       targetScreen: "prescription" },
      { id: "medicines",         label: "Medicines",                 iconName: "medicines",    targetScreen: "pharmacy" },
      { id: "inventory",         label: "Inventory",                 iconName: "inventory",    targetScreen: "inventory", badge: 12, badgeColor: "#d97706" },
      { id: "patients",          label: "Patients",                  iconName: "patients",     targetScreen: "record" },
      { id: "delivery",          label: "Delivery",                  iconName: "delivery",     targetScreen: "order-tracking" },
      { id: "payments",          label: "Payments",                  iconName: "payments",     targetScreen: "payments" },
      { id: "reports",           label: "Reports",                   iconName: "reports",      targetScreen: "reports" },
      { id: "notifications",     label: "Notifications",             iconName: "notifications",targetScreen: "notifications", badge: 2, badgeColor: "#0d7a6e" },
      { id: "settings",          label: "Settings",                  iconName: "settings",     targetScreen: "settings" },
    ],
  },
  lab: {
    sectionTitle: "LABORATORY DIAGNOSTICS",
    items: [
      { id: "dashboard",         label: "Dashboard",           iconName: "dashboard",    targetScreen: "lab-dash" },
      { id: "test-orders",       label: "Test Orders",         iconName: "orders",       targetScreen: "lab-dash", badge: 12, badgeColor: "#d97706" },
      { id: "patients",          label: "Patients",            iconName: "patients",     targetScreen: "record" },
      { id: "samples",           label: "Samples",             iconName: "samples",      targetScreen: "samples" },
      { id: "reports",           label: "Reports",             iconName: "reports",      targetScreen: "lab", badge: 21, badgeColor: "#16a34a" },
      { id: "test-catalogue",    label: "Test Catalogue",      iconName: "catalogue",    targetScreen: "lab" },
      { id: "appointments",      label: "Appointments",        iconName: "calendar",     targetScreen: "appt-booking" },
      { id: "payments",          label: "Payments",            iconName: "payments",     targetScreen: "payments" },
      { id: "analytics",         label: "Analytics",           iconName: "analytics",    targetScreen: "analytics" },
      { id: "notifications",     label: "Notifications",       iconName: "notifications",targetScreen: "notifications", badge: 3, badgeColor: "#0d7a6e" },
      { id: "settings",          label: "Settings",            iconName: "settings",     targetScreen: "settings" },
    ],
  },
  admin: {
    sectionTitle: "ADMINISTRATION",
    items: [
      { id: "dashboard",         label: "Dashboard",           iconName: "dashboard",    targetScreen: "admin" },
      { id: "patients",          label: "Patients",            iconName: "patients",     targetScreen: "record" },
      { id: "hospitals",         label: "Hospitals",           iconName: "hospital",     targetScreen: "hospital-verify" },
      { id: "doctors",           label: "Doctors",             iconName: "doctor",       targetScreen: "doctor-approval" },
      { id: "pharmacies",        label: "Pharmacies",          iconName: "pharmacy",     targetScreen: "pharmacy-dash" },
      { id: "laboratories",      label: "Laboratories",        iconName: "lab",          targetScreen: "lab-dash" },
      { id: "appointments",      label: "Appointments",        iconName: "calendar",     targetScreen: "appt-booking" },
      { id: "consultations",     label: "Consultations",       iconName: "teleconsult",  targetScreen: "consult" },
      { id: "prescriptions",     label: "Prescriptions",       iconName: "prescription", targetScreen: "prescription" },
      { id: "orders",            label: "Orders",              iconName: "orders",       targetScreen: "order-tracking" },
      { id: "abha-abdm",         label: "ABHA / ABDM",         iconName: "abha",         targetScreen: "consent" },
      { id: "verification",      label: "Verification",        iconName: "verify",       targetScreen: "hospital-verify", badge: 24, badgeColor: "#e84b4b" },
      { id: "audit-logs",        label: "Audit Logs",          iconName: "audit",        targetScreen: "audit-logs" },
      { id: "system-health",     label: "System Health",       iconName: "syshealth",    targetScreen: "system-health" },
      { id: "settings",          label: "Settings",            iconName: "settings",     targetScreen: "settings" },
    ],
  },
};

export default function RoleSidebar({
  currentRole,
  activeScreen,
  onNavigate,
  onLogout,
}: RoleSidebarProps) {
  const { currentUser } = useAuth();
  const config = ROLE_SIDEBAR_CONFIG[currentRole];
  const roleInfo = DEMO_ROLES[currentRole];

  const displayName = currentUser?.name || roleInfo.name;
  const displaySubtitle = currentUser?.regNumber || currentUser?.email || roleInfo.subtitle;

  return (
    <aside
      aria-label="Role Sidebar"
      style={{
        width: 220,
        minWidth: 220,
        maxWidth: 220,
        height: "100%",
        background: "#0f1f3d",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        fontFamily: "Inter, system-ui, sans-serif",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
      }}
    >
      {/* Role workspace title */}
      <div
        style={{
          padding: "14px 16px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "rgba(255, 255, 255, 0.4)",
            textTransform: "uppercase",
          }}
        >
          {config.sectionTitle}
        </span>
        <span
          style={{
            fontSize: 9,
            background: "rgba(13, 122, 110, 0.3)",
            color: "#5dd6c8",
            padding: "1px 6px",
            borderRadius: 4,
            fontWeight: 700,
          }}
        >
          ACTIVE
        </span>
      </div>

      {/* Nav List */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {config.items.map((item) => {
          // An item is considered active if targetScreen matches activeScreen
          // or for sub-views that share screen names
          const isActive =
            activeScreen === item.targetScreen ||
            (activeScreen === "doctor" && item.id === "patient-queue" && item.targetScreen === "doctor") ||
            (activeScreen === "dashboard" && item.id === "dashboard");

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.targetScreen)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "8px 10px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                background: isActive ? "rgba(13, 122, 110, 0.28)" : "transparent",
                color: isActive ? "#5dd6c8" : "rgba(255, 255, 255, 0.65)",
                transition: "all 0.12s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.65)";
                }
              }}
            >
              <span
                style={{
                  color: isActive ? "#5dd6c8" : "rgba(255, 255, 255, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {renderIcon(item.iconName)}
              </span>
              <span
                style={{
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.label}
              </span>

              {item.badge !== undefined && (
                <span
                  style={{
                    background: item.badgeColor || "#0d7a6e",
                    color: "#ffffff",
                    fontSize: 9,
                    fontWeight: 700,
                    borderRadius: 9,
                    padding: "1px 6px",
                    flexShrink: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Real Logout button on every sidebar as requested */}
        <div style={{ marginTop: 4, paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            type="button"
            onClick={onLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              background: "transparent",
              color: "rgba(248, 113, 113, 0.75)",
              transition: "all 0.12s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(232, 75, 75, 0.12)";
              e.currentTarget.style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(248, 113, 113, 0.75)";
            }}
          >
            <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {renderIcon("logout")}
            </span>
            <span style={{ flex: 1 }}>Logout</span>
          </button>
        </div>
      </nav>

      {/* Role Profile Info at bottom */}
      <div
        style={{
          padding: "10px 12px 14px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            padding: "9px 10px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 8,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {displayName}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.45)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {displaySubtitle}
          </div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 9, color: "#86efac", fontWeight: 600 }}>Verified {roleInfo.title}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

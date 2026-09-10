import { useState, useEffect } from "react";

// ─── Icon ─────────────────────────────────────────────────────────────────────
const Icon = ({
  d, size = 18, stroke = "currentColor", fill = "none",
}: { d: string; size?: number; stroke?: string; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ic = {
  heart:       "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  chevLeft:    "M15 18l-6-6 6-6",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  mapPin:      "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  truck:       "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  store:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  package:     "M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  timeline:    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  x:           "M18 6L6 18M6 6l12 12",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  refresh:     "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
  home:        "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  creditCard:  "M1 4h22v16H1z M1 10h22",
  mapMarker:   "M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 100-6 3 3 0 000 6z",
};

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  primary:       "#0d7a6e",
  primaryLight:  "#f0fdf9",
  primaryBorder: "#b2e8e0",
  navy:          "#0f1f3d",
  gray:          "#64748b",
  grayLight:     "#94a3b8",
  bg:            "#f5f7fa",
  white:         "#ffffff",
  border:        "#e8ecf0",
  muted:         "#f8fafc",
  success:       "#16a34a",
  successLight:  "#f0fdf4",
  successBorder: "#bbf7d0",
  amber:         "#d97706",
  amberLight:    "#fffbeb",
  amberBorder:   "#fde68a",
  blue:          "#1d4ed8",
  blueLight:     "#eff6ff",
  blueBorder:    "#bfdbfe",
  danger:        "#e84b4b",
  dangerLight:   "#fff5f5",
  dangerBorder:  "#fecaca",
};

// ─── Responsive ───────────────────────────────────────────────────────────────
function useW() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MEDICINES = [
  { id: 1, name: "Paracetamol", dosage: "500 mg", qty: 6,  unitPrice: 2.5  },
  { id: 2, name: "Cetirizine",  dosage: "10 mg",  qty: 5,  unitPrice: 4.0  },
  { id: 3, name: "Ambroxol",    dosage: "30 mg",  qty: 15, unitPrice: 3.5  },
];
const SUBTOTAL    = MEDICINES.reduce((s, m) => s + m.qty * m.unitPrice, 0);
const DELIVERY    = 25;
const TOTAL       = SUBTOTAL + DELIVERY;

type StepState = "done" | "active" | "pending";
interface TrackStep {
  id:    string;
  label: string;
  sub:   string;
  time:  string;
  state: StepState;
}
const STEPS: TrackStep[] = [
  { id: "placed",    label: "Order Placed",              sub: "Order received and sent to pharmacy", time: "10 Sep · 3:05 PM",  state: "done"   },
  { id: "confirmed", label: "Pharmacy Confirmed",        sub: "MediCare Pharmacy accepted the order", time: "10 Sep · 3:08 PM", state: "done"   },
  { id: "preparing", label: "Preparing Medicines",       sub: "Pharmacist is preparing your order",  time: "In progress",       state: "active" },
  { id: "delivery",  label: "Out for Delivery",          sub: "Assigned to delivery partner",        time: "Est. 3:30 PM",      state: "pending" },
  { id: "delivered", label: "Delivered",                 sub: "Delivered to your address",           time: "Est. 3:35–3:50 PM", state: "pending" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${border}`, padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardHead({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</span>
      {action}
    </div>
  );
}

function TextBtn({ label, onClick, color }: { label: string; onClick?: () => void; color?: string }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: color ?? T.primary, fontFamily: "Inter, system-ui, sans-serif", padding: 0 }}>
      {label}
    </button>
  );
}

function SummaryRow({ label, value, bold, green }: { label: string; value: string; bold?: boolean; green?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: bold ? 0 : 8 }}>
      <span style={{ fontSize: bold ? 13 : 12, fontWeight: bold ? 700 : 400, color: bold ? T.navy : T.gray }}>{label}</span>
      <span style={{ fontSize: bold ? 14 : 12, fontWeight: bold ? 700 : 500, color: green ? T.success : bold ? T.primary : T.navy }}>{value}</span>
    </div>
  );
}

// ─── Cancel dialog ────────────────────────────────────────────────────────────
function CancelDialog({ onConfirm, onDismiss }: { onConfirm: () => void; onDismiss: () => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,31,61,0.45)",
      zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }} onClick={onDismiss}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.white, borderRadius: 13, padding: "28px 28px 24px",
          maxWidth: 420, width: "100%", boxShadow: "0 20px 60px rgba(15,31,61,0.15)",
        }}
      >
        {/* Icon */}
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <Icon d={ic.alertTri} size={20} stroke={T.danger} />
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Cancel this order?</div>
        <p style={{ margin: "0 0 20px", fontSize: 13, color: T.gray, lineHeight: 1.65 }}>
          Cancelling the order will notify <strong style={{ color: T.navy }}>MediCare Pharmacy</strong>. If medicines are already being prepared, cancellation may not be possible. Contact the pharmacy to confirm.
        </p>

        <div style={{ padding: "10px 14px", background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderRadius: 8, marginBottom: 22, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <Icon d={ic.info} size={13} stroke={T.amber} />
          <p style={{ margin: 0, fontSize: 11, color: "#92400e", lineHeight: 1.55 }}>
            Prescription medicines, once dispensed, may not be eligible for return or refund as per pharmacy policy.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onDismiss}
            style={{
              flex: 1, padding: "10px", background: T.muted, border: `1px solid ${T.border}`,
              borderRadius: 8, fontSize: 13, fontWeight: 600, color: T.navy, cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Keep Order
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: "10px", background: T.danger, border: "none",
              borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Progress step (vertical) ─────────────────────────────────────────────────
function VStep({ step, isLast }: { step: TrackStep; isLast: boolean }) {
  const done   = step.state === "done";
  const active = step.state === "active";
  const dotBg  = done ? T.primary : active ? T.navy : T.border;
  const dotBd  = active ? T.primary : "transparent";

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {/* Spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: dotBg, border: `2.5px solid ${dotBd}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1,
        }}>
          {done ? (
            <Icon d={ic.check} size={14} stroke="#fff" />
          ) : active ? (
            <div style={{ display: "flex", gap: 2 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 4, height: 4, borderRadius: "50%", background: "#fff",
                  animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          ) : (
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.grayLight }} />
          )}
        </div>
        {!isLast && (
          <div style={{
            width: 2, flex: 1, minHeight: 28,
            background: done ? T.primary : T.border,
            margin: "4px 0",
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 28, paddingTop: 4, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 13, fontWeight: done || active ? 700 : 500, color: done || active ? T.navy : T.grayLight }}>
            {step.label}
          </span>
          {active && (
            <Badge label="Current" color={T.primary} bg={T.primaryLight} border={T.primaryBorder} />
          )}
        </div>
        <div style={{ fontSize: 11, color: done ? T.gray : active ? T.primary : T.grayLight, marginTop: 3 }}>{step.sub}</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: done ? T.grayLight : active ? T.navy : T.border, marginTop: 4 }}>{step.time}</div>
      </div>
    </div>
  );
}

// ─── Progress step (horizontal) ──────────────────────────────────────────────
function HStep({ step, isLast }: { step: TrackStep; isLast: boolean }) {
  const done   = step.state === "done";
  const active = step.state === "active";
  const dotBg  = done ? T.primary : active ? T.navy : T.white;
  const dotBd  = done ? T.primary : active ? T.primary : T.border;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", flex: isLast ? 0 : 1 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: dotBg, border: `2.5px solid ${dotBd}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {done ? (
            <Icon d={ic.check} size={14} stroke="#fff" />
          ) : active ? (
            <div style={{ display: "flex", gap: 2 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#fff" }} />
              ))}
            </div>
          ) : (
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.border }} />
          )}
        </div>
        <div style={{ textAlign: "center", maxWidth: 96 }}>
          <div style={{ fontSize: 11, fontWeight: done || active ? 700 : 500, color: done || active ? T.navy : T.grayLight, lineHeight: 1.35 }}>
            {step.label}
          </div>
          <div style={{ fontSize: 10, color: done ? T.grayLight : active ? T.primary : T.border, marginTop: 2 }}>
            {step.time}
          </div>
          {active && (
            <div style={{ marginTop: 4 }}>
              <Badge label="Now" color={T.primary} bg={T.primaryLight} border={T.primaryBorder} />
            </div>
          )}
        </div>
      </div>
      {!isLast && (
        <div style={{ flex: 1, height: 2, background: done ? T.primary : T.border, margin: "16px 4px 0", minWidth: 12 }} />
      )}
    </div>
  );
}

// ─── Cancelled state ──────────────────────────────────────────────────────────
function CancelledBanner() {
  return (
    <div style={{ padding: "14px 18px", background: T.dangerLight, border: `1px solid ${T.dangerBorder}`, borderRadius: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
      <Icon d={ic.x} size={16} stroke={T.danger} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.danger, marginBottom: 3 }}>Order Cancelled</div>
        <p style={{ margin: 0, fontSize: 12, color: "#b91c1c", lineHeight: 1.5 }}>
          This order has been cancelled. If medicines were already dispensed, please contact MediCare Pharmacy for further assistance.
        </p>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function OrderTracking({
  onBack,
  onViewPrescription,
  onViewTimeline,
}: {
  onBack: () => void;
  onViewPrescription?: () => void;
  onViewTimeline?: () => void;
}) {
  const w       = useW();
  const isMobile = w < 768;

  const [showCancel, setShowCancel] = useState(false);
  const [cancelled, setCancelled]   = useState(false);

  /* pulse-dot keyframes injected once */
  useEffect(() => {
    const id = "mk-pulse-dot";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes pulse-dot {
        0%,80%,100%{opacity:.25;transform:scale(.8)}
        40%        {opacity:1;  transform:scale(1)}
      }
    `;
    document.head.appendChild(s);
  }, []);

  function handleCancel() {
    setShowCancel(false);
    setCancelled(true);
  }

  // ── Shared blocks ──────────────────────────────────────────────────────────

  const orderStatusCard = (
    <Card>
      <CardHead
        title="Order Status"
        action={
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.primary, animation: cancelled ? "none" : "pulse-dot 1.4s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: cancelled ? T.grayLight : T.primary }}>
              {cancelled ? "Cancelled" : "Live"}
            </span>
          </div>
        }
      />
      <div style={{ padding: "24px 24px 20px" }}>
        {/* ETA pill */}
        {!cancelled && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, padding: "10px 16px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 9 }}>
            <Icon d={ic.clock} size={15} stroke={T.primary} />
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.primary }}>Estimated delivery: 30–45 minutes</span>
              <span style={{ fontSize: 11, color: T.grayLight, marginLeft: 8 }}>Est. arrival 3:35–3:50 PM</span>
            </div>
          </div>
        )}

        {/* Timeline — vertical on mobile, horizontal on desktop */}
        {isMobile ? (
          <div>
            {STEPS.map((step, i) => (
              <VStep key={step.id} step={cancelled ? { ...step, state: "pending" as StepState } : step} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {STEPS.map((step, i) => (
              <HStep key={step.id} step={cancelled ? { ...step, state: "pending" as StepState } : step} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        )}

        {cancelled && (
          <div style={{ marginTop: 20 }}>
            <CancelledBanner />
          </div>
        )}
      </div>
    </Card>
  );

  const orderItemsCard = (
    <Card>
      <CardHead
        title="Order Items"
        action={<Badge label={`${MEDICINES.length} medicines`} color={T.gray} bg={T.muted} border={T.border} />}
      />
      <div style={{ padding: "4px 0" }}>
        {/* Rx note */}
        <div style={{ margin: "12px 20px", padding: "8px 12px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 7, display: "flex", gap: 7, alignItems: "center" }}>
          <Icon d={ic.fileText} size={13} stroke={T.primary} />
          <span style={{ fontSize: 11, fontWeight: 500, color: T.primary }}>Ordered against doctor-approved prescription · MKP-2026-4821</span>
        </div>

        {MEDICINES.map((m, i) => (
          <div
            key={m.id}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "13px 20px",
              borderBottom: i < MEDICINES.length - 1 ? `1px solid ${T.border}` : "none",
            }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 8, background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={ic.pill} size={15} stroke={T.gray} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>
                {m.name} <span style={{ fontWeight: 400, color: T.gray }}>{m.dosage}</span>
              </div>
              <div style={{ fontSize: 11, color: T.grayLight, marginTop: 2 }}>
                Quantity: {m.qty} · Dosage: As prescribed
              </div>
              <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}>
                <Icon d={ic.check} size={11} stroke={T.success} />
                <span style={{ fontSize: 11, fontWeight: 600, color: T.success }}>Prescription approved</span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>₹{(m.qty * m.unitPrice).toFixed(2)}</div>
              <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>₹{m.unitPrice}/unit</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const pharmacyCard = (
    <Card>
      <CardHead title="Pharmacy" action={<TextBtn label="View Pharmacy" />} />
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon d={ic.store} size={19} stroke={T.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" as const }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>MediCare Pharmacy</span>
              <Badge label="✓ Verified" color={T.success} bg={T.successLight} border={T.successBorder} />
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, marginBottom: 14 }}>
              {[
                { icon: ic.mapPin,  text: "1.8 km away"    },
                { icon: ic.store,   text: "Pickup available" },
                { icon: ic.truck,   text: "Home delivery"   },
              ].map((row) => (
                <div key={row.text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon d={row.icon} size={12} stroke={T.grayLight} />
                  <span style={{ fontSize: 12, color: T.gray }}>{row.text}</span>
                </div>
              ))}
            </div>
            <button style={{
              display: "flex", alignItems: "center", gap: 7, padding: "7px 14px",
              background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8,
              fontSize: 12, fontWeight: 600, color: T.navy, cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
            }}>
              <Icon d={ic.phone} size={13} stroke={T.primary} />
              Contact Pharmacy
            </button>
          </div>
        </div>
      </div>
    </Card>
  );

  const deliveryCard = (
    <Card>
      <CardHead title="Delivery Details" />
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Delivering to */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>DELIVERING TO</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: T.blueLight, border: `1px solid ${T.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={ic.mapMarker} size={14} stroke={T.blue} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>Rahul Sharma</div>
              <div style={{ fontSize: 12, color: T.gray, marginTop: 2, lineHeight: 1.5 }}>
                B-204, Sunshine Apartments, Malviya Nagar<br />
                Jaipur, Rajasthan — 302 017
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: T.border }} />

        {/* Delivery row */}
        {[
          { label: "Delivery method",   value: "Home Delivery",    icon: ic.truck       },
          { label: "Estimated arrival", value: "3:35–3:50 PM",    icon: ic.clock       },
          { label: "Delivery partner",  value: "MediCare Express", icon: ic.user        },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Icon d={row.icon} size={13} stroke={T.grayLight} />
              <span style={{ fontSize: 12, color: T.gray }}>{row.label}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{row.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );

  const summaryCard = (
    <Card>
      <CardHead title="Order Summary" />
      <div style={{ padding: "18px 20px" }}>
        <SummaryRow label="Medicines subtotal" value={`₹${SUBTOTAL.toFixed(2)}`} />
        <SummaryRow label="Delivery fee"       value={`₹${DELIVERY}`} />
        <div style={{ height: 1, background: T.border, margin: "10px 0 12px" }} />
        <SummaryRow label="Total" value={`₹${TOTAL.toFixed(2)}`} bold />
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 7 }}>
          <Icon d={ic.creditCard} size={13} stroke={T.grayLight} />
          <span style={{ fontSize: 11, color: T.gray }}>Payment: Pay at Delivery (Demo)</span>
        </div>
      </div>
    </Card>
  );

  const prescriptionCard = (
    <Card>
      <CardHead title="Prescription" action={
        <button
          onClick={onViewPrescription}
          style={{
            display: "flex", alignItems: "center", gap: 5, padding: "5px 12px",
            background: T.primaryLight, border: `1px solid ${T.primaryBorder}`,
            borderRadius: 7, fontSize: 11, fontWeight: 600, color: T.primary,
            cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <Icon d={ic.fileText} size={12} stroke={T.primary} />
          View Prescription
        </button>
      } />
      <div style={{ padding: "16px 20px" }}>
        {[
          { label: "Doctor",      value: "Dr. Priya Mehta" },
          { label: "Date",        value: "10 September 2026" },
          { label: "Prescription ID", value: "MKP-2026-4821" },
          { label: "Status",      value: "Approved" },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
            <span style={{ fontSize: 12, color: T.gray }}>{row.label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: row.label === "Status" ? T.success : T.navy }}>
              {row.label === "Status" ? "✓ " : ""}{row.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );

  const timelineCard = (
    <Card>
      <div style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: T.blueLight, border: `1px solid ${T.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={ic.timeline} size={16} stroke={T.blue} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Added to Health Timeline</div>
          <p style={{ margin: "0 0 12px", fontSize: 11, color: T.gray, lineHeight: 1.6 }}>
            This pharmacy order will appear in your health timeline along with the associated prescription and dispensing record.
          </p>
          <button
            onClick={onViewTimeline}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontSize: 12, fontWeight: 600, color: T.blue,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            View Health Timeline
            <Icon d={ic.arrowRight} size={13} stroke={T.blue} />
          </button>
        </div>
      </div>
    </Card>
  );

  const actionsBar = !cancelled && (
    <div style={{ display: "flex", gap: 10 }}>
      <button style={{
        flex: 1, padding: "11px 16px",
        background: T.primary, border: "none", borderRadius: 9,
        fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        <Icon d={ic.phone} size={15} stroke="#fff" />
        Contact Pharmacy
      </button>
      <button
        onClick={() => setShowCancel(true)}
        style={{
          padding: "11px 18px",
          background: T.white, border: `1px solid ${T.border}`, borderRadius: 9,
          fontSize: 13, fontWeight: 600, color: T.gray, cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif",
          display: "flex", alignItems: "center", gap: 7,
        }}
      >
        <Icon d={ic.x} size={14} stroke={T.gray} />
        Cancel Order
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, display: "flex", flexDirection: "column" }}>

      {/* ── Header ── */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 28px", gap: 14 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.gray, fontSize: 13, fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif", padding: "4px 0" }}>
            <Icon d={ic.chevLeft} size={15} stroke={T.gray} />
            {!isMobile && "Back"}
          </button>
          <div style={{ width: 1, height: 24, background: T.border }} />

          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={12} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Order Tracking</div>
              {!isMobile && <div style={{ fontSize: 10, color: T.grayLight }}>Track your medicine order from the verified pharmacy</div>}
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Order ID chip */}
          <div style={{ padding: "5px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.navy }}>MK-ORD-2026-01842</span>
          </div>

          {/* Refresh */}
          {!isMobile && (
            <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "none", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
              <Icon d={ic.refresh} size={13} stroke={T.gray} />
              Refresh
            </button>
          )}
        </div>

        {/* Order meta strip */}
        <div style={{ padding: "8px 28px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" as const }}>
          {[
            { label: "Placed",   value: "10 September 2026 · 3:05 PM" },
            { label: "Pharmacy", value: "MediCare Pharmacy"            },
            { label: "Payment",  value: "Pay at Delivery"              },
          ].map((m) => (
            <div key={m.label} style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.05em" }}>{m.label.toUpperCase()}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: T.navy }}>{m.value}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto" }}>
            <Badge
              label={cancelled ? "Cancelled" : "Preparing"}
              color={cancelled ? T.danger : T.primary}
              bg={cancelled ? T.dangerLight : T.primaryLight}
              border={cancelled ? T.dangerBorder : T.primaryBorder}
            />
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1fr) 312px",
        gap: 20,
        padding: isMobile ? "16px 16px 100px" : "28px 28px 60px",
        maxWidth: 1120, width: "100%", margin: "0 auto",
        boxSizing: "border-box" as const, alignItems: "start",
      }}>

        {/* ── Left ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {orderStatusCard}
          {orderItemsCard}
          {deliveryCard}
          {timelineCard}
          {!isMobile && actionsBar}
        </div>

        {/* ── Right ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: isMobile ? "static" : "sticky", top: 120 }}>
          {pharmacyCard}
          {summaryCard}
          {prescriptionCard}
          {isMobile && actionsBar}
        </div>
      </div>

      {/* ── Mobile sticky action ── */}
      {isMobile && !cancelled && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30, background: T.white, borderTop: `1px solid ${T.border}`, padding: "10px 16px" }}>
          <button style={{
            width: "100%", padding: "12px",
            background: T.primary, border: "none", borderRadius: 9,
            fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <Icon d={ic.phone} size={15} stroke="#fff" />
            Contact Pharmacy
          </button>
        </div>
      )}

      {/* ── Cancel dialog ── */}
      {showCancel && (
        <CancelDialog onConfirm={handleCancel} onDismiss={() => setShowCancel(false)} />
      )}
    </div>
  );
}

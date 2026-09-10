import { useState } from "react";

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
  chevLeft:    "M15 18l-6-6 6-6",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  mapPin:      "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  truck:       "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  store:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  creditCard:  "M1 4h22v16H1z M1 10h22",
  cash:        "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  mapMarker:   "M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 100-6 3 3 0 000 6z",
  package:     "M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  heart:       "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  radio:       "M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0",
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
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const MEDICINES = [
  { id: 1, name: "Paracetamol",  dosage: "500 mg", sig: "1 tablet · Twice daily · 3 days", qty: 6,  unitPrice: 2.5  },
  { id: 2, name: "Cetirizine",   dosage: "10 mg",  sig: "1 tablet · Once daily · 5 days",  qty: 5,  unitPrice: 4.0  },
  { id: 3, name: "Ambroxol",     dosage: "30 mg",  sig: "1 tablet · Three times daily · 5 days", qty: 15, unitPrice: 3.5 },
];
const DELIVERY_FEE = 25;
const SUBTOTAL = MEDICINES.reduce((s, m) => s + m.qty * m.unitPrice, 0);
const TOTAL = SUBTOTAL + DELIVERY_FEE;

// ─── Progress bar ─────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Pharmacy Selected", done: true  },
  { label: "Medicines",         done: true  },
  { label: "Checkout",          done: false, current: true },
  { label: "Order Tracking",    done: false },
];

function ProgressBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {STEPS.map((step, i) => {
        const isLast = i === STEPS.length - 1;
        return (
          <div key={step.label} style={{ display: "flex", alignItems: "center", flex: isLast ? 0 : 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step.done ? T.primary : step.current ? T.navy : T.border,
                border: step.current ? `2px solid ${T.primary}` : "2px solid transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {step.done ? (
                  <Icon d={ic.check} size={13} stroke="#fff" />
                ) : (
                  <span style={{ fontSize: 11, fontWeight: 700, color: step.current ? "#fff" : T.grayLight }}>
                    {i + 1}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: 10, fontWeight: step.current ? 700 : 500,
                color: step.done || step.current ? T.navy : T.grayLight,
                whiteSpace: "nowrap" as const,
              }}>
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div style={{
                flex: 1, height: 2, background: step.done ? T.primary : T.border,
                margin: "0 6px", marginBottom: 20, minWidth: 24,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Radio option ─────────────────────────────────────────────────────────────
function RadioCard({
  selected, onSelect, label, sub, icon,
}: { selected: boolean; onSelect: () => void; label: string; sub: string; icon: string }) {
  return (
    <button
      onClick={onSelect}
      style={{
        display: "flex", alignItems: "center", gap: 14, width: "100%",
        padding: "12px 16px", borderRadius: 9, cursor: "pointer",
        border: `1.5px solid ${selected ? T.primary : T.border}`,
        background: selected ? T.primaryLight : T.white,
        fontFamily: "Inter, system-ui, sans-serif", textAlign: "left",
        transition: "border-color 0.13s, background 0.13s",
      }}
    >
      {/* Radio dot */}
      <div style={{
        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${selected ? T.primary : T.grayLight}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.primary }} />}
      </div>

      <div style={{ width: 32, height: 32, borderRadius: 8, background: selected ? T.primary : T.muted, border: `1px solid ${selected ? T.primary : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={15} stroke={selected ? "#fff" : T.gray} />
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{label}</div>
        <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{sub}</div>
      </div>
    </button>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</span>
        {action}
      </div>
      <div style={{ padding: "18px 20px" }}>
        {children}
      </div>
    </div>
  );
}

function TextBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: T.primary, fontFamily: "Inter, system-ui, sans-serif", padding: 0 }}>
      {label}
    </button>
  );
}

// ─── Row ─────────────────────────────────────────────────────────────────────
function SummaryRow({ label, value, bold, green }: { label: string; value: string; bold?: boolean; green?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: bold ? 0 : 8 }}>
      <span style={{ fontSize: bold ? 14 : 13, fontWeight: bold ? 700 : 400, color: bold ? T.navy : T.gray }}>{label}</span>
      <span style={{ fontSize: bold ? 15 : 13, fontWeight: bold ? 700 : 500, color: green ? T.success : bold ? T.primary : T.navy }}>
        {value}
      </span>
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────
function OrderSuccess({ onTrack, onViewRx, onBack }: { onTrack: () => void; onViewRx: () => void; onBack: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, height: 56, display: "flex", alignItems: "center", padding: "0 28px", gap: 12, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={ic.heart} size={12} stroke="#fff" />
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>MediKiosk</span>
        <div style={{ flex: 1 }} />
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: T.gray, fontFamily: "Inter, system-ui, sans-serif" }}>Return to Dashboard</button>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <div style={{ width: "100%", maxWidth: 520 }}>
          {/* Success card */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 14, padding: "40px 36px", textAlign: "center", marginBottom: 16 }}>
            {/* Icon */}
            <div style={{
              width: 68, height: 68, borderRadius: "50%",
              background: T.successLight, border: `2px solid ${T.successBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Icon d={ic.checkCircle} size={30} stroke={T.success} />
            </div>

            <div style={{ fontSize: 20, fontWeight: 700, color: T.navy, marginBottom: 8, letterSpacing: "-0.02em" }}>
              Order Placed Successfully
            </div>
            <p style={{ margin: "0 0 28px", fontSize: 13, color: T.gray, lineHeight: 1.65 }}>
              Your medicines have been ordered from <strong style={{ color: T.navy }}>MediCare Pharmacy</strong>.<br />
              You will receive a confirmation on your registered mobile.
            </p>

            {/* Order meta */}
            <div style={{ background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, padding: "14px 18px", marginBottom: 24, textAlign: "left" }}>
              {[
                { label: "Order ID",           value: "MK-ORD-2026-01842" },
                { label: "Pharmacy",           value: "MediCare Pharmacy" },
                { label: "Estimated delivery", value: "30–45 minutes" },
                { label: "Payment",            value: "Pay at Delivery" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: T.gray }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Medicines list */}
            <div style={{ textAlign: "left", marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 10 }}>MEDICINES ORDERED</div>
              {MEDICINES.map((m) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon d={ic.pill} size={12} stroke={T.primary} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{m.name} {m.dosage}</span>
                    <span style={{ fontSize: 11, color: T.grayLight }}> · {m.qty} units</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>₹{(m.qty * m.unitPrice).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Total paid</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: T.primary }}>₹{TOTAL.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={onTrack}
                style={{
                  flex: 1, padding: "11px", background: T.primary, border: "none", borderRadius: 9,
                  fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
                  fontFamily: "Inter, system-ui, sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                }}
              >
                <Icon d={ic.package} size={15} stroke="#fff" />
                Track Order
              </button>
              <button
                onClick={onViewRx}
                style={{
                  flex: 1, padding: "11px", background: T.white,
                  border: `1px solid ${T.border}`, borderRadius: 9,
                  fontSize: 13, fontWeight: 600, color: T.navy, cursor: "pointer",
                  fontFamily: "Inter, system-ui, sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                }}
              >
                <Icon d={ic.fileText} size={15} stroke={T.gray} />
                View Prescription
              </button>
            </div>
          </div>

          {/* Safety footer */}
          <div style={{ padding: "12px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, display: "flex", gap: 9, alignItems: "flex-start" }}>
            <Icon d={ic.shield} size={13} stroke={T.primary} />
            <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
              Medicines are being dispensed against a doctor-approved prescription. Any substitution requires pharmacist or clinical approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PharmacyCheckout({
  onBack,
  onSuccess,
}: { onBack: () => void; onSuccess?: () => void }) {
  const [delivery,  setDelivery]  = useState<"home" | "pickup">("home");
  const [payment,   setPayment]   = useState<"cod" | "mock">("cod");
  const [placing,   setPlacing]   = useState(false);
  const [placed,    setPlaced]    = useState(false);

  const deliveryFee = delivery === "home" ? DELIVERY_FEE : 0;
  const total       = SUBTOTAL + deliveryFee;

  function handlePlaceOrder() {
    setPlacing(true);
    setTimeout(() => { setPlacing(false); setPlaced(true); onSuccess?.(); }, 1100);
  }

  if (placed) {
    return (
      <OrderSuccess
        onTrack={() => {}}
        onViewRx={() => {}}
        onBack={onBack}
      />
    );
  }

  // ── Sidebar: order summary ────────────────────────────────────────────────
  const orderSummaryPanel = (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Summary card */}
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Order Summary</span>
        </div>
        <div style={{ padding: "16px 20px" }}>
          {/* Items */}
          <div style={{ marginBottom: 16 }}>
            {MEDICINES.map((m, i) => (
              <div key={m.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                paddingBottom: 10, marginBottom: 10,
                borderBottom: i < MEDICINES.length - 1 ? `1px solid ${T.border}` : "none",
              }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{m.name} {m.dosage}</div>
                  <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>Qty: {m.qty}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>₹{(m.qty * m.unitPrice).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
            <SummaryRow label="Medicines subtotal" value={`₹${SUBTOTAL.toFixed(2)}`} />
            <SummaryRow
              label="Delivery fee"
              value={deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
              green={deliveryFee === 0}
            />
            <div style={{ height: 1, background: T.border, margin: "10px 0" }} />
            <SummaryRow label="Total" value={`₹${total.toFixed(2)}`} bold />
          </div>
        </div>
      </div>

      {/* Place order */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          style={{
            width: "100%", padding: "13px",
            background: placing ? T.grayLight : T.primary,
            border: "none", borderRadius: 9,
            fontSize: 14, fontWeight: 700, color: "#fff",
            cursor: placing ? "default" : "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.15s",
          }}
        >
          {placing ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                  <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite"/>
                </path>
              </svg>
              Placing Order…
            </>
          ) : (
            <>
              <Icon d={ic.check} size={16} stroke="#fff" />
              Place Order · ₹{total.toFixed(2)}
            </>
          )}
        </button>
        <p style={{ margin: 0, fontSize: 11, color: T.grayLight, textAlign: "center", lineHeight: 1.5 }}>
          By placing this order, you confirm that the order details are correct.
        </p>
      </div>

      {/* Safety notice */}
      <div style={{ padding: "10px 14px", background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
        <Icon d={ic.alertTri} size={13} stroke={T.amber} />
        <div>
          <p style={{ margin: "0 0 3px", fontSize: 11, fontWeight: 600, color: "#92400e" }}>Prescription-only medicines</p>
          <p style={{ margin: 0, fontSize: 11, color: "#92400e", lineHeight: 1.5 }}>
            Medicines are being ordered against a doctor-approved prescription. Any change or substitution requires clinical approval.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, display: "flex", flexDirection: "column" }}>

      {/* ── Sticky header ── */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        {/* Top bar */}
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 28px", gap: 14 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.gray, fontSize: 13, fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif", padding: "4px 0" }}>
            <Icon d={ic.chevLeft} size={15} stroke={T.gray} />
            Back
          </button>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={12} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Review & Checkout</div>
              <div style={{ fontSize: 10, color: T.grayLight }}>MediKiosk Pharmacy</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          {/* Patient chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 20 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>R</div>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>Rahul Sharma</span>
          </div>
        </div>

        {/* Progress */}
        <div style={{ padding: "14px 28px 16px", borderTop: `1px solid ${T.border}` }}>
          <ProgressBar />
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "minmax(0,1fr) 320px",
        gap: 24, padding: "28px 28px 60px",
        maxWidth: 1120, width: "100%", margin: "0 auto",
        boxSizing: "border-box" as const, alignItems: "start",
      }}>

        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Selected pharmacy */}
          <Section title="Selected Pharmacy" action={<TextBtn label="Change Pharmacy" />}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={ic.store} size={19} stroke={T.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>MediCare Pharmacy</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.success, background: T.successLight, border: `1px solid ${T.successBorder}`, padding: "2px 8px", borderRadius: 20 }}>✓ Verified Pharmacy</span>
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  {[
                    { icon: ic.mapPin, text: "1.8 km away" },
                    { icon: ic.clock, text: "30–45 min delivery" },
                  ].map((row) => (
                    <div key={row.text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Icon d={row.icon} size={12} stroke={T.grayLight} />
                      <span style={{ fontSize: 12, color: T.gray }}>{row.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.success }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.success }}>All prescribed medicines available</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Delivery details */}
          <Section title="Delivery Details">
            {/* Address */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 10 }}>HOME ADDRESS</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: T.blueLight, border: `1px solid ${T.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon d={ic.mapMarker} size={16} stroke={T.blue} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>Rahul Sharma</div>
                  <div style={{ fontSize: 12, color: T.gray, marginTop: 2, lineHeight: 1.5 }}>
                    B-204, Sunshine Apartments, Malviya Nagar<br />
                    Jaipur, Rajasthan — 302 017
                  </div>
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", background: "none", border: `1px solid ${T.border}`, borderRadius: 7, fontSize: 11, fontWeight: 600, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
                  <Icon d={ic.edit} size={11} stroke={T.gray} />
                  Change
                </button>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: T.border, marginBottom: 16 }} />

            {/* Delivery / pickup toggle */}
            <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 10 }}>FULFILLMENT METHOD</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <RadioCard
                selected={delivery === "home"}
                onSelect={() => setDelivery("home")}
                label="Home Delivery"
                sub="30–45 min · ₹25 delivery fee"
                icon={ic.truck}
              />
              <RadioCard
                selected={delivery === "pickup"}
                onSelect={() => setDelivery("pickup")}
                label="Pharmacy Pickup"
                sub="Ready in approximately 20–30 min · Free"
                icon={ic.store}
              />
            </div>
          </Section>

          {/* Prescription medicines */}
          <Section title="Prescription Medicines">
            {/* Rx badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "9px 14px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 8 }}>
              <Icon d={ic.fileText} size={14} stroke={T.primary} />
              <span style={{ fontSize: 12, fontWeight: 600, color: T.primary }}>Medicines sourced from prescription — MKP-2026-4821</span>
              <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: T.success, background: T.successLight, border: `1px solid ${T.successBorder}`, padding: "2px 8px", borderRadius: 20 }}>✓ Approved</span>
            </div>

            {MEDICINES.map((m, i) => (
              <div
                key={m.id}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 0",
                  borderBottom: i < MEDICINES.length - 1 ? `1px solid ${T.border}` : "none",
                }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 8, background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon d={ic.pill} size={15} stroke={T.gray} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{m.name} <span style={{ fontWeight: 400, color: T.gray }}>{m.dosage}</span></div>
                  <div style={{ fontSize: 11, color: T.grayLight, marginTop: 2 }}>{m.sig}</div>
                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: T.navy }}>Quantity: {m.qty}</span>
                    <span style={{ fontSize: 10, color: T.grayLight }}>·</span>
                    <span style={{ fontSize: 11, color: T.success, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon d={ic.check} size={11} stroke={T.success} />
                      Prescription approved
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>₹{(m.qty * m.unitPrice).toFixed(2)}</div>
                  <div style={{ fontSize: 10, color: T.grayLight, marginTop: 2 }}>₹{m.unitPrice}/unit</div>
                </div>
              </div>
            ))}

            {/* Note */}
            <div style={{ marginTop: 14, padding: "9px 13px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7, display: "flex", gap: 7, alignItems: "flex-start" }}>
              <Icon d={ic.info} size={13} stroke={T.grayLight} />
              <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
                Dosage and frequency are set by your doctor and cannot be changed here. To adjust the prescription, contact your doctor.
              </p>
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment">
            <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.amber, background: T.amberLight, border: `1px solid ${T.amberBorder}`, padding: "2px 9px", borderRadius: 20 }}>Demo payment mode</span>
              <span style={{ fontSize: 11, color: T.grayLight }}>No real transaction will occur</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <RadioCard
                selected={payment === "cod"}
                onSelect={() => setPayment("cod")}
                label="Pay at Delivery"
                sub="Pay cash or UPI when medicines arrive"
                icon={ic.cash}
              />
              <RadioCard
                selected={payment === "mock"}
                onSelect={() => setPayment("mock")}
                label="Mock Online Payment"
                sub="Simulated card/UPI — no actual charge"
                icon={ic.creditCard}
              />
            </div>
          </Section>

          {/* Safety notice */}
          <div style={{ padding: "14px 18px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={ic.shield} size={16} stroke={T.primary} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Safety Notice</div>
              <p style={{ margin: "0 0 4px", fontSize: 12, color: T.gray, lineHeight: 1.6 }}>
                Medicines are being ordered against a doctor-approved prescription.
              </p>
              <p style={{ margin: 0, fontSize: 12, color: T.gray, lineHeight: 1.6 }}>
                Any prescription change or medicine substitution requires appropriate clinical or pharmacy approval.
              </p>
            </div>
          </div>

        </div>

        {/* ── RIGHT: sticky order summary ── */}
        <div style={{ position: "sticky", top: 130 }}>
          {orderSummaryPanel}
        </div>
      </div>
    </div>
  );
}

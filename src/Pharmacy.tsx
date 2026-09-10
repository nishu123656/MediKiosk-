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
  chevRight:   "M9 18l6-6-6-6",
  chevDown:    "M19 9l-7 7-7-7",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mapPin:      "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
  bell:        "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  cart:        "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  truck:       "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  store:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  plus:        "M12 5v14M5 12h14",
  minus:       "M5 12h14",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  filter:      "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  x:           "M18 6L6 18M6 6l12 12",
  star:        "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  home:        "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
};

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  primary:       "#0d7a6e",
  primaryLight:  "#f0fdf9",
  primaryBorder: "#b2e8e0",
  primaryDark:   "#095f55",
  navy:          "#0f1f3d",
  gray:          "#64748b",
  grayLight:     "#94a3b8",
  bg:            "#f5f7fa",
  white:         "#ffffff",
  border:        "#e8ecf0",
  muted:         "#f8fafc",
  danger:        "#e84b4b",
  dangerLight:   "#fff5f5",
  dangerBorder:  "#fecaca",
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
interface RxMed { id: number; name: string; dosage: string; freq: string; days: number; qty: number; unitPrice: number; }
const RX_MEDS: RxMed[] = [
  { id: 1, name: "Paracetamol",  dosage: "500 mg", freq: "Twice daily",  days: 3, qty: 6,  unitPrice: 2.5  },
  { id: 2, name: "Cetirizine",   dosage: "10 mg",  freq: "Once daily",   days: 5, qty: 5,  unitPrice: 4.0  },
  { id: 3, name: "Ambroxol",     dosage: "30 mg",  freq: "Three times daily", days: 5, qty: 15, unitPrice: 3.5 },
];

interface Pharmacy {
  id: number; name: string; distance: string;
  delivery: string; pickup: boolean;
  availability: "all" | "partial" | "none";
  unavailable: string[];
  rating: number; reviews: number;
  deliveryFee: number;
}
const PHARMACIES: Pharmacy[] = [
  { id: 1, name: "MediCare Pharmacy",   distance: "1.8 km", delivery: "30–45 min", pickup: true,  availability: "all",     unavailable: [],            rating: 4.8, reviews: 312, deliveryFee: 25  },
  { id: 2, name: "HealthPlus Pharmacy", distance: "3.2 km", delivery: "45–60 min", pickup: false, availability: "partial", unavailable: ["Ambroxol"],  rating: 4.5, reviews: 180, deliveryFee: 35  },
  { id: 3, name: "Jan Aushadhi Store",  distance: "4.5 km", delivery: "60–90 min", pickup: true,  availability: "all",     unavailable: [],            rating: 4.2, reviews: 95,  deliveryFee: 0   },
];

type FilterId = "nearby" | "all-available" | "fast" | "pickup" | "lowest-fee";
const FILTERS: { id: FilterId; label: string }[] = [
  { id: "nearby",       label: "Nearby"               },
  { id: "all-available",label: "All medicines available" },
  { id: "fast",         label: "Fast delivery"         },
  { id: "pickup",       label: "Pickup available"      },
  { id: "lowest-fee",   label: "Lowest delivery fee"   },
];

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${border}`, padding: "2px 9px", borderRadius: 20, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <Icon d={ic.star} size={12} stroke={T.amber} fill={T.amber} />
      <span style={{ fontSize: 11, fontWeight: 600, color: T.navy }}>{rating.toFixed(1)}</span>
    </span>
  );
}

// ─── Qty stepper ─────────────────────────────────────────────────────────────
function QtyStepper({ value, max, onChange }: { value: number; max: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden" }}>
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        style={{ width: 28, height: 28, background: T.muted, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.gray }}
      >
        <Icon d={ic.minus} size={12} stroke="currentColor" />
      </button>
      <span style={{ width: 32, textAlign: "center", fontSize: 13, fontWeight: 600, color: T.navy, lineHeight: "28px" }}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        style={{ width: 28, height: 28, background: T.muted, border: "none", cursor: value >= max ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: value >= max ? T.border : T.gray }}
      >
        <Icon d={ic.plus} size={12} stroke="currentColor" />
      </button>
    </div>
  );
}

// ─── Pharmacy card ────────────────────────────────────────────────────────────
function PharmacyCard({
  pharmacy, selected, onSelect,
}: { pharmacy: Pharmacy; selected: boolean; onSelect: () => void }) {
  const avBg    = pharmacy.availability === "all"     ? T.successLight : pharmacy.availability === "partial" ? T.amberLight : T.dangerLight;
  const avColor = pharmacy.availability === "all"     ? T.success      : pharmacy.availability === "partial" ? T.amber      : T.danger;
  const avBd    = pharmacy.availability === "all"     ? T.successBorder: pharmacy.availability === "partial" ? T.amberBorder: T.dangerBorder;
  const avLabel = pharmacy.availability === "all"     ? "All medicines available" : pharmacy.availability === "partial" ? "1 medicine unavailable" : "Not stocked";

  return (
    <div style={{
      background: T.white, border: `1px solid ${selected ? T.primary : T.border}`,
      borderLeft: selected ? `3px solid ${T.primary}` : `3px solid transparent`,
      borderRadius: "0 10px 10px 0",
      padding: "14px 16px", transition: "border-color 0.13s",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        {/* Icon */}
        <div style={{ width: 38, height: 38, borderRadius: 9, background: selected ? T.primaryLight : T.muted, border: `1px solid ${selected ? T.primaryBorder : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={ic.store} size={17} stroke={selected ? T.primary : T.gray} />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, flexWrap: "wrap" as const }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{pharmacy.name}</span>
            <Badge label="✓ Verified" color={T.success} bg={T.successLight} border={T.successBorder} />
            {pharmacy.deliveryFee === 0 && <Badge label="Free delivery" color={T.primary} bg={T.primaryLight} border={T.primaryBorder} />}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" as const, marginBottom: 7 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon d={ic.mapPin} size={12} stroke={T.grayLight} />
              <span style={{ fontSize: 12, color: T.gray }}>{pharmacy.distance}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon d={ic.truck} size={12} stroke={T.grayLight} />
              <span style={{ fontSize: 12, color: T.gray }}>Delivery: {pharmacy.delivery}</span>
            </div>
            {pharmacy.pickup && (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Icon d={ic.store} size={12} stroke={T.grayLight} />
                <span style={{ fontSize: 12, color: T.gray }}>Pickup available</span>
              </div>
            )}
            <Stars rating={pharmacy.rating} />
            <span style={{ fontSize: 11, color: T.grayLight }}>({pharmacy.reviews} reviews)</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge label={avLabel} color={avColor} bg={avBg} border={avBd} />
            {pharmacy.deliveryFee > 0 && <span style={{ fontSize: 11, color: T.grayLight }}>Delivery fee: ₹{pharmacy.deliveryFee}</span>}
          </div>

          {pharmacy.unavailable.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "flex-start", gap: 6 }}>
              <Icon d={ic.alertTri} size={12} stroke={T.amber} />
              <span style={{ fontSize: 11, color: "#92400e" }}>
                {pharmacy.unavailable.join(", ")} not available at this pharmacy.
              </span>
            </div>
          )}
        </div>

        {/* Action */}
        <div style={{ flexShrink: 0 }}>
          <button
            onClick={onSelect}
            style={{
              padding: "7px 16px",
              background: selected ? T.primary : T.white,
              border: `1px solid ${selected ? T.primary : T.primaryBorder}`,
              borderRadius: 8, fontSize: 12, fontWeight: 600,
              color: selected ? "#fff" : T.primary,
              cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
              transition: "all 0.13s",
            }}
          >
            {selected ? "Selected" : pharmacy.availability === "partial" ? "View Availability" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Order summary panel ──────────────────────────────────────────────────────
function OrderSummary({
  meds, quantities, pharmacy, deliveryType, onCheckout, ordered,
}: {
  meds: RxMed[];
  quantities: Record<number, number>;
  pharmacy: Pharmacy | null;
  deliveryType: "delivery" | "pickup";
  onCheckout: () => void;
  ordered: boolean;
}) {
  const subtotal    = meds.reduce((sum, m) => sum + (quantities[m.id] ?? m.qty) * m.unitPrice, 0);
  const deliveryFee = deliveryType === "pickup" ? 0 : (pharmacy?.deliveryFee ?? 0);
  const total       = subtotal + deliveryFee;

  if (ordered) {
    return (
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, padding: "20px 18px" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.successLight, border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <Icon d={ic.checkCircle} size={22} stroke={T.success} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Order Placed</div>
          <p style={{ margin: 0, fontSize: 12, color: T.gray, lineHeight: 1.5 }}>
            Your prescription order has been sent to <strong>{pharmacy?.name}</strong>. You will receive a confirmation shortly.
          </p>
        </div>
        <div style={{ padding: "10px 12px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.primary, marginBottom: 2 }}>ORDER ID: MKP-2026-4821</div>
          <div style={{ fontSize: 11, color: T.gray }}>Estimated {deliveryType === "pickup" ? "ready" : "delivery"}: {pharmacy?.delivery}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ flex: 1, padding: "8px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
            Track Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Order Summary</div>
      </div>

      {/* Pharmacy */}
      <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>SELECTED PHARMACY</div>
        {pharmacy ? (
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.store} size={14} stroke={T.primary} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{pharmacy.name}</div>
              <div style={{ fontSize: 11, color: T.grayLight }}>{pharmacy.distance} · {pharmacy.delivery}</div>
            </div>
            <Badge label="✓ Verified" color={T.success} bg={T.successLight} border={T.successBorder} />
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: 12, color: T.grayLight, fontStyle: "italic" }}>No pharmacy selected</p>
        )}
      </div>

      {/* Delivery type */}
      {pharmacy && (
        <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>FULFILLMENT</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon d={deliveryType === "delivery" ? ic.truck : ic.store} size={13} stroke={T.primary} />
              <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>
                {deliveryType === "delivery" ? "Home Delivery" : "Store Pickup"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Items */}
      <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>MEDICINES</div>
        {meds.map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div>
              <span style={{ fontSize: 12, color: T.navy }}>{m.name} {m.dosage}</span>
              <span style={{ fontSize: 11, color: T.grayLight }}> × {quantities[m.id] ?? m.qty}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>₹{((quantities[m.id] ?? m.qty) * m.unitPrice).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}` }}>
        {[
          { label: "Subtotal",     val: `₹${subtotal.toFixed(2)}` },
          { label: "Delivery fee", val: deliveryFee === 0 ? "Free" : `₹${deliveryFee}` },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 12, color: T.gray }}>{row.label}</span>
            <span style={{ fontSize: 12, color: row.val === "Free" ? T.success : T.navy, fontWeight: row.val === "Free" ? 600 : 400 }}>{row.val}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Total</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.primary }}>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout */}
      <div style={{ padding: "14px 18px" }}>
        <button
          onClick={onCheckout}
          disabled={!pharmacy}
          style={{
            width: "100%", padding: "11px",
            background: pharmacy ? T.primary : T.muted,
            border: "none", borderRadius: 9,
            fontSize: 13, fontWeight: 700,
            color: pharmacy ? "#fff" : T.grayLight,
            cursor: pharmacy ? "pointer" : "default",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <Icon d={ic.arrowRight} size={15} stroke={pharmacy ? "#fff" : T.grayLight} />
          Proceed to Checkout
        </button>
        {!pharmacy && <p style={{ margin: "8px 0 0", fontSize: 11, color: T.grayLight, textAlign: "center" }}>Select a pharmacy above to continue</p>}

        {/* Safety notice */}
        <div style={{ marginTop: 12, padding: "8px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7 }}>
          <p style={{ margin: 0, fontSize: 10, color: T.gray, lineHeight: 1.55 }}>
            Prescription medicines are supplied according to the approved prescription. Any substitution requires pharmacist or doctor approval.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Pharmacy({ onBack, onCheckout }: { onBack: () => void; onCheckout?: () => void }) {
  const w              = useW();
  const isMobile       = w < 640;
  const isTablet       = w >= 640 && w < 1024;

  const [search,       setSearch]       = useState("");
  const [searchFocused,setSearchFocused]= useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterId[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(PHARMACIES[0]);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [quantities,   setQuantities]   = useState<Record<number, number>>(() =>
    Object.fromEntries(RX_MEDS.map((m) => [m.id, m.qty]))
  );
  const [cartOpen,     setCartOpen]     = useState(false);
  const [ordered,      setOrdered]      = useState(false);
  const [rxExpanded,   setRxExpanded]   = useState(true);

  function toggleFilter(id: FilterId) {
    setActiveFilters((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  }

  const filteredPharmacies = PHARMACIES.filter((p) => {
    if (activeFilters.includes("all-available") && p.availability !== "all") return false;
    if (activeFilters.includes("pickup") && !p.pickup) return false;
    if (activeFilters.includes("fast") && !p.delivery.startsWith("30")) return false;
    if (activeFilters.includes("lowest-fee") && p.deliveryFee !== 0) return false;
    return true;
  });

  const totalItems = RX_MEDS.reduce((s, m) => s + (quantities[m.id] ?? m.qty), 0);
  const subtotal   = RX_MEDS.reduce((s, m) => s + (quantities[m.id] ?? m.qty) * m.unitPrice, 0);

  const narrow = isMobile || isTablet;

  // ── Checkout ──
  function handleCheckout() {
    if (onCheckout) { onCheckout(); return; }
    setOrdered(true);
    setCartOpen(false);
  }

  // ── Shared content ────────────────────────────────────────────────────────
  const prescriptionSection = (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden", marginBottom: narrow ? 16 : 0 }}>
      {/* Header */}
      <div style={{
        padding: "12px 18px", background: T.navy,
        display: "flex", alignItems: "center", gap: 12,
        cursor: "pointer",
      }} onClick={() => setRxExpanded((v) => !v)}>
        <div style={{ width: 32, height: 32, borderRadius: 7, background: T.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={ic.fileText} size={15} stroke="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Your Active Prescription</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>Dr. Mehta · 10 September 2026</div>
        </div>
        <Badge label="Active" color={T.success} bg="rgba(22,163,74,0.2)" border="rgba(22,163,74,0.3)" />
        <Icon d={rxExpanded ? ic.chevDown : ic.chevRight} size={14} stroke="rgba(255,255,255,0.45)" />
      </div>

      {rxExpanded && (
        <>
          {/* Medicines list */}
          <div style={{ padding: "0 18px" }}>
            {RX_MEDS.map((m, i) => (
              <div key={m.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 0",
                borderBottom: i < RX_MEDS.length - 1 ? `1px solid ${T.border}` : "none",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon d={ic.pill} size={13} stroke={T.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{m.name} <span style={{ color: T.gray, fontWeight: 400 }}>{m.dosage}</span></div>
                  <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>{m.freq} · {m.days} days · {m.qty} tablets prescribed</div>
                </div>
                <Badge label="Rx" color={T.primary} bg={T.primaryLight} border={T.primaryBorder} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ padding: "12px 18px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <p style={{ margin: 0, fontSize: 11, color: T.grayLight, flex: 1, lineHeight: 1.5 }}>
              Only doctor-approved medicines can be added through this prescription.
            </p>
            <button
              onClick={() => selectedPharmacy && setRxExpanded(false)}
              style={{
                padding: "8px 16px", background: T.primary, border: "none", borderRadius: 8,
                fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer",
                fontFamily: "Inter, system-ui, sans-serif",
                display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" as const,
              }}
            >
              Order from Prescription
              <Icon d={ic.arrowRight} size={13} stroke="#fff" />
            </button>
          </div>
        </>
      )}
    </div>
  );

  const pharmacyFilters = (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 14 }}>
      {FILTERS.map((f) => {
        const active = activeFilters.includes(f.id);
        return (
          <button key={f.id} onClick={() => toggleFilter(f.id)} style={{
            padding: "5px 13px", borderRadius: 20,
            border: `1px solid ${active ? T.primary : T.border}`,
            background: active ? T.primaryLight : T.white,
            color: active ? T.primary : T.gray,
            fontSize: 12, fontWeight: active ? 600 : 400,
            cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            {active && <Icon d={ic.check} size={11} stroke={T.primary} />}
            {f.label}
          </button>
        );
      })}
      {activeFilters.length > 0 && (
        <button onClick={() => setActiveFilters([])} style={{
          padding: "5px 12px", borderRadius: 20, border: `1px solid ${T.border}`,
          background: "none", color: T.grayLight, fontSize: 12, cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4,
        }}>
          <Icon d={ic.x} size={11} stroke={T.grayLight} />
          Clear
        </button>
      )}
    </div>
  );

  const pharmacyList = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {filteredPharmacies.length === 0 ? (
        <div style={{ padding: "28px 0", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 13, color: T.grayLight }}>No pharmacies match the selected filters.</p>
        </div>
      ) : filteredPharmacies.map((p) => (
        <PharmacyCard
          key={p.id} pharmacy={p}
          selected={selectedPharmacy?.id === p.id}
          onSelect={() => setSelectedPharmacy(p)}
        />
      ))}
    </div>
  );

  const medicineTable = (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
      {/* Section head */}
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
        <Icon d={ic.pill} size={14} stroke={T.primary} />
        <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>Prescription Medicines</span>
        <Badge label={`${RX_MEDS.length} items`} color={T.gray} bg={T.muted} border={T.border} />
      </div>

      {/* Table header — desktop only */}
      {!isMobile && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 90px 110px 110px", gap: 0, background: T.muted, borderBottom: `1px solid ${T.border}` }}>
          {["Medicine", "Dosage", "Frequency", "Duration", "Quantity", "Price"].map((h) => (
            <div key={h} style={{ padding: "8px 16px", fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.06em" }}>{h.toUpperCase()}</div>
          ))}
        </div>
      )}

      {RX_MEDS.map((m, i) => {
        const qty = quantities[m.id] ?? m.qty;
        return isMobile ? (
          /* Mobile row */
          <div key={m.id} style={{ padding: "12px 16px", borderBottom: i < RX_MEDS.length - 1 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{m.name} <span style={{ color: T.gray, fontWeight: 400 }}>{m.dosage}</span></div>
                <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>{m.freq} · {m.days} days</div>
              </div>
              <Badge label={selectedPharmacy ? "Available" : "—"} color={T.success} bg={T.successLight} border={T.successBorder} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <QtyStepper value={qty} max={m.qty} onChange={(v) => setQuantities((q) => ({ ...q, [m.id]: v }))} />
              <span style={{ fontSize: 13, fontWeight: 600, color: T.primary }}>₹{(qty * m.unitPrice).toFixed(2)}</span>
            </div>
          </div>
        ) : (
          /* Desktop row */
          <div key={m.id} style={{
            display: "grid", gridTemplateColumns: "1fr 120px 120px 90px 110px 110px",
            gap: 0, alignItems: "center",
            background: i % 2 === 0 ? T.white : T.muted,
            borderBottom: `1px solid ${T.border}`,
          }}>
            <div style={{ padding: "12px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{m.name}</div>
              <div style={{ fontSize: 11, color: T.grayLight, marginTop: 1 }}>Prescription required</div>
            </div>
            <div style={{ padding: "12px 16px", fontSize: 12, color: T.navy }}>{m.dosage}</div>
            <div style={{ padding: "12px 16px", fontSize: 12, color: T.navy }}>{m.freq}</div>
            <div style={{ padding: "12px 16px", fontSize: 12, color: T.navy }}>{m.days} days</div>
            <div style={{ padding: "12px 16px" }}>
              <QtyStepper value={qty} max={m.qty} onChange={(v) => setQuantities((q) => ({ ...q, [m.id]: v }))} />
              <div style={{ fontSize: 10, color: T.grayLight, marginTop: 3 }}>max: {m.qty} (prescribed)</div>
            </div>
            <div style={{ padding: "12px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.primary }}>₹{(qty * m.unitPrice).toFixed(2)}</div>
              <div style={{ fontSize: 10, color: T.grayLight }}>₹{m.unitPrice}/unit</div>
            </div>
          </div>
        );
      })}

      {/* Dosage safety note */}
      <div style={{ padding: "10px 18px", background: T.blueLight, borderTop: `1px solid ${T.blueBorder}`, display: "flex", gap: 8, alignItems: "flex-start" }}>
        <Icon d={ic.info} size={13} stroke={T.blue} />
        <p style={{ margin: 0, fontSize: 11, color: T.blue, lineHeight: 1.5 }}>
          Quantity is limited to the prescribed amount. Dosage and frequency cannot be modified. Contact your doctor to update the prescription.
        </p>
      </div>
    </div>
  );

  const deliveryToggle = selectedPharmacy && (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 18px", marginBottom: narrow ? 16 : 0 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 10 }}>Fulfillment</div>
      <div style={{ display: "flex", gap: 8 }}>
        {(["delivery", "pickup"] as const).filter((t) => t === "delivery" || selectedPharmacy.pickup).map((t) => (
          <button key={t} onClick={() => setDeliveryType(t)} style={{
            flex: 1, padding: "9px 12px",
            background: deliveryType === t ? T.primaryLight : T.muted,
            border: `1px solid ${deliveryType === t ? T.primaryBorder : T.border}`,
            borderRadius: 8, cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          }}>
            <Icon d={t === "delivery" ? ic.truck : ic.store} size={14} stroke={deliveryType === t ? T.primary : T.gray} />
            <span style={{ fontSize: 12, fontWeight: deliveryType === t ? 700 : 400, color: deliveryType === t ? T.primary : T.gray }}>
              {t === "delivery" ? "Home Delivery" : "Store Pickup"}
            </span>
            {t === "delivery" && selectedPharmacy.deliveryFee === 0 && (
              <span style={{ fontSize: 10, fontWeight: 700, color: T.success }}>Free</span>
            )}
            {t === "delivery" && selectedPharmacy.deliveryFee > 0 && (
              <span style={{ fontSize: 10, color: T.grayLight }}>₹{selectedPharmacy.deliveryFee}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // ── Layout ────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy }}>

      {/* ── Header ── */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 30 }}>
        {/* Primary bar */}
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 24px", gap: 12 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.gray, fontSize: 13, fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif", padding: "4px 0" }}>
            <Icon d={ic.chevLeft} size={15} stroke={T.gray} />
            {!isMobile && "Back"}
          </button>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={12} stroke="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Pharmacy</div>
              {!isMobile && <div style={{ fontSize: 10, color: T.grayLight }}>Verified prescription medicines</div>}
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Location */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 11px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 20, cursor: "pointer" }}>
              <Icon d={ic.mapPin} size={13} stroke={T.primary} />
              <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>Andheri West, Mumbai</span>
              <Icon d={ic.chevDown} size={12} stroke={T.grayLight} />
            </div>
          )}

          {/* Bell */}
          <div style={{ position: "relative", cursor: "pointer", padding: 4 }}>
            <Icon d={ic.bell} size={19} stroke={T.gray} />
            <span style={{ position: "absolute", top: 0, right: 0, width: 14, height: 14, background: T.danger, borderRadius: "50%", fontSize: 8, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
          </div>

          {/* Cart */}
          <button onClick={() => setCartOpen((v) => !v)} style={{
            display: "flex", alignItems: "center", gap: 7, padding: "6px 14px",
            background: cartOpen ? T.primaryLight : T.white,
            border: `1px solid ${cartOpen ? T.primaryBorder : T.border}`, borderRadius: 20,
            cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", position: "relative",
          }}>
            <Icon d={ic.cart} size={16} stroke={cartOpen ? T.primary : T.gray} />
            {!isMobile && <span style={{ fontSize: 12, fontWeight: 600, color: cartOpen ? T.primary : T.navy }}>Cart</span>}
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: -5, right: -5, width: 18, height: 18, background: T.primary, borderRadius: "50%", fontSize: 9, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {RX_MEDS.length}
              </span>
            )}
          </button>
        </div>

        {/* Search bar */}
        <div style={{ padding: "10px 24px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ic.search} size={14} stroke={T.grayLight} />
            </span>
            <input
              type="text" placeholder="Search medicines, generics..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              style={{
                width: "100%", padding: "8px 12px 8px 33px", fontSize: 13, color: T.navy,
                border: `1px solid ${searchFocused ? T.primary : T.border}`, borderRadius: 9,
                background: T.muted, outline: "none", transition: "border-color 0.15s",
                fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const,
              }}
            />
          </div>
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, cursor: "pointer", flexShrink: 0 }}>
              <Icon d={ic.mapPin} size={13} stroke={T.primary} />
              <span style={{ fontSize: 11, fontWeight: 500, color: T.navy }}>Andheri</span>
            </div>
          )}
        </div>
      </header>

      {/* ── Body ── */}
      {narrow ? (
        /* Mobile / Tablet stacked */
        <div style={{ flex: 1, padding: "16px 16px 100px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Subtitle */}
          <div>
            <h1 style={{ fontSize: 17, fontWeight: 700, color: T.navy, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Pharmacy</h1>
            <p style={{ margin: 0, fontSize: 12, color: T.gray }}>Order medicines from verified pharmacies using your prescription.</p>
          </div>

          {prescriptionSection}
          {medicineTable}

          {/* Delivery toggle */}
          {deliveryToggle}

          {/* Pharmacies */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Verified Pharmacies</span>
              <Badge label={`${filteredPharmacies.length} nearby`} color={T.gray} bg={T.muted} border={T.border} />
            </div>
            {pharmacyFilters}
            {pharmacyList}
          </div>

          {/* Safety */}
          <div style={{ padding: "10px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Icon d={ic.shield} size={14} stroke={T.primary} />
            <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.55 }}>
              Prescription medicines are supplied according to the approved prescription. Any substitution requires pharmacist or doctor approval.
            </p>
          </div>
        </div>
      ) : (
        /* Desktop three-column */
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 20, padding: "24px 24px 40px", maxWidth: 1200, width: "100%", margin: "0 auto", boxSizing: "border-box" as const, alignItems: "start" }}>

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Page heading */}
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: T.navy, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Pharmacy</h1>
              <p style={{ margin: 0, fontSize: 13, color: T.gray }}>Order medicines from verified pharmacies using your prescription.</p>
            </div>

            {prescriptionSection}

            {/* Pharmacies */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 11, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                <Icon d={ic.store} size={14} stroke={T.primary} />
                <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, flex: 1 }}>Verified Pharmacies</span>
                <Badge label={`${filteredPharmacies.length} nearby`} color={T.gray} bg={T.muted} border={T.border} />
              </div>
              <div style={{ padding: "14px 18px 8px" }}>
                {pharmacyFilters}
                {pharmacyList}
              </div>
            </div>

            {medicineTable}

            {/* Delivery toggle */}
            {deliveryToggle}

            {/* Safety */}
            <div style={{ padding: "12px 16px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon d={ic.shield} size={14} stroke={T.primary} />
              <p style={{ margin: 0, fontSize: 12, color: T.gray, lineHeight: 1.55 }}>
                Prescription medicines are supplied according to the approved prescription. Any substitution should require appropriate pharmacist or doctor approval.
              </p>
            </div>
          </div>

          {/* Right — order summary (sticky) */}
          <div style={{ position: "sticky", top: 110, display: "flex", flexDirection: "column", gap: 14 }}>
            <OrderSummary
              meds={RX_MEDS}
              quantities={quantities}
              pharmacy={selectedPharmacy}
              deliveryType={deliveryType}
              onCheckout={handleCheckout}
              ordered={ordered}
            />
          </div>
        </div>
      )}

      {/* ── Mobile sticky cart / order summary ── */}
      {narrow && (
        <>
          {/* Cart toggle bar */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
            background: T.white, borderTop: `1px solid ${T.border}`,
          }}>
            {cartOpen && (
              <div style={{ padding: "16px 16px 8px", borderBottom: `1px solid ${T.border}`, maxHeight: "60vh", overflowY: "auto" as const }}>
                <OrderSummary
                  meds={RX_MEDS} quantities={quantities}
                  pharmacy={selectedPharmacy} deliveryType={deliveryType}
                  onCheckout={handleCheckout} ordered={ordered}
                />
              </div>
            )}
            <div style={{ padding: "10px 16px", display: "flex", gap: 10, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>
                  {RX_MEDS.length} items · ₹{subtotal.toFixed(2)}
                </div>
                <div style={{ fontSize: 10, color: T.grayLight }}>
                  {selectedPharmacy ? selectedPharmacy.name : "No pharmacy selected"}
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <button
                onClick={() => setCartOpen((v) => !v)}
                style={{
                  padding: "8px 16px", background: cartOpen ? T.muted : T.white,
                  border: `1px solid ${T.border}`, borderRadius: 8,
                  fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {cartOpen ? "Hide" : "View Order"}
              </button>
              <button
                onClick={handleCheckout}
                disabled={!selectedPharmacy || ordered}
                style={{
                  padding: "9px 20px", background: selectedPharmacy && !ordered ? T.primary : T.muted,
                  border: "none", borderRadius: 8,
                  fontSize: 13, fontWeight: 700,
                  color: selectedPharmacy && !ordered ? "#fff" : T.grayLight,
                  cursor: selectedPharmacy && !ordered ? "pointer" : "default",
                  fontFamily: "Inter, system-ui, sans-serif",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {ordered ? "Order placed" : "Checkout"}
                {!ordered && <Icon d={ic.arrowRight} size={13} stroke={selectedPharmacy ? "#fff" : T.grayLight} />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from "react";

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
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  alertTri:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:       "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
  save:        "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  plus:        "M12 5v14M5 12h14",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  print:       "M6 9V2h12v7 M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
  send:        "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  x:           "M18 6L6 18M6 6l12 12",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  pharmacy:    "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h12l-2-9M10 17v-3h4v3",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6z",
  more:        "M12 5h.01M12 12h.01M12 19h.01",
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

// ─── Types ────────────────────────────────────────────────────────────────────
interface RxRow {
  id: number;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  instructions: string;
  timing: "before" | "after" | "with" | "";
}

const FREQ_OPTIONS    = ["Once daily", "Twice daily", "Three times daily", "Four times daily", "As needed (SOS)", "At bedtime", "Every 8 hours", "Every 12 hours"];
const ROUTE_OPTIONS   = ["Oral", "Topical", "Inhaled", "Sublingual", "Intravenous", "Intramuscular"];
const TIMING_OPTIONS  = [{ val: "before", label: "Before food" }, { val: "after", label: "After food" }, { val: "with", label: "With food" }, { val: "", label: "No instruction" }] as const;
const DURATION_OPTIONS = ["1 day", "2 days", "3 days", "5 days", "7 days", "10 days", "14 days", "1 month", "As needed", "Long-term"];

const MEDICINE_SUGGESTIONS = [
  "Paracetamol 500 mg", "Paracetamol 650 mg",
  "Ibuprofen 400 mg", "Ibuprofen 600 mg",
  "Amoxicillin 500 mg", "Azithromycin 500 mg",
  "Cetirizine 10 mg", "Loratadine 10 mg",
  "Pantoprazole 40 mg", "Metformin 500 mg",
  "Salbutamol Inhaler", "Montelukast 10 mg",
];

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${border}`, padding: "2px 9px", borderRadius: 20 }}>
      {label}
    </span>
  );
}

function SectionTitle({ icon, title, right }: { icon: string; title: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <Icon d={icon} size={15} stroke={T.primary} />
      <span style={{ fontSize: 14, fontWeight: 700, color: T.navy, flex: 1 }}>{title}</span>
      {right}
    </div>
  );
}

function formInput(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    padding: "8px 10px", fontSize: 13, color: T.navy,
    border: `1px solid ${T.border}`, borderRadius: 8,
    background: T.white, outline: "none",
    fontFamily: "Inter, system-ui, sans-serif",
    width: "100%", boxSizing: "border-box" as const,
    ...extra,
  };
}

function formSelect(extra: React.CSSProperties = {}): React.CSSProperties {
  return { ...formInput(extra), cursor: "pointer", appearance: "none" as const };
}

// ─── Medicine search input ────────────────────────────────────────────────────
function MedSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const suggestions = MEDICINE_SUGGESTIONS.filter((s) => value.length > 0 && s.toLowerCase().includes(value.toLowerCase()) && s !== value);

  useEffect(() => {
    function close(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}>
          <Icon d={ic.search} size={13} stroke={T.grayLight} />
        </span>
        <input
          type="text"
          placeholder="Search medicine name..."
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          style={{ ...formInput(), paddingLeft: 30, fontSize: 13 }}
        />
      </div>
      {open && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 100,
          background: T.white, border: `1px solid ${T.border}`, borderRadius: 9,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)", overflow: "hidden",
        }}>
          {suggestions.map((s) => (
            <button key={s} onMouseDown={() => { onChange(s); setOpen(false); }} style={{
              width: "100%", padding: "9px 13px", background: "none", border: "none",
              cursor: "pointer", fontSize: 13, color: T.navy, textAlign: "left",
              fontFamily: "Inter, system-ui, sans-serif",
              borderBottom: `1px solid ${T.border}`,
            }}>
              <span style={{ fontWeight: 600 }}>{s.split(" ")[0]}</span>{" "}
              <span style={{ color: T.gray }}>{s.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Add / Edit medicine drawer ───────────────────────────────────────────────
interface MedFormProps { row: RxRow; onSave: (r: RxRow) => void; onCancel: () => void; }
function MedForm({ row, onSave, onCancel }: MedFormProps) {
  const [form, setForm] = useState<RxRow>({ ...row });
  const upd = (k: keyof RxRow, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.medicine.trim().length > 0 && form.dosage.trim().length > 0 && form.frequency.length > 0;

  return (
    <div style={{ background: T.muted, border: `1px solid ${T.border}`, borderRadius: 10, padding: "18px 20px", marginTop: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 14 }}>
        {row.medicine ? "Edit Medicine" : "Add Medicine"}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {/* Medicine name */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Medicine name <span style={{ color: T.danger }}>*</span></label>
          <MedSearch value={form.medicine} onChange={(v) => upd("medicine", v)} />
        </div>

        {/* Dosage */}
        <div>
          <label style={lbl}>Dosage <span style={{ color: T.danger }}>*</span></label>
          <input placeholder="e.g. 500 mg, 1 tablet" value={form.dosage} onChange={(e) => upd("dosage", e.target.value)} style={formInput()} />
        </div>

        {/* Route */}
        <div>
          <label style={lbl}>Route</label>
          <div style={{ position: "relative" }}>
            <select value={form.route} onChange={(e) => upd("route", e.target.value)} style={formSelect()}>
              {ROUTE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <span style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />
            </span>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <label style={lbl}>Frequency <span style={{ color: T.danger }}>*</span></label>
          <div style={{ position: "relative" }}>
            <select value={form.frequency} onChange={(e) => upd("frequency", e.target.value)} style={formSelect()}>
              <option value="">Select frequency...</option>
              {FREQ_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <span style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />
            </span>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label style={lbl}>Duration</label>
          <div style={{ position: "relative" }}>
            <select value={form.duration} onChange={(e) => upd("duration", e.target.value)} style={formSelect()}>
              <option value="">Select duration...</option>
              {DURATION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <span style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon d={ic.chevDown} size={13} stroke={T.grayLight} />
            </span>
          </div>
        </div>

        {/* Timing */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Timing</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {TIMING_OPTIONS.map((opt) => (
              <button key={opt.val} onClick={() => upd("timing", opt.val)} style={{
                padding: "6px 14px", borderRadius: 7,
                background: form.timing === opt.val ? T.primaryLight : T.white,
                border: `1px solid ${form.timing === opt.val ? T.primaryBorder : T.border}`,
                color: form.timing === opt.val ? T.primary : T.gray,
                fontSize: 12, fontWeight: form.timing === opt.val ? 600 : 400,
                cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
              }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Additional instructions</label>
          <input placeholder="e.g. Avoid alcohol, take with plenty of water..." value={form.instructions} onChange={(e) => upd("instructions", e.target.value)} style={formInput()} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={{ padding: "7px 16px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
          Cancel
        </button>
        <button disabled={!valid} onClick={() => valid && onSave(form)} style={{
          padding: "7px 18px", background: valid ? T.primary : T.muted, border: "none", borderRadius: 8,
          fontSize: 12, fontWeight: 600, color: valid ? "#fff" : T.grayLight,
          cursor: valid ? "pointer" : "default", fontFamily: "Inter, system-ui, sans-serif",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Icon d={ic.check} size={13} stroke={valid ? "#fff" : T.grayLight} />
          {row.medicine ? "Update" : "Add Medicine"}
        </button>
      </div>
    </div>
  );
}

const lbl: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, color: T.gray, marginBottom: 5, letterSpacing: "0.02em" };

// ─── Safety check ─────────────────────────────────────────────────────────────
function SafetyCheck({ rows }: { rows: RxRow[] }) {
  const hasWarning = rows.some((r) => r.medicine.toLowerCase().includes("ibuprofen"));
  const checks = [
    "Allergy check completed",
    "Duplicate medicine check",
    "Interaction review",
    "Dose review",
  ];

  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px" }}>
      <SectionTitle icon={ic.shield} title="Prescription Safety" />

      {hasWarning && (
        <div style={{ marginBottom: 12, padding: "10px 12px", background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderRadius: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Icon d={ic.alertTri} size={15} stroke={T.amber} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 2 }}>Potential medication interaction</div>
            <p style={{ margin: 0, fontSize: 11, color: "#92400e", lineHeight: 1.45 }}>Ibuprofen may interact with other NSAIDs. Please review before approving.</p>
          </div>
          <button style={{ padding: "4px 10px", background: T.white, border: `1px solid ${T.amberBorder}`, borderRadius: 6, fontSize: 11, fontWeight: 600, color: T.amber, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", whiteSpace: "nowrap" as const }}>
            Review warning
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {checks.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: T.successLight, border: `1px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={ic.check} size={10} stroke={T.success} />
            </div>
            <span style={{ fontSize: 12, color: T.navy }}>{c}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, padding: "8px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7 }}>
        <p style={{ margin: 0, fontSize: 10, color: T.gray, lineHeight: 1.5 }}>
          Clinical Intelligence — advisory only. Safety checks assist review but do not guarantee prescription safety. Final clinical judgment rests with the prescribing doctor.
        </p>
      </div>
    </div>
  );
}

// ─── Prescription preview ─────────────────────────────────────────────────────
function RxPreview({ rows, notes, followUp }: { rows: RxRow[]; notes: string; followUp: string }) {
  const timingLabel = (t: string) => t === "before" ? "Before food" : t === "after" ? "After food" : t === "with" ? "With food" : "";

  return (
    <div style={{
      background: T.white, border: `1.5px solid ${T.border}`,
      borderRadius: 10, overflow: "hidden",
      fontFamily: "Inter, system-ui, sans-serif",
    }}>
      {/* Prescription header */}
      <div style={{ background: T.navy, padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: T.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.heart} size={14} stroke="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>MediKiosk</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>DIGITAL PRESCRIPTION</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#5dd6c8" }}>Dr. Priya Mehta</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>General Medicine</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" as const }}>
          {[
            { l: "Patient", v: "Rahul Sharma" },
            { l: "Age / Sex", v: "24 yrs / M" },
            { l: "ID", v: "MK-00421" },
            { l: "Date", v: "10 Sep 2026" },
          ].map((item) => (
            <div key={item.l} style={{ marginRight: 20, marginBottom: 2 }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", display: "block" }}>{item.l}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{item.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Medicines */}
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em", marginBottom: 10 }}>MEDICINES</div>
        {rows.length === 0 ? (
          <p style={{ margin: 0, fontSize: 12, color: T.grayLight, fontStyle: "italic" }}>No medicines added yet.</p>
        ) : rows.map((r, i) => (
          <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < rows.length - 1 ? `1px dashed ${T.border}` : "none" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 2 }}>
              {i + 1}. {r.medicine}
            </div>
            <div style={{ fontSize: 11, color: T.gray, lineHeight: 1.6 }}>
              {r.dosage && <span>{r.dosage} · </span>}
              {r.frequency && <span>{r.frequency}</span>}
              {r.duration && <span> · {r.duration}</span>}
              {r.timing && <span><br />{timingLabel(r.timing)}</span>}
              {r.instructions && <span><br /><em>{r.instructions}</em></span>}
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      {notes && (
        <div style={{ padding: "12px 20px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em", marginBottom: 6 }}>DOCTOR"S INSTRUCTIONS</div>
          <p style={{ margin: 0, fontSize: 12, color: T.navy, lineHeight: 1.6 }}>{notes}</p>
        </div>
      )}

      {/* Follow-up */}
      <div style={{ padding: "10px 20px", background: T.muted }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em" }}>FOLLOW-UP</span>
            <div style={{ fontSize: 12, color: T.navy, marginTop: 1 }}>{followUp || "As advised"}</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 9, color: T.grayLight }}>Digitally generated prescription</div>
            <div style={{ fontSize: 9, color: T.grayLight }}>MediKiosk Health Platform</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function CreatePrescription({ onBack }: { onBack: () => void }) {
  const [rows, setRows] = useState<RxRow[]>([
    { id: 1, medicine: "Paracetamol 500 mg", dosage: "500 mg", frequency: "Twice daily", duration: "3 days", route: "Oral", instructions: "", timing: "after" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingRow, setEditingRow] = useState<RxRow | null>(null);
  const [notes, setNotes] = useState("Rest and maintain adequate hydration.");
  const [followUp, setFollowUp] = useState("");
  const [advice, setAdvice] = useState("");
  const [pharmacy, setPharmacy] = useState<"patient" | "selected">("patient");
  const [approved, setApproved] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [confirmApprove, setConfirmApprove] = useState(false);
  const nextId = useRef(2);

  const BLANK: RxRow = { id: 0, medicine: "", dosage: "", frequency: "", duration: "", route: "Oral", instructions: "", timing: "" };

  function addRow(r: RxRow) {
    if (editingRow && editingRow.id !== 0) {
      setRows((rs) => rs.map((x) => x.id === r.id ? r : x));
    } else {
      setRows((rs) => [...rs, { ...r, id: nextId.current++ }]);
    }
    setShowForm(false);
    setEditingRow(null);
  }

  function removeRow(id: number) {
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  function startEdit(r: RxRow) {
    setEditingRow(r);
    setShowForm(false);
  }

  function saveDraft() {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  }

  function handleApprove() {
    if (!confirmApprove) { setConfirmApprove(true); setTimeout(() => setConfirmApprove(false), 5000); return; }
    setApproved(true);
  }

  const timingLabel = (t: string) => t === "before" ? "Before food" : t === "after" ? "After food" : t === "with" ? "With food" : "";

  // ── Approved success state ────────────────────────────────────────────────
  if (approved) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy }}>
        <header style={{ height: 56, background: T.white, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 12 }}>
          <div style={{ width: 28, height: 28, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.heart} size={14} stroke="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>MediKiosk</span>
          <div style={{ width: 1, height: 24, background: T.border, margin: "0 4px" }} />
          <span style={{ fontSize: 13, color: T.gray }}>Create Prescription</span>
        </header>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
          <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.successLight, border: `2px solid ${T.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Icon d={ic.checkCircle} size={28} stroke={T.success} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.navy, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Prescription Approved</h2>
            <p style={{ fontSize: 13, color: T.gray, margin: "0 0 28px", lineHeight: 1.6 }}>
              The prescription for <strong>Rahul Sharma</strong> has been approved and is ready to be sent to the pharmacy.
            </p>

            {/* Approved prescription mini-preview */}
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 10 }}>APPROVED MEDICINES</div>
              {rows.map((r, i) => (
                <div key={r.id} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.navy, flex: 1 }}>{r.medicine}</span>
                  <span style={{ fontSize: 12, color: T.gray }}>{r.frequency} · {r.duration}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" as const }}>
              <button style={{ padding: "10px 20px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 9, fontSize: 13, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 7 }}>
                <Icon d={ic.eye} size={14} stroke={T.gray} />
                View Prescription
              </button>
              <button style={{ padding: "10px 20px", background: T.white, border: `1px solid ${T.primaryBorder}`, borderRadius: 9, fontSize: 13, fontWeight: 600, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 7 }}>
                <Icon d={ic.pharmacy} size={14} stroke={T.primary} />
                Send to Pharmacy
              </button>
              <button onClick={onBack} style={{ padding: "10px 20px", background: T.primary, border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 7 }}>
                <Icon d={ic.chevLeft} size={14} stroke="#fff" />
                Return to Patient Record
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main view ─────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy }}>

      {/* ── Header ── */}
      <header style={{ background: T.white, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        {/* Primary bar */}
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 24px", gap: 12 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.gray, fontSize: 13, fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif", padding: "4px 0" }}>
            <Icon d={ic.chevLeft} size={15} stroke={T.gray} />
            Back
          </button>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, background: T.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={ic.heart} size={12} stroke="#fff" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Create Prescription</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success }} />
            <span style={{ fontSize: 11, color: T.success, fontWeight: 600 }}>Consultation completed</span>
          </div>
          <div style={{ width: 1, height: 24, background: T.border }} />
          <button onClick={saveDraft} style={{
            padding: "6px 14px", background: draftSaved ? T.successLight : T.muted,
            border: `1px solid ${draftSaved ? T.successBorder : T.border}`, borderRadius: 8,
            fontSize: 12, fontWeight: 600, color: draftSaved ? T.success : T.navy,
            cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
          }}>
            <Icon d={draftSaved ? ic.check : ic.save} size={13} stroke="currentColor" />
            {draftSaved ? "Saved" : "Save Draft"}
          </button>
          <button onClick={onBack} style={{ padding: "6px 14px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.gray, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
            Cancel
          </button>
        </div>

        {/* Patient strip */}
        <div style={{ background: T.navy, padding: "11px 24px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>R</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Rahul Sharma</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>24 years · Male · Patient ID: MK-00421</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <div style={{ padding: "3px 10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>10 September 2026</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "minmax(0,1fr) 316px", gap: 20, padding: "24px 24px 80px", alignItems: "start", maxWidth: 1200, width: "100%", margin: "0 auto", boxSizing: "border-box" as const }}>

        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Clinical summary bar */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Icon d={ic.activity} size={13} stroke={T.primary} />
              <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>Clinical Summary</span>
              <Badge label="Advisory" color={T.gray} bg={T.muted} border={T.border} />
            </div>
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap" as const }}>
              {[
                { l: "Chief complaint",   v: "Cough + mild fever" },
                { l: "Duration",          v: "3 days"             },
                { l: "Allergies",         v: "No known allergies" },
                { l: "Clinical insight",  v: "Possible respiratory infection / viral illness" },
                { l: "Risk",              v: "Moderate"           },
              ].map((item, i) => (
                <div key={i} style={{ marginRight: 28, marginBottom: 6 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: T.grayLight, letterSpacing: "0.04em" }}>{item.l.toUpperCase()}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: item.l === "Risk" ? T.amber : T.navy, marginTop: 1 }}>{item.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 6, padding: "6px 10px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 7 }}>
              <p style={{ margin: 0, fontSize: 10, color: T.gray }}>
                Clinical insight is advisory. Final treatment decisions are made by the doctor.
              </p>
            </div>
          </div>

          {/* Medicines section */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px" }}>
            <SectionTitle icon={ic.pill} title="Medicines"
              right={
                <button onClick={() => { setShowForm(true); setEditingRow(null); }} style={{
                  padding: "5px 12px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`,
                  borderRadius: 7, fontSize: 12, fontWeight: 600, color: T.primary, cursor: "pointer",
                  fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5,
                }}>
                  <Icon d={ic.plus} size={13} stroke={T.primary} />
                  Add Medicine
                </button>
              }
            />

            {/* Medicine table */}
            {rows.length > 0 && (
              <div style={{ border: `1px solid ${T.border}`, borderRadius: 9, overflow: "hidden", marginBottom: showForm || editingRow ? 0 : 0 }}>
                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 130px 90px 110px 70px", gap: 0, background: T.muted, borderBottom: `1px solid ${T.border}` }}>
                  {["Medicine", "Dosage", "Frequency", "Duration", "Instructions", ""].map((h) => (
                    <div key={h} style={{ padding: "8px 12px", fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.05em" }}>{h.toUpperCase()}</div>
                  ))}
                </div>
                {/* Rows */}
                {rows.map((r, i) => (
                  <div key={r.id}>
                    <div style={{
                      display: "grid", gridTemplateColumns: "1fr 90px 130px 90px 110px 70px",
                      gap: 0, alignItems: "center",
                      background: editingRow?.id === r.id ? T.primaryLight : i % 2 === 0 ? T.white : T.muted,
                      borderBottom: `1px solid ${T.border}`,
                      borderLeft: editingRow?.id === r.id ? `3px solid ${T.primary}` : "3px solid transparent",
                    }}>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{r.medicine}</div>
                        {r.timing && <div style={{ fontSize: 10, color: T.grayLight, marginTop: 1 }}>{timingLabel(r.timing)}</div>}
                      </div>
                      <div style={{ padding: "10px 12px", fontSize: 12, color: T.navy }}>{r.dosage || "—"}</div>
                      <div style={{ padding: "10px 12px", fontSize: 12, color: T.navy }}>{r.frequency || "—"}</div>
                      <div style={{ padding: "10px 12px", fontSize: 12, color: T.navy }}>{r.duration || "—"}</div>
                      <div style={{ padding: "10px 12px", fontSize: 12, color: T.gray }}>{r.instructions || "—"}</div>
                      <div style={{ padding: "10px 12px", display: "flex", gap: 6 }}>
                        <button onClick={() => startEdit(r)} title="Edit" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.primary }}>
                          <Icon d={ic.edit} size={14} stroke="currentColor" />
                        </button>
                        <button onClick={() => removeRow(r.id)} title="Remove" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.grayLight }}>
                          <Icon d={ic.trash} size={14} stroke="currentColor" />
                        </button>
                      </div>
                    </div>
                    {/* Inline edit */}
                    {editingRow?.id === r.id && (
                      <div style={{ padding: "0 8px 8px" }}>
                        <MedForm row={editingRow} onSave={addRow} onCancel={() => setEditingRow(null)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {rows.length === 0 && !showForm && (
              <div style={{ padding: "28px 0", textAlign: "center" }}>
                <Icon d={ic.pill} size={28} stroke={T.border} />
                <p style={{ margin: "10px 0 0", fontSize: 12, color: T.grayLight }}>No medicines added. Click "+ Add Medicine" to start.</p>
              </div>
            )}

            {/* Add form */}
            {showForm && !editingRow && (
              <MedForm
                row={{ ...BLANK, id: nextId.current }}
                onSave={addRow}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>

          {/* Safety check */}
          <SafetyCheck rows={rows} />

          {/* Doctor notes */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px" }}>
            <SectionTitle icon={ic.edit} title="Doctor's Instructions" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={lbl}>Clinical notes &amp; instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add instructions, precautions and follow-up advice..."
                  style={{
                    width: "100%", minHeight: 90, padding: "10px 12px",
                    fontSize: 12, color: T.navy, lineHeight: 1.65,
                    border: `1px solid ${T.border}`, borderRadius: 8,
                    background: T.muted, outline: "none", resize: "vertical" as const,
                    fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" as const,
                  }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={lbl}>Follow-up date</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}>
                      <Icon d={ic.calendar} size={13} stroke={T.grayLight} />
                    </span>
                    <input
                      type="date" value={followUp} onChange={(e) => setFollowUp(e.target.value)}
                      style={{ ...formInput(), paddingLeft: 30 }}
                    />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Additional advice</label>
                  <input
                    placeholder="e.g. Avoid cold drinks, rest well..."
                    value={advice} onChange={(e) => setAdvice(e.target.value)}
                    style={formInput()}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pharmacy handoff */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px" }}>
            <SectionTitle icon={ic.pharmacy} title="Send to Pharmacy" />
            <p style={{ margin: "0 0 14px", fontSize: 12, color: T.gray, lineHeight: 1.6 }}>
              After approval, this prescription can be shared with a verified pharmacy selected by the patient.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {([
                { val: "patient",   label: "Patient chooses pharmacy",  desc: "The patient selects a registered pharmacy to receive the prescription." },
                { val: "selected",  label: "Send to selected pharmacy",  desc: "Directly send to a pre-selected pharmacy partner." },
              ] as const).map((opt) => (
                <div
                  key={opt.val}
                  onClick={() => setPharmacy(opt.val)}
                  style={{
                    display: "flex", gap: 12, padding: "11px 14px", cursor: "pointer",
                    background: pharmacy === opt.val ? T.primaryLight : T.muted,
                    border: `1px solid ${pharmacy === opt.val ? T.primaryBorder : T.border}`,
                    borderRadius: 9, transition: "all 0.12s",
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                    border: `2px solid ${pharmacy === opt.val ? T.primary : T.grayLight}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {pharmacy === opt.val && <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.primary }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 2 }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: T.gray }}>{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleApprove}
              disabled={rows.length === 0}
              style={{
                width: "100%", padding: "12px 0",
                background: rows.length === 0 ? T.muted : confirmApprove ? T.danger : T.primary,
                border: "none", borderRadius: 9,
                fontSize: 13, fontWeight: 700,
                color: rows.length === 0 ? T.grayLight : "#fff",
                cursor: rows.length === 0 ? "default" : "pointer",
                fontFamily: "Inter, system-ui, sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background 0.15s",
              }}
            >
              <Icon d={confirmApprove ? ic.alertTri : ic.checkCircle} size={16} stroke={rows.length === 0 ? T.grayLight : "#fff"} />
              {confirmApprove ? "Confirm Approve — Doctor Responsibility" : rows.length === 0 ? "Add medicines to approve" : "Approve Prescription"}
            </button>

            {confirmApprove && (
              <div style={{ marginTop: 8, padding: "8px 12px", background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderRadius: 8 }}>
                <p style={{ margin: 0, fontSize: 11, color: "#92400e", lineHeight: 1.5 }}>
                  By approving, you confirm that you have reviewed all medicines, dosages, frequencies and durations. Click again to confirm.
                </p>
              </div>
            )}

            {rows.length === 0 && (
              <p style={{ margin: "8px 0 0", fontSize: 11, color: T.grayLight, textAlign: "center" }}>At least one medicine is required to approve.</p>
            )}
          </div>

        </div>

        {/* ── Right column: preview ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 100 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.grayLight, letterSpacing: "0.08em", marginBottom: 2 }}>PRESCRIPTION PREVIEW</div>
          <RxPreview rows={rows} notes={notes} followUp={followUp ? new Date(followUp + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : ""} />
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ flex: 1, padding: "8px 0", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Icon d={ic.print} size={13} stroke={T.gray} />
              Print
            </button>
            <button style={{ flex: 1, padding: "8px 0", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Icon d={ic.send} size={13} stroke={T.gray} />
              Share
            </button>
          </div>
          <div style={{ padding: "10px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8 }}>
            <p style={{ margin: 0, fontSize: 10, color: T.gray, lineHeight: 1.6 }}>
              Final clinical assessment and treatment decisions remain with the qualified healthcare professional. This prescription is valid only after doctor approval.
            </p>
          </div>
        </div>

      </div>

      {/* ── Sticky bottom bar ── */}
      <div style={{
        position: "sticky", bottom: 0, background: T.white, borderTop: `1px solid ${T.border}`,
        padding: "10px 24px", display: "flex", alignItems: "center", gap: 10, zIndex: 10,
      }}>
        <span style={{ fontSize: 12, color: T.grayLight }}>Patient: <strong style={{ color: T.navy }}>Rahul Sharma</strong> · MK-00421</span>
        <Badge label={`${rows.length} medicine${rows.length !== 1 ? "s" : ""}`} color={rows.length > 0 ? T.primary : T.gray} bg={rows.length > 0 ? T.primaryLight : T.muted} border={rows.length > 0 ? T.primaryBorder : T.border} />
        <div style={{ flex: 1 }} />
        <button onClick={saveDraft} style={{
          padding: "8px 16px", background: draftSaved ? T.successLight : T.white,
          border: `1px solid ${draftSaved ? T.successBorder : T.border}`, borderRadius: 8,
          fontSize: 12, fontWeight: 600, color: draftSaved ? T.success : T.navy, cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
        }}>
          <Icon d={draftSaved ? ic.check : ic.save} size={13} stroke="currentColor" />
          {draftSaved ? "Draft Saved" : "Save Draft"}
        </button>
        <button
          onClick={handleApprove}
          disabled={rows.length === 0}
          style={{
            padding: "8px 20px",
            background: rows.length === 0 ? T.muted : confirmApprove ? T.danger : T.primary,
            border: "none", borderRadius: 8,
            fontSize: 12, fontWeight: 700, color: rows.length === 0 ? T.grayLight : "#fff",
            cursor: rows.length === 0 ? "default" : "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s",
          }}
        >
          <Icon d={ic.checkCircle} size={14} stroke={rows.length === 0 ? T.grayLight : "#fff"} />
          {confirmApprove ? "Confirm Approve" : "Approve Prescription"}
        </button>
      </div>
    </div>
  );
}

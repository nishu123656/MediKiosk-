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
  mic:         "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8",
  micOff:      "M1 1l22 22 M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6 M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23 M12 19v4 M8 23h8",
  cam:         "M23 7l-7 5 7 5V7z M1 5h15a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z",
  camOff:      "M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10 M1 1l22 22",
  speaker:     "M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 010 14.14 M15.54 8.46a5 5 0 010 7.07",
  speakerOff:  "M11 5L6 9H2v6h4l5 4V5z M23 9l-6 6 M17 9l6 6",
  screen:      "M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
  phoneOff:    "M10.68 13.31a16 16 0 003.41 2.6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7 2 2 0 011.72 2v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-2.6-2.34M6.68 6.68a19.49 19.49 0 00-2.88 5.94 19.79 19.79 0 00-3.07-8.63A2 2 0 012 0h3a2 2 0 011.72 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.68 6.68zM1 1l22 22",
  more:        "M12 5h.01M12 12h.01M12 19h.01",
  chevRight:   "M9 18l6-6-6-6",
  chevDown:    "M19 9l-7 7-7-7",
  chevUp:      "M5 15l7-7 7 7",
  chevLeft:    "M15 18l-6-6 6-6",
  check:       "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  pill:        "M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h9.5m4.5 14a2 2 0 002-2V8.5L14 3H9.5m5 0v5.5H20M7 13h4m-2-2v4",
  clock:       "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  send:        "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  paperclip:   "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  save:        "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  plus:        "M12 5v14M5 12h14",
  trash:       "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  link:        "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  flask:       "M9 3h6m-5 6l-4 11h14L16 9M10 3v6M14 3v6",
  abha:        "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  info:        "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9v4m0-7h.01",
  volume:      "M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.8L12 4v16l-5.5-4.8H2V8.8h4.5z",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6z",
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
  purple:        "#7c3aed",
  purpleLight:   "#f5f3ff",
  purpleBorder:  "#ddd6fe",
  videoBg:       "#0a1628",
};

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useViewport() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024 };
}

// ─── Call timer ───────────────────────────────────────────────────────────────
function useTimer(running: boolean) {
  const [secs, setSecs] = useState(754); // starts at 12:34
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${border}`, padding: "2px 9px", borderRadius: 20 }}>
      {label}
    </span>
  );
}

// ─── Control button ───────────────────────────────────────────────────────────
function CtrlBtn({
  icon, label, active = true, danger = false, onClick,
}: { icon: string; label: string; active?: boolean; danger?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        padding: "8px 12px", background: "none", border: "none", cursor: "pointer",
        borderRadius: 10, transition: "background 0.12s",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: "50%",
        background: danger ? T.danger : active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
        border: `1.5px solid ${danger ? T.danger : active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.13s",
      }}>
        <Icon d={icon} size={17} stroke={active ? "#fff" : "rgba(255,255,255,0.35)"} />
      </div>
      <span style={{ fontSize: 10, color: active ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.28)", fontWeight: 500 }}>
        {label}
      </span>
    </button>
  );
}

// ─── Video panel ──────────────────────────────────────────────────────────────
function VideoPanel({ onEnd }: { onEnd: () => void }) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const timer = useTimer(true);

  return (
    <div style={{
      background: T.videoBg, borderRadius: 12,
      border: `1px solid rgba(255,255,255,0.06)`,
      overflow: "hidden", display: "flex", flexDirection: "column",
      flex: 1, minHeight: 0,
    }}>
      {/* Main video area */}
      <div style={{ flex: 1, position: "relative", minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Patient placeholder */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 96, height: 96, borderRadius: "50%",
            background: "linear-gradient(135deg, #1a3558 0%, #0d2240 100%)",
            border: "3px solid rgba(13,122,110,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, fontWeight: 700, color: "rgba(255,255,255,0.7)",
            letterSpacing: "-0.02em",
          }}>
            R
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Rahul Sharma</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>Patient · MK-00421</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, padding: "5px 12px", background: "rgba(13,122,110,0.25)", border: "1px solid rgba(13,122,110,0.4)", borderRadius: 20 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Video connecting…</span>
          </div>
        </div>

        {/* Doctor self-view (PiP) */}
        <div style={{
          position: "absolute", bottom: 14, right: 14,
          width: 120, height: 80, borderRadius: 9,
          background: "#0d1f3c",
          border: "1.5px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>M</div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Dr. Mehta</span>
          </div>
        </div>

        {/* Signal strength top-left */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ padding: "4px 10px", background: "rgba(0,0,0,0.4)", borderRadius: 20, display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>HD · Secure</span>
          </div>
        </div>

        {/* Timer top-right */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          padding: "4px 11px", background: "rgba(0,0,0,0.5)", borderRadius: 20,
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{timer}</span>
        </div>
      </div>

      {/* Controls bar */}
      <div style={{
        padding: "10px 16px 14px",
        background: "rgba(0,0,0,0.3)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 0,
        flexWrap: "wrap" as const,
      }}>
        <CtrlBtn icon={micOn ? ic.mic : ic.micOff}         label={micOn ? "Mute"  : "Unmute"}  active={micOn}     onClick={() => setMicOn((v) => !v)} />
        <CtrlBtn icon={camOn ? ic.cam : ic.camOff}         label={camOn ? "Camera": "Start cam"} active={camOn}   onClick={() => setCamOn((v) => !v)} />
        <CtrlBtn icon={speakerOn ? ic.speaker : ic.speakerOff} label="Speaker"                   active={speakerOn} onClick={() => setSpeakerOn((v) => !v)} />
        <CtrlBtn icon={ic.screen} label={sharing ? "Stop share" : "Share"} active={!sharing}      onClick={() => setSharing((v) => !v)} />
        <div style={{ width: 1, height: 38, background: "rgba(255,255,255,0.1)", margin: "0 8px" }} />
        <button
          onClick={onEnd}
          style={{
            display: "flex", alignItems: "center", gap: 7, padding: "9px 20px",
            background: T.danger, border: "none", borderRadius: 24,
            cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 12, fontWeight: 600, color: "#fff",
          }}
        >
          <Icon d={ic.phoneOff} size={15} stroke="#fff" />
          End Call
        </button>
      </div>
    </div>
  );
}

// ─── Chat ─────────────────────────────────────────────────────────────────────
interface ChatMsg { from: "doctor" | "patient"; text: string; time: string; }
const INIT_MSGS: ChatMsg[] = [
  { from: "doctor",  text: "Are you experiencing any difficulty breathing?", time: "12:18" },
  { from: "patient", text: "No, only mild cough.",                           time: "12:19" },
  { from: "doctor",  text: "Have you taken any medication?",                 time: "12:20" },
  { from: "patient", text: "No.",                                            time: "12:21" },
];

function ChatPanel() {
  const [msgs, setMsgs] = useState<ChatMsg[]>(INIT_MSGS);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  function send() {
    const t = draft.trim();
    if (!t) return;
    const now = new Date();
    setMsgs((m) => [...m, { from: "doctor", text: t, time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}` }]);
    setDraft("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => {
          const isDoc = m.from === "doctor";
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isDoc ? "flex-end" : "flex-start" }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: T.grayLight, marginBottom: 3, letterSpacing: "0.05em" }}>
                {isDoc ? "DR. MEHTA" : "RAHUL"} · {m.time}
              </div>
              <div style={{
                maxWidth: "82%", padding: "8px 12px", fontSize: 12, lineHeight: 1.5,
                borderRadius: isDoc ? "10px 10px 3px 10px" : "10px 10px 10px 3px",
                background: isDoc ? T.primary : T.white,
                border: isDoc ? "none" : `1px solid ${T.border}`,
                color: isDoc ? "#fff" : T.navy,
              }}>
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 6, alignItems: "center" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.grayLight, flexShrink: 0 }}>
          <Icon d={ic.paperclip} size={15} stroke="currentColor" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          style={{
            flex: 1, padding: "7px 10px", fontSize: 12, color: T.navy,
            border: `1px solid ${T.border}`, borderRadius: 8,
            background: T.muted, outline: "none",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        />
        <button
          onClick={send}
          style={{
            width: 32, height: 32, borderRadius: 8, background: T.primary, border: "none",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >
          <Icon d={ic.send} size={13} stroke="#fff" />
        </button>
      </div>
    </div>
  );
}

// ─── Notes ────────────────────────────────────────────────────────────────────
function NotesPanel() {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add clinical observations, examination findings and assessment…"
        style={{
          width: "100%", minHeight: 110, padding: "10px 12px", fontSize: 12, color: T.navy, lineHeight: 1.6,
          border: `1px solid ${T.border}`, borderRadius: 8,
          background: T.muted, outline: "none", resize: "vertical" as const,
          fontFamily: "Inter, system-ui, sans-serif",
          boxSizing: "border-box" as const,
        }}
      />
      <button
        onClick={save}
        style={{
          alignSelf: "flex-end", padding: "7px 16px",
          background: saved ? T.successLight : T.white,
          border: `1px solid ${saved ? T.successBorder : T.border}`, borderRadius: 8,
          fontSize: 12, fontWeight: 600,
          color: saved ? T.success : T.navy,
          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
          display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
        }}
      >
        <Icon d={saved ? ic.check : ic.save} size={13} stroke="currentColor" />
        {saved ? "Saved" : "Save Notes"}
      </button>
    </div>
  );
}

// ─── Prescription ─────────────────────────────────────────────────────────────
interface RxRow { medicine: string; dosage: string; freq: string; duration: string; note: string; }

function PrescriptionPanel() {
  const [rows, setRows] = useState<RxRow[]>([
    { medicine: "Paracetamol", dosage: "500 mg", freq: "Twice daily", duration: "3 days", note: "After food" },
  ]);
  const [creating, setCreating] = useState(false);

  function addRow() {
    setRows((r) => [...r, { medicine: "", dosage: "", freq: "", duration: "", note: "" }]);
  }

  function removeRow(i: number) {
    setRows((r) => r.filter((_, j) => j !== i));
  }

  function updateRow(i: number, field: keyof RxRow, val: string) {
    setRows((r) => r.map((row, j) => j === i ? { ...row, [field]: val } : row));
  }

  return (
    <div style={{ padding: "14px 16px" }}>
      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" as const }}>
              <input value={row.medicine} onChange={(e) => updateRow(i, "medicine", e.target.value)} placeholder="Medicine" style={rxInput({ flex: "1 1 120px" })} />
              <input value={row.dosage}   onChange={(e) => updateRow(i, "dosage",   e.target.value)} placeholder="Dosage"   style={rxInput({ width: 80 })} />
              <input value={row.freq}     onChange={(e) => updateRow(i, "freq",     e.target.value)} placeholder="Frequency" style={rxInput({ flex: "1 1 100px" })} />
              <input value={row.duration} onChange={(e) => updateRow(i, "duration", e.target.value)} placeholder="Duration"  style={rxInput({ width: 70 })} />
              <button onClick={() => removeRow(i)} style={{ background: "none", border: "none", cursor: "pointer", color: T.grayLight, padding: "2px 4px", alignSelf: "center" }}>
                <Icon d={ic.trash} size={13} stroke="currentColor" />
              </button>
            </div>
            <input value={row.note} onChange={(e) => updateRow(i, "note", e.target.value)} placeholder="Instructions (e.g. after food)" style={rxInput({ width: "100%" })} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" as const }}>
        <button onClick={addRow} style={{
          padding: "6px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8,
          fontSize: 12, fontWeight: 500, color: T.navy, cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 5,
        }}>
          <Icon d={ic.plus} size={13} stroke={T.gray} />
          Add Medicine
        </button>
        <button
          onClick={() => setCreating(true)}
          disabled={rows.every((r) => !r.medicine)}
          style={{
            marginLeft: "auto", padding: "7px 16px", background: creating ? T.success : T.primary,
            border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#fff",
            cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 6, opacity: rows.every((r) => !r.medicine) ? 0.5 : 1,
          }}
        >
          <Icon d={creating ? ic.check : ic.pill} size={13} stroke="#fff" />
          {creating ? "Prescription ready" : "Create Prescription"}
        </button>
      </div>

      <p style={{ margin: "10px 0 0", fontSize: 10, color: T.grayLight, lineHeight: 1.5 }}>
        Doctor must review and approve before sending to pharmacy. Final treatment decisions remain with the qualified healthcare professional.
      </p>
    </div>
  );
}

function rxInput(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    padding: "5px 8px", fontSize: 12, color: T.navy,
    border: `1px solid ${T.border}`, borderRadius: 6,
    background: T.white, outline: "none",
    fontFamily: "Inter, system-ui, sans-serif",
    ...extra,
  };
}

// ─── Clinical summary tab ─────────────────────────────────────────────────────
function ClinicalSummaryPanel() {
  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 0 }}>

      {/* Chief complaint */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 6 }}>CHIEF COMPLAINT</div>
        <div style={{ padding: "9px 12px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: T.navy, fontStyle: "italic", lineHeight: 1.5 }}>"Cough and mild fever for 3 days"</p>
        </div>
      </div>

      {/* Symptoms */}
      <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>SYMPTOMS</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 8 }}>
          {["Dry cough", "Mild fever", "Fatigue"].map((s) => (
            <span key={s} style={{ fontSize: 11, fontWeight: 500, color: T.navy, background: T.muted, border: `1px solid ${T.border}`, padding: "3px 10px", borderRadius: 20 }}>{s}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: T.grayLight }}>Severity</span>
          <Badge label="Moderate" color={T.amber} bg={T.amberLight} border={T.amberBorder} />
        </div>
      </div>

      {/* Allergies & medicines */}
      <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${T.border}` }}>
        {[
          { label: "Allergies",         val: "No known allergies reported" },
          { label: "Current medicines",  val: "None reported"               },
        ].map((r) => (
          <div key={r.label} style={{ display: "flex", gap: 10, marginBottom: 7 }}>
            <span style={{ fontSize: 11, color: T.grayLight, minWidth: 130, flexShrink: 0 }}>{r.label}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>{r.val}</span>
          </div>
        ))}
      </div>

      {/* Vitals */}
      <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.grayLight, letterSpacing: "0.07em", marginBottom: 8 }}>VITALS</div>
        {[
          { label: "Temperature", val: "Not available" },
          { label: "SpO₂",        val: "Not available" },
          { label: "Heart rate",  val: "Not available" },
          { label: "BP",          val: "Not available" },
        ].map((v) => (
          <div key={v.label} style={{ display: "flex", gap: 10, marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: T.grayLight, minWidth: 130, flexShrink: 0 }}>{v.label}</span>
            <span style={{ fontSize: 12, color: T.grayLight, fontStyle: "italic" }}>{v.val}</span>
          </div>
        ))}
      </div>

      {/* Clinical intelligence */}
      <div style={{ background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderLeft: `3px solid ${T.amber}`, borderRadius: "0 8px 8px 0", padding: "12px 12px", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
          <Icon d={ic.activity} size={13} stroke={T.amber} />
          <span style={{ fontSize: 12, fontWeight: 700, color: T.navy, flex: 1 }}>Preliminary Clinical Insight</span>
          <Badge label="Moderate risk" color={T.amber} bg={T.amberLight} border={T.amberBorder} />
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e", letterSpacing: "0.06em", marginBottom: 7 }}>POSSIBLE CONSIDERATIONS</div>
        {["Respiratory infection", "Viral illness", "Asthma exacerbation"].map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: 12, color: T.navy, fontWeight: i === 0 ? 500 : 400 }}>{c}</span>
            {i === 0 && <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 5px", borderRadius: 20, marginLeft: "auto" }}>Most likely</span>}
          </div>
        ))}
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.amberBorder}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e", letterSpacing: "0.06em", marginBottom: 5 }}>MISSING</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
            {["Temperature", "SpO₂"].map((m) => (
              <span key={m} style={{ fontSize: 11, color: "#78350f", background: T.white, border: `1px solid ${T.amberBorder}`, padding: "2px 8px", borderRadius: 20 }}>{m}</span>
            ))}
          </div>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 10, color: "#92400e", lineHeight: 1.5, fontStyle: "italic" }}>
          Preliminary clinical insight — not a diagnosis.
        </p>
      </div>

      {/* Safety */}
      <div style={{ background: T.successLight, border: `1px solid ${T.successBorder}`, borderLeft: `3px solid ${T.success}`, borderRadius: "0 8px 8px 0", padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Icon d={ic.shield} size={13} stroke={T.success} />
          <span style={{ fontSize: 12, fontWeight: 700, color: T.navy, flex: 1 }}>Red Flag Assessment</span>
          <Badge label="No red flags" color={T.success} bg={T.successLight} border={T.successBorder} />
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 11, color: "#14532d", lineHeight: 1.4 }}>No immediate red flags identified from the information provided.</p>
      </div>

    </div>
  );
}

// ─── Timeline tab ─────────────────────────────────────────────────────────────
const TL_ITEMS = [
  { date: "12 Sep 2026", label: "Clinical Intake",      detail: "Cough + fever reported. Severity: Moderate.", dot: T.primary, tag: "Today" },
  { date: "08 Sep 2026", label: "Lab Report",           detail: "Blood test uploaded — results pending.",       dot: T.amber,   tag: ""      },
  { date: "08 Sep 2026", label: "Prescription",         detail: "Paracetamol 500mg for 3 days.",               dot: T.purple,  tag: ""      },
  { date: "15 Aug 2026", label: "Doctor Consultation",  detail: "General consultation — Dr. Mehta.",           dot: T.blue,    tag: ""      },
];

function TimelinePanel() {
  return (
    <div style={{ padding: "14px 16px" }}>
      {TL_ITEMS.map((ev, i) => (
        <div key={i} style={{ display: "flex", gap: 12, paddingBottom: i < TL_ITEMS.length - 1 ? 18 : 0, position: "relative" }}>
          {i < TL_ITEMS.length - 1 && <div style={{ position: "absolute", left: 10, top: 22, bottom: 0, width: 1, background: T.border }} />}
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: ev.dot + "18", border: `2px solid ${ev.dot}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: ev.dot }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{ev.label}</span>
              {ev.tag && <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, padding: "1px 6px", borderRadius: 20 }}>{ev.tag}</span>}
              <span style={{ marginLeft: "auto", fontSize: 10, color: T.grayLight }}>{ev.date}</span>
            </div>
            <p style={{ margin: 0, fontSize: 11, color: T.gray, lineHeight: 1.45 }}>{ev.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Documents tab ────────────────────────────────────────────────────────────
const DOCS = [
  { name: "Blood Test Report",     date: "08 Sep 2026", status: "OCR verified", sc: T.success, sb: T.successLight, sbd: T.successBorder, icon: ic.flask    },
  { name: "Previous Prescription", date: "08 Sep 2026", status: "Verified",     sc: T.primary, sb: T.primaryLight, sbd: T.primaryBorder, icon: ic.pill     },
  { name: "General Consultation",  date: "15 Aug 2026", status: "Uploaded",     sc: T.blue,    sb: T.blueLight,    sbd: T.blueBorder,    icon: ic.fileText },
];

function DocumentsPanel() {
  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 0 }}>
      {DOCS.map((doc, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: i < DOCS.length - 1 ? `1px solid ${T.border}` : "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: T.muted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon d={doc.icon} size={14} stroke={T.gray} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 2 }}>{doc.name}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: T.grayLight }}>{doc.date}</span>
              <Badge label={doc.status} color={doc.sc} bg={doc.sb} border={doc.sbd} />
            </div>
          </div>
          <button style={{ padding: "4px 10px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 11, fontWeight: 500, color: T.navy, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon d={ic.eye} size={12} stroke={T.gray} />
            View
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── ABHA tab ─────────────────────────────────────────────────────────────────
function AbhaPanel() {
  return (
    <div style={{ padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14, padding: "10px 12px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 8 }}>
        <Icon d={ic.abha} size={15} stroke={T.success} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>ABHA Health Records</div>
          <div style={{ fontSize: 10, color: T.grayLight }}>Ayushman Bharat Health Account</div>
        </div>
        <Badge label="Connected" color={T.success} bg={T.successLight} border={T.successBorder} />
      </div>
      {[
        { label: "Records available", val: "12 records" },
        { label: "Last consent",      val: "Sep 10, 2026" },
        { label: "Consent duration",  val: "90 days" },
        { label: "Consent scope",     val: "Health records, labs, Rx" },
      ].map((r) => (
        <div key={r.label} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 11, color: T.grayLight, minWidth: 130, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: T.navy }}>{r.val}</span>
        </div>
      ))}
      <button style={{ marginTop: 12, width: "100%", padding: "8px", background: T.white, border: `1px solid ${T.primaryBorder}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: T.primary, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Icon d={ic.link} size={13} stroke={T.primary} />
        View shared records
      </button>
      <p style={{ margin: "8px 0 0", fontSize: 10, color: T.grayLight, textAlign: "center" }}>Access is based on patient consent.</p>
    </div>
  );
}

// ─── Right clinical panel ─────────────────────────────────────────────────────
type ClinTab = "summary" | "timeline" | "documents" | "abha";
const CLIN_TABS: { id: ClinTab; label: string }[] = [
  { id: "summary",   label: "Clinical Summary" },
  { id: "timeline",  label: "Timeline"         },
  { id: "documents", label: "Documents"        },
  { id: "abha",      label: "ABHA Records"     },
];

type PanelSection = "clinical" | "chat" | "notes" | "rx";
const SECTIONS: { id: PanelSection; label: string; icon: string }[] = [
  { id: "clinical", label: "Clinical Summary", icon: ic.activity  },
  { id: "chat",     label: "Consult Chat",     icon: ic.send      },
  { id: "notes",    label: "Notes",            icon: ic.edit      },
  { id: "rx",       label: "Prescription",     icon: ic.pill      },
];

function RightPanel() {
  const [section, setSection] = useState<PanelSection>("clinical");
  const [clinTab, setClinTab] = useState<ClinTab>("summary");

  return (
    <div style={{
      width: 340, minWidth: 300, display: "flex", flexDirection: "column",
      background: T.white, border: `1px solid ${T.border}`, borderRadius: 12,
      overflow: "hidden",
    }}>
      {/* Section switcher */}
      <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, background: T.muted, padding: "4px 8px", gap: 2 }}>
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => setSection(s.id)} title={s.label} style={{
            flex: 1, padding: "6px 0", borderRadius: 7, border: "none", cursor: "pointer",
            background: section === s.id ? T.white : "transparent",
            boxShadow: section === s.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            color: section === s.id ? T.primary : T.grayLight,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.12s",
          }}>
            <Icon d={s.icon} size={15} stroke="currentColor" />
          </button>
        ))}
      </div>

      {/* Section label */}
      <div style={{ padding: "10px 16px 6px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
        <Icon d={SECTIONS.find((s) => s.id === section)!.icon} size={14} stroke={T.primary} />
        <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>
          {SECTIONS.find((s) => s.id === section)!.label}
        </span>
        {section === "clinical" && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 0 }}>
            {CLIN_TABS.map((t) => (
              <button key={t.id} onClick={() => setClinTab(t.id)} style={{
                padding: "3px 8px", borderRadius: 5, border: "none", cursor: "pointer",
                background: clinTab === t.id ? T.primaryLight : "transparent",
                fontSize: 10, fontWeight: clinTab === t.id ? 700 : 400,
                color: clinTab === t.id ? T.primary : T.grayLight,
                fontFamily: "Inter, system-ui, sans-serif", whiteSpace: "nowrap" as const,
              }}>{t.label}</button>
            ))}
          </div>
        )}
      </div>

      {/* Section content */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {section === "clinical" && clinTab === "summary"   && <ClinicalSummaryPanel />}
        {section === "clinical" && clinTab === "timeline"  && <TimelinePanel />}
        {section === "clinical" && clinTab === "documents" && <DocumentsPanel />}
        {section === "clinical" && clinTab === "abha"      && <AbhaPanel />}
        {section === "chat"     && <ChatPanel />}
        {section === "notes"    && <NotesPanel />}
        {section === "rx"       && <PrescriptionPanel />}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function ConsultationRoom({ onEnd }: { onEnd: () => void }) {
  const { isMobile, isTablet } = useViewport();
  const [moreOpen, setMoreOpen] = useState(false);
  const [completeConfirm, setCompleteConfirm] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  function handleEnd() {
    if (completeConfirm) { onEnd(); return; }
    setCompleteConfirm(true);
    setTimeout(() => setCompleteConfirm(false), 4000);
  }

  const isNarrow = isMobile || isTablet;

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: T.bg, fontFamily: "Inter, system-ui, sans-serif", color: T.navy, overflow: "hidden",
    }}>

      {/* ── Top bar ── */}
      <header style={{
        height: 56, background: T.white, borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", padding: "0 20px", gap: 14, flexShrink: 0, zIndex: 20,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, background: T.primary, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ic.heart} size={14} stroke="#fff" />
          </div>
          {!isMobile && <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>MediKiosk</span>}
        </div>

        <div style={{ width: 1, height: 26, background: T.border }} />

        {/* Patient identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>R</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, lineHeight: 1.2 }}>Rahul Sharma</div>
            {!isMobile && <div style={{ fontSize: 10, color: T.grayLight }}>24 years · Male · MK-00421 · CON-2026-0091</div>}
          </div>
        </div>

        {/* Status */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, borderRadius: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.primary }} />
          <span style={{ fontSize: 11, color: T.primary, fontWeight: 600 }}>Consultation in progress</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Safety notice — desktop */}
        {!isNarrow && (
          <div style={{ padding: "4px 11px", background: T.successLight, border: `1px solid ${T.successBorder}`, borderRadius: 20, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon d={ic.shield} size={12} stroke={T.success} />
            <span style={{ fontSize: 10, fontWeight: 600, color: T.success }}>No red flags</span>
          </div>
        )}

        {/* Actions */}
        <button
          onClick={handleEnd}
          style={{
            padding: "7px 16px", background: completeConfirm ? T.danger : T.primary,
            border: "none", borderRadius: 8,
            fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", gap: 6,
            transition: "background 0.15s",
          }}
        >
          <Icon d={ic.check} size={13} stroke="#fff" />
          {completeConfirm ? "Confirm End" : "End Consultation"}
        </button>

        <div style={{ position: "relative" }}>
          <button onClick={() => setMoreOpen((v) => !v)} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer" }}>
            <Icon d={ic.more} size={18} stroke={T.gray} />
          </button>
          {moreOpen && (
            <>
              <div onClick={() => setMoreOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 30 }} />
              <div style={{ position: "absolute", right: 0, top: 38, background: T.white, border: `1px solid ${T.border}`, borderRadius: 9, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", width: 176, zIndex: 40, overflow: "hidden" }}>
                {[
                  { label: "Schedule follow-up", icon: ic.calendar },
                  { label: "Patient record",     icon: ic.fileText },
                  { label: "Share summary",      icon: ic.send     },
                ].map((item) => (
                  <button key={item.label} onClick={() => setMoreOpen(false)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "10px 14px",
                    background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.navy, textAlign: "left", fontFamily: "Inter, system-ui, sans-serif",
                  }}>
                    <Icon d={item.icon} size={14} stroke={T.gray} />
                    {item.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* ── Workspace ── */}
      {isNarrow ? (
        /* ─ Mobile / Tablet stacked layout ─ */
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Video */}
          <div style={{ height: 280, display: "flex" }}>
            <VideoPanel onEnd={onEnd} />
          </div>

          {/* Clinical panel full width */}
          <div style={{ minHeight: 400 }}>
            <RightPanel />
          </div>

          {/* Disclaimer */}
          <div style={{ padding: "10px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8 }}>
            <p style={{ margin: 0, fontSize: 10, color: T.gray, lineHeight: 1.6, textAlign: "center" }}>
              Final clinical assessment and treatment decisions remain with the qualified healthcare professional.
            </p>
          </div>

        </div>
      ) : (
        /* ─ Desktop three-column layout ─ */
        <div style={{ flex: 1, display: "flex", gap: 16, padding: "16px 20px 16px", minHeight: 0, overflow: "hidden" }}>

          {/* Left: video */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, gap: 12 }}>
            <VideoPanel onEnd={onEnd} />

            {/* Disclaimer strip */}
            <div style={{ padding: "8px 14px", background: T.muted, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <p style={{ margin: 0, fontSize: 10, color: T.gray, lineHeight: 1.5 }}>
                Final clinical assessment and treatment decisions remain with the qualified healthcare professional. Clinical Intelligence assists but does not replace the doctor's judgment.
              </p>
            </div>
          </div>

          {/* Right: clinical panel */}
          <RightPanel />

        </div>
      )}

      {/* ── Bottom actions ── */}
      <div style={{
        flexShrink: 0, background: T.white, borderTop: `1px solid ${T.border}`,
        padding: "10px 20px", display: "flex", alignItems: "center", gap: 10, zIndex: 10,
      }}>
        <span style={{ fontSize: 12, color: T.grayLight }}>
          Consultation with <strong style={{ color: T.navy }}>Rahul Sharma</strong> · MK-00421
        </span>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => { setNotesSaved(true); setTimeout(() => setNotesSaved(false), 2000); }}
          style={{
            padding: "7px 16px", background: notesSaved ? T.successLight : T.white,
            border: `1px solid ${notesSaved ? T.successBorder : T.border}`, borderRadius: 8,
            fontSize: 12, fontWeight: 600, color: notesSaved ? T.success : T.navy,
            cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
          }}
        >
          <Icon d={notesSaved ? ic.check : ic.save} size={13} stroke="currentColor" />
          {notesSaved ? "Notes Saved" : "Save Notes"}
        </button>
        <button style={{
          padding: "7px 16px", background: T.white,
          border: `1px solid ${T.border}`, borderRadius: 8,
          fontSize: 12, fontWeight: 500, color: T.gray,
          cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Icon d={ic.calendar} size={13} stroke={T.gray} />
          Schedule Follow-up
        </button>
        <button
          onClick={handleEnd}
          style={{
            padding: "7px 18px", background: completeConfirm ? T.danger : T.primary,
            border: "none", borderRadius: 8,
            fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s",
          }}
        >
          <Icon d={ic.check} size={14} stroke="#fff" />
          {completeConfirm ? "Confirm Complete" : "Complete Consultation"}
        </button>
      </div>
    </div>
  );
}

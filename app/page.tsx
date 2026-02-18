"use client";
import { useState } from "react";
import Stars from "@/components/Stars";

type Step = 1 | 2 | 3 | 4;

interface Form {
  agentName: string; agentType: string;
  capability: string; personality: string; purpose: string;
}

interface NameResult {
  name: string; domain: string; ipa: string;
  tagline: string; meaning: string; fit: string;
  vibe: "strong" | "gentle" | "mysterious" | "balanced";
}

interface Result {
  analysis: { input_breakdown: string; naming_strategy: string; };
  names: NameResult[];
}

const TYPES = [
  { v: "AI Assistant", e: "🤖", l: "AI Assistant" },
  { v: "Trading Bot", e: "📈", l: "Trading Bot" },
  { v: "Creative Agent", e: "✍️", l: "Creative" },
  { v: "Research Agent", e: "🔬", l: "Research" },
  { v: "Security Agent", e: "🛡️", l: "Security" },
  { v: "Universal Agent", e: "🌌", l: "Universal" },
];

const CAPS = [
  "Writing & Content", "Data Analysis", "Code Generation",
  "Trading & Finance", "Research & Search", "Multi-modal",
  "Orchestration", "Security & Audit",
];

const PERSONALITIES = [
  { v: "sharp", e: "⚡", l: "Sharp", d: "Fast & decisive" },
  { v: "deep", e: "🌊", l: "Deep", d: "Thoughtful & wise" },
  { v: "bold", e: "🔥", l: "Bold", d: "Assertive & fearless" },
  { v: "fluid", e: "✨", l: "Fluid", d: "Adaptive & creative" },
];

const VIBE: Record<string, string> = {
  strong: "vibe-strong", gentle: "vibe-gentle",
  mysterious: "vibe-mysterious", balanced: "vibe-balanced",
};

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<Form>({
    agentName: "", agentType: "", capability: "", personality: "", purpose: "",
  });
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [picked, setPicked] = useState<number | null>(null);

  const generate = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data); setStep(4);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally { setLoading(false); }
  };

  const reset = () => {
    setStep(1); setForm({ agentName: "", agentType: "", capability: "", personality: "", purpose: "" });
    setResult(null); setError(""); setPicked(null);
  };

  return (
    <div style={{ background: "#04000f", minHeight: "100vh" }}>
      <Stars />

      {/* Nebula blobs */}
      <div className="nebula" style={{ top: "10%", left: "15%", width: 400, height: 400, background: "rgba(88,28,220,0.12)" }} />
      <div className="nebula" style={{ bottom: "15%", right: "10%", width: 300, height: 300, background: "rgba(37,99,235,0.1)" }} />
      <div className="nebula" style={{ top: "60%", left: "50%", width: 250, height: 250, background: "rgba(139,92,246,0.08)" }} />

      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 20px" }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", marginBottom: 36, maxWidth: 480 }}>
          <div className="badge badge-purple" style={{ marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6", display: "inline-block", animation: "twinkle 2s infinite" }} />
            ERC-8004 · .agent TLD
          </div>
          <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 10 }}>
            <span className="grad">Agent</span>
            <span style={{ color: "#f0ebff" }}> Naming</span><br />
            <span style={{ color: "#f0ebff" }}>Service</span>
          </h1>
          <p style={{ color: "rgba(200,185,255,0.4)", fontSize: 14, lineHeight: 1.6 }}>
            Name your agent. Register on-chain. Own your identity forever.
          </p>
        </div>

        {/* ── Step indicators ── */}
        {step < 4 && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            {[1, 2, 3].map(s => (
              <div key={s} className={`step-dot ${step === s ? "active" : step > s ? "done" : ""}`} />
            ))}
          </div>
        )}

        {/* ── Card ── */}
        <div style={{ width: "100%", maxWidth: 460 }}>
          <div className="glass fade-up" style={{ borderRadius: 20, padding: "28px 24px" }}>

            {/* STEP 1 */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#f0ebff", marginBottom: 4 }}>Tell us about your agent</div>
                  <div style={{ fontSize: 13, color: "rgba(200,185,255,0.4)" }}>We'll analyze it to craft the perfect identity</div>
                </div>

                <div>
                  <span className="label">Current name or handle</span>
                  <input className="input" placeholder="e.g. MyAgent, Zeon, trading-bot-01"
                    value={form.agentName} onChange={e => setForm({ ...form, agentName: e.target.value })} />
                </div>

                <div>
                  <span className="label">Agent type</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {TYPES.map(t => (
                      <div key={t.v} className={`option-card ${form.agentType === t.v ? "selected" : ""}`}
                        onClick={() => setForm({ ...form, agentType: t.v })}>
                        <div style={{ fontSize: 22, marginBottom: 6 }}>{t.e}</div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(220,210,255,0.85)" }}>{t.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary" disabled={!form.agentName.trim() || !form.agentType}
                  onClick={() => setStep(2)}>
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#f0ebff", marginBottom: 4 }}>Capability & personality</div>
                  <div style={{ fontSize: 13, color: "rgba(200,185,255,0.4)" }}>Shape the identity your name will carry</div>
                </div>

                <div>
                  <span className="label">Primary capability</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {CAPS.map(c => (
                      <div key={c} className={`chip ${form.capability === c ? "selected" : ""}`}
                        onClick={() => setForm({ ...form, capability: c })}>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="label">Personality</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {PERSONALITIES.map(p => (
                      <div key={p.v} className={`option-card ${form.personality === p.v ? "selected" : ""}`}
                        onClick={() => setForm({ ...form, personality: p.v })}
                        style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 18, marginBottom: 4 }}>{p.e}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd6fe", marginBottom: 2 }}>{p.l}</div>
                        <div style={{ fontSize: 11, color: "rgba(200,185,255,0.4)" }}>{p.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary" disabled={!form.capability || !form.personality}
                    onClick={() => setStep(3)}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#f0ebff", marginBottom: 4 }}>Mission statement</div>
                  <div style={{ fontSize: 13, color: "rgba(200,185,255,0.4)" }}>What is this agent's core purpose?</div>
                </div>

                <div>
                  <textarea className="input" rows={4} style={{ resize: "none", lineHeight: 1.7 }}
                    placeholder="e.g. An autonomous trading agent that monitors DeFi protocols 24/7, executes arbitrage strategies, and manages portfolio risk across multiple chains."
                    value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} />
                  <div style={{ fontSize: 11, color: "rgba(200,185,255,0.22)", marginTop: 6 }}>
                    Be specific — better context = better names
                  </div>
                </div>

                {error && (
                  <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#fca5a5" }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn btn-primary" disabled={!form.purpose.trim() || loading} onClick={generate}>
                    {loading ? <><div className="spinner" /> Generating...</> : "✦ Generate Names"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 — Results */}
            {step === 4 && result && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#f0ebff" }}>Your agent names</div>
                    <span className="badge badge-green">3 names</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(200,185,255,0.35)", lineHeight: 1.5 }}>
                    {result.analysis.naming_strategy}
                  </div>
                </div>

                {/* Analysis pill */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(167,139,250,0.1)", borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(167,139,250,0.4)", marginBottom: 6, fontWeight: 600 }}>Analysis</div>
                  <div style={{ fontSize: 12, color: "rgba(200,185,255,0.5)", lineHeight: 1.7 }}>{result.analysis.input_breakdown}</div>
                </div>

                {/* Name cards */}
                {result.names.map((n, i) => (
                  <div key={i} className={`result-card ${picked === i ? "picked" : ""}`}
                    onClick={() => setPicked(picked === i ? null : i)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: "#f0ebff", letterSpacing: "-0.02em", lineHeight: 1 }}>{n.name}</div>
                        <div style={{ fontSize: 11, color: "rgba(200,185,255,0.35)", fontFamily: "monospace", marginTop: 3 }}>{n.ipa}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="domain-chip">{n.domain}</div>
                        <div className={`${VIBE[n.vibe]}`} style={{ fontSize: 11, fontWeight: 500, marginTop: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          {n.vibe}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: 14, color: "rgba(220,210,255,0.65)", fontStyle: "italic", lineHeight: 1.5 }}>
                      "{n.tagline}"
                    </div>

                    {picked === i && (
                      <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(167,139,250,0.1)" }}>
                        <div style={{ fontSize: 13, color: "rgba(210,200,255,0.65)", lineHeight: 1.7, marginBottom: 8 }}>{n.meaning}</div>
                        <div style={{ fontSize: 12, color: "rgba(147,197,253,0.5)", lineHeight: 1.6 }}>→ {n.fit}</div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Footer note */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 12 }}>
                  <span style={{ fontSize: 16 }}>🔗</span>
                  <div style={{ fontSize: 12, color: "rgba(200,185,255,0.45)", lineHeight: 1.5 }}>
                    Tap a name to expand · On-chain registration via <strong style={{ color: "rgba(200,185,255,0.7)" }}>.agent TLD</strong> coming soon
                  </div>
                </div>

                <button className="btn btn-ghost" style={{ marginTop: 4 }} onClick={reset}>
                  ← Generate new names
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <p style={{ fontSize: 11, color: "rgba(200,185,255,0.12)", letterSpacing: "0.05em" }}>
            AGENT NAMING SERVICE · ERC-8004 · .AGENT TLD
          </p>
        </div>
      </div>
    </div>
  );
}

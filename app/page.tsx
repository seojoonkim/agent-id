"use client";

import { useState } from "react";
import Stars from "@/components/Stars";

type Step = 1 | 2 | 3 | 4;

interface FormData {
  agentName: string;
  agentType: string;
  capability: string;
  personality: string;
  purpose: string;
}

interface NameResult {
  name: string;
  domain: string;
  ipa: string;
  tagline: string;
  meaning: string;
  fit: string;
  vibe: "strong" | "gentle" | "mysterious" | "balanced";
}

interface GenerateResult {
  analysis: {
    input_breakdown: string;
    naming_strategy: string;
  };
  names: NameResult[];
}

const AGENT_TYPES = [
  { value: "AI Assistant", icon: "🤖", label: "AI Assistant" },
  { value: "Trading Bot", icon: "📈", label: "Trading Bot" },
  { value: "Creative Agent", icon: "✍️", label: "Creative Agent" },
  { value: "Research Agent", icon: "🔬", label: "Research Agent" },
  { value: "Security Agent", icon: "🛡️", label: "Security Agent" },
  { value: "Universal Agent", icon: "🌌", label: "Universal Agent" },
];

const CAPABILITIES = [
  "Writing & Content", "Data Analysis", "Code Generation",
  "Trading & Finance", "Research & Search", "Multi-modal",
  "Orchestration", "Security & Audit",
];

const PERSONALITIES = [
  { value: "sharp", label: "⚡ Sharp", desc: "Fast, decisive, precise" },
  { value: "deep", label: "🌊 Deep", desc: "Thoughtful, thorough, wise" },
  { value: "bold", label: "🔥 Bold", desc: "Assertive, direct, fearless" },
  { value: "fluid", label: "✨ Fluid", desc: "Adaptive, creative, open" },
];

const VIBE_COLORS: Record<string, string> = {
  strong: "text-red-400",
  gentle: "text-blue-400",
  mysterious: "text-purple-400",
  balanced: "text-green-400",
};

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    agentName: "", agentType: "", capability: "",
    personality: "", purpose: "",
  });
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setForm({ agentName: "", agentType: "", capability: "", personality: "", purpose: "" });
    setResult(null);
    setError("");
    setSelected(null);
  };

  const progress = ((step - 1) / 3) * 100;
  const canNext1 = form.agentName.trim() && form.agentType;
  const canNext2 = form.capability && form.personality;
  const canGenerate = form.purpose.trim();

  return (
    <div className="relative min-h-screen">
      <Stars />

      {/* Bg blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[#010007]" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-900/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 badge badge-purple mb-4">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            ERC-8004 · .agent TLD
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            <span className="text-gradient">Agent</span>
            <span className="text-white"> Naming Service</span>
          </h1>
          <p className="text-purple-200/40 text-sm">
            Name your agent. Register on-chain. Own your identity.
          </p>
        </div>

        {/* Progress */}
        {step < 4 && (
          <div className="w-full max-w-md mb-6">
            <div className="flex justify-between text-xs text-purple-300/30 mb-2">
              <span>Step {step} of 3</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Card */}
        <div className="w-full max-w-lg card-glass rounded-2xl p-7">

          {/* ── STEP 1: Agent Info ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Tell us about your agent</h2>
                <p className="text-purple-300/40 text-xs mt-0.5">We'll analyze it to generate the perfect name</p>
              </div>

              <div>
                <label className="block text-xs text-purple-200/50 mb-1.5">Current name or handle</label>
                <input
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="e.g. MyAgent, Zeon, trading-bot-01"
                  value={form.agentName}
                  onChange={e => setForm({ ...form, agentName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs text-purple-200/50 mb-2">Agent type</label>
                <div className="grid grid-cols-3 gap-2">
                  {AGENT_TYPES.map(t => (
                    <div
                      key={t.value}
                      className={`option-pill rounded-xl p-3 text-center ${form.agentType === t.value ? "active" : ""}`}
                      onClick={() => setForm({ ...form, agentType: t.value })}
                    >
                      <div className="text-xl mb-1">{t.icon}</div>
                      <div className="text-xs text-purple-100">{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn-primary w-full py-3 rounded-xl text-sm"
                disabled={!canNext1}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 2: Capability & Personality ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Capabilities & personality</h2>
                <p className="text-purple-300/40 text-xs mt-0.5">Shape the identity your name will carry</p>
              </div>

              <div>
                <label className="block text-xs text-purple-200/50 mb-2">Primary capability</label>
                <div className="flex flex-wrap gap-2">
                  {CAPABILITIES.map(c => (
                    <div
                      key={c}
                      className={`option-pill rounded-full px-3 py-1.5 text-xs ${form.capability === c ? "active" : ""}`}
                      onClick={() => setForm({ ...form, capability: c })}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-purple-200/50 mb-2">Personality</label>
                <div className="grid grid-cols-2 gap-2">
                  {PERSONALITIES.map(p => (
                    <div
                      key={p.value}
                      className={`option-pill rounded-xl p-3 ${form.personality === p.value ? "active" : ""}`}
                      onClick={() => setForm({ ...form, personality: p.value })}
                    >
                      <div className="text-sm font-medium text-purple-100">{p.label}</div>
                      <div className="text-xs text-purple-300/40 mt-0.5">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-ghost flex-1 py-3 rounded-xl text-sm" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary flex-1 py-3 rounded-xl text-sm" disabled={!canNext2} onClick={() => setStep(3)}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Mission ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Mission statement</h2>
                <p className="text-purple-300/40 text-xs mt-0.5">What is this agent's core purpose?</p>
              </div>

              <div>
                <textarea
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm resize-none leading-relaxed"
                  rows={4}
                  placeholder="e.g. An autonomous trading agent that monitors DeFi protocols 24/7, executes arbitrage strategies, and manages portfolio risk across multiple chains."
                  value={form.purpose}
                  onChange={e => setForm({ ...form, purpose: e.target.value })}
                />
                <p className="text-purple-300/25 text-xs mt-1.5">Be specific — better context = better names</p>
              </div>

              {error && (
                <div className="text-red-400 text-xs p-3 bg-red-400/8 rounded-xl border border-red-400/15">
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <button className="btn-ghost flex-1 py-3 rounded-xl text-sm" onClick={() => setStep(2)}>← Back</button>
                <button
                  className="btn-primary flex-1 py-3 rounded-xl text-sm"
                  disabled={!canGenerate || loading}
                  onClick={handleGenerate}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Generating...
                    </span>
                  ) : "✦ Generate Names"}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Results ── */}
          {step === 4 && result && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-white">Your agent names</h2>
                  <span className="badge badge-green">3 generated</span>
                </div>
                <p className="text-purple-300/40 text-xs">{result.analysis.naming_strategy}</p>
              </div>

              {/* Analysis */}
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <p className="text-purple-200/50 text-xs leading-relaxed">{result.analysis.input_breakdown}</p>
              </div>

              {/* Names */}
              <div className="space-y-3">
                {result.names.map((n, i) => (
                  <div
                    key={i}
                    className={`result-card rounded-xl p-5 cursor-pointer ${selected === i ? "ring-1 ring-purple-500/60" : ""}`}
                    onClick={() => setSelected(selected === i ? null : i)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white tracking-tight">{n.name}</span>
                          <span className="text-purple-300/50 text-xs font-mono">{n.ipa}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs text-purple-400/70 font-mono">{n.domain}</code>
                          <span className={`text-xs font-medium ${VIBE_COLORS[n.vibe]}`}>
                            {n.vibe}
                          </span>
                        </div>
                      </div>
                      <span className="text-purple-400/30 text-xs font-mono">#{i + 1}</span>
                    </div>

                    <p className="text-purple-200/60 text-sm mt-2 italic">"{n.tagline}"</p>

                    {selected === i && (
                      <div className="mt-3 pt-3 border-t border-purple-500/10 space-y-2">
                        <p className="text-purple-100/70 text-xs leading-relaxed">{n.meaning}</p>
                        <p className="text-blue-300/50 text-xs leading-relaxed">→ {n.fit}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <div className="flex items-center gap-1.5 text-xs text-purple-300/30 mb-3">
                  <span className="w-1.5 h-1.5 bg-green-400/60 rounded-full" />
                  Tap a name to see details · Registration via .agent TLD coming soon
                </div>
                <button
                  className="btn-ghost w-full py-2.5 rounded-xl text-sm"
                  onClick={reset}
                >
                  ← Generate new names
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-300/15 text-xs">
            Agent Naming Service · ERC-8004 · .agent TLD
          </p>
        </div>
      </div>
    </div>
  );
}

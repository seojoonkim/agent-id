"use client";
import { useState } from "react";
import Stars from "@/components/Stars";

type Step = 1 | 2 | 3 | 4;
type Lang = "ko" | "en";

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

const T = {
  ko: {
    badge: "범우주적 아이덴티티 프로젝트",
    tagline1: "외계 문명 교신 · AI 에이전트 생태계",
    tagline2: "메타버스를 아우르는 차세대 이름 설계",
    hero_title_1: "범우주적",
    hero_title_2: "아이덴티티",
    hero_desc: "당신의 이름을 분석해 인간·AI·외계 지적생명체·메타버스 아바타 모두가 인식하고 기억할 수 있는 보편적 이름을 설계합니다.",
    scope_title: "적용 범위",
    scope: [
      { icon: "🧬", label: "생물학적", desc: "인간, 외계 지적생명체" },
      { icon: "🤖", label: "디지털", desc: "AI 에이전트, LLM, 로봇" },
      { icon: "🌐", label: "가상", desc: "메타버스 아바타, 게임 캐릭터" },
      { icon: "📡", label: "통신", desc: "성간 메시지, 블록체인" },
    ],
    step: "단계",
    of: "/",
    step1_title: "당신의 이름을 알려주세요",
    step1_sub: "당신의 이름을 바탕으로 범우주적 이름을 만들어드려요",
    name_label: "본인 이름 (한국어 또는 영어)",
    name_ph: "예: 김서준, Simon, 박지민",
    type_label: "어떤 존재를 위한 이름인가요?",
    step2_title: "기능 & 성격",
    step2_sub: "이름이 담을 정체성을 설계합니다",
    cap_label: "주요 기능",
    pers_label: "성격",
    step3_title: "미션 선언",
    step3_sub: "이 에이전트의 핵심 목적은 무엇인가요?",
    purpose_ph: "예: 24시간 DeFi 프로토콜을 모니터링하고, 차익거래 전략을 실행하며, 여러 체인에 걸쳐 포트폴리오 리스크를 관리하는 자율 트레이딩 에이전트.",
    purpose_hint: "구체적일수록 더 좋은 이름이 나와요",
    gen_btn: "✦ 이름 생성",
    generating: "생성 중...",
    back: "← 이전",
    next: "다음 →",
    result_title: "범우주적 이름",
    result_sub: "3개 생성됨",
    analysis_label: "원이름 분석",
    tap_hint: "이름을 탭하면 자세한 내용을 볼 수 있어요",
    chain_note: ".agent TLD 온체인 등록 준비 중",
    reset: "← 다시 생성하기",
    types: [
      { v: "AI 어시스턴트", e: "🤖", l: "AI 어시스턴트" },
      { v: "트레이딩 봇", e: "📈", l: "트레이딩 봇" },
      { v: "창작 에이전트", e: "✍️", l: "창작" },
      { v: "리서치 에이전트", e: "🔬", l: "리서치" },
      { v: "보안 에이전트", e: "🛡️", l: "보안" },
      { v: "범우주 에이전트", e: "🌌", l: "범우주" },
    ],
    caps: ["글쓰기 & 콘텐츠", "데이터 분석", "코드 생성", "트레이딩 & 금융", "리서치 & 검색", "멀티모달", "오케스트레이션", "보안 & 감사"],
    pers: [
      { v: "sharp", e: "⚡", l: "예리함", d: "빠르고 결단력 있는" },
      { v: "deep", e: "🌊", l: "깊이", d: "사려깊고 지혜로운" },
      { v: "bold", e: "🔥", l: "대담함", d: "확고하고 두려움 없는" },
      { v: "fluid", e: "✨", l: "유연함", d: "적응력 있고 창의적인" },
    ],
  },
  en: {
    badge: "Pan-Universal Identity Project",
    tagline1: "Interstellar Communication · AI Agent Ecosystem",
    tagline2: "Next-gen Identity Design for the Metaverse & Beyond",
    hero_title_1: "Pan-Universal",
    hero_title_2: "Identity",
    hero_desc: "We analyze your name to design a universal identity — one that humans, AI agents, extraterrestrial intelligences, and metaverse avatars can all recognize and remember.",
    scope_title: "Applies To",
    scope: [
      { icon: "🧬", label: "Biological", desc: "Humans, alien intelligences" },
      { icon: "🤖", label: "Digital", desc: "AI agents, LLMs, robots" },
      { icon: "🌐", label: "Virtual", desc: "Metaverse avatars, game characters" },
      { icon: "📡", label: "Communication", desc: "Interstellar messages, blockchain" },
    ],
    step: "Step",
    of: "of",
    step1_title: "What's your name?",
    step1_sub: "We'll use your name as the phonetic foundation for your universal identity",
    name_label: "Your name (Korean or English)",
    name_ph: "e.g. Seojun, Simon, Jimin",
    type_label: "What is this identity for?",
    step2_title: "Capability & personality",
    step2_sub: "Shape the identity your name will carry",
    cap_label: "Primary capability",
    pers_label: "Personality",
    step3_title: "Mission statement",
    step3_sub: "What is this agent's core purpose?",
    purpose_ph: "e.g. An autonomous trading agent that monitors DeFi protocols 24/7, executes arbitrage strategies, and manages portfolio risk across multiple chains.",
    purpose_hint: "Be specific — better context = better names",
    gen_btn: "✦ Generate Names",
    generating: "Generating...",
    back: "← Back",
    next: "Continue →",
    result_title: "Universal Names",
    result_sub: "3 generated",
    analysis_label: "Origin Analysis",
    tap_hint: "Tap a name to expand details",
    chain_note: "On-chain registration via .agent TLD coming soon",
    reset: "← Generate new names",
    types: [
      { v: "AI Assistant", e: "🤖", l: "AI Assistant" },
      { v: "Trading Bot", e: "📈", l: "Trading Bot" },
      { v: "Creative Agent", e: "✍️", l: "Creative" },
      { v: "Research Agent", e: "🔬", l: "Research" },
      { v: "Security Agent", e: "🛡️", l: "Security" },
      { v: "Universal Agent", e: "🌌", l: "Universal" },
    ],
    caps: ["Writing & Content", "Data Analysis", "Code Generation", "Trading & Finance", "Research & Search", "Multi-modal", "Orchestration", "Security & Audit"],
    pers: [
      { v: "sharp", e: "⚡", l: "Sharp", d: "Fast & decisive" },
      { v: "deep", e: "🌊", l: "Deep", d: "Thoughtful & wise" },
      { v: "bold", e: "🔥", l: "Bold", d: "Assertive & fearless" },
      { v: "fluid", e: "✨", l: "Fluid", d: "Adaptive & creative" },
    ],
  },
};

const VIBE: Record<string, string> = {
  strong: "vibe-strong", gentle: "vibe-gentle",
  mysterious: "vibe-mysterious", balanced: "vibe-balanced",
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<Form>({
    agentName: "", agentType: "", capability: "", personality: "", purpose: "",
  });
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [picked, setPicked] = useState<number | null>(null);

  const t = T[lang];

  const generate = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
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
      <div className="nebula" style={{ top: "5%", left: "10%", width: 500, height: 500, background: "rgba(76,29,149,0.12)" }} />
      <div className="nebula" style={{ bottom: "10%", right: "5%", width: 350, height: 350, background: "rgba(30,64,175,0.1)" }} />
      <div className="nebula" style={{ top: "55%", left: "45%", width: 280, height: 280, background: "rgba(109,40,217,0.07)" }} />

      {/* Lang toggle */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 100, display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 10, padding: 4 }}>
        {(["ko", "en"] as Lang[]).map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            padding: "4px 12px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: lang === l ? "rgba(139,92,246,0.3)" : "transparent",
            color: lang === l ? "#ddd6fe" : "rgba(200,185,255,0.4)",
            transition: "all 0.15s",
          }}>
            {l === "ko" ? "KO" : "EN"}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 36, maxWidth: 520 }}>
          <div className="badge badge-purple" style={{ marginBottom: 14, fontSize: 13, padding: "6px 14px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#8b5cf6", display: "inline-block" }} />
            {t.badge}
          </div>
          <div style={{ fontSize: 14, color: "rgba(167,139,250,0.55)", letterSpacing: "0.04em", marginBottom: 18, lineHeight: 2 }}>
            {t.tagline1}<br />{t.tagline2}
          </div>
          <h1 style={{ fontSize: "clamp(38px,7vw,58px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            <span className="grad">{t.hero_title_1}</span><br />
            <span style={{ color: "#f0ebff" }}>{t.hero_title_2}</span>
          </h1>
          <p style={{ color: "rgba(200,185,255,0.55)", fontSize: 15, lineHeight: 1.9, marginBottom: 24, maxWidth: 440 }}>
            {t.hero_desc}
          </p>

          {/* Scope pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {t.scope.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 100, padding: "7px 14px", fontSize: 13, color: "rgba(200,185,255,0.55)" }}>
                <span style={{ fontSize: 15 }}>{s.icon}</span>
                <span style={{ fontWeight: 700, color: "rgba(200,185,255,0.8)" }}>{s.label}</span>
                <span style={{ color: "rgba(167,139,250,0.4)" }}>·</span>
                <span>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step dots */}
        {step < 4 && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            {[1, 2, 3].map(s => (
              <div key={s} className={`step-dot ${step === s ? "active" : step > s ? "done" : ""}`} />
            ))}
          </div>
        )}

        {/* Card */}
        <div style={{ width: "100%", maxWidth: 460 }}>
          <div className="glass fade-up" style={{ borderRadius: 20, padding: "28px 24px" }}>

            {/* STEP 1 */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#f0ebff", marginBottom: 6 }}>{t.step1_title}</div>
                  <div style={{ fontSize: 14, color: "rgba(200,185,255,0.5)", lineHeight: 1.6 }}>{t.step1_sub}</div>
                </div>
                <div>
                  <span className="label" style={{ fontSize: 12 }}>{t.name_label}</span>
                  <input className="input" style={{ fontSize: 16 }} placeholder={t.name_ph}
                    value={form.agentName} onChange={e => setForm({ ...form, agentName: e.target.value })} />
                </div>
                <div>
                  <span className="label" style={{ fontSize: 12 }}>{t.type_label}</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {t.types.map(tp => (
                      <div key={tp.v} className={`option-card ${form.agentType === tp.v ? "selected" : ""}`}
                        onClick={() => setForm({ ...form, agentType: tp.v })}>
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{tp.e}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(220,210,255,0.9)" }}>{tp.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="btn btn-primary" style={{ fontSize: 16, padding: "15px 24px" }} disabled={!form.agentName.trim() || !form.agentType} onClick={() => setStep(2)}>
                  {t.next}
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#f0ebff", marginBottom: 3 }}>{t.step2_title}</div>
                  <div style={{ fontSize: 12, color: "rgba(200,185,255,0.4)" }}>{t.step2_sub}</div>
                </div>
                <div>
                  <span className="label">{t.cap_label}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {t.caps.map(c => (
                      <div key={c} className={`chip ${form.capability === c ? "selected" : ""}`}
                        onClick={() => setForm({ ...form, capability: c })}>{c}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="label">{t.pers_label}</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {t.pers.map(p => (
                      <div key={p.v} className={`option-card ${form.personality === p.v ? "selected" : ""}`}
                        onClick={() => setForm({ ...form, personality: p.v })} style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 18, marginBottom: 4 }}>{p.e}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd6fe", marginBottom: 2 }}>{p.l}</div>
                        <div style={{ fontSize: 11, color: "rgba(200,185,255,0.4)" }}>{p.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>{t.back}</button>
                  <button className="btn btn-primary" disabled={!form.capability || !form.personality} onClick={() => setStep(3)}>{t.next}</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#f0ebff", marginBottom: 3 }}>{t.step3_title}</div>
                  <div style={{ fontSize: 12, color: "rgba(200,185,255,0.4)" }}>{t.step3_sub}</div>
                </div>
                <div>
                  <textarea className="input" rows={4} style={{ resize: "none", lineHeight: 1.7 }}
                    placeholder={t.purpose_ph}
                    value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} />
                  <div style={{ fontSize: 11, color: "rgba(200,185,255,0.22)", marginTop: 6 }}>{t.purpose_hint}</div>
                </div>
                {error && (
                  <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#fca5a5" }}>{error}</div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>{t.back}</button>
                  <button className="btn btn-primary" disabled={!form.purpose.trim() || loading} onClick={generate}>
                    {loading ? <><div className="spinner" /> {t.generating}</> : t.gen_btn}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && result && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 17, fontWeight: 700, color: "#f0ebff" }}>{t.result_title}</span>
                    <span className="badge badge-green">{t.result_sub}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(200,185,255,0.35)", lineHeight: 1.5 }}>{result.analysis.naming_strategy}</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(167,139,250,0.1)", borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(167,139,250,0.4)", marginBottom: 5, fontWeight: 600 }}>{t.analysis_label}</div>
                  <div style={{ fontSize: 12, color: "rgba(200,185,255,0.5)", lineHeight: 1.7 }}>{result.analysis.input_breakdown}</div>
                </div>

                {result.names.map((n, i) => (
                  <div key={i} className={`result-card ${picked === i ? "picked" : ""}`} onClick={() => setPicked(picked === i ? null : i)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: "#f0ebff", letterSpacing: "-0.02em", lineHeight: 1 }}>{n.name}</div>
                        <div style={{ fontSize: 11, color: "rgba(200,185,255,0.35)", fontFamily: "monospace", marginTop: 3 }}>{n.ipa}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="domain-chip">{n.domain}</div>
                        <div className={VIBE[n.vibe]} style={{ fontSize: 10, fontWeight: 600, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>{n.vibe}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(220,210,255,0.6)", fontStyle: "italic" }}>"{n.tagline}"</div>
                    {picked === i && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(167,139,250,0.1)" }}>
                        <div style={{ fontSize: 12, color: "rgba(210,200,255,0.65)", lineHeight: 1.7, marginBottom: 6 }}>{n.meaning}</div>
                        <div style={{ fontSize: 12, color: "rgba(147,197,253,0.5)", lineHeight: 1.6 }}>→ {n.fit}</div>
                      </div>
                    )}
                  </div>
                ))}

                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.1)", borderRadius: 12 }}>
                  <span>🔗</span>
                  <div style={{ fontSize: 11, color: "rgba(200,185,255,0.4)", lineHeight: 1.5 }}>
                    {t.tap_hint} · <strong style={{ color: "rgba(200,185,255,0.6)" }}>{t.chain_note}</strong>
                  </div>
                </div>
                <button className="btn btn-ghost" onClick={reset}>{t.reset}</button>
              </div>
            )}

          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <p style={{ fontSize: 10, color: "rgba(200,185,255,0.1)", letterSpacing: "0.06em", lineHeight: 2 }}>
            {lang === "ko"
              ? "범우주적 아이덴티티 프로젝트 · ERC-8004 · .AGENT TLD"
              : "PAN-UNIVERSAL IDENTITY PROJECT · ERC-8004 · .AGENT TLD"}
          </p>
        </div>
      </div>
    </div>
  );
}

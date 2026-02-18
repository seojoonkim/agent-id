import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentName, agentType, capability, personality, purpose } = body;

    const prompt = `You are an expert in Agent Naming Service (ANS) — the ENS for AI agents.
Your job is to generate unique, memorable, on-chain agent identity names.

NAME DESIGN PRINCIPLES:
- Universal: pronounceable in any language (use simple phonemes)
- Short: 2-3 syllables max (like ENS names: alice.eth, vitalik.eth)
- Distinctive: evokes the agent's purpose and personality  
- Agent-native: sounds like it belongs to an AI agent, not a human
- Examples of good agent names: Sion, Zeon, Mion, Kael, Lyra, Nexo, Vael, Oryn

INPUT:
- Agent's current name/handle: ${agentName}
- Agent type: ${agentType}
- Primary capability: ${capability}
- Personality: ${personality}
- Purpose/mission: ${purpose}

Generate 3 unique agent identity names. Each name will be registered as:
[name].id.agent (on .agent TLD) + linked to ERC-8004 on-chain identity.

Respond ONLY with this exact JSON format:
{
  "analysis": {
    "input_breakdown": "Brief phonetic/semantic analysis of the input name (2 sentences)",
    "naming_strategy": "What approach was used to generate these names (1 sentence)"
  },
  "names": [
    {
      "name": "Agentname",
      "domain": "agentname.id.agent",
      "ipa": "/IPA pronunciation/",
      "tagline": "One punchy line about this agent identity (max 8 words)",
      "meaning": "Etymology and meaning behind this name (2-3 sentences)",
      "fit": "Why this name fits this specific agent (1-2 sentences)",
      "vibe": "strong|gentle|mysterious|balanced"
    },
    {
      "name": "Agentname",
      "domain": "agentname.id.agent",
      "ipa": "/IPA/",
      "tagline": "One punchy line",
      "meaning": "Etymology and meaning (2-3 sentences)",
      "fit": "Why this fits (1-2 sentences)",
      "vibe": "strong|gentle|mysterious|balanced"
    },
    {
      "name": "Agentname",
      "domain": "agentname.id.agent",
      "ipa": "/IPA/",
      "tagline": "One punchy line",
      "meaning": "Etymology and meaning (2-3 sentences)",
      "fit": "Why this fits (1-2 sentences)",
      "vibe": "strong|gentle|mysterious|balanced"
    }
  ]
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Name generation failed. Please try again." },
      { status: 500 }
    );
  }
}

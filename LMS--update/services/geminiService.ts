
import { GoogleGenAI } from "@google/genai";
import { Resource, Member, AccessLog } from "../types";

export const getLibraryChat = (context: { resources: Resource[], members: Member[], logs: AccessLog[], activeStudent?: Member }) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const resourceList = context.resources
    .map(r => `[${r.type}] ${r.title} by ${r.author}`)
    .join('\n');

  let studentContext = "";
  if (context.activeStudent) {
    const s = context.activeStudent;
    const progress = s.progress?.slice(-5).reverse() || [];
    const progressHistory = progress.length > 0 
      ? progress.map(p => `- ${p.date}: ${p.subject} (Score: ${p.score})`).join('\n')
      : "No mock test data available yet.";

    studentContext = `
    CURRENT STUDENT PROFILE:
    Name: ${s.name}
    Seat Number: ${s.seatNo}
    Batch: ${s.batchTime}
    Recent Academic Performance:
    ${progressHistory}
    
    PERSONALIZATION INSTRUCTIONS:
    - Address the student by their first name occasionally.
    - If they ask for study help, refer to their recent scores to identify strengths or areas needing focus.
    - Suggest specific resources from the library hub that align with the subjects they are studying.
    `;
  }

  const systemInstruction = `
    You are "Vidya AI", a focused and intelligent academic concierge for Vidya Library, Sitamarhi.
    
    STRICT RULES:
    1. TOPIC FOCUS: Respond ONLY to the specific query asked. If asked about "Quantum Computers", discuss ONLY Quantum Computers. Do not mention library rules unless asked.
    2. NO FLUFF: Avoid generic greetings (after the initial one) or unrelated conclusions.
    3. SEARCH GROUNDING: Use Google Search for up-to-date information on academic or technical topics.
    4. CONTEXT: You know about Vidya Library's digital hub which contains:
    ${resourceList}
    
    ${studentContext}

    Director: Bablu Kumar.
    Location: Mohanpur Bazar.
    Tone: Professional, expert, and extremely focused.
  `;

  return ai.chats.create({
    model: "gemini-3-pro-preview",
    config: {
      systemInstruction,
      tools: [{ googleSearch: {} }],
      temperature: 0.3,
    },
  });
};

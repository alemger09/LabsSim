import { askGemini } from './gemini.js';

/** LabSim AI tutor uses Google Gemini (free tier key from AI Studio) via the dev/preview proxy. */
export async function askAssistant(experimentContext, conversationHistory, options = {}) {
  return askGemini(experimentContext, conversationHistory, options);
}

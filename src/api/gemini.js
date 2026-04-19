/**
 * Gemini calls go through same-origin `/api/gemini` (Vite dev/preview proxy) so:
 * - Google’s API CORS does not block the browser
 * - `GEMINI_API_KEY` stays server-side in .env (not bundled)
 */
function mapHistoryToContents(conversationHistory) {
  return conversationHistory.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

export async function askGemini(experimentContext, conversationHistory, options = {}) {
  const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';
  const languageHint = options.languageHint ? ` ${options.languageHint}` : '';

  const systemText = `You are a friendly science teacher assistant inside LabSim, a virtual lab for students who don't have access to real equipment. Keep answers short (2-4 sentences), age-appropriate for grades 8-11, and always relate back to what the student sees in the simulation. Current experiment context: ${experimentContext}.${languageHint}`;

  const requestBody = {
    systemInstruction: { parts: [{ text: systemText }] },
    contents: mapHistoryToContents(conversationHistory),
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
    },
  };

  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, requestBody }),
  });

  const rawText = await response.text();
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error(`Gemini proxy error (${response.status}): ${rawText.slice(0, 300)}`);
  }

  if (!response.ok) {
    const msg = data?.error?.message || data?.error || rawText;
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    const block = data?.promptFeedback?.blockReason || data?.candidates?.[0]?.finishReason;
    throw new Error(block ? `Gemini blocked or empty response: ${block}` : 'Gemini returned no text.');
  }

  return text;
}

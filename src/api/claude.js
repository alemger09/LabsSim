const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

function mapHistoryToMessages(conversationHistory) {
  return conversationHistory.map((m) => ({
    role: m.role,
    content: m.content,
  }));
}

export async function askClaude(experimentContext, conversationHistory, options = {}) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Missing VITE_ANTHROPIC_API_KEY in environment.');
  }

  const languageHint = options.languageHint ? ` ${options.languageHint}` : '';

  const body = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: `You are a friendly science teacher assistant inside LabSim, a virtual lab for students who don't have access to real equipment. Keep answers short (2-4 sentences), age-appropriate for grades 8-11, and always relate back to what the student sees in the simulation. Current experiment context: ${experimentContext}.${languageHint}`,
    messages: mapHistoryToMessages(conversationHistory),
  };

  const response = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API request failed: ${errorText}`);
  }

  const data = await response.json();
  return data?.content?.[0]?.text || 'Sorry, I could not get a response from the assistant.';
}

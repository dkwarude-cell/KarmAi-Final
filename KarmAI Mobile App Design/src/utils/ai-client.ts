/**
 * Communicates with the AMD ROCm-powered FastAPI backend.
 */
const API_BASE_URL = import.meta.env.VITE_AI_BACKEND_URL || 'http://localhost:8000';

export interface ChatRequestPayload {
  prompt: string;
  max_tokens?: number;
}

export const fetchAIConciergeResponse = async (payload: ChatRequestPayload): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: payload.prompt,
        max_tokens: payload.max_tokens || 256,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI Backend Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Failed to connect to AMD AI backend:", error);
    return "I'm sorry, my compute clusters seem to be offline right now. Try again later.";
  }
};

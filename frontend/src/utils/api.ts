export type ClassifyResponse = {
  intent: string;
  confidence: number;
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_BASE_URL = "http://localhost:8000";

export async function classifyPrompt(text: string): Promise<ClassifyResponse> {
  const response = await fetch(`${API_BASE_URL}/classify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Classify request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<ClassifyResponse>;
}


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const solveMathProblem = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful math assistant. Solve the following mathematical query or word problem clearly and concisely. If it is a direct calculation, provide the result prominently. 
      Query: ${prompt}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "Sorry, I couldn't compute that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to math assistant.";
  }
};

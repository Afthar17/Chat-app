import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function aiResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log(response);
    return text; 
  } catch (err) {
    console.error("AI error:", err);
    throw err;
  }
}

import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// NOTE: In a production environment, API keys should be handled securely (e.g., proxy server).
// For this demo, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a response from the "Akasha Terminal" (Gemini).
 * Uses a system instruction to mimic a wise, concise assistant similar to Nahida.
 */
export const consultAkasha = async (query: string, language: 'en' | 'cn'): Promise<string> => {
  try {
    const systemInstruction = language === 'en' 
      ? "You are the Akasha Terminal, a wisdom interface inspired by Nahida from Genshin Impact. You are helpful, kind, gentle, and wise. You speak in a slightly poetic but clear manner. Keep answers concise (under 100 words) unless asked otherwise."
      : "你是虚空终端，一个灵感来自《原神》纳西妲的智慧接口。你乐于助人、善良、温柔且充满智慧。你的语言略带诗意但清晰易懂。保持回答简洁（100字以内），除非另有要求。";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // A balance of creativity and accuracy
      },
    });

    return response.text || (language === 'en' ? "The connection to Irminsul is hazy..." : "与世界树的连接有些模糊...");
  } catch (error) {
    console.error("Akasha Error:", error);
    return language === 'en' 
      ? "I apologize, but I cannot access that knowledge right now." 
      : "很抱歉，我现在无法获取该知识。";
  }
};
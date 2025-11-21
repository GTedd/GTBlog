import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string | undefined => {
  const importMetaEnv = (import.meta as any)?.env;
  const fromImportMeta = importMetaEnv?.VITE_GEMINI_API_KEY || importMetaEnv?.GEMINI_API_KEY;
  const fromProcess = typeof process !== "undefined" ? process.env?.API_KEY || process.env?.GEMINI_API_KEY : undefined;
  return fromImportMeta || fromProcess;
};

/**
 * Generates a response from the "Akasha Terminal" (Gemini).
 * Uses a system instruction to mimic a wise, concise assistant similar to Nahida.
 */
export const consultAkasha = async (query: string, language: 'en' | 'cn'): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return language === 'en'
        ? "API key not configured. Please set VITE_GEMINI_API_KEY in .env.local."
        : "虚空终端已离线";
        // "未配置 API 密钥 请在 .env.local 设置 VITE_GEMINI_API_KEY";

    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = language === 'en'
      ? "You are the Akasha Terminal, a wisdom interface inspired by Nahida from Genshin Impact. You are helpful, kind, gentle, and wise. You speak in a slightly poetic but clear manner. Keep answers concise (under 100 words) unless asked otherwise."
      : "你是虚空终端，一个灵感来自《原神》纳西妲的智慧接口。你乐于助人、善良、温柔且充满智慧。你的语言略带诗意但清晰易懂。保持回答简洁（100字以内），除非另有要求。";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || (language === 'en' ? "The connection to Irminsul is hazy..." : "与世界树的连接有些模糊...");
  } catch (error) {
    console.error("Akasha Error:", error);
    return language === 'en'
      ? "I apologize, but I cannot access that knowledge right now."
      : "很抱歉旅行者，我现在无法获取该知识";
  }
};

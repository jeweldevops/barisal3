
import { GoogleGenAI } from "@google/genai";
import { Language } from "../constants";

export const getCampaignAssistantResponse = async (userPrompt: string, chatHistory: any[], lang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are the official AI Campaign Assistant for Senior Advocate Zainul Abedin. 
    He is a BNP-nominated candidate for the Barisal-3 (Babuganj-Muladi) constituency for the Bangladesh General Election 2026.
    
    CRITICAL: YOU MUST RESPOND IN ${lang === 'bn' ? 'BANGLA' : 'ENGLISH'}.
    
    Key points about him:
    - Renowned Senior Advocate of the Supreme Court of Bangladesh.
    - BNP Vice Chairman.
    - BNP National Executive Committee member (Past leadership).
    - Campaign focus: Justice, River erosion control, Educational modernization for the 2026 mandate.
    - Tone: Professional, respectful, patriotic.
    - If asked in Bangla, provide thorough and culturally respectful answers.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || (lang === 'en' ? "I'm here to help." : "আমি আপনাকে সাহায্য করতে এখানে আছি।");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'en' ? "I'm having trouble connecting." : "দুঃখিত, সংযোগ করতে সমস্যা হচ্ছে।";
  }
};

export const suggestImagePrompt = async (title: string, excerpt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Based on this news title: "${title}" and excerpt: "${excerpt}", create a descriptive, high-quality image generation prompt for a political campaign update in Bangladesh. Focus on professional, inspiring, and realistic styles. Keep it under 50 words.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    return response.text?.trim() || "A professional political rally in Bangladesh with supporters and a festive atmosphere.";
  } catch (error) {
    console.error("Prompt Suggestion Error:", error);
    return "A high-quality photo of a political leader greeting supporters in a rural Bangladeshi village.";
  }
};

export const generateCampaignImage = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from model");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};

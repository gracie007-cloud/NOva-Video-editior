import { GoogleGenAI } from "@google/genai";

// Initialize the client strictly according to guidelines
// Note: process.env.API_KEY is assumed to be available
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAISubtitles = async (textContext: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate synchronized subtitles for a video with the following context/transcript snippet. 
    Format as SRT or JSON with timestamps. Context: ${textContext}`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster simple tasks
      }
    });

    return response.text || "No subtitles generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating subtitles. Please check API Key.";
  }
};

export const suggestEdits = async (sceneDescription: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `I am editing a video. Here is the scene description: "${sceneDescription}". 
        Suggest 3 creative edit ideas (cuts, effects, or transitions) to make it more engaging for social media.`;
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        
        return response.text || "No suggestions available.";
    } catch (error) {
        console.error("Gemini Suggestion Error", error);
        return "Could not fetch suggestions.";
    }
}
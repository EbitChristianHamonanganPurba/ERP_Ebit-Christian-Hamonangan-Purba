
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  // The UI will likely fail gracefully if the key is missing.
  console.warn("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = "Anda adalah agen ekstraksi data otomatis untuk sistem ERP. Tugas Anda adalah membaca gambar faktur atau surat jalan dan mengonversinya menjadi format JSON yang ketat. Jangan tambahkan teks pembuka atau penutup, hanya objek JSON.";

export const extractDataFromInvoice = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash', // gemini-flash is a good choice for multimodal tasks
      contents: {
          parts: [
              { text: systemInstruction },
              {
                  inlineData: {
                      data: base64Image,
                      mimeType: mimeType
                  }
              }
          ]
      },
    });

    if (response.text) {
        return response.text;
    } else {
        throw new Error("No text response from Gemini API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to process the invoice with Gemini API.");
  }
};

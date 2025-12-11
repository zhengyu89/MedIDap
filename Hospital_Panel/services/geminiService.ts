import { GoogleGenAI, Type } from "@google/genai";

// Lazy initialization
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API Key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
      throw new Error("VITE_GEMINI_API_KEY is not set.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const analyzeMedicalDocument = async (base64Image: string): Promise<string> => {
  try {
    const model = "gemini-2.5-flash-lite";

    const prompt = `
      Analyze the provided medical document image. 
      Extract the following information and structure it into a valid FHIR R4 Bundle JSON format.
      
      The Bundle should contain:
      1. A 'Patient' resource (mock details if name not visible, infer age/gender).
      2. A 'DiagnosticReport' resource for the main finding.
      3. 'Observation' resources for specific test results (e.g., Blood Pressure, Glucose).
      4. A 'Condition' resource for the diagnosis.

      IMPORTANT: Return ONLY the raw JSON string. Do not include markdown formatting like \`\`\`json.
    `;

    const response = await getAiClient().models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        temperature: 0.1, // Low temperature for factual extraction
      }
    });

    let text = response.text || "{}";
    // Clean up if model adds markdown despite instructions
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return text;

  } catch (error) {
    console.error("Gemini OCR Error:", error);
    throw new Error("Failed to process medical document.");
  }
};

export const analyzeMedicalText = async (medicalText: string): Promise<string> => {
  try {
    const model = "gemini-2.5-flash-lite";

    const prompt = `
      Analyze the provided medical text notes. 
      Extract the information and structure it into a valid FHIR R4 Bundle JSON format.
      
      The Bundle should contain:
      1. A 'Patient' resource (mock details if name not provided, infer age/gender).
      2. A 'DiagnosticReport' resource for the main finding.
      3. 'Observation' resources for specific test results (e.g., Blood Pressure, Glucose).
      4. A 'Condition' resource for the diagnosis.

      Medical Text:
      "${medicalText}"

      IMPORTANT: Return ONLY the raw JSON string. Do not include markdown formatting like \`\`\`json.
    `;

    const response = await getAiClient().models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.1, // Low temperature for factual extraction
      }
    });

    let text = response.text || "{}";
    // Clean up if model adds markdown despite instructions
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return text;

  } catch (error) {
    console.error("Gemini Text Processing Error:", error);
    throw new Error("Failed to process medical text.");
  }
};

export const parseFHIRToUI = async (fhirJson: string) => {
  // In a real app, we would parse the FHIR JSON to populate the UI.
  // For this demo, we use Gemini to explain the FHIR back to the UI structure 
  // to ensure the user understands what happened, or we simply rely on the UI 
  // to display the raw JSON alongside a mock parsed result for the specific demo flow.

  // This function is a helper to generate a summary if needed.
  const model = "gemini-2.5-flash";
  const prompt = `
      Summarize the following FHIR JSON into a short clinical note string.
      JSON: ${fhirJson}
    `;

  const response = await getAiClient().models.generateContent({
    model,
    contents: prompt
  });

  return response.text;
}
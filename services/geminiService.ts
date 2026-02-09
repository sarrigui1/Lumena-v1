
import { GoogleGenAI, Type } from "@google/genai";
import { AthleteStats, GeminiInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPerformanceInsight = async (athlete: AthleteStats): Promise<GeminiInsight> => {
  const prompt = `Analiza los siguientes datos de rendimiento de un atleta de élite y proporciona recomendaciones específicas para su mejora:
  Nombre: ${athlete.name}
  Velocidad: ${athlete.speed}/100
  Resistencia: ${athlete.stamina}/100
  Agilidad: ${athlete.agility}/100
  Recuperación: ${athlete.recovery}/100
  Puntuación General: ${athlete.performanceScore}/100
  
  Devuelve el análisis en español con un tono profesional de entrenador de alto rendimiento.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING, description: "Un breve análisis técnico del perfil actual." },
          recommendations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Lista de 3 a 5 recomendaciones accionables."
          },
          priorityLevel: { 
            type: Type.STRING, 
            enum: ["High", "Medium", "Low"],
            description: "Nivel de urgencia de las mejoras."
          }
        },
        required: ["analysis", "recommendations", "priorityLevel"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as GeminiInsight;
};

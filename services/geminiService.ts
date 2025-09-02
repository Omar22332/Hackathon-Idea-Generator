import { GoogleGenAI, Type } from "@google/genai";
import type { HackathonIdea, TeamRole } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ideaSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "A catchy name for the project." },
      description: { type: Type.STRING, description: "A concise 2-3 sentence description of the project." },
      features: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 3-5 key features for the project."
      },
      techStack: {
        type: Type.OBJECT,
        properties: {
          frontend: { type: Type.STRING },
          backend: { type: Type.STRING },
          database: { type: Type.STRING },
          apis: { type: Type.STRING, description: "Potential APIs to use." },
        },
        required: ["frontend", "backend", "database", "apis"]
      },
      challenges: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 2-3 potential challenges."
      },
    },
    required: ["name", "description", "features", "techStack", "challenges"]
  }
};

const rolesSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            role: { type: Type.STRING, description: "The title of the team role." },
            description: { type: Type.STRING, description: "A short description of what this role entails." },
            responsibilities: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 3 key responsibilities for this role in the project."
            }
        },
        required: ["role", "description", "responsibilities"]
    }
};

export const generateHackathonIdeas = async (theme: string): Promise<HackathonIdea[]> => {
  try {
    const prompt = `You are an expert hackathon mentor. Your task is to generate 3 innovative and feasible hackathon project ideas based on the theme: '${theme}'. The ideas should be creative but achievable within a 24-48 hour timeframe. For each idea, provide a catchy name, a concise description, a list of key features, a recommended tech stack, and potential challenges. Respond ONLY with a JSON array that adheres to the provided schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ideaSchema,
      },
    });
    
    const jsonStr = response.text.trim();
    // In case the model returns a markdown code block
    const sanitizedJsonStr = jsonStr.startsWith("```json") ? jsonStr.substring(7, jsonStr.length - 3) : jsonStr;
    const ideas: HackathonIdea[] = JSON.parse(sanitizedJsonStr);
    return ideas;
  } catch (error) {
    console.error("Error generating hackathon ideas:", error);
    throw new Error("Failed to generate ideas. Please check your API key and try again.");
  }
};

export const generateTeamRoles = async (ideaTitle: string, ideaDescription: string): Promise<TeamRole[]> => {
    try {
        const prompt = `You are an expert tech project manager. For a hackathon project titled '${ideaTitle}' with the description: '${ideaDescription}', generate a list of 3-4 essential team roles required to build it. For each role, provide the role title, a short description, and a list of key responsibilities for this specific project. Respond ONLY with a JSON array that adheres to the provided schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: rolesSchema,
            },
        });
        
        const jsonStr = response.text.trim();
        // In case the model returns a markdown code block
        const sanitizedJsonStr = jsonStr.startsWith("```json") ? jsonStr.substring(7, jsonStr.length - 3) : jsonStr;
        const roles: TeamRole[] = JSON.parse(sanitizedJsonStr);
        return roles;
    } catch (error) {
        console.error("Error generating team roles:", error);
        throw new Error("Failed to generate team roles. Please try again.");
    }
};
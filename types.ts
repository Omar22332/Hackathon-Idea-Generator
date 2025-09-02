export interface TechStack {
  frontend: string;
  backend: string;
  database: string;
  apis: string;
}

export interface HackathonIdea {
  name: string;
  description: string;
  features: string[];
  techStack: TechStack;
  challenges: string[];
}

export interface TeamRole {
  role: string;
  description: string;
  responsibilities: string[];
}
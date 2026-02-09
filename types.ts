
export interface AthleteStats {
  id: string;
  name: string;
  speed: number;
  stamina: number;
  agility: number;
  recovery: number;
  performanceScore: number;
}

export interface TrainingSession {
  id: string;
  date: string;
  type: string;
  duration: string;
  intensity: 'Baja' | 'Media' | 'Alta';
  notes: string;
}

export interface GeminiInsight {
  analysis: string;
  recommendations: string[];
  priorityLevel: 'High' | 'Medium' | 'Low';
}

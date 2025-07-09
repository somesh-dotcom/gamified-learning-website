export interface User {
  id: string;
  username: string;
  stars: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl?: string;
}

export interface LevelData {
  id: number;
  name: string;
  description: string;
  questions: Question[];
  stars: number;
  completed: boolean;
  unlocked: boolean;
}

export interface GameState {
  currentUser: User | null;
  levels: LevelData[];
  users: User[];
}
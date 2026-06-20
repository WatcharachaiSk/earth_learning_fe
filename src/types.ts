export interface User {
  name: string;
  email: string;
}

export interface Word {
  id: string;
  word: string;
  wordClass: 'Noun' | 'Verb' | 'Adjective' | 'Adverb' | 'Preposition' | 'Conjunction';
  phonetic: string;
  translation: string;
  definitionEn: string;
  definitionTh: string;
  exampleEn: string;
  exampleTh: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Daily Life' | 'Business' | 'Travel' | 'Academic' | 'Technology' | 'Emotion';
  mnemonic?: {
    story: string;
    keyword: string;
  };
}

export interface UserProgress {
  xp: number;
  streak: number;
  completedWordIds: string[];
  favoritedWordIds: string[];
  lastActiveDate: string | null; // ISO Date YYYY-MM-DD
  dailyGoalXp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  suggestedPhrases?: string[];
}

export interface QuizQuestion {
  id: string;
  word: Word;
  type: 'multiple-choice' | 'spelling' | 'definition-match';
  questionText: string;
  options?: string[]; // For multiple choice
  correctAnswer: string;
  hint?: string;
}

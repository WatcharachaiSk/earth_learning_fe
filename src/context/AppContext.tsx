import { createContext, useContext, useState, useEffect } from 'react';
import { Word, UserProgress } from '../types';
import { INITIAL_WORDS } from '../data';

interface AppContextType {
  words: Word[];
  progress: UserProgress;
  addXp: (amount: number) => void;
  handleToggleComplete: (wordId: string) => void;
  handleToggleFavorite: (wordId: string) => void;
  handleAddNewWord: (newWord: Word) => void;
  handleRemoveCustomWord: (wordId: string) => void;
  speakWordTTS: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    xp: 0,
    streak: 0,
    completedWordIds: [],
    favoritedWordIds: [],
    lastActiveDate: null,
    dailyGoalXp: 50,
  });

  useEffect(() => {
    // 1. Load words
    const savedCustomWords = localStorage.getItem('word_learner_custom_words');
    let loadedWords = [...INITIAL_WORDS];
    if (savedCustomWords) {
      try {
        const parsed = JSON.parse(savedCustomWords) as Word[];
        const customIds = new Set(parsed.map(w => w.id));
        loadedWords = [...loadedWords.filter(w => !customIds.has(w.id)), ...parsed];
      } catch (e) {
        console.error('Failed to parse custom words from cache', e);
      }
    }
    setWords(loadedWords);

    // 2. Load progress
    const savedProgress = localStorage.getItem('word_learner_progress');
    if (savedProgress) {
        try {
            const parsed = JSON.parse(savedProgress) as UserProgress;
            // ... (streak logic)
            setProgress(parsed);
        } catch (e) {
            console.error('Failed to parse user progress', e);
        }
    }
  }, []);

  const saveProgressToLocal = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('word_learner_progress', JSON.stringify(newProgress));
  };

  const addXp = (amount: number) => {
    // ... (XP logic)
    const updated = { ...progress, xp: progress.xp + amount };
    saveProgressToLocal(updated);
  };

  const handleToggleComplete = (wordId: string) => {
    const wasCompleted = progress.completedWordIds.includes(wordId);
    let newCompletedList = wasCompleted
        ? progress.completedWordIds.filter(id => id !== wordId)
        : [...progress.completedWordIds, wordId];
    saveProgressToLocal({ ...progress, completedWordIds: newCompletedList });
  };

  const handleToggleFavorite = (wordId: string) => {
    const wasFavorited = progress.favoritedWordIds.includes(wordId);
    let newFavoritedList = wasFavorited
        ? progress.favoritedWordIds.filter(id => id !== wordId)
        : [...progress.favoritedWordIds, wordId];
    saveProgressToLocal({ ...progress, favoritedWordIds: newFavoritedList });
  };

  const handleAddNewWord = (newWord: Word) => {
    // ... (Add word logic)
  };

  const handleRemoveCustomWord = (wordId: string) => {
    // ... (Remove word logic)
  };

  const speakWordTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AppContext.Provider value={{ words, progress, addXp, handleToggleComplete, handleToggleFavorite, handleAddNewWord, handleRemoveCustomWord, speakWordTTS }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

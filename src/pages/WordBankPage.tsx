import WordBank from '../components/WordBank';
import { useApp } from '../context/AppContext';

export default function WordBankPage() {
  const { words, progress, handleToggleComplete, handleToggleFavorite, handleAddNewWord, handleRemoveCustomWord } = useApp();

  return (
    <WordBank
      words={words}
      completedWordIds={progress.completedWordIds}
      favoritedWordIds={progress.favoritedWordIds}
      onToggleComplete={handleToggleComplete}
      onToggleFavorite={handleToggleFavorite}
      onAddNewWord={handleAddNewWord}
      onRemoveCustomWord={handleRemoveCustomWord}
    />
  );
}

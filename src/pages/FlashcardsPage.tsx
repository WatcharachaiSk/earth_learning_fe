import React, { useState, useMemo } from 'react';
import { Sparkles, Volume2, ArrowLeft, ArrowRight, Check, Star, Shuffle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FlashcardsPage() {
  const { words, progress, handleToggleComplete, handleToggleFavorite, speakWordTTS } = useApp();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const displayedWords = useMemo(() => {
    if (!words) return [];
    if (!isShuffled) return words;
    return [...words].sort(() => Math.random() - 0.5);
  }, [words, isShuffled]);

  if (!displayedWords || displayedWords.length === 0) return <div>Loading...</div>;

  const handleNextCard = () => {
    setIsCardFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % displayedWords.length);
    }, 150);
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + displayedWords.length) % displayedWords.length);
    }, 150);
  };

  const word = displayedWords[currentCardIndex];

  return (
    <div id="flashcards-section" className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <span className="text-4xl">🦉</span>
        <h2 className="text-2xl font-black text-gray-800 font-display uppercase tracking-tight">แฟลชการ์ดแสนสนุก</h2>
        <div className="flex justify-center items-center gap-2">
          <p className="text-sm font-medium text-gray-500">คลิกที่แผ่นการ์ดเพื่อพลิกดูคำแปล คำอ่านออกเสียง และประโยคจำลอง!</p>
          <button 
            onClick={() => {
              setIsShuffled(!isShuffled);
              setCurrentCardIndex(0);
            }}
            className={`p-2 rounded-full transition ${isShuffled ? 'bg-[#58CC02] text-white' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
            title={isShuffled ? "ปิดโหมดสุ่ม" : "เปิดโหมดสุ่ม"}
          >
            <Shuffle className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slide cards */}
      <div 
        id="interactive-flashcard-box"
        onClick={() => setIsCardFlipped(!isCardFlipped)}
        className="w-full h-80 cursor-pointer perspective-1000"
      >
        <div className={`w-full h-full duration-500 transform-style-3d relative ${isCardFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front card side */}
          <div className="absolute inset-0 bg-white rounded-3xl border-4 border-gray-200 shadow-sm p-8 flex flex-col justify-between backface-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#FFC800] font-black tracking-wider uppercase">การ์ดด้านหน้า</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                {word.category}
              </span>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-5xl font-black font-display tracking-tight text-[#58CC02]">
                {word.word}
              </h1>
              <p className="text-sm font-bold text-gray-400 font-mono">
                ({word.wordClass}) <span className="text-gray-600">{word.phonetic}</span>
              </p>
            </div>

            <div className="flex justify-between items-center text-gray-400">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  speakWordTTS(word.word);
                }}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition text-[#1CB0F6]"
                title="ฟังเสียงออกเสียงภาษาอังกฤษ"
              >
                <Volume2 className="h-5 w-5" />
              </button>
              
              <span className="text-xs font-bold text-gray-400">กดที่การ์ดเพื่อพลิกคำตอบ 🔄</span>

              <span className="text-xs font-mono font-black text-[#58CC02]">
                {currentCardIndex + 1} / {words.length}
              </span>
            </div>
          </div>

          {/* Back side meaning */}
          <div className="absolute inset-0 bg-gray-900 rounded-3xl border-4 border-gray-700 shadow-md p-8 flex flex-col justify-between backface-hidden rotate-y-180 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1CB0F6] font-black tracking-wider uppercase">คำแปลความหมาย</span>
              <span className="text-[10px] font-bold text-white uppercase bg-[#58CC02] px-2.5 py-0.5 rounded-full">
                {word.difficulty}
              </span>
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-3vw sm:text-3xl font-black text-[#FFC800]">
                {word.translation}
              </h2>
              <div className="space-y-1.5 px-4">
                <p className="text-xs text-stone-200 font-medium leading-relaxed">
                  En: "{word.definitionEn}"
                </p>
                <p className="text-xs text-gray-400">
                  Th: {word.definitionTh}
                </p>
              </div>
            </div>

            {/* Example and story */}
            <div className="bg-gray-800 p-3 text-[11px] text-gray-200 border border-gray-700 rounded-2xl text-center leading-relaxed font-medium">
              <strong>ตัวอย่างประโยค:</strong> {word.exampleEn}
            </div>

          </div>

        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevCard}
          className="p-3.5 bg-white hover:bg-gray-55 border-4 border-gray-200 text-gray-700 rounded-2xl transition duo-btn-active duo-shadow-gray"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Mark as learned or Favorite toggler directly below card */}
        <div className="flex gap-2">
          <button
            onClick={() => handleToggleComplete(word.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 transition duo-btn-active ${
              progress.completedWordIds.includes(word.id)
                ? 'bg-[#DDF4FF] text-[#1899D6] border-4 border-[#84D8FF] shadow-[0_4px_0_0_#84D8FF]'
                : 'bg-white text-gray-700 border-4 border-gray-200 duo-shadow-gray'
            }`}
          >
            <Check className="h-4.5 w-4.5" />
            <span>{progress.completedWordIds.includes(word.id) ? 'จำสำเร็จ!' : 'ฉันจำคำนี้ได้แล้ว'}</span>
          </button>

          <button
            onClick={() => handleToggleFavorite(word.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 transition duo-btn-active ${
              progress.favoritedWordIds.includes(word.id)
                ? 'bg-yellow-50 text-amber-700 border-4 border-amber-300 shadow-[0_4px_0_0_#FFC800]'
                : 'bg-white text-gray-700 border-4 border-gray-200 duo-shadow-gray'
            }`}
          >
            <Star className="h-4.5 w-4.5" />
            <span>{progress.favoritedWordIds.includes(word.id) ? 'เลิกติดดาว' : 'ติดดาวช่วยจำ'}</span>
          </button>
        </div>

        <button
          onClick={handleNextCard}
          className="p-3.5 bg-white hover:bg-gray-55 border-4 border-gray-200 text-gray-700 rounded-2xl transition duo-btn-active duo-shadow-gray"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Mnemonic helper tip */}
      {word.mnemonic && (
        <div className="p-5 bg-white rounded-3xl border-4 border-gray-200 text-sm text-gray-750 space-y-2 shadow-sm">
          <div className="font-extrabold text-[#FFC800] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#FFC800] animate-pulse" />
            <span>เทคนิคช่วยจำพิเศษ (AI MNEMONICS):</span>
          </div>
          <p className="text-gray-600 leading-relaxed font-sans font-medium">
            {word.mnemonic?.story}
          </p>
        </div>
      )}
    </div>
  );
}

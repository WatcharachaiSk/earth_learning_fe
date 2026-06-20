import React, { useState } from 'react';
import { Search, Plus, Filter, Volume2, Check, Star, Sparkles, BookOpen, Trash2 } from 'lucide-react';
import { Word } from '../types';

interface WordBankProps {
  words: Word[];
  completedWordIds: string[];
  favoritedWordIds: string[];
  onToggleComplete: (wordId: string) => void;
  onToggleFavorite: (wordId: string) => void;
  onAddNewWord: (newWord: Word) => void;
  onRemoveCustomWord: (wordId: string) => void;
}

export default function WordBank({
  words,
  completedWordIds,
  favoritedWordIds,
  onToggleComplete,
  onToggleFavorite,
  onAddNewWord,
  onRemoveCustomWord,
}: WordBankProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // AI word lookup state
  const [customWordInput, setCustomWordInput] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const categories = ['All', 'Daily Life', 'Business', 'Travel', 'Academic', 'Technology', 'Emotion'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const statusFilters = ['All', 'Learing', 'Completed', 'Favorites'];

  // Handle TTS Text-To-Speech
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Trigger Gemini lookup
  const handleAiLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWordInput.trim()) return;

    // Check if word already exists in the local list (case-insensitive)
    const exists = words.some(w => w.word.toLowerCase() === customWordInput.trim().toLowerCase());
    if (exists) {
      setLookupError(`คำศัพท์ "${customWordInput}" มีอยู่ในคลังของคุณเรียบร้อยแล้ว`);
      return;
    }

    setIsLookingUp(true);
    setLookupError(null);

    try {
      const response = await fetch('/api/gemini/lookup', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ word: customWordInput.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'ไม่สามารถดึงข้อมูลคำศัพท์ได้');
      }

      const generatedWord: Word = await response.json();
      onAddNewWord(generatedWord);
      setCustomWordInput('');
    } catch (err: any) {
      setLookupError(err.message || 'ไม่พบข้อมูลคำศัพท์นี้ กรุณาตรวจสอบการสะกดคำ');
    } finally {
      setIsLookingUp(false);
    }
  };

  // Filter words
  const filteredWords = words.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(search.toLowerCase()) || 
                          word.translation.includes(search);
    const matchesCategory = selectedCategory === 'All' || word.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || word.difficulty === selectedDifficulty;
    
    let matchesStatus = true;
    if (selectedStatus === 'Completed') {
      matchesStatus = completedWordIds.includes(word.id);
    } else if (selectedStatus === 'Learing') {
      matchesStatus = !completedWordIds.includes(word.id);
    } else if (selectedStatus === 'Favorites') {
      matchesStatus = favoritedWordIds.includes(word.id);
    }

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  return (
    <div id="wordbank_container" className="space-y-6">
      
      {/* Search and AI Lookup Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 rounded-3xl border-4 border-gray-200">
        
        {/* Search input (Left) */}
        <div className="lg:col-span-7 space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-gray-400 block">ค้นหาคำศัพท์ในคลัง</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-400" />
            <input
              id="search-vocab-input"
              type="text"
              placeholder="ค้นหา เช่น Abundant, ขยัน, ประเมิน..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl border-4 border-gray-200 outline-none focus:border-[#1CB0F6] transition text-sm font-bold text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* AI word loader (Right) */}
        <form onSubmit={handleAiLookup} className="lg:col-span-5 space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#58CC02] font-display flex items-center gap-1 block">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            เพิ่มคำศัพท์ใหม่ด้วย AI (เรียนคึกคักแบบ Duolingo!)
          </label>
          
          <div className="flex gap-2">
            <input
              id="ai-lookup-input"
              type="text"
              placeholder="พิมพ์ศัพท์ เช่น spectacular..."
              className="flex-1 px-4 py-2.5 rounded-2xl border-4 border-gray-200 outline-none focus:border-[#58CC02] transition text-sm font-bold text-gray-700 font-mono"
              value={customWordInput}
              onChange={(e) => setCustomWordInput(e.target.value)}
              disabled={isLookingUp}
            />
            <button
              id="add-custom-word-btn"
              type="submit"
              className="px-5 py-2.5 bg-[#58CC02] disabled:bg-gray-200 text-white rounded-2xl font-black text-sm flex items-center gap-1.5 transition whitespace-nowrap shadow-[0_4px_0_0_#46A302] active:translate-y-1 active:shadow-none duo-btn-active"
              disabled={isLookingUp || !customWordInput.trim()}
            >
              {isLookingUp ? (
                <>
                  <span className="inline-block animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>กำลังแปล...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>เพิ่มคำศัพท์ AI</span>
                </>
              )}
            </button>
          </div>
          {lookupError && (
            <p className="text-xs text-[#FF4B4B] font-bold pl-1">{lookupError}</p>
          )}
        </form>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white p-5 rounded-3xl border-4 border-gray-200 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-black uppercase tracking-wider mr-2">
          <Filter className="h-3.5 w-3.5 text-[#1CB0F6]" />
          <span>คัดกรอง:</span>
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">หมวด:</span>
          <select
            id="category-filter"
            className="bg-white border-4 border-gray-200 text-xs text-gray-700 rounded-xl py-1 px-2 outline-none focus:border-[#1CB0F6] font-bold transition"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'ทั้งหมด' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">ระดับศัพท์:</span>
          <select
            id="difficulty-filter"
            className="bg-white border-4 border-gray-200 text-xs text-gray-700 rounded-xl py-1 px-2 outline-none focus:border-[#FFC800] font-bold transition"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'ทั้งหมด' : d === 'Beginner' ? 'ระดับเริ่มต้น' : d === 'Intermediate' ? 'ระดับกลาง' : 'ระดับสูง'}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">สถานะก้าวหน้า:</span>
          <select
            id="status-filter"
            className="bg-white border-4 border-gray-200 text-xs text-gray-700 rounded-xl py-1 px-2 outline-none focus:border-[#FF4B4B] font-bold transition"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusFilters.map((sf) => (
              <option key={sf} value={sf}>
                {sf === 'All' ? 'ทั้งหมด' : sf === 'Completed' ? 'จำได้แล้ว' : sf === 'Favorites' ? 'ติดดาว' : 'กำลังเรียน'}
              </option>
            ))}
          </select>
        </div>

        {/* Info stats */}
        <div className="ml-auto text-xs font-black text-gray-400 font-mono">
          พบ <span className="text-[#58CC02] font-black">{filteredWords.length}</span> จากทั้งหมด {words.length} คำ
        </div>
      </div>

      {/* Grid of Vocabulary Cards */}
      {filteredWords.length === 0 ? (
        <div className="py-20 text-center bg-white border-4 border-dashed border-gray-200 rounded-3xl">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-gray-700 font-black text-lg mb-1">ไม่เจอคำศัพท์ตามตัวกรอง</h3>
          <p className="text-sm text-gray-400 font-medium max-w-sm mx-auto">ลองเปลี่ยนหมวดหมู่ ค้นหาคำอื่น หรือเติมคลังศัพท์ด้วย AI ฟอร์มด้านบน!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word) => {
            const isCompleted = completedWordIds.includes(word.id);
            const isFavorited = favoritedWordIds.includes(word.id);
            const isCustomWord = word.id.startsWith('custom_');

            return (
              <div
                key={word.id}
                id={`word-card-${word.id}`}
                className={`group bg-white rounded-3xl border-4 transition-all duration-200 flex flex-col justify-between ${
                  isCompleted 
                    ? 'border-[#58CC02] shadow-[0_4px_0_0_#46A302]' 
                    : 'border-gray-200 hover:border-[#1CB0F6] hover:shadow-[0_4px_0_0_#1899D6]'
                }`}
              >
                {/* Header detail */}
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border-2 ${
                        word.difficulty === 'Beginner' ? 'bg-[#DDF4FF] text-[#1899D6] border-[#84D8FF]' :
                        word.difficulty === 'Intermediate' ? 'bg-yellow-50 text-amber-600 border-amber-200' : 'bg-red-50 text-[#FF4B4B] border-red-200'
                      }`}>
                        {word.difficulty}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-full border-2 border-gray-200">
                        {word.category}
                      </span>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleFavorite(word.id)}
                        className={`p-1.5 rounded-xl border-2 transition duo-btn-active ${
                          isFavorited 
                            ? 'bg-yellow-50 border-[#FFC800] text-[#FFC800] shadow-[0_2px_0_0_#D7A700]' 
                            : 'border-gray-100 text-gray-300 hover:text-gray-500'
                        }`}
                        title="ติดดาวคำ"
                      >
                        <Star className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>

                      {isCustomWord && (
                        <button
                          onClick={() => onRemoveCustomWord(word.id)}
                          className="p-1.5 text-gray-300 hover:text-[#FF4B4B] hover:bg-red-50 rounded-xl border-2 border-transparent transition"
                          title="ลบคำศัพท์"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main Word Pronounce */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black tracking-tight text-gray-800 font-display">{word.word}</h2>
                      <span className="text-xs font-extrabold text-gray-400 font-mono">({word.wordClass})</span>
                      <button
                        onClick={() => speakWord(word.word)}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 text-[#1CB0F6] rounded-full transition"
                        title="ออกเสียงสะกดอังกฤษ"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-gray-400 font-mono tracking-wider">{word.phonetic}</p>
                  </div>

                  {/* Meaning */}
                  <div className="space-y-1.5">
                    <p className="text-lg font-black text-[#58CC02] line-clamp-1">{word.translation}</p>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed line-clamp-2" title={word.definitionEn}>
                      {word.definitionEn}
                    </p>
                  </div>

                  {/* Example sentences */}
                  <div className="pt-3 border-t-2 border-dashed border-gray-200 space-y-1">
                    <div className="text-[11px] font-bold text-gray-700 leading-snug">
                      Ex: "{word.exampleEn}"
                    </div>
                    <div className="text-[11px] font-bold text-gray-450">
                      แปล: {word.exampleTh}
                    </div>
                  </div>

                  {/* If mnemonic exists */}
                  {word.mnemonic && (
                    <div className="p-3 bg-gray-50 rounded-2xl border-2 border-gray-100 text-[11px] text-gray-700 space-y-1 font-medium">
                      <div className="font-extrabold flex items-center gap-1 text-[#FFC800]">
                        <Sparkles className="h-3.5 w-3.5 inline text-[#FFC800] animate-pulse" />
                        <span>หลักจำจำแสนเก่ง (AI Mnemonic):</span>
                      </div>
                      <p className="text-gray-500 leading-relaxed font-sans">{word.mnemonic.story}</p>
                    </div>
                  )}
                </div>

                {/* Card Footer toggle learn */}
                <div className="px-5 py-3.5 border-t-4 border-gray-100 bg-gray-50/50 rounded-b-2xl flex items-center justify-between">
                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-[#58CC02] text-xs font-black">
                      <Check className="h-4.5 w-4.5" />
                      <span>ฉันจดจำคำนี้ได้แม่นยำ</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-gray-450">อยู่ระหว่างฝึกฝน</span>
                  )}

                  <button
                    onClick={() => onToggleComplete(word.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition duo-btn-active ${
                      isCompleted 
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200' 
                        : 'bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_3px_0_0_#46A302]'
                    }`}
                  >
                    {isCompleted ? 'จำอีกรอบ' : 'ฉันจำได้แล้ว!'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

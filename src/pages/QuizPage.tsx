import React, { useState, useEffect } from 'react';
import { Award, ArrowRight, Brain, RotateCcw, HelpCircle, CheckCircle2, AlertTriangle, Sparkles, Heart } from 'lucide-react';
import { QuizQuestion } from '../types';
import { useApp } from '../context/AppContext';

export default function QuizGame() {
  const { words, addXp } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // AI Generation status
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Fallback to offline questions or let Gemini handle them
  useEffect(() => {
    generateOfflineQuestions();
  }, [words]);

  const generateOfflineQuestions = () => {
    if (!words || words.length < 4) return;
    
    // Create 5 random questions based on local vocab setup
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    const roundWords = shuffled.slice(0, Math.min(5, words.length));

    const generated: QuizQuestion[] = roundWords.map((word) => {
      // Find 3 distractors
      const distractors = words
        .filter(w => w.id !== word.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.translation);

      const options = [word.translation, ...distractors].sort(() => 0.5 - Math.random());

      return {
        id: `q_off_${word.id}`,
        word,
        type: 'multiple-choice',
        questionText: `คำภาษาอังกฤษ "${word.word}" (${word.wordClass}) แปลว่าอย่างไรในภาษาไทย?`,
        options,
        correctAnswer: word.translation,
        hint: `ลองสังเกตรากศัพท์หรือคิดถึงบริบทที่ใช้บ่อยดูนะ`
      };
    });

    setQuestions(generated);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizFinished(false);
    setScore(0);
    setLives(5);
    setAiError(null);
  };

  // Generate an advanced situational AI lesson with Gemini!
  const fetchAiQuestion = async () => {
    if (!words || words.length === 0) return;
    
    setIsGeneratingAiQuiz(true);
    setAiError(null);

    try {
      // Pick a random word from the collection to quiz the user
      const targetWord = words[Math.floor(Math.random() * words.length)];
      
      const response = await fetch('/api/gemini/quiz-gen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wordObj: targetWord }),
      });

      if (!response.ok) throw new Error('ไม่สามารถเข้าถึงเซิร์ฟเวอร์ AI สำหรับสร้างเกมคำถามได้');

      const generated: QuizQuestion = await response.json();
      
      // If generate is valid, set as exclusive quiz or prepend/replace
      setQuestions([generated]);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setQuizFinished(false);
      setScore(0);
      setLives(3); // Less lives for tough AI questions
    } catch (err: any) {
      setAiError(err.message || 'ระบบสร้างเกมคำถามขัดข้องชั่วคราว');
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  };

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const checkAnswer = () => {
    if (!selectedAnswer || isAnswered) return;

    const currentQ = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQ.correctAnswer;

    if (correct) {
      setScore(prev => prev + 1);
      addXp(15); // +15 XP for correct answer
    } else {
      setLives(prev => Math.max(0, prev - 1));
    }

    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length && lives > 0) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (!words || words.length < 4) {
    return (
      <div className="bg-white p-8 rounded-3xl border-4 border-gray-200 text-center py-16 space-y-4 max-w-xl mx-auto shadow-sm">
        <AlertTriangle className="h-12 w-12 text-[#FF9600] mx-auto animate-bounce" />
        <h3 className="text-2xl font-black text-gray-800">ต้องการคำศัพท์เพิ่มก่อนนะ!</h3>
        <p className="text-gray-500 font-medium">คุณต้องมีคำศัพท์ในคลังอย่างน้อย 4 คำกริยา/คำนามขึ้นไปจึงจะดึงมาตอบเกมควิซทบทวนความรู้ได้</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Quiz Top status Bar */}
      <div className="bg-white p-5 rounded-3xl border-4 border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-[#58CC02]" />
          <h3 className="font-extrabold text-gray-800 text-sm tracking-tight">แบบทดสอบสายโหดสไตล์ Duolingo</h3>
        </div>

        {/* Lives (Hearts) */}
        {!quizFinished && questions.length > 0 && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Heart
                  key={idx}
                  className={`h-5 w-5 transition-all duration-200 ${
                    idx < lives ? 'text-[#FF4B4B] fill-current scale-110 drop-shadow-sm' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-black text-gray-400 font-mono">
              Q: {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
        )}
      </div>

      {/* Main Game Interface */}
      {quizFinished || lives === 0 ? (
        <div className="bg-white p-8 rounded-3xl border-4 border-gray-200 text-center py-12 space-y-6">
          <div className="relative w-28 h-28 mx-auto mb-4 bg-yellow-50 rounded-full flex items-center justify-center border-4 border-[#FFC800] shadow-[0_6px_0_0_#D7A700]">
            <Award className="h-14 w-14 text-[#FFC800]" />
            <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-[#CE82FF] animate-bounce" />
          </div>

          <h2 className="text-3xl font-black text-gray-800">
            {lives === 0 ? 'หัวใจหมดแล้วนะซาร่า!' : 'พิชิตด่านท้าทายสำเร็จ!'}
          </h2>
          <p className="text-sm font-bold text-gray-500 max-w-sm mx-auto">
            {lives === 0 
              ? 'คุณทำผิดพลาดยากเกินระดับพลัง ฝึกคำเดิมอีกครั้งด้วยคลังคำศัพท์เพื่อให้จำได้ขึ้นใจนะ!' 
              : `คุณเป็นอัจฉริยะ! ตอบถูกต้อง ${score} จาก ${questions.length} คำ รับค่าพลังโบนัส XP เอาไปประดับความเท่!`}
          </p>

          <div className="bg-gray-50 p-5 rounded-2xl max-w-xs mx-auto border-4 border-gray-200 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-gray-400 block font-black uppercase tracking-wider">คะแนนรวม</span>
              <span className="text-2xl font-black text-[#58CC02] font-mono">{score}/{questions.length}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-black uppercase tracking-wider">โบนัส XP</span>
              <span className="text-2xl font-black text-[#1CB0F6] font-mono">+{score * 15} XP</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <button
              onClick={generateOfflineQuestions}
              className="flex items-center gap-2 px-6 py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white text-sm font-black rounded-2xl transition duo-btn-active shadow-[0_4px_0_0_#1899D6]"
            >
              <RotateCcw className="h-4.5 w-4.5" />
              <span>เริ่มควิซทั่วไปอีกรอบ</span>
            </button>

            <button
              onClick={fetchAiQuestion}
              className="flex items-center gap-2 px-6 py-3 bg-[#58CC02] hover:bg-[#46A302] text-white text-sm font-black rounded-2xl transition duo-btn-active shadow-[0_4px_0_0_#46A302]"
              disabled={isGeneratingAiQuiz}
            >
              <Sparkles className="h-4.5 w-4.5" />
              <span>{isGeneratingAiQuiz ? 'สร้างบทเรียน AI...' : 'ดวลโหมดสถานการณ์จาก AI'}</span>
            </button>
          </div>
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white p-12 text-center border-4 border-gray-200 rounded-3xl flex flex-col justify-center items-center">
          <span className="inline-block animate-spin h-9 w-9 border-4 border-[#58CC02] border-t-transparent rounded-full mb-3"></span>
          <p className="text-gray-600 text-sm font-black uppercase">กำลังจัดเตรียมชุดควิซสูตรเด็ด...</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl border-4 border-gray-200 space-y-6">
          
          {/* Question Text */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#DDF4FF] text-[#1899D6] border-2 border-[#84D8FF] font-black text-[10px] uppercase rounded-full shadow-sm">
                {currentQ.type.toUpperCase()}
              </span>
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                วัดเลเวลภาษาอังกฤษประจำวัน
              </span>
            </div>
            
            <h2 className="text-xl font-black text-gray-800 leading-snug">
              {currentQ.questionText}
            </h2>
          </div>

          {/* Options List */}
          <div className="grid grid-cols-1 gap-3.5">
            {currentQ.options?.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQ.correctAnswer;
              
              let optionStyle = "border-gray-200 hover:border-[#1CB0F6] hover:bg-sky-50/50 shadow-[0_4px_0_0_#e5e7eb]";
              if (isAnswered) {
                if (isCorrectOption) {
                  optionStyle = "bg-[#eefce5] border-[#58CC02] text-emerald-950 font-extrabold shadow-[0_4px_0_0_#46A302]";
                } else if (isSelected) {
                  optionStyle = "bg-[#ffebeb] border-[#FF4B4B] text-rose-950 font-extrabold shadow-[0_4px_0_0_#ea2b2b]";
                } else {
                  optionStyle = "border-gray-200 opacity-40 shadow-[0_1px_0_0_transparent]";
                }
              } else if (isSelected) {
                optionStyle = "border-[#1CB0F6] bg-[#DDF4FF] text-[#1899D6] font-extrabold shadow-[0_4px_0_0_#1899D6]";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  id={`quiz-option-${idx}`}
                  disabled={isAnswered}
                  className={`w-full text-left p-4.5 rounded-2xl border-4 text-sm transition-all duration-100 flex items-center justify-between font-bold ${optionStyle} duo-btn-active`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-gray-100 border-2 border-gray-200 text-gray-500 rounded-lg flex items-center justify-center font-black text-xs">
                      {idx + 1}
                    </span>
                    <span>{option}</span>
                  </span>
                  {isAnswered && isCorrectOption && (
                    <CheckCircle2 className="h-5 w-5 text-[#58CC02]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Help box & Actions */}
          <div className="pt-5 border-t-4 border-gray-100 flex items-center justify-between flex-wrap gap-4">
            
            {/* Show dynamic hint */}
            <div className="text-xs font-bold text-amber-800 bg-amber-50/80 py-2.5 px-4 rounded-2xl border-2 border-amber-200 max-w-sm flex gap-2">
              <HelpCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <span><strong>คำใบ้ช่วยคิด:</strong> {currentQ.hint}</span>
            </div>

            {/* Check / Next Button */}
            <div>
              {!isAnswered ? (
                <button
                  onClick={checkAnswer}
                  disabled={!selectedAnswer}
                  className="px-6 py-2.5 bg-[#58CC02] hover:bg-[#46A302] disabled:bg-gray-200 disabled:text-gray-400 text-white font-black rounded-2xl text-sm transition shadow-[0_4px_0_0_#46A302] disabled:shadow-none duo-btn-active"
                >
                  ตรวจสอบคำตอบ
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-black rounded-2xl text-sm transition shadow-[0_4px_0_0_#1f2937] duo-btn-active"
                >
                  <span>ลุยข้อถัดไป</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              )}
            </div>

          </div>

          {/* Prompt AI generator directly in interface footer */}
          <div className="pt-5 border-t-4 border-gray-150 flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] text-gray-400 font-bold leading-snug">
              เบื่อแบบทดสอบมาตรฐาน? ท้าทายสัจศึกษาภาษาอังกฤษของคุณด้วยโหมดเนื้อเรื่อง AI!
            </span>
            <button
              onClick={fetchAiQuestion}
              disabled={isGeneratingAiQuiz}
              className="text-xs font-black text-[#58CC02] flex items-center gap-1 hover:text-[#46A302] transition disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4 text-[#FFC800] animate-bounce" />
              <span>{isGeneratingAiQuiz ? 'AI กำลังเจน...' : 'สร้างควิซใหม่จาก AI'}</span>
            </button>
          </div>
          {aiError && (
            <p className="text-xs text-[#FF4B4B] font-bold">{aiError}</p>
          )}

        </div>
      )}

    </div>
  );
}

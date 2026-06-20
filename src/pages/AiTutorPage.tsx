import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageCircle, RefreshCw, Volume2, Info } from 'lucide-react';
import { ChatMessage } from '../types';
import { useApp } from '../context/AppContext';

export default function AiTutor() {
  const { words, progress } = useApp();
  
  // Filter favorite words
  const favoriteWords = words.filter(w => progress.favoritedWordIds.includes(w.id));

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am Coach Max, your personal English speaking coach. 🎓🇺🇸 Let's practice English together! " +
            "You can type anything, or choose a vocabulary you want to learn. Let's form some sentences!\n\n" +
            "ยินดีต้อนรับครับ! ผมครูแม็กซ์ ติวเตอร์คุณเอง มาฝึกแต่งประโยคหรือสอบถามคำศัพท์ภาษาอังกฤษด้วยกันนะ!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPhrases: [
        "Let's practice 'Abundant' (มาฝึกใช้คำว่า Abundant กัน)",
        "How can I improve English? (ฉันจะเก่งภาษาอังกฤษได้อย่างไรบ้าง)",
        "Give me a daily test (ขอคำถามประจำวันหน่อยครับ)"
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Text to Speech pronunciation of Max's English statement
  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove Thai translated texts in brackets or parentheses so TTS only pronounces English parts nicely
      const englishOnlyText = text.replace(/[\u0e01-\u0e5b]+/g, '').replace(/[()]/g, '');
      const utterance = new SpeechSynthesisUtterance(englishOnlyText);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isSending) return;

    // Create immediate user message state
    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      role: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsSending(true);

    try {
      // Gather targets from favorited lists
      const targetListWords = favoriteWords.map(w => w.word);

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text })),
          targetWords: targetListWords
        })
      });

      if (!response.ok) throw new Error('การเชื่อมต่อกับติวเตอร์ AI ล้มเหลว');

      const parsedResponse = await response.json();

      const modelMsg: ChatMessage = {
        id: 'model_' + Date.now(),
        role: 'model',
        text: parsedResponse.text || 'I didn\'t understand that. Could you please try again?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPhrases: parsedResponse.suggestedPhrases || []
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: 'error_' + Date.now(),
        role: 'model',
        text: "Sorry, I can't think of a response right now. Please check your internet connection or make sure the server API key is loaded. (ขออภัยครูแม็กซ์ไม่สามารถประมวลผลคำตอบได้ชั่วคราว ลองใหม่อีกทีนะครับ)",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputVal);
  };

  const handleClearChat = () => {
    if (confirm('คุณต้องการรีเซ็ตการคุยติวเตอร์คำศัพท์กับครูแม็กซ์ใช่หรือไม่?')) {
      setMessages([
        {
          id: 'welcome_reset',
          role: 'model',
          text: "Alright! Let's start fresh. Pick a word or tell me what conversation topic you want to learn today! ✨",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedPhrases: [
            "Teach me travel verbs (สอนคำกริยาในการท่องเที่ยวหน่อย)",
            "What is 'Mnemonic'? (Mnemonic แปลว่าอะไร)",
            "Practice Business English (มาฝึกภาษาอังกฤษธุรกิจกัน)"
          ]
        }
      ]);
    }
  };

  return (
    <div id="ai_tutor_module" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Target practice words sidebar */}
      <div className="lg:col-span-1 bg-[#58CC02] p-5 rounded-3xl text-white space-y-4 shadow-[0_4px_0_0_#46A302] border-4 border-[#46A302] h-fit">
        <div className="space-y-1">
          <h3 className="font-display font-black text-white text-md flex items-center gap-1.5">
            <Sparkles className="h-4.5 w-4.5 text-yellow-350 animate-pulse" />
            <span>คำศัพท์ฝึกสนทนา</span>
          </h3>
          <p className="text-xs text-green-100 font-bold leading-relaxed">
            เพิ่มคำศัพท์ที่คุณติดดาว (⭐) จากหน้าคลังคำศัพท์ เพื่อให้ ครูแม็กซ์ ค่อยๆ ช่วยฝึกแต่งประโยคให้เก่งได้เร็วที่สุด!
          </p>
        </div>

        {favoriteWords.length === 0 ? (
          <div className="p-3 bg-[#46A302]/30 rounded-2xl text-xs text-green-100 border-2 border-[#46A302] leading-relaxed font-bold">
            ไม่มีคำติดดาวในขณะนี้ ครูแม็กซ์จะสุ่มดึงคำเด่นๆ 1,000 วินาทีมาช่วยคุณแต่งประโยคฝึกภาษาอังกฤษ!
          </div>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {favoriteWords.map((word) => (
              <div
                key={word.id}
                onClick={() => sendMessage(`Teach me how to use "${word.word}" in a sentence.`)}
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl border-2 border-white/20 flex items-center justify-between cursor-pointer transition text-left duration-100 active:translate-y-0.5"
              >
                <div>
                  <span className="text-xs font-extrabold block text-white">{word.word}</span>
                  <span className="text-[10px] text-green-200 block font-bold">{word.translation}</span>
                </div>
                <span className="text-[9px] bg-white text-[#58CC02] py-0.5 px-1.5 rounded-lg font-black uppercase border border-[#46A302]">
                  {word.wordClass}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-[#46A302] text-[10px] text-green-100/90 font-bold flex gap-1.5">
          <Info className="h-4 w-4 flex-shrink-0" />
          <span>คลิกคำศัพท์ด้านบนเพื่อคุยเล่นกับ ครูแม็กซ์ ได้เลยครับ!</span>
        </div>
      </div>

      {/* Main Tutor Chat Box */}
      <div className="lg:col-span-3 bg-white rounded-3xl border-4 border-gray-200 flex flex-col h-[520px] overflow-hidden shadow-sm">
        
        {/* Chat Header */}
        <div className="px-5 py-4 bg-gray-50 border-b-4 border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 bg-[#58CC02] border-2 border-[#46A302] rounded-full flex items-center justify-center font-bold text-white font-display text-md shadow-[0_2px_0_0_#46A302]">
                MX
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-[#58CC02] rounded-full border-2 border-white"></span>
            </div>
            
            <div>
              <h3 className="font-black text-gray-800 text-sm flex items-center gap-1.5">
                <span>Coach Max</span>
                <span className="text-[10px] font-black bg-[#DDF4FF] text-[#1899D6] py-0.5 px-2 rounded-full border border-[#84D8FF]">AI TUTOR</span>
              </h3>
              <p className="text-xs text-gray-400 font-bold">ถามข้อข้องใจ ฝึกแต่งภาษาอังกฤษ คุยเพลินเลเวลอัป!</p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-150 rounded-xl transition duration-100 border border-transparent hover:border-gray-200 active:translate-y-0.5"
            title="ล้างแชทเริ่มใหม่"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, index) => {
            const isModel = msg.role === 'model';
            return (
              <div
                key={msg.id || index}
                className={`flex gap-3 max-w-[85%] ${isModel ? 'mr-auto text-left' : 'ml-auto flex-row-reverse text-right'}`}
              >
                {/* Micro avatar for Coach */}
                {isModel && (
                  <div className="h-7 w-7 rounded-full bg-[#58CC02] border border-[#46A302] text-white flex-shrink-0 flex items-center justify-center font-black text-[10px] shadow-[0_1px_0_0_#46A302]">
                    MX
                  </div>
                )}
                
                <div className="space-y-1">
                  <div
                    className={`p-4 rounded-3xl leading-relaxed text-sm whitespace-pre-wrap border-2 font-bold ${
                      isModel 
                        ? 'bg-gray-150/10 text-gray-800 border-gray-200 rounded-tl-none font-sans' 
                        : 'bg-[#1CB0F6] text-white border-[#1899D6] rounded-tr-none font-sans shadow-[0_2.5px_0_0_#1899D6]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  <div className="flex items-center gap-1.5 justify-end text-[10px] text-gray-400 font-bold font-mono">
                    <span>{msg.timestamp}</span>
                    {isModel && (
                      <button
                        onClick={() => speakMessage(msg.text)}
                        className="p-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-[#1CB0F6] rounded-lg transition"
                        title="สำเนียงเสียงอ่าน"
                      >
                        <Volume2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex gap-3 max-w-[80%] mr-auto">
              <div className="h-7 w-7 rounded-full bg-[#58CC02] flex-shrink-0 flex items-center justify-center font-black text-[10px] text-white animate-pulse">
                MX
              </div>
              <div className="p-3.5 rounded-3xl bg-gray-50 border-4 border-gray-200 rounded-tl-none flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                <span className="dot animate-bounce">●</span>
                <span className="dot animate-bounce delay-75">●</span>
                <span className="dot animate-bounce delay-150">●</span>
                <span>ครูแม็กซ์กำลังเคาะประพันธ์ภาษาให้คุณ...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick reply Phrases */}
        {!isSending && messages.length > 0 && messages[messages.length - 1].suggestedPhrases && (
          <div className="px-5 py-3 bg-gray-50 border-t-4 border-gray-200 flex flex-wrap gap-2 animate-fade-in">
            {messages[messages.length - 1].suggestedPhrases?.map((phrase, idx) => (
              <button
                key={idx}
                id={`suggested-quick-reply-${idx}`}
                onClick={() => sendMessage(phrase.split(' (')[0])}
                className="text-xs bg-white text-[#1899D6] border-4 border-gray-200 font-black hover:border-[#1CB0F6] py-1.5 px-3 rounded-2xl transition duration-100 active:translate-y-0.5 duo-btn-active"
              >
                {phrase}
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t-4 border-gray-200 flex gap-2">
          <input
            id="chat-user-input"
            type="text"
            placeholder="พิมพ์โต้ตอบภาษาอังกฤษ หรือถามข้อข้องใจสไตล์กวนๆ ได้เต็มที่เลยครับ..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border-4 border-gray-200 focus:bg-white rounded-2xl outline-none focus:border-[#1CB0F6] font-bold transition text-sm text-gray-750"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isSending}
          />
          <button
            id="chat-send-btn"
            type="submit"
            className="p-3 bg-[#58CC02] hover:bg-[#46A302] disabled:bg-gray-200 text-white rounded-2xl transition flex items-center justify-center shadow-[0_4px_0_0_#46A302] disabled:shadow-none duo-btn-active"
            disabled={isSending || !inputVal.trim()}
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>

    </div>
  );
}

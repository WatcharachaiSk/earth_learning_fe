import { Sparkles } from 'lucide-react';

interface HeaderProps {
  streak: number;
  xp: number;
  dailyGoalXp: number;
  progressRatioVal: number;
  isDailyGoalAchieved: boolean;
}

export default function Header({ streak, xp, dailyGoalXp, progressRatioVal, isDailyGoalAchieved }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#58CC02] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-[0_4px_0_0_#46A302]">
            E
          </div>
          <div>
            <h1 className="text-xl font-black text-[#58CC02] font-display tracking-tight flex items-center gap-1.5 leading-snug">
              <span>VOCAB-UP</span>
              <span className="text-[10px] font-bold bg-[#DDF4FF] text-[#1899D6] px-2.5 py-1 rounded-full border-2 border-[#84D8FF] flex items-center gap-0.5 shadow-sm">
                <Sparkles className="h-2.5 w-2.5 text-[#1CB0F6]" />
                <span>1,000 WORDS CHALLENGE</span>
              </span>
            </h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">ระบบความจำคำศัพท์สไตล์ Duolingo</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-white border-2 border-gray-250 py-1.5 px-3.5 rounded-2xl shadow-sm">
            <span className="text-2xl animate-bounce">🔥</span>
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-500 block leading-none">STREAK</span>
              <span className="text-xs font-black text-[#FF9600] font-mono leading-none">{streak} วันต่อเนื่อง</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white border-2 border-gray-250 py-1.5 px-3.5 rounded-2xl shadow-sm">
            <span className="text-2xl">💎</span>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#1CB0F6] block leading-none">TOTAL XP</span>
              <span className="text-xs font-black text-[#1CB0F6] font-mono leading-none">{xp} XP</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white border-2 border-gray-250 py-1.5 px-3.5 rounded-2xl shadow-sm">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 block leading-none">เป้าหมายประจำวัน</span>
              <span className="text-xs font-black text-[#58CC02] font-mono leading-none">
                {progressRatioVal}% ({xp}/{dailyGoalXp})
              </span>
            </div>
            <div className="w-14 bg-gray-100 h-3 rounded-full overflow-hidden border border-gray-205">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${isDailyGoalAchieved ? 'bg-[#58CC02]' : 'bg-[#1CB0F6]'}`}
                style={{ width: `${progressRatioVal}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

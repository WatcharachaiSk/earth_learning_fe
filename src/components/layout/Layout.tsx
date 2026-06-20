import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { useApp } from '../../context/AppContext';

export default function Layout() {
  const { progress } = useApp();
  
  const isDailyGoalAchieved = progress.xp >= progress.dailyGoalXp;
  const progressRatioVal = Math.min(100, Math.round((progress.xp / progress.dailyGoalXp) * 100));

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex flex-col font-sans text-[#4B4B4B]">
      <Header 
        streak={progress.streak} 
        xp={progress.xp} 
        dailyGoalXp={progress.dailyGoalXp} 
        progressRatioVal={progressRatioVal} 
        isDailyGoalAchieved={isDailyGoalAchieved} 
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        <Navbar />
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

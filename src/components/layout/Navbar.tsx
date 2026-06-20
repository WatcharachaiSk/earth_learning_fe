import { NavLink } from 'react-router-dom';
import { Library, BookOpen, Brain, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'คลังคำศัพท์', icon: Library },
    { to: '/flashcards', label: 'กบการ์ดช่วยจำ', icon: BookOpen },
    { to: '/quiz', label: 'ท้าดวลควิซ', icon: Brain },
    { to: '/ai-tutor', label: 'ติวเตอร์ AI', icon: MessageSquare },
  ];

  return (
    <div className="flex border-b-4 border-gray-200 overflow-x-auto">
      <nav className="flex space-x-2 -mb-[4px]" aria-label="Tabs">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => 
              `flex items-center gap-2 py-3.5 px-5 text-sm font-black transition-all rounded-t-2xl border-t-4 border-x-4 ${
                isActive
                  ? 'bg-white border-gray-200 text-[#58CC02]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <item.icon className="h-4.5 w-4.5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

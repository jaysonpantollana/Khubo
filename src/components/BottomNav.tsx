// @context: Bottom navigation bar — fixed mobile navigation
// @purpose: Four-tab bottom nav (Home, Roommate, Maps, Profile) with active state
// @dependencies: react-router-dom, lucide-react, useAuth

import { Home, Users, Map, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsAnyModalOpen } from '../hooks/useIsAnyModalOpen';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isModalOpen = useIsAnyModalOpen();

  const items = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Roommate', path: '/roommate' },
    { icon: Map, label: 'Maps', path: '/maps' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div 
      className="fixed bottom-[calc(12px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <nav 
        className="bg-[#000000]/35 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 flex items-center justify-evenly pointer-events-auto w-[min(92vw,420px)] sm:w-[min(90vw,380px)]"
      >
        {items.map((item, idx) => {
          const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '') || (item.path !== '/' && location.pathname.startsWith(item.path));
          if (isModalOpen) return null;

          return (
            <button 
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center min-w-0 flex-1 py-0.5 group transition-all duration-200 relative"
            >
              <div className={`p-1 sm:p-1.5 md:p-2 rounded-xl sm:rounded-2xl transition-all duration-300 relative ${isActive ? 'text-[#3b82f6]' : 'text-neutral-200 group-ext-white'}`}>
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[6px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-center transition-colors duration-200 mt-px leading-tight whitespace-nowrap ${isActive ? 'text-[#3b82f6]' : 'text-neutral-200 group-ext-white'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

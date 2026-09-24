// @context: Bottom navigation bar — fixed mobile navigation
// @purpose: Three-tab bottom nav (Home, Maps, Profile) with active state
// @dependencies: react-router-dom, lucide-react, useAuth

import { Home, Map, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsAnyModalOpen } from '../hooks/useIsAnyModalOpen';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isModalOpen = useIsAnyModalOpen();

  const items = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Map, label: 'Maps', path: '/maps' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  if (isModalOpen) return null;

  return (
    <div 
      className="fixed bottom-[calc(12px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <nav
        className="inline-flex items-center bg-neutral-800/50 backdrop-blur-xl rounded-full px-6 py-2.5 sm:px-8 sm:py-3 gap-x-6 sm:gap-x-9 pointer-events-auto"
      >
        {items.map((item, idx) => {
          const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '') || (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <button 
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center min-h-11 min-w-11 px-1 py-1 group transition-all duration-200 relative"
            >
              <div className={`p-1 rounded-xl transition-all duration-300 relative ${isActive ? 'text-[#3b82f6]' : 'text-white'}`}>
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide text-center transition-colors duration-200 mt-px leading-tight whitespace-nowrap ${isActive ? 'text-[#3b82f6]' : 'text-white'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

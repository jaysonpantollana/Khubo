// @context: Bottom navigation bar — fixed mobile navigation
// @purpose: Four-tab bottom nav (Home, Roommate, Maps, Profile) with active state
// @dependencies: react-router-dom, lucide-react, useAuth

import { Home, Users, Map, MessageCircle, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const items = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Roommate', path: '/roommate' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Map, label: 'Maps', path: '/maps' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div 
      className="fixed bottom-[calc(12px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[380px] pointer-events-none"
    >
      <nav 
        className="bg-[#000000]/35 backdrop-blur-xl border border-white/10 rounded-full px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-around pointer-events-auto"
      >
        {items.map((item, idx) => {
          const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '') || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <button 
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center min-w-0 flex-1 py-0.5 group transition-all duration-200 relative"
            >
              <div className={`p-1 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-300 relative ${isActive ? 'text-[#3b82f6]' : 'text-neutral-200 group-hover:text-white'}`}>
                <item.icon className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[8px] sm:text-[9.5px] font-black uppercase tracking-wider text-center transition-colors duration-200 mt-0.5 block truncate max-w-full ${isActive ? 'text-[#3b82f6]' : 'text-neutral-200 group-hover:text-white'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

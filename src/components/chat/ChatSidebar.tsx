// @context: Chat sidebar — conversation list panel
// @purpose: Displays list of conversations with avatar, name, last message, unread count, online status
// @behavior: Filter buttons (All/Landlord/Friends/Admin); search input; dark/light mode toggle
// @behavior: Click conversation → calls onSelect with conversation data; highlights selected conversation
// @dependencies: lucide-react, BottomNav
// @known-issues: Conversation type defined locally (duplicates DUMMY_CONVERSATIONS shape)

import { ArrowLeft, Search, Moon, Sun } from 'lucide-react';
import BottomNav from '../BottomNav';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Props {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (conv: Conversation) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onBack: () => void;
  activeFilter: string;
  onFilterChange: (f: string) => void;
}

const filterOptions = ['All', 'Landlord', 'Friends', 'Admin'];

export default function ChatSidebar({
  conversations, selectedId, onSelect, isDarkMode, onToggleDarkMode,
  onBack, activeFilter, onFilterChange,
}: Props) {
  return (
    <div className={`md:w-[360px] lg:w-[400px] flex-shrink-0 flex flex-col border-r ${isDarkMode ? 'border-[#3A3B3C]' : 'border-neutral-100'} w-full flex`}>
      <div className="px-4 py-3 flex items-center justify-between border-b border-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2 -ml-2 rounded-full transition ${isDarkMode ? 'hover:bg-[#3A3B3C]' : 'hover:bg-neutral-100'}`}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>Chats</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full transition ${isDarkMode ? 'bg-[#3A3B3C] text-white hover:bg-[#4E4F50]' : 'bg-neutral-100 text-[#000000] hover:bg-neutral-200'}`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className="px-4 pb-2 pt-1">
        <div className={`rounded-full flex items-center px-4 py-2 transition ${isDarkMode ? 'bg-[#3A3B3C] hover:bg-[#4E4F50]' : 'bg-neutral-100 hover:bg-neutral-200'}`}>
          <Search size={18} className={`mr-2 flex-shrink-0 ${isDarkMode ? 'text-[#B0B3B8]' : 'text-neutral-500'}`} />
          <input
            type="text"
            placeholder="Search"
            className={`bg-transparent border-none outline-none w-full text-sm font-medium focus:ring-0 p-0 ${isDarkMode ? 'placeholder-[#B0B3B8] text-white' : 'placeholder-neutral-500 text-neutral-800'}`}
          />
        </div>
      </div>

      <div className="px-4 pb-3 pt-1 flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filterOptions.map(filter => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-[#000000] text-white'
                : isDarkMode
                  ? 'bg-[#3A3B3C] text-white hover:bg-[#4E4F50]'
                  : 'bg-neutral-100 text-[#000000] hover:bg-neutral-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-24">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={`w-full flex items-center p-2 rounded-xl transition gap-3 ${isDarkMode ? 'hover:bg-[#3A3B3C]' : 'hover:bg-neutral-50'} ${selectedId === conv.id ? (isDarkMode ? 'md:bg-[#3A3B3C]' : 'md:bg-neutral-100') : ''}`}
          >
            <div className="relative flex-shrink-0">
              <img src={conv.avatar} alt={conv.name} className={`w-14 h-14 rounded-full object-cover ${isDarkMode ? 'bg-[#3A3B3C]' : 'bg-neutral-200'}`} />
              {conv.online && (
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 rounded-full ${isDarkMode ? 'border-[#242526]' : 'border-white'}`} />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold text-[15px] truncate ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{conv.name}</h3>
                <span className={`text-xs ml-2 flex-shrink-0 ${conv.unread > 0 ? (isDarkMode ? 'font-semibold text-white' : 'font-semibold text-[#17294F]') : (isDarkMode ? 'text-[#B0B3B8]' : 'text-neutral-500')}`}>{conv.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-[13px] truncate pr-2 ${conv.unread > 0 ? (isDarkMode ? 'font-semibold text-white' : 'font-semibold text-neutral-900') : (isDarkMode ? 'text-[#B0B3B8]' : 'text-neutral-500')}`}>
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-white' : 'bg-[#17294F]'}`}>
                    <span className={`text-[10px] font-bold ${isDarkMode ? 'text-[#242526]' : 'text-white'}`}>{conv.unread}</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

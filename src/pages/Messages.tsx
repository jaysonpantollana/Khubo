// @context: Messages page — split-view inbox with conversation list and chat thread
// @purpose: Desktop shows side-by-side list + chat; mobile shows list or chat (toggled)
// @behavior: Filter tabs (All, Roommates, Landlords), search, unread badges, online indicators
// @dependencies: BottomNav, lucide-react, react-router-dom

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, MessageCircle, Send, Plus, Phone, Video } from 'lucide-react';
import BottomNav from '../components/BottomNav';

interface Message {
  id: string;
  text: string;
  sent: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  type: 'landlord' | 'roommate';
  messages: Message[];
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Julian Throne',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julian',
    lastMessage: "I've attached the latest floor plan for the penthouse.",
    timestamp: '2:34 PM',
    unread: 2,
    online: true,
    type: 'landlord',
    messages: [
      { id: 'm1', text: "Hi! I saw the listing for the Standard Single Room. Is it still available for next semester?", sent: true },
      { id: 'm2', text: "Hello Julian! Yes, we still have a few units left for the upcoming semester. Would you like to schedule a virtual tour or visit in person?", sent: false },
      { id: 'm3', text: "An in-person visit would be great. Do you have any slots available this weekend?", sent: true },
      { id: 'm4', text: "We're actually fully booked this weekend, but I have a slot open tomorrow afternoon at 2 PM. Would that work for you?", sent: false },
      { id: 'm5', text: "Tomorrow at 2 PM works perfectly. What's the exact address again?", sent: true },
      { id: 'm6', text: "Great! We're at Bgry San Miguel, Jorge Sheker Street, Iligan City. I've attached the latest floor plan for your reference.", sent: false },
    ],
  },
  {
    id: 'c2',
    name: 'Maria Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria22',
    lastMessage: 'The tour is scheduled for tomorrow at 10 AM.',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    type: 'roommate',
    messages: [
      { id: 'm1', text: "Hi Maria! Are you still looking for a roommate?", sent: true },
      { id: 'm2', text: "Yes! I found a great place near MSU-IIT. Want to check it out together?", sent: false },
      { id: 'm3', text: "Absolutely! When is the tour?", sent: true },
      { id: 'm4', text: "The tour is scheduled for tomorrow at 10 AM.", sent: false },
    ],
  },
  {
    id: 'c3',
    name: 'Troy B. Larosia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Troy55',
    lastMessage: 'Welcome to the Citi Chase premium experience.',
    timestamp: 'Monday',
    unread: 1,
    online: true,
    type: 'landlord',
    messages: [
      { id: 'm1', text: "Hello! I'm interested in your Citi Chase listing.", sent: true },
      { id: 'm2', text: "Welcome to the Citi Chase premium experience.", sent: false },
    ],
  },
  {
    id: 'c4',
    name: 'Andrea C. Padillan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea67',
    lastMessage: 'Looking forward to being roommates!',
    timestamp: 'Last week',
    unread: 0,
    online: false,
    type: 'roommate',
    messages: [
      { id: 'm1', text: "Hey! I saw your roommate profile. We seem like a good match!", sent: true },
      { id: 'm2', text: "Hi Andrea! Yeah, I think so too. Want to grab coffee sometime to discuss?", sent: false },
      { id: 'm3', text: "Looking forward to being roommates!", sent: false },
    ],
  },
];

type FilterTab = 'all' | 'roommate' | 'landlord';

export default function Messages() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = MOCK_CONVERSATIONS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || c.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const selectedConversation = MOCK_CONVERSATIONS.find((c) => c.id === selectedId) || null;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'ALL' },
    { key: 'roommate', label: 'Roommates' },
    { key: 'landlord', label: 'Landlords' },
  ];

  /* ── Conversation List Panel ── */
  const listPanel = (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition"
          >
            <ArrowLeft size={22} className="text-neutral-900" />
          </button>
          <h1 className="text-3xl font-extrabold text-neutral-900">Messages</h1>
        </div>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for conversation..."
            className="w-full bg-neutral-100 rounded-full pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#17294F]/20"
          />
        </div>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === tab.key
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <MessageCircle size={32} className="text-neutral-300 mb-3" />
            <p className="text-neutral-500 text-sm">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedId(conversation.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 transition text-left border-b border-neutral-50 ${
                selectedId === conversation.id ? 'bg-[#17294F]/5' : 'hover:bg-neutral-50'
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm truncate ${conversation.unread > 0 ? 'font-bold text-neutral-900' : 'font-medium text-neutral-700'}`}>
                  {conversation.name}
                </h3>
                <p className={`text-xs truncate mt-0.5 ${conversation.unread > 0 ? 'text-neutral-600 font-medium' : 'text-neutral-400'}`}>
                  {conversation.lastMessage}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );

  /* ── Chat Panel ── */
  const chatPanel = selectedConversation ? (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-neutral-100">
        <button
          onClick={() => setSelectedId(null)}
          className="p-1 rounded-full hover:bg-neutral-100 transition md:hidden"
        >
          <ArrowLeft size={20} className="text-neutral-900" />
        </button>
        <img
          src={selectedConversation.avatar}
          alt={selectedConversation.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h3 className="text-sm font-bold text-neutral-900">{selectedConversation.name}</h3>
        <div className="ml-auto flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-neutral-100 transition">
            <Phone size={18} className="text-[#17294F]" />
          </button>
          <button className="p-2 rounded-full hover:bg-neutral-100 transition">
            <Video size={18} className="text-[#17294F]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {selectedConversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                msg.sent
                  ? 'bg-[#17294F] text-white rounded-br-md'
                  : 'bg-[#3d5a80] text-white rounded-bl-md'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-neutral-100 px-5 py-3 flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-neutral-100 transition text-neutral-500">
          <Plus size={22} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className={`p-2.5 rounded-full transition ${
            newMessage.trim() ? 'bg-[#17294F] text-white' : 'bg-neutral-100 text-neutral-400'
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full bg-neutral-50 text-center px-6">
      <div className="bg-white p-6 rounded-full shadow-sm mb-4">
        <MessageCircle size={40} className="text-neutral-300" />
      </div>
      <h3 className="text-lg font-bold text-neutral-900 mb-1">Select a conversation</h3>
      <p className="text-neutral-500 text-sm">Choose from your existing conversations or start a new one.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white md:h-screen md:flex md:flex-col">
      {/* Mobile: show list or chat */}
      <div className="md:hidden">
        {selectedId ? chatPanel : listPanel}
      </div>

      {/* Desktop: split view */}
      <div className="hidden md:flex md:flex-1 md:overflow-hidden">
        <div className="w-[360px] lg:w-[400px] border-r border-neutral-100 flex-shrink-0 overflow-hidden">
          {listPanel}
        </div>
        <div className="flex-1 overflow-hidden">
          {chatPanel}
        </div>
      </div>

      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

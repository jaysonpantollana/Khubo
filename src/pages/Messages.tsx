// @context: Messages inbox page — list of conversations
// @purpose: Shows list of chat conversations with landlords/roommates; tap to open chat thread
// @behavior: Mock conversation list with unread badges, timestamps, and search filter
// @dependencies: BottomNav, lucide-react, react-router-dom

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, MessageCircle, Send, Paperclip, Phone, MoreVertical } from 'lucide-react';
import BottomNav from '../components/BottomNav';

interface Message {
  id: string;
  text: string;
  timestamp: string;
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
  listingTitle?: string;
  messages: Message[];
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Layla M. Santos',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla88',
    lastMessage: 'The room is still available. Would you like to schedule a visit?',
    timestamp: '2:34 PM',
    unread: 2,
    online: true,
    listingTitle: "Layla's Residences & Dormitory",
    messages: [
      { id: 'm1', text: "Hi! I'm interested in your listing at Layla's Residences.", timestamp: '1:15 PM', sent: true },
      { id: 'm2', text: "Hello! Yes, we still have rooms available. How many people would be staying?", timestamp: '1:22 PM', sent: false },
      { id: 'm3', text: "Just me. I'm a student at MSU-IIT.", timestamp: '1:30 PM', sent: true },
      { id: 'm4', text: "Perfect! We have a single occupancy room for P6,000/month. Includes wifi and water.", timestamp: '2:00 PM', sent: false },
      { id: 'm5', text: "That sounds great! Is there a nearby convenience store?", timestamp: '2:15 PM', sent: true },
      { id: 'm6', text: "The room is still available. Would you like to schedule a visit?", timestamp: '2:34 PM', sent: false },
    ],
  },
  {
    id: 'c2',
    name: 'Kayla R. Garcia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kayla22',
    lastMessage: "I'll be there at 3pm tomorrow. Thanks!",
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    listingTitle: "Kayla's Residences & Dormitory",
    messages: [
      { id: 'm1', text: "Hi Kayla, is the corner room still available?", timestamp: 'Yesterday 10:00 AM', sent: true },
      { id: 'm2', text: "Yes it is! It's P6,000/month with free wifi.", timestamp: 'Yesterday 10:15 AM', sent: false },
      { id: 'm3', text: "Can I visit tomorrow afternoon?", timestamp: 'Yesterday 11:00 AM', sent: true },
      { id: 'm4', text: "Sure! How about 3pm?", timestamp: 'Yesterday 11:30 AM', sent: false },
      { id: 'm5', text: "I'll be there at 3pm tomorrow. Thanks!", timestamp: 'Yesterday 11:45 AM', sent: true },
    ],
  },
  {
    id: 'c3',
    name: 'Nathan D. Cruz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nathan44',
    lastMessage: 'The deposit is refundable upon move-out.',
    timestamp: 'Monday',
    unread: 1,
    online: true,
    listingTitle: "Nathan's Female Boarders",
    messages: [
      { id: 'm1', text: "Hi! What's the move-in process?", timestamp: 'Monday 9:00 AM', sent: true },
      { id: 'm2', text: "First month + 1 month deposit. Total of P10,000 upfront.", timestamp: 'Monday 9:30 AM', sent: false },
      { id: 'm3', text: "The deposit is refundable upon move-out.", timestamp: 'Monday 9:31 AM', sent: false },
    ],
  },
  {
    id: 'c4',
    name: 'Andrea P. Reyes',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea67',
    lastMessage: 'Looking forward to being roommates!',
    timestamp: 'Last week',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: "Hey! I saw your roommate profile. We seem like a good match!", timestamp: 'Last week', sent: true },
      { id: 'm2', text: "Hi Andrea! Yeah, I think so too. Want to grab coffee sometime to discuss?", timestamp: 'Last week', sent: false },
      { id: 'm3', text: "Looking forward to being roommates!", timestamp: 'Last week', sent: false },
    ],
  },
];

export default function Messages() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = MOCK_CONVERSATIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = MOCK_CONVERSATIONS.reduce((sum, c) => sum + c.unread, 0);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    setNewMessage('');
  };

  if (selectedConversation) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-neutral-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button
            onClick={() => setSelectedConversation(null)}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition"
          >
            <ArrowLeft size={20} className="text-neutral-900" />
          </button>
          <div className="relative">
            <img
              src={selectedConversation.avatar}
              alt={selectedConversation.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {selectedConversation.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-neutral-900 truncate">{selectedConversation.name}</h3>
            {selectedConversation.listingTitle && (
              <p className="text-[11px] text-neutral-500 truncate">{selectedConversation.listingTitle}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-neutral-100 transition">
              <Phone size={18} className="text-neutral-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100 transition">
              <MoreVertical size={18} className="text-neutral-600" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {selectedConversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  msg.sent
                    ? 'bg-[#17294F] text-white rounded-br-md'
                    : 'bg-white text-neutral-900 border border-neutral-100 rounded-bl-md shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sent ? 'text-white/60' : 'text-neutral-400'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-neutral-100 px-4 py-3 sticky bottom-0">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-neutral-100 transition">
              <Paperclip size={20} className="text-neutral-500" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-neutral-100 rounded-full px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#17294F]/20"
            />
            <button
              onClick={handleSendMessage}
              className={`p-2.5 rounded-full transition ${
                newMessage.trim() ? 'bg-[#17294F] text-white' : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100 px-4 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-extrabold text-neutral-900">
            Messages
            {totalUnread > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
                {totalUnread}
              </span>
            )}
          </h1>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-neutral-100 rounded-full pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#17294F]/20"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="divide-y divide-neutral-50">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="bg-neutral-50 p-6 rounded-full mb-4">
              <MessageCircle size={32} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">No conversations found</h3>
            <p className="text-neutral-500 text-sm">Try a different search term.</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-neutral-50 transition text-left"
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
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm truncate ${conversation.unread > 0 ? 'font-bold text-neutral-900' : 'font-medium text-neutral-700'}`}>
                    {conversation.name}
                  </h3>
                  <span className={`text-[11px] shrink-0 ${conversation.unread > 0 ? 'font-bold text-[#17294F]' : 'text-neutral-400'}`}>
                    {conversation.timestamp}
                  </span>
                </div>
                {conversation.listingTitle && (
                  <p className="text-[11px] text-[#2252D6] font-medium truncate">{conversation.listingTitle}</p>
                )}
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p className={`text-xs truncate ${conversation.unread > 0 ? 'text-neutral-700 font-medium' : 'text-neutral-400'}`}>
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="shrink-0 w-5 h-5 bg-[#17294F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}

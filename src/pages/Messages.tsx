import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreHorizontal, Phone, Video, ArrowLeft, Send, Image as ImageIcon, Smile, Moon, Sun, Camera, FileText, ChevronRight, X, Play, File as FileIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { DUMMY_CONVERSATIONS, DUMMY_MESSAGES } from '../mocks/messages';
import { AnnouncementsOverlay } from '../components/AnnouncementsOverlay';
import { UploadModal } from '../components/UploadModal';
import { CameraOverlay } from '../components/CameraOverlay';

import BottomNav from '../components/BottomNav';

type ChatMessage = {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
  attachments?: Attachment[];
};

export type Attachment = {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  name?: string;
  file?: File;
};

export default function Messages() {
  const [conversations, setConversations] = useState(DUMMY_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<typeof DUMMY_CONVERSATIONS[0] | null>(null);

  useEffect(() => {
    document.title = "Messages | Khubo";
  }, []);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(DUMMY_MESSAGES as ChatMessage[]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
  const [isAttachmentsExpanded, setIsAttachmentsExpanded] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [uploadAcceptedTypes, setUploadAcceptedTypes] = useState('*');
  
  // Phase 1, 2: Attachments state and refs
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      attachments.forEach(a => URL.revokeObjectURL(a.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const filterOptions = ['All', 'Landlord', 'Friends', 'Admin'];

  const handleSelectConversation = (conv: typeof DUMMY_CONVERSATIONS[0]) => {
    setSelectedConversation(conv);
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'file') => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments = Array.from(files).map(file => {
      // Determine more specific type base on mime
      let actualType = type;
      if (file.type.startsWith('image/')) actualType = 'image';
      else if (file.type.startsWith('video/')) actualType = 'video';
      else actualType = 'file';

      return {
        id: Date.now().toString() + Math.random().toString(36).substring(7),
        type: actualType,
        url: URL.createObjectURL(file),
        name: file.name,
        file
      };
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    // Reset inputs so the same file can be chosen again
    if (e.target) e.target.value = '';
  };

  const handleModalUpload = (files: File[]) => {
    const newAttachments = files.map(file => {
      let actualType: 'image' | 'video' | 'file' = 'file';
      if (file.type.startsWith('image/')) actualType = 'image';
      else if (file.type.startsWith('video/')) actualType = 'video';

      return {
        id: Date.now().toString() + Math.random().toString(36).substring(7),
        type: actualType,
        url: URL.createObjectURL(file),
        name: file.name,
        file
      };
    });

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleCameraCapture = (file: File) => {
    const newAttachment = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      type: 'image' as const,
      url: URL.createObjectURL(file),
      name: file.name,
      file
    };
    setAttachments(prev => [...prev, newAttachment]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const index = prev.findIndex(a => a.id === id);
      if (index !== -1) {
        URL.revokeObjectURL(prev[index].url);
      }
      return prev.filter(a => a.id !== id);
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() && attachments.length === 0) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageInput.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (attachments.length > 0) {
      newMessage.attachments = [...attachments];
    }

    setMessages([
      ...messages,
      newMessage
    ]);
    
    setMessageInput('');
    attachments.forEach(a => URL.revokeObjectURL(a.url));
    setAttachments([]);
    setIsAttachmentsExpanded(false);
  };

  return (
    <div className={`flex h-[100dvh] overflow-hidden font-sans pt-0 pb-0 ${isDarkMode ? 'bg-[#242526] text-white' : 'bg-white text-neutral-900'}`}>
      
      {/* MOBILE: When a conversation is selected, hide the sidebar. DESKTOP: Sidebar always visible */}
      <div className={`md:w-[360px] lg:w-[400px] flex-shrink-0 flex flex-col border-r ${isDarkMode ? 'border-[#3A3B3C]' : 'border-neutral-100'} ${selectedConversation ? 'hidden md:flex' : 'w-full flex'}`}>
        
        {/* Sidebar Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-transparent">
          <div className="flex items-center gap-3">
             <button 
              onClick={() => navigate(-1)}
              className={`p-2 -ml-2 rounded-full transition ${isDarkMode ? 'hover:bg-[#3A3B3C]' : 'hover:bg-neutral-100'}`}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>Chats</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition ${isDarkMode ? 'bg-[#3A3B3C] text-white hover:bg-[#4E4F50]' : 'bg-neutral-100 text-[#000000] hover:bg-neutral-200'}`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Search */}
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

        {/* Filters */}
        <div className="px-4 pb-3 pt-1 flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filterOptions.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
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

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 pb-24">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSelectConversation(conv)}
              className={`w-full flex items-center p-2 rounded-xl transition gap-3 ${isDarkMode ? 'hover:bg-[#3A3B3C]' : 'hover:bg-neutral-50'} ${selectedConversation?.id === conv.id ? (isDarkMode ? 'md:bg-[#3A3B3C]' : 'md:bg-neutral-100') : ''}`}
            >
              <div className="relative flex-shrink-0">
                <img src={conv.avatar} alt={conv.name} className={`w-14 h-14 rounded-full object-cover ${isDarkMode ? 'bg-[#3A3B3C]' : 'bg-neutral-200'}`} />
                {conv.online && (
                  <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 rounded-full ${isDarkMode ? 'border-[#242526]' : 'border-white'}`}></div>
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

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col ${isDarkMode ? 'bg-[#242526]' : 'bg-white'} ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className={`h-16 flex items-center justify-between px-4 mt-2 sm:mt-0 border-b flex-shrink-0 shadow-sm z-10 ${isDarkMode ? 'border-[#3A3B3C]' : 'border-neutral-100'}`}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedConversation(null)}
                  className={`p-2 -ml-2 rounded-full transition md:hidden ${isDarkMode ? 'hover:bg-[#3A3B3C]' : 'hover:bg-neutral-100'}`}
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="relative">
                  <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full object-cover" />
                  {selectedConversation.online && (
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 rounded-full ${isDarkMode ? 'border-[#242526]' : 'border-white'}`}></div>
                  )}
                </div>
                <div>
                  <h2 className={`font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{selectedConversation.name}</h2>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-[#B0B3B8]' : 'text-neutral-500'}`}>
                    {selectedConversation.online ? 'Active now' : 'Active ' + selectedConversation.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-[#2252D6] gap-4 sm:gap-6">
                <Phone size={20} className="cursor-pointer hover:opacity-80 transition" />
                <Video size={24} className="cursor-pointer hover:opacity-80 transition" />
              </div>
            </div>

            {/* Chat Messages */}
            <div className={`flex-1 overflow-y-auto px-4 py-6 space-y-4 ${isDarkMode ? 'bg-[#242526]' : 'bg-white'}`}>
              {/* Added a subtle top padding in the chat content to push the first chat bubble down slightly */}
              <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20">
                     <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-full h-full rounded-full object-cover" />
                     {selectedConversation.online && (
                       <div className={`absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 rounded-full ${isDarkMode ? 'border-[#242526]' : 'border-white'}`}></div>
                     )}
                  </div>
              </div>
              <div className="text-center mb-6">
                 <h2 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{selectedConversation.name}</h2>
                 <p className={`text-sm ${isDarkMode ? 'text-[#B0B3B8]' : 'text-neutral-500'}`}>Property Owner on Khubo</p>
                 <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#8C939D]' : 'text-neutral-400'}`}>You connected {selectedConversation.time}</p>
              </div>

              {messages.map((msg, i) => {
                const isMe = msg.sender === 'me';
                const showAvatar = !isMe && (i === messages.length - 1 || messages[i + 1].sender === 'me');
                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                      <div className="w-7 h-7 flex-shrink-0">
                        {showAvatar ? (
                          <img src={selectedConversation.avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
                        ) : (
                          <div className="w-7 h-7" />
                        )}
                      </div>
                    )}
                    
                    <div className={`max-w-[75%] flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
                      {/* Render Attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className={`flex flex-wrap gap-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {msg.attachments.map((attach: Attachment) => (
                            <div key={attach.id} className="relative group overflow-hidden rounded-xl border border-black/5" style={{ maxWidth: '240px' }}>
                              {attach.type === 'image' && (
                                <img src={attach.url} alt="attachment" className="max-w-full rounded-xl" style={{ maxHeight: '300px', objectFit: 'cover' }} />
                              )}
                              {attach.type === 'video' && (
                                <div className="relative bg-black/10 rounded-xl" style={{ minWidth: '200px', minHeight: '150px' }}>
                                  <video src={attach.url} className="max-w-full rounded-xl" style={{ maxHeight: '300px' }} />
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                                      <Play size={20} fill="currentColor" />
                                    </div>
                                  </div>
                                </div>
                              )}
                              {attach.type === 'file' && (
                                <div className={`flex items-center gap-3 p-3 rounded-xl max-w-[240px] border ${isMe ? 'bg-[#2252D6]/10 border-[#2252D6]/20' : (isDarkMode ? 'bg-[#3A3B3C] border-[#4E4F50]' : 'bg-neutral-100 border-neutral-200')}`}>
                                  <div className={`p-2 rounded-lg ${isMe ? 'bg-[#2252D6]/20' : (isDarkMode ? 'bg-[#4E4F50]' : 'bg-white shadow-sm')}`}>
                                    <FileIcon size={20} className={isMe ? 'text-[#2252D6]' : (isDarkMode ? 'text-white' : 'text-neutral-600')} />
                                  </div>
                                  <div className="flex-1 min-w-0 overflow-hidden">
                                    <p className={`text-sm font-medium truncate ${isMe ? 'text-white' : (isDarkMode ? 'text-white' : 'text-neutral-900')}`}>
                                      {attach.name || 'File attachment'}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Message Text */}
                      {msg.text && (
                        <div className={`px-4 py-2 ${isMe ? 'bg-[#2252D6] text-white rounded-2xl rounded-tr-md' : (isDarkMode ? 'bg-[#3A3B3C] text-white rounded-2xl rounded-tl-md' : 'bg-neutral-100 text-neutral-900 rounded-2xl rounded-tl-md')}`}>
                          <p className="text-[14.5px] leading-relaxed">{msg.text}</p>
                        </div>
                      )}
                      {isMe && i === messages.length - 1 && (
                        <span className={`text-[11px] flex items-center gap-1 mt-0.5 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          Delivered
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hidden Input Elements */}
            <input type="file" ref={imageInputRef} accept="image/*,video/*" multiple className="hidden" onChange={(e) => handleFileSelect(e, 'image')} />
            <input type="file" ref={fileInputRef} accept="*" multiple className="hidden" onChange={(e) => handleFileSelect(e, 'file')} />

            {/* Attachments Preview Area Before Input */}
            <AnimatePresence>
              {attachments.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  className={`p-3 border-t overflow-x-auto flex items-center gap-2 ${isDarkMode ? 'bg-[#242526] border-[#3A3B3C]' : 'bg-white border-neutral-100'}`}
                >
                  {attachments.map(attach => (
                    <div key={attach.id} className="relative flex-shrink-0 group">
                      <div className={`w-16 h-16 rounded-xl overflow-hidden border ${isDarkMode ? 'border-[#3A3B3C] bg-[#3A3B3C]' : 'border-neutral-200 bg-neutral-100'}`}>
                        {attach.type === 'image' && (
                          <img src={attach.url} alt="preview" className="w-full h-full object-cover" />
                        )}
                        {attach.type === 'video' && (
                          <div className="w-full h-full bg-black/20 flex items-center justify-center relative">
                            <video src={attach.url} className="w-full h-full object-cover absolute inset-0 text-transparent" />
                            <Play size={16} fill="white" className="text-white z-10" />
                          </div>
                        )}
                        {attach.type === 'file' && (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                            <FileIcon size={24} />
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => removeAttachment(attach.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 shadow-sm hover:bg-gray-50 transition drop-shadow-sm"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message Input - Bottom */}
            <div className={`p-2 sm:p-3 pb-safe relative z-20 ${attachments.length === 0 ? 'border-t' : ''} ${isDarkMode ? 'bg-[#242526] border-[#3A3B3C]' : 'bg-white border-neutral-100'}`}>
              <div className="flex items-center gap-1 sm:gap-2 w-full">
                
                {/* Expanded/Collapsible Actions */}
                <div className="flex items-center shrink-0">
                  <button 
                    onClick={() => setIsAttachmentsExpanded(!isAttachmentsExpanded)}
                    className={`p-2 rounded-full transition flex-shrink-0 ${isDarkMode ? 'text-white hover:bg-[#3A3B3C]' : 'text-black hover:bg-neutral-100'}`}
                  >
                    {!isAttachmentsExpanded ? (
                      messageInput.trim() ? <ChevronRight size={22} /> : <MoreHorizontal size={22} />
                    ) : (
                      <ChevronRight size={22} />
                    )}
                  </button>

                  <div className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${isAttachmentsExpanded ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}`}>
                    <button 
                      onClick={() => setIsCameraOpen(true)}
                      className={`p-2 rounded-full transition shrink-0 ${isDarkMode ? 'text-white hover:bg-[#3A3B3C]' : 'text-black hover:bg-neutral-100'}`}
                    >
                      <Camera size={22} />
                    </button>
                    <button 
                      onClick={() => { setUploadAcceptedTypes('image/*,video/*'); setIsUploadModalOpen(true); }}
                      className={`p-2 rounded-full transition shrink-0 ${isDarkMode ? 'text-white hover:bg-[#3A3B3C]' : 'text-black hover:bg-neutral-100'}`}
                    >
                      <ImageIcon size={22} />
                    </button>
                    <button 
                      onClick={() => { setUploadAcceptedTypes('*'); setIsUploadModalOpen(true); }}
                      className={`p-2 rounded-full transition shrink-0 ${isDarkMode ? 'text-white hover:bg-[#3A3B3C]' : 'text-black hover:bg-neutral-100'}`}
                    >
                       <FileText size={22} />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSendMessage} className={`flex-1 flex items-center min-w-0 rounded-full px-3 py-1.5 focus-within:ring-2 ring-[#2252D6]/20 transition-all border ${isDarkMode ? 'bg-[#3A3B3C] border-transparent' : 'bg-neutral-100 border-neutral-300'}`}>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Message"
                    className={`flex-1 w-full bg-transparent border-none outline-none text-[15px] focus:ring-0 py-1 px-1 min-w-0 ${isDarkMode ? 'text-white placeholder-[#B0B3B8]' : 'text-neutral-800 placeholder-neutral-500'}`}
                  />
                  <button type="button" className={`p-1 ml-1 rounded-full transition flex-shrink-0 ${isDarkMode ? 'text-white hover:bg-[#4E4F50]' : 'text-black hover:bg-neutral-200'}`}>
                    <Smile size={20} />
                  </button>
                </form>

                {(messageInput.trim() || attachments.length > 0) && (
                  <button onClick={handleSendMessage} className={`p-2 rounded-full transition flex-shrink-0 ${isDarkMode ? 'text-white hover:bg-[#3A3B3C]' : 'text-black hover:bg-neutral-100'}`}>
                    <Send size={22} />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className={`hidden md:flex flex-1 flex-col items-center justify-center text-center p-8 ${isDarkMode ? 'bg-[#242526]' : 'bg-neutral-50'}`}>

             <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Your Messages</h2>
             <p className={`max-w-sm ${isDarkMode ? 'text-[#B0B3B8]' : 'text-neutral-500'}`}>
               Select a conversation from the sidebar or start a new chat with a property owner or a potential roommate.
             </p>
          </div>
        )}
      </div>

      <AnnouncementsOverlay isOpen={isAnnouncementsOpen} onClose={() => setIsAnnouncementsOpen(false)} />
      
      <CameraOverlay 
        isOpen={isCameraOpen} 
        onClose={() => setIsCameraOpen(false)} 
        onCapture={handleCameraCapture} 
      />

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUpload={handleModalUpload} 
        isDarkMode={isDarkMode} 
        acceptedTypes={uploadAcceptedTypes} 
      />
    </div>
  );
}

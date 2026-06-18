// @context: Messages page — chat/conversation interface
// @purpose: Two-panel layout: conversation list (left) and active chat (right); mobile uses single-column
// @behavior: Select conversation to view messages; send text messages with optional file attachment; dark mode toggle
// @dependencies: DUMMY_CONVERSATIONS/DUMMY_MESSAGES, AnnouncementsOverlay, UploadModal, motion, lucide-react, react-router-dom

import { useState, useRef, useEffect } from 'react';
import {
  MoreHorizontal, Phone, Video, ArrowLeft, Send, Image as ImageIcon,
  Smile, Camera, FileText, ChevronRight, X, Play, File as FileIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { DUMMY_CONVERSATIONS, DUMMY_MESSAGES } from '../mocks/messages';
import { AnnouncementsOverlay } from '../components/AnnouncementsOverlay';
import { UploadModal } from '../components/UploadModal';
import { CameraOverlay } from '../components/CameraOverlay';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMessage, { Attachment } from '../components/chat/ChatMessage';

type ChatMessageData = {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
  attachments?: Attachment[];
};

export default function Messages() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState(DUMMY_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<typeof DUMMY_CONVERSATIONS[0] | null>(null);

  useEffect(() => {
    document.title = "Messages | Khubo";
  }, []);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<ChatMessageData[]>(DUMMY_MESSAGES as ChatMessageData[]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
  const [isAttachmentsExpanded, setIsAttachmentsExpanded] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [uploadAcceptedTypes, setUploadAcceptedTypes] = useState('*');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      attachments.forEach(a => URL.revokeObjectURL(a.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectConversation = (conv: typeof DUMMY_CONVERSATIONS[0]) => {
    setSelectedConversation(conv);
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments = Array.from(files).map(file => {
      const actualType = file.type.startsWith('image/') ? 'image' as const
        : file.type.startsWith('video/') ? 'video' as const
        : 'file' as const;
      return {
        id: Date.now().toString() + Math.random().toString(36).substring(7),
        type: actualType,
        url: URL.createObjectURL(file),
        name: file.name,
        file,
      };
    });

    setAttachments(prev => [...prev, ...newAttachments]);
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
        file,
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
      file,
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

    const newMessage: ChatMessageData = {
      id: Date.now().toString(),
      text: messageInput.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (attachments.length > 0) {
      newMessage.attachments = [...attachments];
    }

    setMessages([...messages, newMessage]);
    setMessageInput('');
    attachments.forEach(a => URL.revokeObjectURL(a.url));
    setAttachments([]);
    setIsAttachmentsExpanded(false);
  };

  return (
    <div className={`flex h-[100dvh] overflow-hidden font-sans pt-0 pb-0 ${isDarkMode ? 'bg-[#242526] text-white' : 'bg-white text-neutral-900'}`}>
      {/* Sidebar */}
      <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
        <ChatSidebar
          conversations={conversations}
          selectedId={selectedConversation?.id ?? null}
          onSelect={handleSelectConversation}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onBack={() => navigate(-1)}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
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
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 rounded-full ${isDarkMode ? 'border-[#242526]' : 'border-white'}`} />
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

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto px-4 py-6 space-y-4 ${isDarkMode ? 'bg-[#242526]' : 'bg-white'}`}>
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20">
                  <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-full h-full rounded-full object-cover" />
                  {selectedConversation.online && (
                    <div className={`absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 rounded-full ${isDarkMode ? 'border-[#242526]' : 'border-white'}`} />
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
                  <ChatMessage
                    key={msg.id}
                    msg={msg}
                    isLast={i === messages.length - 1}
                    showAvatar={showAvatar}
                    avatar={selectedConversation.avatar}
                    isDarkMode={isDarkMode}
                  />
                );
              })}
            </div>

            {/* Hidden Input Elements */}
            <input type="file" ref={imageInputRef} accept="image/*,video/*" multiple className="hidden" onChange={handleFileSelect} />
            <input type="file" ref={fileInputRef} accept="*" multiple className="hidden" onChange={handleFileSelect} />

            {/* Attachments Preview */}
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

            {/* Message Input */}
            <div className={`p-2 sm:p-3 pb-safe relative z-20 ${attachments.length === 0 ? 'border-t' : ''} ${isDarkMode ? 'bg-[#242526] border-[#3A3B3C]' : 'bg-white border-neutral-100'}`}>
              <div className="flex items-center gap-1 sm:gap-2 w-full">
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
      <CameraOverlay isOpen={isCameraOpen} onClose={() => setIsCameraOpen(false)} onCapture={handleCameraCapture} />
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onUpload={handleModalUpload} isDarkMode={isDarkMode} acceptedTypes={uploadAcceptedTypes} />
    </div>
  );
}

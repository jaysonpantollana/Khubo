import { Play, FileIcon } from 'lucide-react';

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  name?: string;
  file?: File;
}

interface ChatMessageData {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
  attachments?: Attachment[];
}

interface Props {
  msg: ChatMessageData;
  isLast: boolean;
  showAvatar: boolean;
  avatar: string;
  isDarkMode: boolean;
}

export default function ChatMessage({ msg, isLast, showAvatar, avatar, isDarkMode }: Props) {
  const isMe = msg.sender === 'me';

  return (
    <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <div className="w-7 h-7 flex-shrink-0">
          {showAvatar ? (
            <img src={avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <div className="w-7 h-7" />
          )}
        </div>
      )}

      <div className={`max-w-[75%] flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
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

        {msg.text && (
          <div className={`px-4 py-2 ${isMe ? 'bg-[#2252D6] text-white rounded-2xl rounded-tr-md' : (isDarkMode ? 'bg-[#3A3B3C] text-white rounded-2xl rounded-tl-md' : 'bg-neutral-100 text-neutral-900 rounded-2xl rounded-tl-md')}`}>
            <p className="text-[14.5px] leading-relaxed">{msg.text}</p>
          </div>
        )}
        {isMe && isLast && (
          <span className={`text-[11px] flex items-center gap-1 mt-0.5 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Delivered
          </span>
        )}
      </div>
    </div>
  );
}

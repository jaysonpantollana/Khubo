// @context: Mock messaging seed data for development
// @purpose: 5 dummy conversations + 5 dummy messages for Messages.tsx development
// @purpose: Serves as seed data until real messaging backend is integrated
// @schema: DUMMY_CONVERSATIONS[]: {id, name, avatar, lastMessage, time, unread, online}
// @schema: DUMMY_MESSAGES[]: {id, text, sender (me | them), time}
// @behavior: Messages.tsx reads both arrays directly (not through API layer)
// @behavior: DUMMY_CONVERSATIONS shown in conversation sidebar; DUMMY_MESSAGES for active chat
// @performance: In-memory; no async loading — instant access
// @side-effects: None
// @migration: When real backend arrives, replace with API calls from lib/api/messages.ts
// @tests: None
// @dependencies: None
// @owner: Core team
// @known-issues: No conversation list is returned from getConversations() mock (returns empty array)
// @known-issues: DUMMY_CONVERSATIONS does NOT match Conversation interface (different field names — no participantId/participantName/participantAvatar)
// @known-issues: No unread count updates, no real-time message delivery

export const DUMMY_CONVERSATIONS = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    lastMessage: 'Are the room keys available?',
    time: '10:42 AM',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
    lastMessage: 'Sounds good, let\'s meet tomorrow.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    lastMessage: 'Can you show me the lease agreement?',
    time: 'Tue',
    unread: 0,
    online: true,
  },
  {
    id: '4',
    name: 'David Brown',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    lastMessage: 'Is utilities included in the rent?',
    time: 'Mon',
    unread: 0,
    online: false,
  },
  {
    id: '5',
    name: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    lastMessage: 'I am interested in the apartment.',
    time: 'Sun',
    unread: 0,
    online: false,
  },
];

export const DUMMY_MESSAGES = [
  { id: '1', text: 'Hi, I saw your listing for the apartment.', sender: 'them', time: '10:30 AM' },
  { id: '2', text: 'Hello! Yes, it is still available.', sender: 'me', time: '10:32 AM' },
  { id: '3', text: 'Great! Could we schedule a viewing?', sender: 'them', time: '10:35 AM' },
  { id: '4', text: 'Absolutely. Are you free tomorrow afternoon?', sender: 'me', time: '10:40 AM' },
  { id: '5', text: 'Are the room keys available?', sender: 'them', time: '10:42 AM' },
];

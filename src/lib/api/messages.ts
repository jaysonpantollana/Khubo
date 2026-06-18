// @context: Messaging API
// @purpose: getConversations, getMessages, sendMessage - all with mock fallback
// @behavior: Mock conversations always return empty array; messages return from DUMMY_MESSAGES
// @behavior: sendMessage creates a new Message with URL.createObjectURL for file attachments
// @security: No message encryption; no sender verification on mock
// @performance: No pagination on messages; all returned at once
// @side-effects: sendMessage creates blob URLs (URL.createObjectURL) that are never revoked = memory leak
// @known-issues: URL.createObjectURL memory leak in sendMessage (cleanup missing in Messages.tsx)
// @dependencies: mocks/messages.ts, client.ts

import { apiGet, apiPost } from './client';
import { DUMMY_MESSAGES as MOCK_MESSAGES } from '../../mocks/messages';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachment?: { name: string; url: string; type: string };
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getConversations() {
  const { data, error } = await apiGet<Conversation[]>('/messages/conversations');
  if (error) {
    await delay(300);
    return { data: [] as Conversation[], error: null };
  }
  return { data: data || [], error };
}

export async function getMessages(conversationId: string) {
  const { data, error } = await apiGet<Message[]>(`/messages/${conversationId}`);
  if (error) {
    await delay(300);
    const messages = (MOCK_MESSAGES || []) as Message[];
    return { data: messages, error: null };
  }
  return { data: data || [], error };
}

export async function sendMessage(conversationId: string, text: string, attachment?: File) {
  const formData = new FormData();
  formData.append('text', text);
  if (attachment) {
    formData.append('attachment', attachment);
  }
  const { data, error } = await apiPost<Message>(`/messages/${conversationId}`, {
    text,
    attachmentName: attachment?.name,
  });
  if (error) {
    await delay(200);
    const msg: Message = {
      id: 'msg_' + Date.now(),
      senderId: 'current_user',
      text,
      timestamp: new Date().toISOString(),
      attachment: attachment
        ? { name: attachment.name, url: URL.createObjectURL(attachment), type: attachment.type }
        : undefined,
    };
    return { data: msg, error: null };
  }
  return { data, error };
}

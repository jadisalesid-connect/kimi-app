import { useState, useEffect } from 'react';
import type { Conversation } from '@/types';
import { CURRENT_USER_ID } from '@/data/mockData';
import { X, MessageSquare } from 'lucide-react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  activeMemberId: string | null;
}

export default function ChatPanel({
  isOpen,
  onClose,
  conversations,
  setConversations,
  activeMemberId,
}: ChatPanelProps) {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Set active conversation when activeMemberId changes
  useEffect(() => {
    if (activeMemberId) {
      const convId = `conv-${activeMemberId}`;
      const exists = conversations.find(c => c.id === convId);
      if (exists) {
        setActiveConversationId(convId);
      }
    }
  }, [activeMemberId, conversations]);

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    // Mark messages as read
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === id) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map(m =>
              m.receiverId === CURRENT_USER_ID ? { ...m, isRead: true } : m
            ),
          };
        }
        return conv;
      })
    );
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER_ID,
      receiverId: conversationId.replace('conv-', ''),
      content,
      timestamp: Date.now(),
      isRead: false,
    };

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessageAt: newMessage.timestamp,
          };
        }
        return conv;
      })
    );
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:inset-auto md:right-0 md:top-16 md:bottom-0 md:w-[480px] lg:w-[520px] flex flex-col bg-[#090A0F] border-l border-white/[0.08] shadow-2xl">
      {/* Mobile Close Button */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/[0.08]">
        <span className="font-mono-data text-xs text-[#4B4D55] uppercase tracking-wider">Comms Link</span>
        <button onClick={onClose} className="p-2 text-[#8B8D98] hover:text-[#F0F2F5]">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop Close */}
      <div className="hidden md:flex items-center justify-end px-3 py-2 border-b border-white/[0.08]">
        <button
          onClick={onClose}
          className="p-1.5 rounded text-[#4B4D55] hover:text-[#F0F2F5] hover:bg-white/[0.05] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation List */}
        <div className="w-[200px] shrink-0 border-r border-white/[0.08] overflow-hidden">
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        {/* Chat Window */}
        <div className="flex-1 min-w-0">
          {activeConversation ? (
            <ChatWindow
              conversation={activeConversation}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#4B4D55]">
              <MessageSquare className="h-10 w-10 mb-3" />
              <p className="text-sm">Select a conversation</p>
              <p className="text-xs mt-1">or initiate chat from a member profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

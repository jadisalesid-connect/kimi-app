import { useState, useRef, useEffect, useCallback } from 'react';
import type { Member, Conversation, Message } from '@/types';
import { INITIAL_MEMBERS, CURRENT_USER_ID } from '@/data/mockData';
import { Shield, Send, Paperclip, Lock } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (conversationId: string, content: string) => void;
}

function getParticipant(participantId: string): Member | undefined {
  return INITIAL_MEMBERS.find(m => m.id === participantId);
}

function formatMessageTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateDivider(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) return 'Today';

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function ChatWindow({ conversation, onSendMessage }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const participant = getParticipant(conversation.participantId);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages, scrollToBottom]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSendMessage(conversation.id, trimmed);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!participant) return null;

  // Group messages by date
  const messageGroups: { date: string; messages: Message[] }[] = [];
  let currentGroup: { date: string; messages: Message[] } | null = null;

  conversation.messages.forEach((msg) => {
    const dateStr = formatDateDivider(msg.timestamp);
    if (!currentGroup || currentGroup.date !== dateStr) {
      currentGroup = { date: dateStr, messages: [] };
      messageGroups.push(currentGroup);
    }
    currentGroup.messages.push(msg);
  });

  return (
    <div className="flex flex-col h-full bg-[#090A0F]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#11121A]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-xs font-medium text-white">
              {participant.avatar}
            </div>
            {participant.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#10B981] border-2 border-[#11121A]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#F0F2F5]">{participant.fullName}</span>
              <Lock className="h-3 w-3 text-[#10B981]" />
            </div>
            <p className="text-[11px] text-[#4B4D55]">
              {participant.jobTitle} · {participant.companyName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#10B981]/10 text-[10px] text-[#10B981]">
            <Shield className="h-3 w-3" />
            Secure Line
          </span>
          {participant.products.length > 0 && (
            <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-[#11121A] text-[10px] text-[#8B8D98] border border-white/[0.08]">
              Offering: {participant.products[0].title}
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messageGroups.map((group, gi) => (
          <div key={gi} className="space-y-3">
            {/* Date Divider */}
            <div className="flex items-center justify-center">
              <span className="text-[10px] text-[#4B4D55] font-mono-data uppercase tracking-wider px-3 py-1 rounded-full bg-[#11121A]">
                {group.date}
              </span>
            </div>

            {group.messages.map((msg) => {
              const isOutgoing = msg.senderId === CURRENT_USER_ID;

              return (
                <div
                  key={msg.id}
                  className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-3.5 py-2.5 ${
                      isOutgoing
                        ? 'bg-[#1E3A8A] text-white'
                        : 'bg-[#11121A] text-[#8B8D98] border border-white/[0.08]'
                    }`}
                    style={{
                      animation: 'messagePop 0.2s ease-out',
                    }}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className={`text-[10px] mt-1.5 text-right ${isOutgoing ? 'text-blue-300' : 'text-[#4B4D55]'}`}>
                      {formatMessageTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/[0.08] bg-[#11121A]">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-[#4B4D55] hover:text-[#8B8D98] hover:bg-white/[0.05] transition-colors shrink-0">
            <Paperclip className="h-4 w-4" />
          </button>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full h-10 px-4 bg-[#050507] rounded-lg text-sm text-[#F0F2F5] placeholder:text-[#4B4D55] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50 border border-white/[0.04]"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2.5 rounded-lg bg-[#2563EB] text-white hover:bg-[#1d4ed8] disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes messagePop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

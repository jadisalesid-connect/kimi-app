import type { Member, Conversation } from '@/types';
import { INITIAL_MEMBERS } from '@/data/mockData';
import { MessageSquare } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

function getParticipant(participantId: string): Member | undefined {
  return INITIAL_MEMBERS.find(m => m.id === participantId);
}

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(hours / 24);

  if (hours < 1) return 'Now';
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const sorted = [...conversations].sort((a, b) => b.lastMessageAt - a.lastMessageAt);

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[#4B4D55]">
        <MessageSquare className="h-8 w-8 mb-2" />
        <p className="text-sm">No conversations yet</p>
        <p className="text-xs mt-1">Initiate chat from a member card</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-white/[0.08]">
        <h3 className="font-mono-data text-xs text-[#4B4D55] uppercase tracking-wider">Active Lines</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sorted.map((conv) => {
          const participant = getParticipant(conv.participantId);
          if (!participant) return null;

          const lastMessage = conv.messages[conv.messages.length - 1];
          const isActive = conv.id === activeConversationId;
          const isUnread = conv.unreadCount > 0;

          const industryColor = participant.industry === 'tech' ? '#2563EB' : '#F59E0B';

          return (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all hover:bg-white/[0.03] relative ${
                isActive ? 'bg-white/[0.05]' : ''
              }`}
            >
              {/* Unread indicator */}
              {isUnread && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full"
                  style={{ backgroundColor: '#06B6D4', boxShadow: '0 0 8px #06B6D4' }}
                />
              )}

              <div className="relative shrink-0">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-medium text-white"
                  style={{ background: `linear-gradient(135deg, ${industryColor}, #06B6D4)` }}
                >
                  {participant.avatar}
                </div>
                {participant.isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#10B981] border-2 border-[#11121A]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm truncate ${isUnread ? 'text-[#F0F2F5] font-medium' : 'text-[#8B8D98]'}`}>
                    {participant.fullName}
                  </span>
                  <span className="text-[10px] text-[#4B4D55] shrink-0 ml-2">
                    {lastMessage ? formatTime(lastMessage.timestamp) : ''}
                  </span>
                </div>
                <p className="text-xs text-[#4B4D55] truncate mt-0.5">{participant.companyName}</p>
                {lastMessage && (
                  <p className={`text-xs truncate mt-1 ${isUnread ? 'text-[#8B8D98]' : 'text-[#4B4D55]'}`}>
                    {lastMessage.content}
                  </p>
                )}
              </div>

              {conv.unreadCount > 0 && (
                <span className="shrink-0 h-5 min-w-5 rounded-full bg-[#06B6D4] text-[10px] flex items-center justify-center text-[#090A0F] font-medium px-1.5">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

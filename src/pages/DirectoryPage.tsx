import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import type { Member, Conversation, IndustryCategory } from '@/types';
import { INITIAL_MEMBERS, createInitialConversations } from '@/data/mockData';
import { Search, SlidersHorizontal } from 'lucide-react';
import Navigation from '@/components/Navigation';
import MemberCard from '@/components/MemberCard';
import ChatPanel from '@/components/ChatPanel';

export default function DirectoryPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [members] = useState<Member[]>(INITIAL_MEMBERS);
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const stored = localStorage.getItem('salesconnect_conversations');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return createInitialConversations();
      }
    }
    return createInitialConversations();
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<IndustryCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChatMemberId, setActiveChatMemberId] = useState<string | null>(null);

  // Persist conversations
  useEffect(() => {
    localStorage.setItem('salesconnect_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Industry filter
      if (industryFilter !== 'all' && member.industry !== industryFilter) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = member.fullName.toLowerCase().includes(q);
        const companyMatch = member.companyName.toLowerCase().includes(q);
        const titleMatch = member.jobTitle.toLowerCase().includes(q);
        const productMatch = member.products.some(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
        return nameMatch || companyMatch || titleMatch || productMatch;
      }

      return true;
    });
  }, [members, searchQuery, industryFilter]);

  const unreadCount = useMemo(() => {
    return conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  }, [conversations]);

  const handleInitiateChat = (member: Member) => {
    setActiveChatMemberId(member.id);
    setChatOpen(true);

    // Ensure conversation exists
    const convId = `conv-${member.id}`;
    setConversations((prev) => {
      if (prev.find((c) => c.id === convId)) return prev;
      return [
        ...prev,
        {
          id: convId,
          participantId: member.id,
          messages: [],
          lastMessageAt: Date.now(),
          unreadCount: 0,
        },
      ];
    });
  };

  const handleChatToggle = () => {
    setChatOpen((prev) => !prev);
    if (!chatOpen) {
      setActiveChatMemberId(null);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#090A0F]">
      <Navigation
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        showSearch={true}
        onChatToggle={handleChatToggle}
        unreadCount={unreadCount}
      />

      <div className="pt-16">
        {/* Header Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-white/[0.08]">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl font-light text-[#F0F2F5] tracking-tight">Member Directory</h1>
                <p className="text-xs text-[#4B4D55] mt-1">
                  {filteredMembers.length} professional{filteredMembers.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Industry Filter */}
                <div className="flex items-center gap-2 bg-[#11121A] rounded-lg p-1 border border-white/[0.08]">
                  <button
                    onClick={() => setIndustryFilter('all')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      industryFilter === 'all'
                        ? 'bg-[#2563EB] text-white'
                        : 'text-[#8B8D98] hover:text-[#F0F2F5]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setIndustryFilter('tech')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      industryFilter === 'tech'
                        ? 'bg-[#2563EB] text-white'
                        : 'text-[#8B8D98] hover:text-[#F0F2F5]'
                    }`}
                  >
                    Tech Sales
                  </button>
                  <button
                    onClick={() => setIndustryFilter('machinery')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      industryFilter === 'machinery'
                        ? 'bg-[#F59E0B] text-[#090A0F]'
                        : 'text-[#8B8D98] hover:text-[#F0F2F5]'
                    }`}
                  >
                    Machinery
                  </button>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden p-2 rounded-lg bg-[#11121A] border border-white/[0.08] text-[#8B8D98]"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile Search (shown when filters open) */}
            {showFilters && (
              <div className="sm:hidden mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B4D55]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search members..."
                    className="w-full h-10 pl-10 pr-4 bg-[#11121A] border border-white/[0.08] rounded-lg text-sm text-[#F0F2F5] placeholder:text-[#4B4D55] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1600px] mx-auto">
            {filteredMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {filteredMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onInitiateChat={handleInitiateChat}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-[#4B4D55]">
                <Search className="h-12 w-12 mb-4" />
                <p className="text-lg text-[#8B8D98]">No members found</p>
                <p className="text-sm mt-2">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIndustryFilter('all');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-sm hover:bg-[#1d4ed8] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {chatOpen && (
        <ChatPanel
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          conversations={conversations}
          setConversations={setConversations}
          activeMemberId={activeChatMemberId}
        />
      )}
    </div>
  );
}

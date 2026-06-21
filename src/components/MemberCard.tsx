import { useState } from 'react';
import type { Member } from '@/types';
import { MessageCircle, MapPin } from 'lucide-react';

interface MemberCardProps {
  member: Member;
  onInitiateChat: (member: Member) => void;
}

export default function MemberCard({ member, onInitiateChat }: MemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const industryColor = member.industry === 'tech'
    ? 'bg-[#2563EB]/20 text-[#2563EB] border-[#2563EB]/30'
    : 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30';

  const industryLabel = member.industry === 'tech' ? 'TECH' : 'MACHINERY';

  return (
    <div
      className="relative bg-[#11121A] rounded-xl overflow-hidden transition-all duration-300 group"
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered ? '0 0 0 1px rgba(255,255,255,0.15)' : '0 0 0 1px rgba(255,255,255,0.04)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Row */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-sm font-medium text-white">
                {member.avatar}
              </div>
              {member.isOnline && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#10B981] border-2 border-[#11121A]" />
              )}
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-[#F0F2F5] leading-tight">{member.fullName}</h3>
              <p className="text-xs text-[#4B4D55] mt-0.5">{member.jobTitle}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono-data tracking-wider border ${industryColor}`}>
            {industryLabel}
          </span>
        </div>

        {/* Company & Location */}
        <div className="mt-3 flex items-center gap-3 text-xs text-[#8B8D98]">
          <span className="font-medium">{member.companyName}</span>
          <span className="text-[#4B4D55]">|</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {member.location}
          </span>
        </div>

        {/* Bio */}
        <p className="mt-3 text-xs text-[#8B8D98] leading-relaxed line-clamp-2">
          {member.bio}
        </p>

        {/* Products */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {member.products.slice(0, 3).map((product, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2 py-1 rounded bg-[#090A0F] text-[11px] text-[#8B8D98] border border-white/[0.04]"
            >
              {product.title}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button - slides up on hover */}
      <div
        className="transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: isHovered ? '60px' : '0px',
          opacity: isHovered ? 1 : 0,
        }}
      >
        <button
          onClick={() => onInitiateChat(member)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Initiate Chat
        </button>
      </div>

      {/* Default bottom padding when not hovered */}
      {!isHovered && <div className="h-1" />}
    </div>
  );
}

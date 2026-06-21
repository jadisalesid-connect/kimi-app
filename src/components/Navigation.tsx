import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Search, MessageCircle, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface NavigationProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
  showSearch?: boolean;
  onChatToggle?: () => void;
  unreadCount?: number;
}

export default function Navigation({
  onSearch,
  searchQuery = '',
  showSearch = false,
  onChatToggle,
  unreadCount = 0,
}: NavigationProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDirectory = location.pathname === '/directory';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="absolute inset-0 bg-[#090A0F]/80 backdrop-blur-md border-b border-white/[0.08]" />
      <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span className="font-mono-data text-xs tracking-[0.2em] text-[#F0F2F5] uppercase">
            SALESCONNECT
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06B6D4]" />
          </span>
        </Link>

        {/* Center Search */}
        {showSearch && isDirectory && (
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B4D55]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch?.(e.target.value)}
                placeholder="Search persons, machinery, or tech specs..."
                className="w-full h-10 pl-10 pr-4 bg-[#11121A] border border-white/[0.08] rounded-lg text-sm text-[#F0F2F5] placeholder:text-[#4B4D55] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
          </div>
        )}

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {isDirectory && onChatToggle && (
                <button
                  onClick={onChatToggle}
                  className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-[#11121A] border border-white/[0.08] text-[#8B8D98] hover:text-[#F0F2F5] hover:border-white/[0.2] transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">Comms</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#06B6D4] text-[10px] flex items-center justify-center text-[#090A0F] font-medium">
                      {unreadCount}
                    </span>
                  )}
                </button>
              )}

              {!isDirectory && (
                <Link
                  to="/directory"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1d4ed8] transition-colors"
                >
                  <Search className="h-4 w-4" />
                  Browse Directory
                </Link>
              )}

              <div className="flex items-center gap-3 pl-4 border-l border-white/[0.08]">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-[#F0F2F5] font-medium">{user?.fullName}</span>
                  <span className="text-[10px] text-[#4B4D55] uppercase">{user?.companyName}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-xs font-medium text-white">
                  {user?.avatar}
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-[#4B4D55] hover:text-[#F0F2F5] hover:bg-white/[0.05] transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-[#8B8D98] hover:text-[#F0F2F5] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors"
              >
                Join Community
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#8B8D98] hover:text-[#F0F2F5]"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#090A0F]/95 backdrop-blur-lg border-b border-white/[0.08] p-4 space-y-3">
          {showSearch && isDirectory && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B4D55]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch?.(e.target.value)}
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 bg-[#11121A] border border-white/[0.08] rounded-lg text-sm text-[#F0F2F5] placeholder:text-[#4B4D55] focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          )}

          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#11121A]">
                <div className="h-10 w-10 rounded-full bg-[#2563EB] flex items-center justify-center text-sm font-medium text-white">
                  {user?.avatar}
                </div>
                <div>
                  <p className="text-sm text-[#F0F2F5] font-medium">{user?.fullName}</p>
                  <p className="text-xs text-[#4B4D55]">{user?.companyName}</p>
                </div>
              </div>
              {isDirectory && onChatToggle && (
                <button
                  onClick={() => { onChatToggle(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 w-full p-3 rounded-lg bg-[#11121A] text-[#8B8D98] hover:text-[#F0F2F5] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">Messages</span>
                  {unreadCount > 0 && (
                    <span className="ml-auto h-5 w-5 rounded-full bg-[#06B6D4] text-[10px] flex items-center justify-center text-[#090A0F] font-medium">
                      {unreadCount}
                    </span>
                  )}
                </button>
              )}
              {!isDirectory && (
                <Link
                  to="/directory"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 w-full p-3 rounded-lg bg-[#2563EB] text-white text-sm"
                >
                  <Search className="h-4 w-4" />
                  Browse Directory
                </Link>
              )}
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 w-full p-3 rounded-lg text-[#8B8D98] hover:text-[#F0F2F5] transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full p-3 rounded-lg text-[#8B8D98] hover:text-[#F0F2F5]"
              >
                <User className="h-4 w-4" />
                <span className="text-sm">Sign In</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full p-3 rounded-lg bg-[#2563EB] text-white text-sm"
              >
                <span>Join Community</span>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

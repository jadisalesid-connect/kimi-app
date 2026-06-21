import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill with demo account for easy testing
  const fillDemo = () => {
    setEmail('demo@salesconnect.io');
    setPassword('demo123');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate('/directory');
      } else {
        setError('Invalid credentials. Try the demo account below.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[40%] relative items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/images/network-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#090A0F] via-[#090A0F]/80 to-transparent" />
        <div className="relative z-10 p-12">
          <h2 className="text-2xl font-light text-[#F0F2F5] mb-4">
            Welcome back to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
              SalesConnect
            </span>
          </h2>
          <p className="text-sm text-[#8B8D98] max-w-xs leading-relaxed">
            Your secure portal to the B2B sales network. Access your conversations, manage your product catalog, and discover new opportunities.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-light text-[#F0F2F5] tracking-tight">Authentication Required</h1>
            <p className="text-sm text-[#4B4D55] mt-2">Enter your credentials to access the network</p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono-data text-xs text-[#4B4D55] uppercase tracking-wider mb-2">
                Corporate Email
              </label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B4D55]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent border-b border-white/[0.08] py-3 pl-7 text-[#F0F2F5] placeholder:text-[#4B4D55] focus:outline-none focus:border-[#2563EB] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-mono-data text-xs text-[#4B4D55] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B4D55]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-white/[0.08] py-3 pl-7 text-[#F0F2F5] placeholder:text-[#4B4D55] focus:outline-none focus:border-[#2563EB] transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1d4ed8] disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Access Network
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Account Helper */}
          <div className="mt-6 p-4 rounded-lg bg-[#11121A] border border-white/[0.04]">
            <p className="text-xs text-[#4B4D55] mb-2">Don&apos;t have an account yet?</p>
            <button
              onClick={fillDemo}
              className="text-sm text-[#2563EB] hover:text-[#06B6D4] transition-colors"
            >
              Use demo credentials
            </button>
            <div className="mt-3 pt-3 border-t border-white/[0.04]">
              <Link to="/register" className="text-sm text-[#8B8D98] hover:text-[#F0F2F5] transition-colors">
                Create a new account instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

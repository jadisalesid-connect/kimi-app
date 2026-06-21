import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Shield, Zap, Globe, Users, Cpu, MessageCircle, ChevronRight } from 'lucide-react';
import TelemetryLine from '@/components/TelemetryLine';
import gsap from 'gsap';

const TELEMETRY_DATA = [
  { label: 'ACTIVE_VENDORS', value: '2,847', color: 'text-[#2563EB]', delay: 0.5 },
  { label: 'OPPORTUNITIES', value: '$14.2M', color: 'text-[#06B6D4]', delay: 1.0 },
  { label: 'CONVERSION_RATE', value: '34.7%', color: 'text-[#10B981]', delay: 1.5 },
  { label: 'RESPONSE_TIME', value: '< 2min', color: 'text-[#F59E0B]', delay: 2.0 },
];

const FEATURES = [
  {
    icon: Users,
    title: 'Vetted Network',
    description: 'Every member is verified with corporate credentials. No spam, no noise — just qualified B2B professionals.',
  },
  {
    icon: Zap,
    title: 'Instant Messaging',
    description: 'Direct, encrypted text communication with any member. No intermediaries, no delayed email threads.',
  },
  {
    icon: Cpu,
    title: 'Product Discovery',
    description: 'Browse detailed product catalogs from tech and industrial vendors. Find exactly what your business needs.',
  },
  {
    icon: Shield,
    title: 'Secure Channels',
    description: 'End-to-end encrypted messaging ensures your negotiations and proposals remain confidential.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connect with professionals across North America, Europe, and Asia-Pacific time zones.',
  },
  {
    icon: MessageCircle,
    title: 'Smart Matching',
    description: 'Our algorithm suggests relevant contacts based on your industry, products, and engagement patterns.',
  },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title-line', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        ease: 'power2.out',
      });

      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.9,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            gsap.from(cards, {
              y: 30,
              opacity: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="hero-title-line">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#F0F2F5] tracking-tight leading-[1.1]">
                    The Ultimate
                  </h1>
                </div>
                <div className="hero-title-line">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
                      Sourcing
                    </span>
                  </h1>
                </div>
                <div className="hero-title-line">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#F0F2F5] tracking-tight leading-[1.1]">
                    Hub
                  </h1>
                </div>
              </div>

              <p className="hero-subtitle text-lg text-[#8B8D98] max-w-lg leading-relaxed">
                The professional networking and messaging platform built exclusively for
                B2B tech sales and industrial machinery professionals. Find vendors, close deals.
              </p>

              <div className="hero-cta flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link
                    to="/directory"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1d4ed8] transition-all hover:gap-3"
                  >
                    Browse Directory
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1d4ed8] transition-all hover:gap-3"
                    >
                      Join the Community
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/directory"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.15] text-[#F0F2F5] rounded-lg font-medium hover:bg-white/[0.05] hover:border-white/[0.25] transition-all"
                    >
                      Browse Directory
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </>
                )}
              </div>

              {/* Stats Row */}
              <div className="hero-cta grid grid-cols-4 gap-4 pt-6 border-t border-white/[0.08]">
                {[
                  { value: '2,800+', label: 'Members' },
                  { value: '150+', label: 'Companies' },
                  { value: '12K', label: 'Messages/wk' },
                  { value: '94%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-medium text-[#F0F2F5]">{stat.value}</div>
                    <div className="text-[10px] text-[#4B4D55] uppercase tracking-wider mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Telemetry Terminal */}
            <div className="hidden lg:block">
              <div className="relative bg-[#11121A] rounded-xl border border-white/[0.08] p-6 overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
                    <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                    <span className="h-3 w-3 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="ml-3 font-mono-data text-[10px] text-[#4B4D55] uppercase tracking-wider">
                    network_telemetry.exe
                  </span>
                </div>

                {/* Telemetry Lines */}
                <div className="space-y-4">
                  {TELEMETRY_DATA.map((item, i) => (
                    <TelemetryLine
                      key={i}
                      label={item.label}
                      value={item.value}
                      color={item.color}
                      delay={item.delay}
                    />
                  ))}
                </div>

                {/* Decorative Graph */}
                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <div className="flex items-end gap-1 h-24">
                    {Array.from({ length: 32 }).map((_, i) => {
                      const heights = [40, 55, 45, 70, 60, 80, 65, 90, 75, 85, 60, 70, 95, 80, 75, 85, 70, 90, 65, 80, 75, 85, 90, 70, 80, 75, 85, 90, 95, 80, 85, 90];
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-sm transition-all duration-500"
                          style={{
                            height: `${heights[i]}%`,
                            background: `linear-gradient(to top, #2563EB33, #06B6D433)`,
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-[#4B4D55] font-mono-data">00:00</span>
                    <span className="text-[10px] text-[#4B4D55] font-mono-data">REAL-TIME NETWORK ACTIVITY</span>
                    <span className="text-[10px] text-[#4B4D55] font-mono-data">23:59</span>
                  </div>
                </div>

                {/* Scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-normal text-[#F0F2F5] tracking-tight">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">B2B Sales Velocity</span>
            </h2>
            <p className="mt-4 text-[#8B8D98] max-w-2xl mx-auto">
              Every feature is designed to reduce friction in the sales cycle — from first contact to closed deal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="feature-card group p-5 rounded-xl bg-[#11121A] border border-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-4 group-hover:bg-[#2563EB]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <h3 className="text-[15px] font-medium text-[#F0F2F5] mb-2">{feature.title}</h3>
                  <p className="text-xs text-[#8B8D98] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-normal text-[#F0F2F5] tracking-tight mb-4">
            Ready to accelerate your sales pipeline?
          </h2>
          <p className="text-[#8B8D98] mb-8">
            Join 2,800+ B2B sales professionals already connecting and closing deals on SalesConnect.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1d4ed8] transition-all"
            >
              Create Your Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-8 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono-data text-xs tracking-[0.2em] text-[#4B4D55] uppercase">
            SALESCONNECT
          </span>
          <span className="text-xs text-[#4B4D55]">
            The B2B Networking &amp; Messaging Hub
          </span>
        </div>
      </footer>
    </div>
  );
}

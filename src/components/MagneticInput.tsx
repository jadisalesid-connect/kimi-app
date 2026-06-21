import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function MagneticInput({ label, className, ...props }: MagneticInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleMove = (e: MouseEvent) => {
      const rect = input.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = 100;

      if (distance < maxDist) {
        const strength = (maxDist - distance) / maxDist;
        offset.current = {
          x: (distX / distance) * strength * 8,
          y: (distY / distance) * strength * 8,
        };
      } else {
        offset.current = { x: 0, y: 0 };
      }

      gsap.to(input, {
        x: offset.current.x,
        y: offset.current.y,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      offset.current = { x: 0, y: 0 };
      gsap.to(input, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    window.addEventListener('mousemove', handleMove);
    input.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      input.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className="w-full">
      {label && (
        <label className="block font-mono-data text-xs text-[#4B4D55] uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        {...props}
        className={`w-full bg-transparent border-b border-[rgba(255,255,255,0.08)] py-3 text-[#F0F2F5] placeholder:text-[#4B4D55] focus:outline-none focus:border-[#2563EB] transition-colors ${className || ''}`}
      />
    </div>
  );
}

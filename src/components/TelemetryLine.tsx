import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TelemetryLineProps {
  label: string;
  value: string;
  color: string;
  delay: number;
}

export default function TelemetryLine({ label, value, color, delay }: TelemetryLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = lineRef.current;
    if (!container) return;

    container.innerHTML = '';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'font-mono-data text-xs text-[#4B4D55] mr-2';
    labelSpan.textContent = `${label}: `;
    container.appendChild(labelSpan);

    const valueSpan = document.createElement('span');
    valueSpan.className = `font-mono-data text-xs ${color}`;
    valueSpan.style.opacity = '0';
    valueSpan.textContent = value;
    container.appendChild(valueSpan);

    const cursor = document.createElement('span');
    cursor.className = 'inline-block w-2 h-3 ml-0.5 bg-current align-middle';
    container.appendChild(cursor);

    const tl = gsap.timeline({ delay });
    tl.to(cursor, { color: '#fff', duration: 0.5, repeat: 5, yoyo: true })
      .to(valueSpan, { opacity: 1, duration: 0.1 }, '-=0.1')
      .to(cursor, { opacity: 0, repeat: -1, yoyo: true, duration: 0.5 }, '+=0.5');

    return () => {
      tl.kill();
    };
  }, [label, value, color, delay]);

  return <div ref={lineRef} className="flex items-center" />;
}

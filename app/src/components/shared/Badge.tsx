import type { ReactNode } from 'react';

type Tone = 'neutral' | 'success' | 'info' | 'warning' | 'danger';

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-[#f3f3f5] text-[#364153] border-[#e5e7eb]',
  success: 'bg-[#f0fdf4] text-[#008236] border-[#b9f8cf]',
  info: 'bg-[#eff6ff] text-[#1447e6] border-[#bedbff]',
  warning: 'bg-[#fff7ed] text-[#ca3500] border-[#ffd6a8]',
  danger: 'bg-[#fef2f2] text-[#c10007] border-[#ffc9c9]',
};

export function Badge({ tone = 'neutral', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[12px] font-medium border ${toneClasses[tone]} ${className}`}>
      {children}
    </span>
  );
}

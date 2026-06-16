import type { ReactNode } from 'react';
import type { Tone } from '../types';
import { cn } from '../utils/cn';

export const toneTextClass: Record<Tone, string> = {
  positive: 'text-blue-600',
  negative: 'text-rose-500',
  neutral: 'text-slate-500',
  warning: 'text-amber-600',
  info: 'text-sky-600',
};

export const toneBadgeClass: Record<Tone, string> = {
  positive: 'bg-blue-50 text-blue-600 border-blue-100',
  negative: 'bg-rose-50 text-rose-500 border-rose-100',
  neutral: 'bg-slate-50 text-slate-600 border-slate-200',
  warning: 'bg-amber-50 text-amber-600 border-amber-100',
  info: 'bg-sky-50 text-sky-600 border-sky-100',
};

export function StatusBadge({ tone, children, className }: { tone: Tone; children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex rounded-full border px-3 py-1.5 text-xs font-black', toneBadgeClass[tone], className)}>{children}</span>;
}

export function HelpBadge() {
  return <span className="inline-flex size-[18px] items-center justify-center rounded-full border border-sky-200 bg-white text-xs font-black text-sky-500">?</span>;
}

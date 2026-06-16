import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export function ReportShell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto min-h-screen w-full max-w-[1065px] bg-white font-pretendard text-slate-950', className)}>{children}</div>;
}

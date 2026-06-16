import type { Tone } from '../types';
import { StatusBadge } from '../ui/Badges';

export function PanelHeader({ icon, title, subtitle, tone, status }: { icon: string; title: string; subtitle: string; tone: Tone; status: string }) {
  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-2xl">{icon}</span>
          <StatusBadge tone={tone}>{status}</StatusBadge>
        </div>
        <h2 className="text-[28px] font-black tracking-[-0.06em]">{title}</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
}

import type { ActionPathItem, DiagnosisData } from '../types';
import { StatusBadge } from '../ui/Badges';
import { ActionPathLinks } from './ActionPathLinks';

type StickySummaryBarProps = {
  data: DiagnosisData;
  onNavigate?: (item: ActionPathItem) => void;
};

export function StickySummaryBar({ data, onNavigate }: StickySummaryBarProps) {
  return (
    <div className="sticky top-[60px] z-40 border-b border-slate-200 bg-white/95 px-[30px] py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <StatusBadge tone="warning">요약 고정</StatusBadge>
            <span className="text-xs font-bold text-slate-500">{data.reportDate}</span>
          </div>
          <h2 className="truncate text-[15px] font-black tracking-[-0.05em] text-slate-950">{data.summary.title}</h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-xs font-black text-slate-500 sm:inline">우선 확인</span>
          <ActionPathLinks items={data.summary.actionPath} compact onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

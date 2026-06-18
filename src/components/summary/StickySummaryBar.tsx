import type { ActionPathItem, DiagnosisData, SummaryPoint, Tone } from '../types';
import { cn } from '../utils/cn';
import { StatusBadge } from '../ui/Badges';

type StickySummaryBarProps = {
  data: DiagnosisData;
  showPoints?: boolean;
  sticky?: boolean;
  className?: string;
  onNavigate?: (item: ActionPathItem) => void;
};

const pointToneClass: Record<Tone, string> = {
  positive: 'border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300',
  negative: 'border-rose-200 bg-rose-50 text-rose-600 hover:border-rose-300',
  warning: 'border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300',
  info: 'border-sky-100 bg-sky-50 text-sky-600 hover:border-sky-200',
  neutral: 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300',
};

function getPointTone(point: SummaryPoint): Tone {
  if (/하위|감소|하락|낮|미달|못|-/.test(point.change)) return 'negative';
  if (/\+|개선|회복|상승|증가/.test(point.change)) return 'positive';
  return point.tone;
}

function SummaryPointButton({ point, onNavigate }: { point: SummaryPoint; onNavigate?: (item: ActionPathItem) => void }) {
  const visualTone = getPointTone(point);

  return (
    <button
      type="button"
      title={`${point.basisLabel}${point.basisValue ? ` ${point.basisValue}` : ''}`}
      onClick={() =>
        onNavigate?.({
          id: point.id,
          label: point.label,
          targetId: point.targetId,
          targetTab: point.targetTab,
          description: point.change,
        })
      }
      className={cn('inline-flex h-8 min-w-[190px] shrink-0 items-center gap-2 rounded-full border px-3 text-left transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-sky-300', pointToneClass[visualTone])}
    >
      <span className="shrink-0 text-[11px] font-black opacity-80">{point.label}</span>
      <strong className="shrink-0 text-[13px] font-black leading-none">{point.value}</strong>
      <span className="truncate text-[11px] font-extrabold opacity-90">{point.change}</span>
    </button>
  );
}

export function StickySummaryBar({ data, showPoints = false, sticky = true, className, onNavigate }: StickySummaryBarProps) {
  return (
    <div className={cn(sticky && 'sticky top-[60px]', 'z-40 border-b border-slate-200 bg-white/95 px-[30px] py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur', className)}>
      <div className="flex items-center gap-3">
        <StatusBadge tone="warning">요약</StatusBadge>
        <span className="text-xs font-bold text-slate-500">{data.reportDate}</span>
        <h2 className="min-w-0 truncate text-[15px] font-black tracking-[-0.05em] text-slate-950">{data.summary.title}</h2>
      </div>
      {showPoints ? (
        <div className="mt-1.5 flex gap-2 overflow-x-auto px-0.5 py-1.5 scrollbar-hide">
          {data.summary.points.map((point) => (
            <SummaryPointButton key={point.id} point={point} onNavigate={onNavigate} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

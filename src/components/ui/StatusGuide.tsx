import type { DiagnosisStatus, Tone } from '../types';
import { cn } from '../utils/cn';
import { StatusBadge } from './Badges';

type StatusLevel = {
  label: DiagnosisStatus;
  tone: Tone;
  description: string;
};

const statusLevels: StatusLevel[] = [
  { label: '위험', tone: 'negative', description: '핵심 지표가 기준보다 크게 낮아 즉시 점검이 필요한 상태' },
  { label: '주의', tone: 'warning', description: '일부 핵심 지표가 낮거나 흐름이 불안정한 상태' },
  { label: '보통', tone: 'neutral', description: '주요 지표가 기준 수준에 가까운 상태' },
  { label: '양호', tone: 'positive', description: '주요 지표가 기준보다 좋은 상태' },
  { label: '우수', tone: 'info', description: '대부분 지표가 기준보다 뚜렷하게 좋은 상태' },
];

export function StatusGuide({ className }: { className?: string }) {
  return (
    <div className={cn('border-t border-slate-100 pt-4', className)}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-black tracking-[-0.03em] text-slate-900">상태 기준</h3>
          <p className="mt-1 text-xs font-bold leading-5 text-slate-500">상태는 낮은 단계부터 위험, 주의, 보통, 양호, 우수까지 표시됩니다.</p>
        </div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-5">
        {statusLevels.map((level) => (
          <div key={level.label} className="min-w-0">
            <StatusBadge tone={level.tone}>{level.label}</StatusBadge>
            <p className="mt-2 text-[11px] font-bold leading-4 text-slate-500">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { ChartPoint } from '../types';
import { cn } from '../utils/cn';

export function BarChart({
  series,
  variant = 'blue',
  height = 190,
}: {
  series: ChartPoint[];
  variant?: 'blue' | 'purple' | 'deepBlue';
  height?: number;
}) {
  const max = Math.max(...series.map((item) => item.value), 1);
  const gradient = {
    blue: 'from-sky-400 to-cyan-200',
    purple: 'from-violet-500 to-purple-300',
    deepBlue: 'from-blue-700 to-sky-500',
  }[variant];

  return (
    <div className="pt-3">
      <div
        className="flex items-end justify-around border-b-2 border-slate-400 bg-[repeating-linear-gradient(to_top,transparent_0_33px,#E2E7EF_34px,transparent_35px)] px-3"
        style={{ height }}
      >
        {series.map((item) => {
          const barHeight = Math.max((item.value / max) * (height - 34), 16);
          return (
            <div key={item.label} className="relative flex w-20 flex-col items-center text-center">
              <div className="absolute -top-7 whitespace-nowrap text-xs font-black text-slate-950">{item.displayValue}</div>
              <div className={cn('w-[72px] rounded-t-md bg-gradient-to-b', gradient)} style={{ height: barHeight }} />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-around px-3 text-[11px] font-bold text-slate-600">
        {series.map((item) => (
          <span key={item.label} className="w-20 text-center">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LineChart({ series, height = 210 }: { series: ChartPoint[]; height?: number }) {
  const width = 680;
  const max = Math.max(...series.map((item) => item.value), 1);
  const min = Math.min(...series.map((item) => item.value), 0);
  const range = Math.max(max - min, 0.0001);
  const padX = 60;
  const padY = 30;

  const points = series.map((item, index) => {
    const x = padX + (index * (width - padX * 2)) / Math.max(series.length - 1, 1);
    const y = padY + (1 - (item.value - min) / range) * (height - padY * 2);
    return { x, y, item };
  });

  return (
    <div>
      <div className="relative overflow-hidden border-b-2 border-slate-400 bg-[repeating-linear-gradient(to_top,transparent_0_39px,#E2E7EF_40px,transparent_41px)]" style={{ height }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <polyline points={points.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#1297F5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((point) => (
            <circle key={point.item.label} cx={point.x} cy={point.y} r="5" fill="white" stroke="#1297F5" strokeWidth="3" />
          ))}
        </svg>
        {points.map((point) => (
          <div
            key={point.item.label}
            className="absolute -translate-x-1/2 -translate-y-7 whitespace-nowrap text-xs font-black text-slate-950"
            style={{ left: `${(point.x / width) * 100}%`, top: `${point.y}px` }}
          >
            {point.item.displayValue}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-around text-[11px] font-bold text-slate-600">
        {series.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

export function ChartLegend({ first = '매출액', second = '증감률' }: { first?: string; second?: string }) {
  return (
    <div className="mt-3 flex justify-center gap-5 text-xs font-bold text-slate-500">
      <span className="before:mr-1.5 before:inline-block before:size-2.5 before:rounded-full before:bg-sky-400 before:align-[-1px]">{first}</span>
      <span className="before:mr-1.5 before:inline-block before:size-2.5 before:rounded-full before:bg-slate-500 before:align-[-1px]">{second}</span>
    </div>
  );
}

export function ScoreRing({ score = 72 }: { score?: number }) {
  return (
    <div
      className="mx-auto flex size-[162px] items-center justify-center rounded-full shadow-[inset_0_0_0_18px_#fff]"
      style={{ background: `conic-gradient(#1297F5 0 ${score}%, #EAF1F8 ${score}% 100%)` }}
    >
      <div className="text-[36px] font-black tracking-[-0.05em]">
        {score}
        <small className="text-sm font-black text-slate-500">/100</small>
      </div>
    </div>
  );
}

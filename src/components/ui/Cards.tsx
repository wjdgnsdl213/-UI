import type { StatItem } from '../types';
import { cn } from '../utils/cn';
import { toneTextClass } from './Badges';

export function MetricRow({ item, onClick }: { item: StatItem; onClick?: (targetId: string) => void }) {
  const valueClass = item.trend === 'down' ? 'text-rose-500' : item.trend === 'up' ? 'text-blue-600' : 'text-slate-700';
  const clickable = Boolean(item.targetId && onClick);

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => item.targetId && onClick?.(item.targetId)}
      className={cn('flex w-full items-center justify-between gap-4 border-b border-slate-100 py-3 text-left last:border-b-0', clickable && 'rounded-xl px-2 hover:bg-sky-50')}
    >
      <b className="text-sm font-extrabold text-slate-800">{item.label}</b>
      <span className={cn('text-right text-sm font-black', valueClass)}>{item.changeText ?? item.value}</span>
    </button>
  );
}

export function MetricCards({ metrics, columns = 3 }: { metrics: StatItem[]; columns?: 2 | 3 | 4 }) {
  const grid = columns === 4 ? 'lg:grid-cols-4' : columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  return (
    <div className={cn('grid gap-3', grid)}>
      {metrics.map((metric) => (
        <div id={metric.targetId} key={metric.id} className="anchor-target rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="text-sm font-extrabold text-slate-600">{metric.label}</div>
          <div className="mt-3 text-[32px] font-black leading-none tracking-[-0.06em] text-slate-950">
            {metric.value}
            {metric.unit ? <span className="ml-1 text-base font-black">{metric.unit}</span> : null}
          </div>
          {metric.changeText ? <div className={cn('mt-3 text-sm font-black', metric.tone ? toneTextClass[metric.tone] : 'text-slate-500')}>{metric.changeText}</div> : null}
          {metric.helperText ? <div className="mt-1 text-xs font-bold leading-5 text-slate-500">{metric.helperText}</div> : null}
          {metric.basisText ? <div className="mt-3 rounded-xl bg-white px-3 py-2 text-[11px] font-bold leading-4 text-slate-500">기준: {metric.basisText}</div> : null}
        </div>
      ))}
    </div>
  );
}

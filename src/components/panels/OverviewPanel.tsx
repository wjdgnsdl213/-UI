import { useState } from 'react';
import type { ActionPathItem, DiagnosisData, TabKey } from '../types';
import { BarChart, ChartLegend } from '../ui/Charts';
import { StatusBadge } from '../ui/Badges';
import { StatusGuide } from '../ui/StatusGuide';
import { cn } from '../utils/cn';

type OverviewPanelProps = {
  data: DiagnosisData;
  onShortcut?: (targetId: string, targetTab?: TabKey) => void;
};

export function OverviewPanel({ data, onShortcut }: OverviewPanelProps) {
  const [showTrend, setShowTrend] = useState(false);

  return (
    <div className="grid gap-4">
      <section className="diagnosis-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black tracking-[-0.05em]">진단 요약</h2>
            <p className="mt-1 text-xs font-bold text-slate-500">{data.summary.basisNote}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowTrend((value) => !value)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
          >
            {showTrend ? '매출 추이 접기' : '매출 추이 보기'}
          </button>
        </div>

        <div className="mt-3 grid gap-2 lg:grid-cols-4">
          {data.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onShortcut?.('tab-content', category.id)}
              className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-card focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <div className="flex items-center justify-between gap-2">
                <b className="text-base font-black tracking-[-0.04em]">{category.label}</b>
                <span className="flex size-9 items-center justify-center rounded-lg bg-sky-50 text-lg">{category.icon}</span>
              </div>
              <div className="mt-2">
                <StatusBadge tone={category.tone}>{category.status}</StatusBadge>
              </div>
              <p className="mt-2 line-clamp-2 min-h-[40px] text-sm font-extrabold leading-5 text-slate-700">{category.headline}</p>
            </button>
          ))}
        </div>

        <StatusGuide className="mt-4" />

        {showTrend ? (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-black tracking-[-0.04em]">매출 추이 · 최근 6개월</h3>
              <span className="text-xs font-black text-slate-500">단위: 백만원</span>
            </div>
            <BarChart series={data.salesSeries} height={160} />
            <ChartLegend first="매출액" second="증감률" />
          </div>
        ) : null}
      </section>
    </div>
  );
}

export function ActionList({ data, onNavigate }: { data: DiagnosisData; onNavigate?: (item: ActionPathItem) => void }) {
  return (
    <ol className="grid gap-2.5">
      {data.actions.map((action, index) => (
        <li key={action.id}>
          <button
            type="button"
            onClick={() =>
              onNavigate?.({
                id: action.id,
                label: action.title,
                targetId: action.targetId ?? 'summary',
                targetTab: action.targetTab,
                description: action.description,
              })
            }
            className="flex w-full gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-left transition hover:bg-sky-50"
          >
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-black text-white">{index + 1}</span>
            <div>
              <div className="text-sm font-extrabold leading-6 text-slate-800">{action.title}</div>
              {action.description ? <p className="mt-0.5 text-xs font-semibold leading-5 text-slate-500">{action.description}</p> : null}
            </div>
          </button>
        </li>
      ))}
    </ol>
  );
}

export function ShortcutGrid({ data, onShortcut }: { data: DiagnosisData; onShortcut?: (targetId: string, targetTab?: TabKey) => void }) {
  return (
    <div className="grid grid-cols-5 gap-2.5">
      {data.shortcuts.map((shortcut) => (
        <button key={shortcut.id} type="button" onClick={() => onShortcut?.(shortcut.targetId, shortcut.targetTab)} className={cn('rounded-2xl border border-slate-100 bg-white p-3 text-center transition hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-card')}>
          <span className="text-2xl">{shortcut.icon}</span>
          <b className="mt-2 block text-sm font-black">{shortcut.label}</b>
          <span className="text-xs font-bold text-slate-500">{shortcut.caption}</span>
        </button>
      ))}
    </div>
  );
}

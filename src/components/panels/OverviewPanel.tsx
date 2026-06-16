import type { ActionPathItem, DiagnosisData, TabKey } from '../types';
import { scrollToAnchor } from '../utils/scroll';
import { KpiCard, MetricRow } from '../ui/Cards';
import { BarChart, ChartLegend, ScoreRing } from '../ui/Charts';
import { StatusBadge } from '../ui/Badges';
import { ActionPathLinks } from '../summary/ActionPathLinks';
import { cn } from '../utils/cn';

type OverviewPanelProps = {
  data: DiagnosisData;
  onNavigate?: (item: ActionPathItem) => void;
  onShortcut?: (targetId: string, targetTab?: TabKey) => void;
};

export function OverviewPanel({ data, onNavigate, onShortcut }: OverviewPanelProps) {
  const handleKpiClick = (targetId: string) => {
    if (onShortcut) {
      onShortcut(targetId);
      return;
    }
    scrollToAnchor(targetId);
  };

  return (
    <div className="grid gap-5">
      <section className="grid gap-3 lg:grid-cols-4">
        {data.kpis.map((item) => (
          <KpiCard key={item.id} item={item} onClick={handleKpiClick} />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="diagnosis-card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-[-0.05em]">매출 추이</h2>
            <StatusBadge tone="info">최근 6개월</StatusBadge>
          </div>
          <BarChart series={data.salesSeries} height={185} />
          <ChartLegend first="매출액" second="증감률" />
        </div>
        <div className="diagnosis-card p-6">
          <h2 className="mb-4 text-lg font-black tracking-[-0.05em]">진단 기준</h2>
          <ScoreRing score={72} />
          <p className="mt-5 text-center text-sm font-bold leading-6 text-slate-600">전월 대비 회복 여부와 최근 6개월 평균 대비 수준을 분리해 판단합니다.</p>
        </div>
      </section>

      <section className="diagnosis-card p-6">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-black tracking-[-0.05em]">우선 확인</h2>
            <p className="mt-1 text-sm font-bold text-slate-500">각 항목을 누르면 해당 정보가 있는 위치로 이동합니다.</p>
          </div>
          <ActionPathLinks items={data.summary.actionPath} onNavigate={onNavigate} />
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-4">
        {data.categories.map((category) => (
          <article key={category.id} className="diagnosis-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <b className="text-base font-black tracking-[-0.05em]">{category.label}</b>
              <span className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-xl">{category.icon}</span>
            </div>
            <StatusBadge tone={category.tone}>{category.status}</StatusBadge>
            <p className="mt-3 line-clamp-3 text-sm font-bold leading-6 text-slate-600">{category.description}</p>
            <div className="mt-2">
              {category.metrics.slice(0, 2).map((item) => (
                <MetricRow key={item.id} item={item} onClick={(targetId) => onShortcut?.(targetId, category.id)} />
              ))}
            </div>
          </article>
        ))}
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
            className="flex w-full gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-left text-sm font-extrabold leading-6 text-slate-800 transition hover:bg-sky-50"
          >
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-black text-white">{index + 1}</span>
            <div>
              <div>{action.title}</div>
              {action.description ? <p className="mt-1 text-xs font-semibold text-slate-500">{action.description}</p> : null}
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

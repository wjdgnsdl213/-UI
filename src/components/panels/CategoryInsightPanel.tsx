import type { DiagnosisCategory, DiagnosisData } from '../types';
import { BarChart, ChartLegend } from '../ui/Charts';
import { MetricCards } from '../ui/Cards';
import { StatusBadge } from '../ui/Badges';

export function CategoryInsightPanel({ data, category }: { data: DiagnosisData; category: DiagnosisCategory }) {
  const chartConfig: Record<DiagnosisCategory['id'], { title: string; series: DiagnosisData['salesSeries']; variant: 'blue' | 'purple' | 'deepBlue'; legend: string }> = {
    competitiveness: { title: '매출 추이 · 최근 6개월', series: data.salesSeries, variant: 'blue', legend: '매출액' },
    survival: { title: '경쟁권 매출건수 흐름', series: data.visitSeries.map((p) => ({ ...p, value: p.value / 10 })), variant: 'deepBlue', legend: '매출건수' },
    growth: { title: '지역 전체업종 매출 · 최근 6개월', series: data.marketSalesSeries, variant: 'purple', legend: '지역 매출' },
    interest: { title: '결제건수 · 최근 6개월', series: data.visitSeries.map((p) => ({ ...p, value: p.value / 10 })), variant: 'blue', legend: '결제건수' },
  };
  const chart = chartConfig[category.id];

  return (
    <article className="diagnosis-card p-7">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-2xl">{category.icon}</span>
            <StatusBadge tone={category.tone}>{category.status}</StatusBadge>
          </div>
          <h2 className="text-[30px] font-black tracking-[-0.07em] text-slate-950">{category.label}</h2>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-600">{category.description}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-extrabold leading-6 text-slate-700 lg:max-w-[280px]">
          {category.headline}
        </div>
      </div>

      <MetricCards metrics={category.metrics} />

      <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-base font-black tracking-[-0.04em]">{chart.title}</h3>
          <span className="text-xs font-bold text-slate-500">상세 그래프</span>
        </div>
        <BarChart series={chart.series} variant={chart.variant} height={205} />
        <ChartLegend first={chart.legend} second="증감률" />
      </div>
    </article>
  );
}

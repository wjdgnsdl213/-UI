import { useState } from 'react';
import type { DiagnosisCategory, DiagnosisData, Tone, Trend } from '../types';
import { BarChart, ChartLegend } from '../ui/Charts';
import { toneTextClass } from '../ui/Badges';
import { cn } from '../utils/cn';

const metricSurfaceClass: Record<NonNullable<DiagnosisCategory['metrics'][number]['tone']>, string> = {
  positive: 'border-blue-200 bg-blue-50/70',
  negative: 'border-rose-200 bg-rose-50/70',
  warning: 'border-amber-200 bg-amber-50/70',
  info: 'border-sky-100 bg-sky-50/70',
  neutral: 'border-slate-200 bg-slate-50',
};

function getMetricTone(tone?: Tone, trend?: Trend): Tone {
  if (trend === 'up') return 'positive';
  if (trend === 'down') return 'negative';
  return tone ?? 'neutral';
}

export function CategoryInsightPanel({ data, category }: { data: DiagnosisData; category: DiagnosisCategory }) {
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(null);
  const chartConfig: Record<DiagnosisCategory['id'], { title: string; series: DiagnosisData['salesSeries']; variant: 'blue' | 'purple' | 'deepBlue'; legend: string; unit: string }> = {
    competitiveness: { title: '매출 추이 · 최근 6개월', series: data.salesSeries, variant: 'blue', legend: '매출액', unit: '백만원' },
    survival: { title: '경쟁권 매출건수 흐름 · 최근 6개월', series: data.visitSeries, variant: 'deepBlue', legend: '매출건수', unit: '건' },
    growth: { title: '지역 전체업종 매출 · 최근 6개월', series: data.marketSalesSeries, variant: 'purple', legend: '지역 매출', unit: '백만원' },
    interest: { title: '결제건수 · 최근 6개월', series: data.visitSeries, variant: 'blue', legend: '결제건수', unit: '건' },
  };
  const chart = chartConfig[category.id];
  const selectedMetric = category.metrics.find((metric) => metric.id === selectedMetricId) ?? null;

  return (
    <article className="diagnosis-card p-5">
      <h2 className="text-[24px] font-black tracking-[-0.05em] text-slate-950">{category.label}</h2>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {category.metrics.map((metric) => {
          const selected = metric.id === selectedMetricId;
          const visualTone = getMetricTone(metric.tone, metric.trend);
          const valueClass = toneTextClass[visualTone];
          const surfaceClass = metricSurfaceClass[visualTone];

          return (
            <button
              id={metric.targetId}
              key={metric.id}
              type="button"
              onClick={() => setSelectedMetricId(selected ? null : metric.id)}
              className={cn(
                'anchor-target grid min-h-[108px] grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-lg border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-sky-300',
                surfaceClass,
                selected && 'ring-2 ring-sky-300',
              )}
            >
              <span className="min-w-0">
                <span className="block text-xs font-extrabold text-slate-600">{metric.label}</span>
                <span className="mt-2 block text-[26px] font-black leading-none tracking-[-0.04em] text-slate-950">
                  {metric.value}
                  {metric.unit ? <span className="ml-1 text-sm font-black">{metric.unit}</span> : null}
                </span>
              </span>
              {metric.changeText ? <span className={cn('whitespace-nowrap rounded-full bg-white/80 px-2.5 py-1 text-right text-xs font-black shadow-sm', valueClass)}>{metric.changeText}</span> : null}
            </button>
          );
        })}
      </div>

      {selectedMetric ? (
        <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="text-sm font-black tracking-[-0.03em] text-slate-900">{selectedMetric.label} 근거</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{selectedMetric.helperText ?? category.description}</p>
            {selectedMetric.basisText ? <p className="mt-2 text-xs font-extrabold leading-5 text-slate-500">기준: {selectedMetric.basisText}</p> : null}
          </div>
          <div className="rounded-lg bg-white">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-black tracking-[-0.03em] text-slate-900">{chart.title}</h3>
              <span className="text-xs font-bold text-slate-500">단위: {chart.unit}</span>
            </div>
            <BarChart series={chart.series} variant={chart.variant} height={150} />
            <ChartLegend first={chart.legend} second="증감률" />
          </div>
        </div>
      ) : null}
    </article>
  );
}

import type { DiagnosisData, Tone } from '../types';
import { LineChart, ChartLegend } from '../ui/Charts';
import { toneTextClass } from '../ui/Badges';
import { PanelHeader } from './PanelHeader';
import { cn } from '../utils/cn';

export function MarketSalesPanel({ data }: { data: DiagnosisData }) {
  return (
    <article className="diagnosis-card p-7">
      <PanelHeader icon="💹" title="상권 매출현황" subtitle="내 가게 업종의 평균 매출과 내 가게 매출을 비교합니다." tone="info" status="매출 비교" />
      <div className="grid gap-3 lg:grid-cols-3">
        <SmallStat label="내 가게 매출" value="33백만원" change="전월 대비 +24.8%" tone="warning" />
        <SmallStat label="6개월 평균" value="39백만원" change="평균 대비 -15.0%" tone="warning" />
        <SmallStat label="업종 평균 매출" value="41백만원" change="전월 대비 +26.3%" tone="positive" />
      </div>
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-black tracking-[-0.03em] text-slate-900">지역 전체업종 매출 · 최근 6개월</h3>
          <span className="text-xs font-black text-slate-500">단위: 백만원</span>
        </div>
        <LineChart series={data.marketSalesSeries} height={230} />
        <ChartLegend first="평균매출액" second="내 가게 매출" />
      </div>
    </article>
  );
}

function SmallStat({ label, value, change, tone }: { label: string; value: string; change: string; tone: Tone }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <div className="text-sm font-extrabold text-slate-500">{label}</div>
      <div className="mt-3 text-2xl font-black tracking-[-0.05em]">{value}</div>
      <div className={cn('mt-2 text-sm font-black', toneTextClass[tone])}>{change}</div>
    </div>
  );
}

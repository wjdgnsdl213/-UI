import type { ActionPathItem, DiagnosisData, TabKey } from '../types';
import { mockDiagnosisData } from '../data/mockDiagnosisData';
import { scrollToAnchor } from '../utils/scroll';
import { ReportShell } from '../layout/ReportShell';
import { TopBar } from '../layout/TopBar';
import { SummaryHero } from '../summary/SummaryHero';
import { OverviewPanel, ActionList, ShortcutGrid } from '../panels/OverviewPanel';
import { BarChart, ChartLegend, ScoreRing } from '../ui/Charts';
import { MetricRow } from '../ui/Cards';
import { StatusBadge } from '../ui/Badges';
import { DiagnosisDetailSections } from './ReportSections';

export function DiagnosisDashboardPage({ data = mockDiagnosisData }: { data?: DiagnosisData }) {
  const navigate = (item: ActionPathItem) => scrollToAnchor(item.targetId);
  const shortcut = (targetId: string, _targetTab?: TabKey) => scrollToAnchor(targetId);

  return (
    <ReportShell>
      <TopBar />
      <SummaryHero data={data} rightLabel="대시보드형 · 한 화면 요약" onNavigate={navigate} />

      <main className="bg-slate-50 px-[30px] pb-9 pt-6">
        <OverviewPanel data={data} onNavigate={navigate} onShortcut={shortcut} />

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="diagnosis-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-black tracking-[-0.05em]">매출 추이</h2>
              <StatusBadge tone="info">최근 6개월</StatusBadge>
            </div>
            <BarChart series={data.salesSeries} />
            <ChartLegend first="매출액" second="증감률" />
          </div>

          <div className="diagnosis-card p-6">
            <h2 className="mb-4 text-lg font-black tracking-[-0.05em]">진단 스코어</h2>
            <ScoreRing score={72} />
            <div className="my-5 h-px bg-slate-100" />
            <div>
              {data.kpis.slice(0, 3).map((item) => (
                <MetricRow key={item.id} item={item} onClick={shortcut} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="diagnosis-card p-6">
            <h2 className="mb-4 text-lg font-black tracking-[-0.05em]">다음 액션</h2>
            <ActionList data={data} onNavigate={navigate} />
          </div>

          <div className="diagnosis-card p-6">
            <h2 className="mb-4 text-lg font-black tracking-[-0.05em]">바로가기</h2>
            <ShortcutGrid data={data} onShortcut={shortcut} />
          </div>
        </section>
      </main>

      <DiagnosisDetailSections data={data} compact />
    </ReportShell>
  );
}

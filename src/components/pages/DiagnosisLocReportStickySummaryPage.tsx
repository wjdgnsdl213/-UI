import type { ActionPathItem, DiagnosisData } from '../types';
import { mockDiagnosisData } from '../data/mockDiagnosisData';
import { scrollToAnchor, STICKY_SUMMARY_SCROLL_OFFSET } from '../utils/scroll';
import { cn } from '../utils/cn';
import { ReportShell } from '../layout/ReportShell';
import { TopBar } from '../layout/TopBar';
import { SummaryHero } from '../summary/SummaryHero';
import { StickySummaryBar } from '../summary/StickySummaryBar';
import { LocNav, MobileLocNav } from '../navigation/LocNav';
import { PriorityActionAside } from '../summary/PriorityActionAside';
import { BarChart, ChartLegend } from '../ui/Charts';
import { DiagnosisDetailSections } from './ReportSections';

export function DiagnosisLocReportStickySummaryPage({ data = mockDiagnosisData, className }: { data?: DiagnosisData; className?: string }) {
  const navigate = (item: ActionPathItem) => scrollToAnchor(item.targetId, STICKY_SUMMARY_SCROLL_OFFSET);

  return (
    <ReportShell className={cn('max-w-[1180px]', className)}>
      <TopBar />
      <StickySummaryBar data={data} />
      <MobileLocNav offset={STICKY_SUMMARY_SCROLL_OFFSET} />
      <div className="grid bg-slate-50 lg:grid-cols-[220px_1fr_280px]">
        <LocNav offset={STICKY_SUMMARY_SCROLL_OFFSET} />

        <main className="min-w-0">
          <section id="summary-section" className="bg-white">
            <SummaryHero data={data} rightLabel="LOC 요약 고정형" />
            <div className="px-[30px] pb-8">
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-black tracking-[-0.05em]">핵심 매출 추이 · 최근 6개월</h2>
                  <span className="text-xs font-black text-slate-500">단위: 백만원</span>
                </div>
                <BarChart series={data.salesSeries} />
                <ChartLegend first="매출액" second="증감률" />
              </div>
            </div>
          </section>

          <DiagnosisDetailSections data={data} />
        </main>

        <div className="hidden bg-white p-4 lg:block">
          <PriorityActionAside data={data} onNavigate={navigate} stickyTop={STICKY_SUMMARY_SCROLL_OFFSET} />
        </div>
      </div>
    </ReportShell>
  );
}

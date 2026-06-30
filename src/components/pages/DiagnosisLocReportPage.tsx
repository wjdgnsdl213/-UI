import type { DiagnosisData } from '../types';
import { mockDiagnosisData } from '../data/mockDiagnosisData';
import { cn } from '../utils/cn';
import { ReportShell } from '../layout/ReportShell';
import { TopBar } from '../layout/TopBar';
import { SummaryHero } from '../summary/SummaryHero';
import { LocNav, MobileLocNav } from '../navigation/LocNav';
import { BarChart, ChartLegend } from '../ui/Charts';
import { DiagnosisDetailSections } from './ReportSections';

export function DiagnosisLocReportPage({ data = mockDiagnosisData, className }: { data?: DiagnosisData; className?: string }) {
  return (
    <ReportShell className={cn('max-w-[1180px]', className)}>
      <TopBar />
      <MobileLocNav />
      <div className="grid bg-slate-50 lg:grid-cols-[220px_1fr]">
        <LocNav />

        <main className="min-w-0">
          <section id="summary-section" className="bg-white">
            <SummaryHero data={data} rightLabel="LOC 기본형 · 요약 비고정" />
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
      </div>
    </ReportShell>
  );
}

import { useState } from 'react';
import type { ActionPathItem, DiagnosisData, Tone } from '../types';
import { mockDiagnosisData } from '../data/mockDiagnosisData';
import { cn } from '../utils/cn';
import { scrollToAnchor } from '../utils/scroll';
import { ReportShell } from '../layout/ReportShell';
import { TopBar } from '../layout/TopBar';
import { SummaryHero } from '../summary/SummaryHero';
import { KpiCard } from '../ui/Cards';
import { StatusBadge } from '../ui/Badges';
import { CategoryInsightPanel } from '../panels/CategoryInsightPanel';
import { MarketSalesPanel } from '../panels/MarketSalesPanel';
import { PopularMenuPanel } from '../panels/PopularMenuPanel';
import { SnsKeywordPanel } from '../panels/SnsKeywordPanel';
import { CustomerProfilePanel } from '../panels/CustomerProfilePanel';

type SectionDef = {
  id: string;
  icon: string;
  label: string;
  status: string;
  tone: Tone;
  headline: string;
  renderContent: () => React.ReactElement;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={cn('shrink-0 text-slate-400 transition-transform duration-200', open && 'rotate-180')}
    >
      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DiagnosisAccordionPage({ data = mockDiagnosisData }: { data?: DiagnosisData }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const navigate = (item: ActionPathItem) => scrollToAnchor(item.targetId);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sections: SectionDef[] = [
    ...data.categories.map((cat) => ({
      id: cat.id,
      icon: cat.icon,
      label: cat.label,
      status: cat.status,
      tone: cat.tone,
      headline: cat.headline,
      renderContent: () => <CategoryInsightPanel data={data} category={cat} />,
    })),
    {
      id: 'market-sales',
      icon: '💹',
      label: '매출현황',
      status: '매출 비교',
      tone: 'info' as Tone,
      headline: '내 가게와 업종 평균 매출을 비교합니다.',
      renderContent: () => <MarketSalesPanel data={data} />,
    },
    {
      id: 'popular-menu-section',
      icon: '🍽️',
      label: '인기메뉴',
      status: '메뉴 분석',
      tone: 'neutral' as Tone,
      headline: '가장 많이 팔린 메뉴와 가격대를 확인합니다.',
      renderContent: () => <PopularMenuPanel data={data} />,
    },
    {
      id: 'sns-keyword-section',
      icon: '🔎',
      label: 'SNS 반응',
      status: '키워드 분석',
      tone: 'neutral' as Tone,
      headline: '고객이 자주 언급하는 SNS 키워드입니다.',
      renderContent: () => <SnsKeywordPanel data={data} />,
    },
    {
      id: 'customer-profile-section',
      icon: '🧑‍💼',
      label: '방문손님',
      status: '고객 분석',
      tone: 'neutral' as Tone,
      headline: '주요 방문 고객층과 시간대를 확인합니다.',
      renderContent: () => <CustomerProfilePanel data={data} />,
    },
  ];

  const allOpen = openIds.size === sections.length;

  return (
    <ReportShell>
      <TopBar />
      <SummaryHero data={data} rightLabel="아코디언형 · 선택 펼침" onNavigate={navigate} />

      <main className="bg-slate-50 px-[30px] pb-9 pt-6">
        <div className="mb-5 grid gap-3 lg:grid-cols-4">
          {data.kpis.map((item) => (
            <KpiCard key={item.id} item={item} onClick={(targetId) => scrollToAnchor(targetId)} />
          ))}
        </div>

        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-black text-slate-500">항목을 눌러 상세 내용을 펼칩니다.</p>
          <button
            type="button"
            onClick={() => setOpenIds(allOpen ? new Set() : new Set(sections.map((s) => s.id)))}
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-black text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
          >
            {allOpen ? '모두 접기' : '모두 펼치기'}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {sections.map((section) => {
            const isOpen = openIds.has(section.id);
            return (
              <div
                key={section.id}
                id={section.id}
                className={cn(
                  'anchor-target overflow-hidden rounded-2xl border bg-white transition-shadow',
                  isOpen ? 'border-sky-200 shadow-[0_4px_20px_rgba(18,151,245,0.10)]' : 'border-slate-200 shadow-card',
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(section.id)}
                  className="flex w-full items-center gap-4 px-6 py-4 text-left transition hover:bg-slate-50/70"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl">{section.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-black tracking-[-0.05em] text-slate-950">{section.label}</span>
                      <StatusBadge tone={section.tone}>{section.status}</StatusBadge>
                    </div>
                    <p className="mt-0.5 truncate text-sm font-semibold text-slate-500">{section.headline}</p>
                  </div>
                  <ChevronIcon open={isOpen} />
                </button>

                {isOpen ? (
                  <div className="border-t border-slate-100 p-3">
                    {section.renderContent()}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </main>
    </ReportShell>
  );
}

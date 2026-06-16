import { useMemo, useState } from 'react';
import type { ActionPathItem, DiagnosisData, TabKey } from '../types';
import { mockDiagnosisData } from '../data/mockDiagnosisData';
import { cn } from '../utils/cn';
import { scrollToAnchor } from '../utils/scroll';
import { ReportShell } from '../layout/ReportShell';
import { TopBar } from '../layout/TopBar';
import { SummaryHero } from '../summary/SummaryHero';
import { CategoryInsightPanel } from '../panels/CategoryInsightPanel';
import { MarketSalesPanel } from '../panels/MarketSalesPanel';
import { PopularMenuPanel } from '../panels/PopularMenuPanel';
import { SnsKeywordPanel } from '../panels/SnsKeywordPanel';
import { CustomerProfilePanel } from '../panels/CustomerProfilePanel';
import { OverviewPanel, ActionList } from '../panels/OverviewPanel';
import { ActionPathLinks } from '../summary/ActionPathLinks';

const tabOptions: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'overview', label: '요약', icon: '🤖' },
  { key: 'competitiveness', label: '경쟁력', icon: '📈' },
  { key: 'survival', label: '생존가능성', icon: '🌱' },
  { key: 'growth', label: '성장전망', icon: '📊' },
  { key: 'interest', label: '고객관심도', icon: '🧲' },
  { key: 'market', label: '매출현황', icon: '💹' },
  { key: 'menu', label: '인기메뉴', icon: '🍽️' },
  { key: 'sns', label: 'SNS', icon: '🔎' },
  { key: 'customer', label: '방문손님', icon: '🧑‍💼' },
];

export function DiagnosisTabbedHybridPage({ data = mockDiagnosisData }: { data?: DiagnosisData }) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const selectedCategory = useMemo(() => data.categories.find((category) => category.id === activeTab), [activeTab, data.categories]);

  const navigate = (item: ActionPathItem) => {
    if (item.targetTab) setActiveTab(item.targetTab);
    window.setTimeout(() => scrollToAnchor(item.targetId), 70);
  };

  const shortcut = (targetId: string, targetTab?: TabKey) => {
    if (targetTab) setActiveTab(targetTab);
    window.setTimeout(() => scrollToAnchor(targetId), 70);
  };

  return (
    <ReportShell className="max-w-[1180px]">
      <TopBar />
      <SummaryHero data={data} rightLabel="탭형 하이브리드" onNavigate={navigate} />

      <div className="sticky top-[60px] z-30 border-b border-slate-200 bg-white/95 px-[30px] py-3 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabOptions.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-black transition',
                activeTab === tab.key ? 'border-sky-300 bg-sky-50 text-sky-600 shadow-card' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="grid gap-5 bg-slate-50 px-[30px] py-6 lg:grid-cols-[1fr_280px]">
        <section id="tab-content" className="anchor-target min-w-0">
          {activeTab === 'overview' ? <OverviewPanel data={data} onNavigate={navigate} onShortcut={shortcut} /> : null}
          {selectedCategory ? <CategoryInsightPanel data={data} category={selectedCategory} /> : null}
          {activeTab === 'market' ? <MarketSalesPanel data={data} /> : null}
          {activeTab === 'menu' ? <PopularMenuPanel data={data} /> : null}
          {activeTab === 'sns' ? <SnsKeywordPanel data={data} /> : null}
          {activeTab === 'customer' ? <CustomerProfilePanel data={data} /> : null}
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-[132px] grid gap-4">
            <div className="diagnosis-card p-5">
              <h2 className="text-base font-black tracking-[-0.05em]">우선 확인</h2>
              <p className="mt-2 text-xs font-bold leading-5 text-slate-500">항목을 누르면 필요한 탭으로 이동합니다.</p>
              <div className="mt-3">
                <ActionPathLinks items={data.summary.actionPath} compact onNavigate={navigate} />
              </div>
            </div>
            <div className="diagnosis-card p-5">
              <h2 className="mb-4 text-base font-black tracking-[-0.05em]">다음 액션</h2>
              <ActionList data={data} onNavigate={navigate} />
            </div>
          </div>
        </aside>
      </main>
    </ReportShell>
  );
}

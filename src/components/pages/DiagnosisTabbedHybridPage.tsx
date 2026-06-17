import { useMemo, useState } from 'react';
import type { ActionPathItem, DiagnosisData, TabKey } from '../types';
import { mockDiagnosisData } from '../data/mockDiagnosisData';
import { cn } from '../utils/cn';
import { scrollToAnchor } from '../utils/scroll';
import { ReportShell } from '../layout/ReportShell';
import { TopBar } from '../layout/TopBar';
import { StickySummaryBar } from '../summary/StickySummaryBar';
import { CategoryInsightPanel } from '../panels/CategoryInsightPanel';
import { OverviewPanel } from '../panels/OverviewPanel';
import { PriorityActionAside } from '../summary/PriorityActionAside';

const tabOptions: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'overview', label: '요약', icon: '🤖' },
  { key: 'competitiveness', label: '경쟁력', icon: '📈' },
  { key: 'survival', label: '생존가능성', icon: '🌱' },
  { key: 'growth', label: '성장전망', icon: '📊' },
  { key: 'interest', label: '고객관심도', icon: '🧲' },
];

const visibleTabKeys = new Set<TabKey>(tabOptions.map((tab) => tab.key));
const TABBED_SCROLL_OFFSET = 220;

export function DiagnosisTabbedHybridPage({ data = mockDiagnosisData }: { data?: DiagnosisData }) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const selectedCategory = useMemo(() => data.categories.find((category) => category.id === activeTab), [activeTab, data.categories]);

  const setVisibleTab = (targetTab?: TabKey) => {
    if (targetTab && visibleTabKeys.has(targetTab)) setActiveTab(targetTab);
  };

  const navigate = (item: ActionPathItem) => {
    setVisibleTab(item.targetTab);
    window.setTimeout(() => scrollToAnchor(item.targetId, TABBED_SCROLL_OFFSET), 70);
  };

  const shortcut = (targetId: string, targetTab?: TabKey) => {
    setVisibleTab(targetTab);
    window.setTimeout(() => scrollToAnchor(targetId, TABBED_SCROLL_OFFSET), 70);
  };

  return (
    <ReportShell className="max-w-[1180px]">
      <TopBar />
      <div className="sticky top-[60px] z-40 overflow-visible bg-white/95 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur">
        <StickySummaryBar data={data} showPoints sticky={false} className="shadow-none" onNavigate={navigate} />
        <div className="border-b border-slate-200 px-[30px] py-2.5">
          <div className="flex gap-2 overflow-x-auto px-0.5 py-1 scrollbar-hide">
            {tabOptions.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-black transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-sky-300',
                  activeTab === tab.key ? 'border-sky-300 bg-sky-50 text-sky-600 shadow-card' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="grid gap-4 bg-slate-50 px-[30px] py-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <section id="tab-content" className="anchor-target min-w-0">
          {activeTab === 'overview' ? <OverviewPanel data={data} onShortcut={shortcut} /> : null}
          {selectedCategory ? <CategoryInsightPanel data={data} category={selectedCategory} /> : null}
        </section>

        <PriorityActionAside data={data} onNavigate={navigate} stickyTop={220} />
      </main>
    </ReportShell>
  );
}

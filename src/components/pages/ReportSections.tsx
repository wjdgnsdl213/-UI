import type { DiagnosisData } from '../types';
import { cn } from '../utils/cn';
import { CategoryInsightPanel } from '../panels/CategoryInsightPanel';
import { MarketSalesPanel } from '../panels/MarketSalesPanel';
import { PopularMenuPanel } from '../panels/PopularMenuPanel';
import { SnsKeywordPanel } from '../panels/SnsKeywordPanel';
import { CustomerProfilePanel } from '../panels/CustomerProfilePanel';

export function DiagnosisDetailSections({ data, compact = false }: { data: DiagnosisData; compact?: boolean }) {
  return (
    <>
      {data.categories.map((category, index) => (
        <section key={category.id} id={category.id} className={cn('anchor-target px-[30px]', compact ? 'py-5' : 'py-8', index % 2 === 0 ? 'bg-slate-50' : 'bg-white')}>
          <CategoryInsightPanel data={data} category={category} />
        </section>
      ))}

      <section id="market-sales" className={cn('anchor-target bg-slate-50 px-[30px]', compact ? 'py-5' : 'py-8')}>
        <MarketSalesPanel data={data} />
      </section>

      <section id="popular-menu-section" className={cn('bg-white px-[30px]', compact ? 'py-5' : 'py-8')}>
        <PopularMenuPanel data={data} />
      </section>

      <section id="sns-keyword-section" className={cn('bg-slate-50 px-[30px]', compact ? 'py-5' : 'py-8')}>
        <SnsKeywordPanel data={data} />
      </section>

      <section id="customer-profile-section" className={cn('bg-white px-[30px]', compact ? 'py-5' : 'py-8')}>
        <CustomerProfilePanel data={data} />
      </section>
    </>
  );
}

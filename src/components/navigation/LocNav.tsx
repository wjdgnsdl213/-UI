import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { cn } from '../utils/cn';
import { scrollToAnchor } from '../utils/scroll';
import { useActiveSection } from '../hooks/useActiveSection';

export interface LocItem {
  id: string;
  label: string;
  icon: string;
}

export const defaultLocItems: LocItem[] = [
  { id: 'summary', label: '종합', icon: '🤖' },
  { id: 'competitiveness', label: '경쟁력', icon: '📈' },
  { id: 'survival', label: '생존가능성', icon: '🌱' },
  { id: 'growth', label: '성장전망', icon: '📊' },
  { id: 'interest', label: '고객관심도', icon: '🧲' },
  { id: 'market-sales', label: '매출현황', icon: '💹' },
  { id: 'popular-menu', label: '인기메뉴', icon: '🍽️' },
  { id: 'sns-keyword', label: 'SNS 키워드', icon: '🔎' },
  { id: 'customer-profile', label: '방문 손님', icon: '🧑‍💼' },
];

export function LocNav({ items = defaultLocItems, offset = 104, footer }: { items?: LocItem[]; offset?: number; footer?: ReactNode }) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(sectionIds, offset);

  return (
    <aside className="hidden border-r border-slate-200 bg-white p-4 lg:sticky lg:top-[60px] lg:block lg:h-[calc(100vh-60px)] lg:overflow-y-auto">
      <div className="mb-3 text-xs font-black uppercase tracking-[0.08em] text-slate-400">LOC</div>
      <nav className="grid gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToAnchor(item.id, offset)}
            className={cn(
              'flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-extrabold text-slate-600 transition hover:bg-sky-50 hover:text-sky-600',
              activeId === item.id && 'bg-sky-50 text-sky-600',
            )}
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-white shadow-sm">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      {footer ?? (
        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="text-xs font-black text-slate-500">사용 팁</div>
          <p className="mt-3 text-xs font-bold leading-5 text-slate-500">목차 또는 우선 확인 항목을 누르면 해당 지표로 이동합니다.</p>
        </div>
      )}
    </aside>
  );
}

export function MobileLocNav({ items = defaultLocItems, offset = 104 }: { items?: LocItem[]; offset?: number }) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(sectionIds, offset);

  return (
    <div className="sticky top-[60px] z-30 border-b border-slate-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToAnchor(item.id, offset)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-black transition',
              activeId === item.id ? 'border-sky-200 bg-sky-50 text-sky-600' : 'border-slate-200 bg-white text-slate-600',
            )}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

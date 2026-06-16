import type { DiagnosisData } from '../types';
import { cn } from '../utils/cn';
import { PanelHeader } from './PanelHeader';

export function PopularMenuPanel({ data }: { data: DiagnosisData }) {
  return (
    <article id="popular-menu" className="diagnosis-card anchor-target p-7">
      <PanelHeader icon="🍽️" title="상권 인기 메뉴" subtitle="상권 내 유사 업종의 인기 메뉴와 평균 단가를 확인합니다." tone="info" status="메뉴 벤치마크" />
      <div className="mb-5 rounded-2xl bg-emerald-50 p-4 text-center text-sm font-extrabold leading-6 text-slate-700">
        <b className="text-emerald-600">돼지고기구이·갈비구이</b> 수요가 높습니다. 대표 메뉴, 세트 구성, 점심 메뉴에 활용해보세요.
      </div>
      <div className="flex items-end justify-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {data.menuItems.map((item) => (
          <div key={item.rank} className={cn('relative min-w-[142px] rounded-[24px] border border-slate-100 bg-white p-4 text-center shadow-card', item.highlight && 'min-w-[180px] scale-105 bg-slate-50')}>
            <div className={cn('absolute -top-4 left-4 flex size-9 items-center justify-center rounded-full text-sm font-black text-white', item.highlight ? 'bg-amber-500' : 'bg-slate-400')}>{item.rank}위</div>
            <div className="mt-5 text-5xl">{item.rank === 1 ? '🥩' : item.rank === 2 ? '🍖' : item.rank === 3 ? '🍲' : '🥘'}</div>
            <b className="mt-4 block text-lg font-black tracking-[-0.05em]">{item.name}</b>
            <span className="mt-2 block text-sm font-extrabold text-slate-500">평균단가 {item.price}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

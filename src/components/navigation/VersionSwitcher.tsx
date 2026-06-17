import { cn } from '../utils/cn';

export type LayoutKey = 'dashboard' | 'tabbed' | 'loc' | 'loc-sticky-summary' | 'accordion';

export const layoutOptions: Array<{ key: LayoutKey; label: string; description: string }> = [
  { key: 'dashboard', label: '1. 대시보드형', description: '핵심 정보 압축' },
  { key: 'tabbed', label: '2. 탭형 하이브리드', description: '요약 우선 + 선택 상세' },
  { key: 'loc', label: '3. LOC 기본형', description: '요약 비고정 + 목차 이동' },
  { key: 'loc-sticky-summary', label: '4. LOC 요약 고정형', description: '요약/우선 확인 고정' },
  { key: 'accordion', label: '5. 아코디언형', description: '전체 현황 스캔 + 선택 펼침' },
];

export function VersionSwitcher({ value, onChange }: { value: LayoutKey; onChange: (value: LayoutKey) => void }) {
  return (
    <div className="mx-auto mb-4 flex w-full max-w-[1180px] flex-wrap gap-2 px-4">
      {layoutOptions.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          className={cn(
            'rounded-2xl border px-4 py-3 text-left transition',
            value === option.key ? 'border-sky-500 bg-white text-sky-600 shadow-card' : 'border-white/60 bg-white/70 text-slate-600 hover:bg-white',
          )}
        >
          <b className="block text-sm font-black">{option.label}</b>
          <span className="text-xs font-bold">{option.description}</span>
        </button>
      ))}
    </div>
  );
}

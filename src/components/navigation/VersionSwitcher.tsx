import { cn } from '../utils/cn';

export type LayoutKey = 'tabbed' | 'loc' | 'loc-sticky-summary' | 'accordion';

export const layoutOptions: Array<{ key: LayoutKey; label: string; description: string }> = [
  { key: 'tabbed', label: '1. 탭형 하이브리드', description: '요약 우선 + 선택 상세' },
  { key: 'loc', label: '2. LOC 기본형', description: '요약 비고정 + 목차 이동' },
  { key: 'loc-sticky-summary', label: '3. LOC 요약 고정형', description: '요약/우선 확인 고정' },
  { key: 'accordion', label: '4. 아코디언형', description: '전체 현황 스캔 + 선택 펼침' },
];

export function VersionSwitcher({ value, onChange }: { value: LayoutKey; onChange: (value: LayoutKey) => void }) {
  return (
    <div className="mx-auto mb-2 flex w-full max-w-[1180px] flex-wrap gap-1.5 px-4">
      {layoutOptions.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          className={cn(
            'rounded-lg border px-3 py-2 text-left transition',
            value === option.key ? 'border-sky-500 bg-white text-sky-600 shadow-card' : 'border-white/60 bg-white/70 text-slate-600 hover:bg-white',
          )}
        >
          <b className="block text-xs font-black">{option.label}</b>
        </button>
      ))}
    </div>
  );
}

import type { ActionPathItem } from '../types';
import { cn } from '../utils/cn';
import { DEFAULT_SCROLL_OFFSET, scrollToAnchor } from '../utils/scroll';

type ActionPathLinksProps = {
  items: ActionPathItem[];
  compact?: boolean;
  offset?: number;
  onNavigate?: (item: ActionPathItem) => void;
};

export function ActionPathLinks({ items, compact = false, offset = DEFAULT_SCROLL_OFFSET, onNavigate }: ActionPathLinksProps) {
  const handleClick = (item: ActionPathItem) => {
    if (onNavigate) {
      onNavigate(item);
      return;
    }
    scrollToAnchor(item.targetId, offset);
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', compact ? 'text-xs' : 'text-[15px]')}>
      {items.map((item, index) => (
        <span key={item.id} className="inline-flex items-center gap-1.5">
          <button
            type="button"
            title={item.description}
            onClick={() => handleClick(item)}
            className={cn(
              'rounded-full border border-sky-100 bg-white font-black text-sky-600 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-sky-300',
              compact ? 'px-2.5 py-1.5' : 'px-3.5 py-2',
            )}
          >
            {item.label}
          </button>
          {index < items.length - 1 ? <span className="font-black text-slate-300">→</span> : null}
        </span>
      ))}
    </div>
  );
}

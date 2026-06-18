import type { DiagnosisData, SummaryPoint } from '../types';
import { cn } from '../utils/cn';
import { HelpBadge, toneBadgeClass } from '../ui/Badges';

type SummaryHeroProps = {
  data: DiagnosisData;
  rightLabel?: string;
};

function HighlightedTitle({ title }: { title: string }) {
  const parts = title.split(/(개선|회복|상승|높|주의|하락|감소|못 미칩니다|낮)/g);

  return (
    <>
      {parts.map((part, index) => {
        const key = `${part}-${index}`;
        if (['개선', '회복', '상승', '높'].some((word) => part.includes(word))) return <span key={key} className="text-blue-600">{part}</span>;
        if (['주의', '하락', '감소', '못 미칩니다', '낮'].some((word) => part.includes(word))) return <span key={key} className="text-rose-500">{part}</span>;
        return <span key={key}>{part}</span>;
      })}
    </>
  );
}

function SummaryPointChip({ point }: { point: SummaryPoint }) {
  return (
    <a href={`#${point.targetId}`} className={cn('inline-flex rounded-full border px-3 py-1.5 text-xs font-black transition hover:-translate-y-0.5 hover:shadow-card', toneBadgeClass[point.tone])}>
      {point.label} · {point.change}
    </a>
  );
}

export function SummaryHero({ data, rightLabel }: SummaryHeroProps) {
  return (
    <section id="summary" className="anchor-target bg-gradient-to-b from-white to-sky-50/50 px-[30px] py-7">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          {data.reportDate} <HelpBadge />
        </div>
        {rightLabel ? <div className="text-sm font-bold text-slate-600">{rightLabel}</div> : null}
      </div>

      <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-white to-sky-50 p-5 shadow-[0_12px_28px_rgba(18,151,245,0.08)]">
        <div className="grid items-center gap-5 lg:grid-cols-[76px_1fr]">
          <div className="mx-auto flex size-16 items-center justify-center rounded-[20px] bg-sky-100 text-3xl">🤖</div>
          <div>
            <h2 className="mb-2 text-[20px] font-black leading-snug tracking-[-0.055em]">
              <HighlightedTitle title={data.summary.title} />
            </h2>
            <p className="text-[14px] font-semibold leading-6 text-slate-700">{data.summary.description}</p>
            <p className="mt-2 text-xs font-bold leading-5 text-slate-500">{data.summary.basisNote}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.summary.points.map((point) => (
                <SummaryPointChip key={point.id} point={point} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

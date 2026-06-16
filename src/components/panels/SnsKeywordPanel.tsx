import type { DiagnosisData, SnsKeyword } from '../types';
import { cn } from '../utils/cn';
import { PanelHeader } from './PanelHeader';

export function SnsKeywordPanel({ data }: { data: DiagnosisData }) {
  return (
    <article id="sns-keyword" className="diagnosis-card anchor-target p-7">
      <PanelHeader icon="🔎" title="상권 인기 SNS 키워드" subtitle="상권에서 자주 언급되는 키워드로 홍보 방향을 잡습니다." tone="warning" status="키워드 분석" />
      <div className="mb-5 rounded-2xl bg-orange-50 p-4 text-center text-sm font-extrabold leading-6 text-slate-700">
        지역 키워드는 <b className="text-orange-600">역·맛집·예약</b>, 업종 키워드는 <b className="text-orange-600">요리·야채</b>가 강합니다.
      </div>
      <KeywordBubbleCloud keywords={data.snsKeywords} />
    </article>
  );
}

function KeywordBubbleCloud({ keywords }: { keywords: SnsKeyword[] }) {
  return (
    <div className="relative mx-auto h-[340px] max-w-[620px] rounded-[28px] border border-slate-100 bg-gradient-to-br from-slate-50 to-white">
      {keywords.map((keyword) => {
        const sizeClass = keyword.size === 'large' ? 'size-28 text-lg' : keyword.size === 'medium' ? 'size-20 text-base' : 'size-14 text-xs';
        const colorClass = keyword.tone === 'blue' ? 'bg-sky-500 text-white' : keyword.tone === 'orange' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700';
        return (
          <div key={`${keyword.label}-${keyword.value}`} className={cn('absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center font-black shadow-card', sizeClass, colorClass)} style={{ left: `${keyword.x}%`, top: `${keyword.y}%` }}>
            <span>{keyword.label}</span>
            <small className="mt-1 text-[10px] font-bold opacity-80">{keyword.value.toLocaleString()}</small>
          </div>
        );
      })}
    </div>
  );
}

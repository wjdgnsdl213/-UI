import type { DiagnosisData } from '../types';
import { PanelHeader } from './PanelHeader';

export function CustomerProfilePanel({ data }: { data: DiagnosisData }) {
  return (
    <article id="customer-profile" className="diagnosis-card anchor-target p-7">
      <PanelHeader icon="🧑‍💼" title="상권 방문 손님 유형" subtitle="주요 방문 고객 특성에 맞춰 운영 전략을 세웁니다." tone="info" status="고객 프로필" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {data.customerProfile.map((item) => (
          <div key={item.id} className="rounded-[22px] border border-slate-200 bg-white p-5 text-center shadow-card">
            <div className="text-4xl">{item.icon}</div>
            <b className="mt-4 block text-base font-black">{item.label}</b>
            <p className="mt-4 text-sm font-black leading-6 text-rose-500">{item.value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

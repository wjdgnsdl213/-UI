import type { ActionPathItem, DiagnosisData } from '../types';
import { ActionList } from '../panels/OverviewPanel';

type PriorityActionAsideProps = {
  data: DiagnosisData;
  onNavigate: (item: ActionPathItem) => void;
  stickyTop?: number;
};

export function PriorityActionAside({ data, onNavigate, stickyTop = 76 }: PriorityActionAsideProps) {
  return (
    <aside className="hidden h-full lg:block">
      <div className="sticky" style={{ top: stickyTop }}>
        <div className="diagnosis-card p-5">
          <h2 className="mb-4 text-base font-black tracking-[-0.05em]">다음 액션</h2>
          <ActionList data={data} onNavigate={onNavigate} />
        </div>
      </div>
    </aside>
  );
}

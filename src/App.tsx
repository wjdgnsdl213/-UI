import { useState } from 'react';
import { VersionSwitcher, type LayoutKey } from './components/navigation/VersionSwitcher';
import { DiagnosisTabbedHybridPage } from './components/pages/DiagnosisTabbedHybridPage';
import { DiagnosisLocReportPage } from './components/pages/DiagnosisLocReportPage';
import { DiagnosisLocReportStickySummaryPage } from './components/pages/DiagnosisLocReportStickySummaryPage';
import { DiagnosisAccordionPage } from './components/pages/DiagnosisAccordionPage';

export default function App() {
  const [activeLayout, setActiveLayout] = useState<LayoutKey>('tabbed');

  return (
    <div className="min-h-screen bg-diagnosis-bg py-2">
      <VersionSwitcher value={activeLayout} onChange={setActiveLayout} />
      {activeLayout === 'tabbed' ? <DiagnosisTabbedHybridPage /> : null}
      {activeLayout === 'loc' ? <DiagnosisLocReportPage /> : null}
      {activeLayout === 'loc-sticky-summary' ? <DiagnosisLocReportStickySummaryPage /> : null}
      {activeLayout === 'accordion' ? <DiagnosisAccordionPage /> : null}
    </div>
  );
}

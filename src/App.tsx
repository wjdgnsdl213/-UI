import { useState } from 'react';
import { VersionSwitcher, type LayoutKey } from './components/navigation/VersionSwitcher';
import { DiagnosisDashboardPage } from './components/pages/DiagnosisDashboardPage';
import { DiagnosisTabbedHybridPage } from './components/pages/DiagnosisTabbedHybridPage';
import { DiagnosisLocReportPage } from './components/pages/DiagnosisLocReportPage';
import { DiagnosisLocReportStickySummaryPage } from './components/pages/DiagnosisLocReportStickySummaryPage';
import { DiagnosisAccordionPage } from './components/pages/DiagnosisAccordionPage';

export default function App() {
  const [activeLayout, setActiveLayout] = useState<LayoutKey>('dashboard');

  return (
    <div className="min-h-screen bg-diagnosis-bg py-4">
      <VersionSwitcher value={activeLayout} onChange={setActiveLayout} />
      {activeLayout === 'dashboard' ? <DiagnosisDashboardPage /> : null}
      {activeLayout === 'tabbed' ? <DiagnosisTabbedHybridPage /> : null}
      {activeLayout === 'loc' ? <DiagnosisLocReportPage /> : null}
      {activeLayout === 'loc-sticky-summary' ? <DiagnosisLocReportStickySummaryPage /> : null}
      {activeLayout === 'accordion' ? <DiagnosisAccordionPage /> : null}
    </div>
  );
}

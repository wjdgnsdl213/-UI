export type Tone = 'positive' | 'negative' | 'neutral' | 'warning' | 'info';
export type Trend = 'up' | 'down' | 'flat';

export type TabKey =
  | 'overview'
  | 'competitiveness'
  | 'survival'
  | 'growth'
  | 'interest'
  | 'market'
  | 'menu'
  | 'sns'
  | 'customer';

export interface ActionPathItem {
  id: string;
  label: string;
  targetId: string;
  targetTab?: TabKey;
  description?: string;
}

export interface SummaryPoint {
  id: string;
  label: string;
  value: string;
  change: string;
  basisLabel: string;
  basisValue?: string;
  tone: Tone;
  targetId: string;
  targetTab?: TabKey;
}

export interface DiagnosisSummary {
  title: string;
  description: string;
  basisNote: string;
  points: SummaryPoint[];
  actionPath: ActionPathItem[];
}

export interface StatItem {
  id: string;
  targetId?: string;
  label: string;
  value: string;
  unit?: string;
  changeText?: string;
  trend?: Trend;
  tone?: Tone;
  helperText?: string;
  basisText?: string;
}

export interface ChartPoint {
  label: string;
  value: number;
  displayValue: string;
}

export interface DiagnosisCategory {
  id: 'competitiveness' | 'survival' | 'growth' | 'interest';
  label: string;
  icon: string;
  status: string;
  tone: Tone;
  headline: string;
  description: string;
  metrics: StatItem[];
}

export interface ActionItem {
  id: string;
  title: string;
  description?: string;
  targetId?: string;
  targetTab?: TabKey;
}

export interface ShortcutItem {
  id: string;
  icon: string;
  label: string;
  caption: string;
  targetId: string;
  targetTab?: TabKey;
}

export interface MarketMenuItem {
  rank: number;
  name: string;
  price: string;
  highlight?: boolean;
}

export interface SnsKeyword {
  label: string;
  value: number;
  tone: 'blue' | 'orange' | 'gray';
  size: 'small' | 'medium' | 'large';
  x: number;
  y: number;
}

export interface CustomerProfileItem {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export interface DiagnosisData {
  storeName: string;
  reportDate: string;
  summary: DiagnosisSummary;
  kpis: StatItem[];
  salesSeries: ChartPoint[];
  marketSalesSeries: ChartPoint[];
  shareSeries: ChartPoint[];
  visitSeries: ChartPoint[];
  categories: DiagnosisCategory[];
  actions: ActionItem[];
  shortcuts: ShortcutItem[];
  menuItems: MarketMenuItem[];
  snsKeywords: SnsKeyword[];
  customerProfile: CustomerProfileItem[];
}

export type Period = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface IncomeKPI {
  value: number;
  nextHorizon: { label: string; value: number };
  trendPct?: number;
  status: 1|2|3|4|5;
}

export interface CommittedKPI {
  actual: number;
  planned: number;
  trendPct?: number;
  status: 1|2|3|4|5;
}

export interface GoalsKPI {
  actual: number;
  target: number;
  trendPct?: number;
  status: 1|2|3|4|5;
}

export interface AvailableToSpend {
  value: number;
}

export interface ActivityItem {
  merchant: string;
  amount: number;
  occurredAt: string;
}

export interface BasicDashboardData {
  period: Period;
  orgName: string;
  available: AvailableToSpend;
  income: IncomeKPI;
  committed: CommittedKPI;
  goals: GoalsKPI;
  activity: ActivityItem[];
  lastBankSyncIso?: string;
}
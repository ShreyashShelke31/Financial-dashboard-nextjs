export type RangeKey = '3d' | '7d' | '10d' | '30d';

export interface DashboardData {
  range: RangeKey;
  updatedAt: string;
  cards: {
    aum: { value: number; mom: number; };
    sip: { value: number; mom: number; };
  };
  stats: {
    purchases: number;
    redemptions: number;
    rejected: number;
    sipRejections: number;
    newSip: number;
  };
  clients: Array<{ x: number; y: number; z: number; name: string; }>;
  sipBusiness: {
    categories: string[];
    bar: number[];
    line: number[];
  };
  monthlyMIS: {
    months: string[];
    equity: number[];
    debt: number[];
    hybrid: number[];
  };
}

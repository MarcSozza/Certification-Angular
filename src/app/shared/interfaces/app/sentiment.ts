export interface Sentiment {
  symbol: string;
  data: ChangeData[];
}

export interface ChangeData {
  month: number;
  change: number;
  MSPR: number;
}

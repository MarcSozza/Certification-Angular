/*
data
Array of sentiment data.

symbol
Symbol of the company.
*/
export interface InsiderSentiment {
  data: SentimentData[];
  symbol: string;
}

/*
change
Net buying/selling from all insiders' transactions.

month
Month.

mspr
Monthly share purchase ratio.

symbol
Symbol.

year
Year.
*/
export interface SentimentData {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}

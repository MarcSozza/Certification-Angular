import { Quote } from '../api/quote';
import { ResultQuery } from '../api/symbol-lookup';

export interface Company {
  quote: Quote;
  symbol: ResultQuery;
}

/*count
Number of results.

result
Array of search results.

*/

export interface SymbolLookup {
  count: number;
  result: ResultQuery[];
}

/*description
Symbol description

displaySymbol
Display symbol name.

symbol
Unique symbol used to identify this symbol used in /stock/candle endpoint.

type
Security type.*/
export interface ResultQuery {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

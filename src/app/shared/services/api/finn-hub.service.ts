import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsiderSentiment } from '../../interfaces/api/insider-sentiment';
import { Quote } from '../../interfaces/api/quote';
import { SymbolLookup } from '../../interfaces/api/symbol-lookup';

@Injectable()
export class FinnHubService {
  private API_KEY = 'bu4f8kn48v6uehqi3cqg';
  private URL = 'https://finnhub.io/api/v1';

  constructor(private readonly httpClient: HttpClient) {}

  private get searchQuoteUrl(): string {
    return `${this.URL}/quote`;
  }

  private get searchSymbolUrl(): string {
    return `${this.URL}/search`;
  }

  private get searchInsiderSentimentUrl(): string {
    return `${this.URL}/stock/insider-sentiment`;
  }

  private get paramAPI(): string {
    return `token=${this.API_KEY}`;
  }

  public getQuotes(symbol: string): Observable<Quote> {
    return this.httpClient.get<Quote>(
      `${this.searchQuoteUrl}?symbol=${symbol}&${this.paramAPI}`
    );
  }

  public getSymbole(query: string): Observable<SymbolLookup> {
    return this.httpClient.get<SymbolLookup>(
      `${this.searchSymbolUrl}?q=${query}&${this.paramAPI}`
    );
  }

  public getSentiment(
    query: string,
    dateMin: string,
    dateMax: string
  ): Observable<InsiderSentiment> {
    return this.httpClient.get<InsiderSentiment>(
      `${this.searchInsiderSentimentUrl}?symbol=${query}&from=${dateMin}&to=${dateMax}&${this.paramAPI}`
    );
  }
}

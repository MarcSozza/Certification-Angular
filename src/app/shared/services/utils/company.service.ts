import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  zip,
} from 'rxjs';
import { Quote } from '../../interfaces/api/quote';
import { ResultQuery, SymbolLookup } from '../../interfaces/api/symbol-lookup';
import { Company } from '../../interfaces/app/company';

import { FinnHubService } from '../api/finn-hub.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class CompanyService {
  private quoteS$ = new Subject<Quote>();
  private quote$ = this.quoteS$.asObservable();
  private symbolLookupS$ = new Subject<SymbolLookup>();
  private symbolLookup$ = this.symbolLookupS$.asObservable();

  private loadingS$ = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingS$.asObservable();

  public company: Observable<Company> = zip([
    this.quote$,
    this.symbolLookup$,
  ]).pipe(
    map(([quote, symbol]) => this.castToCompany(quote, symbol)),
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      this.loadingS$.next(false);
      return of({ quote: undefined, symbol: undefined } as Company);
    })
  );

  constructor(
    private readonly finnHubApi: FinnHubService,
    private readonly localStorage: LocalStorageService
  ) {}

  public getCompany(name: string): void {
    this.getQuotes(name);
    this.getSymbol(name);
    this.loadingS$.next(true);
  }

  private getQuotes(quote: string): void {
    this.finnHubApi
      .getQuotes(quote)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return of({} as Quote);
        })
      )
      .subscribe((data) => this.quoteS$.next(data));
  }

  private getSymbol(symbol: string): void {
    this.finnHubApi
      .getSymbole(symbol)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return of({} as SymbolLookup);
        })
      )
      .subscribe((data) => this.symbolLookupS$.next(data));
  }

  private getExactSymbol(result: ResultQuery[]): ResultQuery {
    return (
      result.find(
        (value) => value.displaySymbol === this.localStorage.getStock()
      ) || result[0]
    );
  }

  private castToCompany(quote: Quote, symbol: SymbolLookup): Company {
    if (symbol.count > 0) {
      this.loadingS$.next(false);
      return {
        quote,
        symbol: this.getExactSymbol(symbol.result),
      } as Company;
    } else {
      this.loadingS$.next(false);
      return { quote: undefined, symbol: undefined } as Company;
    }
  }
}

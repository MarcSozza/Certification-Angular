import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
} from 'rxjs';
import {
  InsiderSentiment,
  SentimentData,
} from '../../interfaces/api/insider-sentiment';
import { ChangeData, Sentiment } from '../../interfaces/app/sentiment';
import { FinnHubService } from '../api/finn-hub.service';

@Injectable({ providedIn: 'root' })
export class SentimentService {
  private insiderSentimentS$ = new Subject<InsiderSentiment>();
  public insiderSentiment$ = this.insiderSentimentS$.asObservable();

  public sentiment$: Observable<Sentiment> = this.insiderSentiment$.pipe(
    map((insideSentiments) => this.castToSentiments(insideSentiments)),
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      this.isLoading$.next(false);
      return of({} as Sentiment);
    })
  );

  private isLoading$ = new BehaviorSubject(false);
  public isLoading = this.isLoading$.asObservable();

  constructor(public datepipe: DatePipe, public finnService: FinnHubService) {}

  private get dateMax(): string {
    return this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  private get currentMonth(): number {
    return parseInt(this.datepipe.transform(Date.now(), 'MM'));
  }

  private get dateMin(): string {
    let dateMin = new Date(this.dateMax);
    dateMin.setMonth(dateMin.getMonth() - 3);
    return this.datepipe.transform(dateMin, 'yyyy-MM-dd');
  }

  private lastMonth(number: number): number {
    let dateMin = new Date(this.dateMax);
    dateMin.setMonth(dateMin.getMonth() - number);
    return parseInt(this.datepipe.transform(dateMin, 'MM'));
  }

  public getInsiderSentiment(query: string): void {
    this.isLoading$.next(true);
    this.finnService
      .getSentiment(query, this.dateMin, this.dateMax)
      .subscribe((value) => this.insiderSentimentS$.next(value));
  }

  public castToSentiments(insideSentiments: InsiderSentiment): Sentiment {
    let data: ChangeData[] = this.constructThreeMonthData(insideSentiments);
    this.isLoading$.next(false);
    return {
      symbol: insideSentiments.symbol,
      data,
    };
  }

  public constructThreeMonthData(
    insideSentiments: InsiderSentiment
  ): ChangeData[] {
    let data: ChangeData[] = [];

    let lastThreeMonth = [
      this.lastMonth(3),
      this.lastMonth(2),
      this.lastMonth(1),
    ];

    lastThreeMonth.forEach((month) => {
      data.push({
        MSPR: undefined,
        change: undefined,
        month: month,
      });
    });

    insideSentiments.data.forEach((insideSentiment) => {
      let pos = lastThreeMonth.indexOf(insideSentiment.month);
      data[pos] = {
        MSPR: insideSentiment.mspr,
        change: insideSentiment.change,
        month: insideSentiment.month,
      };
    });

    return data;
  }
}

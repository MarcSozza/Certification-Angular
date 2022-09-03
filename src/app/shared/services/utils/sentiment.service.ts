import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { InsiderSentiment } from '../../interfaces/api/insider-sentiment';
import { FinnHubService } from '../api/finn-hub.service';

@Injectable({ providedIn: 'root' })
export class SentimentService {
  private insiderSentimentS$ = new Subject<InsiderSentiment>();
  public insiderSentiment$ = this.insiderSentimentS$.asObservable();

  constructor(public datepipe: DatePipe, public finnService: FinnHubService) {}

  private get dateMax(): string {
    return this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  private get dateMin(): string {
    let dateMin = new Date(this.dateMax);
    dateMin.setMonth(dateMin.getMonth() - 2);
    return this.datepipe.transform(dateMin, 'yyyy-MM-dd');
  }

  public getInsiderSentiment(query: string): void {
    this.finnService
      .getSentiment(query, this.dateMin, this.dateMax)
      .subscribe((value) => this.insiderSentimentS$.next(value));
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Sentiment } from '../shared/interfaces/app/sentiment';
import { SentimentService } from '../shared/services/utils/sentiment.service';

@Component({
  selector: 'exo-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  public id: string;
  public sentiments: Observable<Sentiment[]>;
  constructor(
    private readonly sentimentService: SentimentService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.sentiments = this.sentimentService.insiderSentiment$.pipe(
      map((insideSentiments) => {
        let sentiments: Sentiment[] = [];
        insideSentiments.data.forEach((insideSentiment) => {
          sentiments.push({
            MSPR: insideSentiment.mspr,
            change: insideSentiment.change,
            month: insideSentiment.month,
            symbol: insideSentiment.symbol,
          });
        });
        return sentiments;
      })
    );
    this.sentimentService.getInsiderSentiment(this.id);
  }
}

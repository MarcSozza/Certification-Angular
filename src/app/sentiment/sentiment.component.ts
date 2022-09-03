import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { InsiderSentiment } from '../shared/interfaces/api/insider-sentiment';
import { Sentiment } from '../shared/interfaces/app/sentiment';
import { SentimentService } from '../shared/services/utils/sentiment.service';

@Component({
  selector: 'exo-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  public id: string;
  public sentiment: Observable<Sentiment>;
  constructor(
    private readonly sentimentService: SentimentService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.sentiment = this.sentimentService.sentiment$;
    this.sentimentService.getInsiderSentiment(this.id);
  }
}

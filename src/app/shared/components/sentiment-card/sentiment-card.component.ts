import { Component, Input, OnInit } from '@angular/core';
import { ChangeData } from '../../interfaces/app/sentiment';

@Component({
  selector: 'exo-sentiment-card',
  templateUrl: './sentiment-card.component.html',
  styleUrls: ['./sentiment-card.component.css'],
})
export class SentimentCardComponent implements OnInit {
  @Input() sentiment: ChangeData;

  constructor() {}

  ngOnInit() {}

  public get month(): number {
    return this.sentiment.month;
  }

  public get change(): number {
    return this.sentiment.change;
  }

  public get MSPR(): number {
    return this.sentiment.MSPR;
  }

  public isDefined() {
    return !!this.sentiment.MSPR && !!this.sentiment.change;
  }
}

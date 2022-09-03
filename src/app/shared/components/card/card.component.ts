import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../../interfaces/app/company';

@Component({
  selector: 'exo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() company: Company;
  @Output() delete = new EventEmitter<void>();
  @Output() redirection = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  public get currentPrice(): string {
    return `${this.company?.quote?.c || 0}`;
  }

  public get percentChange(): string {
    return `${this.company?.quote?.dp || 0}`;
  }

  public get highPriceOfChange(): string {
    return `${this.company?.quote?.h || 0}`;
  }

  public get openingPriceOfDay(): string {
    return `${this.company?.quote?.o || 0}`;
  }

  public get title(): string {
    return `${this.company?.symbol?.description} (${this.company?.symbol?.displaySymbol})`;
  }

  public get castPercentChange(): number {
    return this.company?.quote?.dp || 0;
  }

  public triggerDelete(): void {
    this.delete.emit();
  }

  public triggerRedirection(): void {
    this.redirection.emit(this.company?.symbol?.displaySymbol);
  }
}

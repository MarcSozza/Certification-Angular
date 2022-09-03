import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exo-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css'],
})
export class ChangeComponent implements OnInit {
  @Input() value: number;
  constructor() {}

  ngOnInit() {}

  isPositive(): boolean {
    return this.value >= 0;
  }
}

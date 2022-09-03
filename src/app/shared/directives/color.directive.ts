import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[color]',
})
export class ColorDirective implements OnInit {
  @Input() color: number;
  constructor() {}

  @HostBinding('class.green') private isGreen: boolean;
  @HostBinding('class.red') private isRed: boolean;

  ngOnInit() {
    if (this.isPositive()) {
      this.isGreen = true;
      this.isRed = false;
    } else {
      this.isGreen = false;
      this.isRed = true;
    }
  }

  public isPositive(): boolean {
    return this.color >= 0;
  }
}

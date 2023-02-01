import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss']
})
export class BalanceCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() count: number = 0;
}

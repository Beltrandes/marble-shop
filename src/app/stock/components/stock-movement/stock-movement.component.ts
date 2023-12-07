import { Component, Input } from '@angular/core';
import { StockEntriesMovement } from '../../models/StockEntriesMovement';
import { StockWithdrawMovement } from '../../models/StockWithdrawMovement';
@Component({
  selector: 'stock-movement',
  templateUrl: './stock-movement.component.html',
  styleUrls: ['./stock-movement.component.sass']
})
export class StockMovementComponent {

  @Input()
  stockWithdrawMovements: StockWithdrawMovement[] = []

  @Input()
  stockEntriesMovements: StockEntriesMovement[] = []
}

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Stock } from '../../models/Stock';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.sass']
})
export class StockListComponent {

  @Input()
  stocks: Stock[] = []

  @Output()
  withdraw = new EventEmitter(false)

  withdrawStockItem(stockItemId: string) {
    this.withdraw.emit(stockItemId)
  }


}

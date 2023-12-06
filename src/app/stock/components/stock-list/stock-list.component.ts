import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Stock } from '../../models/Stock';

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.sass']
})
export class StockListComponent {

  @Input()
  stocks: Stock[] = []

  @Output()
  addItem = new EventEmitter(false)

  @Output()
  removeItem = new EventEmitter(false)

  @Output()
  withdraw = new EventEmitter(false)

  withdrawStockItem(stockItemId: string) {
    this.withdraw.emit(stockItemId)
  }

  addStockItem(stock: Stock) {
    this.addItem.emit(stock)
  }

  removeStockItem(stockItemId: string) {
    this.removeItem.emit(stockItemId)
  }


}

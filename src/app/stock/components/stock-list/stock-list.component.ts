import { AddStockItemQuantity } from './../../models/AddStockItemQuantity';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Stock } from '../../models/Stock';
import { StockItem } from '../../models/StockItem';

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
  add = new EventEmitter(false)

  @Output()
  edit = new EventEmitter(false)

  @Output()
  removeItem = new EventEmitter(false)

  @Output()
  withdraw = new EventEmitter(false)

  toAdd: AddStockItemQuantity

  fastAddOpened = false

  activeItemIndex: number | null = null

  activeStockIndex: number | null = null

  quantity = 0

  constructor() {
    this.toAdd = {} as AddStockItemQuantity
  }

  withdrawStockItem(stockItemId: string) {
    this.withdraw.emit(stockItemId)
  }

  addStockItem(stock: Stock) {
    this.addItem.emit(stock)
  }

  removeStockItem(stockItemId: string) {
    this.removeItem.emit(stockItemId)
  }

  openFastAdd(i: number, b: number) {
    this.activeItemIndex = i
    this.activeStockIndex = b
    this.fastAddOpened = !this.fastAddOpened
  }


  increaseQuantity() {
    this.quantity++
  }

  decreaseQuantity() {
    this.quantity--
  }

  addQuantity(stockItemId: string, quantity: number) {
    this.toAdd.quantity = quantity
    this.toAdd.stockItemId = stockItemId
    this.fastAddOpened = false
    this.add.emit(this.toAdd)
  }

  editItem(stockItem: StockItem, stock: Stock) {
    stockItem.stock = stock
    this.edit.emit(stockItem)
    console.log('componente filho emitindo: ', stockItem)
  }
}

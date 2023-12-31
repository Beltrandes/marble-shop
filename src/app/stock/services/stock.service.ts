import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { Stock } from '../models/Stock';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/Employee';
import { WithdrawStockItemQuantity } from '../models/WithdrawStockItemQuantity';
import { StockItem } from '../models/StockItem';
import { StockWithdrawMovement } from '../models/StockWithdrawMovement';
import { AddStockItemQuantity } from '../models/AddStockItemQuantity';
import { StockEntriesMovement } from '../models/StockEntriesMovement';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly stockUrl = `${environment.apiUrl}/stock`

  private readonly employeeUrl = `${environment.apiUrl}/employee`


  private stockAddedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  listStocks() {
    return this.http.get<Stock[]>(this.stockUrl).pipe(first());
  }

  listEmployees() {
    return this.http.get<Employee[]>(this.employeeUrl).pipe(first())
  }

  listStockWithdrawMovements() {
    return this.http.get<StockWithdrawMovement[]>(`${this.stockUrl}/movements/withdraw`).pipe(first())
  }

  listStockEntriesMovements() {
    return this.http.get<StockEntriesMovement[]>(`${this.stockUrl}/movements/entries`).pipe(first())
  }

  stockAddedSuccess(): void {
    this.stockAddedSubject.next(true);
  }

  getStockAddedStatus(): BehaviorSubject<boolean> {
    return this.stockAddedSubject;
  }

  saveStock(record: Partial<Stock>) {
    if (record.id) {
      return this.updateStock(record)
    }

    return this.createStock(record)
  }

  private createStock(record: Partial<Stock>) {
    return this.http.post<Stock>(this.stockUrl, record).pipe(first())
  }

  private updateStock(record: Partial<Stock>) {
    return this.http.put<Stock>(`${this.stockUrl}/${record.id}`, record).pipe(first())
  }

  saveStockItem(record: Partial<StockItem>) {
    if (record.id) {
      return this.updateStockItem(record)
    }

    return this.createStockItem(record)
  }

  private createStockItem(record: Partial<StockItem>) {
    return this.http.post<StockItem>(`${this.stockUrl}/item`, record).pipe(first())
  }

  private updateStockItem(record: Partial<StockItem>) {
    return this.http.put<StockItem>(`${this.stockUrl}/item/edit/${record.id}`, record).pipe(first())
  }

  withdrawStockItemQuantity(record: WithdrawStockItemQuantity) {
    return this.http.put<WithdrawStockItemQuantity>(`${this.employeeUrl}/withdraw`, record).pipe(first())
  }

  deleteStockItem(stockItemId: string) {
    return this.http.delete<StockItem>(`${this.stockUrl}/item/${stockItemId}`)
  }

  addStockItemQuantity(record: AddStockItemQuantity) {
    return this.http.put<AddStockItemQuantity>(`${this.stockUrl}/add`, record).pipe(first())
  }
}

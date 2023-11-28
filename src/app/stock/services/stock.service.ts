import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { Stock } from '../models/Stock';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/Employee';
import { WithdrawStockItem } from '../models/WithdrawStockItem';

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

  stockAddedSuccess(): void {
    this.stockAddedSubject.next(true);
  }

  getStockAddedStatus(): BehaviorSubject<boolean> {
    return this.stockAddedSubject;
  }

  saveStock(record: Partial<Stock>) {
    if(record.id) {
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

  withdrawStockItem(record: WithdrawStockItem) {
    return this.http.put<WithdrawStockItem>(`${this.employeeUrl}/withdraw`, record).pipe(first())
  }
}

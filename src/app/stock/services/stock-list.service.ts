import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../models/Stock';
import { BehaviorSubject, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockListService {
  private readonly API = 'http://localhost:8080/api/stock';

  private stockAddedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) {}

  listStocks() {
    return this.http.get<Stock[]>(this.API).pipe(first());
  }

  stockAddedSuccess(): void {
    this.stockAddedSubject.next(true);
  }

  getStockAddedStatus(): BehaviorSubject<boolean> {
    return this.stockAddedSubject;
  }
}

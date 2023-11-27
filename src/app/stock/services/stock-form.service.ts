import { Injectable } from '@angular/core';
import { Stock } from '../models/Stock';
import { HttpClient } from '@angular/common/http';
import { Subject, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockFormService {

  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:8080/api/stock';

  save(record: Partial<Stock>) {
    if(record.id) {
      return this.update(record)
    }

    return this.create(record)
  }

  private create(record: Partial<Stock>) {
    return this.http.post<Stock>(this.API, record).pipe(first())
  }

  private update(record: Partial<Stock>) {
    return this.http.put<Stock>(`${this.API}/${record.id}`, record).pipe(first())
  }

}

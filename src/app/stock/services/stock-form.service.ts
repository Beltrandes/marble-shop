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



}

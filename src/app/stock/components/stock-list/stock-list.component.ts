import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Stock } from '../../models/Stock';
import { StockListService } from '../../services/stock-list.service';

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.sass']
})
export class StockListComponent implements OnInit, OnDestroy {

  stocks$!: Observable<Stock[]>

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private stockListService: StockListService) {}

  ngOnInit(): void {
    this.load()
    this.listenForStockUpdates()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  load() {
    this.stocks$ = this.stockListService.listStocks()
  }

  listenForStockUpdates() {
    this.stockListService
      .getStockAddedStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((added: boolean) => {
        if (added) {
          this.load()
        }
      })
  }
}

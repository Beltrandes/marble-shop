import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, finalize, takeUntil } from 'rxjs';
import { Stock } from '../../models/Stock';
import { StockService } from '../../services/stock.service';
import { Employee } from '../../models/Employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockWithdrawMovement } from '../../models/StockWithdrawMovement';
import { StockEntriesMovement } from '../../models/StockEntriesMovement';

declare let window: any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass'],
})
export class StockComponent implements OnInit, OnDestroy {
  headerTitle = '/Estoque';

  stocks$!: Observable<Stock[]>;

  employees$!: Observable<Employee[]>;

  stockWithdrawMovements$!: Observable<StockWithdrawMovement[]>

  stockEntriesMovements$!: Observable<StockEntriesMovement[]>

  headerIconName = 'boxes-stacked';

  withdrawForm: FormGroup;

  stockItemForm: FormGroup;

  withdrawModal: any;

  stockItemModal: any;

  btnText = 'Novo estoque';

  stockIdSelectedToWithdrawId = '';

  stockIdSelectedToAddItem = '';

  stockNameSelectedToAddItem = '';

  stockSelectedToAddItem!: Stock;

  selectedView = 'stocks'
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService,
    private formBuilder: FormBuilder
  ) {
    this.withdrawForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      stockItemId: [this.stockIdSelectedToWithdrawId],
      quantity: [0, Validators.min(1)],
    });

    this.stockItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: [''],
      quantity: [0, Validators.min(1)],
      stock: ['', Validators.required],
    });
  }

  onAddStock() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  @Output() withdrawStockItem: EventEmitter<void> = new EventEmitter<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.loadStocks();
    this.listenForStockUpdates();
    this.loadStockWithdrawMovements();
    this.loadStockEntriesMovements();
    let withdrawModal = document.getElementById('withdrawModal');
    this.withdrawModal = new window.bootstrap.Modal(withdrawModal);
    let stockItemModal = document.getElementById('stockItemModal');
    this.stockItemModal = new window.bootstrap.Modal(stockItemModal);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadStocks() {
    this.stocks$ = this.stockService.listStocks();
  }

  loadEmployees() {
    this.employees$ = this.stockService.listEmployees();
  }

  loadStockEntriesMovements() {
    this.stockEntriesMovements$ = this.stockService.listStockEntriesMovements()
  }

  loadStockWithdrawMovements() {
    this.stockWithdrawMovements$ = this.stockService.listStockWithdrawMovements()
  }

  listenForStockUpdates() {
    this.stockService
      .getStockAddedStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((added: boolean) => {
        if (added) {
          this.loadStocks();
        }
      });
  }

  openWithdrawModal(stockItemId: string) {
    this.loadEmployees();
    this.withdrawForm.patchValue({
      stockItemId: stockItemId,
    });
    this.withdrawModal.show();
  }

  withdraw() {
    if (this.withdrawForm.valid) {
      this.stockService
        .withdrawStockItemQuantity(this.withdrawForm.value)
        .pipe(
          finalize(() => {
            setTimeout(() => {
              this.loadStocks();
            }, 500);
            this.withdrawForm.reset();
          })
        )
        .subscribe({
          error: (err) => console.log(err),
        });
    }
  }

  onAddStockItem(stock: Stock) {
    this.stockItemForm.patchValue({
      stock: stock,
    });

    this.stockItemModal.show();

    this.stockIdSelectedToAddItem = stock.id;

    this.stockNameSelectedToAddItem = stock.name;
    console.log(this.stockItemForm.value);
  }

  addItem() {
    if (this.stockItemForm.valid) {
      this.stockService
        .saveStockItem(this.stockItemForm.value)
        .pipe(
          finalize(() => {
            setTimeout(() => {
              this.loadStocks();
            }, 500);
            this.stockItemForm.reset();
          })
        )
        .subscribe({
          error: (err) => console.log(err),
        });
    }
  }

  onRemoveItem(stockItemId: string) {
    this.stockService.deleteStockItem(stockItemId).subscribe({
      next: () => this.loadStocks(),
      error: (err) => console.log(err)
    })
  }

  switchView() {
    if (this.selectedView === 'stocks') {
      this.selectedView = 'movements'
    } else {
      this.selectedView = 'stocks'
    }
  }
}

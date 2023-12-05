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

  headerIconName = 'boxes-stacked';

  withdrawForm: FormGroup;

  addStockItemForm: FormGroup;

  withdrawModal: any;

  stockItemModal: any

  btnText = 'Novo estoque'

  stockISelectedToWithdrawId = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService,
    private formBuilder: FormBuilder
  ) {
    this.withdrawForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      stockItemId: [this.stockISelectedToWithdrawId],
      quantity: [0, Validators.min(1)],
    });

    this.addStockItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: [''],
      quantity: [0],
      stockId: ['', Validators.required]
    })
  }

  onAddStock() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  @Output() withdrawStockItem: EventEmitter<void> = new EventEmitter<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.loadStocks();
    this.listenForStockUpdates();
    let withdrawModal = document.getElementById('withdrawModal');
    this.withdrawModal = new window.bootstrap.Modal(withdrawModal);
    let stockItemModal = document.getElementById('stockItemModal')
    this.stockItemModal = new window.bootstrap.Modal(stockItemModal)
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
      this.stockService.withdrawStockItem(this.withdrawForm.value).pipe(
        finalize(() => {
          setTimeout(() => {
            this.loadStocks()
          },500)
          this.withdrawForm.reset()
        })
      ).subscribe({
        error: (err) => console.log(err)
      })
    }
  }

  onAddStockItem(stockId: string) {
    this.stockItemModal.show()
  }
}

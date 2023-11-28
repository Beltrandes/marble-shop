import { Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Stock } from '../../models/Stock';
import { StockService } from '../../services/stock.service';
import { Employee } from '../../models/Employee';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit, OnDestroy {

  headerTitle = '/Estoque'

  stocks$!: Observable<Stock[]>

  employees$!: Observable<Employee[]>

  headerIconName = 'boxes-stacked'

  withdrawForm: FormGroup

  stockISelectedToWithdrawId = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService,
    private renderer: Renderer2,
    private formBuilder: FormBuilder
    ) {
      this.withdrawForm = this.formBuilder.group({
        employeeId: [''],
        stockItemId: [this.stockISelectedToWithdrawId],
        quantity: [0]
      })
    }

  onAddStock() {
    this.router.navigate(['novo'], {relativeTo: this.route})
  }

  @Output() withdrawStockItem: EventEmitter<void> = new EventEmitter<void>()


  private unsubscribe$: Subject<void> = new Subject<void>()


  ngOnInit(): void {
    this.loadStocks()
    this.listenForStockUpdates()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  loadStocks() {
    this.stocks$ = this.stockService.listStocks()
  }

  loadEmployees() {
    this.employees$ = this.stockService.listEmployees()
  }

  listenForStockUpdates() {
    this.stockService
      .getStockAddedStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((added: boolean) => {
        if (added) {
          this.loadStocks()
        }
      })
  }

  openWithdrawModal(stockItemId: string) {
    this.loadEmployees()
    this.withdrawForm.patchValue({
      stockItemId: stockItemId
    })
    const withdrawModal = document.getElementById('withdrawModal')
    this.renderer.addClass(withdrawModal, 'show')
    this.renderer.setStyle(withdrawModal, 'display', 'block')
  }

  closeWithdrawModal() {
    const withdrawModal = document.getElementById('withdrawModal')
    this.renderer.setStyle(withdrawModal, 'display',  'none')
  }

  withdraw() {
    this.stockService.withdrawStockItem(this.withdrawForm.value).subscribe({
      next: () => console.log('deu certo'),
      error: (err) => console.log(err),
      complete: () => this.closeWithdrawModal()
    })
  }
}

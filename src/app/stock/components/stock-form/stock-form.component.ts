import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StockFormService } from '../../services/stock-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.sass']
})
export class StockFormComponent {

  stockForm: FormGroup



  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private stockFormService: StockFormService,
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.stockForm = this.formBuilder.group({
      id: [''],
      name: [''],
      items: [[]]
    })
  }

  closeForm() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onSubmit() {
    if (this.stockForm.value.name !== '') {
      this.stockService.saveStock(this.stockForm.value).subscribe({
        next: () => {
          this.stockService.stockAddedSuccess()
          this.closeForm()
        },
        error: (err) => console.log(err)
      })
    }
  }
}

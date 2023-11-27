import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent {

  headerTitle = '/Estoque'

  headerIconName = 'boxes-stacked'

  constructor(private router: Router, private route: ActivatedRoute) { }

  onAddStock() {
    this.router.navigate(['novo'], {relativeTo: this.route})
  }
}

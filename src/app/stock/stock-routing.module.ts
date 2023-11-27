import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './components/stock/stock.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';

const routes: Routes = [
  {path: '', component: StockComponent, children: [
    {path: 'novo', component: StockFormComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './components/stock/stock.component';
import { SharedModule } from '../shared/shared.module';
import { StockListComponent } from './components/stock-list/stock-list.component';

import { HttpClientModule } from '@angular/common/http';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StockComponent, StockListComponent, StockFormComponent],
  imports: [CommonModule, StockRoutingModule, SharedModule, HttpClientModule, ReactiveFormsModule],
})
export class StockModule {}

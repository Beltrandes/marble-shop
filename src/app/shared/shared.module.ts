import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';


@NgModule({
  declarations: [
    NavbarComponent,
    MainHeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent, MainHeaderComponent]
})
export class SharedModule { }

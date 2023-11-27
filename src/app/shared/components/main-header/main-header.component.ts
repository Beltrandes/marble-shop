import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.sass']
})
export class MainHeaderComponent {

  @Input()
  title = ''

  @Input()
  iconName = ''

  @Output() addStock: EventEmitter<void> = new EventEmitter<void>()


  constructor(private router: Router, private route: ActivatedRoute) {

  }


  onAdd(): void {
    this.addStock.emit();
  }
}

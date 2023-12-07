import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementComponent } from './stock-movement.component';

describe('StockMovementComponent', () => {
  let component: StockMovementComponent;
  let fixture: ComponentFixture<StockMovementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockMovementComponent]
    });
    fixture = TestBed.createComponent(StockMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

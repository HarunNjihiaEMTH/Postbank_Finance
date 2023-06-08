import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCostcenterAccLookupComponent } from './expense-costcenter-acc-lookup.component';

describe('ExpenseCostcenterAccLookupComponent', () => {
  let component: ExpenseCostcenterAccLookupComponent;
  let fixture: ComponentFixture<ExpenseCostcenterAccLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCostcenterAccLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCostcenterAccLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

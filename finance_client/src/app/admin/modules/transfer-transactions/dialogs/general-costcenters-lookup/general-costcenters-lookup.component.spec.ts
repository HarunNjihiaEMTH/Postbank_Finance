import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCostcentersLookupComponent } from './general-costcenters-lookup.component';

describe('GeneralCostcentersLookupComponent', () => {
  let component: GeneralCostcentersLookupComponent;
  let fixture: ComponentFixture<GeneralCostcentersLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralCostcentersLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralCostcentersLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

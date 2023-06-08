import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoBillDirectTransferComponent } from './po-bill-direct-transfer.component';

describe('PoBillDirectTransferComponent', () => {
  let component: PoBillDirectTransferComponent;
  let fixture: ComponentFixture<PoBillDirectTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoBillDirectTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoBillDirectTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

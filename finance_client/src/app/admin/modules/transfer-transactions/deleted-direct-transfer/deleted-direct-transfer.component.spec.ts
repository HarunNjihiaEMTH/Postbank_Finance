import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedDirectTransferComponent } from './deleted-direct-transfer.component';

describe('DeletedDirectTransferComponent', () => {
  let component: DeletedDirectTransferComponent;
  let fixture: ComponentFixture<DeletedDirectTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedDirectTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedDirectTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateStepComponent } from './modal-create-step.component';

describe('ModalCreateStepComponent', () => {
  let component: ModalCreateStepComponent;
  let fixture: ComponentFixture<ModalCreateStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

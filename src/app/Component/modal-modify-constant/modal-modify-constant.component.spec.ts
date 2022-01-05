import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifyConstantComponent } from './modal-modify-constant.component';

describe('ModalModifyConstantComponent', () => {
  let component: ModalModifyConstantComponent;
  let fixture: ComponentFixture<ModalModifyConstantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalModifyConstantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModifyConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

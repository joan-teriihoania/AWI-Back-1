import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateAllergenComponent } from './modal-create-allergen.component';

describe('ModalCreateAllergenComponent', () => {
  let component: ModalCreateAllergenComponent;
  let fixture: ComponentFixture<ModalCreateAllergenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateAllergenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateAllergenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

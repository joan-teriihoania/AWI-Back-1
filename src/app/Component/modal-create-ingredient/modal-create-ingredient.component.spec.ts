import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateIngredientComponent } from './modal-create-ingredient.component';

describe('ModalCreateIngredientComponent', () => {
  let component: ModalCreateIngredientComponent;
  let fixture: ComponentFixture<ModalCreateIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

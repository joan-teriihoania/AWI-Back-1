import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ERR404Component } from './err404.component';

describe('ERR404Component', () => {
  let component: ERR404Component;
  let fixture: ComponentFixture<ERR404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ERR404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ERR404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

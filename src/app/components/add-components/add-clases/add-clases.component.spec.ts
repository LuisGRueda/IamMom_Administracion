import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClasesComponent } from './add-clases.component';

describe('AddClasesComponent', () => {
  let component: AddClasesComponent;
  let fixture: ComponentFixture<AddClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

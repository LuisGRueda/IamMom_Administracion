import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroClasesComponent } from './registro-clases.component';

describe('RegistroClasesComponent', () => {
  let component: RegistroClasesComponent;
  let fixture: ComponentFixture<RegistroClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroClasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

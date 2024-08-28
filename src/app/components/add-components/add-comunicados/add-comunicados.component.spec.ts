import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComunicadosComponent } from './add-comunicados.component';

describe('AddComunicadosComponent', () => {
  let component: AddComunicadosComponent;
  let fixture: ComponentFixture<AddComunicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComunicadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

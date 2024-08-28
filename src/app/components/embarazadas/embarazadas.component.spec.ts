import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarazadasComponent } from './embarazadas.component';

describe('EmbarazadasComponent', () => {
  let component: EmbarazadasComponent;
  let fixture: ComponentFixture<EmbarazadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarazadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarazadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

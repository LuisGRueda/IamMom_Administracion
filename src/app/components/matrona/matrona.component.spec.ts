import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatronaComponent } from './matrona.component';

describe('MatronaComponent', () => {
  let component: MatronaComponent;
  let fixture: ComponentFixture<MatronaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatronaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

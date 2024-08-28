import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatronComponent } from './matron.component';

describe('MatronComponent', () => {
  let component: MatronComponent;
  let fixture: ComponentFixture<MatronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

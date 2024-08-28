import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatronaComponent } from './add-matrona.component';

describe('AddMatronaComponent', () => {
  let component: AddMatronaComponent;
  let fixture: ComponentFixture<AddMatronaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatronaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

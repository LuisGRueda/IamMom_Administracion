import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHijoComponent } from './add-hijo.component';

describe('AddHijoComponent', () => {
  let component: AddHijoComponent;
  let fixture: ComponentFixture<AddHijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHijoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

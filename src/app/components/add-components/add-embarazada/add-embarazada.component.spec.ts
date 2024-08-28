import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmbarazadaComponent } from './add-embarazada.component';

describe('AddEmbarazadaComponent', () => {
  let component: AddEmbarazadaComponent;
  let fixture: ComponentFixture<AddEmbarazadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmbarazadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmbarazadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

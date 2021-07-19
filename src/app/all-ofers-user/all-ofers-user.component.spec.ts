import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfersUserComponent } from './all-ofers-user.component';

describe('AllOfersUserComponent', () => {
  let component: AllOfersUserComponent;
  let fixture: ComponentFixture<AllOfersUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOfersUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOfersUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

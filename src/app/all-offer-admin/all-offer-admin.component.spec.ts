import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfferAdminComponent } from './all-offer-admin.component';

describe('AllOfferAdminComponent', () => {
  let component: AllOfferAdminComponent;
  let fixture: ComponentFixture<AllOfferAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOfferAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOfferAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedOfferEditComponent } from './banned-offer-edit.component';

describe('BannedOfferEditComponent', () => {
  let component: BannedOfferEditComponent;
  let fixture: ComponentFixture<BannedOfferEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannedOfferEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedOfferEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

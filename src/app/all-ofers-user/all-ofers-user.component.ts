import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-all-ofers-user',
  templateUrl: './all-ofers-user.component.html',
  styleUrls: ['./all-ofers-user.component.css']
})
export class AllOfersUserComponent implements OnInit {

  offers: any;

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(){
    this.offerService.getAllOffersUser().subscribe(result=>{
      this.offers=result;
    })
  }
}

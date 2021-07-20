import { Component, OnInit } from '@angular/core';
import { OfferService } from '../OfferService/offer.service';

@Component({
  selector: 'app-all-offer-admin',
  templateUrl: './all-offer-admin.component.html',
  styleUrls: ['./all-offer-admin.component.css']
})
export class AllOfferAdminComponent implements OnInit {

  allOffers: any;

  constructor(private service: OfferService) { }

  ngOnInit(): void {
    this.showAllOffer();
  }

  showAllOffer(){
    this.service.getAllOfferAdmin().subscribe(result =>
      {
        console.log(result);
        this.allOffers=result;
      }
      );
  }
}

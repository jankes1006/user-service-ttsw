import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../OfferService/offer.service';

@Component({
  selector: 'app-all-offer',
  templateUrl: './all-offer.component.html',
  styleUrls: ['./all-offer.component.css']
})
export class AllOfferComponent implements OnInit {

  constructor(private service: OfferService) { }

  allOffers: any; 

  ngOnInit(): void {
    this.showAllOffer();
  }

  showAllOffer(){
    this.service.getAllOffer().subscribe(result =>
      {
        console.log(result);
        this.allOffers=result;
      }
      );
  }
}

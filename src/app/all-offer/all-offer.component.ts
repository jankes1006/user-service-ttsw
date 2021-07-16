import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-all-offer',
  templateUrl: './all-offer.component.html',
  styleUrls: ['./all-offer.component.css']
})
export class AllOfferComponent implements OnInit {

  constructor(private service: OfferService) { }

  allOffers: any;
  ngOnInit(): void {
  }

  showAllOffer(){
    this.service.getAllOffer().subscribe(result =>
      {
      this.allOffers=result;
      console.log(this.allOffers);
      }
      );
  }
}

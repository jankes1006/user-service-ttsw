import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-details-offer',
  templateUrl: './details-offer.component.html',
  styleUrls: ['./details-offer.component.css']
})
export class DetailsOfferComponent implements OnInit {

  constructor(private offerService: OfferService,private route: ActivatedRoute) { }
  offer: any;

  ngOnInit(): void {
    const id=Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.getOffer(id);
  }

  getOffer(id: number){
    this.offerService.getOfferById(id).subscribe(result =>{ 
      this.offer = result;
    })
  }

  orderProduct(){
    console.warn("order new product");
  }

}

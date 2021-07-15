import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  constructor(private service: OfferService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any){
    data.userId=localStorage.getItem("id");
    this.service.createOffer(data,localStorage.getItem("username")!,localStorage.getItem("password")!)
  }
}

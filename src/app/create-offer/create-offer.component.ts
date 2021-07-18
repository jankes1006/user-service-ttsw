import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  @ViewChild('createOfferStatus') createOfferStatus?: ElementRef;

  constructor(private service: OfferService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any){
    this.service.createOffer(data)
    this.createOfferStatus!.nativeElement.innerHTML="Stworzono nową ofertę!";
  }
}

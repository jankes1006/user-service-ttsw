import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../OfferService/offer.service';

@Component({
  selector: 'app-details-offer',
  templateUrl: './details-offer.component.html',
  styleUrls: ['./details-offer.component.css']
})
export class DetailsOfferComponent implements OnInit {

  offer: any;
  id?: number;
  @ViewChild('reservedStatus') reservedStatus?: ElementRef;
  @ViewChild('orderButton') orderButton?: ElementRef;

  constructor(private offerService: OfferService,private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.getOffer(this.id);
  }

  getOffer(id: number){
    this.offerService.getOfferById(id).subscribe(result =>{ 
      this.offer = result;
      
      if(localStorage.getItem('username')==this.offer.ownerName){
        this.orderButton!.nativeElement.style.display="none";
      }else{
        this.orderButton!.nativeElement.style.display="block";
      }
    })
  }

  orderProduct(){
    this.orderButton!.nativeElement.disabled=true;
    this.reservedStatus!.nativeElement.innerHTML="Czekaj...";
    this.offerService.reservedOffer(this.id!).subscribe(result =>{
      if(result){
        this.reservedStatus!.nativeElement.innerHTML="Zarezerwowano oferte!";
      }else{
        this.reservedStatus!.nativeElement.innerHTML="Oferta jest już nie aktualna!";
      }
    },()=>{
      this.reservedStatus!.nativeElement.innerHTML="Błąd rezerwacji, spróbuj później.";
      this.orderButton!.nativeElement.disabled=false;
    })
  }

}

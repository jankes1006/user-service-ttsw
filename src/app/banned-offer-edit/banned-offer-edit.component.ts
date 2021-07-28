import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../OfferService/offer.service';

@Component({
  selector: 'app-banned-offer-edit',
  templateUrl: './banned-offer-edit.component.html',
  styleUrls: ['./banned-offer-edit.component.css']
})
export class BannedOfferEditComponent implements OnInit {

  offer: any;
  id?: number;
  blockUnBlockOffer = {"blockUnblockMessage":"","buttonText":""};
  numberOfNotification?: number;

  @ViewChild('reason') reason?: ElementRef;
  @ViewChild('workStatus') workStatus?: ElementRef;
  constructor(private offerService: OfferService,private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.getOffer(this.id);
    this.getNotification(this.id);
  }

  getOffer(id: number){
    this.offerService.getOfferById(id).subscribe(result =>{ 
      this.offer = result;
      this.setElementOnSite(this.offer.stateOffer);
    })
  }

  getNotification(id: number){
    this.offerService.numberOfNotificationOfferId(id).subscribe(result =>{
      this.numberOfNotification = Number(result);
    })
  }

  block(data: any){
    this.workStatus!.nativeElement.innerHTML="Czekaj...";
    data.id = this.id;

    if(this.blockUnBlockOffer.buttonText=="Aktywuj blokade"){

      this.offerService.setBanOnOffer(data).subscribe(result =>{
        this.offer=result;
        this.setElementOnSite(this.offer.stateOffer);
        this.workStatus!.nativeElement.innerHTML="";
      },()=>{
        this.workStatus!.nativeElement.innerHTML="Nieudana próba nałożenia blokady!";
      })

    }else{

      this.offerService.takeOfBanOffer(data).subscribe(result =>{
        this.offer=result;
        this.setElementOnSite(this.offer.stateOffer);
        this.workStatus!.nativeElement.innerHTML="";
      },()=>{
        this.workStatus!.nativeElement.innerHTML="Nieudana próba ściągnięcia blokady!";
      })

    }
  }

  setElementOnSite(stateOffer: String){
    if(stateOffer=="BANNED"){ 
      this.blockUnBlockOffer.blockUnblockMessage="Dezaktywacja blokady oferty";
      this.blockUnBlockOffer.buttonText="Dezaktywuj blokade";
      this.reason!.nativeElement.style.display="none";
    }else{
      this.blockUnBlockOffer.blockUnblockMessage="Aktywacja blokady oferty";
      this.blockUnBlockOffer.buttonText="Aktywuj blokade";
      this.reason!.nativeElement.style.display="block";
    }
  }
}
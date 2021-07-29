import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { OfferService } from '../OfferService/offer.service';
@Component({
  selector: 'app-details-offer',
  templateUrl: './details-offer.component.html',
  styleUrls: ['./details-offer.component.css']
})
export class DetailsOfferComponent implements OnInit {

  offer: any;
  id?: number;
  status:any;

  @ViewChild('reservedStatus') reservedStatus?: ElementRef;
  @ViewChild('orderButton') orderButton?: ElementRef;
  @ViewChild('notificationButton') notificationButton?: ElementRef;
  //image
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  visited?: number;

  constructor(private offerService: OfferService,private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.getOffer(this.id);
    this.getVisited(this.id);
  }

  getOffer(id: number){
    this.offerService.getOfferById(id).subscribe(result =>{ 
      this.offer = result;
      
      if(this.offer.image){
        this.getImage(this.offer.image);
      }

      if(localStorage.getItem('username')==this.offer.ownerName){
        this.orderButton!.nativeElement.style.display="none";
        this.notificationButton!.nativeElement.style.display="none";
      }else{
        this.offerService.isUserNotificationOffer(this.offer.id).subscribe(result=>{
          if(result==true){
            this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.NOTIFICATION_OFFER')
            this.orderButton!.nativeElement.style.display="none";
            this.notificationButton!.nativeElement.style.display="none";
          }else{
            this.orderButton!.nativeElement.style.display="block";
            this.notificationButton!.nativeElement.style.display="block";
          }
        })
      }
    })
  }

  orderProduct(){
    this.orderButton!.nativeElement.disabled=true;
    this.notificationButton!.nativeElement.disabled=true;
    this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.WAIT_ORDER');
    this.offerService.reservedOffer(this.id!).subscribe(result =>{
      if(result){
        this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.RESERVED_OFFER');
      }else{
        this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.OUT_OF_DATE_OFFER');
      }
    },()=>{
      this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.ERROR');
      this.orderButton!.nativeElement.disabled=false;
      this.notificationButton!.nativeElement.disabled=false;
    })
  }

  notification(){
    this.orderButton!.nativeElement.disabled=true;
    this.notificationButton!.nativeElement.disabled=true;
    this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.WAIT_ORDER');
    this.offerService.notificationOffer(this.offer.id).subscribe(result=>{
      this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.NOTIFICATION')
    })
  }

  getImage(id: number) {
    this.offerService.getImg(id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  getVisited(id: number){
    this.offerService.numberOfVisitedOfferId(id).subscribe(result =>{
      this.visited = Number(result);
    })
  }
}

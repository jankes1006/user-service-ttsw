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
  unregisteredUser?: string;

  @ViewChild('reservedStatus') reservedStatus?: ElementRef;
  @ViewChild('orderButton') orderButton?: ElementRef;
  @ViewChild('notificationButton') notificationButton?: ElementRef;
  @ViewChild('statistic') statistic?: ElementRef;
  //image
  retrievedImage = new Array(4);
  base64Data = new Array(4);
  retrieveResonse: any;

  visited?: number;

  constructor(private offerService: OfferService,private route: ActivatedRoute, private router: Router) { }
  

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.unregisteredUser=String(this.route.snapshot.paramMap.get('unregisteredUser'));
    this.getOffer(this.id);
    this.getVisited(this.id);
  }

  getOffer(id: number){
    this.offerService.getOfferById(id).subscribe(result =>{ 
      this.offer = result;
      
      
      this.getImages(this.id!);
    

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
            this.statistic!.nativeElement.style.display="none";
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

  getImages(id: number) {
    this.offerService.getImg(id)
      .subscribe(
        res => {
          console.warn(res);
          this.retrieveResonse = res;
          for( let i=0; i<4; i++){
            console.warn(this.retrieveResonse[i])
            this.base64Data[i] = this.retrieveResonse[i].picByte;
            this.retrievedImage[i] = 'data:image/jpeg;base64,' + this.base64Data[i];
          }
        }
      );
  }

  getVisited(id: number){
    this.offerService.numberOfVisitedOfferId(id).subscribe(result =>{
      this.visited = Number(result);
    })
  }

  loginUser(){
    this.router.navigate(['/login']);
  }
}

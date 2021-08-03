import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  visibleOrderButton: any;
  visibleNotificationButton: any;
  visibleStatistic: any;

  constructor(private offerService: OfferService,private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }
  

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.unregisteredUser=String(this.route.snapshot.paramMap.get('unregisteredUser'));
    this.getOffer(this.id);
    this.getVisited(this.id);
  }

  getOffer(id: number){
    this.offerService.getOfferById(id).subscribe(result =>{ 
      console.warn(result);
      this.offer = result;
      this.getImages(this.id!);
    
      if(localStorage.getItem('username')==this.offer.ownerName){
        this.visibleStatistic=1;
      }else{
        this.offerService.isUserNotificationOffer(this.offer.id).subscribe(result=>{
          if(result==true){
            this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.NOTIFICATION_OFFER')
          }else{
            this.visibleOrderButton=1;
            this.visibleNotificationButton = 1;
          }
        })
      }
    })
  }

  orderProduct(){
    this.orderButton!.nativeElement.disabled=true;
    this.notificationButton!.nativeElement.disabled=true;
    //this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.WAIT_ORDER');
    this.toastr.info("Czekaj, trwa rezerwowanie oferty","Rezerwacja oferty")
    this.offerService.reservedOffer(this.id!).subscribe(result =>{
      if(result){
        this.toastr.success("Udało się zarezerwować ofertę.","Rezerwacja oferty")
        //this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.RESERVED_OFFER');
      }else{
        this.toastr.warning("Podana oferta została przed chwilą zarezerwowana. Przepraszamy.","Rezerwacja oferty")
        //this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.OUT_OF_DATE_OFFER');
      }
    },()=>{
      this.toastr.error("Nie udało się zarezerwować oferty. Spróbuj później.","Rezerwacja oferty")
      //this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.ERROR');
      this.orderButton!.nativeElement.disabled=false;
      this.notificationButton!.nativeElement.disabled=false;
    })
  }

  notification(){
    this.orderButton!.nativeElement.disabled=true;
    this.notificationButton!.nativeElement.disabled=true;
    this.toastr.info("Czekaj, trwa zgłaszanie oferty do blokady","Zgłoszenie oferty do administratorów")
    //this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.WAIT_ORDER');
    this.offerService.notificationOffer(this.offer.id).subscribe(result=>{
     // this.status = AppComponent.trans.instant('OFFER_DETAILS_WARNING.NOTIFICATION')
      this.toastr.success("Pomyślnie zgłoszono ofertę.","Zgłoszenie oferty do administratorów")
    },error=>{
      this.toastr.error("Nie udana próba zgłoszenia oferty. Spróbuj później.","Zgłoszenie oferty do administratorów")
    })
  }

  getImages(id: number) {
    this.offerService.getImg(id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          let numberImages = 0;

          for(let i=0; i<4; i++){
            if(this.retrieveResonse[i]) numberImages++;
            else break;
          }

          for( let i=0; i<numberImages; i++){
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

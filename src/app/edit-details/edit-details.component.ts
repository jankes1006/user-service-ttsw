import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../OfferService/offer.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  offer: any;
  id?: number;

  @ViewChild('activityButton') activityButton?: ElementRef;
  @ViewChild('offerStatus') offerStatus?: ElementRef;
  @ViewChild('editOfferStatus') editOfferStatus?: ElementRef;
  @ViewChild('title') title?: ElementRef;
  @ViewChild('description') description?: ElementRef;
  @ViewChild('price') price?: ElementRef;
  
  constructor(private offerService: OfferService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.getOffer(this.id);
  }

  setItemsOnSite(){
    this.title!.nativeElement.value=this.offer.title;
      this.description!.nativeElement.value=this.offer.description;
      this.price!.nativeElement.value=this.offer.price;
      
      console.warn(this.offer.stateOffer);
      switch(this.offer.stateOffer){
        case "ACTIVE":
          this.offerStatus!.nativeElement.innerHTML="Aktywna";
          this.activityButton!.nativeElement.style.display="block";
          break;
        case "NO_ACTIVE":
          this.offerStatus!.nativeElement.innerHTML="Nie aktywna";
          this.activityButton!.nativeElement.style.display="block";
          break;
        case "BAN":
          this.offerStatus!.nativeElement.innerHTML="Zawieszona przez administratora.";
          this.activityButton!.nativeElement.style.display="none";
          break;
      }
    }

  getOffer(id: number){
    this.offerService.getOfferById(id).subscribe(result =>{ 
      this.offer = result;
      if(this.offer.ownerName!=localStorage.getItem('username')){
        this.router.navigateByUrl("/showAllOffer");
      }
      this.setItemsOnSite();
    })
  }

  onSubmit(data: any){
    this.editOfferStatus!.nativeElement.innerHTML="Czekaj...";

    if(data.title=="") data.title=this.offer.title;
    if(data.description=="") data.description=this.offer.description;
    if(data.price=="") data.price=this.offer.price;

    data.ownerName = this.offer.ownerName;
    data.id = this.offer.id;

    this.offerService.updateOffer(data).subscribe(result=>{
      this.editOfferStatus!.nativeElement.innerHTML="Edycja zakończona sukcesem!";
    },()=>{
      this.editOfferStatus!.nativeElement.innerHTML="Edycja zakończona niepowodzeniem!";
    })
    
  }

  editActivity(){
    this.offerService.changeActivityOffer(this.id!).subscribe(result=>{
      this.offer = result;
      
      switch(this.offer.stateOffer){
        case "ACTIVE":
          this.offerStatus!.nativeElement.innerHTML="Aktywna";
          this.activityButton!.nativeElement.style.display="block";
          break;
        case "NO_ACTIVE":
          this.offerStatus!.nativeElement.innerHTML="Nie aktywna";
          this.activityButton!.nativeElement.style.display="block";
          break;
      }
    })
  }
}

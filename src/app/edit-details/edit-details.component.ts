import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { OfferService } from '../OfferService/offer.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  offer: any;
  id?: number;
  statusEdit: any;
  statusActivity: any;
  @ViewChild('activityButton') activityButton?: ElementRef;
  @ViewChild('offerStatus') offerStatus?: ElementRef;
  @ViewChild('editOfferStatus') editOfferStatus?: ElementRef;
  @ViewChild('editButton') editButton?: ElementRef;
  
  editOffer: FormGroup

  constructor(private offerService: OfferService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
    
    this.editOffer = this.formBuilder.group({
      title: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl('',[Validators.required, Validators.minLength(15), Validators.maxLength(400)]),
      price: new FormControl('',[Validators.required]),
    })
    
  }

  get title(){return this.editOffer.get('title')}
  get description(){return this.editOffer.get('description')}
  get price(){return this.editOffer.get('price')}


  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.getOffer(this.id);
  }

  setItemsOnSite(){
    this.editOffer.get('title')?.setValue(this.offer.title);
    this.editOffer.get('description')?.setValue(this.offer.description);
    this.editOffer.get('price')?.setValue(this.offer.price);

      switch(this.offer.stateOffer){
        case "ACTIVE":
          this.statusActivity = AppComponent.trans.instant('EDIT_OFFER_WARNING.OFFER_ACTIVE')
          //this.offerStatus!.nativeElement.innerHTML="Aktywna";
          this.activityButton!.nativeElement.style.display="block";
          break;
        case "NO_ACTIVE":
          this.statusActivity = AppComponent.trans.instant('EDIT_OFFER_WARNING.OFFER_NO_ACTIVE')
          //this.offerStatus!.nativeElement.innerHTML="Nie aktywna";
          this.activityButton!.nativeElement.style.display="block";
          break;
        case "BANNED":
          this.statusActivity = AppComponent.trans.instant('EDIT_OFFER_WARNING.OFFER_BAN')
          //this.offerStatus!.nativeElement.innerHTML="Zawieszona przez administratora.";
          this.activityButton!.nativeElement.style.display="none";
          this.editButton!.nativeElement.style.display="none";
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
    this.editButton!.nativeElement.disabled=true;
    this.editOfferStatus!.nativeElement.innerHTML="Czekaj...";

    data.stateOffer = this.offer.stateOffer;
    data.category = this.offer.category;
    data.createDate = this.offer.createDate;
    data.image = this.offer.image
    data.ownerName = this.offer.ownerName;
    data.id = this.offer.id;

    this.offerService.updateOffer(data).subscribe(result=>{
      this.editButton!.nativeElement.disabled=false;
      this.editOfferStatus!.nativeElement.innerHTML="Edycja zakończona sukcesem!";
      this.router.navigate(['/detailOffer/'+data.id]);
    },()=>{
      this.editButton!.nativeElement.disabled=false;
      this.editOfferStatus!.nativeElement.innerHTML="Edycja zakończona niepowodzeniem!";
    })
    
  }

  editActivity(){
    this.offerService.changeActivityOffer(this.id!).subscribe(result=>{
      this.offer = result;
      
      switch(this.offer.stateOffer){
        case "ACTIVE":
          //this.offerStatus!.nativeElement.innerHTML="Aktywna";
          this.statusActivity = AppComponent.trans.instant('EDIT_OFFER_WARNING.OFFER_ACTIVE')
          this.activityButton!.nativeElement.style.display="block";
          break;
        case "NO_ACTIVE":
          //this.offerStatus!.nativeElement.innerHTML="Nie aktywna";
          this.statusActivity = AppComponent.trans.instant('EDIT_OFFER_WARNING.OFFER_NO_ACTIVE')
          this.activityButton!.nativeElement.style.display="block";
          break;
        case " BANNED":
          this.statusActivity = AppComponent.trans.instant('EDIT_OFFER_WARNING.BAN')
          //this.offerStatus!.nativeElement.innerHTML="Nie aktywna";
          this.activityButton!.nativeElement.style.display="none";
      }
    })
  }
}

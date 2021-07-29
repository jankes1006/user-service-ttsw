import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CategoryService} from '../category-service/category-service.service';
import { OfferAndImage } from '../OfferAndImage';
import { OfferService } from '../OfferService/offer.service';

class ImageAndOffer{
  idOffer: number;
  idImage: number;

  constructor(idOffer:number, idImage: number){
    this.idImage = idImage;
    this.idOffer = idOffer;
  }
}

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  @ViewChild('createOfferStatus') createOfferStatus?: ElementRef;
  @ViewChild('submitButton') submitButton?: ElementRef;

  categories: any;

  //add img
  selectedFile?: File;
  tempOffer?: any;
  tempImage?: any;

  status: any;
  createForm: FormGroup;

  constructor(private service: OfferService, private categoryService: CategoryService, private router: Router, private formBuilder: FormBuilder) { 
    this.createForm = this.formBuilder.group({
      title: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl('',[Validators.required, Validators.minLength(15), Validators.maxLength(400)]),
      price: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required])
    })
  }

  get title(){return this.createForm.get('title')}
  get description(){return this.createForm.get('description')}
  get price(){return this.createForm.get('price')}
  get category(){return this.createForm.get('category')}

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoryService.getAllCategory().subscribe(result=>{
      this.categories = result;
    });
  }

  //upload img
  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onSubmit(offer: any){  
    this.submitButton!.nativeElement.disabled=true;

    console.warn(offer);
    this.service.createOffer(offer).subscribe(result=>{
      this.submitButton!.nativeElement.disabled=false;
      this.tempOffer  = result;
      let nav = '/detailOffer/'+this.tempOffer.id;

      if(this.selectedFile){
        this.service.saveImg(this.selectedFile).subscribe(result=>{
          this.tempImage = result;
          this.status=AppComponent.trans.instant('CREATE_OFFER_WARNING.ADDED_PHOTO_WITHOUT_CONNECT_OFFER')
          this.service.setImg(new ImageAndOffer(this.tempOffer.id,this.tempImage.id)).subscribe(result=>{
            this.status=AppComponent.trans.instant('CREATE_OFFER_WARNING.ADDED_OFFER_WTIH_IMAGE')
            this.router.navigate([nav]);
          })
        })
      }else{
        this.status=AppComponent.trans.instant('CREATE_OFFER_WARNING.ADDED_NEW_OFFER_WITHOUT_IMAGE')
        this.router.navigate([nav]);
      }

    },()=>{
      this.status=AppComponent.trans.instant('CREATE_OFFER_WARNING.ERROR')
      this.submitButton!.nativeElement.disabled=false;
    })
  }
}

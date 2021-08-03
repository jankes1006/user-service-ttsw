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
  files = new Array(4);
  tempImages = new Array(4);
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
    for(let i=0; i<4; i++){
      this.files[i]=event.target.files[i];
    }
    console.log(this.files);
  }

  async onSubmit(offer: any){  
    this.submitButton!.nativeElement.disabled=true;

    try{
    this.tempOffer = await this.saveOffer(offer);
    }catch(error){
      this.status=AppComponent.trans.instant('CREATE_OFFER_WARNING.ERROR')
      this.submitButton!.nativeElement.disabled=false;
      return
    }

    this.submitButton!.nativeElement.disabled=false;
    let nav = '/detailOffer/'+this.tempOffer.id;

    let numberOfPitures = this.numberOfPitures();
    console.error(numberOfPitures);

    if(this.selectedFile){
      for(let i=0; i<numberOfPitures; i++){
        this.tempImages[i] = await this.saveImage(this.files[i]);
      }
      this.status=AppComponent.trans.instant('CREATE_OFFER_WARNING.ADDED_PHOTO_WITHOUT_CONNECT_OFFER')

      for(let i=0; i<numberOfPitures; i++){
        await this.setImg(new ImageAndOffer(this.tempOffer.id,this.tempImages[i].id))
      }
      this.status=AppComponent.trans.instant('CREATE_OFFER_WARNING.ADDED_OFFER_WTIH_IMAGE')
      this.router.navigate([nav]);   
    }else{
      this.status=AppComponent.trans.instant('CREATE_OFFER_WARNING.ADDED_NEW_OFFER_WITHOUT_IMAGE')
      this.router.navigate([nav]);
    }
  }

  numberOfPitures(){
    let result = 0;
    for(let i=0; i<4; i++){
      if(this.files[i]) result ++;
    }
    return result;
  }
  async saveOffer(offer: any){
    const result = this.service.createOffer(offer).toPromise();
    return result;
  }

  async saveImage(file: any){
    const result = await this.service.saveImg(file).toPromise();
    return result;
  }

  async setImg(data: any){
    const result = await this.service.setImg(data).toPromise();
    return result;
  }
}

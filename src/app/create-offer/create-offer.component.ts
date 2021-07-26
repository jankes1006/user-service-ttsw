import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService} from '../category-service/category-service.service';
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

  constructor(private service: OfferService, private categoryService: CategoryService, private router: Router) { }

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

    this.service.createOffer(offer).subscribe(result=>{
      this.submitButton!.nativeElement.disabled=false;
      this.tempOffer  = result;
      let nav = '/detailOffer/'+this.tempOffer.id;

      if(this.selectedFile){
        this.service.saveImg(this.selectedFile).subscribe(result=>{
          this.tempImage = result;
          this.createOfferStatus!.nativeElement.innerHTML="Dodano zdjęcia, jednak bez przypisania!";
          this.service.setImg(new ImageAndOffer(this.tempOffer.id,this.tempImage.id)).subscribe(result=>{
            this.createOfferStatus!.nativeElement.innerHTML="Stworzono ofertę wraz ze zdjęciem!";
            this.router.navigate([nav]);
          })
        })
      }else{
        this.createOfferStatus!.nativeElement.innerHTML="Stworzono nową ofertę bez zdjęcia!";
        this.router.navigate([nav]);
      }

    },()=>{
      this.createOfferStatus!.nativeElement.innerHTML="Wystąpił błąd. Spróbuj ponownie później";
      this.submitButton!.nativeElement.disabled=false;
    })
  }
}

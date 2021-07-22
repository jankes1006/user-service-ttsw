import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService} from '../category-service/category-service.service';
import { OfferService } from '../OfferService/offer.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  @ViewChild('createOfferStatus') createOfferStatus?: ElementRef;
  @ViewChild('submitButton') submitButton?: ElementRef;

  categories: any;

  constructor(private service: OfferService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoryService.getAllCategory().subscribe(result=>{
      this.categories = result;
    });
  }

  onSubmit(data: any){
    this.submitButton!.nativeElement.disabled=true;
    this.service.createOffer(data).subscribe(result=>{
      this.createOfferStatus!.nativeElement.innerHTML="Stworzono nową ofertę!";
      this.submitButton!.nativeElement.disabled=false;
    },()=>{
      this.createOfferStatus!.nativeElement.innerHTML="Wystąpił błąd. Spróbuj ponownie później";
      this.submitButton!.nativeElement.disabled=false;
    })
  }
}

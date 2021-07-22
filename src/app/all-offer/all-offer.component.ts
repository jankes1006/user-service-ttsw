import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category-service/category-service.service';
import { OfferService } from '../OfferService/offer.service';

@Component({
  selector: 'app-all-offer',
  templateUrl: './all-offer.component.html',
  styleUrls: ['./all-offer.component.css']
})
export class AllOfferComponent implements OnInit {

  constructor(private service: OfferService, private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  page?: number;
  sizePage?: number;
  sizeActiveOffer?: number;

  numberOfPagination?: number;
  category?: string;

  allOffers: any; 
  categories: any;

  @ViewChild('sizePageHTML') sizePageHTML?: ElementRef;
  @ViewChild('categoryHTML') categoryHTML?: ElementRef;

  ngOnInit(): void {
    this.page=Number(this.route.snapshot.paramMap.get('page'));
    this.sizePage=Number(this.route.snapshot.paramMap.get('sizePage'));
    this.category=String(this.route.snapshot.paramMap.get('category'));
    this.getAllCategories();
    this.showOffers();
    this.getSizeActiveOffer();
  }

  showOffers(){
    this.service.getAllOffersOnPageWhereCategory(this.page!,this.sizePage!,this.category!).subscribe(result =>
      {
        this.allOffers=result;
        this.preapreSite();
      }
      );
  }

  getSizeActiveOffer(){
    this.service.getSizeActive(this.category!).subscribe(result=>{
      this.sizeActiveOffer=Number(result);
      this.numberOfPagination=Math.ceil(this.sizeActiveOffer/this.sizePage!);
    })
  }

  createRange(number: number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  setFilter(data: any){
    var sendPageSize;
    var sendCategory;

    if(data.pageSize==""){
      sendPageSize=this.sizePage;
    }else{
      sendPageSize=data.pageSize;
    }

    if(data.category==""){
      sendCategory=this.category;
    }else{
      sendCategory=data.category;
    }

    location.href="/showAllOffer/0/"+sendPageSize+"/"+sendCategory;
  }

  getAllCategories(){

    this.categoryService.getAllCategory().subscribe(result=>{
      this.categories = result;
    })
  }

  preapreSite(){
    console.log(this.sizePageHTML);
    this.sizePageHTML!.nativeElement.value=this.sizePage;
    this.categoryHTML!.nativeElement.value=this.category;
  }
}

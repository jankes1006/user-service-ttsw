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
  category?: string;
  searchTitle?: string;
  searchUser?: string;
  isAdmin?: string;

  allPage?:any;

  numberOfPagination?: number;

  allOffers: any; 
  categories: any;

  @ViewChild('sizePageHTML') sizePageHTML?: ElementRef;
  @ViewChild('categoryHTML') categoryHTML?: ElementRef;
  @ViewChild('searchHTML') searchHTML?: ElementRef;
  @ViewChild('userHTML') userHTML?: ElementRef;
  
  ngOnInit(): void {
    this.page=Number(this.route.snapshot.paramMap.get('page'));
    this.sizePage=Number(this.route.snapshot.paramMap.get('sizePage'));
    this.category=String(this.route.snapshot.paramMap.get('category'));
    this.searchTitle=String(this.route.snapshot.paramMap.get('searchTitle'));
    this.searchUser=String(this.route.snapshot.paramMap.get('user'));
    this.isAdmin=String(this.route.snapshot.paramMap.get('admin'));

    this.getAllCategories();
    this.showOffers();
  }

  showOffers(){
    let searchTemp = (this.searchTitle=="*")?"":this.searchTitle;
    let categoryTemp = (this.category=="all")?"":this.category;
    let userTemp = (this.searchUser=="*")?"":this.searchUser;

    if(this.isAdmin!='admin'){
      this.service.getAllOffersOnPageWhereCategory(this.page!,this.sizePage!,categoryTemp!, searchTemp!,userTemp!).subscribe(result =>
        {
          this.allPage=result;
          this.allOffers=this.allPage.content;
          this.numberOfPagination=this.allPage.totalPages;
          this.preapreSite();
        }
        );
    }else{ //admin
      this.service.getAllOffersOnPageWhereCategoryAdmin(this.page!,this.sizePage!,categoryTemp!, searchTemp!,userTemp!).subscribe(result =>
        {
          this.allPage=result;
          this.allOffers=this.allPage.content;
          this.numberOfPagination=this.allPage.totalPages;
          this.preapreSite();
        }
        );
    }
  }

  createRange(number: number){
    let items: number[] = [];
    for(let i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  setFilter(data: any){
    let sendPageSize;
    let sendCategory;
    let sendSearchTile;
    let sendUser;

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

    if(data.search==""){
      sendSearchTile=this.searchTitle;
    }else{
      sendSearchTile=data.search;
    }

    if(data.user==""){
      sendUser=this.searchUser;
    }else{
      sendUser=data.user;
    }

    if(this.isAdmin!="admin"){
      location.href="/showAllOffer/0/"+sendPageSize+"/"+sendCategory+"/"+sendSearchTile+"/"+sendUser;
    }else{
      location.href="/showAllOffer/0/"+sendPageSize+"/"+sendCategory+"/"+sendSearchTile+"/"+sendUser+"/admin";
    }
    
  }

  getAllCategories(){

    this.categoryService.getAllCategory().subscribe(result=>{
      this.categories = result;
    })
  }

  preapreSite(){
    this.sizePageHTML!.nativeElement.value=this.sizePage;
    this.categoryHTML!.nativeElement.value=this.category;
    this.searchHTML!.nativeElement.value=this.searchTitle;
    this.userHTML!.nativeElement.value=this.searchUser;
  }

  resetFilter(){
    location.href="/showAllOffer/0/8/all/*/*";
  }
}

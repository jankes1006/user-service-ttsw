import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category-service/category-service.service';
import { CommentService } from '../CommentService/comment.service';

@Component({
  selector: 'app-comment-and-mark-list',
  templateUrl: './comment-and-mark-list.component.html',
  styleUrls: ['./comment-and-mark-list.component.css']
})
export class CommentAndMarkListComponent implements OnInit {
  page?: number;
  size?: number;
  title?: string;
  sort?: string;

  offersToComment: any;
  totalPages?: number;
  username = localStorage.getItem('username');

  temp: any;
  constructor(private categoryService: CategoryService, private commentService: CommentService, private route: ActivatedRoute, private router: Router) { 
  }

  @ViewChild('sizeHTML') sizeHTML?: ElementRef;
  @ViewChild('sortHTML') sortHTML?: ElementRef;
  @ViewChild('titleHTML') titleHTML?: ElementRef;

  ngOnInit(): void {
    this.setMainVariable();
    this.getAllOfferToComment();
  }

  setMainVariable(){
    this.page = Number(this.route.snapshot.paramMap.get('page'));
    this.size = Number(this.route.snapshot.paramMap.get('size'));
    this.title = String(this.route.snapshot.paramMap.get('title'));
    this.sort = String(this.route.snapshot.paramMap.get('sort'));
  }

  getAllOfferToComment(){
    let tempId = "";
    let tempPage = this.page;
    let tempSize = this.size;

    this.commentService.getAllUserOfferToComment(this.username!, tempPage, tempSize, "").subscribe(result =>{
      this.temp = result;
      this.totalPages = this.temp.totalPages;
      this.offersToComment = this.temp.content;
      this.prepareSite();
    })
  }

  createRange(number: number){
    let items: number[] = [];
    for(let i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  setFilter(data: any){
    let tempSize = data.size;
    let tempTitle = data.tite;
    let tempSort = data.sort;

    if(data.size==""){
      tempSize=this.size;
    }else{
      tempSize=data.size;
    }

    if(data.title==""){
      tempTitle=this.title;
    }else{
      tempTitle=data.title;
    }

    if(data.sort==""){
      tempSort=this.sort;
    }else{
      tempSort=data.sort;
    }

    location.href='/allOffersToComment/0/'+tempSize+'/'+tempTitle+'/'+tempSort;
  }

  prepareSite(){
    this.sizeHTML!.nativeElement.value = this.size;
    this.sortHTML!.nativeElement.value = this.sort;
    this.titleHTML!.nativeElement.value = this.title;
  }
}

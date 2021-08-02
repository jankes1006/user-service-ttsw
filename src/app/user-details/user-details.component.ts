import { ThrowStmt } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../CommentService/comment.service';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  titleToMarksStatistic?: string; 
  id?: number;
  role?:string;
  user: any;
  soldOffer?: number;
  averageMark?: number;
  comments: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.role=String(this.route.snapshot.paramMap.get('role'));
    this.getUser();
    this.getNumberOfSoldOffer();
    this.getAverageMark();
    this.getComments();
  }

  getUser(){
    this.userService.getUser(this.id!).subscribe(result =>{
      this.user=result;
      this.titleToMarksStatistic = "Oceny użytkownika: "+this.user.username;
    });
  }

  onSubmit(data: any){
    data.id = this.id;
    
    this.userService.updateUserAdmin(data).subscribe(result=>{
      this.user=result;
    })
  }

  getNumberOfSoldOffer(){
    this.commentService.getNumberOfSoldOfferUser(this.id!).subscribe(result=>{
      this.soldOffer = Number(result);
    })
  }

  getAverageMark(){
    this.commentService.getAverageMarkUser(this.id!).subscribe(result=>{
      this.averageMark = Number(result)
    })
  }

  getComments(){
    this.commentService.getCommentsOfferUser(this.id!).subscribe(result=>{
      this.comments = result;
    })
  }
}

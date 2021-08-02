import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommentService } from '../CommentService/comment.service';

class OfferToCommentUpdateDTO{
  id: number;
  comment: string;
  mark: number;

  constructor(id: number, comment:string, mark:number){
    this.id = id;
    this.comment = comment;
    this.mark = mark;
  }
}

@Component({
  selector: 'app-comment-and-mark',
  templateUrl: './comment-and-mark.component.html',
  styleUrls: ['./comment-and-mark.component.css']
})
export class CommentAndMarkComponent implements OnInit {
  commentGroup: FormGroup;

  constructor(private commentService: CommentService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { 
    this.commentGroup = this.formBuilder.group({
      comment: new FormControl('', [Validators.maxLength(1024)]),
      mark: new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
    this.getParamWithURL();
    this.getOfferToComment(this.id!);
  }

  get comment(){return this.commentGroup.get('comment')}
  get mark(){return this.commentGroup.get('mark')}

  id?: number;
  offerToComment: any;
  username = localStorage.getItem('username');
  status="";

  @ViewChild('submitButton') submitButton?: ElementRef;

  tempComment?: string;
  tempMark?: number;

  createRange(number: number){
    let items: number[] = [];
    for(let i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  getParamWithURL(){
    this.id =  Number(this.route.snapshot.paramMap.get('id'));
  }

  onSubmit(data:any){
    this.tempComment = String(data.comment);
    this.tempMark = Number(data.mark);

    let offerToCommentUpdate = new OfferToCommentUpdateDTO(this.id!,this.tempComment,this.tempMark);
    
    this.commentService.updateOfferToComment(offerToCommentUpdate).subscribe(result=>{
      this.status=AppComponent.trans.instant('COMMENT.SUCCESSFULL_COMMENT')
      this.submitButton!.nativeElement.disabled=true;
    });
  }

  getOfferToComment(id: number){
    this.commentService.getOfferToCommentById(id).subscribe(result=>{
      this.offerToComment=result;
      if(this.offerToComment.mark!=0){
        this.router.navigate(['/showAllOffer/0/7/all/*/*/id,asc']);
      }
    })
  }

}

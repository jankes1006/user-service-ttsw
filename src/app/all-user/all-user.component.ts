import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  
  page?: number;
  sizePage?: number;
  username?: string;
  email?: string;
  role?: string;
  sort?: string;

  @ViewChild('sizePageHTML') sizePageHTML?: ElementRef;
  @ViewChild('usernameHTML') usernameHTML?: ElementRef;
  @ViewChild('emailHTML') emailHTML?: ElementRef;
  @ViewChild('roleHTML') roleHTML?: ElementRef;
  @ViewChild('sortHTML') sortHTML?: ElementRef;
  users: any;
  tempResult: any;

  numberOfPagination: any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.page=Number(this.route.snapshot.paramMap.get('page'));
    this.sizePage=Number(this.route.snapshot.paramMap.get('sizePage'));
    this.username=String(this.route.snapshot.paramMap.get('username'));
    this.email=String(this.route.snapshot.paramMap.get('email'));
    this.role=String(this.route.snapshot.paramMap.get('role'));
    this.sort=String(this.route.snapshot.paramMap.get('sort'));
    this.getAll();
  }

  getAll(){
    let tempPage = this.page;
    let tempSize = this.sizePage;
    let tempUsername = (this.username=="*")?"":this.username;
    let tempEmail = (this.email=="*")?"":this.email;
    let tempRole = (this.role=="*")?"":this.role;
    let tempSort = this.sort;

    this.userService.getPageUser(tempPage!,tempSize!,tempUsername!,tempEmail!,tempRole!,tempSort!).subscribe(result=>{
      this.tempResult = result;
      this.users = this.tempResult.content;
      this.numberOfPagination = this.tempResult.totalPages;
      this.preapreSite();
    })
  }

  setFilter(data: any){
    let sendPageSize;
    let sendEmail;
    let sendUsername;
    let sendRole;
    let sendSort;

    console.warn(data);
    if(data.sizePage==""){
      sendPageSize=this.sizePage;
    }else{
      sendPageSize=data.sizePage;
    }

    if(data.email==""){
      sendEmail=this.email;
    }else{
      sendEmail=data.email;
    }

    if(data.username==""){
      sendUsername=this.username;
    }else{
      sendUsername=data.username;
    }

    if(data.role==""){
      sendRole=this.role;
    }else{
      sendRole=data.role;
    }

    if(data.sort==""){
      sendSort=this.role;
    }else{
      sendSort=data.sort;
    }

    location.href="/showAllUsers/0/"+sendPageSize+"/"+sendUsername+"/"+sendEmail+"/"+sendRole+"/"+sendSort;
  }

  preapreSite(){
    this.sizePageHTML!.nativeElement.value=this.sizePage;
    this.usernameHTML!.nativeElement.value=this.username;
    this.emailHTML!.nativeElement.value=this.email;
    this.roleHTML!.nativeElement.value=this.role;
    this.sortHTML!.nativeElement.value=this.sort;
  }

  createRange(number: number){
    let items: number[] = [];
    for(let i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  resetFilter(){
    location.href="/showAllUsers/0/8/*/*/*/id,asc";
  }
}

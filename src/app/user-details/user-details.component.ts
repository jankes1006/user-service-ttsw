import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id?: number;
  user: any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.id!).subscribe(result =>{
      this.user=result;
    });
  }

  onSubmit(data: any){
    data.id = this.id;
    
    this.userService.updateUserAdmin(data).subscribe(result=>{
      this.user=result;
    })
  }

}

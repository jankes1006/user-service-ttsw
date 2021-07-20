import { Component, OnInit } from '@angular/core';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {

  users: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.userService.getAllUsers().subscribe(result=>{
      console.warn(result);
      this.users = result;
    })
  }
}

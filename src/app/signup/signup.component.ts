import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService){
  }
  ngOnInit(): void {
  }

  onSubmit(data: any): void{
    this.userService.createAccount(data)
    .subscribe((result)=>{
      console.warn(result);
    })
  }
}

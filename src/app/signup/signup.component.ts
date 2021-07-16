import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('createStatus') createStatus?: ElementRef;
  
  constructor(private userService: UserService, private route: Router){
  }
  ngOnInit(): void {
  }

  onSubmit(data: any): void{
    this.createStatus!.nativeElement.innerHTML="Czekaj..."
    if(data.password==data.repeatPassword){
      this.userService.createAccount(data)
      .subscribe((result)=>{
        this.createStatus!.nativeElement.innerHTML="Stworzono nowe konto, potwierdz adres email!"
      })
    }else{
      this.createStatus!.nativeElement.innerHTML="Podane hasła się różnią! Popraw!"
    }
  }
}

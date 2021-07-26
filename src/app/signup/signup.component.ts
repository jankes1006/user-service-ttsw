import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../UserService/user.service";

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
    console.warn("TO DZIALA");
    
    this.createStatus!.nativeElement.innerHTML="Czekaj..."
    if(data.password==data.repeatPassword){
      this.userService.createAccount(data)
      .subscribe((result)=>{
        if(result=="USERNAME_EXIST"){
          this.createStatus!.nativeElement.innerHTML="Podana nazwa użytkownika jest zajęta. Zmień ją!"
        }

        if(result=="MAIL_EXIST"){
          this.createStatus!.nativeElement.innerHTML="Podany adres email jest zajęty. Zmień go!"
        }

        if(result=="CREATE"){
          this.createStatus!.nativeElement.innerHTML="Stworzono nowe konto. Potwierdz adres email!"
        }
        
      },()=>{
        this.createStatus!.nativeElement.innerHTML="Nie udana proba stworzenia konta."
      })
    }else{
      this.createStatus!.nativeElement.innerHTML="Podane hasła się różnią! Popraw!"
    }
    
  }
}

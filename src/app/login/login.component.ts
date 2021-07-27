import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../UserService/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('errorLogin') error?: ElementRef;
  user: any;
  userToken: any;
  constructor(private userService: UserService, private router: Router){
  }

  ngOnInit(): void {
  }

  onSubmit(data: any): void{
    this.userService.login(data.username, data.password).subscribe(response=>{
      this.userToken = response;
      if(this.userToken.role != 'ROLE_UNCONFIRMED' && this.userToken.role != 'ROLE_BAN')
      {
        localStorage.setItem('token',this.userToken.token)
        localStorage.setItem('username',this.userToken.username);
        localStorage.setItem('role',this.userToken.role);
        this.router.navigate(['/showAllOffer/0/8/all/*/*']);
      }else{
        if(this.userToken.role == 'ROLE_UNCONFIRMED'){
          this.error!.nativeElement.innerHTML="Konto nie zostało potwierdzone! Potwierdź je!";
        }else{
          this.error!.nativeElement.innerHTML="Podane konto zostało zablokowane przez administratorów.";
        }
      }
      
    },(error)=>{
      this.error!.nativeElement.innerHTML="Nieprawidłowy login lub hasło!";
    });
  }
}
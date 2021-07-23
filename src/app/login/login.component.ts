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
  
  constructor(private userService: UserService, private router: Router){
  }

  ngOnInit(): void {
  }

  onSubmit(data: any): void{
    this.userService.login(data.username, data.password).subscribe(response=>{
      this.user=response;
      console.warn("hej")
      if(this.user.username){
        localStorage.setItem('id',this.user.id);
        localStorage.setItem('username',this.user.username);
        localStorage.setItem('password',data.password);
        localStorage.setItem('email',this.user.email);
        localStorage.setItem('role',this.user.role);
        this.router.navigate(['/showAllOffer/0/8/all/*/*']);
      }
    },(error)=>{
      this.error!.nativeElement.innerHTML="Nieprawidłowy login lub hasło!";
    });
  }
}
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @ViewChild("changePasswordStatus") passwordStatus?: ElementRef;
  @ViewChild("changeEmailStatus") emailStatus?: ElementRef;

  @ViewChild("passwordNew") passwordNew?: ElementRef;
  @ViewChild("passwordNewRepeat") passwordNewRepeat?: ElementRef;
  @ViewChild("password") password?: ElementRef;

  @ViewChild("email") email?: ElementRef;
  @ViewChild("passwordEmail") passwordEmail?: ElementRef;

  constructor(private userService: UserService) { }

  data = {"modifyFields":"", "newValue":"", "password":""};
  ngOnInit(): void {
  }

  onSubmitPassword(data: any){
    this.passwordStatus!.nativeElement.innerHTML="Trwa zmiana hasła. Proszę czekać...";

    if(data.passwordNew != data.passwordNewRepeat){
      this.passwordStatus!.nativeElement.innerHTML="Nowe hasło, oraz jego powtórzenie są różne. Popraw!";
      return;
    }

    this.userService.login(localStorage.getItem('username')!,data.password).subscribe(result=>{
      this.data.modifyFields="PASSWORD";
      this.data.newValue=data.passwordNew;
      this.data.password=data.password;
      this.userService.updateUser(this.data).subscribe(result=>{
        localStorage.setItem('password',data.passwordNew);
        this.passwordStatus!.nativeElement.innerHTML="Udana zmiana hasła!";
        this.password!.nativeElement.value="";
        this.passwordNew!.nativeElement.value="";
        this.passwordNewRepeat!.nativeElement.value="";
      },error=>{
        this.passwordStatus!.nativeElement.innerHTML="Nie udana zmiana hasła!";
      })
      
    },error=>{
      this.passwordStatus!.nativeElement.innerHTML="Aktualne hasło jest nie prawidłowe. Popraw!";
    })
  }

  onSubmitEmail(data: any){
    this.emailStatus!.nativeElement.innerHTML="Trwa zmiana adresu email. Proszę czekać...";

    this.userService.login(localStorage.getItem('username')!,data.password).subscribe(result=>{
      this.data.modifyFields="EMAIL";
      this.data.newValue=data.email;
      this.data.password=data.password;
      this.userService.updateUser(this.data).subscribe(result=>{
        localStorage.setItem('email',data.email);
        this.emailStatus!.nativeElement.innerHTML="Udana zmiana adresu email!";
        this.email!.nativeElement.value="";
        this.passwordEmail!.nativeElement.value="";
      },error=>{
        this.emailStatus!.nativeElement.innerHTML="Nie udana zmiana adresu email!";
      })
      
    },error=>{
      this.emailStatus!.nativeElement.innerHTML="Hasło jest nie prawidłowe. Popraw!";
    })
    
  }
}

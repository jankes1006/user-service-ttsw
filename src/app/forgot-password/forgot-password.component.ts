import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  @ViewChild('newPassword') newPassword?: ElementRef;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { 
    this.forgotForm = this.formBuilder.group({
      username: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email])
    })
  }

  get username(){return this.forgotForm.get('username')}
  get email(){return this.forgotForm.get('email')}

  ngOnInit(): void {
  }

  onSubmit(data:any){
    this.userService.resetPassword(data).subscribe(result=>{
      switch(result){
        case "RESET":
          this.newPassword!.nativeElement.innerHTML="Aby kontynuować zmianę hasła, przejdź na skrzynkę pocztową.";
          break;
        
        case "NO_RESET":
          this.newPassword!.nativeElement.innerHTML="Podano nie prawidłowe dane.";
          break;

        case "UNCONFIRMED_USER":
          this.newPassword!.nativeElement.innerHTML="Użytkownik nie był jeszcze potwierdzony! Zrób to zanim zaczniesz korzystać z serwisu!";
          break;
      }
    })
  }
}

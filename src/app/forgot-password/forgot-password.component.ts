import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetStatus: any;
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
          this.resetStatus=AppComponent.trans.instant('RESET_PASSWORD_WARNING.RESET')
          break;
        
        case "NO_RESET":
          this.resetStatus=AppComponent.trans.instant('RESET_PASSWORD_WARNING.NO_RESET')
          break;

        case "UNCONFIRMED_USER":
          this.resetStatus=AppComponent.trans.instant('RESET_PASSWORD_WARNING.UNCONFIRMED_USER')
          break;
      }
    })
  }
}

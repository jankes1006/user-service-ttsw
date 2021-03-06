import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from "../UserService/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('createStatus') createStatus?: ElementRef;
  
  createNewAccount: FormGroup;
  statusRegister: any;

  constructor(private userService: UserService, private route: Router, private formBuilder: FormBuilder){
    this.createNewAccount = this.formBuilder.group({
      username: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]),
      passwordRepeat: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    },{
      validators: this.MustMatch('password', 'passwordRepeat')
    })
  }

  MustMatch(controlName: string, matchingControlName: string){
    return(formGroup: FormGroup) =>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl.errors && !matchingControl.errors.MustMatch){
        return 
      }

      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true})
      }else{
        matchingControl.setErrors(null)
      }
    }
  }

  get username(){return this.createNewAccount.get('username')}
  get email(){return this.createNewAccount.get('email')}
  get password(){return this.createNewAccount.get('password')}
  get passwordRepeat(){return this.createNewAccount.get('passwordRepeat')}

  ngOnInit(): void {
  }

  onSubmit(data: any): void{
    
    console.log(data);
    this.statusRegister = AppComponent.trans.instant('REGISTRATION_WARNING.WAIT')
    
      this.userService.createAccount(data)
      .subscribe((result)=>{
        
        if(result=="USERNAME_EXIST"){
          this.statusRegister = AppComponent.trans.instant('REGISTRATION_WARNING.USERNAME_EXIST')
        }

        if(result=="MAIL_EXIST"){
          console.error(result);
          this.statusRegister = AppComponent.trans.instant('REGISTRATION_WARNING.MAIL_EXIST')
        }

        if(result=="CREATE"){
          this.statusRegister = AppComponent.trans.instant('REGISTRATION_WARNING.CREATE')
        }
        
      },()=>{
        this.statusRegister = AppComponent.trans.instant('REGISTRATION_WARNING.ERROR')
      })
    
  }
}

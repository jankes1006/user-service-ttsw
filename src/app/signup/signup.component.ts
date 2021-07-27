import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../UserService/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('createStatus') createStatus?: ElementRef;
  
  createNewAccount: FormGroup;

  constructor(private userService: UserService, private route: Router, private formBuilder: FormBuilder){
    this.createNewAccount = this.formBuilder.group({
      username: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
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
    
    this.createStatus!.nativeElement.innerHTML="Czekaj..."
    
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
    
  }
}

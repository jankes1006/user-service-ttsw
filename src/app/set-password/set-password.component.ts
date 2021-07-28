import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../UserService/user.service';

class TokenPassword{
  newPassword: string;
  token: string;

  constructor(newPassword: string, token: string){
    this.newPassword = newPassword;
    this.token = token;
  }
}

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  user: any;
  passwordForm: FormGroup;
  token?: string;

  @ViewChild('changePasswordStatus') changePasswordStatus?: ElementRef;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router){
    this.passwordForm = this.formBuilder.group({
      passwordNew: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      passwordNewRepeat: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    },{
      validators: this.MustMatch('passwordNew', 'passwordNewRepeat')
    })
  }

  ngOnInit(): void {
    this.token = String(this.route.snapshot.paramMap.get('token'));
    this.getUser(this.token);
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

  onSubmitPassword(data:any){
    const tokenPassword = new TokenPassword(data.passwordNew, this.token!)
    console.warn(tokenPassword)
    this.setPassword(tokenPassword);
  }

  getUser(token: string){
    this.userService.getUserByToken(token).subscribe(result=>{
      this.user = result;
    },error=>{
      this.router.navigate(['/login']);
    })
  }

  setPassword(data: any){
    this.userService.setNewPassword(data).subscribe(result=>{
      this.changePasswordStatus!.nativeElement.innerHTML="Udało się zmienić hasło! Wróć do logowania"
    },error=>{
      this.changePasswordStatus!.nativeElement.innerHTML="Nie udało się zmienić hasła! Wróć do logowania"
    })
  }

}

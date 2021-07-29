import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
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

  emailForm: FormGroup
  passwordForm: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder) { 
    this.emailForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email]),
      password: new FormControl('',[Validators.required])
    })

    this.passwordForm = this.formBuilder.group({
      passwordNew: new FormControl('',[Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]),
      passwordNewRepeat: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    },{
      validators: this.MustMatch('passwordNew', 'passwordNewRepeat')
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


  passwordStatusWarning:any;
  emailStatusWarning:any;

  data = {"modifyFields":"", "newValue":"", "password":""};
  ngOnInit(): void {
  }

  onSubmitPassword(data: any){
    this.passwordStatusWarning = AppComponent.trans.instant('EDIT_USER_WARNING.START_EDIT_PASSWORD')

    this.userService.login(localStorage.getItem('username')!,data.password).subscribe(result=>{
      this.data.modifyFields="PASSWORD";
      this.data.newValue=data.passwordNew;
      this.data.password=data.password;
      this.userService.updateUser(this.data).subscribe(result=>{
        localStorage.setItem('password',data.passwordNew);
        this.passwordStatusWarning = AppComponent.trans.instant('EDIT_USER_WARNING.SUCCESS_EDIT_PASSWORD')
        this.password!.nativeElement.value="";
        this.passwordNew!.nativeElement.value="";
        this.passwordNewRepeat!.nativeElement.value="";
      },error=>{
        this.passwordStatusWarning = AppComponent.trans.instant('EDIT_USER_WARNING.FAILURE_EDIT_PASSWORD')
      })
      
    },error=>{
      this.passwordStatusWarning = AppComponent.trans.instant('EDIT_USER_WARNING.BAD_ACTUAL_PASSWORD')
    })
  }

  onSubmitEmail(data: any){
    this.emailStatusWarning = AppComponent.trans.instant('EDIT_USER_WARNING.BAD_START_EDIT_EMAIL')
    this.userService.login(localStorage.getItem('username')!,data.password).subscribe(result=>{
      this.data.modifyFields="EMAIL";
      this.data.newValue=data.email;
      this.data.password=data.password;
      this.userService.updateUser(this.data).subscribe(result=>{
        localStorage.setItem('email',data.email);
        this.emailStatusWarning = AppComponent.trans.instant('EDIT_USER_WARNING.SUCCESS_EDIT_EMAIL')
        this.email!.nativeElement.value="";
        this.passwordEmail!.nativeElement.value="";
      },error=>{
        this.emailStatusWarning = AppComponent.trans.instant('EDIT_USER_WARNING.FAILUER_EDIT_EMAIL')
      })
      
    },error=>{
      
      this.emailStatusWarning = AppComponent.trans.instant('EDIT_USER_WARNING.BAD_PASSWORD')
    })
    
  }
}

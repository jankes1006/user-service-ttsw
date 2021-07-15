import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  constructor(private userService: UserService){
  }

  ngOnInit(): void {
  }

  onSubmit(data: any): void{
    console.warn(data);
    this.userService.login(data.username, data.password).subscribe(response=>{
      this.user=response;

      if(this.user.username!=null){
        localStorage.setItem('id',this.user.id);
        localStorage.setItem('username',this.user.username);
        localStorage.setItem('password',data.password);
        localStorage.setItem('email',this.user.email);
        localStorage.setItem('role',this.user.role);
      }
    });
  }
}

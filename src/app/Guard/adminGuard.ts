import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import {of} from "rxjs";
import { UserService } from "../UserService/user.service";

@Injectable()
export class AdminGuard implements CanActivate
{
  constructor(private userService: UserService, private router: Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
    if(localStorage.getItem("role")=="ROLE_ADMIN"){
      return of(true);
    }else{
      this.router.navigate(['/home']);
      return of(false);
    }
  }

}
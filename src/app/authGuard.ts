import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import {of} from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate
{
  constructor(private userService: UserService, private router: Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
    if(localStorage.getItem("username")!=null){
      return of(true);
    }else{
      this.router.navigate(['/login']);
      return of(false);
    }
  }

}
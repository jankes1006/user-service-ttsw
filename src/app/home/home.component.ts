import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  linkToAllUsers?: String;
  linkToAllOffersAdmin?: String;

  helloMessage = "Witaj " + localStorage.getItem("username")+"!";
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('role')=="ROLE_ADMIN"){
      this.linkToAllUsers="Wyświetl wszystkich użytkowników"
      this.linkToAllOffersAdmin="Modyfikuj status ofert";
    }else{
      this.linkToAllUsers="";
      this.linkToAllOffersAdmin="";
    }
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
    this.router.navigate(['/login']);
  }

}

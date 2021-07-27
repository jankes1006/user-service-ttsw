import { ThrowStmt } from '@angular/compiler';
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

  loginUser = "Zalogowany użytkownik" + localStorage.getItem("username");
  constructor(private router: Router) { }

  dropMenuOne = "nav-link dropdown-toggle";
  dropMenuTwo = "dropdown-menu"

  allUserOffers = "/showAllOffer/0/8/all/*/"+localStorage.getItem('username')
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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(['/login']);
  }

    collapsed = true;
    toggleCollapsed(): void {
      this.collapsed = !this.collapsed;
      this.dropMenuOne = "nav-link dropdown-toggle";
      this.dropMenuTwo = "dropdown-menu"
    }

    toggleDropMenu(){
      if(this.dropMenuOne=="nav-link dropdown-toggle"){
        this.dropMenuOne="nav-link dropdown-toggle show";
        this.dropMenuTwo="dropdown-menu show"
      }else{
        this.dropMenuOne = "nav-link dropdown-toggle";
        this.dropMenuTwo = "dropdown-menu"
      }
    }
}

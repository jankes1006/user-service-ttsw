import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  helloMessage = "Witaj " + localStorage.getItem("username");
  constructor(private router: Router) { }

  ngOnInit(): void {
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

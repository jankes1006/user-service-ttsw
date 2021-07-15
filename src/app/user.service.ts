import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){
  }

  createAccount(data: any){
    console.warn(data);
    return this.http.post('http://localhost:8080/user/create',data);
  }

  login(username: string, password: string){
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //return this.http.get("http://localhost:8080/user/getByUsername?username=admin",{headers,responseType: 'text' as 'json'}).subscribe(response=>console.warn(response));
    return this.http.get('http://localhost:8080/user/login?username='+username+'&password='+password);
  }
}

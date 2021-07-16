import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }
  
  createOffer(data: any,username: String, password: String){ //nie ma sensu tego przesylac tak, skoro mozesz to pobrac tutaj przez localstorage
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    console.warn(data);
    return this.http.post("http://localhost:8080/offer/create",data).subscribe(response=>console.warn(response)); //pamietaj ze hedera trzeba wsadzic i sprawdzic
  }

  getAllOffer(){
    return this.http.get("http://localhost:8080/offer/getAll");
  }
}

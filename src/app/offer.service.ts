import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }
  
  createOffer(data: any){ 
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.post("http://localhost:8080/offer/create",data,{headers,responseType: 'text' as 'json'}).subscribe(response=>console.warn(response)); //pamietaj ze hedera trzeba wsadzic i sprawdzic
  }

  getAllOffer(){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/getAll",{headers});
  }

  getOfferById(id: number){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/getById?id="+id,{headers});
  }

  reservedOffer(id: number){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/reserved?id="+id,{headers});
  }
}

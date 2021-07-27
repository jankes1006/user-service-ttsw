import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { OfferAndImage } from '../OfferAndImage';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }
  
  onlyTry(OfferAndImage: OfferAndImage){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.post("http://localhost:8080/offer/try",OfferAndImage,{headers});
  }


  createOffer(data: any){ 
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.post("http://localhost:8080/offer",data,{headers});
  }

  saveImg(img: any){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile',img!, img!.name)
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.post("http://localhost:8080/image",uploadImageData,{headers});
  }

  setImg(data: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.put("http://localhost:8080/offer/setImage",data,{headers});
  }

  getImg(data: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/image?id="+data,{headers});
  }

  getAllOffer(){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/getAll",{headers});
  }

  getAllOffersOnPage(page:number, sizePage:number){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/paginationALlOffer?page="+page+"&size="+sizePage,{headers});
  }

  getAllOffersOnPageWhereCategory(page:number, sizePage:number, category:string, search:string, user:string){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.get("http://localhost:8080/offer/searchTitle?title="+search+"&category="+category+"&page="+page+"&size="+sizePage+"&username="+user,{headers});
  }

  getAllOffersOnPageWhereCategoryAdmin(page:number, sizePage:number, category:string, search:string, user:string){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/searchTitleAdmin?title="+search+"&category="+category+"&page="+page+"&size="+sizePage+"&username="+user,{headers});
  }

  getAllOfferAdmin(){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/getAllAdmin",{headers});
  }

  getOfferById(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer?id="+id,{headers});
  }

  reservedOffer(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/reserved?id="+id,{headers});
  }

  updateOffer(data: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.put("http://localhost:8080/offer",data,{headers});
  }

  changeActivityOffer(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.put("http://localhost:8080/offer/changeActivityUser?id="+id,{},{headers});
  }

  getAllOffersUser(){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/offer/getAllUser",{headers});
  }

  setBanOnOffer(data: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
   // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.put("http://localhost:8080/offer/setBan",data,{headers});
  }

  takeOfBanOffer(data: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.put("http://localhost:8080/offer/takeOffBan",data,{headers});
  }
}

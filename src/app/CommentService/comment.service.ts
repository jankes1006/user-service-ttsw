import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  constructor(private http: HttpClient) { }

  getAllUserOfferToComment(username: String, page: any, size: any, sort: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.get("http://localhost:8080/log/getOfferToCommentAndMark?username="+username+"&page="+page+"&size="+size,{headers});
  }

  getOfferToCommentById(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.get("http://localhost:8080/log/getOfferToCommentAndMarkByID?id="+id,{headers});
  }

  updateOfferToComment(data: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.put("http://localhost:8080/log/updateOfferToComment",data,{headers});
  }

  getNumberOfSoldOfferUser(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.get("http://localhost:8080/log/getNumberOfSoldOfferUser?id="+id,{headers});
  }

  getAverageMarkUser(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.get("http://localhost:8080/log/getAverageMarkUser?id="+id,{headers});
  }

  getMarksUser(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.get("http://localhost:8080/log/getMarksUser?id="+id,{headers});
  }

  getCommentsOfferUser(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    return this.http.get("http://localhost:8080/log/getCommentsOfferUser?id="+id,{headers});
  }
}

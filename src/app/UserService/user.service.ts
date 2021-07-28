import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){
  }

  createAccount(data: any){
    return this.http.post('http://localhost:8080/user/create',data);
  }

  login(username: string, password: string){
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //return this.http.get("http://localhost:8080/user/getByUsername?username=admin",{headers,responseType: 'text' as 'json'}).subscribe(response=>console.warn(response));
    return this.http.get('http://localhost:8080/user/login?username='+username+'&password='+password);
  }

  getAllUsers(){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get('http://localhost:8080/user/getAll',{headers});
  }

  getUser(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get('http://localhost:8080/user/getById?id='+id,{headers});
  }

  updateUserAdmin(data: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
   // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.put('http://localhost:8080/user/updateAdmin',data,{headers});
  }

  updateUser(data: any){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.put('http://localhost:8080/user',data,{headers});
  }

  getPageUser(page: number, size: number, username: string, email: string, role: string){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
   // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) });
    return this.http.get('http://localhost:8080/user/getPageable?page='+page+'&size='+size+'&username='+username+'&email='+email+'&role='+role,{headers});
  }

  resetPassword(data:any){
    return this.http.get("http://localhost:8080/user/resetPassword?username="+data.username+"&email="+data.email);
  }

  getUserByToken(token:string){
    return this.http.get("http://localhost:8080/user/getByToken?token="+token);
  }

  setNewPassword(tokenAndPassword: any){
    return this.http.put("http://localhost:8080/user/setNewPassword",tokenAndPassword)
  }
}

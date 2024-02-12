import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  addUserDetail(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/userDetail',data)
  }
  getUserDetail():Observable<any>{
    return this.http.get('http://localhost:3000/userDetail')
  }
  deleteUserDetail(id:any):Observable<any>{
    return this.http.delete(`http://localhost:3000/userDetail/${id}`);
    // return this.http.delete('http://localhost:3000/userDetail/' + id);  
    // We can use also these
  }
  updateUserDetail(id:number,data:any):Observable<any>{
    return this.http.put(`http://localhost:3000/userDetail/${id}`,data);
  }
  
}

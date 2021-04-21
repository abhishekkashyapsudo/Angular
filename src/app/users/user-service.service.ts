import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  private USER_BASE_URL = "assets/templates/"
  private users: User[];
  private loggedUser: User ;
  constructor(private readonly http: HttpClient) { 
    const url = `${this.USER_BASE_URL}/users.json`;
    this.http.get<User[]>(url).subscribe(data =>
      this.users = data
    )
  }
  


  getUsers() {
    return this.users;
  }

  login(username: any, password: any) {
    let filtered= this.users.filter((user: User) => user.username == username && user.password == password);
    if (filtered.length == 0){
      return undefined;
    }
    else{
      this.loggedUser = filtered[0];;
      return this.loggedUser;
    }
  }

  logoutUser() {
    this.loggedUser = undefined;
  }
  getLoggedUser(){
    return this.loggedUser;
  }
}

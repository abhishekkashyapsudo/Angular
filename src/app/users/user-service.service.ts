import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
@Injectable({
  providedIn: 'root'
})

export class UserService {
 

  private USER_BASE_URL = "assets/templates/"
  private static users: User[];
  private loggedUser: User ;
  constructor(private readonly http: HttpClient) { 
    const url = `${this.USER_BASE_URL}/users.json`;
    const url1 = `${this.USER_BASE_URL}/products.json`;
    this.http.get<User[]>(url).subscribe(data =>
      UserService.users = data
    )
  }
  


  getUsers() {
    return UserService.users;
  }

  login(username: any, password: any) {
    let filtered= UserService.users.filter((user: User) => user.username == username && user.password == password);
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

  addUser(user: User) {
    UserService.users.push(user);
    this.loggedUser = user;
  }
  getLoggedUser(){
    return this.loggedUser;
  }
}

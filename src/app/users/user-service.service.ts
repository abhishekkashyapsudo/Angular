import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private static users: User[];
  private USER_BASE_URL = 'assets/templates/';
  private loggedUser: User;
  constructor(private readonly http: HttpClient) {
    const url = `${this.USER_BASE_URL}/users.json`;
    const url1 = `${this.USER_BASE_URL}/products.json`;
    this.http.get<User[]>(url).subscribe(data =>
      UserService.users = data
    );
  }



  getUsers(): User[] {
    return UserService.users;
  }

  login(username: any, password: any): User {
    const filtered = UserService.users.filter((user: User) => user.username.toLowerCase()
      === username.toLowerCase() && user.password === password);
    if (filtered.length === 0) {
      return undefined;
    }
    else {
      this.loggedUser = filtered[0];
      return this.loggedUser;
    }
  }

  logoutUser(): void {
    this.loggedUser = undefined;
  }

  addUser(user: User): void {
    UserService.users.push(user);
    this.loggedUser = user;
  }
  getLoggedUser(): User {
    return this.loggedUser;
  }
}

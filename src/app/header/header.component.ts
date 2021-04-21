import { noUndefined } from '@angular/compiler/src/util';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserloginComponent } from '../userlogin/userlogin.component';
import { UserService } from '../users/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private readonly router: Router, private readonly userService: UserService) { }

  private user: string = "";
  ngOnInit(): void {
  }
  
  
  logout(){
  
    localStorage.setItem('isLoggedIn','No');
    localStorage.setItem('username',undefined);
    this.router.navigateByUrl("login");
    this.userService.logoutUser();
  }

  shouldBeDisplayed(){
    if(localStorage.getItem("username") !== undefined)
      this.user = localStorage.getItem("username");
    return localStorage.getItem('isLoggedIn') == 'Yes';
  }


}

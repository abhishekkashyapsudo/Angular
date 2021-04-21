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
    this.router.navigateByUrl("login");
    this.userService.logoutUser();
  }

  shouldBeDisplayed(){
    if(this.userService.getLoggedUser() !== undefined)
      this.user = this.userService.getLoggedUser().name;
    return localStorage.getItem('isLoggedIn') == 'Yes';
  }


}

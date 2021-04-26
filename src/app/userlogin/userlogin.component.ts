import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/user';
import { UserService } from '../users/user-service.service';
@Component({
  templateUrl: './userlogin.component.html'
})
export class UserloginComponent implements OnInit {
  userForm: FormGroup;
  error = '';
  loggedUser: User;

  constructor(public translate: TranslateService, public fb: FormBuilder, private userService: UserService, private r: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      error: ['']
    });
  }

  login(): void {
    let key = 'username';
    const username = this.userForm.value[key];
    key = 'password';
    const password = this.userForm.value[key];
    this.loggedUser = this.userService.login(username, password);
    if (this.loggedUser !== undefined) {
      console.log('Logged in successfully');
      this.error = '';
      this.r.navigateByUrl('products');
      localStorage.setItem('isLoggedIn', 'Yes');
      localStorage.setItem('username', username);
    }
    else {
      console.log('Log in failed.');
      this.error = this.translate.instant('login.notmatch');
    }
  }
}

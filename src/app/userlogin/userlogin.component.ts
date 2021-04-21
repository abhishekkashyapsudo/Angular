import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {UserService} from '../users/user-service.service'
@Component({
    templateUrl: "./userlogin.component.html"
})
export class UserloginComponent implements OnInit {
    userForm: FormGroup;
    error: String ="";
    loggedUser: User;
 
    constructor(public fb: FormBuilder, private userService: UserService, private readonly router: Router) { }

    ngOnInit() {
        this.userForm = this.fb.group({
            username: ["", [Validators.required, Validators.minLength(4)]],
            password: ["", [Validators.required, Validators.minLength(4)]],
            error:[""]
        });
    }

    login() {
      const username  = this.userForm.value['username'];
      const password  = this.userForm.value['password'];
      this.loggedUser = this.userService.login(username, password);
      if(this.loggedUser !== undefined){
        console.log("Logged in successfully");
        this.error = "";
        this.router.navigateByUrl("main-page");
        localStorage.setItem("isLoggedIn","Yes")
        localStorage.setItem("username",username);
      }
      else{
        console.log("Log in failed.");
        this.error = "Username/Password combination does not exist."
      }
    }
}
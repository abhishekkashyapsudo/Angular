import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../users/user-service.service'
import { MustMatch } from '../helpers/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  userForm: FormGroup;

  constructor(public fb: FormBuilder, private userService: UserService, private readonly router: Router) { }



  ngOnInit() {
    this.userForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(4)]],
      phoneNumber: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      name: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required, Validators.minLength(5)]],
      pin: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  register() {
    const username = this.userForm.value['username'];
    const password = this.userForm.value['password'];
    const phoneNumber = this.userForm.value['phoneNumber'];
    const name = this.userForm.value['name'];
    const email = this.userForm.value['email'];
    const address = this.userForm.value['address'];
    const pin = this.userForm.value['pin'];
    console.log(name, email);
  }
  redirectToLogin() {
    this.router.navigateByUrl("login");
  }

}

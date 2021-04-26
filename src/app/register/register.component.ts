import { Component, OnInit, Output, EventEmitter, ModuleWithProviders } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../users/user-service.service';
import { MustMatch } from '../helpers/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit{


  userForm: FormGroup;
  constructor(public fb: FormBuilder, private userService: UserService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6), Validators.maxLength(6)]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  register(): void {
    let key = 'username';
    const username = this.userForm.value[key];
    key = 'password';
    const password = this.userForm.value[key];
    key = 'phoneNumber';
    const phoneNumber = this.userForm.value[key];
    key = 'name';
    const name = this.userForm.value[key];
    key = 'email';
    const email = this.userForm.value[key];
    key = 'address';
    const address = this.userForm.value[key];
    key = 'pin';
    const pin = this.userForm.value[key];
    const user = new User(username, password, name, email, phoneNumber, address, pin);
    this.userService.addUser(user);
    this.userService.login(username, password);
    this.router.navigateByUrl('products');
    localStorage.setItem('isLoggedIn', 'Yes');
    localStorage.setItem('username', username);
  }

  redirectToLogin(): void {
    this.router.navigateByUrl('login');
  }
}

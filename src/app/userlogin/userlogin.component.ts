import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: "./userlogin.component.html"
})
export class UserloginComponent implements OnInit {
    pageTitle: string = "User Detail - Reactive";
    userForm: FormGroup;

    constructor(public fb: FormBuilder) { }

    ngOnInit() {
        this.userForm = this.fb.group({
            username: ["", [Validators.required, Validators.minLength(5)]],
            password: ["", [Validators.required, Validators.minLength(8)]],
            phoneNumber: [{ value: "", disabled: false }, Validators.required]
        });
    }

    save() {
    }
}
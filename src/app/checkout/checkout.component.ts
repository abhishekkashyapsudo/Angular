import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';
import { UserService } from '../users/user-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public title: string;
  public shipping: number;
  public gtotal: number;
  public cart: Map<Product, number>;
  public success: string;
  public address: string;
  public name: string;
  public state: string;
  public phone: string;


  userForm: FormGroup;

  constructor(public translate: TranslateService, public fb: FormBuilder, private productService: ProductService, private r: Router) {
    this.cart = new Map<Product, number>();
    if (localStorage.getItem('username')) {
      this.title = localStorage.getItem('username').toUpperCase() + '';
    }
    this.success = '';
    this.initCart();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      address1: ['', [Validators.required, Validators.minLength(5)]],
      address2: ['', [Validators.required, Validators.minLength(5)]],
      salutation: ['Mr.'],
      city: ['', [Validators.required, Validators.minLength(3)]],
      state: ['Himachal Pradesh'],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6), Validators.maxLength(6)]]
    });

  }

  initCart(): void {
    const map = this.productService.getCart();
    this.cart = new Map<Product, number>();
    this.shipping = map.size * 50;
    let total = 0;
    this.gtotal = this.shipping;
    map.forEach((value: number, key: string) => {
      const product = this.productService.getProductWithId(key);
      total += product.price * value;
      this.cart.set(product, value);
    });
    const tax = total * 0.18;
    this.gtotal += tax + total;
  }


  gotoProducts(): void {
    this.r.navigateByUrl('/products');
  }

  placeOrder(): void {
    let key = 'phone';
    const phone = this.userForm.value[key];
    key = 'name';
    const name = this.userForm.value[key];
    key = 'salutation';
    const salutation = this.userForm.value[key];
    key = 'address1';
    const address1 = this.userForm.value[key];
    key = 'address2';
    const address2 = this.userForm.value[key];
    key = 'pin';
    const pin = this.userForm.value[key];
    key = 'city';
    const city = this.userForm.value[key];
    key = 'state';
    const state = this.userForm.value[key];
    this.success = this.translate.instant('checkout.success');
    this.name = salutation + ' ' + name + ' ';
    this.address = address1 + ' ' + address2 + ' ';
    this.state = city + ', ' + state + ' ' + pin;
    this.phone = phone;
    this.productService.placeOrder();
    this.gtotal = 0;

  }

}

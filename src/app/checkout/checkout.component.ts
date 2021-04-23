import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../helpers/must-match.validator';
import { User } from '../models/user';
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
  
  constructor(public fb: FormBuilder, private userService: UserService, private productService: ProductService,private readonly router: Router) { 
    this.cart = new Map<Product, number>();
    if(localStorage.getItem('username'))
      this.title =  localStorage.getItem('username').toUpperCase() +" , Checkout and pay ";
    this.success = "";
    this.initCart();    
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      phone: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      name: ["", [Validators.required, Validators.minLength(5)]],
      address1: ["", [Validators.required, Validators.minLength(5)]],
      address2: ["", [Validators.required, Validators.minLength(5)]],
      salutation: ["Mr."],
      city: ["", [Validators.required, Validators.minLength(3)]],
      state: ["Himachal Pradesh"],
      pin: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]]
    });
    
  }

  initCart() {
    let map = this.productService.getCart();
    this.cart = new Map<Product, number>();
    this.shipping = map.size * 50;
    let total = 0;
    this.gtotal = this.shipping;
    map.forEach((value: number, key: string) => {
      let product = this.productService.getProductWithId(key);
      total += product.price * value;
      this.cart.set(product, value);
    });
    let tax = total * 0.18;
    this.gtotal += tax + total;
  }
  

  gotoProducts(){
    this.router.navigateByUrl("/products");
  }

  placeOrder(){
    
    const phone = this.userForm.value['phone'];
    const name = this.userForm.value['name'];
    const salutation = this.userForm.value['salutation'];
    const address1 = this.userForm.value['address1'];
    const address2 = this.userForm.value['address2'];
    const pin = this.userForm.value['pin']; 
    const city = this.userForm.value['city']; 
    const state = this.userForm.value['state']; 
    this.success = "Order placed successfully and will be delivered within 3 days at:";
    this.name = salutation+" "+name +" ";
    this.address = address1+" "+address2 +" ";
    this.state = city+", "+state +" "+pin;
    this.phone = phone;
    this.productService.placeOrder();
    this.gtotal = 0;
   
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public title: string;
  public total: number;
  public shipping: number;
  public tax: number;
  public gtotal: number;
  public _cart: Map<Product, number>;
  constructor(private readonly productService: ProductService) {
    this._cart = new Map<Product, number>();
    this.title = "Welcome to your Shopping cart, " + localStorage.getItem('username');
    console.log(this._cart);
  }

  get cart() {
    return this._cart;
  }
  set cart(c) {
    this._cart = c;
  }

  ngOnInit(): void {
    this.initCart();
  }

  increase(id: string){
    this.productService.increment(id);
    this.initCart();
  }

  decrease(id: string){
    this.productService.decrement(id);
    this.initCart();


  }

  removeProduct(product: Product) {
    
    this.productService.removeProduct(product.id);
    this.initCart();
  }

  initCart() {
    let map = this.productService.getCart();
    this.cart = new Map<Product, number>();
    this.shipping = map.size * 50;
    this.total = 0;
    this.gtotal = this.shipping;
    map.forEach((value: number, key: string) => {
      let product = this.productService.getProductWithId(key);
      this.total += product.price * value;
      this.cart.set(product, value);
    });
    this.tax = this.total * 0.18;
    this.gtotal += this.tax + this.total;
    this.cart = this._cart;
  }

}



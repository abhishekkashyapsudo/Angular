import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public title = '';
  public total: number;
  public shipping: number;
  public tax: number;
  public gtotal: number;
  public ucart: Map<Product, number>;
  constructor(private readonly productService: ProductService) {
    this.ucart = new Map<Product, number>();
    this.title = '' + localStorage.getItem('username');
  }

  initCart(): void {
    const map = this.productService.getCart();
    this.cart = new Map<Product, number>();
    this.shipping = map.size * 50;
    this.total = 0;
    this.gtotal = this.shipping;
    map.forEach((value: number, key: string) => {
      const product = this.productService.getProductWithId(key);
      this.total += product.price * value;
      this.cart.set(product, value);
    });
    this.tax = this.total * 0.18;
    this.gtotal += this.tax + this.total;
    this.cart = this.ucart;
  }

  get cart(): Map<Product, number> {
    return this.ucart;
  }
  set cart(c) {
    this.ucart = c;
  }

  ngOnInit(): void {
    this.initCart();
  }

  increase(product: Product): void {
    this.productService.increment(product.id, product.quantity);
    this.initCart();
  }

  decrease(id: string): void {
    this.productService.decrement(id);
    this.initCart();


  }

  removeProduct(product: Product): void {

    this.productService.removeProduct(product.id);
    this.initCart();
  }

}



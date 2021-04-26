import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  public static products: Product[];
  public static cart: Map<string, Map<string, number>>;
  private PRODUCT_BASE_URL = 'assets/templates';


  constructor(private readonly http: HttpClient) {
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    this.http.get<Product[]>(url).subscribe(data =>
      ProductService.products = data
    );

    ProductService.cart = new Map<string, Map<string, number>>();
  }



  getProductWithId(key: string): Product {
    return ProductService.products.filter(p => p.id === key)[0];
  }

  addToCart(product: Product): void {
    const userId = localStorage.getItem('username');
    const crt = this.getCartforUser(userId);
    if (crt.has(product.id)) {
      const value = crt.get(product.id);
      crt.set(product.id, value + 1);
    }
    else {
      crt.set(product.id, 1);
    }
    ProductService.cart.set(userId, crt);
  }

  placeOrder(): void {
    const userId = localStorage.getItem('username');
    ProductService.cart.set(userId, new Map<string, number>());
  }

  removeProduct(id: string): void {
    const userId = localStorage.getItem('username');
    const crt = this.getCartforUser(userId);
    if (crt.has(id)) {
      crt.delete(id);
    }
    ProductService.cart.set(userId, crt);
  }

  increment(id: string, quantity: number): void {
    const userId = localStorage.getItem('username');
    const crt = this.getCartforUser(userId);
    if (crt.get(id) !== quantity) {
      crt.set(id, crt.get(id) + 1);
    }
  }
  decrement(id: string): void {
    const userId = localStorage.getItem('username');
    const crt = this.getCartforUser(userId);
    if (crt.get(id) === 1) {
      this.removeProduct(id);
    }
    else {
      crt.set(id, crt.get(id) - 1);
    }
  }

  getCartforUser(userId: string): Map<string, number> {
    if (ProductService.cart.has(userId)) {
      return ProductService.cart.get(userId);
    }
    else {
      return new Map<string, number>();
    }
  }

  getCart(): Map<string, number> {
    const userId = localStorage.getItem('username');
    return this.getCartforUser(userId);
  }


  getProducts(): Observable<Product[]> {
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    return this.http.get<Product[]>(url);

  }

  getProduct(productId: string): Observable<Product> {
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    return this.http.get<Product[]>(url).pipe(
      map(reponse => reponse.filter((p: Product) => p.id === productId)[0])
    );
  }


}



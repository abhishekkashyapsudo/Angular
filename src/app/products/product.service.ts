import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  
  getProductWithId(key: string) {
    return ProductService.products.filter(p => p.id == key)[0];
  }
  

  private PRODUCT_BASE_URL = "assets/templates/"
  private static products: Product[];
  private static cart: Map<string, Map<string, number>>;

  constructor(private readonly http: HttpClient) {
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    this.http.get<Product[]>(url).subscribe(data =>
      ProductService.products = data
    )
    ProductService.cart = new Map<string, Map<string, number>>();
  }
  addToCart( product: Product){
    let userId = localStorage.getItem("username");
    let crt = this.getCartforUser(userId);
    if (crt.has(product.id)) {
      let value = crt.get(product.id);
      crt.set(product.id,value + 1);
    }
    else {
      crt.set(product.id,1);
    }  
    ProductService.cart.set(userId, crt);
  }

  placeOrder() {
    let userId = localStorage.getItem("username");
    ProductService.cart.set(userId, new Map<string, number>());
   }

  removeProduct(id: string) {
    let userId = localStorage.getItem("username");
    let crt = this.getCartforUser(userId);
    if (crt.has(id)) {
      crt.delete(id);
    }
    ProductService.cart.set(userId, crt); 
   }

   increment(id: string) {
    let userId = localStorage.getItem("username");
    let crt = this.getCartforUser(userId);
    crt.set(id, crt.get(id)+1);
  }
  decrement(id: string) {
    let userId = localStorage.getItem("username");
    let crt = this.getCartforUser(userId);
    if(crt.get(id) == 1){
      this.removeProduct(id);
    }
    else{
      crt.set(id, crt.get(id)-1);
    }
  }

  getCartforUser(userId: string) {
    if(ProductService.cart.has(userId)) {
      return ProductService.cart.get(userId);
    } 
    else{
      return new Map<string, number>();
    }
  }

  getCart():Map<string, number>{
    let userId = localStorage.getItem("username");
    return this.getCartforUser(userId);
  } 


  getProducts() : Observable<Product[]>{
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    return this.http.get<Product[]>(url);
     
  }

  getProduct(productId: string): Observable<Product> {
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    return this.http.get<Product[]>(url).pipe(
      map(reponse => reponse.filter((p: Product) => p.id == productId)[0])
    );
  }

  
}



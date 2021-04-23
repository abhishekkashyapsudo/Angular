import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  

  private PRODUCT_BASE_URL = "assets/templates/"
  private static products: Product[];

  constructor(private readonly http: HttpClient) {
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    this.http.get<Product[]>(url).subscribe(data =>
      ProductService.products = data
    )
  }



  getProducts() : Observable<Product[]>{
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    return this.http.get<Product[]>(url);
     
  }

  getProduct(productId: string): Observable<Product> {
    console.log(productId);
    const url = `${this.PRODUCT_BASE_URL}/products.json`;
    return this.http.get<Product[]>(url).pipe(
      map(reponse => reponse.filter((p: Product) => p.id == productId)[0])
    );
  }
 
}

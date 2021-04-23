import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  private products: Product[];
  userForm: FormGroup;
  public map: Map<string, Product[]>;
  public title: string = "List Of Products";
  public _search: string;
  constructor(public fb: FormBuilder,private readonly route: ActivatedRoute, private readonly router: Router) {
   
  }

  get search(){
    return this._search;
  }

  set search(value: string){
    this._search = value;
    if(this.search){
      this.map = new Map<string, Product[]>();

      this.products.filter(a => a.name.toLowerCase().indexOf(this.search) != -1).forEach(product => {
        
        if (this.map.has(product.category)) {
          let value = this.map.get(product.category);
          value.push(product);
          this.map.set(product.category,value);
        }
        else {
          this.map.set(product.category,[product]);
        }
      });
    }
    else{
      this.setMap();
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.products = data.products;
     
      this.setMap();
      
    });
  }
  setMap(){
    this.map = new Map<string, Product[]>();

      this.products.forEach(product => {
        
        if (this.map.has(product.category)) {
          let value = this.map.get(product.category);
          value.push(product);
          this.map.set(product.category,value);
        }
        else {
          this.map.set(product.category,[product]);
        }
      });
  }
  viewProduct(id: string){
    this.router.navigateByUrl("products/" + id)
  }
 

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly productService: ProductService) { }
  public product: Product;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.product;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  addToCart(product: Product){
    this.productService.addToCart(this.product)
    this.router.navigateByUrl("cartpage")

  }

}

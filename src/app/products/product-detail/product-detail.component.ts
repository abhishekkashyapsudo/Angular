import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute) { }
  public product: Product;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.product;
      console.log(data);
    });
  }

}

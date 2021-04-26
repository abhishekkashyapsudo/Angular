import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from './product';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = TestBed.inject(ProductService);
    localStorage.setItem('username', 'user');

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the products from json file', (() => {
    ProductService.products = [Product.fakePRoduct()];
    expect(ProductService.products.length).toEqual(1);
  }));

  it('should initialize the cart to empty map', () => {
    expect(ProductService.cart.size).toEqual(0);
  });

  it('getProductWithId  should return the product with the passed id', () => {
    ProductService.products = [Product.fakePRoduct()];

    expect(service.getProductWithId('L1000').name).toEqual('HP 15 15.6-inch HD Laptop');
  });

  it('addToCart  should add the passed product to cart of current user', () => {
    ProductService.products = [Product.fakePRoduct()];

    localStorage.setItem('username', 'user');
    const product = service.getProductWithId('L1000');
    service.addToCart(product);
    expect(ProductService.cart.get('user').size).toEqual(1);
    const map: Map<string, number> = ProductService.cart.get('user');
    expect(map.get('L1000')).toEqual(1);
  });

  it('placeOrder  should empty the  cart for current user', () => {
    ProductService.products = [Product.fakePRoduct()];

    localStorage.setItem('username', 'user');
    const product = service.getProductWithId('L1000');
    service.addToCart(product);
    expect(ProductService.cart.get('user').size).toEqual(1);
    const map: Map<string, number> = ProductService.cart.get('user');
    expect(map.get('L1000')).toEqual(1);
    service.placeOrder();
    expect(ProductService.cart.get('user').size).toEqual(0);

  });

  it('removeProduct  should remove the product with the passed id from user cart', () => {
    ProductService.products = [Product.fakePRoduct(), Product.fakePRoduct1()];

    localStorage.setItem('username', 'user');
    const product = service.getProductWithId('L1000');
    const product1 = service.getProductWithId('L1001');
    service.addToCart(product);
    service.addToCart(product1);
    expect(ProductService.cart.get('user').size).toEqual(2);
    const map: Map<string, number> = ProductService.cart.get('user');
    expect(map.get('L1000')).toEqual(1);
    service.removeProduct(product.id);
    expect(ProductService.cart.get('user').size).toEqual(1);

  });

  it('increment  should increase the product with the passed id for user cartby 1', () => {
    ProductService.products = [Product.fakePRoduct(), Product.fakePRoduct1()];

    localStorage.setItem('username', 'user');
    const product = service.getProductWithId('L1000');
    const product1 = service.getProductWithId('L1001');
    service.addToCart(product);
    service.addToCart(product1);
    expect(ProductService.cart.get('user').size).toEqual(2);
    const map: Map<string, number> = ProductService.cart.get('user');
    expect(map.get('L1000')).toEqual(1);
    service.increment('L1000', product.quantity);
    expect(map.get('L1000')).toEqual(2);
    service.increment('L1000', product.quantity);
    expect(map.get('L1000')).toEqual(3);
    service.increment('L1000', product.quantity);
    expect(map.get('L1000')).toEqual(4);
    service.increment('L1000', product.quantity);
    expect(map.get('L1000')).toEqual(5);
    service.increment('L1000', product.quantity);
    expect(map.get('L1000')).toEqual(5);


  });

  it('decrement  should decrease the product with the passed id for user cart by 1', () => {
    ProductService.products = [Product.fakePRoduct()];

    localStorage.setItem('username', 'user');
    const product = service.getProductWithId('L1000');
    service.addToCart(product);
    service.increment(product.id, product.quantity);
    expect(ProductService.cart.get('user').size).toEqual(1);
    const map: Map<string, number> = ProductService.cart.get('user');
    expect(map.get('L1000')).toEqual(2);
    service.decrement(product.id);
    expect(map.get('L1000')).toEqual(1);
    service.decrement(product.id);
    expect(map.get('L1000')).toEqual(undefined);



  });

  it('getcartForUser  should return the cart for current user', () => {
    ProductService.products = [Product.fakePRoduct()];

    localStorage.setItem('username', 'user');
    const product = service.getProductWithId('L1000');
    service.addToCart(product);
    service.increment(product.id, product.quantity);
    expect(ProductService.cart.get('user').size).toEqual(1);
    const map: Map<string, number> = service.getCartforUser('user');
    expect(map.get('L1000')).toEqual(2);
    service.decrement(product.id);
    expect(map.get('L1000')).toEqual(1);
    service.decrement(product.id);
    expect(map.get('L1000')).toEqual(undefined);

  });

  it('getcart  should return the cart for current user', (() => {
    ProductService.products = [Product.fakePRoduct()];
    localStorage.setItem('username', 'user');
    const product = service.getProductWithId('L1000');
    service.addToCart(product);
    service.increment(product.id, product.quantity);
    expect(ProductService.cart.get('user').size).toEqual(1);
    const map: Map<string, number> = ProductService.cart.get('user');
    expect(map.get('L1000')).toEqual(2);
    service.decrement(product.id);
    expect(map.get('L1000')).toEqual(1);
    service.decrement(product.id);
    expect(map.get('L1000')).toEqual(undefined);
  }));


});

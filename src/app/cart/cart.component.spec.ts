import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { range } from 'rxjs';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';

import { CartComponent } from './cart.component';


describe('CartComponent', () => {


  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [ProductService],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],

    })
      .compileComponents();
  });





  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('username', 'test')
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title 'Welcome to your Shopping cart,user!'`, async(() => {
    localStorage.setItem('username', 'user')
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.debugElement.componentInstance;
    expect(component.title).toEqual("Welcome to your Shopping cart, user");
  }));

  it(`should initialize the cart  with product and value`, async(() => {
    localStorage.setItem('username', 'nagp')
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.debugElement.componentInstance;
    let productService: ProductService = TestBed.get(ProductService);

    expect(23).toEqual(ProductService.products.length);
    let product = ProductService.products[0];
    productService.addToCart(product);
    productService.addToCart(product);
    productService.addToCart(product);
    component.initCart();
    expect(component.cart.size).toEqual(1);
    expect(component.cart.values().next().value).toEqual(3);
    expect(component.cart.keys().next().value.id).toEqual(ProductService.products[0].id);


  }));

  it(`increase should increase the value of product in cart by 1`, async(() => {
    localStorage.setItem('username', 'nagp')
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.debugElement.componentInstance;
    let productService: ProductService = TestBed.get(ProductService);

    expect(23).toEqual(ProductService.products.length);
    let product = ProductService.products[0];
    productService.addToCart(product);
    component.initCart();
    for (let i = 1; i < product.quantity; i++) {
      component.increase(product);
      expect(component.cart.values().next().value).toEqual(i + 1);
    }
  }));

  it(`increase should not increase the value of product if it is has already the avaiabe quantity`, async(() => {
    localStorage.setItem('username', 'nagp')
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.debugElement.componentInstance;
    let productService: ProductService = TestBed.get(ProductService);

    expect(23).toEqual(ProductService.products.length);
    let product = ProductService.products[0];
    productService.addToCart(product);
    component.initCart();
    for (let i = 1; i < product.quantity; i++) {
      component.increase(product);
      expect(component.cart.values().next().value).toEqual(i + 1);
    }
    component.increase(product);
    expect(component.cart.values().next().value).toEqual(product.quantity);
    component.increase(product);
    expect(component.cart.values().next().value).toEqual(product.quantity);
    component.increase(product);
    expect(component.cart.values().next().value).toEqual(product.quantity);
  }));

  it(`decrease should decrease the value of product in cart by 1`, async(() => {
    localStorage.setItem('username', 'nagp')
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.debugElement.componentInstance;
    let productService: ProductService = TestBed.get(ProductService);

    expect(23).toEqual(ProductService.products.length);
    let product = ProductService.products[0];
    productService.addToCart(product);
    productService.addToCart(product);
    component.initCart();
    expect(component.cart.values().next().value).toEqual(2);
    component.decrease(product.id);
    expect(component.cart.values().next().value).toEqual(1);
  }));

  it(`decrease should remove the product from cart if quantity becomes 0`, async(() => {
    localStorage.setItem('username', 'nagp')
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.debugElement.componentInstance;
    let productService: ProductService = TestBed.get(ProductService);

    expect(23).toEqual(ProductService.products.length);
    let product = ProductService.products[0];
    productService.addToCart(product);
    productService.addToCart(product);
    component.initCart();
    expect(component.cart.values().next().value).toEqual(2);
    component.decrease(product.id);
    expect(component.cart.values().next().value).toEqual(1);
    component.decrease(product.id);
    expect(component.cart.size).toEqual(0);

  }));

  it(`removeProduct should remove the product from cart`, async(() => {
    localStorage.setItem('username', 'nagp')
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.debugElement.componentInstance;
    let productService: ProductService = TestBed.get(ProductService);

    expect(23).toEqual(ProductService.products.length);
    let product = ProductService.products[0];
    productService.addToCart(product);
    productService.addToCart(product);
    component.initCart();
    expect(component.cart.values().next().value).toEqual(2);
    component.removeProduct(product);
    expect(component.cart.size).toEqual(0);
  }));
});

import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
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
    localStorage.setItem('username','test')
  });


it('should create', () => {
  expect(component).toBeTruthy();
});

it(`should have a title 'I love pizza!'`, async(() => {
  localStorage.setItem('username', 'test')
  fixture = TestBed.createComponent(CartComponent);
  component = fixture.debugElement.componentInstance;
  expect(component.title).toEqual("Welcome to your Shopping cart, test");
}));
});

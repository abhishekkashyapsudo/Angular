import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './layout/guards/auth.guard';
import { LoggedInGuard } from './layout/guards/logged-in.guard';
import { ProductsResolver } from './layout/resolver/products.resolver';
import { ProductResolver } from './layout/resolver/product.resolver';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: UserloginComponent, canActivate:[LoggedInGuard ]},
  { path: 'login', component: UserloginComponent,canActivate:[LoggedInGuard ] },
  { path: 'register', component: RegisterComponent,canActivate:[LoggedInGuard ] },
  { path: 'products', component: MainpageComponent, resolve:{
    products: ProductsResolver
  }},
  { path: 'products/:productId', component: ProductDetailComponent, resolve:{
    product: ProductResolver
  }},
  { path: '**', component: UserloginComponent, canActivate:[LoggedInGuard, AuthGuard ]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

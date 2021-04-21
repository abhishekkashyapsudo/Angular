import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './layout/guards/auth.guard';
import { LoggedInGuard } from './layout/guards/logged-in.guard';

const routes: Routes = [
  { path: '', component: UserloginComponent, canActivate:[LoggedInGuard ]},
  { path: 'login', component: UserloginComponent,canActivate:[LoggedInGuard ] },
  { path: 'register', component: RegisterComponent,canActivate:[LoggedInGuard ] },
  { path: 'main-page', component: MainpageComponent, canActivate:[AuthGuard ]},
  { path: '**', component: UserloginComponent, canActivate:[LoggedInGuard, AuthGuard ]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

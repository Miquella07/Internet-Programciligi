import { OdevlerComponent } from './components/odevler/odevler.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PanelComponent } from './components/panel/panel.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const redirectLogin = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'odevler', component: OdevlerComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectLogin }
 },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: PanelComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectLogin }
 },
  { path: '', component: HeaderComponent },
  { path: '', component: FooterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MenuComponent } from './menu/menu.component';
import { AlertComponent } from './Alert/alert.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EnvironmentUrlService } from './services/environment-url.service';
import { LoginComponent } from './Login/login/login.component';
import { RepositoryService } from './../repository/repository.service';
import { AlertService } from './services/alert.service';
import { RegisterComponent } from './Register/register/register.component';



@NgModule({
  imports:      [
     BrowserModule,
     HttpClientModule,
     FormsModule,
     ReactiveFormsModule,
     RouterModule.forRoot([
       {path:"Hello",component:HelloComponent},
       {path:"404", component:NotFoundComponent},
       {path:"Login", component:LoginComponent},
       {path:"Register", component:RegisterComponent},
       {path:'',redirectTo:'/',pathMatch:'full'},
       {path:'**',redirectTo:'/404',pathMatch:'full'}
       ])
   
      ],
  declarations: [ AppComponent, HelloComponent, MenuComponent, NotFoundComponent, LoginComponent, AlertComponent, RegisterComponent ],
  bootstrap:    [ AppComponent],
  providers: [EnvironmentUrlService,RepositoryService, AlertService]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { ERR404Component } from './Page/Error/err404/err404.component';
import { RootComponent } from "./root/root.component";

@NgModule({
  declarations: [
    AppComponent,
    ERR404Component,
    RootComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:"",component:AppComponent},
      {path:'**',component:ERR404Component}
    ])
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }

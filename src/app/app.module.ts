import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { ERR404Component } from './Page/Error/err404/err404.component';
import { RootComponent } from "./root/root.component";

import { IngredientComponent } from './Page/ingredient/ingredient.component';
import { HttpClientModule } from '@angular/common/http';


import { ModalCreateIngredientComponent } from './Component/modal-create-ingredient/modal-create-ingredient.component';


@NgModule({
  declarations: [
    AppComponent,
    ERR404Component,
    RootComponent,

    IngredientComponent,

    ModalCreateIngredientComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
      {path:"",component:AppComponent},
      {path:"ingredient",component:IngredientComponent},
      {path:'**',component:ERR404Component}

    ])
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }

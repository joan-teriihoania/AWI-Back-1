import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ERR404Component } from './Page/Error/err404/err404.component';
import { RootComponent } from "./root/root.component";

import { IngredientComponent } from './Page/ingredient/ingredient.component';
import { HttpClientModule } from '@angular/common/http';


import { ModalCreateIngredientComponent } from './Component/modal-create-ingredient/modal-create-ingredient.component';
import { AlertComponent } from './Component/alert/alert.component';
import { ModalCreateStepComponent } from './Component/modal-create-step/modal-create-step.component';
import { CreerRecetteComponent} from "./Page/recette/creer-recette/creer-recette.component";
import { AllergenComponent } from './Page/allergen/allergen.component';
import { ModalCreateCategoryComponent } from './Component/modal-create-category/modal-create-category.component';


@NgModule({
  declarations: [
    AppComponent,
    ERR404Component,
    RootComponent,
    IngredientComponent,
    ModalCreateIngredientComponent,
    AlertComponent,
    CreerRecetteComponent,
    ModalCreateStepComponent,
    AllergenComponent,
    ModalCreateCategoryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
      {path:"",component:AppComponent},
      {path:"creerRecette",component:CreerRecetteComponent},
      {path:"ingredient",component:IngredientComponent},
      {path:"allergen",component:AllergenComponent},
      {path:'**',component:ERR404Component}

    ])
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }

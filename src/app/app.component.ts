import {Component} from '@angular/core';

import {RecipeService} from "./Service/recipe.service";
import {Category} from "./class/category";
import {Etiquette} from "./class/etiquette";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  category:Array<Category>
  etiquetteArray:Array<Etiquette>
  filtre=new FormControl()
  constructor(private request:RecipeService) {
    this.category=request.getRCategory()
    this.etiquetteArray=request.getAllRecipe()
    console.log(this.etiquetteArray)
    this.filtre.valueChanges.subscribe(value => {
      this.etiquetteArray=this.request.getAllRecipe(value);
    })

  }


}

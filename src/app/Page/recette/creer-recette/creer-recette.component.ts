import { Component, OnInit } from '@angular/core';
import {IngredientService} from "../../../Service/ingredient.service";
import {Ingredient} from "../../../class/ingredient";

@Component({
  selector: 'app-creer-recette',
  templateUrl: './creer-recette.component.html',
  styleUrls: ['./creer-recette.component.css']
})
export class CreerRecetteComponent implements OnInit {
  ingredient:Array<Ingredient>

  constructor(private http:IngredientService) {
    this.ingredient=http.getAllIngredient();
  }

  ngOnInit(): void {
  }

  createIngredient(event:Ingredient){
    console.log(event)
    if(event.id==-1 || event.id==undefined){


    }else {
      this.ingredient.push(event);
    }

  }



}

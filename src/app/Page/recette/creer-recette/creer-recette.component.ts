import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../../../class/ingredient";
import {IngredientService} from "../../../Service/ingredient.service";

@Component({
  selector: 'app-creer-recette',
  templateUrl: './creer-recette.component.html',
  styleUrls: ['./creer-recette.component.css']
})
export class CreerRecetteComponent implements OnInit {
  liste:Array<Ingredient>;
  ingredientDonne:Array<Ingredient>;
  constructor(private http:IngredientService) {
    this.ingredientDonne=http.getAllIngredient();
    this.liste=new Array<Ingredient>()


  }

  ngOnInit(): void {
  }

  ajoutIngredient(){
    this.liste.push(new Ingredient(0,"test","test",0,0))
  }
  deleteIngredient(item:Ingredient){
    this.liste.splice(this.liste.indexOf(item),1)

  }

}

import {Component, OnInit} from '@angular/core';
import {IngredientService} from "../../Service/ingredient.service";
import {Ingredient} from "../../class/ingredient";
import {Category} from "../../class/category";




@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  category: Array<Category>;
  ingredient:Array<Ingredient>

  constructor(private request:IngredientService) {
    this.category=request.getIcategory();
    this.ingredient=request.getAllIngredient();


  }

  ngOnInit(): void {

  }
  add(event:Ingredient){
    this.ingredient.push(event);
  }
  delete(id:number|undefined){
    if(id==undefined){

    }else {
      this.request.delete(id).subscribe({
          error: (e) => console.error(e),
          complete:()=>{
            console.log("Suppresion "+id)
          }

        }
      )
    }

  }





}

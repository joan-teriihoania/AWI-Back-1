import {Component, OnInit} from '@angular/core';
import {IngredientService} from "../../Service/ingredient.service";
import {Ingredient} from "../../class/ingredient";
import {Category} from "../../class/category";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {timeout} from "rxjs";




@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],

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
    if(event.id==-1 || event.id==undefined){

    }else {
      this.ingredient.push(event);
    }

  }
  delete(item:Ingredient|undefined){
    if(item==undefined){

    }else {
      if(item.id==undefined){

      }else {
        this.request.delete(item.id).subscribe({
            error: (e) => {
              console.error(e)
            },
            complete:()=>{
              console.log("Suppresion "+item.id)
              this.ingredient.splice(this.ingredient.indexOf(item),1)
            }

          }
        )

      }

    }

  }





}

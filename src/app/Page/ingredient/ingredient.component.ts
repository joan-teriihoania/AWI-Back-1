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
  animations: [
    trigger('animation', [
      // ...
      state('show', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('show => hidden', [
        animate('1s')
      ]),
    ]),
  ],
})
export class IngredientComponent implements OnInit {
  category: Array<Category>;
  ingredient:Array<Ingredient>
  active:boolean;
  text:string;
  etat:string;


  constructor(private request:IngredientService) {
    this.category=request.getIcategory();
    this.ingredient=request.getAllIngredient();
    this.active=false;
    this.text="";
    this.etat="";


  }

  ngOnInit(): void {

  }
  add(event:Ingredient){
    this.ingredient.push(event);
  }
  errorAlert(){
    this.text="ça marche pas"
    this.etat="danger"
    this.active=true;
    setTimeout(() => this.active=false, 1000);

  }
  successAlert(){
    this.text="ça marche"
    this.etat="success"
    this.active=true;
    setTimeout(() => this.active=false, 1000);

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

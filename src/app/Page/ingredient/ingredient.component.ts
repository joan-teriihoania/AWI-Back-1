import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {IngredientService} from "../../Service/ingredient.service";
import {Ingredient} from "../../class/ingredient";
import {Category} from "../../class/category";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AlertComponent} from "../../Component/alert/alert.component";






@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
  animations:[
    trigger('outIngredient', [
    state('in', style({ transform: 'translateX(0)' })),

    transition('* => void', [
      animate(100, style({ transform: 'translateX(100%)' }))
    ]),

  ])
  ]

})
export class IngredientComponent implements OnInit {
  category: Array<Category>;
  ingredient:Array<Ingredient>;
  selectedIngredient:Ingredient|undefined;


  constructor(private request:IngredientService,public viewContainerRef: ViewContainerRef) {
    this.category=request.getIcategory();
    this.ingredient=request.getAllIngredient();


  }

  ngOnInit(): void {

  }

  addIngredient(event:Ingredient){
    this.ingredient.push(event);
  }
  addCategory(event:Category){
    this.category.push(event)
  }
  alert(text:string ,etat:string){
    this.viewContainerRef.clear();
    const alert=this.viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    alert.instance.etat=etat;
    alert.instance.text=text;

  }
  updateIngredient(item:Ingredient){
    this.selectedIngredient=item;
  }
  updateEmitIngredient(ingredient:Ingredient){
    this.ingredient=this.request.getAllIngredient();
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
              this.alert("L'ingrédient "+item.name+" a bien été supprimé","success")

            }

          }
        )

      }

    }

  }
}

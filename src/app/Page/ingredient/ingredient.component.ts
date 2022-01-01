import {Component, ViewContainerRef} from '@angular/core';
import {IngredientService} from "../../Service/ingredient.service";
import {Ingredient} from "../../class/ingredient";
import {Category} from "../../class/category";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AlertComponent} from "../../Component/alert/alert.component";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
  animations: [
    trigger('outIngredient', [
      state('in', style({transform: 'translateX(0)'})),

      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ]),

    ])
  ]

})
export class IngredientComponent {
  category: Array<Category>;
  ingredient: Array<Ingredient>;
  selectedIngredient: Ingredient | undefined;
  selectedCategory: Category | undefined;
  editMode = false;


  constructor(private request: IngredientService, public viewContainerRef: ViewContainerRef) {
    this.category = request.getIcategory();
    this.ingredient = request.getAllIngredient();


  }


  addIngredient(event: Ingredient) {
    this.ingredient.push(event);
  }

  addCategory(event: Category) {
    this.category.push(event)
  }

  alert(text: string, etat: string) {
    this.viewContainerRef.clear();
    const alert = this.viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    alert.instance.etat = etat;
    alert.instance.text = text;

  }

  updateIngredient(item: Ingredient) {
    this.selectedIngredient = item;
  }

  updateEmitIngredient(ingredient: Ingredient) {
    let ingre = this.ingredient.findIndex((value) => value.id == ingredient.id)
    if (ingre != undefined) {
      this.ingredient[ingre] = ingredient
    }

  }

  updateEmitCategory(event: Category) {

    let category = this.category.findIndex((value) => value.id == event.id)

    if (category != undefined) {
      this.category[category] = event
    }

  }

  updateCategory(event: Category) {
    this.selectedCategory = event;

  }

  deleteCategory(event: Category) {
    this.request.deleteCategory(event.id).subscribe({
      error: (err) => {
        if (err.status == 405) {
          this.alert("Erreur la catégorié contien des ingrédients", "danger")
        } else {
          this.alert("Erreur au niveau du back", "danger")
          console.log(err)
        }

      },
      complete: () => {
        this.category.splice(this.category.indexOf(event), 1)
        this.alert("Catégorie " + event.name + " a bien été supprimé", "success")

      }
    })

  }

  delete(item: Ingredient | undefined) {
    if (item == undefined) {
      console.log("Erorr ingredient not defined")
    } else {
      this.request.delete(item.id).subscribe({
          error: (err: HttpErrorResponse) => {
            if (err.status == 405) {
              this.alert("Erreur ingrédient présent dans d'autre étape", "danger")
            } else {
              this.alert("Erreur au niveau du back", "danger")
              console.log(err)
            }

          },
          complete: () => {
            this.ingredient.splice(this.ingredient.indexOf(item), 1)
            this.alert("L'ingrédient " + item.name + " a bien été supprimé", "success")

          }

        }
      )

    }

  }
}

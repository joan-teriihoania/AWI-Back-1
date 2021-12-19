import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Category} from "../../class/category";
import {AllergenService} from "../../Service/allergen.service";
import {Allergen} from "../../class/allergen";
import {AlertComponent} from "../../Component/alert/alert.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-allergen',
  templateUrl: './allergen.component.html',
  styleUrls: ['./allergen.component.css'],
  animations:[
    trigger('outIngredient', [
      state('in', style({ transform: 'translateX(0)' })),

      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ]),

    ])
  ]
})
export class AllergenComponent implements OnInit {

  category: Array<Category>;
  allergen:Array<Allergen>

  constructor(private request:AllergenService,public viewContainerRef: ViewContainerRef ) {
    this.category=request.getAcategory();
    this.allergen=request.getAllAllergen();



  }
  ngOnInit(): void {

  }

  modify(item:Allergen){

  }
  alert(text:string ,etat:string){
    this.viewContainerRef.clear();
    const alert=this.viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    alert.instance.etat=etat;
    alert.instance.text=text;

  }
  delete(item:Allergen){

    this.request.delete(item.id).subscribe({
        error: (e) => {
          console.error(e)
        },
        complete:()=> {
          console.log("Suppresion " + item.id)
          this.allergen.splice(this.allergen.indexOf(item), 1)
          this.alert("L'ingrédient " + item.name + " a bien été supprimé", "success")

        }

      }
    )
  }
  addC(category:Category){
    this.category.push(category)
  }
  addA(allergen:Allergen){
    this.allergen.push(allergen)
  }

}

import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {Category} from "../../class/category";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IngredientService} from "../../Service/ingredient.service";
import {Ingredient} from "../../class/ingredient";

import {Allergen} from "../../class/allergen";
import {AllergenService} from "../../Service/allergen.service";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-modal-create-ingredient',
  templateUrl: './modal-create-ingredient.component.html',
  styleUrls: ['./modal-create-ingredient.component.css'],
})
export class ModalCreateIngredientComponent implements OnInit {
  @Input()category: Array<Category>;
  @Output() newIngredient:EventEmitter<Ingredient>
  form:FormGroup;
  fb:FormBuilder;
  allergen:Array<Allergen>;
  liste:Array<number>;
  cpt=0;

  constructor(private requestI:IngredientService,private requestA:AllergenService,public viewContainerRef: ViewContainerRef) {
    this.category=requestI.getIcategory();
    this.allergen=requestA.getAllAllergen();
    this.liste=new Array<number>()
    this.fb=new FormBuilder()
    this.newIngredient=new EventEmitter<Ingredient>();
    this.form=this.fb.group({
      name:[""],
      unit:[""],
      unit_price:[""],
      id:[""]
    });

  }

  ngOnInit(): void {

  }
  ajoutAllergen(){
    this.form.addControl(this.cpt.toString(),new FormControl(""));
    this.form.addControl(this.cpt.toString()+"Q",new FormControl(""));
    this.liste.push(this.cpt)
    this.cpt++;
  }
  deleteAllergen(item:number){
    this.liste.splice(this.liste.indexOf(item),1)
    this.form.removeControl(item.toString())
    this.form.removeControl(item.toString()+"Q");
  }

  alert(text:string ,etat:string){
    this.viewContainerRef.clear();
    const alert=this.viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    alert.instance.etat=etat;
    alert.instance.text=text;

  }
  // TODO gérer l'ajouts d'Allergène
  validate(){
    var ingredient=new Ingredient(0,this.form.get("name")?.value,this.form.get("unit")?.value,this.form.get("unit_price")?.value,this.form.get("id")?.value);
    this.requestI.createIngredient(ingredient).subscribe({
      next: (res) => {
        ingredient.id=(res as {ID:number}).ID;
        this.alert("Ingrédient "+ingredient.name+" créer","success");
        this.newIngredient.emit(ingredient);
      },
      error: (e) => {
        console.error(e)
        this.alert("Erreur pour la création d'ingrédient","danger");

      }
    })
  }

}

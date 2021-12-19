import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {Category} from "../../class/category";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
export class ModalCreateIngredientComponent implements OnInit, OnChanges {
  @Input() category: Array<Category>;
  @Input() inputIngredient: Ingredient | undefined;
  @Input() updateModal:boolean=false;
  @Output() newIngredient: EventEmitter<Ingredient>

  fb: FormBuilder= new FormBuilder();
  form: FormGroup=this.fb.group({
    name: ["",[Validators.required]],
    unit: ["",[Validators.required]],
    unit_price: ["",[Validators.required]],
    stock: ["",[Validators.required]],
    id: ["",[Validators.required]],
    allergen: [""]
  });
  allergenList: Array<Allergen>;
  liste: Array<number>;
  cpt = 0;
  selectAllergen: FormControl;

  constructor(private requestI: IngredientService, private requestA: AllergenService, public viewContainerRef: ViewContainerRef) {
    this.category = requestI.getIcategory();
    this.allergenList = requestA.getAllAllergen();
    console.log(this.allergenList);
    this.selectAllergen = new FormControl();
    this.liste = new Array<number>()
    this.newIngredient = new EventEmitter<Ingredient>();

  }

  ngOnChanges(changes: SimpleChanges): void{
    if (this.inputIngredient != undefined) {
      this.form.get("name")?.setValue(this.inputIngredient.name)
      this.form.get("unit")?.setValue(this.inputIngredient.unit)
      this.form.get("unit_price")?.setValue(this.inputIngredient.unit_price)
      this.form.get("id")?.setValue(this.inputIngredient.id_category)
      this.form.get("stock")?.setValue(this.inputIngredient.stock)
      if(this.inputIngredient.allergen!=undefined){
        this.form.get("allergen")?.setValue(this.inputIngredient.allergen.id)
      }
      console.log(this.inputIngredient)
    }
  }

  ngOnInit(): void {

  }/*
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
  }*/

  alert(text:string ,etat:string){
    this.viewContainerRef.clear();
    const alert=this.viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    alert.instance.etat=etat;
    alert.instance.text=text;
  }
  // TODO gérer l'ajouts d'Allergène
  validate(){
    let allergenValue:Allergen|undefined=undefined;
    this.allergenList.forEach((allergen)=>{
      if(allergen.id==this.form.get("allergen")?.value){
        allergenValue=allergen
      }
    })
    var ingredient=new Ingredient(0,this.form.get("name")?.value,this.form.get("unit")?.value,this.form.get("unit_price")?.value,this.form.get("id")?.value,0,allergenValue);
    if(this.updateModal==false){
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
    }else {
      if (this.inputIngredient != undefined && this.inputIngredient.id!=undefined) {
        let ID=this.inputIngredient.id;
        this.requestI.updateIngredient(this.inputIngredient.id, ingredient).subscribe({
          error: (e) => {
            console.error(e)
            this.alert("Erreur pour la création d'ingrédient", "danger");


          },
          complete: () => {
            this.alert("Ingrédient " + ingredient.name + " mis à jour", "success");
            ingredient.id=ID;
            this.newIngredient.emit(ingredient);
          }
        })
      }
    }

  }

}

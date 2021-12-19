import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {Category} from "../../class/category";
import {Ingredient} from "../../class/ingredient";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Allergen} from "../../class/allergen";
import {IngredientService} from "../../Service/ingredient.service";
import {AllergenService} from "../../Service/allergen.service";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-modal-create-allergen',
  templateUrl: './modal-create-allergen.component.html',
  styleUrls: ['./modal-create-allergen.component.css']
})
export class ModalCreateAllergenComponent implements OnInit {
  @Input()category: Array<Category>;
  @Output() newAllergen:EventEmitter<Allergen>
  form:FormGroup;
  fb:FormBuilder;

  constructor(private requestA:AllergenService,public viewContainerRef: ViewContainerRef) {
    this.category=requestA.getAcategory();
    this.fb=new FormBuilder()
    this.newAllergen=new EventEmitter<Allergen>();
    this.form=this.fb.group({
      name:[""],
      id:[""]
    });

  }

  ngOnInit(): void {

  }


  alert(text:string ,etat:string){
    this.viewContainerRef.clear();
    const alert=this.viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    alert.instance.etat=etat;
    alert.instance.text=text;

  }
  validate(){
    var allergen=new Allergen(0,this.form.get("name")?.value,this.form.get("id")?.value);
    this.requestA.createAllergen(allergen).subscribe({
      next: (res) => {
        allergen.id=(res as {ID:number}).ID;
        this.alert("Allergène "+allergen.name+" créer","success");
        this.newAllergen.emit(allergen);
      },
      error: (e) => {
        console.error(e)
        this.alert("Erreur pour la création d'allergène","danger");

      }
    })
  }

}

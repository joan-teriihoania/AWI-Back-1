import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category} from "../../class/category";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IngredientService} from "../../Service/ingredient.service";
import {Ingredient} from "../../class/ingredient";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-modal-create-ingredient',
  templateUrl: './modal-create-ingredient.component.html',
  styleUrls: ['./modal-create-ingredient.component.css'],
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
export class ModalCreateIngredientComponent implements OnInit {
  @Output() newIngredient:EventEmitter<Ingredient>
  category: Array<Category>;
  form:FormGroup;
  fb:FormBuilder;
  active:boolean;
  text:string;
  etat:string;


  constructor(private request:IngredientService) {
    this.category=request.getIcategory();
    this.fb=new FormBuilder()
    this.newIngredient=new EventEmitter<Ingredient>();
    this.form=this.fb.group({
      name:[""],
      unit:[""],
      unit_price:[""],
      id:[""]
    });

    this.active=false;
    this.text="";
    this.etat="";

  }

  ngOnInit(): void {

  }
  alert(text:string ,etat:string){
    this.text=text;
    this.etat=etat;
    this.active=true;
    setTimeout(() => this.active=false, 1000);

  }
  validate(){
    var ingre=new Ingredient(0,this.form.get("name")?.value,this.form.get("unit")?.value,this.form.get("unit_price")?.value,this.form.get("id")?.value);
    this.request.createIngredient(ingre).subscribe({
      next: (res) => {
        ingre.id=(res as {ID:number}).ID;
        this.alert("Ingrédient "+ingre.name+" créer","success");
        this.newIngredient.emit(ingre);
      },
      error: (e) => {
        console.error(e)
        ingre.id=-1;
        this.alert("Erreur pour la création d'ingrédient","danger");
        this.newIngredient.emit(ingre);
      }
    })
  }

}

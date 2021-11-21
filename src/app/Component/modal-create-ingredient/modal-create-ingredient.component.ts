import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category} from "../../class/category";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IngredientService} from "../../Service/ingredient.service";
import {Ingredient} from "../../class/ingredient";

@Component({
  selector: 'app-modal-create-ingredient',
  templateUrl: './modal-create-ingredient.component.html',
  styleUrls: ['./modal-create-ingredient.component.css']
})
export class ModalCreateIngredientComponent implements OnInit {
  @Output() newIngredient:EventEmitter<Ingredient>
  category: Array<Category>;
  form:FormGroup;
  fb:FormBuilder;

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

  }

  ngOnInit(): void {

  }
  validate(){
    var ingre=new Ingredient(0,this.form.get("name")?.value,this.form.get("unit")?.value,this.form.get("unit_price")?.value,this.form.get("id")?.value);
    this.request.createIngredient(ingre);
    this.newIngredient.emit(ingre);
  }

}

import {Component, EventEmitter, Input, Output, ViewContainerRef} from '@angular/core';
import {Category} from "../../class/category";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IngredientService} from "../../Service/ingredient.service";
import {AllergenService} from "../../Service/allergen.service";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-modal-create-category',
  templateUrl: './modal-create-category.component.html',
  styleUrls: ['./modal-create-category.component.css']
})
export class ModalCreateCategoryComponent {
  @Input()type="None"
  @Output() newCategory:EventEmitter<Category>
  form:FormGroup;
  fb:FormBuilder;

  constructor(private iHttp:IngredientService,private aHttp:AllergenService,public viewContainerRef: ViewContainerRef) {
    this.fb=new FormBuilder()
    this.newCategory=new EventEmitter<Category>();
    this.form=this.fb.group({
      name:[""],
      url:[""],
    });

  }
  alert(text:string ,etat:string){
    this.viewContainerRef.clear();
    const alert=this.viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    alert.instance.etat=etat;
    alert.instance.text=text;

  }

  validate(){

    var category=new Category(0,this.form.get("name")?.value,this.form.get("url")?.value);
    if(this.type=="Ingrédient"){
      this.iHttp.createCategory(category).subscribe({
        next: (res) => {
          category.id=(res as {ID:number}).ID;
          this.alert("Ingrédient "+category.name+" créer","success");
          this.newCategory.emit(category);
        },
        error: (e) => {
          console.error(e)
          this.alert("Erreur pour la création d'ingrédient","danger");
        }
      })
    }else if(this.type=="Allergène"){
      this.aHttp.createCategory(category).subscribe({
        next: (res) => {
          category.id=(res as {ID:number}).ID;
          this.alert("Ingrédient "+category.name+" créer","success");
          this.newCategory.emit(category);
        },
        error: (e) => {
          console.error(e)
          this.alert("Erreur pour la création d'ingrédient","danger");
        }
      })
    }else {}

  }

}

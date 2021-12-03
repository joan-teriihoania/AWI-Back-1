import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../class/ingredient";
import {IngredientService} from "../../Service/ingredient.service";
import {Category} from "../../class/category";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {StepService} from "../../Service/step.service";

@Component({
  selector: 'app-modal-create-step',
  templateUrl: './modal-create-step.component.html',
  styleUrls: ['./modal-create-step.component.css'],
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
export class ModalCreateStepComponent implements OnInit {
  @Input() ingredientDonne:Array<Ingredient>|undefined;
  liste:Array<number>;
  cpt:number;
  i_Category:Array<Category>;
  active:boolean;
  text:string;
  etat:string;
  form:FormGroup;
  fb:FormBuilder;

  constructor(private requestI:IngredientService,private requestS:StepService ) {
    this.fb=new FormBuilder()
    this.form=this.fb.group({
      name:[""],
      description:[""],
      duration:[""],

    });



    this.i_Category=requestI.getIcategory()
    this.liste=new Array<number>()
    this.active=false;
    this.text="";
    this.etat="";
    this.cpt=0;
  }

  ngOnInit(): void {
  }
  alert(text:string ,etat:string){
    this.text=text;
    this.etat=etat;
    this.active=true;
    setTimeout(() => this.active=false, 1000);
  }
  ajoutIngredient(){
    this.form.addControl(this.cpt.toString(),new FormControl(""));
    this.form.addControl(this.cpt.toString()+"Q",new FormControl(""));
    this.liste.push(this.cpt)
    this.cpt++;
  }
  deleteIngredient(item:number){
    this.liste.splice(this.liste.indexOf(item),1)
    this.form.removeControl(item.toString())
    this.form.removeControl(item.toString()+"Q");
  }
  validate() {
    console.log("Reussi");

  }

}

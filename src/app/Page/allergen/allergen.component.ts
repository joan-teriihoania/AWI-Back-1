import { Component, OnInit } from '@angular/core';
import {Category} from "../../class/category";
import {AllergenService} from "../../Service/allergen.service";
import {Allergen} from "../../class/allergen";

@Component({
  selector: 'app-allergen',
  templateUrl: './allergen.component.html',
  styleUrls: ['./allergen.component.css']
})
export class AllergenComponent implements OnInit {

  category: Array<Category>;
  allergen:Array<Allergen>

  constructor(private request:AllergenService) {
    this.category=request.getAcategory();
    this.allergen=request.getAll();



  }
  ngOnInit(): void {

  }
  add(event:Allergen){
    if(event.id==-1 || event.id==undefined){

    }else {
      this.allergen.push(event);
    }
  }
  delete(item:Allergen|undefined){
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
              this.allergen.splice(this.allergen.indexOf(item),1)
            }

          }
        )

      }

    }

  }

}

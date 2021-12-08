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
    this.allergen=request.getAllAllergen();



  }
  ngOnInit(): void {

  }

  modify(item:Allergen){

  }
  delete(item:Allergen){

  }
  add(category:Category){
    this.category.push(category)
  }

}

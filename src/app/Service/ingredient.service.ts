import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Ingredient} from "../class/ingredient";
import {Category} from "../class/category";
import {Observable} from "rxjs";




@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  constructor(private http: HttpClient) {

  }
  getAllIngredient(){
    let allIngredient = this.http.get<any>("http://localhost:8080/getIngredient", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
    let res: Array<Ingredient>=new Array<Ingredient>();
    allIngredient.subscribe({
      next: (data) => {
        console.log(data);
        for(let d of data){
          res.push(new Ingredient(d.ID_INGREDIENT,d.NAME,d.UNIT,d.UNIT_PRICE,d.ID_Category));

        }
      },
      error: (e) => console.error(e)
    })
    return res;
  }
  createIngredient(ingredient:Ingredient):number{
    let data={
      NAME:ingredient.name,
      UNIT:ingredient.unit,
      UNIT_PRICE:ingredient.unit_price,
      ID_Category:ingredient.id_category
    }
    console.log(data);
    let salut={ID:-1};
    this.http.post("http://localhost:8080/createIngredient",data,this.httpOptions).subscribe({
      next:(res)=>{
        salut=res as {ID:number};
      },
      error: (e) => {
        console.error(e)
      }
      }
    )
    return salut.ID;
  }
  getIcategory(){
    let category = this.http.get<any>("http://localhost:8080/getICategory", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
    let res: Array<Category>=new Array<Category>();
    category.subscribe({
      next: (data) => {
        console.log(data);
        for(let d of data){
          res.push(new Category(d.ID_Category,d.NAME));

        }
      },
      error: (e) => console.error(e)
    })
    return res;
  }
  delete(id:number):Observable<any>{
    let data={
      ID:id,
    }
    return this.http.post("http://localhost:8080/deleteIngredient",data,this.httpOptions)

  }
}

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
    let allIngredient = this.http.get<any>("http://localhost:8080/ingredient/getIngredient", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
    let res: Array<Ingredient>=new Array<Ingredient>();
    console.log("test")
    allIngredient.subscribe({
      next: (data) => {
        for(let d of data){
          console.log("test2")
          res.push(new Ingredient(d.ID_INGREDIENT,d.NAME,d.UNIT,d.UNIT_PRICE,d.ID_Category));

        }
      },
      error: (e) => console.error(e)
    })
    return res;
  }
  createIngredient(ingredient:Ingredient):Observable<any>{
    let data={
      NAME:ingredient.name,
      UNIT:ingredient.unit,
      UNIT_PRICE:ingredient.unit_price,
      ID_Category:ingredient.id_category
    }
    return this.http.post("http://localhost:8080/ingredient/createIngredient",data,this.httpOptions);



  }
  getIcategory(){
    let category = this.http.get<any>("http://localhost:8080/category/getICategory", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
    let res: Array<Category>=new Array<Category>();
    category.subscribe({
      next: (data) => {
        for(let d of data){
          res.push(new Category(d.ID_Category,d.NAME,d.URL));

        }
      },
      error: (e) => console.error(e)
    })
    return res;
  }
  getAllergen(){
    let category = this.http.get<Array<{ID_INGREDIENT:number,ID_ALLERGEN:Array<number>}>>("http://localhost:8080/ingredient/getAllergen", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
    let res: Array<{ID_INGREDIENT:number,ID_ALLERGEN:Array<number>}>=new Array<{ID_INGREDIENT: number; ID_ALLERGEN: Array<number>}>();
    category.subscribe({
      next: (data) => {
        res=data;
      },
      error: (e) => console.error(e)
    })
    return res;
  }
  delete(id:number):Observable<any>{
    let data={
      ID:id,
    }
    return this.http.post("http://localhost:8080/ingredient/deleteIngredient",data,this.httpOptions)
  }
  createCategory(category:Category):Observable<any>{
    let data={
      NAME:category.name,
      URL:category.url,
    }
    return this.http.post("http://localhost:8080/category/createICategory",data,this.httpOptions);
  }
}

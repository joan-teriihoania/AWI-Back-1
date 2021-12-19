import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../class/category";
import {Allergen} from "../class/allergen";

@Injectable({
  providedIn: 'root'
})
export class AllergenService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  constructor(private http: HttpClient) {

  }
  //TODO à compléter
  getAllAllergen(){
    let allAllergen = this.http.get<any>("http://localhost:8080/allergen/getAll", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
    let res: Array<Allergen>=new Array<Allergen>();
    allAllergen.subscribe({
      next: (data) => {
        for(let d of data){
          res.push(new Allergen(d.ID_ALLERGEN,d.NAME,d.ID_Category));
        }
      },
      error: (e) => console.error(e)
    })
    return res;
  }

  createAllergen(allergen:Allergen):Observable<any>{
    let data={
      NAME:allergen.name,
      ID_Category: allergen.id_category
    }
    return this.http.post("http://localhost:8080/allergen/createAllergen",data,this.httpOptions);
  }


  createCategory(category:Category):Observable<any>{
    let data={
      NAME:category.name,
      URL:category.url,
    }
    return this.http.post("http://localhost:8080/category/createACategory",data,this.httpOptions);
  }


  //TODO à compléter
  delete(id:number):Observable<any>{
    let data={
      ID:id,
    }
    return this.http.post("http://localhost:8080/allergen/deleteAllergen",data,this.httpOptions)
  }
  //TODO à compléter
  getAcategory(){
    let category = this.http.get<any>("http://localhost:8080/category/getACategory", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
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
}




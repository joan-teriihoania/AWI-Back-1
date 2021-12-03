import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Step} from "../class/step";
import {Ingredient} from "../class/ingredient";

@Injectable({
  providedIn: 'root'
})
export class StepService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {

  }
  createStep(step:Step){
    var data={
      NAME:step.name,
      DESCRIPTION:step.description,
      DURATION:step.duration,
      INGREDIENT:([] as Array<{ID:number|null,QUANTITY:number|null}>)
    }
    step.ingredient?.forEach((value, key) => {
      data.INGREDIENT.push({
        ID:key.id,
        QUANTITY:value,
      });
    })
    console.log(data);

    return this.http.post("http://localhost:8080/ingredient/createIngredient",data,this.httpOptions);

  }
  //TODO à Finir
  getAllStep(){
    let allStep = this.http.get<any>("http://localhost:8080/step/getStep", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
    let res: Array<Step>=new Array<Step>();
    allStep.subscribe({
      next: (data) => {
        for(let d of data){
          res.push(new Step(d.ID_INGREDIENT,d.NAME,d.UNIT,d.UNIT_PRICE,d.ID_Category));

        }
      },
      error: (e) => console.error(e)
    })
    return res;
  }

}

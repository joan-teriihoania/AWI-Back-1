import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ConstantCostService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) {

  }

  setCost(coutFluide:number,coutPersonnel:number,coutAssaisonnement:number,type:boolean){

    var data = {
      COUT_FLUIDE:coutFluide ,
      COUT_PERSONNEL: coutPersonnel,
      COUT_ASSAISONEMENT: coutAssaisonnement,
      ISPERCENT:type,
    }

    return this.http.post("http://localhost:8080/recipe/setCost", data, this.httpOptions);

  }
  getCost(){
    return this.http.get<{
      COUT_FLUIDE:number ,
      COUT_PERSONNEL: number,
      COUT_ASSAISONNEMENT: number,
      ISPERCENT:boolean,
    }>("http://localhost:8080/recipe/getCost", {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),observe: 'body', responseType: 'json'})
  }
}

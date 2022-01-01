import {Step} from "./step";

export interface Stepable {
  id:number;
  getStep():Array<Step>;
  getType():string;
  getCoutIngredient(nbTable:number):number
  getTotalDuration():number
}

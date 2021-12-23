import {Ingredient} from "./ingredient";

export class Step {
  public id:number;
  public name:string;
  public description:string;
  public duration:number;
  public ingredient:Map<Ingredient,number>|Map<number,number>;


  constructor(id: number,name:string, description: string , duration: number , ingredient: Map<Ingredient,number>|Map<number,number>) {
    this.id = id;
    this.name=name;
    this.description = description;
    this.duration = duration;
    this.ingredient = ingredient;
  }
}

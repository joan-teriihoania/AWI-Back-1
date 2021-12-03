import {Ingredient} from "./ingredient";

export class Step {
  public id:number|null;
  public name:string|null;
  public description:string|null;
  public duration:number|null;
  public ingredient:Map<Ingredient,number>|null;


  constructor(id: number | null,name:string|null, description: string | null, duration: number | null, ingredient: Map<Ingredient, number> | null) {
    this.id = id;
    this.name=name;
    this.description = description;
    this.duration = duration;
    this.ingredient = ingredient;
  }
}

import {Allergen} from "./allergen";

export class Ingredient {
  public id:number;
  public name:string;
  public unit:string;
  public unit_price:number;
  public id_category:number;
  public allergen: Array<Allergen> | undefined;


  constructor(id: number, name: string , unit: string, unit_price: number , id_category: number,allergen?:Array<Allergen>) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.unit_price = unit_price;
    this.id_category = id_category;
    this.allergen=allergen;
  }
}

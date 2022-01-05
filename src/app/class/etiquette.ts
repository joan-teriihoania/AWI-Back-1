import {Ingredient} from "./ingredient";

export class Etiquette {
  id:number;
  name:string;
  author:string;
  id_category:number;
  ingredient:Array<Ingredient>

  constructor(id: number, name: string, author: string, id_category: number, ingredient: Array<Ingredient>) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.id_category = id_category;
    this.ingredient = ingredient;
  }
}

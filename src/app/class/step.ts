import {Ingredient} from "./ingredient";
import {Stepable} from "./stepable";

export class Step implements Stepable{
  public id:number;
  public name:string;
  public description:string;
  public duration:number;
  public ingredient:Map<Ingredient,number>;


  constructor(id: number,name:string, description: string , duration: number , ingredient: Map<Ingredient,number>) {
    this.id = id;
    this.name=name;
    this.description = description;
    this.duration = duration;
    this.ingredient = ingredient;
  }
  getStep(): Array<Step> {
    return new Array<Step>(this);
  }
  getType(): string {
    return "Step"
  }

  getTime():string{
    if(this.duration>=60){
      if(this.duration%60<10){
        return Math.floor(this.duration/60)+"h0"+this.duration%60+"m"
      }else {
        return Math.floor(this.duration / 60) + "h" + this.duration % 60 + "m"
      }
    }else {
      if(this.duration<10){
        return "0"+this.duration+"m"
      }else {
        return this.duration+"m"
      }

    }
  }
  getCoutIngredient(nombre:number):number{
    let sum=0;
    this.ingredient.forEach((value, key) => {
      sum+=value*key.unit_price*nombre

    })
    return sum;
  }
  getTotalDuration(): number {
    return this.duration
  }
}

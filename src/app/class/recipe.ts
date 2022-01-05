import {Step} from "./step";
import {Stepable} from "./stepable";

export class Recipe implements Stepable{
  id: number;
  name: string;
  nb_couvert: number;
  cout_assaisonnement: number;
  coutAssaisonnementIsPercent: boolean;
  author: string;
  id_category: number;
  step: Map<number, Stepable>


  constructor(id: number, name: string, nb_couvert: number, cout_assaisonnement: number, coutAssaisonnementIsPercent: boolean, author: string, id_category: number, step: Map<number, Step>) {
    this.id = id;
    this.name = name;
    this.nb_couvert = nb_couvert;
    this.cout_assaisonnement = cout_assaisonnement;
    this.coutAssaisonnementIsPercent = coutAssaisonnementIsPercent;
    this.author = author;
    this.id_category = id_category;
    this.step = step;
  }
  getStep(): Array<Step> {
    let array=new Array<Step>()
    if(this.step==undefined){
      return array
    }
    this.step.forEach(((value) => {
      array=array.concat(value.getStep())
    }))
    return array;
  }
  getType(): string {
    return "Recipe"
  }
  getCoutIngredient(nbTable:number):number{
    let sum=0;
    if(this.step==undefined){
      return sum
    }
    this.step.forEach((value) => {
      sum+=value.getCoutIngredient(nbTable)
    })
    return sum

  }
  getTotalDuration(): number {
    let sum=0;
    if(this.step==undefined){
      return sum
    }
    this.step.forEach((value) => {
      sum+=value.getTotalDuration();
    })
    return sum
  }
  stockAvailableForRecipe(nbCouvert:number):boolean{
    let step=this.getStep();
    let result=true;
    for(let i = 0;i<step.length && result;i++){
      step[i].ingredient.forEach((value, key) => {
        if(key.stock<value*nbCouvert){
          result=false;
        }
      })
    }
      return result;
  }


}

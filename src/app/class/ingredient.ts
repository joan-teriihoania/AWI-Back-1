export class Ingredient {
  public id:number|undefined;
  public name:string|undefined;
  public unit:string|undefined;
  public unit_price:number|undefined;
  public id_category:number|undefined;


  constructor(id: number | undefined, name: string | undefined, unit: string | undefined, unit_price: number | undefined,id_category:number|undefined) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.unit_price = unit_price;
    this.id_category=id_category;
  }
}

export class Ingredient {
  public id:number|null;
  public name:string|null;
  public unit:string|null;
  public unit_price:number|null;
  public id_category:number|null;


  constructor(id: number | null, name: string | null, unit: string | null, unit_price: number | null, id_category: number | null) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.unit_price = unit_price;
    this.id_category = id_category;
  }
}

export class Allergen {
  id:number|null;
  name:string|null;
  ID_Category:number|null;
  icon:string|null;

  constructor(id: number | null, name: string | null, ID_Category: number | null, icon: string | null) {
    this.id = id;
    this.name = name;
    this.ID_Category = ID_Category;
    this.icon = icon;
  }
}

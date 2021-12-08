export class Allergen {
  id:number;
  name:string;
  id_category:number;

  constructor(id: number , name: string ,id_category:number) {
    this.id = id;
    this.name = name;
    this.id_category=id_category;
  }
}

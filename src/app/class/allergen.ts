export class Allergen {
  id:number;
  name:string;
  id_category:number;
  url:string;

  constructor(id: number , name: string ,id_category:number,url?:string) {
    this.id = id;
    this.name = name;
    this.id_category=id_category;
    if(url){
      this.url=url
    }else {
      this.url=""
    }
  }
}


export class DefaultConstant{
  COUT_FLUIDE:number ;
  COUT_PERSONNEL: number;
  COUT_ASSAISONNEMENT: number;
  ISPERCENT:boolean;

  constructor(COUT_FLUIDE: number, COUT_PERSONNEL: number, COUT_ASSAISONNEMENT: number, ISPERCENT: boolean) {

    this.COUT_FLUIDE = COUT_FLUIDE;
    this.COUT_PERSONNEL = COUT_PERSONNEL;
    this.COUT_ASSAISONNEMENT = COUT_ASSAISONNEMENT;
    this.ISPERCENT = ISPERCENT;
  }

}

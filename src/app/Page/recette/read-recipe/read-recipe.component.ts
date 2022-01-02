import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../../../class/recipe";
import {RecipeService} from "../../../Service/recipe.service";
import {FormControl} from "@angular/forms";
import {ConstantCostService} from "../../../Service/constant-cost.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../Component/confirm-dialog/confirm-dialog.component";
import {AlertComponent} from "../../../Component/alert/alert.component";

@Component({
  selector: 'app-read-recipe',
  templateUrl: './read-recipe.component.html',
  styleUrls: ['./read-recipe.component.css']
})
export class ReadRecipeComponent implements OnInit {
  id:null|number;
  recipe:Recipe|undefined;
  nbCouvert=new FormControl()
  coutAssaisnment=new FormControl()
  marge=new FormControl()
  chargeCost=new FormControl()
  typeAssaisonement=new FormControl()
  printCost=new FormControl()
  cout_fluide:number
  cout_personnel:number



  constructor(private route: ActivatedRoute,private router:Router,private request:RecipeService,private cost:ConstantCostService,private dialogRef:MatDialog,private view:ViewContainerRef) {
    this.id=null;
    this.cout_fluide=0
    this.cout_personnel=0
    cost.getCost().subscribe({
      next:(d)=>{
        this.cout_fluide=d.COUT_FLUIDE
        this.cout_personnel=d.COUT_PERSONNEL

      }
    })
  }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));

    if(this.id!=null){
      this.request.getRecipeById(this.id).then(value => {
        this.recipe=value;
        this.nbCouvert.setValue(this.recipe.nb_couvert)
        this.coutAssaisnment.setValue(this.recipe.cout_assaisonnement)
        this.typeAssaisonement.setValue(this.recipe.coutAssaisonnementIsPercent)
        console.log(this.recipe)
      })
    }
  }

  getCoutMatiere(item:number=this.nbCouvert.value):number{
    if (this.recipe!=undefined){
      if(this.typeAssaisonement.value) {
        return this.convertNumber(this.recipe.getCoutIngredient(item) * (this.coutAssaisnment.value + 100) / 100,2)
      }
      else {
        return this.convertNumber(this.recipe.getCoutIngredient(item) + this.coutAssaisnment.value,2)
      }
    }else {
      return 0;
    }
  }
  convertNumber(item:number,decimal:number){
    return Number(item.toFixed(decimal))
  }

  getCoutPersonnel(){
    if(this.recipe!=undefined && this.chargeCost.value){
      return this.convertNumber(this.recipe.getTotalDuration()/60*this.cout_personnel,2)
    }else{
      return 0
    }
  }
  getCoutFluide(){
    if(this.recipe!=undefined && this.chargeCost.value){
      return this.convertNumber((this.recipe.getTotalDuration()/60*this.cout_fluide),2)
    }else{
      return 0
    }
  }
  getVente(){
    return this.convertNumber((this.getCoutMatiere()+this.getCoutFluide()+this.getCoutPersonnel())*this.marge.value,2)
  }
  getBenefice(){
    return this.getVente()/1.1 -(this.getCoutMatiere()+this.getCoutFluide()+this.getCoutPersonnel())
  }
  getSeuil(){
    if(this.marge.value>1 && this.chargeCost.value){
      return this.getCoutMatiere(1)/(this.getCoutFluide()+this.getCoutPersonnel())
    }else{
      return "Impossible à calculer"
    }

  }
  delete(){
    let dialog=this.dialogRef.open(ConfirmDialogComponent,{
      width:'25%',
      data:"Voulez-vous supprimer "+this.recipe!.name+"?",
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        if (this.recipe != undefined) {
          this.request.deleteRecipe(this.recipe.id).subscribe({
            next:(err)=>{
              let text=""
              for (let item of err){
                text+=item.NAME+" "
              }
              AlertComponent.alert("Erreur la recette est utilisé dans les recettes "+text, "danger", this.view)
            },
            error: (err) => {
              console.log(err)
              AlertComponent.alert("Erreur dans la suppresion", "danger", this.view)
            },
            complete: () => {
              this.router.navigate(['/'])
            }
          })
        }
      }
    })
  }
  changeCost(event:{COUT_PERSONNEL:number,COUT_FLUIDE:number}){
    this.cout_fluide=event.COUT_FLUIDE;
    this.cout_personnel=event.COUT_PERSONNEL;
  }

}


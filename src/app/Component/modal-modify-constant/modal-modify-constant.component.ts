import {Component, EventEmitter, Output, ViewContainerRef} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ConstantCostService} from "../../Service/constant-cost.service";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-modal-modify-constant',
  templateUrl: './modal-modify-constant.component.html',
  styleUrls: ['./modal-modify-constant.component.css']
})
export class ModalModifyConstantComponent {
  @Output() newData: EventEmitter<{COUT_PERSONNEL:number,COUT_FLUIDE:number}>=new EventEmitter<{COUT_PERSONNEL: number; COUT_FLUIDE: number}>()
  fb=new FormBuilder();
  form=this.fb.group({
    coutPersonnel:[""],
    coutFluide:[""],
    coutAssaisonement:[""],
    typeAssaisonement:[""]
  })

  constructor(private request:ConstantCostService,public viewcontain:ViewContainerRef) {
    request.getCost().subscribe({
      next:(data)=>{
        this.form.get("coutPersonnel")?.setValue(data.COUT_PERSONNEL);
        this.form.get("coutFluide")?.setValue(data.COUT_FLUIDE);
        this.form.get("coutAssaisonement")?.setValue(data.COUT_ASSAISONNEMENT);
        this.form.get("typeAssaisonement")?.setValue(data.ISPERCENT.valueOf())
      }
    }
    )

  }

  validate(){

    this.request.setCost(this.form.get("coutFluide")?.value,this.form.get("coutPersonnel")?.value,this.form.get("coutAssaisonement")?.value,this.form.get("typeAssaisonement")?.value).subscribe(
      {
        error:(e)=>{
          console.log(e);
          AlertComponent.alert("Erreur","danger",this.viewcontain);

        },complete:()=>{
          this.newData.emit({COUT_PERSONNEL: this.form.get("coutPersonnel")?.value, COUT_FLUIDE: this.form.get("coutFluide")?.value})
          AlertComponent.alert("Changement effectué","success",this.viewcontain);
        }
      }
    )


  }
}

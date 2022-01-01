import { AfterViewInit, Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Step} from "../../class/step";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {StepService} from "../../Service/step.service";



@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StepComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Step> = new MatTableDataSource<Step>();
  columnsToDisplay = [{label: 'Id', field: 'id'}, {label: 'Nom', field: 'name'}, {label: 'Durée', field: 'duration'}];
  columnsHeader = ['id', 'name', 'duration'];
  expandedElement: Step | null | undefined;
  finish: boolean=false;
  data:Step[]=[]
  steptoUpdate:Step|undefined;


  constructor(public request: StepService) {
    this.data=request.getAllStep()
    this.dataSource.data=request.getAllStep()
    console.log(request.getAllStep())
  }

  buildtable(){
    this.dataSource.data=this.data

 }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateStep(item:Step){
    this.steptoUpdate=item
  }
  updateEmitter(){
    this.data=this.request.getAllStep();
    setTimeout(()=> {
      this.buildtable()
    }, 100)
  }

  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.buildtable()
    }, 100)

  }
  getTime(time:number):string{
    if(time>=60){
      return Math.floor(time/60)+"h"+time%60+"m"
    }else {
      return time+"m"
    }
  }


}


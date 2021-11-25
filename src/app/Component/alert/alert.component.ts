import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';


import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('animation', [
      // ...
      state('show', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('* => *', [
        animate('1s')
      ]),
    ]),
  ],
})

export class AlertComponent implements OnInit,OnChanges {
  @Input() etat:string|undefined;
  @Input() active:boolean|undefined;
  @Input() text:string|undefined;
  success:string;
  danger:string;
  constructor() {
    this.success="show";
    this.danger="hidden";
    if (this.etat==undefined){
      this.etat="";
    }
    if (this.active==undefined){
      this.active=false;
    }
    if (this.text==undefined){
      this.text="";
    }
  }


  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.change()
  }
  change(){
    if(this.etat=="sucess"){
      this.success="show";
    }else if(this.etat=="danger"){
      this.danger="show";
    }
  }


}

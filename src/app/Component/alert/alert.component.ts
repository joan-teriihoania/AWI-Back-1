import {Component, OnInit} from '@angular/core';
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
      transition('show => hidden', [
        animate('1s')
      ]),
    ]),
  ],

})

export class AlertComponent implements OnInit {
  etat:string|undefined;
  text:string|undefined;
  active=false;

  constructor() {
    if (this.etat==undefined){
      this.etat="";
    }
    if (this.text==undefined){
      this.text="";
    }
  }

  alert(){
    setTimeout(() => {
      this.active=false;

    }, 1000);

  }


  ngOnInit(): void {
    this.active = true;
    this.alert();

  }


}

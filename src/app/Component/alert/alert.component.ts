import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";




@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']

})

export class AlertComponent implements OnInit {
  @Input() etat:string|undefined;
  @Input() text:string|undefined;

  constructor() {
    if (this.etat==undefined){
      this.etat="";
    }
    if (this.text==undefined){
      this.text="";
    }
  }


  ngOnInit(): void {

  }



}

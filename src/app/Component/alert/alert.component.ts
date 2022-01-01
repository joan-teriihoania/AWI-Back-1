import {Component, OnInit, ViewContainerRef} from '@angular/core';
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
  active=true;

  constructor(){
    if (this.etat==undefined){
      this.etat="";
    }
    if (this.text==undefined){
      this.text="";
    }
  }
  public static alert(text:string ,etat:string,viewContainerRef: ViewContainerRef ){
    viewContainerRef.clear();
    const alert=viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    alert.instance.etat=etat;
    alert.instance.text=text;
    setTimeout(() => {
      viewContainerRef.clear();
    }, 2000);
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.active=false;
    }, 1000);

  }


}

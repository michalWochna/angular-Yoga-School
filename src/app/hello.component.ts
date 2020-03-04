import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit {

  public name:string;
  
  ngOnInit()
  {
    
    this.name ="to the Yoga School";
  }
}

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  standalone: true
})
export class RainbowDirective {
  private colors = [
    'blue', 'red', 'pink', 'yellow', 'green', 
    'lightblue', 'orange', 'purple', 'cyan', 'magenta'
  ];

  @HostBinding('style.borderColor') borderColor: string = '#dee2e6';
  @HostBinding('style.color') color: string = '#000';

  constructor() {
    console.log('RainbowDirective instanciée !');
   }

  @HostListener('keyup') 
  onKeyUp() {
    this.changeColor();
  }

  private changeColor(): void {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    const newColor = this.colors[randomIndex];
    
    this.borderColor = newColor;
    this.color = newColor;
  }
}
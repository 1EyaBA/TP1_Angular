import { Component } from '@angular/core';
import { RainbowDirective } from 'src/app/directives/rainbow/rainbow.directive';
@Component({
  selector: 'appRainbow',
  standalone: true,
  imports: [RainbowDirective],
  templateUrl: './rainbow.component.html',
  styleUrl: './rainbow.component.css'
})
export class RainbowComponent {

}

import { Directive, HostListener, signal, computed, effect, inject, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  standalone: true
})
export class RainbowDirective {

  private colors = signal([
    'blue', 'red', 'pink', 'yellow', 'green',
    'lightblue', 'orange', 'purple', 'cyan', 'magenta'
  ]);

  private currentColorIndex = signal<number | null>(null);

  private currentColor = computed(() => {
    const index = this.currentColorIndex();
    return index !== null ? this.colors()[index] : null;
  });

  private elementRef = inject(ElementRef<HTMLInputElement>);

  constructor() {
    effect(() => {
      const color = this.currentColor();
      const element = this.elementRef.nativeElement;
      if (color) {
        element.style.borderColor = color;
        element.style.color = color;
      } else {
        element.style.borderColor = '';
        element.style.color = '';
      }
    });
  }

  @HostListener('keyup')
  onKeyUp() {
    const randomIndex = Math.floor(Math.random() * this.colors().length);
    this.currentColorIndex.set(randomIndex);
  }
}

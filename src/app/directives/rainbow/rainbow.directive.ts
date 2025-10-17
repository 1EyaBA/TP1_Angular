import { Directive, signal, computed, effect, inject, ElementRef } from '@angular/core';

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
    const element = this.elementRef.nativeElement;
    element.addEventListener('keyup', () => {
      const randomIndex = Math.floor(Math.random() * this.colors().length);
      this.currentColorIndex.set(randomIndex);
    });
    effect(() => {
      const color = this.currentColor();
      if (color) {
        element.style.color = color;
        element.style.borderColor = color;
      } else {
        element.style.color = '';
        element.style.borderColor = '';
      }
    });
  }
}

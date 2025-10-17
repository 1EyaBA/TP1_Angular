import {Component} from '@angular/core';
import { output } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  name = '';
  content = '';

  todoAdded = output<{ name: string; content: string }>();

  submit() {
    if (this.name.trim() && this.content.trim()) {
      this.todoAdded.emit({ name: this.name, content: this.content });
      this.name = '';
      this.content = '';
    }
  }
}

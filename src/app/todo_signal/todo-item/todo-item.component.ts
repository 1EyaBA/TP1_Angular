import {Component, input, output} from '@angular/core';
import {Todo} from "../model/todo";
import{TodoStatus} from "../model/status.enum";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  action = input<string>();

  actionClicked = output<void>();
  deleteClicked = output<void>();

  onAction() {
    this.actionClicked.emit();
  }

  onDelete() {
    this.deleteClicked.emit();
  }


  protected readonly TodoStatus = TodoStatus;
}

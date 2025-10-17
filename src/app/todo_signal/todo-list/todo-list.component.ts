import {Component,input, output} from '@angular/core';
import {Todo} from "../model/todo";
import{TodoItemComponent} from "../todo-item/todo-item.component";
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  title = input.required<string>();
  todoClass = input.required<string>();
  todos = input.required<Todo[]>();
  action = input<string>();

  statusChanged = output<number>();
  todoDeleted = output<number>();

}

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../service/todo.service';
import { TodoStatus } from '../model/status.enum';
import { TodoFormComponent} from "../todo-form/todo-form.component";
import { TodoListComponent} from "../todo-list/todo-list.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-signal',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoFormComponent, TodoListComponent],
  templateUrl: './todo-signal.component.html',
  styleUrls: ['./todo-signal.component.css']
})
export class TodoSignalComponent {
  private todoService = inject(TodoService);

  todos = this.todoService.getTodos();

  waitingTodos = computed(() =>
    this.todos().filter(todo => todo.status === TodoStatus.WAITING)
  );

  inProgressTodos = computed(() =>
    this.todos().filter(todo => todo.status === TodoStatus.IN_PROGRESS)
  );

  doneTodos = computed(() =>
    this.todos().filter(todo => todo.status === TodoStatus.DONE)
  );

  TodoStatus = TodoStatus;

  addTodo(event: { name: string; content: string }) {
    this.todoService.addTodo(event.name, event.content);
  }

  updateStatus(id: number, status: TodoStatus) {
    this.todoService.updateStatus(id, status);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}

import {Injectable, signal} from '@angular/core';
import {Todo} from "../model/todo";
import {TodoStatus} from "../model/status.enum";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos = signal<Todo[]>([]);

  getTodos() {
    return this.todos.asReadonly();
  }

  addTodo(name: string, content: string) {
    const newTodo: Todo = {
      id: Date.now(),
      name,
      content,
      status: TodoStatus.WAITING
    };
    this.todos.update(todos => [...todos, newTodo]);
  }

  updateStatus(id: number, status: TodoStatus) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, status } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }
}

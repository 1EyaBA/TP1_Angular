import {TodoStatus} from "./status.enum";

export class Todo {
  constructor(
    public id: number = 0,
    public name: string = '',
    public content: string = '',
    public status: TodoStatus = TodoStatus.WAITING,

  ) {
  }
}

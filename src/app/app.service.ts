import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../modules/Todo';

@Injectable()
export class AppService {
  baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private readonly http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  createTodo(todo: Todo) {
    return this.http.post(this.baseUrl, todo);
  }

  editTodo(todo: Todo) {
    return this.http.patch(this.baseUrl + `/${todo.id}`, todo);
  }

  deleteTodo(id: Todo['id']) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
}

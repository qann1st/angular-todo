import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Todo } from '../../modules/Todo';
import { AppService } from '../app.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    TodoItemComponent,
    FormsModule,
    CommonModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
  ],
  providers: [AppService],

  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todoTitleValue = '';
  todos: Todo[];

  constructor(private readonly appService: AppService) {
    this.appService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  onAddTodoClick() {
    if (this.todoTitleValue.trim().length === 0) return;

    const newTodo = {
      id: this.todos.length + 1,
      title: this.todoTitleValue,
      completed: false,
    } satisfies Todo;

    this.todos.unshift(newTodo);
    this.appService.createTodo(newTodo).subscribe(
      () => {},
      () => {
        this.todos = this.todos.filter((el) => el.id !== newTodo.id);
      }
    );
    this.todoTitleValue = '';
  }

  onCompleteClick(todo: Todo, event: MatCheckboxChange) {
    const currentTodo = this.todos.find((el) => el.id === todo.id);
    if (!currentTodo) return;

    currentTodo.completed = event.source.checked;

    this.appService.editTodo(todo).subscribe(
      () => {},
      () => {
        const newCompleted = !event.source.checked;

        event.source.checked = newCompleted;
        currentTodo.completed = newCompleted;
      }
    );
  }

  onDeleteClick(todo: Todo) {
    this.todos = this.todos.filter((el) => el.id !== todo.id);
    this.appService.deleteTodo(todo.id).subscribe(
      () => {},
      () => this.todos.unshift(todo)
    );
  }

  onEditTodo(todo: Todo, title: Todo['title']) {
    const currentTodo = this.todos.find((el) => el.id === todo.id);
    if (!currentTodo) return;

    currentTodo.title = todo.title;

    this.appService.editTodo(todo).subscribe(
      () => {},
      () => {
        currentTodo.title = title;
      }
    );
  }
}

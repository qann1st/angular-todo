import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { Todo } from '../../modules/Todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckbox,
    MatCard,
    MatCardActions,
    MatCardTitle,
    MatCardHeader,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() id: Todo['id'];
  @Input() title: Todo['title'];
  @Input() completed: Todo['completed'];
  @Input() onDeleteClick: (todo: Todo) => void;
  @Input() onCompleteClick: (todo: Todo, event: MatCheckboxChange) => void;
  @Input() onEditClick: (todo: Todo, title: Todo['title']) => void;

  editable: boolean = false;
  newValue: string = '';

  onTitleChange(event: Event) {
    const element = event.target as HTMLParagraphElement;

    this.newValue = element.textContent ?? '';
  }

  onCheckboxChange(event: MatCheckboxChange) {
    this.onCompleteClick(
      {
        id: this.id,
        title: this.title,
        completed: !this.completed,
      },
      event
    );
  }

  onSubmitClick(submit: boolean) {
    this.editable = !submit;

    if (submit) {
      this.onEditClick(
        {
          id: this.id,
          title: this.newValue,
          completed: this.completed,
        },
        this.title
      );
    }
  }
}

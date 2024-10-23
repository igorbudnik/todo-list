import { Component } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { ToDoService } from '../to-do.service';
import { combineLatest, map } from 'rxjs';

@Component({
  providers: [],
  selector: 'app-todo',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent {
  hideFooter: boolean = true;

  constructor(public todoService: ToDoService) {}

  applyForm = new FormGroup({
    newToDo: new FormControl(''),
  });

  filteredTodo$ = combineLatest([
    this.todoService.chosenFilter,
    this.todoService.todo$,
  ]).pipe(
    map(([filter, todos]) => {
      switch (filter) {
        case 'Active':
          return todos.filter((item) => !item.checked);
        case 'Completed':
          return todos.filter((item) => item.checked);
        default:
          return todos;
      }
    })
  );

  onCheckAllTodos(): void {
    this.todoService.checkAll();
    this.todoService.isAnyCheckedTodos();
  }

  onSubmitForm(): void {
    if (!this.applyForm.value.newToDo) {
      return;
    }
    this.todoService.addTodo(this.applyForm.value.newToDo!);
    this.applyForm.reset();
  }
}

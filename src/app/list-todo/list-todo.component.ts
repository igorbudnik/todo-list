import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ITodo } from '../types/todo';
import { ToDoService } from '../to-do.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css'],
})
export class ListComponent {
  @Input() toDo!: ITodo;
  @ViewChild('search') search!: ElementRef;
  focused: boolean = false;
  editForm = new FormGroup({
    editToDo: new FormControl(''),
  });

  constructor(private todoService: ToDoService) {}

  onSubmitChanges(): void {
    this.search.nativeElement.blur();
    this.focused = false;
  }

  onCancelChanges(id: string): void {
    this.focused = false;
    this.editForm.controls['editToDo'].setValue(
      this.todoService.todo$.value.filter((item) => item.id === id)[0].text
    );
  }

  onCheckTask(id: string): void {
    this.todoService.makeChecked(id);

    this.todoService.isAnyCheckedTodos();
  }

  onFocus(): void {
    this.focused = true;
  }

  onClickDelete(id: string): void {
    this.todoService.deteleToDo(id);
  }

  onEditTask(id: string, formValue: string): void {
    this.todoService.editTodo(id, formValue);
  }

  ngOnInit(): void {
    this.editForm.controls['editToDo'].setValue(
      this.todoService.todo$.value.filter((item) => item.id === this.toDo.id)[0]
        .text
    );
  }
}

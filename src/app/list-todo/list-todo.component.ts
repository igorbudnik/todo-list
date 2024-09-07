import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ITodo } from '../todo';
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
  focused: boolean;
  todoService: ToDoService = inject(ToDoService);
  editForm = new FormGroup({
    editToDo: new FormControl(''),
  });

  submitChanges(): void {
    this.search.nativeElement.blur();
    this.focused = false;
  }

  cancelChanges(id: string): void {
    this.focused = false;
    this.editForm.controls['editToDo'].setValue(
      this.todoService.toDoList.filter((item) => item.id === id)[0].text
    );
  }

  focus(): void {
    this.focused = true;
  }

  constructor() {
    this.focused = false;
  }

  ngOnInit(): void {
    this.editForm.controls['editToDo'].setValue(
      this.todoService.toDoList.filter((item) => item.id === this.toDo.id)[0]
        .text
    );
  }
}

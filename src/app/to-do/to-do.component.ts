import { Component, inject, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { ToDoService } from '../to-do.service';
import { map, Observable, Subscription } from 'rxjs';
import { ITodo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  todoService: ToDoService = inject(ToDoService);
  hideFooter: boolean = true;

  applyForm = new FormGroup({
    newToDo: new FormControl(''),
  });

  submit() {
    if (!this.applyForm.value.newToDo) {
      return;
    }
    this.todoService.addTodo(this.applyForm.value.newToDo!);
    this.applyForm.reset();
  }
  ngOnInit() {
    console.log(this.todoService.filter);
  }
}

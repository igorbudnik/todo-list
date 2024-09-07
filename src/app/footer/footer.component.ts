import { Component, inject, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { ITodo } from '../todo';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  todoService: ToDoService = inject(ToDoService);

  textFill(list: ITodo[]) {
    const amount: number = list.filter((item) => !item.checked).length;
    const items: string = amount > 1 ? 'items' : 'item';
    return [amount, items];
  }

  constructor() {}
}

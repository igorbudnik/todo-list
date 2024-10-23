import { Component, inject } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { IFilter, ITodo } from '../types/todo';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  todoService: ToDoService = inject(ToDoService);

  onChangeFilter(filter: IFilter): void {
    this.todoService.chosenFilter.next(filter);
  }

  onClearEveryTodos(): void {
    this.todoService.clearToDo();
    this.todoService.VisibilityChange.next(false);
  }

  getTodoCountInfo(list: ITodo[]): [amount: number, items: string] {
    const amount = list.filter((item) => !item.checked).length;
    const items = amount > 1 ? 'items' : 'item';
    return [amount, items];
  }
}

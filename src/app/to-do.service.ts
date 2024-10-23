import { Injectable } from '@angular/core';
import { IFilter, ITodo } from './types/todo';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  VisibilityChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  todo$ = new BehaviorSubject<ITodo[]>([]);
  chosenFilter = new BehaviorSubject<IFilter>('All');

  // Нажатие на кнопку "Clear completed"
  clearToDo() {
    this.todo$.next(this.todo$.value.filter((item) => item.checked === false));
  }

  // Удаление по айди по нажатию на крестик
  deteleToDo(id: string): void {
    this.todo$.next(this.todo$.value.filter((item) => item.id !== id));
  }

  // Добавить запись
  addTodo(text: string): void {
    if (!text) {
      return;
    }
    this.todo$.next([
      ...this.todo$.value,
      { id: String(Date.now()), text: text, checked: false },
    ]);
  }

  // Изменить запись
  editTodo(id: string, text: string): void {
    this.todo$.next(
      this.todo$.value.map((item) => {
        if (item.id === id) {
          item.text = text;
        }
        return item;
      })
    );
  }

  // Отметить запись
  makeChecked(id: string): void {
    this.todo$.next(
      this.todo$.value.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      })
    );
  }

  // Отметить все записи при нажатии на Стрелочку
  checkAll(): void {
    if (
      this.todo$.value.filter((item) => item.checked).length ===
      this.todo$.value.length
    ) {
      this.todo$.next(
        this.todo$.value.map((item) => {
          return { ...item, checked: false };
        })
      );

      return;
    }
    this.todo$.next(
      this.todo$.value.map((item) => {
        return { ...item, checked: true };
      })
    );
  }

  isAnyCheckedTodos(): void {
    if (
      this.todo$.value.filter((item) => item.checked === false).length ===
      this.todo$.value.length
    ) {
      this.VisibilityChange.next(false);

      return;
    }

    this.VisibilityChange.next(true);
  }
}

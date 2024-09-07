import { Injectable } from '@angular/core';
import { ITodo } from './todo';
import * as uuid from 'uuid';
import { map, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  toDoList: ITodo[];
  VisibilityChange: Subject<boolean> = new Subject<boolean>();
  anyCompleted: boolean = false;
  filter: Observable<ITodo[]> = new Observable();

  // Нажатие на кнопку "Clear completed"
  clearToDo() {
    this.filter = of(this.toDoList).pipe(
      map((value) => value.filter((item) => item.checked === false))
    );
    this.toDoList = this.toDoList.filter((item) => item.checked === false);

    this.VisibilityChange.subscribe((value) => {
      this.anyCompleted = value;
    });
    this.VisibilityChange.next(false);
  }

  // Удаление по айди по нажатию на крестик
  deteleToDo(id: string): void {
    this.filter = of(this.toDoList).pipe(
      map((value) => value.filter((item) => item.id !== id))
    );
    this.toDoList = this.toDoList.filter((item) => item.id !== id);
  }

  // Добавить запись
  addTodo(text: string) {
    if (!text) {
      return;
    }
    this.toDoList = [
      ...this.toDoList,
      {
        id: uuid.v4(),
        text: text,
        checked: false,
      },
    ];
    this.filter = of(this.toDoList).pipe(map((value) => [...value]));
  }

  // Изменить запись
  editTodo(id: string, text: string) {
    this.toDoList = this.toDoList.map((item) => {
      if (item.id === id) {
        item.text = text;
      }
      return item;
    });
  }

  // Отметить запись
  makeChecked(id: string) {
    this.toDoList = this.toDoList.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });

    this.VisibilityChange.subscribe((value) => {
      this.anyCompleted = value;
    });

    if (
      this.toDoList.filter((item) => item.checked === false).length ===
      this.toDoList.length
    ) {
      this.VisibilityChange.next(false);
      return;
    }

    this.VisibilityChange.next(true);
  }

  // Отметить все записи при нажатии на Стрелочку
  checkAll() {
    if (
      this.toDoList.filter((item) => item.checked).length ===
      this.toDoList.length
    ) {
      this.filter = of(this.toDoList).pipe(
        map((value) =>
          value.map((item) => {
            return { ...item, checked: false };
          })
        )
      );
      this.toDoList = this.toDoList.map((item) => {
        return { ...item, checked: false };
      });
      return;
    }
    this.filter = of(this.toDoList).pipe(
      map((value) =>
        value.map((item) => {
          return { ...item, checked: true };
        })
      )
    );
    this.toDoList = this.toDoList.map((item) => {
      return { ...item, checked: true };
    });

    this.VisibilityChange.subscribe((value) => {
      this.anyCompleted = value;
    });

    this.VisibilityChange.next(true);
  }

  // Отфильтровать записи через footer компонент
  filterTodos(param: string) {
    if (param === 'All') {
      this.filter = of(this.toDoList).pipe(map((value) => value));
      return;
    } else if (param === 'Active') {
      this.filter = of(this.toDoList).pipe(
        map((value) => value.filter((item) => item.checked === false))
      );

      return;
    }
    this.filter = of(this.toDoList).pipe(
      map((value) => value.filter((item) => item.checked === true))
    );
  }

  constructor() {
    this.toDoList = [];
  }
}

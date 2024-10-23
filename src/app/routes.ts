import { Routes } from '@angular/router';
import { ToDoComponent } from './to-do/to-do.component';
import { AppComponent } from './app.component';

const routeConfig: Routes = [
  {
    path: '',
    component: ToDoComponent,
  },
  {
    path: 'active',
    component: AppComponent,
  },
  {
    path: 'completed',
    component: AppComponent,
  },
];
export default routeConfig;

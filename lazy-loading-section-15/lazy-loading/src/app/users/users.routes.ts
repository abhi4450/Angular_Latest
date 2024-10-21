import { Routes } from '@angular/router';

import { resolveUserTasks } from '../tasks/tasks.component';
import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';
import { TasksService } from '../tasks/tasks.service';
//since this user route is being loaded lazily this service will also be loaded lazily.
export const routes: Routes = [
  {
    path: '',
    providers: [TasksService], // all nested routes and this route will have access to the TaskService here.
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        // component: TasksComponent,
        //when this route here is activated angular will trigger the loadComponent function.
        //this import function will actually yield a promise.
        loadComponent: () =>
          import('../tasks/tasks.component').then((mod) => mod.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];

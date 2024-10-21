import { CanMatchFn, RedirectCommand, Routes, Router } from '@angular/router';
import { routes as userRoutes } from './users/users.routes';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { Component, inject } from '@angular/core';
import { TaskComponent } from './tasks/task/task.component';
import {
  resolveUserName,
  UserTasksComponent,
  resolveTitle,
} from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '', //<your-domain>/
    component: NoTaskComponent,
    title: 'No task selected',
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'hello!',
    },
    resolve: {
      userName: resolveUserName, //value returned by the resolver fn will be available tot he UserTasksComponent
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

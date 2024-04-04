import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CreateNewTaskComponent} from "./create-new-task/create-new-task.component";
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [{
  path: '', component: LoginComponent
},
  {
    path: 'createNewTask', component: CreateNewTaskComponent
  },
  {
    path: 'taskList', component: TaskListComponent
  },
  {
    path:'taskDetail',component:TaskDetailComponent
  },
  {
    path:'register',component: RegisterComponent
  },
  {
    path:'**',component:PageNotFoundComponent
  },

];

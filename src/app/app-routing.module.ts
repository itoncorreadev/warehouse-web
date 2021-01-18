import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { TaskDetailComponent } from "./tasks/task-detail/task-detail.component";
import { TasksComponent } from './tasks/tasks.component';

const ROUTES = RouterModule.forRoot([
  { path: 'sign-in', component: SignInFormComponent },
  { path: 'sign-up', component: SignUpFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
])

@NgModule({
  imports: [ROUTES],
  exports: [RouterModule]
})

export class AppRoutingModule { }

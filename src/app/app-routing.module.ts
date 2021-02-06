import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductsComponent } from './products/products.component';
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { TaskDetailComponent } from "./tasks/task-detail/task-detail.component";
import { TasksComponent } from './tasks/tasks.component';

const ROUTES = RouterModule.forRoot([
  { path: 'sign-in', component: SignInFormComponent,  canActivate: [NotAuthenticatedGuard] },
  { path: 'sign-up', component: SignUpFormComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
])

@NgModule({
  imports: [ROUTES],
  exports: [RouterModule]
})

export class AppRoutingModule { }

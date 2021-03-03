import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductsComponent } from './products/products.component';
import { RequestProductDetailComponent } from "./request-products/request-product-detail/request-product-detail.component";
import { RequestProductsComponent } from './request-products/request-products.component';
import { RequestDetailComponent } from "./requests/request-detail/request-detail.component";
import { RequestsComponent } from "./requests/requests.component";
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { TaskDetailComponent } from "./tasks/task-detail/task-detail.component";
import { TasksComponent } from './tasks/tasks.component';

const ROUTES = RouterModule.forRoot([
  { path: 'sign-in', component: SignInFormComponent,  canActivate: [NotAuthenticatedGuard] },
  { path: 'sign-up', component: SignUpFormComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'requests/:id', component: RequestDetailComponent, canActivate: [AuthGuard] },
  { path: 'requests/:request_id/request-products', component: RequestProductsComponent, canActivate: [AuthGuard] },
  { path: 'requests/:request_id/request-products/:id', component: RequestProductDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
])

@NgModule({
  imports: [ROUTES],
  exports: [RouterModule]
})

export class AppRoutingModule { }

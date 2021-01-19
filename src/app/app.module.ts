import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
//import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Angular2TokenService } from "angular2-token";
import "rxjs/add/Observable/of";
import "rxjs/add/Observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
//import { InMemoryTaskDataService } from "./in-memory-task-data.service";
import { NavbarComponent } from './navbar/navbar.component';
import { TaskSearchComponent } from "./navbar/task-search/task-search.component";
import { AuthService } from "./shared/auth.service";
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { TaskService } from "./tasks/shared/task.service";
import { TaskDetailComponent } from "./tasks/task-detail/task-detail.component";
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SignInFormComponent,
    SignUpFormComponent,
    TaskSearchComponent,
    TasksComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
    //InMemoryWebApiModule.forRoot(InMemoryTaskDataService)
  ],
  providers: [
    Angular2TokenService,
    AuthGuard,
    AuthService,
    NotAuthenticatedGuard,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule{

}

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { LoaderModule } from "./components/loader/loader.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
import { NavbarComponent } from './navbar/navbar.component';
import { ProductSearchComponent } from "./navbar/product-search/product-search.component";
import { TaskSearchComponent } from "./navbar/task-search/task-search.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductsComponent } from "./products/products.component";
import { ProductService } from "./products/shared/product.service";
import { RequestProductDetailComponent } from "./request-products/request-product-detail/request-product-detail.component";
import { RequestProductsComponent } from "./request-products/request-products.component";
import { RequestProductService } from "./request-products/shared/request-product.service";
import { RequestDetailComponent } from "./requests/request-detail/request-detail.component";
import { RequestsComponent } from "./requests/requests.component";
import { RequestService } from "./requests/shared/request.service";
import { AuthService } from "./shared/auth.service";
import { TokenService } from "./shared/token.service";
import { UserService } from "./shared/user.service";
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
    ProductsComponent,
    SignInFormComponent,
    SignUpFormComponent,
    TaskSearchComponent,
    TasksComponent,
    TaskDetailComponent,
    ProductSearchComponent,
    ProductDetailComponent,
    RequestsComponent,
    RequestDetailComponent,
    RequestProductsComponent,
    RequestProductDetailComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgxPaginationModule,
    LoaderModule,
    // NgxLoadingModule.forRoot({
    //   animationType: ngxLoadingAnimationTypes.wanderingCubes,
    //     backdropBackgroundColour: 'rgba(0,0,0,0)',
    //     backdropBorderRadius: '4px',
    //     primaryColour: '#2752b8',
    //     secondaryColour: '#db1f1f',
    //     tertiaryColour: '#f0bc2e'
    // })
    //InMemoryWebApiModule.forRoot(InMemoryTaskDataService)
  ],
  providers: [
    AuthGuard,
    AuthService,
    NotAuthenticatedGuard,
    TokenService,
    TaskService,
    ProductService,
    RequestService,
    RequestProductService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule{

}

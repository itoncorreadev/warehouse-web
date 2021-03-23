import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderService } from "./loader.service";

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html'
})

export class LoaderComponent {

  public loading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {
  }
}

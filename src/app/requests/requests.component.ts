import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoaderService } from "../components/loader/loader.service";
import { Request } from './shared/request.model';
import { RequestService } from "./shared/request.service";

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['../app.component.css']
})

export class RequestsComponent implements OnInit{
  public requests: Array<Request>;
  public newRequest: Request;
  public requestTypeOptions: Array<any>;
  public paginaAtual = 1;
  public errors = [];
  public modalRef: BsModalRef;

  public constructor(

    private requestService: RequestService,
    private loaderService: LoaderService,
    private modalService: BsModalService

  ){

    this.newRequest = new Request(null, '', '', '');

    this.requestTypeOptions = [
      { value: '', text: "Selecione o tipo de Requisição"},
      { value: '', text: "-------------------------------"},
      { value: 'in', text: "Entrada de Produtos"},
      { value: 'out', text: "Saída de Produtos"},
      { value: 'devolution', text: "Devolução"}
    ];

  }

  public ngOnInit(){
    this.requestService.getAll()
      .subscribe(
        requests => this.requests = requests.sort((a, b) => b.id - a.id),
        error => this.errors.push("Ocorreu um error no servidor, tente mais tarde."),
        () => this.loaderService.hide()
      )
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  public ngAfterViewInit(){
    this.loaderService.show()
  }

  public createRequest(){
    this.errors = [];
    this.newRequest.request_type = this.newRequest.request_type.trim();
    this.newRequest.description = this.newRequest.description.trim();

    if(!this.newRequest.request_type || !this.newRequest.description) {
      if (!this.newRequest.request_type)
      this.errors.push("A requisição deve ter um tipo!");
      if(!this.newRequest.description)
        this.errors.push("A requisição deve ter uma descrição!");
    } else {
      this.loaderService.show()
      this.requestService.create(this.newRequest)
        .subscribe(
          request => {
            this.requests.unshift(request);
            this.newRequest = new Request(null, '', '', '');
          },
          () => this.errors.push("Ocorreu um erro no servidor, tente mais tarde!"),
          () => this.loaderService.hide()
        )
    }
  }

  public deleteRequest(request: Request): void {
    this.loaderService.show();
    this.requestService.delete(request.id)
        .subscribe(
          () => this.requests = this.requests.filter(t => t !== request),
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!",
          () => this.loaderService.hide()
        )
    this.modalRef.hide();
  }

  public decline(){
    this.modalRef.hide();
    this.loaderService.hide();
  }

  public iconClassForInOut(fieldName: string){
    return {
      "glyphicon-arrow-down text-success": fieldName == "in",
      "glyphicon-arrow-up text-danger": fieldName == "out",
      "glyphicon-refresh text-warning": fieldName == "devolution"
    }
  }

  public colorClassForStatus(fieldName: boolean){
    return {
      "success": fieldName == true,
      "danger": fieldName == false
    }
  }

  public labelClassForStatusRequest(fieldName: boolean){
    return {
      "label-success": fieldName == true,
      "label-danger animate__bounce animate__infinite": fieldName == false
    }
  }

}

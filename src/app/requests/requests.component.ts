import { Component, OnInit } from "@angular/core";
import { Request } from './shared/request.model';
import { RequestService } from "./shared/request.service";

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html'
})

export class RequestsComponent implements OnInit{
  public requests: Array<Request>;
  public newRequest: Request;
  public requestTypeOptions: Array<any>;

  public constructor(private requestService: RequestService){
    this.newRequest = new Request(null, '', '', '');

    this.requestTypeOptions = [
      { value: 'in', text: "Entrada de Produtos"},
      { value: 'out', text: "Saída de Produtos"},
      { value: 'devolution', text: "Devolução"}
    ];
  }

  public ngOnInit(){
    this.requestService.getAll()
      .subscribe(
        requests => this.requests = requests.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um error no servidor, tente mais tarde.")
      )
  }

  public createRequest(){
    this.newRequest.request_type = this.newRequest.request_type.trim();

    if(!this.newRequest.request_type){
      alert("A requisição deve ter um tipo!")
    } else {
      console.log(this.newRequest);
      this.requestService.create(this.newRequest)
        .subscribe(
          request => {
            this.requests.unshift(request);
            this.newRequest = new Request(null, '', '', '');
          },
          () => alert("Ocorreu um erro no servidor, tente mais tarde!")
        )
    }
  }

  public deleteRequest(request: Request){
    if(confirm(`Deseja realmente excluir a request "${request.description} de ${request.request_type}"`)){
      this.requestService.delete(request.id)
        .subscribe(
          () => this.requests = this.requests.filter(t => t !== request),
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!",
        )
    }
  }

  public iconClassForInOut(fieldName: string){
    return {
      "glyphicon-arrow-down text-success": fieldName == "in",
      "glyphicon-arrow-up text-danger": fieldName == "out",
      "glyphicon-refresh text-warning": fieldName == "devolution"
    }
  }

}

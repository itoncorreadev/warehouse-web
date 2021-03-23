import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoaderService } from "../components/loader/loader.service";
import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['../app.component.css']
})

export class TasksComponent implements OnInit{
  public tasks: Array<Task> ;
  public newTask: Task;
  public paginaAtual = 1;
  public errorText = '';
  modalRef: BsModalRef;

  public constructor(
    private taskService: TaskService,
     private loaderService: LoaderService,
     private modalService: BsModalService
  ){
    this.newTask = new Task(null, '');
  }

  public ngOnInit(){
    this.taskService.getAll()
      .subscribe(
        tasks => this.tasks = tasks.sort((a, b) => b.id - a.id),
        error => this.errorText = "Ocorreu um error no servidor, tente mais tarde.",
        () => this.loaderService.hide()
      )
  }

  public ngAfterViewInit(){
    this.loaderService.show();
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  public createTask(){
    this.errorText='';
    this.newTask.title = this.newTask.title.trim();
    if(!this.newTask.title){
      this.errorText = "A tarefa deve ter um título!";
    } else {
      this.loaderService.show();
      this.taskService.create(this.newTask)
        .subscribe(
          task => {
            this.tasks.unshift(task),
            this.newTask = new Task(null, '')
          },
          () => this.errorText = "Ocorreu um erro no servidor, tente mais tarde!",
          () => this.loaderService.hide()
        )
    }
  }

  public deleteTask(task: Task): void {
    this.loaderService.show();
    this.taskService.delete(task.id)
        .subscribe(
          () => {
            this.tasks = this.tasks.filter(t => t !== task),
            this.loaderService.hide()
          },
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!"
        )
    this.modalRef.hide();
  }

  public decline(){
    this.modalRef.hide();
    this.loaderService.hide();
  }

  public colorClassForStatusTask(fieldName: boolean){
    return {
      "success": fieldName == true,
      "danger": fieldName == false
    }
  }

  public labelClassForStatusTask(fieldName: boolean){
    return {
      "label-success": fieldName == true,
      "label-danger animate__bounce animate__infinite": fieldName == false
    }
  }

}

import { Component, OnInit } from '@angular/core';
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

  public constructor(private taskService: TaskService){
    this.newTask = new Task(null, '');
  }

  public ngOnInit(){
    this.taskService.getAll()
      .subscribe(
        tasks => this.tasks = tasks.sort((a, b) => b.id - a.id),
        error => this.errorText = "Ocorreu um error no servidor, tente mais tarde."
      )
  }

  public createTask(){
    this.errorText='';
    this.newTask.title = this.newTask.title.trim();

    if(!this.newTask.title){
      this.errorText = "A tarefa deve ter um título!";
    } else {
      console.log(this.newTask);
      this.taskService.create(this.newTask)
        .subscribe(
          task => {
            this.tasks.unshift(task);
            this.newTask = new Task(null, '');
          },
          () => this.errorText = "Ocorreu um erro no servidor, tente mais tarde!"
        )
    }
  }

  public deleteTask(task: Task){
    if(confirm(`Deseja realmente excluir a tarefa "${task.title}"`)){
      this.taskService.delete(task.id)
        .subscribe(
          () => this.tasks = this.tasks.filter(t => t !== task),
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!",
        )
    }
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

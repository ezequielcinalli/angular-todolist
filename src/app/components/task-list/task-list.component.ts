import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks:Task[];
  taskToEdit: any = {
    title:'',
    description:''
  };
  
  constructor(private connection:ConnectionService) { 
    this.connection.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {
  }

  setTaskToEdit(task:Task){
    this.taskToEdit = task;
  }

  update(){
    this.connection.update(this.taskToEdit);
  }

  remove(task:Task){
    this.connection.remove(task);
  }

}

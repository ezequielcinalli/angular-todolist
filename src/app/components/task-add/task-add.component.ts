import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  task:Task = {
    title:'',
    description: ''
  }
  constructor(private connection:ConnectionService) {

   }

  ngOnInit(): void {
  }

  add(){
    this.connection.add(this.task);
    this.task.title= '';
    this.task.description= '';
  }

}

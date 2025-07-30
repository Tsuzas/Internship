import { Component } from '@angular/core';
import { Services } from '../../Services/services';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {

  constructor(private Services: Services) {}

  completeTask(){
    this.Services.completeTask();
  }
  removeTask(){
    this.Services.removeTask();
  }
  countTask(){
    this.Services.countTask();
  }
}


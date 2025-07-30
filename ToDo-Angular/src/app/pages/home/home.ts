import { Component } from '@angular/core';
import { TodoInput } from '../../components/todo-input/todo-input';
import { TodoList } from '../../components/todo-list/todo-list';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [TodoInput, TodoList, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToDoList } from '../../components/to-do-list/to-do-list';

@Component({
  selector: 'app-home',
  imports: [RouterLink,ToDoList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}

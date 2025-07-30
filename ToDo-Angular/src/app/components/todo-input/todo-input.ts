import { Component } from '@angular/core';
import { Services } from '../../Services/services';

@Component({
  selector: 'app-todo-input',
  imports: [],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.css',
})
export class TodoInput {
  //Cria Var no escopo para poder utilizar noutro lugar
  task: string = '';
  imageSrc: string = '';

  /* Chama funcao do Load
    ngOnInit() {
    this.loadTasks();  // PERGUNTAR SE ISTO E O SERVICE!!!!
    }
  */

  //Function que puxa input text para variavel
  getTask(event: Event) {
    // Lê o input e coloca na Variavel-task
    this.task = (event.target as HTMLInputElement).value;
  }
  constructor(private Services: Services) {}
  submitTask() {
    // Chama funcao de Servicos
    this.Services.submitTask(this.task, this.imageSrc);

    //Resets forms
    const form = document.getElementById('taskForm') as HTMLFormElement;
    form?.reset();
    this.imageSrc = '';
  }
  //Cria URL temporario para podermos ver a imagem
  tempUrl(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.imageSrc = URL.createObjectURL(file);
    }
  }

  /*

  loadTasks() {
    const loadedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const ul = document.getElementById('task-List');

    if (ul) {
      ul.innerHTML = ''; // limpa tudo
      loadedTasks.forEach(task => {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const image = document.createElement("img");
        const imageSrc = document.createElement("img").src;

        label.textContent = task.label;

        li.appendChild(label);
        ul.appendChild(li);
      });
    }
  }

  saveTasks() {
    const ul = document.getElementById('task-List');
    const savedTasks: any[] = [];

    if (ul) {
      const allLis = ul.querySelectorAll('li');
      allLis.forEach(li => {
        const label = li.querySelector('label')?.textContent;
        savedTasks.push({label}); 
      });
    }

    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }
  */
}

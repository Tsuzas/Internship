import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Services {
  tasks: Task[] = [];

  constructor() {
    // LOAD as tasks gravadas.
    this.loadTasks();
  }
  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  // Saves Form to LocalStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      this.tasks = JSON.parse(tasksFromStorage) as Task[];
    }
  }
}

import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Services } from '../../services/services';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Task {
  id: string;
  title: string;
  description?: string;
  image?: string;
  status: 'notStarted' | 'inProgress' | 'completed' | 'abandoned';
}

@Component({
  selector: 'app-toDo-list',
  imports: [CdkDropList, CdkDrag, CommonModule, FormsModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList {
  tasks: Task[] = [];

  constructor(
    private services: Services,
    private snackBar: MatSnackBar) {
    this.tasks = this.services.getTasks();
  }

  // Organiza as Tasks pelo Status
  get notStarted() {
    return this.tasks.filter((t) => t.status === 'notStarted');
  }
  get inProgress() {
    return this.tasks.filter((t) => t.status === 'inProgress');
  }
  get completed() {
    return this.tasks.filter((t) => t.status === 'completed');
  }
  get abandoned() {
    return this.tasks.filter((t) => t.status === 'abandoned');
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Reordenar na mesma lista
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Guardar a referência à task ANTES de mover
      const task = event.previousContainer.data[event.previousIndex];

      // Atualizar o status com base onde drago
      switch (event.container.id) {
        case 'notStarted':
          task.status = 'notStarted';
          break;
        case 'inProgress':
          task.status = 'inProgress';
          break;
        case 'completed':
          task.status = 'completed';
          break;
        case 'abandoned':
          task.status = 'abandoned';
          break;
      }
      // Transferir a task para a nova lista
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Guardar no localStorage
    this.services.saveTasks();

    // Snack Warning
    this.snackBar.open('Message was moved', '', {
      duration: 2000,
    });
  }

  // MODAL edition
  isEditing = false;
  editTask: any = {}; // Objeto temporário para edição
  editIndex: number = -1;

  openEditModal(task: Task) {
    this.editTask = { ...task }; // chama copia e da valor da task
    // Starts Editing mode
    this.isEditing = true;
  }
  cancelEdit() {
    this.isEditing = false;
    this.editTask = {};
    this.editIndex = -1;
  }
  saveEdit() {
    // Encontrar task original via UUID
    const index = this.tasks.findIndex((t) => t.id === this.editTask!.id);
    // Coloca a copia no original
    this.tasks[index] = { ...this.editTask! };
    // Saves
    this.services.saveTasks();
    // Fechar MODAL
    this.isEditing = false;
    this.services.saveTasks();

    // Snack Warning
    this.snackBar.open('Task was edited', '', {
      duration: 2000,
    });
  }
  removeTask(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    // Encontra Index e apaga so 1 Task
    this.tasks.splice(index, 1);
    // Saves
    this.services.saveTasks();

    // Snack Warning
    this.snackBar.open('Task was removed', '', {
      duration: 2000,
    });
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Services } from '../../services/services';

export interface Task {
  id: string;
  title: string;
  description?: string;
  image?: string;
  status: 'notStarted' | 'inProgress' | 'completed' | 'abandoned';
}
@Component({
  selector: 'app-new-task',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './new-task.html',
  styleUrls: ['./new-task.css'], // corrigido aqui
  standalone: true, // Se usares standalone
})
export class NewTask {
  constructor(private services: Services) {}
  tasks: Task[] = [];

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    image: new FormControl<File | null>(null),
  });

  imageSrc: string | null = null;

  onSubmit() {
    const { title, description } = this.taskForm.value;

    // Passar os dados para o serviço para importar para To-Do
    this.services.addTask({
      id: crypto.randomUUID(),
      title: title ?? '',
      description: description ?? undefined,
      image: this.imageSrc ?? undefined,
      status: 'notStarted',
    });

    this.tasks = this.services.getTasks();

    // Limpar o formulário depois do submit
    this.taskForm.reset();
    // Limpa Imagem, ja que selectImage() não faz parte de Forms
    this.imageSrc = null;
    // ALERT Basico (IMPLEMENTAR MODAL NO FUTURO!)
    window.alert('Task was created!');
  }

  submitImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (file) {
      //Adquire BLOB
      this.imageSrc = URL.createObjectURL(file);

      //Puxa blob po newTask:
      this.taskForm.patchValue({ image: file });
      this.taskForm.get('image')?.updateValueAndValidity();

      // Converte para Base64
      const imageReader = new FileReader();
      imageReader.onload = () => {
        this.imageSrc = imageReader.result as string;
      };
      imageReader.readAsDataURL(file);
    }
  }
}

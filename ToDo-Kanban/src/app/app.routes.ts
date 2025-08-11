import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NewTask } from './pages/new-task/new-task';

export const routes: Routes = [
    { path: '', component: Home }, //route shows home
    { path: 'newTask', component: NewTask },
];
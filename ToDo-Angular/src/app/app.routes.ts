import { Routes } from '@angular/router';
import { Sobre } from './pages/sobre/sobre';
import { Home } from './pages/home/home';
export const routes: Routes = [
    {
        path: "sobre",
        component: Sobre
    },
    { 
        path: '', 
        component: Home
    }
];


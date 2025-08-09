import { Routes } from '@angular/router';
import { Login } from './login/login';
import { SingUp } from './sing-up/sing-up';
import { Servicios } from './components/servicios/servicios';

export const routes: Routes = [

    {path: "login", component: Login},
    {path: "sing-up", component: SingUp},
    {path: "servicios", component: Servicios}
    
];

import { Routes } from '@angular/router';
import { Login } from './login/login';
import { SingUp } from './sing-up/sing-up';
import { Servicios } from './components/servicios/servicios';
import { DasboardUser } from './dasboard-user/dasboard-user';
import { DasboardAdmin } from './dasboard-admin/dasboard-admin';


export const routes: Routes = [

    {path: "login", component: Login},
    {path: "sing-up", component: SingUp},
    {path: "servicios", component:Servicios},
    {path: "dasboard-user", component:DasboardUser},
    {path:"dasboard-admin", component: DasboardAdmin}
];

import { Routes } from '@angular/router';
import { Login } from './login/login';
import { SingUp } from './sing-up/sing-up';
import { DasboardAdmin } from './dasboard-admin/dasboard-admin';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: Login},
    {path: "sing-up", component: SingUp},
    {path: "dasboard-admin", component: DasboardAdmin, canActivate: [authGuard]},
    
];

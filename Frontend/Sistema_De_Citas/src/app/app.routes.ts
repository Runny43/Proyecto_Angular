import { Routes } from '@angular/router';
import { Login } from './login/login';
import { SingUp } from './sing-up/sing-up';
import { DasboardUser } from './dasboard-user/dasboard-user';
import { DasboardAdmin } from './dasboard-admin/dasboard-admin';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: Login},
    {path: "sing-up", component: SingUp},
    {path: "dasboard-user", component: DasboardUser, canActivate: [authGuard]},
    {path: "dasboard-admin", component: DasboardAdmin, canActivate: [authGuard]},
    
];

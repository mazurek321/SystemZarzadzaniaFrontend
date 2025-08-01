import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Userpage } from './components/userpage/userpage';
import { Login } from './components/login/login';
import { Auth } from './components/auth/auth';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { Tasks } from './components/tasks/tasks';
import { Users } from './components/users/users';
import { authGuard } from './services/authGuard/auth-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'auth/sign-in', pathMatch: 'full'},
    {
        path: 'auth', 
        component: Auth,
        children:[
            { path: 'sign-in', component: Login},
            { path: 'sign-up', component: Register}
        ]
    },
    {
        path: 'home', 
        component: Home,
        canActivate:[authGuard],
        children:[
            {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {path: 'dashboard', component: Dashboard},
            {path: 'tasks', component: Tasks},
            {path: 'users', component: Users},
            {path: 'user/me', component: Userpage},
            {path: 'users/:id', component: Userpage}
        ]
    },
];

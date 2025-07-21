import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Userpage } from './components/userpage/userpage';
import { Login } from './components/login/login';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'home', component: Home},
    {path: 'user', component: Userpage}
];

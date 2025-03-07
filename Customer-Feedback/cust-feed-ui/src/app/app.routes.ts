import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddfeedbackComponent } from './addfeedback/addfeedback.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CanAuthGuard } from './guards/can-auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'addfeedback', component: AddfeedbackComponent, canActivate: [CanAuthGuard] },
    { path: 'adminDashboard', component: AdminDashboardComponent, canActivate:[CanAuthGuard] },
];

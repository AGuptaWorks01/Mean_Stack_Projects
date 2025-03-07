import { Routes } from '@angular/router';
import { LoginComponent } from './model/login/login.component';
import { DashboardComponent } from './model/dashboard/dashboard.component';
import { BookListComponent } from './model/book-list/book-list.component';
import { AddBookComponent } from './model/addBook/addbook.component';
import { UpdateBookComponent } from './model/update-book/update-book.component';
import { BookDetailsComponent } from './model/book-details/book-details.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'addBook',
    component: AddBookComponent,
  },
  { path: 'bookList', component: BookListComponent },
  { path: 'updateBook', component: UpdateBookComponent },
  { path: 'updateBook/:id', component: UpdateBookComponent },
  { path: 'BookDetails/:id', component: BookDetailsComponent },
];

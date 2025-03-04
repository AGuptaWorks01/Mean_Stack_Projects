import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addBook',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddBookComponent {
  books: any[] = [];
  book: any = { title: '', Author: '', Description: '' };
  message: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  addTask() {
    this.taskService.addTask(this.book).subscribe(
      (res) => {
        this.message = 'Task added successfully!';
        this.clearForm();
        this.router.navigateByUrl('dashboard');
      },
      (err) => {
        this.message = err.error.message;
      }
    );
  }

  clearForm() {
    this.book = { title: '', Author: '', Description: '' };
  }
}

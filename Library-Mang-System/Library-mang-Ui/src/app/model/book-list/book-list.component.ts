import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  message: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.taskService.getTasks().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res)) {
          this.books = res;
        } else {
          this.message = 'Invalid response format. Expected an array.';
        }
      },
      (err) => {
        this.message = err.error.message || 'Error fetching books';
      }
    );
  }

  viewBookDetails(bookId: any) {
    this.router.navigateByUrl(`/BookDetails/${bookId}`);
  }
}

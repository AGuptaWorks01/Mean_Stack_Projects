import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  books: any[] = [];
  book: any = { title: '', Author: '', Description: '' };
  message: string = '';
  editBookId: string = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBooks();
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.getBookDetails(bookId);
    }
  }

  getBooks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.books = data;
      },
      (err) => {
        this.message = 'Error fetching books';
      }
    );
  }

  getBookDetails(id: string) {
    this.taskService.getTaskById(id).subscribe(
      (data) => {
        this.book = data;
        this.editBookId = id;
      },
      (err) => {
        this.message = 'Error fetching book details';
      }
    );
  }

  updateBook() {
    if (!this.book._id) {
      this.message = 'Book ID is missing!';
      return;
    }

    this.taskService.updateTask(this.editBookId, this.book).subscribe(
      (res) => {
        this.message = 'Book updated successfully!';
        this.clearForm();
        this.getBooks();
        this.router.navigateByUrl('dashboard');
      },
      (err) => {
        this.message = err.error.message;
      }
    );
  }

  clearForm() {
    this.book = { title: '', Author: '', Description: '' };
    this.editBookId = '';
  }

  deleteBook(id: string) {
    if(confirm('Are you sure to delete book!')){
    this.taskService.deleteTask(id).subscribe(
      (res) => {
        this.message = 'Book deleted successfully!';
        this.getBooks();
      },
      (err) => {
        this.message = err.error.message;
      }
    );
  }
  }

  viewBookDetails(id: string) {
    this.router.navigate(['/BookDetails', id]);
  }

  editBook(id: string) {
    this.router.navigate(['/updateBook', id]);
  }
}

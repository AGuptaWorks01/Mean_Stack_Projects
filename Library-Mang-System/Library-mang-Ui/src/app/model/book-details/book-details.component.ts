import { Component } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  book:any = {};
  message: string = '';

  constructor(private taskService: TaskService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.getBookDetails();
  }

  getBookDetails() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.taskService.getTaskById(bookId).subscribe(
        (res) => {
          console.log(res);
          this.book = res;
        },
        (err) => {
          this.message = err.error.message || 'Error fetching book details';
        }
      );
    } else {
      this.message = 'Book not found';
    }
  }
}

import { Component } from '@angular/core';
import { CustFeedBackService } from '../Service/cust_feed.service';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  feedbacks: any[] = [];
  selectedFeedback: any = null;
  editFeedback: any = null;
  deleteFeedbackId: string | null = null

  constructor(private feedbackService: CustFeedBackService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllFeedbacks();
  }

  loadAllFeedbacks() {
    this.feedbackService.getUserFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  viewFeedback(feedback: any) {
    this.selectedFeedback = feedback;
  }

  openEditModal(feedback: any) {
    this.editFeedback = { ...feedback };
  }

  updateFeedback() {
    if (this.editFeedback && this.editFeedback.feedback.trim()) {
      this.feedbackService.updateFeedback(this.editFeedback._id, this.editFeedback.feedback).subscribe(() => {
        this.editFeedback = null;
        this.loadAllFeedbacks();
      });
    }
  }

  openDeleteModal(id: string) {
    this.deleteFeedbackId = id
  }


  confirmDelete() {
    if (this.deleteFeedbackId) {
      this.feedbackService.deleteFeedback(this.deleteFeedbackId).subscribe(() => {
        this.deleteFeedbackId = null;
        this.loadAllFeedbacks();
      });
    }
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigateByUrl('login');
  }
}
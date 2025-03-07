import { Component } from '@angular/core';
import { CustFeedBackService } from '../Service/cust_feed.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-addfeedback',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './addfeedback.component.html',
  styleUrl: './addfeedback.component.css'
})
export class AddfeedbackComponent {
  feedbacks: any[] = [];
  feedbackText: string = '';
  editFeedbackId: string | null = null;

  isAdding: boolean = true;
  isEditingList: boolean = false;
  isUpdating: boolean = false;

  constructor(private feedbackService: CustFeedBackService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserFeedbacks();
  }

  loadUserFeedbacks() {
    this.feedbackService.getUserFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  showAddForm() {
    this.isAdding = true;
    this.isEditingList = false;
    this.isUpdating = false;
  }

  showEditList() {
    this.isEditingList = true;
    this.isAdding = false;
    this.isUpdating = false;
  }

  addFeedback() {
    if (this.feedbackText.trim()) {
      this.feedbackService.addFeedbak(this.feedbackText).subscribe(() => {
        this.feedbackText = '';
        this.loadUserFeedbacks();
      });
    }
  }

  startEdit(feedback: any) {
    this.isUpdating = true;
    this.isAdding = false;
    this.isEditingList = false;

    this.editFeedbackId = feedback._id;
    this.feedbackText = feedback.feedback;
  }

  updateFeedback() {
    if (this.editFeedbackId && this.feedbackText.trim()) {
      this.feedbackService.updateFeedback(this.editFeedbackId, this.feedbackText).subscribe(() => {
        this.feedbackText = '';
        this.isUpdating = false;
        this.editFeedbackId = null;
        this.loadUserFeedbacks();
      });
    }
  }


  logout(): void {
    this.authService.removeToken()
    this.router.navigateByUrl('login')
  }
}

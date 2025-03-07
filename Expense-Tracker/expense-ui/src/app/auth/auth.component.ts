import { Component, inject } from '@angular/core';
import { RegService } from '../reg.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { UserService } from '../user.servce';
import { response } from 'express';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass'
})
export class AuthComponent {
  email: string = ''
  password: string = ''
  isLogin: boolean = true
  message: string = ''
  users: any[] = []

  private regService = inject(RegService)
  private userService = inject(UserService)
  private router = inject(Router)

  submitForm() {
    if (this.isLogin) {
      this.regService.login(this.email, this.password).subscribe(
        response => {
          this.message = 'Login Successful!'
          localStorage.setItem('token', response.token)
          this.router.navigateByUrl('protected')
        },
        err => { this.message = err.err.message || 'An error occurred during login.' }
      )
    } else {
      this.regService.register(this.email, this.password).subscribe(
        response => {
          this.message = 'Registration successful! You can now log in.';
          this.isLogin = true
        },
        err => { this.message = err.err.message || 'An error occurred during registration.' }
      )
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response
      },
      (error) => {
        console.error(error)
        this.message = 'Error fetching users..'
      }
    )
  }

  createUser(userData: any) {
    this.userService.CreateUser(userData).subscribe(
      (response) => {
        this.message = "User create successfully"
        this.getUsers()
      },
      error => {
        console.error(error);
        this.message = "Error creating user.";
      }
    )
  }

  updateUser(userId: string, userData: any) {
    this.userService.updateUser(userId, userData).subscribe(
      response => {
        this.message = "user updated successfully!"
        this.getUsers()
      },
      error => {
        console.error(error);
        this.message = "Error updating user.."
      }

    )
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      response => {
        this.message = 'user deleted successfully'
        this.getUsers()
      },
      error => {
        console.error(error)
        this.message = "Error deleting user."
      }
    )
  }
}

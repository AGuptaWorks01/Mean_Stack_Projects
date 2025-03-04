import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  fullname: string = '';
  message: string = '';
  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearForm();
  }

  clearForm() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.fullname = '';
    // this.message = '';
  }

  register() {
    const user = { username: this.username, password: this.password, email: this.email, fullname: this.fullname };
    this.authService.register(user).subscribe(
      res => {
        this.message = 'User registered successfully!';
        this.toggleMode()
      },
      err => {
        this.message = err.error.message;
      }
    );
  }

  login() {
    const user = { username: this.username, password: this.password };
    console.log(user)
    this.authService.login(user).subscribe(
      res => {
        this.message = 'Login successful!';
        this.authService.setToken(res.token)
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        // this.message = err.error.message;
        alert(this.message = err.error.message)
      }
    );
  }
}

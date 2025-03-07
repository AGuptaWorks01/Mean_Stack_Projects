import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private authService: AuthService) { }

  login() {
    const user = { username: this.username, password: this.password }
    this.authService.login(user).subscribe(
      res => {
        alert("Login Successfully!")
        this.authService.setToken(res.token)
      }, err => {
        alert(err.error.message)
      }
    )
  }

}

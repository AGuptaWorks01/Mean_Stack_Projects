import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const user = { username: this.username, password: this.password }
    console.log(user)
    this.authService.login(user).subscribe(
      res => {
        alert("Login Successfully!")
        this.authService.setToken(res.token)

        const role = this.authService.getUserRole()

        if (role === 'admin') {
          this.router.navigateByUrl('adminDashboard')
        } else {
          this.router.navigateByUrl('addfeedback')
        }
      }, err => {
        alert(err.error.message)
      }
    )
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = ''
  email: string = ''
  password: string = ''
  confirmpassword: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.password !== this.confirmpassword) {
      alert('Password do not match!')
      return
    }

    const user = { username: this.username, email: this.email, password: this.password, confirmpassword: this.confirmpassword };
    console.log(user)
    this.authService.register(user).subscribe(
      res => {
        alert('Register Successfully!')
        this.router.navigateByUrl('login')
      },
      err => {
        console.error('Registration error:', err);
        alert('Error: ' + err.error.message || 'An error occurred');
      }
    )
  }

}

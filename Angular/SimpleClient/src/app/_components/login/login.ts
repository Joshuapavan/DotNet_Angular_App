import { Component, inject, signal } from '@angular/core';
import { Account } from '../../_services/account';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  accountService = inject(Account);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  validationErrors: Array<String> = [];

  showPassword = signal<boolean>(false);

  loggedIn = false;
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: (user) => {
        this.toastr.success('Welcome back, ' + user.username);
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        if (Array.isArray(error)) {
          this.toastr.error('Error while Logging in.');
          this.validationErrors = error;
        }
        this.loggedIn = false;
      },
    });
  }

  togglePasswordVisibility(){
    this.showPassword.set(!this.showPassword());
  }

  cancel() {}
}

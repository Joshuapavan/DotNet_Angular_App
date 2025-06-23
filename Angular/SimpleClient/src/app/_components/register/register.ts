import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../_services/account';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  accountService = inject(Account);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  cancelRegister = output<boolean>();
  validationErrors: Array<String> = [];

  showPassword = signal<boolean>(false);

  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        this.toastr.success('Welcome ,' + response.username);
        this.cancel();
      },
      error: (error) => {
        if (Array.isArray(error)) {
          this.toastr.error('Error while Signing up.');
          this.validationErrors = error;
        }
      },
    });
  }
  
  togglePasswordVisibility(){
    this.showPassword.set(!this.showPassword())
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.router.navigateByUrl('/login');
  }
}

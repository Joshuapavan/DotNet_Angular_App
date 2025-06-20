import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../_services/account';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  accountService = inject(Account);

  private toastr = inject(ToastrService);

  cancelRegister = output<boolean>();

  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        this.toastr.success('Welcome ,' + response.username);
        this.cancel();
      },
      error: (error) => this.toastr.error(error.error),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

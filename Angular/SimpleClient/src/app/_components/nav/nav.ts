import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../_services/account';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  accountService = inject(Account);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  
  loggedIn = false;
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: (user) => {
        this.toastr.success('Welcome back, ' + user.username);
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        this.toastr.error(error.error);
        this.loggedIn = false;
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../_services/account';
import { NgIf } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  accountService = inject(Account);
  loggedIn = false;
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        this.loggedIn = false;
      },
    });
  }

  logout() {
    this.accountService.logout();
  }
}

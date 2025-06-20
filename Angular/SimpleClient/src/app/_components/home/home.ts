import { Component, inject } from '@angular/core';
import { Register } from '../register/register';
import { Account } from '../../_services/account';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Register, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  registerMode = false;
  accountService = inject(Account);

  users: any;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Register } from '../register/register';
import { Account } from '../../_services/account';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  registerMode = false;

  http = inject(HttpClient);
  accountService = inject(Account);

  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
    this.http.get('http://localhost:5000/api/users/').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log('Error : ' + error),
    });
  }
}

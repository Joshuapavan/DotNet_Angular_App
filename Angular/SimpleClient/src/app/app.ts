import { Component, inject, OnInit } from '@angular/core';
import { Nav } from './_components/nav/nav';
import { Account } from './_services/account';
import { Home } from './_components/home/home';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, Home, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  accountService = inject(Account);

  users: any;

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}

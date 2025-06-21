import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from '../nav/nav';
import { Account } from '../../_services/account';
import { Modal } from '../modals/modal/modal';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet, Nav, Modal],
  templateUrl: './base.html',
  styleUrl: './base.css',
})
export class Base implements OnInit {
  accountService = inject(Account);
  private router = inject(Router);

  ngOnInit(): void {
    if (!this.accountService.currentUser()) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}

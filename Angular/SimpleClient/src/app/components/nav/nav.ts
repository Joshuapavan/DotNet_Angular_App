import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../_services/account';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, NgIf],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

  private accountService = inject(Account)
  loggedIn = false;
  model: any = {};

  login(){
    this.accountService.login(this.model).subscribe(
      {
        next: response => {
          console.log(response);
          this.loggedIn = true;
         },
         error: error => {
          console.log(error);
          this.loggedIn = false;
         }
      }
    )
  }

  logout(){
    this.loggedIn = false;
  }

}

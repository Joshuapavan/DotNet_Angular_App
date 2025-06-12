import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [NgFor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected title = 'Dating App';

  // Dependency Injection
  http = inject(HttpClient);

  users: any;

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/v1/users/').subscribe({
      next: response => this.users = response,
      error: error =>  console.log("Error : "+ error),
      complete: () => console.log("Completed the API call")
    })
  }


}

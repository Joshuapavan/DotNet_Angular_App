import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Account {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api/';

  login(model: any) {
    return this.http.post(this.baseUrl + 'accounts/login', model);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'accounts/register', model);
  }
}

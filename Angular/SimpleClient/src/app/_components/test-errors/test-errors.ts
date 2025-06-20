import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  validationErrors: Array<String> = [];

  get400Error() {
    this.http.get(this.baseUrl + '/buggy/bad-request').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get401Error() {
    this.http.get(this.baseUrl + '/buggy/auth').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get404Error() {
    this.http.get(this.baseUrl + '/buggy/not-found').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + '/buggy/server-error').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  getValidationError() {
    this.http.post(this.baseUrl + '/accounts/register', {}).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        this.validationErrors = error;
      },
    });
  }
}

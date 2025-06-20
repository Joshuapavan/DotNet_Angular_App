import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Account } from './account';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private accountService = inject(Account);
  baseUrl = environment.apiUrl;

  getMembers() {
    return this.http.get<Member[]>(
      this.baseUrl + '/users',
      this.getHttpOptions()
    );
  }

  getMembersByUserName(username: string) {
    return this.http.get<Member>(
      this.baseUrl + `/users/${username}`,
      this.getHttpOptions()
    );
  }

  getMembersById(id: number) {
    return this.http.get<Member>(
      this.baseUrl + `/users/${id}`,
      this.getHttpOptions()
    );
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.currentUser()?.token}`,
      }),
    };
  }
}

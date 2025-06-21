import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Account } from './account';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private accountService = inject(Account);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + '/users').subscribe({
      next: (members) => this.members.set(members),
    });
  }

  getMembersByUserName(username: string) {
    const member = this.members().find((x) => x.username === username);
    // of from rxjs will enable us to return an observable
    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + `/users/${username}`);
  }

  getMembersById(id: number) {
    return this.http.get<Member>(this.baseUrl + `/users/${id}`);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + '/users', member).pipe(
      // tap will not modify the existing data unlike map from rxjs
      tap(() => {
        this.members.update((members) =>
          members.map((m) => (m.username === member.username ? member : m))
        );
      })
    );
  }
}

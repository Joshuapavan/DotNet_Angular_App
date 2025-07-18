import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, model, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Account } from './account';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private accountService = inject(Account);

  baseUrl = environment.apiUrl;

  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
  memberCache = new Map();
  user = this.accountService.currentUser();
  userParams = signal<UserParams>(new UserParams(this.user));

  resetUserParams(){
    this.userParams.set(new UserParams(this.user));
  }

  getMembers() {
    const response = this.memberCache.get(Object.values(this.userParams()).join('-'));

    if(response) return this.setPaginatedResponse(response);

    let params = this.setPaginationHeaders(this.userParams().pageNumber, this.userParams().pageSize);

    params = params.append('minAge', this.userParams().minAge);
    params = params.append('maxAge', this.userParams().maxAge);
    params = params.append('gender', this.userParams().gender);
    params = params.append('orderBy', this.userParams().orderBy);


    return this.http.get<Member[]>(this.baseUrl + '/users', {observe: 'response', params}).subscribe({
      next: response => {
        this.setPaginatedResponse(response);
        this.memberCache.set(Object.values(this.userParams()).join('-'), response);
      }
    });
  }

  private setPaginatedResponse(response: HttpResponse<Member[]>){
    this.paginatedResult.set({
          items: response.body as Member[],
          pagination: JSON.parse(response.headers.get('Pagination')!)
    })
  }
  
  private setPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();
    
    if(pageNumber && pageSize){
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    return params;
  }


  getMembersByUserName(username: string) {
    const member: Member = [...this.memberCache.values()]
                  .reduce(
                    (arr, elem)=>
                      { 
                        arr.concat(elem.body), []
                      }
                  )
                  .find((m: Member)  => m.username === username);
    
    if (member) return of(member);
    

    return this.http.get<Member>(this.baseUrl + `/users/${username}`);
  }

  getMembersById(id: number) {
    return this.http.get<Member>(this.baseUrl + `/users/${id}`);
  }

  setImageAsMain(photo: Photo){
    return this.http.put(`${this.baseUrl}/users/set-main-photo/${photo.id}`, {} )
    // .pipe(
    //   tap(() => { 
    //     this.members.update(members => members.map(m => {
    //       if(m.photos.includes(photo)){
    //         m.photoUrl = photo.url;
    //       }
    //       return m;
    //     }))
    //   })
    // )
  }

  deletePhoto(photo: Photo){
    return this.http.delete(`${this.baseUrl}/users/delete-photo/${photo.id}`)
    // .pipe(
    //   tap(() => {
    //     this.members.update(members => members.map(m => {
    //       if(m.photos.includes(photo)){
    //         m.photos = m.photos.filter(ph => ph.id !== photo.id)
    //       }
    //       return m;
    //     }))
    //   })
    // )
  }



  updateMember(member: Member) {
    return this.http.put(this.baseUrl + '/users', member)
    // .pipe(
    //   // tap will not modify the existing data unlike map from rxjs
    //   tap(() => {
    //     this.members.update((members) =>
    //       members.map((m) => (m.username === member.username ? member : m))
    //     );
    //   })
    // );
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../_services/member.service';
import { MemberCard } from '../member-card/member-card';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserParams } from '../../../_models/userParams';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  standalone: true, // use standalone if applicable
  templateUrl: './member-list.html',
  styleUrls: ['./member-list.css'],
  imports: [MemberCard, PaginationModule, FormsModule, ButtonsModule],
})
export class MemberList implements OnInit {
  memberService = inject(MemberService);
  genderList = [{value: 'male', display: "Males"}, { value: 'female', display: "Females"}]

  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.loadMembers();
  }

  resetFilters(){
    this.memberService.userParams.set(new UserParams(this.memberService.user));
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers();
  }

  pageChanged(event: any){
    if(this.memberService.userParams().pageNumber != event.page){
      this.memberService.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}

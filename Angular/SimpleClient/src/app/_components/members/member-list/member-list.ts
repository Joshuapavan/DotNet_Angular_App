import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../../_models/member';
import { MemberService } from '../../../_services/member.service';
import { MemberCard } from '../member-card/member-card';

@Component({
  selector: 'app-member-list',
  standalone: true, // use standalone if applicable
  templateUrl: './member-list.html',
  styleUrls: ['./member-list.css'],
  imports: [MemberCard],
})
export class MemberList implements OnInit {
  memberService = inject(MemberService);

  ngOnInit(): void {
    if (this.memberService.members().length === 0) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers();
  }
}

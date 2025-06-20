import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../../_models/member';
import { MemberService } from '../../../_services/member';
import { MemberCard } from '../member-card/member-card';

@Component({
  selector: 'app-member-list',
  standalone: true, // use standalone if applicable
  templateUrl: './member-list.html',
  styleUrls: ['./member-list.css'],
  imports: [MemberCard]
})
export class MemberList implements OnInit {
  private memberService = inject(MemberService);
  membersList: Member[] = [];

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: (members) => (this.membersList = members),
    });
  }
}
